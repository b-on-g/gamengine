namespace $ {

	export type $bog_gamengine_phys3_narrow_world = {
		pos: Float32Array
		rot: Float32Array
		shape: Uint8Array
		size: Float32Array
		flags: Uint8Array
		hull_off: Uint32Array
		hull_count: Uint32Array
		hull: Float32Array
	}

	const vert_cap = 128
	const face_cap = 256

	export class $bog_gamengine_phys3_narrow extends $mol_object2 {

		contact_cap = 0
		contact_count = 0
		contact_a = new Uint32Array( 0 )
		contact_b = new Uint32Array( 0 )
		contact_point = new Float32Array( 0 )
		contact_normal = new Float32Array( 0 )
		contact_depth = new Float32Array( 0 )

		world = {} as $bog_gamengine_phys3_narrow_world
		pair_a = 0
		pair_b = 0
		flip = false

		pa = new Float32Array( 3 )
		pb = new Float32Array( 3 )
		qa = new Float32Array( 4 )
		qb = new Float32Array( 4 )
		ua = new Float32Array( 9 )
		ub = new Float32Array( 9 )
		pn = new Float32Array( 3 )
		axis = new Float32Array( 3 )
		dir = new Float32Array( 3 )
		tmp = new Float32Array( 3 )
		sup = new Float32Array( 3 )
		sup_local = new Float32Array( 3 )

		cand_count = 0
		cand_depth = new Float32Array( 4 )
		cand_point = new Float32Array( 12 )

		poly_count = 0
		poly = new Float32Array( 48 )
		poly_next = new Float32Array( 48 )

		si = new Int32Array( 4 )
		sn = 0
		ev_count = 0
		ev = new Float32Array( vert_cap * 3 )
		eva = new Float32Array( vert_cap * 3 )
		evb = new Float32Array( vert_cap * 3 )
		ef_count = 0
		ef = new Int32Array( face_cap * 3 )
		efn = new Float32Array( face_cap * 3 )
		efd = new Float32Array( face_cap )
		eh_count = 0
		eh = new Int32Array( face_cap * 6 )
		ec = new Float32Array( 3 )

		grow( need: number ) {
			if( need <= this.contact_cap ) return
			let cap = Math.max( this.contact_cap, 64 )
			while( cap < need ) cap *= 2
			this.contact_cap = cap
			const a = new Uint32Array( cap )
			a.set( this.contact_a )
			this.contact_a = a
			const b = new Uint32Array( cap )
			b.set( this.contact_b )
			this.contact_b = b
			const point = new Float32Array( cap * 3 )
			point.set( this.contact_point )
			this.contact_point = point
			const normal = new Float32Array( cap * 3 )
			normal.set( this.contact_normal )
			this.contact_normal = normal
			const depth = new Float32Array( cap )
			depth.set( this.contact_depth )
			this.contact_depth = depth
		}

		collide( world: $bog_gamengine_phys3_narrow_world, pairs: Uint32Array, pair_count: number ) {
			this.world = world
			this.contact_count = 0
			const shape = world.shape
			const sphere = $bog_gamengine_phys3.shape_sphere
			const box = $bog_gamengine_phys3.shape_box
			const capsule = $bog_gamengine_phys3.shape_capsule
			const plane = $bog_gamengine_phys3.shape_plane
			const hull = $bog_gamengine_phys3.shape_hull
			for( let p = 0; p < pair_count; ++ p ) {
				let a = pairs[ p * 2 ], b = pairs[ p * 2 + 1 ]
				let sa = shape[ a ], sb = shape[ b ]
				this.flip = sa > sb
				if( this.flip ) {
					const t = a
					a = b
					b = t
					const s = sa
					sa = sb
					sb = s
				}
				this.pair_a = a
				this.pair_b = b
				this.load( a, this.pa, this.qa )
				this.load( b, this.pb, this.qb )
				if( sa === sphere ) {
					if( sb === sphere ) this.sphere_sphere()
					else if( sb === box ) this.sphere_box()
					else if( sb === capsule ) this.sphere_capsule()
					else if( sb === plane ) this.sphere_plane()
					else this.gjk_epa()
				} else if( sa === box ) {
					if( sb === box ) this.box_box()
					else if( sb === plane ) this.box_plane()
					else this.gjk_epa()
				} else if( sa === capsule ) {
					if( sb === capsule ) this.capsule_capsule()
					else if( sb === plane ) this.capsule_plane()
					else this.gjk_epa()
				} else if( sa === plane ) {
					if( sb === hull ) this.plane_hull()
				} else this.gjk_epa()
			}
			return this.contact_count
		}

		load( i: number, c: Float32Array, q: Float32Array ) {
			const world = this.world
			c[ 0 ] = world.pos[ i * 3 ]
			c[ 1 ] = world.pos[ i * 3 + 1 ]
			c[ 2 ] = world.pos[ i * 3 + 2 ]
			q[ 0 ] = world.rot[ i * 4 ]
			q[ 1 ] = world.rot[ i * 4 + 1 ]
			q[ 2 ] = world.rot[ i * 4 + 2 ]
			q[ 3 ] = world.rot[ i * 4 + 3 ]
		}

		emit( px: number, py: number, pz: number, nx: number, ny: number, nz: number, depth: number ) {
			const k = this.contact_count
			this.grow( k + 1 )
			this.contact_count = k + 1
			if( this.flip ) {
				this.contact_a[ k ] = this.pair_b
				this.contact_b[ k ] = this.pair_a
				nx = - nx
				ny = - ny
				nz = - nz
			} else {
				this.contact_a[ k ] = this.pair_a
				this.contact_b[ k ] = this.pair_b
			}
			this.contact_point[ k * 3 ] = px
			this.contact_point[ k * 3 + 1 ] = py
			this.contact_point[ k * 3 + 2 ] = pz
			this.contact_normal[ k * 3 ] = nx
			this.contact_normal[ k * 3 + 1 ] = ny
			this.contact_normal[ k * 3 + 2 ] = nz
			this.contact_depth[ k ] = depth
		}

		cand_push( px: number, py: number, pz: number, depth: number ) {
			let k = this.cand_count
			const cand_depth = this.cand_depth
			if( k < 4 ) {
				this.cand_count = k + 1
			} else {
				k = 0
				for( let m = 1; m < 4; ++ m ) if( cand_depth[ m ] < cand_depth[ k ] ) k = m
				if( depth <= cand_depth[ k ] ) return
			}
			cand_depth[ k ] = depth
			this.cand_point[ k * 3 ] = px
			this.cand_point[ k * 3 + 1 ] = py
			this.cand_point[ k * 3 + 2 ] = pz
		}

		cand_flush( nx: number, ny: number, nz: number ) {
			const point = this.cand_point, depth = this.cand_depth
			for( let k = 0; k < this.cand_count; ++ k ) {
				this.emit( point[ k * 3 ], point[ k * 3 + 1 ], point[ k * 3 + 2 ], nx, ny, nz, depth[ k ] )
			}
			this.cand_count = 0
		}

		rot_apply( out: Float32Array, q: Float32Array, vx: number, vy: number, vz: number ) {
			const qx = q[ 0 ], qy = q[ 1 ], qz = q[ 2 ], qw = q[ 3 ]
			const tx = 2 * ( qy * vz - qz * vy )
			const ty = 2 * ( qz * vx - qx * vz )
			const tz = 2 * ( qx * vy - qy * vx )
			out[ 0 ] = vx + qw * tx + qy * tz - qz * ty
			out[ 1 ] = vy + qw * ty + qz * tx - qx * tz
			out[ 2 ] = vz + qw * tz + qx * ty - qy * tx
			return out
		}

		rot_unapply( out: Float32Array, q: Float32Array, vx: number, vy: number, vz: number ) {
			const qx = - q[ 0 ], qy = - q[ 1 ], qz = - q[ 2 ], qw = q[ 3 ]
			const tx = 2 * ( qy * vz - qz * vy )
			const ty = 2 * ( qz * vx - qx * vz )
			const tz = 2 * ( qx * vy - qy * vx )
			out[ 0 ] = vx + qw * tx + qy * tz - qz * ty
			out[ 1 ] = vy + qw * ty + qz * tx - qx * tz
			out[ 2 ] = vz + qw * tz + qx * ty - qy * tx
			return out
		}

		axes( out: Float32Array, q: Float32Array ) {
			const x = q[ 0 ], y = q[ 1 ], z = q[ 2 ], w = q[ 3 ]
			const xx = x * x, yy = y * y, zz = z * z
			const xy = x * y, xz = x * z, yz = y * z
			const wx = w * x, wy = w * y, wz = w * z
			out[ 0 ] = 1 - 2 * ( yy + zz )
			out[ 1 ] = 2 * ( xy + wz )
			out[ 2 ] = 2 * ( xz - wy )
			out[ 3 ] = 2 * ( xy - wz )
			out[ 4 ] = 1 - 2 * ( xx + zz )
			out[ 5 ] = 2 * ( yz + wx )
			out[ 6 ] = 2 * ( xz + wy )
			out[ 7 ] = 2 * ( yz - wx )
			out[ 8 ] = 1 - 2 * ( xx + yy )
			return out
		}

		plane_normal( i: number, q: Float32Array, out: Float32Array ) {
			const size = this.world.size
			this.rot_apply( out, q, size[ i * 3 ], size[ i * 3 + 1 ], size[ i * 3 + 2 ] )
			const len = Math.sqrt( out[ 0 ] * out[ 0 ] + out[ 1 ] * out[ 1 ] + out[ 2 ] * out[ 2 ] )
			const k = len > 0 ? 1 / len : 0
			out[ 0 ] *= k
			out[ 1 ] *= k
			out[ 2 ] *= k
			return out
		}

		sphere_sphere() {
			const size = this.world.size
			const pa = this.pa, pb = this.pb
			const ra = size[ this.pair_a * 3 ], rb = size[ this.pair_b * 3 ]
			this.sphere_pair( pa[ 0 ], pa[ 1 ], pa[ 2 ], ra, pb[ 0 ], pb[ 1 ], pb[ 2 ], rb )
		}

		sphere_pair( ax: number, ay: number, az: number, ra: number, bx: number, by: number, bz: number, rb: number ) {
			const dx = bx - ax, dy = by - ay, dz = bz - az
			const dist = Math.sqrt( dx * dx + dy * dy + dz * dz )
			const depth = ra + rb - dist
			if( depth < 0 ) return
			let nx = 0, ny = 1, nz = 0
			if( dist > 0 ) {
				nx = dx / dist
				ny = dy / dist
				nz = dz / dist
			}
			const k = ra - depth / 2
			this.emit( ax + nx * k, ay + ny * k, az + nz * k, nx, ny, nz, depth )
		}

		sphere_plane() {
			const size = this.world.size
			const pa = this.pa, pb = this.pb
			const n = this.plane_normal( this.pair_b, this.qb, this.pn )
			const r = size[ this.pair_a * 3 ]
			this.sphere_plane_point( pa[ 0 ], pa[ 1 ], pa[ 2 ], r, pb, n )
		}

		sphere_plane_point( cx: number, cy: number, cz: number, r: number, p: Float32Array, n: Float32Array ) {
			const d = ( cx - p[ 0 ] ) * n[ 0 ] + ( cy - p[ 1 ] ) * n[ 1 ] + ( cz - p[ 2 ] ) * n[ 2 ]
			const depth = r - d
			if( depth < 0 ) return
			const k = ( d + r ) / 2
			this.emit( cx - n[ 0 ] * k, cy - n[ 1 ] * k, cz - n[ 2 ] * k, - n[ 0 ], - n[ 1 ], - n[ 2 ], depth )
		}

		box_plane() {
			const size = this.world.size
			const a = this.pair_a
			const pa = this.pa, pb = this.pb, u = this.axes( this.ua, this.qa )
			const n = this.plane_normal( this.pair_b, this.qb, this.pn )
			const h0 = size[ a * 3 ], h1 = size[ a * 3 + 1 ], h2 = size[ a * 3 + 2 ]
			for( let s = 0; s < 8; ++ s ) {
				const s0 = s & 1 ? h0 : - h0
				const s1 = s & 2 ? h1 : - h1
				const s2 = s & 4 ? h2 : - h2
				const vx = pa[ 0 ] + s0 * u[ 0 ] + s1 * u[ 3 ] + s2 * u[ 6 ]
				const vy = pa[ 1 ] + s0 * u[ 1 ] + s1 * u[ 4 ] + s2 * u[ 7 ]
				const vz = pa[ 2 ] + s0 * u[ 2 ] + s1 * u[ 5 ] + s2 * u[ 8 ]
				const d = ( vx - pb[ 0 ] ) * n[ 0 ] + ( vy - pb[ 1 ] ) * n[ 1 ] + ( vz - pb[ 2 ] ) * n[ 2 ]
				if( d > 0 ) continue
				this.cand_push( vx - n[ 0 ] * d / 2, vy - n[ 1 ] * d / 2, vz - n[ 2 ] * d / 2, - d )
			}
			this.cand_flush( - n[ 0 ], - n[ 1 ], - n[ 2 ] )
		}

		capsule_plane() {
			const size = this.world.size
			const a = this.pair_a
			const pa = this.pa, pb = this.pb
			const n = this.plane_normal( this.pair_b, this.qb, this.pn )
			const r = size[ a * 3 ], h = size[ a * 3 + 1 ]
			const axis = this.rot_apply( this.axis, this.qa, 0, h, 0 )
			this.sphere_plane_point( pa[ 0 ] + axis[ 0 ], pa[ 1 ] + axis[ 1 ], pa[ 2 ] + axis[ 2 ], r, pb, n )
			this.sphere_plane_point( pa[ 0 ] - axis[ 0 ], pa[ 1 ] - axis[ 1 ], pa[ 2 ] - axis[ 2 ], r, pb, n )
		}

		plane_hull() {
			const world = this.world
			const b = this.pair_b
			const pa = this.pa, pb = this.pb, qb = this.qb, v = this.tmp
			const n = this.plane_normal( this.pair_a, this.qa, this.pn )
			const hull = world.hull, off = world.hull_off[ b ], count = world.hull_count[ b ]
			for( let k = 0; k < count; ++ k ) {
				this.rot_apply( v, qb, hull[ off + k * 3 ], hull[ off + k * 3 + 1 ], hull[ off + k * 3 + 2 ] )
				const vx = pb[ 0 ] + v[ 0 ], vy = pb[ 1 ] + v[ 1 ], vz = pb[ 2 ] + v[ 2 ]
				const d = ( vx - pa[ 0 ] ) * n[ 0 ] + ( vy - pa[ 1 ] ) * n[ 1 ] + ( vz - pa[ 2 ] ) * n[ 2 ]
				if( d > 0 ) continue
				this.cand_push( vx - n[ 0 ] * d / 2, vy - n[ 1 ] * d / 2, vz - n[ 2 ] * d / 2, - d )
			}
			this.cand_flush( n[ 0 ], n[ 1 ], n[ 2 ] )
		}

		sphere_box() {
			const size = this.world.size
			const a = this.pair_a, b = this.pair_b
			const pa = this.pa, pb = this.pb, qb = this.qb
			const l = this.rot_unapply( this.tmp, qb, pa[ 0 ] - pb[ 0 ], pa[ 1 ] - pb[ 1 ], pa[ 2 ] - pb[ 2 ] )
			const hx = size[ b * 3 ], hy = size[ b * 3 + 1 ], hz = size[ b * 3 + 2 ]
			const r = size[ a * 3 ]
			let cx = l[ 0 ] < - hx ? - hx : l[ 0 ] > hx ? hx : l[ 0 ]
			let cy = l[ 1 ] < - hy ? - hy : l[ 1 ] > hy ? hy : l[ 1 ]
			let cz = l[ 2 ] < - hz ? - hz : l[ 2 ] > hz ? hz : l[ 2 ]
			let dx = l[ 0 ] - cx, dy = l[ 1 ] - cy, dz = l[ 2 ] - cz
			const dist2 = dx * dx + dy * dy + dz * dz
			if( dist2 > r * r ) return
			let depth = 0
			if( dist2 > 1e-12 ) {
				const dist = Math.sqrt( dist2 )
				dx /= dist
				dy /= dist
				dz /= dist
				depth = r - dist
			} else {
				const gx = hx - Math.abs( l[ 0 ] ), gy = hy - Math.abs( l[ 1 ] ), gz = hz - Math.abs( l[ 2 ] )
				dx = 0
				dy = 0
				dz = 0
				if( gx <= gy && gx <= gz ) {
					dx = l[ 0 ] < 0 ? -1 : 1
					cx = dx * hx
					depth = r + gx
				} else if( gy <= gz ) {
					dy = l[ 1 ] < 0 ? -1 : 1
					cy = dy * hy
					depth = r + gy
				} else {
					dz = l[ 2 ] < 0 ? -1 : 1
					cz = dz * hz
					depth = r + gz
				}
			}
			const n = this.rot_apply( this.pn, qb, dx, dy, dz )
			const s = this.rot_apply( this.sup, qb, cx, cy, cz )
			this.emit(
				pb[ 0 ] + s[ 0 ] - n[ 0 ] * depth / 2,
				pb[ 1 ] + s[ 1 ] - n[ 1 ] * depth / 2,
				pb[ 2 ] + s[ 2 ] - n[ 2 ] * depth / 2,
				- n[ 0 ], - n[ 1 ], - n[ 2 ],
				depth,
			)
		}

		sphere_capsule() {
			const size = this.world.size
			const a = this.pair_a, b = this.pair_b
			const pa = this.pa, pb = this.pb
			const ra = size[ a * 3 ], rb = size[ b * 3 ], h = size[ b * 3 + 1 ]
			const axis = this.rot_apply( this.axis, this.qb, 0, 1, 0 )
			let t = ( pa[ 0 ] - pb[ 0 ] ) * axis[ 0 ] + ( pa[ 1 ] - pb[ 1 ] ) * axis[ 1 ] + ( pa[ 2 ] - pb[ 2 ] ) * axis[ 2 ]
			t = t < - h ? - h : t > h ? h : t
			this.sphere_pair( pa[ 0 ], pa[ 1 ], pa[ 2 ], ra, pb[ 0 ] + axis[ 0 ] * t, pb[ 1 ] + axis[ 1 ] * t, pb[ 2 ] + axis[ 2 ] * t, rb )
		}

		capsule_capsule() {
			const size = this.world.size
			const a = this.pair_a, b = this.pair_b
			const pa = this.pa, pb = this.pb
			const ra = size[ a * 3 ], ha = size[ a * 3 + 1 ]
			const rb = size[ b * 3 ], hb = size[ b * 3 + 1 ]
			const d1 = this.rot_apply( this.axis, this.qa, 0, 2 * ha, 0 )
			const d2 = this.rot_apply( this.tmp, this.qb, 0, 2 * hb, 0 )
			const p1x = pa[ 0 ] - d1[ 0 ] / 2, p1y = pa[ 1 ] - d1[ 1 ] / 2, p1z = pa[ 2 ] - d1[ 2 ] / 2
			const p2x = pb[ 0 ] - d2[ 0 ] / 2, p2y = pb[ 1 ] - d2[ 1 ] / 2, p2z = pb[ 2 ] - d2[ 2 ] / 2
			const rx = p1x - p2x, ry = p1y - p2y, rz = p1z - p2z
			const aa = d1[ 0 ] * d1[ 0 ] + d1[ 1 ] * d1[ 1 ] + d1[ 2 ] * d1[ 2 ]
			const ee = d2[ 0 ] * d2[ 0 ] + d2[ 1 ] * d2[ 1 ] + d2[ 2 ] * d2[ 2 ]
			const f = d2[ 0 ] * rx + d2[ 1 ] * ry + d2[ 2 ] * rz
			let s = 0, t = 0
			const eps = 1e-12
			if( aa <= eps && ee <= eps ) {
			} else if( aa <= eps ) {
				t = f / ee
				t = t < 0 ? 0 : t > 1 ? 1 : t
			} else {
				const c = d1[ 0 ] * rx + d1[ 1 ] * ry + d1[ 2 ] * rz
				if( ee <= eps ) {
					s = - c / aa
					s = s < 0 ? 0 : s > 1 ? 1 : s
				} else {
					const bb = d1[ 0 ] * d2[ 0 ] + d1[ 1 ] * d2[ 1 ] + d1[ 2 ] * d2[ 2 ]
					const denom = aa * ee - bb * bb
					if( denom !== 0 ) {
						s = ( bb * f - c * ee ) / denom
						s = s < 0 ? 0 : s > 1 ? 1 : s
					}
					t = ( bb * s + f ) / ee
					if( t < 0 ) {
						t = 0
						s = - c / aa
						s = s < 0 ? 0 : s > 1 ? 1 : s
					} else if( t > 1 ) {
						t = 1
						s = ( bb - c ) / aa
						s = s < 0 ? 0 : s > 1 ? 1 : s
					}
				}
			}
			this.sphere_pair(
				p1x + d1[ 0 ] * s, p1y + d1[ 1 ] * s, p1z + d1[ 2 ] * s, ra,
				p2x + d2[ 0 ] * t, p2y + d2[ 1 ] * t, p2z + d2[ 2 ] * t, rb,
			)
		}

		box_box() {
			const size = this.world.size
			const a = this.pair_a, b = this.pair_b
			const pa = this.pa, pb = this.pb
			const ua = this.axes( this.ua, this.qa ), ub = this.axes( this.ub, this.qb )
			const ha0 = size[ a * 3 ], ha1 = size[ a * 3 + 1 ], ha2 = size[ a * 3 + 2 ]
			const hb0 = size[ b * 3 ], hb1 = size[ b * 3 + 1 ], hb2 = size[ b * 3 + 2 ]
			const dx = pb[ 0 ] - pa[ 0 ], dy = pb[ 1 ] - pa[ 1 ], dz = pb[ 2 ] - pa[ 2 ]
			const dir = this.dir
			let best = Infinity, best_over = 0, best_axis = -1
			for( let k = 0; k < 15; ++ k ) {
				let lx = 0, ly = 0, lz = 0
				if( k < 3 ) {
					lx = ua[ k * 3 ]
					ly = ua[ k * 3 + 1 ]
					lz = ua[ k * 3 + 2 ]
				} else if( k < 6 ) {
					lx = ub[ ( k - 3 ) * 3 ]
					ly = ub[ ( k - 3 ) * 3 + 1 ]
					lz = ub[ ( k - 3 ) * 3 + 2 ]
				} else {
					const i = ( ( k - 6 ) / 3 | 0 ) * 3, j = ( ( k - 6 ) % 3 ) * 3
					const ax = ua[ i ], ay = ua[ i + 1 ], az = ua[ i + 2 ]
					const bx = ub[ j ], by = ub[ j + 1 ], bz = ub[ j + 2 ]
					lx = ay * bz - az * by
					ly = az * bx - ax * bz
					lz = ax * by - ay * bx
					const len2 = lx * lx + ly * ly + lz * lz
					if( len2 < 1e-8 ) continue
					const inv = 1 / Math.sqrt( len2 )
					lx *= inv
					ly *= inv
					lz *= inv
				}
				const ra = ha0 * Math.abs( ua[ 0 ] * lx + ua[ 1 ] * ly + ua[ 2 ] * lz )
					+ ha1 * Math.abs( ua[ 3 ] * lx + ua[ 4 ] * ly + ua[ 5 ] * lz )
					+ ha2 * Math.abs( ua[ 6 ] * lx + ua[ 7 ] * ly + ua[ 8 ] * lz )
				const rb = hb0 * Math.abs( ub[ 0 ] * lx + ub[ 1 ] * ly + ub[ 2 ] * lz )
					+ hb1 * Math.abs( ub[ 3 ] * lx + ub[ 4 ] * ly + ub[ 5 ] * lz )
					+ hb2 * Math.abs( ub[ 6 ] * lx + ub[ 7 ] * ly + ub[ 8 ] * lz )
				const dist = dx * lx + dy * ly + dz * lz
				const over = ra + rb - Math.abs( dist )
				if( over < 0 ) return
				const score = k < 6 ? over : over * 1.05 + 1e-5
				if( score < best ) {
					best = score
					best_over = over
					best_axis = k
					if( dist < 0 ) {
						dir[ 0 ] = - lx
						dir[ 1 ] = - ly
						dir[ 2 ] = - lz
					} else {
						dir[ 0 ] = lx
						dir[ 1 ] = ly
						dir[ 2 ] = lz
					}
				}
			}
			if( best_axis < 0 ) return
			if( best_axis < 6 ) this.box_box_face( best_axis )
			else this.box_box_edge( best_axis, best_over )
		}

		box_box_face( axis: number ) {
			const size = this.world.size
			const ref_a = axis < 3
			const ref = ref_a ? this.pair_a : this.pair_b, inc = ref_a ? this.pair_b : this.pair_a
			const cr = ref_a ? this.pa : this.pb, ci = ref_a ? this.pb : this.pa
			const ur = ref_a ? this.ua : this.ub, ui = ref_a ? this.ub : this.ua
			const dir = this.dir
			const nx = ref_a ? dir[ 0 ] : - dir[ 0 ]
			const ny = ref_a ? dir[ 1 ] : - dir[ 1 ]
			const nz = ref_a ? dir[ 2 ] : - dir[ 2 ]
			const ri = axis % 3
			let j = 0, jd = -1
			for( let k = 0; k < 3; ++ k ) {
				const d = Math.abs( ui[ k * 3 ] * nx + ui[ k * 3 + 1 ] * ny + ui[ k * 3 + 2 ] * nz )
				if( d > jd ) {
					jd = d
					j = k
				}
			}
			const js = ui[ j * 3 ] * nx + ui[ j * 3 + 1 ] * ny + ui[ j * 3 + 2 ] * nz > 0 ? -1 : 1
			const k1 = ( j + 1 ) % 3, k2 = ( j + 2 ) % 3
			const hj = size[ inc * 3 + j ] * js, h1 = size[ inc * 3 + k1 ], h2 = size[ inc * 3 + k2 ]
			const fx = ci[ 0 ] + ui[ j * 3 ] * hj, fy = ci[ 1 ] + ui[ j * 3 + 1 ] * hj, fz = ci[ 2 ] + ui[ j * 3 + 2 ] * hj
			const e1x = ui[ k1 * 3 ] * h1, e1y = ui[ k1 * 3 + 1 ] * h1, e1z = ui[ k1 * 3 + 2 ] * h1
			const e2x = ui[ k2 * 3 ] * h2, e2y = ui[ k2 * 3 + 1 ] * h2, e2z = ui[ k2 * 3 + 2 ] * h2
			const poly = this.poly
			poly[ 0 ] = fx + e1x + e2x
			poly[ 1 ] = fy + e1y + e2y
			poly[ 2 ] = fz + e1z + e2z
			poly[ 3 ] = fx - e1x + e2x
			poly[ 4 ] = fy - e1y + e2y
			poly[ 5 ] = fz - e1z + e2z
			poly[ 6 ] = fx - e1x - e2x
			poly[ 7 ] = fy - e1y - e2y
			poly[ 8 ] = fz - e1z - e2z
			poly[ 9 ] = fx + e1x - e2x
			poly[ 10 ] = fy + e1y - e2y
			poly[ 11 ] = fz + e1z - e2z
			this.poly_count = 4
			for( let m = 0; m < 3; ++ m ) {
				if( m === ri ) continue
				const mx = ur[ m * 3 ], my = ur[ m * 3 + 1 ], mz = ur[ m * 3 + 2 ]
				const cd = mx * cr[ 0 ] + my * cr[ 1 ] + mz * cr[ 2 ]
				const h = size[ ref * 3 + m ]
				this.clip( mx, my, mz, cd + h )
				this.clip( - mx, - my, - mz, - cd + h )
			}
			const hr = size[ ref * 3 + ri ]
			const cn = nx * cr[ 0 ] + ny * cr[ 1 ] + nz * cr[ 2 ] + hr
			const out = this.poly
			for( let k = 0; k < this.poly_count; ++ k ) {
				const vx = out[ k * 3 ], vy = out[ k * 3 + 1 ], vz = out[ k * 3 + 2 ]
				const sep = nx * vx + ny * vy + nz * vz - cn
				if( sep > 0 ) continue
				this.cand_push( vx - nx * sep / 2, vy - ny * sep / 2, vz - nz * sep / 2, - sep )
			}
			this.cand_flush( dir[ 0 ], dir[ 1 ], dir[ 2 ] )
		}

		clip( nx: number, ny: number, nz: number, off: number ) {
			const src = this.poly, dst = this.poly_next, n = this.poly_count
			let m = 0
			for( let i = 0; i < n; ++ i ) {
				const j = ( i + 1 ) % n
				const ix = src[ i * 3 ], iy = src[ i * 3 + 1 ], iz = src[ i * 3 + 2 ]
				const jx = src[ j * 3 ], jy = src[ j * 3 + 1 ], jz = src[ j * 3 + 2 ]
				const fi = off - ( nx * ix + ny * iy + nz * iz )
				const fj = off - ( nx * jx + ny * jy + nz * jz )
				if( fi >= 0 ) {
					dst[ m * 3 ] = ix
					dst[ m * 3 + 1 ] = iy
					dst[ m * 3 + 2 ] = iz
					++ m
				}
				if( ( fi >= 0 ) !== ( fj >= 0 ) ) {
					const t = fi / ( fi - fj )
					dst[ m * 3 ] = ix + ( jx - ix ) * t
					dst[ m * 3 + 1 ] = iy + ( jy - iy ) * t
					dst[ m * 3 + 2 ] = iz + ( jz - iz ) * t
					++ m
				}
			}
			this.poly_count = m
			this.poly = dst
			this.poly_next = src
		}

		box_box_edge( axis: number, over: number ) {
			const size = this.world.size
			const a = this.pair_a, b = this.pair_b
			const pa = this.pa, pb = this.pb, ua = this.ua, ub = this.ub, dir = this.dir
			const i = ( axis - 6 ) / 3 | 0, j = ( axis - 6 ) % 3
			let p1x = pa[ 0 ], p1y = pa[ 1 ], p1z = pa[ 2 ]
			let p2x = pb[ 0 ], p2y = pb[ 1 ], p2z = pb[ 2 ]
			for( let k = 0; k < 3; ++ k ) {
				if( k !== i ) {
					const d = ua[ k * 3 ] * dir[ 0 ] + ua[ k * 3 + 1 ] * dir[ 1 ] + ua[ k * 3 + 2 ] * dir[ 2 ]
					const h = d > 0 ? size[ a * 3 + k ] : - size[ a * 3 + k ]
					p1x += ua[ k * 3 ] * h
					p1y += ua[ k * 3 + 1 ] * h
					p1z += ua[ k * 3 + 2 ] * h
				}
				if( k !== j ) {
					const d = ub[ k * 3 ] * dir[ 0 ] + ub[ k * 3 + 1 ] * dir[ 1 ] + ub[ k * 3 + 2 ] * dir[ 2 ]
					const h = d > 0 ? - size[ b * 3 + k ] : size[ b * 3 + k ]
					p2x += ub[ k * 3 ] * h
					p2y += ub[ k * 3 + 1 ] * h
					p2z += ub[ k * 3 + 2 ] * h
				}
			}
			const e1x = ua[ i * 3 ], e1y = ua[ i * 3 + 1 ], e1z = ua[ i * 3 + 2 ]
			const e2x = ub[ j * 3 ], e2y = ub[ j * 3 + 1 ], e2z = ub[ j * 3 + 2 ]
			const rx = p1x - p2x, ry = p1y - p2y, rz = p1z - p2z
			const bb = e1x * e2x + e1y * e2y + e1z * e2z
			const c = e1x * rx + e1y * ry + e1z * rz
			const f = e2x * rx + e2y * ry + e2z * rz
			const den = 1 - bb * bb
			let s = ( bb * f - c ) / den
			let t = ( f - bb * c ) / den
			const ha = size[ a * 3 + i ], hb = size[ b * 3 + j ]
			s = s < - ha ? - ha : s > ha ? ha : s
			t = t < - hb ? - hb : t > hb ? hb : t
			this.emit(
				( p1x + e1x * s + p2x + e2x * t ) / 2,
				( p1y + e1y * s + p2y + e2y * t ) / 2,
				( p1z + e1z * s + p2z + e2z * t ) / 2,
				dir[ 0 ], dir[ 1 ], dir[ 2 ],
				over,
			)
		}

		support( i: number, c: Float32Array, q: Float32Array, dx: number, dy: number, dz: number, out: Float32Array ) {
			const world = this.world, size = world.size, s = i * 3
			const shape = world.shape[ i ]
			if( shape === $bog_gamengine_phys3.shape_sphere ) {
				const len = Math.sqrt( dx * dx + dy * dy + dz * dz )
				const k = len > 0 ? size[ s ] / len : 0
				out[ 0 ] = c[ 0 ] + dx * k
				out[ 1 ] = c[ 1 ] + dy * k
				out[ 2 ] = c[ 2 ] + dz * k
				return out
			}
			const l = this.rot_unapply( this.sup_local, q, dx, dy, dz )
			if( shape === $bog_gamengine_phys3.shape_box ) {
				this.rot_apply( out, q, l[ 0 ] >= 0 ? size[ s ] : - size[ s ], l[ 1 ] >= 0 ? size[ s + 1 ] : - size[ s + 1 ], l[ 2 ] >= 0 ? size[ s + 2 ] : - size[ s + 2 ] )
			} else if( shape === $bog_gamengine_phys3.shape_capsule ) {
				this.rot_apply( out, q, 0, l[ 1 ] >= 0 ? size[ s + 1 ] : - size[ s + 1 ], 0 )
				const len = Math.sqrt( dx * dx + dy * dy + dz * dz )
				const k = len > 0 ? size[ s ] / len : 0
				out[ 0 ] += dx * k
				out[ 1 ] += dy * k
				out[ 2 ] += dz * k
			} else if( shape === $bog_gamengine_phys3.shape_hull ) {
				const hull = world.hull, off = world.hull_off[ i ], count = world.hull_count[ i ]
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
				this.rot_apply( out, q, bx, by, bz )
			} else {
				out[ 0 ] = 0
				out[ 1 ] = 0
				out[ 2 ] = 0
			}
			out[ 0 ] += c[ 0 ]
			out[ 1 ] += c[ 1 ]
			out[ 2 ] += c[ 2 ]
			return out
		}

		mink( dx: number, dy: number, dz: number ) {
			const k = this.ev_count
			if( k >= vert_cap ) return -1
			const s = this.sup, eva = this.eva, evb = this.evb, ev = this.ev
			this.support( this.pair_a, this.pa, this.qa, dx, dy, dz, s )
			eva[ k * 3 ] = s[ 0 ]
			eva[ k * 3 + 1 ] = s[ 1 ]
			eva[ k * 3 + 2 ] = s[ 2 ]
			this.support( this.pair_b, this.pb, this.qb, - dx, - dy, - dz, s )
			evb[ k * 3 ] = s[ 0 ]
			evb[ k * 3 + 1 ] = s[ 1 ]
			evb[ k * 3 + 2 ] = s[ 2 ]
			ev[ k * 3 ] = eva[ k * 3 ] - s[ 0 ]
			ev[ k * 3 + 1 ] = eva[ k * 3 + 1 ] - s[ 1 ]
			ev[ k * 3 + 2 ] = eva[ k * 3 + 2 ] - s[ 2 ]
			this.ev_count = k + 1
			return k
		}

		gjk_epa() {
			if( !this.gjk() ) return
			this.epa()
		}

		gjk() {
			this.ev_count = 0
			const dir = this.dir, si = this.si, ev = this.ev
			const pa = this.pa, pb = this.pb
			dir[ 0 ] = pb[ 0 ] - pa[ 0 ]
			dir[ 1 ] = pb[ 1 ] - pa[ 1 ]
			dir[ 2 ] = pb[ 2 ] - pa[ 2 ]
			if( dir[ 0 ] * dir[ 0 ] + dir[ 1 ] * dir[ 1 ] + dir[ 2 ] * dir[ 2 ] < 1e-12 ) dir[ 0 ] = 1
			let k = this.mink( dir[ 0 ], dir[ 1 ], dir[ 2 ] )
			si[ 0 ] = k
			this.sn = 1
			dir[ 0 ] = - ev[ k * 3 ]
			dir[ 1 ] = - ev[ k * 3 + 1 ]
			dir[ 2 ] = - ev[ k * 3 + 2 ]
			for( let iter = 0; iter < 32; ++ iter ) {
				if( dir[ 0 ] * dir[ 0 ] + dir[ 1 ] * dir[ 1 ] + dir[ 2 ] * dir[ 2 ] < 1e-12 ) return true
				k = this.mink( dir[ 0 ], dir[ 1 ], dir[ 2 ] )
				if( k < 0 ) return false
				if( ev[ k * 3 ] * dir[ 0 ] + ev[ k * 3 + 1 ] * dir[ 1 ] + ev[ k * 3 + 2 ] * dir[ 2 ] <= 0 ) return false
				si[ this.sn ++ ] = k
				if( this.simplex() ) return true
			}
			return false
		}

		simplex() {
			if( this.sn === 2 ) return this.simplex_line()
			if( this.sn === 3 ) return this.simplex_triangle()
			return this.simplex_tetra()
		}

		simplex_line() {
			const ev = this.ev, si = this.si, dir = this.dir
			const a = si[ 1 ] * 3, b = si[ 0 ] * 3
			const ax = ev[ a ], ay = ev[ a + 1 ], az = ev[ a + 2 ]
			const abx = ev[ b ] - ax, aby = ev[ b + 1 ] - ay, abz = ev[ b + 2 ] - az
			const aox = - ax, aoy = - ay, aoz = - az
			if( abx * aox + aby * aoy + abz * aoz > 0 ) {
				const tx = aby * aoz - abz * aoy, ty = abz * aox - abx * aoz, tz = abx * aoy - aby * aox
				dir[ 0 ] = ty * abz - tz * aby
				dir[ 1 ] = tz * abx - tx * abz
				dir[ 2 ] = tx * aby - ty * abx
			} else {
				si[ 0 ] = si[ 1 ]
				this.sn = 1
				dir[ 0 ] = aox
				dir[ 1 ] = aoy
				dir[ 2 ] = aoz
			}
			return false
		}

		simplex_triangle() {
			const ev = this.ev, si = this.si, dir = this.dir
			const a = si[ 2 ] * 3, b = si[ 1 ] * 3, c = si[ 0 ] * 3
			const ax = ev[ a ], ay = ev[ a + 1 ], az = ev[ a + 2 ]
			const abx = ev[ b ] - ax, aby = ev[ b + 1 ] - ay, abz = ev[ b + 2 ] - az
			const acx = ev[ c ] - ax, acy = ev[ c + 1 ] - ay, acz = ev[ c + 2 ] - az
			const aox = - ax, aoy = - ay, aoz = - az
			const nx = aby * acz - abz * acy, ny = abz * acx - abx * acz, nz = abx * acy - aby * acx
			const tx = ny * acz - nz * acy, ty = nz * acx - nx * acz, tz = nx * acy - ny * acx
			if( tx * aox + ty * aoy + tz * aoz > 0 ) {
				if( acx * aox + acy * aoy + acz * aoz > 0 ) {
					si[ 1 ] = si[ 2 ]
					this.sn = 2
					const px = acy * aoz - acz * aoy, py = acz * aox - acx * aoz, pz = acx * aoy - acy * aox
					dir[ 0 ] = py * acz - pz * acy
					dir[ 1 ] = pz * acx - px * acz
					dir[ 2 ] = px * acy - py * acx
					return false
				}
				si[ 0 ] = si[ 1 ]
				si[ 1 ] = si[ 2 ]
				this.sn = 2
				return this.simplex_line()
			}
			const sx = aby * nz - abz * ny, sy = abz * nx - abx * nz, sz = abx * ny - aby * nx
			if( sx * aox + sy * aoy + sz * aoz > 0 ) {
				si[ 0 ] = si[ 1 ]
				si[ 1 ] = si[ 2 ]
				this.sn = 2
				return this.simplex_line()
			}
			if( nx * aox + ny * aoy + nz * aoz > 0 ) {
				dir[ 0 ] = nx
				dir[ 1 ] = ny
				dir[ 2 ] = nz
			} else {
				const t = si[ 0 ]
				si[ 0 ] = si[ 1 ]
				si[ 1 ] = t
				dir[ 0 ] = - nx
				dir[ 1 ] = - ny
				dir[ 2 ] = - nz
			}
			return false
		}

		simplex_tetra() {
			const ev = this.ev, si = this.si
			const a = si[ 3 ] * 3, b = si[ 2 ] * 3, c = si[ 1 ] * 3, d = si[ 0 ] * 3
			const ax = ev[ a ], ay = ev[ a + 1 ], az = ev[ a + 2 ]
			const abx = ev[ b ] - ax, aby = ev[ b + 1 ] - ay, abz = ev[ b + 2 ] - az
			const acx = ev[ c ] - ax, acy = ev[ c + 1 ] - ay, acz = ev[ c + 2 ] - az
			const adx = ev[ d ] - ax, ady = ev[ d + 1 ] - ay, adz = ev[ d + 2 ] - az
			const aox = - ax, aoy = - ay, aoz = - az
			let nx = aby * acz - abz * acy, ny = abz * acx - abx * acz, nz = abx * acy - aby * acx
			if( nx * adx + ny * ady + nz * adz > 0 ) {
				nx = - nx
				ny = - ny
				nz = - nz
			}
			if( nx * aox + ny * aoy + nz * aoz > 0 ) {
				si[ 0 ] = si[ 1 ]
				si[ 1 ] = si[ 2 ]
				si[ 2 ] = si[ 3 ]
				this.sn = 3
				return this.simplex_triangle()
			}
			nx = acy * adz - acz * ady
			ny = acz * adx - acx * adz
			nz = acx * ady - acy * adx
			if( nx * abx + ny * aby + nz * abz > 0 ) {
				nx = - nx
				ny = - ny
				nz = - nz
			}
			if( nx * aox + ny * aoy + nz * aoz > 0 ) {
				si[ 2 ] = si[ 3 ]
				this.sn = 3
				return this.simplex_triangle()
			}
			nx = ady * abz - adz * aby
			ny = adz * abx - adx * abz
			nz = adx * aby - ady * abx
			if( nx * acx + ny * acy + nz * acz > 0 ) {
				nx = - nx
				ny = - ny
				nz = - nz
			}
			if( nx * aox + ny * aoy + nz * aoz > 0 ) {
				const t = si[ 0 ]
				si[ 0 ] = si[ 2 ]
				si[ 1 ] = t
				si[ 2 ] = si[ 3 ]
				this.sn = 3
				return this.simplex_triangle()
			}
			return true
		}

		simplex_fill() {
			const ev = this.ev, si = this.si
			if( this.sn === 1 ) {
				const a = si[ 0 ] * 3
				for( let s = 0; s < 6 && this.sn < 2; ++ s ) {
					const sign = s & 1 ? -1 : 1
					const k = this.mink( s < 2 ? sign : 0, s >= 2 && s < 4 ? sign : 0, s >= 4 ? sign : 0 )
					if( k < 0 ) return false
					const dx = ev[ k * 3 ] - ev[ a ], dy = ev[ k * 3 + 1 ] - ev[ a + 1 ], dz = ev[ k * 3 + 2 ] - ev[ a + 2 ]
					if( dx * dx + dy * dy + dz * dz > 1e-10 ) {
						si[ 1 ] = k
						this.sn = 2
					}
				}
				if( this.sn < 2 ) return false
			}
			if( this.sn === 2 ) {
				const a = si[ 0 ] * 3, b = si[ 1 ] * 3
				const abx = ev[ b ] - ev[ a ], aby = ev[ b + 1 ] - ev[ a + 1 ], abz = ev[ b + 2 ] - ev[ a + 2 ]
				const mx = Math.abs( abx ), my = Math.abs( aby ), mz = Math.abs( abz )
				const ex = mx <= my && mx <= mz ? 1 : 0, ey = ex === 0 && my <= mz ? 1 : 0, ez = ex === 0 && ey === 0 ? 1 : 0
				const px = aby * ez - abz * ey, py = abz * ex - abx * ez, pz = abx * ey - aby * ex
				for( let s = 0; s < 2 && this.sn < 3; ++ s ) {
					const sign = s ? -1 : 1
					const k = this.mink( px * sign, py * sign, pz * sign )
					if( k < 0 ) return false
					const vx = ev[ k * 3 ] - ev[ a ], vy = ev[ k * 3 + 1 ] - ev[ a + 1 ], vz = ev[ k * 3 + 2 ] - ev[ a + 2 ]
					const cx = aby * vz - abz * vy, cy = abz * vx - abx * vz, cz = abx * vy - aby * vx
					if( cx * cx + cy * cy + cz * cz > 1e-10 * ( abx * abx + aby * aby + abz * abz ) ) {
						si[ 2 ] = k
						this.sn = 3
					}
				}
				if( this.sn < 3 ) return false
			}
			if( this.sn === 3 ) {
				const a = si[ 0 ] * 3, b = si[ 1 ] * 3, c = si[ 2 ] * 3
				const abx = ev[ b ] - ev[ a ], aby = ev[ b + 1 ] - ev[ a + 1 ], abz = ev[ b + 2 ] - ev[ a + 2 ]
				const acx = ev[ c ] - ev[ a ], acy = ev[ c + 1 ] - ev[ a + 1 ], acz = ev[ c + 2 ] - ev[ a + 2 ]
				const nx = aby * acz - abz * acy, ny = abz * acx - abx * acz, nz = abx * acy - aby * acx
				const len = Math.sqrt( nx * nx + ny * ny + nz * nz )
				if( len < 1e-12 ) return false
				for( let s = 0; s < 2 && this.sn < 4; ++ s ) {
					const sign = s ? -1 : 1
					const k = this.mink( nx * sign, ny * sign, nz * sign )
					if( k < 0 ) return false
					const d = ( ( ev[ k * 3 ] - ev[ a ] ) * nx + ( ev[ k * 3 + 1 ] - ev[ a + 1 ] ) * ny + ( ev[ k * 3 + 2 ] - ev[ a + 2 ] ) * nz ) / len
					if( Math.abs( d ) > 1e-6 ) {
						si[ 3 ] = k
						this.sn = 4
					}
				}
				if( this.sn < 4 ) return false
			}
			return true
		}

		face_add( i0: number, i1: number, i2: number ) {
			const k = this.ef_count
			if( k >= face_cap ) return
			const ev = this.ev, ec = this.ec
			const ax = ev[ i0 * 3 ], ay = ev[ i0 * 3 + 1 ], az = ev[ i0 * 3 + 2 ]
			const e1x = ev[ i1 * 3 ] - ax, e1y = ev[ i1 * 3 + 1 ] - ay, e1z = ev[ i1 * 3 + 2 ] - az
			const e2x = ev[ i2 * 3 ] - ax, e2y = ev[ i2 * 3 + 1 ] - ay, e2z = ev[ i2 * 3 + 2 ] - az
			let nx = e1y * e2z - e1z * e2y, ny = e1z * e2x - e1x * e2z, nz = e1x * e2y - e1y * e2x
			const len2 = nx * nx + ny * ny + nz * nz
			if( len2 < 1e-14 ) return
			const inv = 1 / Math.sqrt( len2 )
			nx *= inv
			ny *= inv
			nz *= inv
			if( nx * ( ax - ec[ 0 ] ) + ny * ( ay - ec[ 1 ] ) + nz * ( az - ec[ 2 ] ) < 0 ) {
				nx = - nx
				ny = - ny
				nz = - nz
				const t = i1
				i1 = i2
				i2 = t
			}
			this.ef[ k * 3 ] = i0
			this.ef[ k * 3 + 1 ] = i1
			this.ef[ k * 3 + 2 ] = i2
			this.efn[ k * 3 ] = nx
			this.efn[ k * 3 + 1 ] = ny
			this.efn[ k * 3 + 2 ] = nz
			this.efd[ k ] = nx * ax + ny * ay + nz * az
			this.ef_count = k + 1
		}

		face_remove( i: number ) {
			const last = -- this.ef_count
			const ef = this.ef, efn = this.efn
			ef[ i * 3 ] = ef[ last * 3 ]
			ef[ i * 3 + 1 ] = ef[ last * 3 + 1 ]
			ef[ i * 3 + 2 ] = ef[ last * 3 + 2 ]
			efn[ i * 3 ] = efn[ last * 3 ]
			efn[ i * 3 + 1 ] = efn[ last * 3 + 1 ]
			efn[ i * 3 + 2 ] = efn[ last * 3 + 2 ]
			this.efd[ i ] = this.efd[ last ]
		}

		horizon_edge( a: number, b: number ) {
			const eh = this.eh
			for( let i = 0; i < this.eh_count; ++ i ) {
				if( eh[ i * 2 ] !== b || eh[ i * 2 + 1 ] !== a ) continue
				const last = -- this.eh_count
				eh[ i * 2 ] = eh[ last * 2 ]
				eh[ i * 2 + 1 ] = eh[ last * 2 + 1 ]
				return
			}
			const k = this.eh_count
			if( k * 2 + 1 >= eh.length ) return
			eh[ k * 2 ] = a
			eh[ k * 2 + 1 ] = b
			this.eh_count = k + 1
		}

		epa() {
			if( this.sn < 4 && !this.simplex_fill() ) return
			const si = this.si, ev = this.ev, ec = this.ec, efn = this.efn, efd = this.efd, ef = this.ef, eh = this.eh
			ec[ 0 ] = ( ev[ si[ 0 ] * 3 ] + ev[ si[ 1 ] * 3 ] + ev[ si[ 2 ] * 3 ] + ev[ si[ 3 ] * 3 ] ) / 4
			ec[ 1 ] = ( ev[ si[ 0 ] * 3 + 1 ] + ev[ si[ 1 ] * 3 + 1 ] + ev[ si[ 2 ] * 3 + 1 ] + ev[ si[ 3 ] * 3 + 1 ] ) / 4
			ec[ 2 ] = ( ev[ si[ 0 ] * 3 + 2 ] + ev[ si[ 1 ] * 3 + 2 ] + ev[ si[ 2 ] * 3 + 2 ] + ev[ si[ 3 ] * 3 + 2 ] ) / 4
			this.ef_count = 0
			this.face_add( si[ 0 ], si[ 1 ], si[ 2 ] )
			this.face_add( si[ 0 ], si[ 2 ], si[ 3 ] )
			this.face_add( si[ 0 ], si[ 3 ], si[ 1 ] )
			this.face_add( si[ 1 ], si[ 3 ], si[ 2 ] )
			if( this.ef_count < 4 ) return
			for( let iter = 0; iter < 64; ++ iter ) {
				let f = 0
				for( let i = 1; i < this.ef_count; ++ i ) if( efd[ i ] < efd[ f ] ) f = i
				if( this.ev_count >= vert_cap || this.ef_count >= face_cap - 16 ) break
				const nx = efn[ f * 3 ], ny = efn[ f * 3 + 1 ], nz = efn[ f * 3 + 2 ]
				const p = this.mink( nx, ny, nz )
				const px = ev[ p * 3 ], py = ev[ p * 3 + 1 ], pz = ev[ p * 3 + 2 ]
				if( px * nx + py * ny + pz * nz - efd[ f ] < 1e-4 ) break
				this.eh_count = 0
				for( let i = 0; i < this.ef_count; ) {
					if( efn[ i * 3 ] * px + efn[ i * 3 + 1 ] * py + efn[ i * 3 + 2 ] * pz - efd[ i ] > 1e-7 ) {
						this.horizon_edge( ef[ i * 3 ], ef[ i * 3 + 1 ] )
						this.horizon_edge( ef[ i * 3 + 1 ], ef[ i * 3 + 2 ] )
						this.horizon_edge( ef[ i * 3 + 2 ], ef[ i * 3 ] )
						this.face_remove( i )
					} else ++ i
				}
				for( let i = 0; i < this.eh_count; ++ i ) this.face_add( eh[ i * 2 ], eh[ i * 2 + 1 ], p )
				if( this.ef_count < 4 ) return
			}
			let f = 0
			for( let i = 1; i < this.ef_count; ++ i ) if( efd[ i ] < efd[ f ] ) f = i
			this.epa_emit( f )
		}

		epa_emit( f: number ) {
			const ev = this.ev, eva = this.eva, evb = this.evb, ef = this.ef, efn = this.efn
			const i0 = ef[ f * 3 ], i1 = ef[ f * 3 + 1 ], i2 = ef[ f * 3 + 2 ]
			const nx = efn[ f * 3 ], ny = efn[ f * 3 + 1 ], nz = efn[ f * 3 + 2 ]
			const dist = this.efd[ f ]
			const ax = ev[ i0 * 3 ], ay = ev[ i0 * 3 + 1 ], az = ev[ i0 * 3 + 2 ]
			const e0x = ev[ i1 * 3 ] - ax, e0y = ev[ i1 * 3 + 1 ] - ay, e0z = ev[ i1 * 3 + 2 ] - az
			const e1x = ev[ i2 * 3 ] - ax, e1y = ev[ i2 * 3 + 1 ] - ay, e1z = ev[ i2 * 3 + 2 ] - az
			const e2x = nx * dist - ax, e2y = ny * dist - ay, e2z = nz * dist - az
			const d00 = e0x * e0x + e0y * e0y + e0z * e0z
			const d01 = e0x * e1x + e0y * e1y + e0z * e1z
			const d11 = e1x * e1x + e1y * e1y + e1z * e1z
			const d20 = e2x * e0x + e2y * e0y + e2z * e0z
			const d21 = e2x * e1x + e2y * e1y + e2z * e1z
			const den = d00 * d11 - d01 * d01
			let u = 1, v = 0, w = 0
			if( Math.abs( den ) > 1e-20 ) {
				v = ( d11 * d20 - d01 * d21 ) / den
				w = ( d00 * d21 - d01 * d20 ) / den
				v = v < 0 ? 0 : v > 1 ? 1 : v
				w = w < 0 ? 0 : w > 1 - v ? 1 - v : w
				u = 1 - v - w
			}
			const wax = u * eva[ i0 * 3 ] + v * eva[ i1 * 3 ] + w * eva[ i2 * 3 ]
			const way = u * eva[ i0 * 3 + 1 ] + v * eva[ i1 * 3 + 1 ] + w * eva[ i2 * 3 + 1 ]
			const waz = u * eva[ i0 * 3 + 2 ] + v * eva[ i1 * 3 + 2 ] + w * eva[ i2 * 3 + 2 ]
			const wbx = u * evb[ i0 * 3 ] + v * evb[ i1 * 3 ] + w * evb[ i2 * 3 ]
			const wby = u * evb[ i0 * 3 + 1 ] + v * evb[ i1 * 3 + 1 ] + w * evb[ i2 * 3 + 1 ]
			const wbz = u * evb[ i0 * 3 + 2 ] + v * evb[ i1 * 3 + 2 ] + w * evb[ i2 * 3 + 2 ]
			this.emit( ( wax + wbx ) / 2, ( way + wby ) / 2, ( waz + wbz ) / 2, nx, ny, nz, dist < 0 ? 0 : dist )
		}

	}

}
