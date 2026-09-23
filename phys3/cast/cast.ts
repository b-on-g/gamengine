namespace $ {

	export type $bog_gamengine_phys3_cast_world = {
		count: number
		pos: Float32Array
		rot: Float32Array
		shape: Uint8Array
		size: Float32Array
		flags: Uint8Array
		aabb: Float32Array
		hull_off: Uint32Array
		hull_count: Uint32Array
		hull: Float32Array
	}

	export class $bog_gamengine_phys3_cast extends $mol_object2 {

		static tolerance = 1e-3
		static iterations = 32

		world = {} as $bog_gamengine_phys3_cast_world

		shape = new Uint8Array( 2 )
		size = new Float32Array( 6 )
		pos = new Float32Array( 6 )
		rot = new Float32Array( 8 )
		hoff = new Uint32Array( 2 )
		hcnt = new Uint32Array( 2 )

		ud = new Float32Array( 3 )
		origin = new Float32Array( 3 )
		hit = new Float32Array( 7 )
		box_lo = new Float32Array( 3 )
		box_hi = new Float32Array( 3 )
		lo = new Float32Array( 3 )
		ld = new Float32Array( 3 )
		ln = new Float32Array( 3 )
		pn = new Float32Array( 3 )
		tmp = new Float32Array( 3 )

		v = new Float64Array( 3 )
		wa = new Float64Array( 3 )
		wb = new Float64Array( 3 )
		pb = new Float64Array( 3 )
		last = new Float64Array( 6 )
		sw = new Float64Array( 12 )
		sa = new Float64Array( 12 )
		sb = new Float64Array( 12 )
		sn = 0
		keep = new Int32Array( 4 )
		coef = new Float64Array( 4 )
		keep_n = 0
		best_keep = new Int32Array( 4 )
		best_coef = new Float64Array( 4 )
		best_n = 0

		ray( world: $bog_gamengine_phys3_cast_world, origin: Float32Array, dir: Float32Array, max: number, out: Float32Array, skip_ghost = false ) {
			this.world = world
			const ud = this.ud
			const len = Math.sqrt( dir[ 0 ] * dir[ 0 ] + dir[ 1 ] * dir[ 1 ] + dir[ 2 ] * dir[ 2 ] )
			if( !( len > 0 ) || !( max > 0 ) ) return -1
			ud[ 0 ] = dir[ 0 ] / len
			ud[ 1 ] = dir[ 1 ] / len
			ud[ 2 ] = dir[ 2 ] / len
			const o = this.origin
			o[ 0 ] = origin[ 0 ]
			o[ 1 ] = origin[ 1 ]
			o[ 2 ] = origin[ 2 ]
			this.shape[ 0 ] = $bog_gamengine_phys3.shape_sphere
			this.size[ 0 ] = this.size[ 1 ] = this.size[ 2 ] = 0
			this.pos[ 0 ] = o[ 0 ]
			this.pos[ 1 ] = o[ 1 ]
			this.pos[ 2 ] = o[ 2 ]
			this.rot[ 0 ] = this.rot[ 1 ] = this.rot[ 2 ] = 0
			this.rot[ 3 ] = 1
			const ghost = $bog_gamengine_phys3.flag_ghost
			const flags = world.flags, shape = world.shape
			const hit = this.hit
			let best = -1
			let limit = max
			for( let i = 0; i < world.count; ++ i ) {
				if( skip_ghost && flags[ i ] & ghost ) continue
				if( shape[ i ] !== $bog_gamengine_phys3.shape_plane && !this.slab( i, limit ) ) continue
				this.load( 1, i )
				let t = -1
				switch( shape[ i ] ) {
					case $bog_gamengine_phys3.shape_sphere: t = this.ray_sphere( limit ); break
					case $bog_gamengine_phys3.shape_box: t = this.ray_box( limit ); break
					case $bog_gamengine_phys3.shape_capsule: t = this.ray_capsule( limit ); break
					case $bog_gamengine_phys3.shape_plane: t = this.sweep_plane( limit ); break
					default: t = this.advance( limit )
				}
				if( t < 0 || t > limit ) continue
				best = i
				limit = t
				out.set( hit )
			}
			return best
		}

		sweep( world: $bog_gamengine_phys3_cast_world, shape: number, size: Float32Array, origin: Float32Array, rot: Float32Array, dir: Float32Array, max: number, out: Float32Array, skip_ghost = false ) {
			this.world = world
			const ud = this.ud
			const len = Math.sqrt( dir[ 0 ] * dir[ 0 ] + dir[ 1 ] * dir[ 1 ] + dir[ 2 ] * dir[ 2 ] )
			if( !( len > 0 ) || !( max > 0 ) ) return -1
			ud[ 0 ] = dir[ 0 ] / len
			ud[ 1 ] = dir[ 1 ] / len
			ud[ 2 ] = dir[ 2 ] / len
			const o = this.origin
			o[ 0 ] = origin[ 0 ]
			o[ 1 ] = origin[ 1 ]
			o[ 2 ] = origin[ 2 ]
			this.shape[ 0 ] = shape
			this.size[ 0 ] = size[ 0 ]
			this.size[ 1 ] = size[ 1 ]
			this.size[ 2 ] = size[ 2 ]
			this.rot[ 0 ] = rot[ 0 ]
			this.rot[ 1 ] = rot[ 1 ]
			this.rot[ 2 ] = rot[ 2 ]
			this.rot[ 3 ] = rot[ 3 ]
			this.pos[ 0 ] = o[ 0 ]
			this.pos[ 1 ] = o[ 1 ]
			this.pos[ 2 ] = o[ 2 ]
			this.bounds( max )
			const ghost = $bog_gamengine_phys3.flag_ghost
			const flags = world.flags, shapes = world.shape, aabb = world.aabb
			const lo = this.box_lo, hi = this.box_hi
			const hit = this.hit
			let best = -1
			let limit = max
			for( let i = 0; i < world.count; ++ i ) {
				if( skip_ghost && flags[ i ] & ghost ) continue
				const a = i * 6
				if( aabb[ a ] > hi[ 0 ] || aabb[ a + 3 ] < lo[ 0 ] ) continue
				if( aabb[ a + 1 ] > hi[ 1 ] || aabb[ a + 4 ] < lo[ 1 ] ) continue
				if( aabb[ a + 2 ] > hi[ 2 ] || aabb[ a + 5 ] < lo[ 2 ] ) continue
				this.load( 1, i )
				let t = -1
				const sb = shapes[ i ]
				if( sb === $bog_gamengine_phys3.shape_plane ) t = this.sweep_plane( limit )
				else if( sb === $bog_gamengine_phys3.shape_sphere && shape === $bog_gamengine_phys3.shape_sphere ) t = this.ray_sphere( limit )
				else t = this.advance( limit )
				if( t < 0 || t > limit ) continue
				best = i
				limit = t
				out.set( hit )
			}
			return best
		}

		load( s: number, i: number ) {
			const world = this.world
			this.shape[ s ] = world.shape[ i ]
			this.size[ s * 3 ] = world.size[ i * 3 ]
			this.size[ s * 3 + 1 ] = world.size[ i * 3 + 1 ]
			this.size[ s * 3 + 2 ] = world.size[ i * 3 + 2 ]
			this.pos[ s * 3 ] = world.pos[ i * 3 ]
			this.pos[ s * 3 + 1 ] = world.pos[ i * 3 + 1 ]
			this.pos[ s * 3 + 2 ] = world.pos[ i * 3 + 2 ]
			this.rot[ s * 4 ] = world.rot[ i * 4 ]
			this.rot[ s * 4 + 1 ] = world.rot[ i * 4 + 1 ]
			this.rot[ s * 4 + 2 ] = world.rot[ i * 4 + 2 ]
			this.rot[ s * 4 + 3 ] = world.rot[ i * 4 + 3 ]
			this.hoff[ s ] = world.hull_off[ i ]
			this.hcnt[ s ] = world.hull_count[ i ]
		}

		bounds( max: number ) {
			const lo = this.box_lo, hi = this.box_hi, tmp = this.tmp, ud = this.ud
			for( let k = 0; k < 3; ++ k ) {
				this.support( 0, k === 0 ? 1 : 0, k === 1 ? 1 : 0, k === 2 ? 1 : 0, tmp )
				hi[ k ] = tmp[ k ]
				this.support( 0, k === 0 ? -1 : 0, k === 1 ? -1 : 0, k === 2 ? -1 : 0, tmp )
				lo[ k ] = tmp[ k ]
				const d = ud[ k ] * max
				if( d > 0 ) hi[ k ] += d
				else lo[ k ] += d
			}
		}

		slab( i: number, max: number ) {
			const aabb = this.world.aabb, a = i * 6
			const o = this.origin, ud = this.ud
			let t0 = 0, t1 = max
			for( let k = 0; k < 3; ++ k ) {
				const d = ud[ k ]
				if( d === 0 ) {
					if( o[ k ] < aabb[ a + k ] || o[ k ] > aabb[ a + k + 3 ] ) return false
					continue
				}
				const inv = 1 / d
				let n = ( aabb[ a + k ] - o[ k ] ) * inv
				let f = ( aabb[ a + k + 3 ] - o[ k ] ) * inv
				if( n > f ) {
					const s = n
					n = f
					f = s
				}
				if( n > t0 ) t0 = n
				if( f < t1 ) t1 = f
				if( t0 > t1 ) return false
			}
			return true
		}

		rotate( out: Float32Array | Float64Array, s: number, x: number, y: number, z: number, inv: boolean ) {
			const q = this.rot, r = s * 4
			const k = inv ? -1 : 1
			const qx = q[ r ] * k, qy = q[ r + 1 ] * k, qz = q[ r + 2 ] * k, qw = q[ r + 3 ]
			const tx = 2 * ( qy * z - qz * y )
			const ty = 2 * ( qz * x - qx * z )
			const tz = 2 * ( qx * y - qy * x )
			out[ 0 ] = x + qw * tx + qy * tz - qz * ty
			out[ 1 ] = y + qw * ty + qz * tx - qx * tz
			out[ 2 ] = z + qw * tz + qx * ty - qy * tx
			return out
		}

		support( s: number, dx: number, dy: number, dz: number, out: Float32Array | Float64Array ) {
			const shape = this.shape[ s ], size = this.size, so = s * 3, pos = this.pos
			if( shape === $bog_gamengine_phys3.shape_sphere ) {
				const len = Math.sqrt( dx * dx + dy * dy + dz * dz )
				const k = len > 0 ? size[ so ] / len : 0
				out[ 0 ] = dx * k
				out[ 1 ] = dy * k
				out[ 2 ] = dz * k
			} else if( shape === $bog_gamengine_phys3.shape_box ) {
				const l = this.rotate( this.tmp, s, dx, dy, dz, true )
				this.rotate( out, s, l[ 0 ] >= 0 ? size[ so ] : - size[ so ], l[ 1 ] >= 0 ? size[ so + 1 ] : - size[ so + 1 ], l[ 2 ] >= 0 ? size[ so + 2 ] : - size[ so + 2 ], false )
			} else if( shape === $bog_gamengine_phys3.shape_capsule ) {
				const l = this.rotate( this.tmp, s, dx, dy, dz, true )
				this.rotate( out, s, 0, l[ 1 ] >= 0 ? size[ so + 1 ] : - size[ so + 1 ], 0, false )
				const len = Math.sqrt( dx * dx + dy * dy + dz * dz )
				const k = len > 0 ? size[ so ] / len : 0
				out[ 0 ] += dx * k
				out[ 1 ] += dy * k
				out[ 2 ] += dz * k
			} else if( shape === $bog_gamengine_phys3.shape_hull ) {
				const l = this.rotate( this.tmp, s, dx, dy, dz, true )
				const hull = this.world.hull, off = this.hoff[ s ], count = this.hcnt[ s ]
				let best = - Infinity, bx = 0, by = 0, bz = 0
				for( let k = 0; k < count; ++ k ) {
					const vx = hull[ off + k * 3 ], vy = hull[ off + k * 3 + 1 ], vz = hull[ off + k * 3 + 2 ]
					const d = vx * l[ 0 ] + vy * l[ 1 ] + vz * l[ 2 ]
					if( d > best ) {
						best = d
						bx = vx
						by = vy
						bz = vz
					}
				}
				this.rotate( out, s, bx, by, bz, false )
			} else {
				out[ 0 ] = 0
				out[ 1 ] = 0
				out[ 2 ] = 0
			}
			out[ 0 ] += pos[ so ]
			out[ 1 ] += pos[ so + 1 ]
			out[ 2 ] += pos[ so + 2 ]
			return out
		}

		record( t: number, px: number, py: number, pz: number, nx: number, ny: number, nz: number ) {
			const hit = this.hit
			hit[ 0 ] = t
			hit[ 1 ] = px
			hit[ 2 ] = py
			hit[ 3 ] = pz
			hit[ 4 ] = nx
			hit[ 5 ] = ny
			hit[ 6 ] = nz
			return t
		}

		ray_sphere( limit: number ) {
			const o = this.origin, ud = this.ud, pos = this.pos
			const r = this.size[ 3 ] + this.size[ 0 ]
			const mx = o[ 0 ] - pos[ 3 ], my = o[ 1 ] - pos[ 4 ], mz = o[ 2 ] - pos[ 5 ]
			const b = mx * ud[ 0 ] + my * ud[ 1 ] + mz * ud[ 2 ]
			const c = mx * mx + my * my + mz * mz - r * r
			if( c > 0 && b > 0 ) return -1
			const disc = b * b - c
			if( disc < 0 ) return -1
			let t = - b - Math.sqrt( disc )
			if( t < 0 ) t = 0
			if( t > limit ) return -1
			const cx = o[ 0 ] + ud[ 0 ] * t, cy = o[ 1 ] + ud[ 1 ] * t, cz = o[ 2 ] + ud[ 2 ] * t
			let nx = cx - pos[ 3 ], ny = cy - pos[ 4 ], nz = cz - pos[ 5 ]
			const len = Math.sqrt( nx * nx + ny * ny + nz * nz )
			if( len > 0 ) {
				nx /= len
				ny /= len
				nz /= len
			} else {
				nx = - ud[ 0 ]
				ny = - ud[ 1 ]
				nz = - ud[ 2 ]
			}
			const rb = this.size[ 3 ]
			return this.record( t, pos[ 3 ] + nx * rb, pos[ 4 ] + ny * rb, pos[ 5 ] + nz * rb, nx, ny, nz )
		}

		local() {
			const o = this.origin, ud = this.ud, pos = this.pos
			this.rotate( this.lo, 1, o[ 0 ] - pos[ 3 ], o[ 1 ] - pos[ 4 ], o[ 2 ] - pos[ 5 ], true )
			this.rotate( this.ld, 1, ud[ 0 ], ud[ 1 ], ud[ 2 ], true )
		}

		local_hit( t: number, nx: number, ny: number, nz: number ) {
			const o = this.origin, ud = this.ud
			const n = this.rotate( this.ln, 1, nx, ny, nz, false )
			return this.record( t, o[ 0 ] + ud[ 0 ] * t, o[ 1 ] + ud[ 1 ] * t, o[ 2 ] + ud[ 2 ] * t, n[ 0 ], n[ 1 ], n[ 2 ] )
		}

		ray_box( limit: number ) {
			this.local()
			const lo = this.lo, ld = this.ld, size = this.size
			let t0 = 0, t1 = limit, axis = -1, sign = 0
			for( let k = 0; k < 3; ++ k ) {
				const h = size[ 3 + k ]
				const d = ld[ k ]
				if( Math.abs( d ) < 1e-9 ) {
					if( lo[ k ] < - h || lo[ k ] > h ) return -1
					continue
				}
				const inv = 1 / d
				let n = ( - h - lo[ k ] ) * inv
				let f = ( h - lo[ k ] ) * inv
				let s = -1
				if( n > f ) {
					const x = n
					n = f
					f = x
					s = 1
				}
				if( n > t0 ) {
					t0 = n
					axis = k
					sign = s
				}
				if( f < t1 ) t1 = f
				if( t0 > t1 ) return -1
			}
			if( axis < 0 ) return this.record( 0, this.origin[ 0 ], this.origin[ 1 ], this.origin[ 2 ], - this.ud[ 0 ], - this.ud[ 1 ], - this.ud[ 2 ] )
			return this.local_hit( t0, axis === 0 ? sign : 0, axis === 1 ? sign : 0, axis === 2 ? sign : 0 )
		}

		ray_capsule( limit: number ) {
			this.local()
			const lo = this.lo, ld = this.ld
			const r = this.size[ 3 ], h = this.size[ 4 ]
			const cy = Math.max( - h, Math.min( h, lo[ 1 ] ) )
			if( lo[ 0 ] * lo[ 0 ] + ( lo[ 1 ] - cy ) * ( lo[ 1 ] - cy ) + lo[ 2 ] * lo[ 2 ] <= r * r ) {
				return this.record( 0, this.origin[ 0 ], this.origin[ 1 ], this.origin[ 2 ], - this.ud[ 0 ], - this.ud[ 1 ], - this.ud[ 2 ] )
			}
			let best = Infinity, nx = 0, ny = 0, nz = 0
			const a = ld[ 0 ] * ld[ 0 ] + ld[ 2 ] * ld[ 2 ]
			if( a > 1e-12 ) {
				const b = lo[ 0 ] * ld[ 0 ] + lo[ 2 ] * ld[ 2 ]
				const c = lo[ 0 ] * lo[ 0 ] + lo[ 2 ] * lo[ 2 ] - r * r
				const disc = b * b - a * c
				if( disc >= 0 ) {
					const t = ( - b - Math.sqrt( disc ) ) / a
					const y = lo[ 1 ] + ld[ 1 ] * t
					if( t >= 0 && t <= limit && y >= - h && y <= h ) {
						best = t
						nx = ( lo[ 0 ] + ld[ 0 ] * t ) / r
						ny = 0
						nz = ( lo[ 2 ] + ld[ 2 ] * t ) / r
					}
				}
			}
			for( let s = -1; s <= 1; s += 2 ) {
				const my = lo[ 1 ] - h * s
				const b = lo[ 0 ] * ld[ 0 ] + my * ld[ 1 ] + lo[ 2 ] * ld[ 2 ]
				const c = lo[ 0 ] * lo[ 0 ] + my * my + lo[ 2 ] * lo[ 2 ] - r * r
				const disc = b * b - c
				if( disc < 0 ) continue
				const t = - b - Math.sqrt( disc )
				if( t < 0 || t > limit || t >= best ) continue
				best = t
				nx = ( lo[ 0 ] + ld[ 0 ] * t ) / r
				ny = ( my + ld[ 1 ] * t ) / r
				nz = ( lo[ 2 ] + ld[ 2 ] * t ) / r
			}
			if( best > limit ) return -1
			return this.local_hit( best, nx, ny, nz )
		}

		sweep_plane( limit: number ) {
			const n = this.rotate( this.pn, 1, this.size[ 3 ], this.size[ 4 ], this.size[ 5 ], false )
			const len = Math.sqrt( n[ 0 ] * n[ 0 ] + n[ 1 ] * n[ 1 ] + n[ 2 ] * n[ 2 ] )
			if( !( len > 0 ) ) return -1
			n[ 0 ] /= len
			n[ 1 ] /= len
			n[ 2 ] /= len
			const pos = this.pos, ud = this.ud
			const deep = this.support( 0, - n[ 0 ], - n[ 1 ], - n[ 2 ], this.tmp )
			const d0 = ( deep[ 0 ] - pos[ 3 ] ) * n[ 0 ] + ( deep[ 1 ] - pos[ 4 ] ) * n[ 1 ] + ( deep[ 2 ] - pos[ 5 ] ) * n[ 2 ]
			if( d0 <= 0 ) return this.record( 0, deep[ 0 ], deep[ 1 ], deep[ 2 ], n[ 0 ], n[ 1 ], n[ 2 ] )
			const approach = - ( ud[ 0 ] * n[ 0 ] + ud[ 1 ] * n[ 1 ] + ud[ 2 ] * n[ 2 ] )
			if( approach <= 1e-9 ) return -1
			const t = d0 / approach
			if( t > limit ) return -1
			return this.record( t, deep[ 0 ] + ud[ 0 ] * t, deep[ 1 ] + ud[ 1 ] * t, deep[ 2 ] + ud[ 2 ] * t, n[ 0 ], n[ 1 ], n[ 2 ] )
		}

		advance( limit: number ) {
			const o = this.origin, ud = this.ud, pos = this.pos, v = this.v, pb = this.pb, last = this.last
			const tol = $bog_gamengine_phys3_cast.tolerance
			pos[ 0 ] = o[ 0 ]
			pos[ 1 ] = o[ 1 ]
			pos[ 2 ] = o[ 2 ]
			let t = 0
			for( let iter = 0; iter < $bog_gamengine_phys3_cast.iterations; ++ iter ) {
				const d = this.gjk()
				if( d < tol ) {
					if( this.sn !== 4 ) {
						const approach = - ( ud[ 0 ] * v[ 0 ] + ud[ 1 ] * v[ 1 ] + ud[ 2 ] * v[ 2 ] )
						if( approach > 0.1 ) t = Math.min( limit, t + d / approach )
						return this.record( t, pb[ 0 ], pb[ 1 ], pb[ 2 ], v[ 0 ], v[ 1 ], v[ 2 ] )
					}
					if( iter === 0 ) return this.record( 0, pos[ 0 ], pos[ 1 ], pos[ 2 ], - ud[ 0 ], - ud[ 1 ], - ud[ 2 ] )
					return this.record( t, last[ 0 ], last[ 1 ], last[ 2 ], last[ 3 ], last[ 4 ], last[ 5 ] )
				}
				const approach = - ( ud[ 0 ] * v[ 0 ] + ud[ 1 ] * v[ 1 ] + ud[ 2 ] * v[ 2 ] )
				if( approach <= 1e-6 ) return -1
				last[ 0 ] = pb[ 0 ]
				last[ 1 ] = pb[ 1 ]
				last[ 2 ] = pb[ 2 ]
				last[ 3 ] = v[ 0 ]
				last[ 4 ] = v[ 1 ]
				last[ 5 ] = v[ 2 ]
				t += d / approach
				if( t > limit ) return -1
				pos[ 0 ] = o[ 0 ] + ud[ 0 ] * t
				pos[ 1 ] = o[ 1 ] + ud[ 1 ] * t
				pos[ 2 ] = o[ 2 ] + ud[ 2 ] * t
			}
			return -1
		}

		gjk() {
			const v = this.v, wa = this.wa, wb = this.wb, sw = this.sw, sa = this.sa, sb = this.sb, pos = this.pos
			v[ 0 ] = pos[ 0 ] - pos[ 3 ]
			v[ 1 ] = pos[ 1 ] - pos[ 4 ]
			v[ 2 ] = pos[ 2 ] - pos[ 5 ]
			let vv = v[ 0 ] * v[ 0 ] + v[ 1 ] * v[ 1 ] + v[ 2 ] * v[ 2 ]
			if( vv < 1e-12 ) {
				v[ 0 ] = 1
				vv = 1
			}
			this.sn = 0
			for( let iter = 0; iter < 48; ++ iter ) {
				this.support( 0, - v[ 0 ], - v[ 1 ], - v[ 2 ], wa )
				this.support( 1, v[ 0 ], v[ 1 ], v[ 2 ], wb )
				const wx = wa[ 0 ] - wb[ 0 ], wy = wa[ 1 ] - wb[ 1 ], wz = wa[ 2 ] - wb[ 2 ]
				const vw = v[ 0 ] * wx + v[ 1 ] * wy + v[ 2 ] * wz
				if( this.sn > 0 && vv - vw <= 1e-6 * vv + 1e-6 * Math.sqrt( vv ) ) break
				let dup = false
				for( let k = 0; k < this.sn; ++ k ) {
					if( sw[ k * 3 ] === wx && sw[ k * 3 + 1 ] === wy && sw[ k * 3 + 2 ] === wz ) dup = true
				}
				if( dup ) break
				const k = this.sn
				sw[ k * 3 ] = wx
				sw[ k * 3 + 1 ] = wy
				sw[ k * 3 + 2 ] = wz
				sa[ k * 3 ] = wa[ 0 ]
				sa[ k * 3 + 1 ] = wa[ 1 ]
				sa[ k * 3 + 2 ] = wa[ 2 ]
				sb[ k * 3 ] = wb[ 0 ]
				sb[ k * 3 + 1 ] = wb[ 1 ]
				sb[ k * 3 + 2 ] = wb[ 2 ]
				this.sn = k + 1
				if( !this.reduce() ) {
					this.sn = 4
					return 0
				}
				vv = v[ 0 ] * v[ 0 ] + v[ 1 ] * v[ 1 ] + v[ 2 ] * v[ 2 ]
				if( vv < 1e-12 ) {
					this.sn = 4
					return 0
				}
			}
			const d = Math.sqrt( vv )
			const pb = this.pb
			pb[ 0 ] = pb[ 1 ] = pb[ 2 ] = 0
			for( let k = 0; k < this.sn; ++ k ) {
				const c = this.coef[ k ]
				pb[ 0 ] += sb[ k * 3 ] * c
				pb[ 1 ] += sb[ k * 3 + 1 ] * c
				pb[ 2 ] += sb[ k * 3 + 2 ] * c
			}
			v[ 0 ] /= d
			v[ 1 ] /= d
			v[ 2 ] /= d
			return d
		}

		reduce() {
			const sn = this.sn, sw = this.sw, sa = this.sa, sb = this.sb, keep = this.keep, coef = this.coef
			if( sn === 1 ) {
				keep[ 0 ] = 0
				coef[ 0 ] = 1
				this.keep_n = 1
			} else if( sn === 2 ) {
				this.segment( 0, 1 )
			} else if( sn === 3 ) {
				this.triangle( 0, 1, 2 )
			} else {
				if( !this.tetra() ) return false
			}
			const n = this.keep_n
			for( let k = 0; k < n; ++ k ) {
				const from = keep[ k ]
				if( from === k ) continue
				sw[ k * 3 ] = sw[ from * 3 ]
				sw[ k * 3 + 1 ] = sw[ from * 3 + 1 ]
				sw[ k * 3 + 2 ] = sw[ from * 3 + 2 ]
				sa[ k * 3 ] = sa[ from * 3 ]
				sa[ k * 3 + 1 ] = sa[ from * 3 + 1 ]
				sa[ k * 3 + 2 ] = sa[ from * 3 + 2 ]
				sb[ k * 3 ] = sb[ from * 3 ]
				sb[ k * 3 + 1 ] = sb[ from * 3 + 1 ]
				sb[ k * 3 + 2 ] = sb[ from * 3 + 2 ]
			}
			this.sn = n
			const v = this.v
			v[ 0 ] = v[ 1 ] = v[ 2 ] = 0
			for( let k = 0; k < n; ++ k ) {
				const c = coef[ k ]
				v[ 0 ] += sw[ k * 3 ] * c
				v[ 1 ] += sw[ k * 3 + 1 ] * c
				v[ 2 ] += sw[ k * 3 + 2 ] * c
			}
			return true
		}

		segment( i: number, j: number ) {
			const sw = this.sw, keep = this.keep, coef = this.coef
			const ax = sw[ i * 3 ], ay = sw[ i * 3 + 1 ], az = sw[ i * 3 + 2 ]
			const bx = sw[ j * 3 ] - ax, by = sw[ j * 3 + 1 ] - ay, bz = sw[ j * 3 + 2 ] - az
			const bb = bx * bx + by * by + bz * bz
			let t = bb > 0 ? - ( ax * bx + ay * by + az * bz ) / bb : 0
			if( t <= 0 ) {
				keep[ 0 ] = i
				coef[ 0 ] = 1
				this.keep_n = 1
			} else if( t >= 1 ) {
				keep[ 0 ] = j
				coef[ 0 ] = 1
				this.keep_n = 1
			} else {
				keep[ 0 ] = i
				keep[ 1 ] = j
				coef[ 0 ] = 1 - t
				coef[ 1 ] = t
				this.keep_n = 2
			}
			const px = ax + bx * t, py = ay + by * t, pz = az + bz * t
			return px * px + py * py + pz * pz
		}

		triangle( i: number, j: number, k: number ) {
			const sw = this.sw, keep = this.keep, coef = this.coef
			const ax = sw[ i * 3 ], ay = sw[ i * 3 + 1 ], az = sw[ i * 3 + 2 ]
			const bx = sw[ j * 3 ], by = sw[ j * 3 + 1 ], bz = sw[ j * 3 + 2 ]
			const cx = sw[ k * 3 ], cy = sw[ k * 3 + 1 ], cz = sw[ k * 3 + 2 ]
			const abx = bx - ax, aby = by - ay, abz = bz - az
			const acx = cx - ax, acy = cy - ay, acz = cz - az
			const d1 = - ( abx * ax + aby * ay + abz * az )
			const d2 = - ( acx * ax + acy * ay + acz * az )
			if( d1 <= 0 && d2 <= 0 ) {
				keep[ 0 ] = i
				coef[ 0 ] = 1
				this.keep_n = 1
				return ax * ax + ay * ay + az * az
			}
			const d3 = - ( abx * bx + aby * by + abz * bz )
			const d4 = - ( acx * bx + acy * by + acz * bz )
			if( d3 >= 0 && d4 <= d3 ) {
				keep[ 0 ] = j
				coef[ 0 ] = 1
				this.keep_n = 1
				return bx * bx + by * by + bz * bz
			}
			const vc = d1 * d4 - d3 * d2
			if( vc <= 0 && d1 >= 0 && d3 <= 0 ) return this.segment( i, j )
			const d5 = - ( abx * cx + aby * cy + abz * cz )
			const d6 = - ( acx * cx + acy * cy + acz * cz )
			if( d6 >= 0 && d5 <= d6 ) {
				keep[ 0 ] = k
				coef[ 0 ] = 1
				this.keep_n = 1
				return cx * cx + cy * cy + cz * cz
			}
			const vb = d5 * d2 - d1 * d6
			if( vb <= 0 && d2 >= 0 && d6 <= 0 ) return this.segment( i, k )
			const va = d3 * d6 - d5 * d4
			if( va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0 ) return this.segment( j, k )
			const denom = 1 / ( va + vb + vc )
			const wb = vb * denom, wc = vc * denom
			keep[ 0 ] = i
			keep[ 1 ] = j
			keep[ 2 ] = k
			coef[ 0 ] = 1 - wb - wc
			coef[ 1 ] = wb
			coef[ 2 ] = wc
			this.keep_n = 3
			const px = ax + abx * wb + acx * wc, py = ay + aby * wb + acy * wc, pz = az + abz * wb + acz * wc
			return px * px + py * py + pz * pz
		}

		outside( i: number, j: number, k: number, l: number ) {
			const sw = this.sw
			const ax = sw[ i * 3 ], ay = sw[ i * 3 + 1 ], az = sw[ i * 3 + 2 ]
			const abx = sw[ j * 3 ] - ax, aby = sw[ j * 3 + 1 ] - ay, abz = sw[ j * 3 + 2 ] - az
			const acx = sw[ k * 3 ] - ax, acy = sw[ k * 3 + 1 ] - ay, acz = sw[ k * 3 + 2 ] - az
			const nx = aby * acz - abz * acy, ny = abz * acx - abx * acz, nz = abx * acy - aby * acx
			const so = - ( nx * ax + ny * ay + nz * az )
			const sl = nx * ( sw[ l * 3 ] - ax ) + ny * ( sw[ l * 3 + 1 ] - ay ) + nz * ( sw[ l * 3 + 2 ] - az )
			return so * sl <= 0
		}

		tetra() {
			let best = Infinity
			let any = false
			for( let f = 0; f < 4; ++ f ) {
				const i = f === 0 ? 1 : 0
				const j = f <= 1 ? 2 : 1
				const k = f <= 2 ? 3 : 2
				if( !this.outside( i, j, k, f ) ) continue
				any = true
				const d = this.triangle( i, j, k )
				if( d < best ) {
					best = d
					this.best_n = this.keep_n
					for( let m = 0; m < this.keep_n; ++ m ) {
						this.best_keep[ m ] = this.keep[ m ]
						this.best_coef[ m ] = this.coef[ m ]
					}
				}
			}
			if( !any ) return false
			this.keep_n = this.best_n
			for( let m = 0; m < this.best_n; ++ m ) {
				this.keep[ m ] = this.best_keep[ m ]
				this.coef[ m ] = this.best_coef[ m ]
			}
			return true
		}

	}

}
