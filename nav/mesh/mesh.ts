namespace $ {

	const eps = 1e-5

	export class $bog_gamengine_nav_mesh extends $mol_object2 {

		@ $mol_mem
		polys( next?: readonly Float32Array[] ) {
			return next ?? []
		}

		@ $mol_mem
		y( next = 0 ) {
			return next
		}

		center = new Float32Array( 0 )
		portal = new Float32Array( 0 )
		portal_poly = new Int32Array( 0 )
		adj_start = new Int32Array( 0 )
		adj_list = new Int32Array( 0 )
		portal_count = 0

		gen = 0
		seen = new Int32Array( 0 )
		state = new Uint8Array( 0 )
		cost = new Float32Array( 0 )
		rank = new Float32Array( 0 )
		from = new Int32Array( 0 )
		heap = new Int32Array( 0 )
		at = new Int32Array( 0 )
		heap_size = 0
		route = new Int32Array( 0 )
		left = new Float32Array( 0 )
		right = new Float32Array( 0 )

		@ $mol_mem
		build() {

			const polys = this.polys()
			const n = polys.length
			const center = new Float32Array( n * 2 )
			for( let p = 0; p < n; ++p ) {
				const poly = polys[ p ]
				const m = poly.length >> 1
				let cx = 0, cz = 0
				for( let i = 0; i < m; ++i ) {
					cx += poly[ i * 2 ]
					cz += poly[ i * 2 + 1 ]
				}
				center[ p * 2 ] = cx / m
				center[ p * 2 + 1 ] = cz / m
			}
			this.center = center

			const portals = [] as number[]
			const pairs = [] as number[]
			const degree = new Int32Array( n )
			for( let p = 0; p < n; ++p ) {
				for( let q = p + 1; q < n; ++q ) {
					if( !this.overlap( polys[ p ], polys[ q ], portals ) ) continue
					pairs.push( p, q )
					++ degree[ p ]
					++ degree[ q ]
				}
			}

			const count = pairs.length >> 1
			this.portal_count = count
			this.portal = new Float32Array( portals )
			this.portal_poly = new Int32Array( pairs )

			const adj_start = new Int32Array( n + 1 )
			for( let p = 0; p < n; ++p ) adj_start[ p + 1 ] = adj_start[ p ] + degree[ p ]
			const fill = new Int32Array( n )
			const adj_list = new Int32Array( count * 2 )
			for( let k = 0; k < count; ++k ) {
				const p = pairs[ k * 2 ]
				const q = pairs[ k * 2 + 1 ]
				adj_list[ adj_start[ p ] + fill[ p ] ++ ] = k
				adj_list[ adj_start[ q ] + fill[ q ] ++ ] = k
			}
			this.adj_start = adj_start
			this.adj_list = adj_list

			const nodes = count + 1
			this.seen = new Int32Array( nodes )
			this.state = new Uint8Array( nodes )
			this.cost = new Float32Array( nodes )
			this.rank = new Float32Array( nodes )
			this.from = new Int32Array( nodes )
			this.heap = new Int32Array( nodes )
			this.at = new Int32Array( nodes )
			this.route = new Int32Array( nodes )
			this.left = new Float32Array( nodes * 2 + 2 )
			this.right = new Float32Array( nodes * 2 + 2 )

			return count
		}

		overlap( a: Float32Array, b: Float32Array, portals: number[] ) {
			const am = a.length >> 1
			const bm = b.length >> 1
			for( let i = 0; i < am; ++i ) {
				const ax0 = a[ i * 2 ], az0 = a[ i * 2 + 1 ]
				const ax1 = a[ ( ( i + 1 ) % am ) * 2 ], az1 = a[ ( ( i + 1 ) % am ) * 2 + 1 ]
				const dx = ax1 - ax0, dz = az1 - az0
				const len2 = dx * dx + dz * dz
				if( len2 < eps ) continue
				for( let j = 0; j < bm; ++j ) {
					const bx0 = b[ j * 2 ], bz0 = b[ j * 2 + 1 ]
					const bx1 = b[ ( ( j + 1 ) % bm ) * 2 ], bz1 = b[ ( ( j + 1 ) % bm ) * 2 + 1 ]
					if( Math.abs( dx * ( bz0 - az0 ) - dz * ( bx0 - ax0 ) ) > eps ) continue
					if( Math.abs( dx * ( bz1 - az0 ) - dz * ( bx1 - ax0 ) ) > eps ) continue
					const t0 = ( ( bx0 - ax0 ) * dx + ( bz0 - az0 ) * dz ) / len2
					const t1 = ( ( bx1 - ax0 ) * dx + ( bz1 - az0 ) * dz ) / len2
					const lo = Math.max( 0, Math.min( t0, t1 ) )
					const hi = Math.min( 1, Math.max( t0, t1 ) )
					if( hi - lo < 1e-3 ) continue
					portals.push( ax0 + dx * lo, az0 + dz * lo, ax0 + dx * hi, az0 + dz * hi )
					return true
				}
			}
			return false
		}

		inside( poly: Float32Array, x: number, z: number ) {
			const m = poly.length >> 1
			let sign = 0
			for( let i = 0; i < m; ++i ) {
				const x0 = poly[ i * 2 ], z0 = poly[ i * 2 + 1 ]
				const x1 = poly[ ( ( i + 1 ) % m ) * 2 ], z1 = poly[ ( ( i + 1 ) % m ) * 2 + 1 ]
				const cross = ( x1 - x0 ) * ( z - z0 ) - ( z1 - z0 ) * ( x - x0 )
				if( Math.abs( cross ) < eps ) continue
				const s = cross > 0 ? 1 : -1
				if( sign === 0 ) sign = s
				else if( sign !== s ) return false
			}
			return true
		}

		locate( x: number, z: number ) {
			const polys = this.polys()
			for( let p = 0; p < polys.length; ++p ) if( this.inside( polys[ p ], x, z ) ) return p
			const center = this.center
			let best = -1
			let best_d = Infinity
			for( let p = 0; p < polys.length; ++p ) {
				const dx = center[ p * 2 ] - x
				const dz = center[ p * 2 + 1 ] - z
				const d = dx * dx + dz * dz
				if( d < best_d ) {
					best_d = d
					best = p
				}
			}
			return best
		}

		portal_x( k: number ) {
			return ( this.portal[ k * 4 ] + this.portal[ k * 4 + 2 ] ) / 2
		}

		portal_z( k: number ) {
			return ( this.portal[ k * 4 + 1 ] + this.portal[ k * 4 + 3 ] ) / 2
		}

		heap_push( node: number ) {
			const i = this.heap_size ++
			this.heap[ i ] = node
			this.at[ node ] = i
			this.heap_up( i )
		}

		heap_up( i: number ) {
			const heap = this.heap
			const rank = this.rank
			const at = this.at
			const node = heap[ i ]
			const r = rank[ node ]
			while( i > 0 ) {
				const p = ( i - 1 ) >> 1
				if( rank[ heap[ p ] ] <= r ) break
				heap[ i ] = heap[ p ]
				at[ heap[ i ] ] = i
				i = p
			}
			heap[ i ] = node
			at[ node ] = i
		}

		heap_pop() {
			const heap = this.heap
			const rank = this.rank
			const at = this.at
			const top = heap[ 0 ]
			const size = -- this.heap_size
			if( size === 0 ) return top
			const node = heap[ size ]
			const r = rank[ node ]
			let i = 0
			for(;;) {
				let c = i * 2 + 1
				if( c >= size ) break
				if( c + 1 < size && rank[ heap[ c + 1 ] ] < rank[ heap[ c ] ] ) ++ c
				if( rank[ heap[ c ] ] >= r ) break
				heap[ i ] = heap[ c ]
				at[ heap[ i ] ] = i
				i = c
			}
			heap[ i ] = node
			at[ node ] = i
			return top
		}

		relax( next: number, ng: number, parent: number, tx: number, tz: number ) {
			const gen = this.gen
			const h = Math.hypot( this.portal_x( next ) - tx, this.portal_z( next ) - tz )
			if( this.seen[ next ] === gen ) {
				if( this.state[ next ] === 2 || this.cost[ next ] <= ng ) return
				this.cost[ next ] = ng
				this.rank[ next ] = ng + h
				this.from[ next ] = parent
				this.heap_up( this.at[ next ] )
			} else {
				this.seen[ next ] = gen
				this.state[ next ] = 1
				this.cost[ next ] = ng
				this.rank[ next ] = ng + h
				this.from[ next ] = parent
				this.heap_push( next )
			}
		}

		path( from: Float32Array, to: Float32Array, out: Float32Array ) {

			this.build()
			const polys = this.polys()
			if( polys.length === 0 ) return 0
			const cap = Math.floor( out.length / 3 )
			if( cap < 2 ) return 0
			const y = this.y()

			const sx = from[ 0 ], sz = from[ 2 ]
			const tx = to[ 0 ], tz = to[ 2 ]
			const sp = this.locate( sx, sz )
			const tp = this.locate( tx, tz )
			if( sp < 0 || tp < 0 ) return 0

			if( sp === tp ) {
				out[ 0 ] = sx
				out[ 1 ] = y
				out[ 2 ] = sz
				out[ 3 ] = tx
				out[ 4 ] = y
				out[ 5 ] = tz
				return 2
			}

			const gen = ++ this.gen
			const count = this.portal_count
			const adj_start = this.adj_start
			const adj_list = this.adj_list
			const portal_poly = this.portal_poly
			const goal = count

			this.heap_size = 0
			for( let i = adj_start[ sp ]; i < adj_start[ sp + 1 ]; ++i ) {
				const k = adj_list[ i ]
				this.relax( k, Math.hypot( this.portal_x( k ) - sx, this.portal_z( k ) - sz ), -1, tx, tz )
			}

			let found = false
			while( this.heap_size > 0 ) {
				const node = this.heap_pop()
				if( node === goal ) {
					found = true
					break
				}
				this.state[ node ] = 2
				const g = this.cost[ node ]
				const px = this.portal_x( node )
				const pz = this.portal_z( node )
				for( let side = 0; side < 2; ++side ) {
					const p = portal_poly[ node * 2 + side ]
					if( p === tp ) {
						const ng = g + Math.hypot( tx - px, tz - pz )
						if( this.seen[ goal ] !== gen || this.cost[ goal ] > ng ) {
							if( this.seen[ goal ] === gen ) {
								this.cost[ goal ] = ng
								this.rank[ goal ] = ng
								this.from[ goal ] = node
								this.heap_up( this.at[ goal ] )
							} else {
								this.seen[ goal ] = gen
								this.state[ goal ] = 1
								this.cost[ goal ] = ng
								this.rank[ goal ] = ng
								this.from[ goal ] = node
								this.heap_push( goal )
							}
						}
					}
					for( let i = adj_start[ p ]; i < adj_start[ p + 1 ]; ++i ) {
						const k = adj_list[ i ]
						if( k === node ) continue
						this.relax( k, g + Math.hypot( this.portal_x( k ) - px, this.portal_z( k ) - pz ), node, tx, tz )
					}
				}
			}

			if( !found ) return 0

			const route = this.route
			let len = 0
			for( let node = this.from[ goal ]; node !== -1; node = this.from[ node ] ) route[ len ++ ] = node

			const left = this.left
			const right = this.right
			const portal = this.portal
			const center = this.center
			let poly = sp
			let cx = sx, cz = sz
			for( let i = 0; i < len; ++i ) {
				const k = route[ len - 1 - i ]
				const ax = portal[ k * 4 ], az = portal[ k * 4 + 1 ]
				const bx = portal[ k * 4 + 2 ], bz = portal[ k * 4 + 3 ]
				const mx = ( ax + bx ) / 2 - cx
				const mz = ( az + bz ) / 2 - cz
				const cross = mx * ( az - cz ) - mz * ( ax - cx )
				if( cross > 0 ) {
					left[ i * 2 ] = ax
					left[ i * 2 + 1 ] = az
					right[ i * 2 ] = bx
					right[ i * 2 + 1 ] = bz
				} else {
					left[ i * 2 ] = bx
					left[ i * 2 + 1 ] = bz
					right[ i * 2 ] = ax
					right[ i * 2 + 1 ] = az
				}
				poly = portal_poly[ k * 2 ] === poly ? portal_poly[ k * 2 + 1 ] : portal_poly[ k * 2 ]
				cx = center[ poly * 2 ]
				cz = center[ poly * 2 + 1 ]
			}
			left[ len * 2 ] = tx
			left[ len * 2 + 1 ] = tz
			right[ len * 2 ] = tx
			right[ len * 2 + 1 ] = tz

			return this.funnel( sx, sz, len + 1, out, cap, y )
		}

		funnel( sx: number, sz: number, count: number, out: Float32Array, cap: number, y: number ) {

			const left = this.left
			const right = this.right

			let apex_x = sx, apex_z = sz
			let left_x = sx, left_z = sz
			let right_x = sx, right_z = sz
			let apex_i = 0, left_i = 0, right_i = 0

			out[ 0 ] = sx
			out[ 1 ] = y
			out[ 2 ] = sz
			let written = 1

			for( let i = 0; i < count && written < cap; ++i ) {

				const lx = left[ i * 2 ], lz = left[ i * 2 + 1 ]
				const rx = right[ i * 2 ], rz = right[ i * 2 + 1 ]

				if( this.area( apex_x, apex_z, right_x, right_z, rx, rz ) <= 0 ) {
					if( ( apex_x === right_x && apex_z === right_z ) || this.area( apex_x, apex_z, left_x, left_z, rx, rz ) > 0 ) {
						right_x = rx
						right_z = rz
						right_i = i
					} else {
						apex_x = left_x
						apex_z = left_z
						apex_i = left_i
						out[ written * 3 ] = apex_x
						out[ written * 3 + 1 ] = y
						out[ written * 3 + 2 ] = apex_z
						++ written
						left_x = apex_x
						left_z = apex_z
						right_x = apex_x
						right_z = apex_z
						left_i = apex_i
						right_i = apex_i
						i = apex_i
						continue
					}
				}

				if( this.area( apex_x, apex_z, left_x, left_z, lx, lz ) >= 0 ) {
					if( ( apex_x === left_x && apex_z === left_z ) || this.area( apex_x, apex_z, right_x, right_z, lx, lz ) < 0 ) {
						left_x = lx
						left_z = lz
						left_i = i
					} else {
						apex_x = right_x
						apex_z = right_z
						apex_i = right_i
						out[ written * 3 ] = apex_x
						out[ written * 3 + 1 ] = y
						out[ written * 3 + 2 ] = apex_z
						++ written
						left_x = apex_x
						left_z = apex_z
						right_x = apex_x
						right_z = apex_z
						left_i = apex_i
						right_i = apex_i
						i = apex_i
						continue
					}
				}

			}

			if( written < cap ) {
				const tx = left[ ( count - 1 ) * 2 ]
				const tz = left[ ( count - 1 ) * 2 + 1 ]
				const px = out[ ( written - 1 ) * 3 ]
				const pz = out[ ( written - 1 ) * 3 + 2 ]
				if( px !== tx || pz !== tz ) {
					out[ written * 3 ] = tx
					out[ written * 3 + 1 ] = y
					out[ written * 3 + 2 ] = tz
					++ written
				}
			}

			return written
		}

		area( ax: number, az: number, bx: number, bz: number, cx: number, cz: number ) {
			return ( cx - ax ) * ( bz - az ) - ( bx - ax ) * ( cz - az )
		}

		from_tile( tile: $bog_gamengine_phys_tile, y = 0 ) {

			const width = tile.width()
			const height = tile.height()
			const polys = [] as Float32Array[]
			let open = [] as number[][]

			for( let row = 0; row <= height; ++row ) {

				const runs = [] as number[][]
				if( row < height ) {
					let x = 0
					while( x < width ) {
						if( tile.cell( x, row ) ) {
							++ x
							continue
						}
						const x0 = x
						while( x < width && !tile.cell( x, row ) ) ++ x
						runs.push([ x0, x ])
					}
				}

				const next = [] as number[][]
				for( let i = 0; i < runs.length; ++i ) {
					const [ x0, x1 ] = runs[ i ]
					let found = null as number[] | null
					for( let j = 0; j < open.length; ++j ) {
						if( open[ j ][ 0 ] === x0 && open[ j ][ 1 ] === x1 ) found = open[ j ]
					}
					next.push( found ?? [ x0, x1, row ] )
				}
				for( let j = 0; j < open.length; ++j ) {
					if( next.includes( open[ j ] ) ) continue
					const [ x0, x1, z0 ] = open[ j ]
					polys.push( new Float32Array([ x0, z0, x1, z0, x1, row, x0, row ]) )
				}
				open = next

			}

			this.y( y )
			this.polys( polys )
			this.build()
			return this
		}

	}

}
