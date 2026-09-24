namespace $ {

	export class $bog_gamengine_phys extends $mol_object2 {

		static stat_window = 30

		@ $mol_mem
		bodies( next?: readonly $bog_gamengine_phys_body[] ) {
			return next ?? []
		}

		@ $mol_mem
		tile( next?: $bog_gamengine_phys_tile | null ) {
			return next ?? null
		}

		@ $mol_mem
		gravity( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 0, 0 ])
		}

		eps = 1e-4

		normal = new Float32Array( 2 )

		times = new Float32Array( $bog_gamengine_phys.stat_window )
		samples = 0

		step( dt: number ) {
			const window = $bog_gamengine_phys.stat_window
			const start = performance.now()
			this.step_world( dt )
			this.times[ this.samples % window ] = performance.now() - start
			++ this.samples
		}

		step_ms() {
			const size = Math.min( this.samples, $bog_gamengine_phys.stat_window )
			let sum = 0
			for( let i = 0; i < size; ++ i ) sum += this.times[ i ]
			return size ? sum / size : 0
		}

		step_world( dt: number ) {
			const bodies = this.bodies()
			const tile = this.tile()
			const gravity = this.gravity()
			const gx = gravity[ 0 ] * dt
			const gy = gravity[ 1 ] * dt
			for( let i = 0; i < bodies.length; ++i ) {
				const body = bodies[ i ]
				body.touched = 0
				if( body.still() ) continue
				const ghost = body.ghost()
				if( !ghost && ( gx !== 0 || gy !== 0 ) ) this.fall( body, gx, gy )
				this.move( body, ghost ? null : tile, dt )
			}
			for( let i = 0; i < bodies.length; ++i ) {
				for( let j = i + 1; j < bodies.length; ++j ) this.touch( bodies[ i ], bodies[ j ] )
			}
		}

		fall( body: $bog_gamengine_phys_body, gx: number, gy: number ) {
			const vel = body.vel()
			const next = new Float32Array( 3 )
			next[ 0 ] = vel[ 0 ] + gx
			next[ 1 ] = vel[ 1 ] + gy
			next[ 2 ] = vel[ 2 ]
			body.vel( next )
		}

		move( body: $bog_gamengine_phys_body, tile: $bog_gamengine_phys_tile | null, dt: number ) {

			const pos = body.pos()
			const vel = body.vel()
			const size = body.size()
			const hw = size[ 0 ] / 2
			const hh = body.kind() === 'circle' ? hw : size[ 1 ] / 2
			const eps = this.eps
			const side = $bog_gamengine_phys_body

			let x = pos[ 0 ] + vel[ 0 ] * dt
			let y = pos[ 1 ]
			let vx = vel[ 0 ]
			let vy = vel[ 1 ]
			let hit = false
			let nx = 0
			let ny = 0

			if( tile ) {

				const ry0 = Math.floor( - ( y + hh ) + eps )
				const ry1 = Math.floor( - ( y - hh ) - eps )

				if( vx >= 0 ) {
					const cx = Math.floor( x + hw )
					if( this.col_solid( tile, cx, ry0, ry1 ) ) {
						body.touched |= side.side_right
						const at = cx - hw
						if( at !== x || vx !== 0 ) {
							x = at
							vx = 0
							nx = -1
							hit = true
						}
					}
				}

				if( vx <= 0 ) {
					const cx = Math.floor( x - hw )
					if( this.col_solid( tile, cx, ry0, ry1 ) ) {
						body.touched |= side.side_left
						const at = cx + 1 + hw
						if( at !== x || vx !== 0 ) {
							x = at
							vx = 0
							nx = 1
							hit = true
						}
					}
				}

			}

			y = pos[ 1 ] + vy * dt

			if( tile ) {

				const cx0 = Math.floor( x - hw + eps )
				const cx1 = Math.floor( x + hw - eps )

				if( vy >= 0 ) {
					const cy = Math.floor( - ( y + hh ) )
					if( this.row_solid( tile, cy, cx0, cx1 ) ) {
						body.touched |= side.side_up
						const at = - cy - 1 - hh
						if( at !== y || vy !== 0 ) {
							y = at
							vy = 0
							ny = -1
							hit = true
						}
					}
				}

				if( vy <= 0 ) {
					const cy = Math.floor( - ( y - hh ) )
					if( this.row_solid( tile, cy, cx0, cx1 ) ) {
						body.touched |= side.side_down
						const at = - cy + hh
						if( at !== y || vy !== 0 ) {
							y = at
							vy = 0
							ny = 1
							hit = true
						}
					}
				}

			}

			const next = new Float32Array( 3 )
			next[ 0 ] = x
			next[ 1 ] = y
			next[ 2 ] = pos[ 2 ]
			body.pos( next )

			const back = body.pos()
			if( back[ 0 ] !== next[ 0 ] || back[ 1 ] !== next[ 1 ] ) {
				$mol_fail( new Error( `${ body.title() }: pos is read-only, declare it as \`pos? <=>\`` ) )
			}

			if( !hit ) return

			const next_vel = new Float32Array( 3 )
			next_vel[ 0 ] = vx
			next_vel[ 1 ] = vy
			next_vel[ 2 ] = vel[ 2 ]
			body.vel( next_vel )

			const normal = this.normal
			const len = Math.sqrt( nx * nx + ny * ny )
			normal[ 0 ] = len === 0 ? 0 : nx / len
			normal[ 1 ] = len === 0 ? 0 : ny / len
			body.hit( null, normal )

		}

		col_solid( tile: $bog_gamengine_phys_tile, cx: number, cy0: number, cy1: number ) {
			for( let cy = cy0; cy <= cy1; ++cy ) if( tile.cell( cx, cy ) ) return true
			return false
		}

		row_solid( tile: $bog_gamengine_phys_tile, cy: number, cx0: number, cx1: number ) {
			for( let cx = cx0; cx <= cx1; ++cx ) if( tile.cell( cx, cy ) ) return true
			return false
		}

		touch( a: $bog_gamengine_phys_body, b: $bog_gamengine_phys_body ) {

			const a_still = a.still()
			const b_still = b.still()
			if( a_still && b_still ) return

			const ap = a.pos()
			const bp = b.pos()
			const as = a.size()
			const bs = b.size()
			const dx = bp[ 0 ] - ap[ 0 ]
			const dy = bp[ 1 ] - ap[ 1 ]

			let px = 0
			let py = 0

			if( a.kind() === 'circle' && b.kind() === 'circle' ) {

				const r = ( as[ 0 ] + bs[ 0 ] ) / 2
				const d = Math.sqrt( dx * dx + dy * dy )
				if( d >= r ) return
				if( d === 0 ) {
					px = r
				} else {
					px = ( r - d ) * dx / d
					py = ( r - d ) * dy / d
				}

			} else {

				const ahw = as[ 0 ] / 2
				const ahh = a.kind() === 'circle' ? ahw : as[ 1 ] / 2
				const bhw = bs[ 0 ] / 2
				const bhh = b.kind() === 'circle' ? bhw : bs[ 1 ] / 2
				const ox = ahw + bhw - Math.abs( dx )
				const oy = ahh + bhh - Math.abs( dy )
				if( ox <= 0 || oy <= 0 ) return
				if( ox <= oy ) px = dx < 0 ? - ox : ox
				else py = dy < 0 ? - oy : oy

			}

			if( !a.ghost() && !b.ghost() ) this.push( a, b, px, py )

			const normal = this.normal
			const len = Math.sqrt( px * px + py * py )
			normal[ 0 ] = len === 0 ? 0 : - px / len
			normal[ 1 ] = len === 0 ? 0 : - py / len
			a.hit( b, normal )
			normal[ 0 ] = - normal[ 0 ]
			normal[ 1 ] = - normal[ 1 ]
			b.hit( a, normal )

		}

		push( a: $bog_gamengine_phys_body, b: $bog_gamengine_phys_body, px: number, py: number ) {
			if( a.still() ) {
				this.shift( b, px, py, true )
			} else if( b.still() ) {
				this.shift( a, - px, - py, true )
			} else {
				this.shift( a, - px / 2, - py / 2, false )
				this.shift( b, px / 2, py / 2, false )
			}
		}

		shift( body: $bog_gamengine_phys_body, sx: number, sy: number, stop: boolean ) {

			const side = $bog_gamengine_phys_body
			if( sx > 0 ) body.touched |= side.side_left
			else if( sx < 0 ) body.touched |= side.side_right
			if( sy > 0 ) body.touched |= side.side_down
			else if( sy < 0 ) body.touched |= side.side_up

			const pos = body.pos()
			const next = new Float32Array( 3 )
			next[ 0 ] = pos[ 0 ] + sx
			next[ 1 ] = pos[ 1 ] + sy
			next[ 2 ] = pos[ 2 ]
			body.pos( next )

			if( !stop ) return

			const vel = body.vel()
			const len = Math.sqrt( sx * sx + sy * sy )
			if( len === 0 ) return
			const nx = sx / len
			const ny = sy / len
			const into = vel[ 0 ] * nx + vel[ 1 ] * ny
			if( into >= 0 ) return

			const next_vel = new Float32Array( 3 )
			next_vel[ 0 ] = vel[ 0 ] - into * nx
			next_vel[ 1 ] = vel[ 1 ] - into * ny
			next_vel[ 2 ] = vel[ 2 ]
			body.vel( next_vel )

		}

	}

}
