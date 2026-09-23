namespace $ {

	export type $bog_gamengine_phys3_joint_world = {
		pos: Float32Array
		rot: Float32Array
		vel: Float32Array
		ang: Float32Array
		inv_mass: Float32Array
		inv_inertia: Float32Array
		flags: Uint8Array
		sleep_timer: Float32Array
	}

	export class $bog_gamengine_phys3_joint extends $mol_object2 {

		static type_point = 0
		static type_hinge = 1
		static type_slider = 2
		static type_spring = 3

		static beta = 0.2
		static flag_sleep = 1
		static sleep_speed = 0.05

		world = {} as $bog_gamengine_phys3_joint_world

		cap = 0
		count = 0
		type = new Uint8Array( 0 )
		a = new Uint32Array( 0 )
		b = new Uint32Array( 0 )
		anchor_a = new Float32Array( 0 )
		anchor_b = new Float32Array( 0 )
		axis_a = new Float32Array( 0 )
		axis_b = new Float32Array( 0 )
		ref_a = new Float32Array( 0 )
		ref_b = new Float32Array( 0 )
		rel = new Float32Array( 0 )
		param = new Float32Array( 0 )
		imp_lin = new Float32Array( 0 )
		imp_ang = new Float32Array( 0 )
		lim = new Int8Array( 0 )

		live = new Uint8Array( 0 )
		ima = new Float32Array( 0 )
		imb = new Float32Array( 0 )
		ra = new Float32Array( 0 )
		rb = new Float32Array( 0 )
		iwa = new Float32Array( 0 )
		iwb = new Float32Array( 0 )
		axis = new Float32Array( 0 )
		u = new Float32Array( 0 )
		v = new Float32Array( 0 )
		kin = new Float32Array( 0 )
		mass_u = new Float32Array( 0 )
		mass_v = new Float32Array( 0 )
		mass_lim = new Float32Array( 0 )
		bias_lin = new Float32Array( 0 )
		bias_ang = new Float32Array( 0 )
		lim_target = new Float32Array( 0 )

		tmp = new Float32Array( 3 )
		tmp2 = new Float32Array( 3 )
		tmp3 = new Float32Array( 3 )
		mat = new Float32Array( 9 )
		q1 = new Float32Array( 4 )
		q2 = new Float32Array( 4 )
		q3 = new Float32Array( 4 )

		grow( need: number ) {
			if( need <= this.cap ) return
			let cap = Math.max( this.cap, 16 )
			while( cap < need ) cap *= 2
			this.cap = cap
			this.type = this.grow_u8( this.type, cap )
			this.a = this.grow_u32( this.a, cap )
			this.b = this.grow_u32( this.b, cap )
			this.anchor_a = this.grow_f32( this.anchor_a, cap * 3 )
			this.anchor_b = this.grow_f32( this.anchor_b, cap * 3 )
			this.axis_a = this.grow_f32( this.axis_a, cap * 3 )
			this.axis_b = this.grow_f32( this.axis_b, cap * 3 )
			this.ref_a = this.grow_f32( this.ref_a, cap * 3 )
			this.ref_b = this.grow_f32( this.ref_b, cap * 3 )
			this.rel = this.grow_f32( this.rel, cap * 4 )
			this.param = this.grow_f32( this.param, cap * 4 )
			this.imp_lin = this.grow_f32( this.imp_lin, cap * 3 )
			this.imp_ang = this.grow_f32( this.imp_ang, cap * 3 )
			const lim = new Int8Array( cap )
			lim.set( this.lim )
			this.lim = lim
			this.live = this.grow_u8( this.live, cap )
			this.ima = this.grow_f32( this.ima, cap )
			this.imb = this.grow_f32( this.imb, cap )
			this.ra = this.grow_f32( this.ra, cap * 3 )
			this.rb = this.grow_f32( this.rb, cap * 3 )
			this.iwa = this.grow_f32( this.iwa, cap * 9 )
			this.iwb = this.grow_f32( this.iwb, cap * 9 )
			this.axis = this.grow_f32( this.axis, cap * 3 )
			this.u = this.grow_f32( this.u, cap * 3 )
			this.v = this.grow_f32( this.v, cap * 3 )
			this.kin = this.grow_f32( this.kin, cap * 9 )
			this.mass_u = this.grow_f32( this.mass_u, cap )
			this.mass_v = this.grow_f32( this.mass_v, cap )
			this.mass_lim = this.grow_f32( this.mass_lim, cap )
			this.bias_lin = this.grow_f32( this.bias_lin, cap * 3 )
			this.bias_ang = this.grow_f32( this.bias_ang, cap * 3 )
			this.lim_target = this.grow_f32( this.lim_target, cap )
		}

		grow_f32( prev: Float32Array, len: number ) {
			const next = new Float32Array( len )
			next.set( prev )
			return next
		}

		grow_u32( prev: Uint32Array, len: number ) {
			const next = new Uint32Array( len )
			next.set( prev )
			return next
		}

		grow_u8( prev: Uint8Array, len: number ) {
			const next = new Uint8Array( len )
			next.set( prev )
			return next
		}

		add(
			type: number,
			a: number,
			b: number,
			anchor_a: ArrayLike< number >,
			anchor_b: ArrayLike< number >,
			axis?: ArrayLike< number >,
			param?: ArrayLike< number >,
		) {
			const world = this.world
			const k = this.count
			this.grow( k + 1 )
			this.count = k + 1
			const k3 = k * 3, k4 = k * 4
			this.type[ k ] = type
			this.a[ k ] = a
			this.b[ k ] = b
			this.anchor_a.set( anchor_a, k3 )
			this.anchor_b.set( anchor_b, k3 )
			this.param.fill( 0, k4, k4 + 4 )
			if( param ) this.param.set( param, k4 )
			this.imp_lin.fill( 0, k3, k3 + 3 )
			this.imp_ang.fill( 0, k3, k3 + 3 )
			this.lim[ k ] = 0
			const tmp = this.tmp, tmp2 = this.tmp2
			tmp[ 0 ] = axis ? axis[ 0 ] : 0
			tmp[ 1 ] = axis ? axis[ 1 ] : 1
			tmp[ 2 ] = axis ? axis[ 2 ] : 0
			$bog_gamengine_vec_norm( tmp, tmp )
			this.axis_a.set( tmp, k3 )
			const qa = world.rot.subarray( a * 4, a * 4 + 4 ), qb = world.rot.subarray( b * 4, b * 4 + 4 )
			$bog_gamengine_vec_quat_rotate( tmp2, qa, tmp )
			this.rotate_inv( tmp, qb, tmp2 )
			this.axis_b.set( tmp, k3 )
			this.perp( tmp2[ 0 ], tmp2[ 1 ], tmp2[ 2 ], tmp )
			this.rotate_inv( tmp2, qa, tmp )
			this.ref_a.set( tmp2, k3 )
			this.rotate_inv( tmp2, qb, tmp )
			this.ref_b.set( tmp2, k3 )
			const q1 = this.q1, q2 = this.q2
			q1[ 0 ] = - qa[ 0 ]
			q1[ 1 ] = - qa[ 1 ]
			q1[ 2 ] = - qa[ 2 ]
			q1[ 3 ] = qa[ 3 ]
			$bog_gamengine_vec_quat_mul( q2, q1, qb )
			this.rel.set( q2, k4 )
			return k
		}

		remove( index: number ) {
			const last = this.count - 1
			if( index !== last ) {
				this.type[ index ] = this.type[ last ]
				this.a[ index ] = this.a[ last ]
				this.b[ index ] = this.b[ last ]
				this.anchor_a.copyWithin( index * 3, last * 3, last * 3 + 3 )
				this.anchor_b.copyWithin( index * 3, last * 3, last * 3 + 3 )
				this.axis_a.copyWithin( index * 3, last * 3, last * 3 + 3 )
				this.axis_b.copyWithin( index * 3, last * 3, last * 3 + 3 )
				this.ref_a.copyWithin( index * 3, last * 3, last * 3 + 3 )
				this.ref_b.copyWithin( index * 3, last * 3, last * 3 + 3 )
				this.rel.copyWithin( index * 4, last * 4, last * 4 + 4 )
				this.param.copyWithin( index * 4, last * 4, last * 4 + 4 )
				this.imp_lin.copyWithin( index * 3, last * 3, last * 3 + 3 )
				this.imp_ang.copyWithin( index * 3, last * 3, last * 3 + 3 )
				this.lim[ index ] = this.lim[ last ]
			}
			this.count = last
			return last
		}

		body_remove( index: number, last: number ) {
			for( let k = this.count - 1; k >= 0; -- k ) {
				if( this.a[ k ] === index || this.b[ k ] === index ) this.remove( k )
			}
			if( index === last ) return
			for( let k = 0; k < this.count; ++ k ) {
				if( this.a[ k ] === last ) this.a[ k ] = index
				if( this.b[ k ] === last ) this.b[ k ] = index
			}
		}

		rotate_inv( out: Float32Array, q: Float32Array, v: Float32Array ) {
			const q3 = this.q3
			q3[ 0 ] = - q[ 0 ]
			q3[ 1 ] = - q[ 1 ]
			q3[ 2 ] = - q[ 2 ]
			q3[ 3 ] = q[ 3 ]
			return $bog_gamengine_vec_quat_rotate( out, q3, v )
		}

		perp( nx: number, ny: number, nz: number, out: Float32Array ) {
			let ux = 0, uy = 0, uz = 0
			if( Math.abs( nx ) >= 0.57735 ) {
				ux = ny
				uy = - nx
			} else {
				uy = nz
				uz = - ny
			}
			const ul = 1 / Math.sqrt( ux * ux + uy * uy + uz * uz )
			out[ 0 ] = ux * ul
			out[ 1 ] = uy * ul
			out[ 2 ] = uz * ul
			return out
		}

		inertia_world( i: number, out: Float32Array, off: number ) {
			const rot = this.world.rot, inv = this.world.inv_inertia
			const x = rot[ i * 4 ], y = rot[ i * 4 + 1 ], z = rot[ i * 4 + 2 ], w = rot[ i * 4 + 3 ]
			const d0 = inv[ i * 3 ], d1 = inv[ i * 3 + 1 ], d2 = inv[ i * 3 + 2 ]
			const xx = x * x, yy = y * y, zz = z * z
			const xy = x * y, xz = x * z, yz = y * z
			const wx = w * x, wy = w * y, wz = w * z
			const r00 = 1 - 2 * ( yy + zz ), r01 = 2 * ( xy - wz ), r02 = 2 * ( xz + wy )
			const r10 = 2 * ( xy + wz ), r11 = 1 - 2 * ( xx + zz ), r12 = 2 * ( yz - wx )
			const r20 = 2 * ( xz - wy ), r21 = 2 * ( yz + wx ), r22 = 1 - 2 * ( xx + yy )
			out[ off ] = r00 * r00 * d0 + r01 * r01 * d1 + r02 * r02 * d2
			out[ off + 1 ] = r00 * r10 * d0 + r01 * r11 * d1 + r02 * r12 * d2
			out[ off + 2 ] = r00 * r20 * d0 + r01 * r21 * d1 + r02 * r22 * d2
			out[ off + 3 ] = out[ off + 1 ]
			out[ off + 4 ] = r10 * r10 * d0 + r11 * r11 * d1 + r12 * r12 * d2
			out[ off + 5 ] = r10 * r20 * d0 + r11 * r21 * d1 + r12 * r22 * d2
			out[ off + 6 ] = out[ off + 2 ]
			out[ off + 7 ] = out[ off + 5 ]
			out[ off + 8 ] = r20 * r20 * d0 + r21 * r21 * d1 + r22 * r22 * d2
		}

		invert3( src: Float32Array, soff: number, dst: Float32Array, doff: number ) {
			const m00 = src[ soff ], m01 = src[ soff + 1 ], m02 = src[ soff + 2 ]
			const m10 = src[ soff + 3 ], m11 = src[ soff + 4 ], m12 = src[ soff + 5 ]
			const m20 = src[ soff + 6 ], m21 = src[ soff + 7 ], m22 = src[ soff + 8 ]
			const c00 = m11 * m22 - m12 * m21
			const c01 = m12 * m20 - m10 * m22
			const c02 = m10 * m21 - m11 * m20
			const det = m00 * c00 + m01 * c01 + m02 * c02
			if( !( det > 1e-12 ) ) {
				dst.fill( 0, doff, doff + 9 )
				return
			}
			const inv = 1 / det
			dst[ doff ] = c00 * inv
			dst[ doff + 1 ] = ( m02 * m21 - m01 * m22 ) * inv
			dst[ doff + 2 ] = ( m01 * m12 - m02 * m11 ) * inv
			dst[ doff + 3 ] = c01 * inv
			dst[ doff + 4 ] = ( m00 * m22 - m02 * m20 ) * inv
			dst[ doff + 5 ] = ( m02 * m10 - m00 * m12 ) * inv
			dst[ doff + 6 ] = c02 * inv
			dst[ doff + 7 ] = ( m01 * m20 - m00 * m21 ) * inv
			dst[ doff + 8 ] = ( m00 * m11 - m01 * m10 ) * inv
		}

		quad( m: Float32Array, off: number, x: number, y: number, z: number ) {
			return x * ( m[ off ] * x + m[ off + 1 ] * y + m[ off + 2 ] * z )
				+ y * ( m[ off + 3 ] * x + m[ off + 4 ] * y + m[ off + 5 ] * z )
				+ z * ( m[ off + 6 ] * x + m[ off + 7 ] * y + m[ off + 8 ] * z )
		}

		mass_lin( k: number, nx: number, ny: number, nz: number ) {
			const k3 = k * 3, k9 = k * 9
			const ra = this.ra, rb = this.rb
			const cax = ra[ k3 + 1 ] * nz - ra[ k3 + 2 ] * ny, cay = ra[ k3 + 2 ] * nx - ra[ k3 ] * nz, caz = ra[ k3 ] * ny - ra[ k3 + 1 ] * nx
			const cbx = rb[ k3 + 1 ] * nz - rb[ k3 + 2 ] * ny, cby = rb[ k3 + 2 ] * nx - rb[ k3 ] * nz, cbz = rb[ k3 ] * ny - rb[ k3 + 1 ] * nx
			const sum = this.ima[ k ] + this.imb[ k ] + this.quad( this.iwa, k9, cax, cay, caz ) + this.quad( this.iwb, k9, cbx, cby, cbz )
			return sum > 0 ? 1 / sum : 0
		}

		mass_ang( k: number, nx: number, ny: number, nz: number ) {
			const k9 = k * 9
			const sum = this.quad( this.iwa, k9, nx, ny, nz ) + this.quad( this.iwb, k9, nx, ny, nz )
			return sum > 0 ? 1 / sum : 0
		}

		kin_lin( k: number ) {
			const k3 = k * 3, k9 = k * 9
			const m = this.mat
			const im = this.ima[ k ] + this.imb[ k ]
			m.fill( 0 )
			m[ 0 ] = m[ 4 ] = m[ 8 ] = im
			this.kin_skew( this.ra, k3, this.iwa, k9, m )
			this.kin_skew( this.rb, k3, this.iwb, k9, m )
			this.invert3( m, 0, this.kin, k9 )
		}

		kin_skew( r: Float32Array, r3: number, iw: Float32Array, i9: number, m: Float32Array ) {
			const rx = r[ r3 ], ry = r[ r3 + 1 ], rz = r[ r3 + 2 ]
			const s00 = 0, s01 = - rz, s02 = ry
			const s10 = rz, s11 = 0, s12 = - rx
			const s20 = - ry, s21 = rx, s22 = 0
			const i00 = iw[ i9 ], i01 = iw[ i9 + 1 ], i02 = iw[ i9 + 2 ]
			const i10 = iw[ i9 + 3 ], i11 = iw[ i9 + 4 ], i12 = iw[ i9 + 5 ]
			const i20 = iw[ i9 + 6 ], i21 = iw[ i9 + 7 ], i22 = iw[ i9 + 8 ]
			const t00 = s00 * i00 + s01 * i10 + s02 * i20, t01 = s00 * i01 + s01 * i11 + s02 * i21, t02 = s00 * i02 + s01 * i12 + s02 * i22
			const t10 = s10 * i00 + s11 * i10 + s12 * i20, t11 = s10 * i01 + s11 * i11 + s12 * i21, t12 = s10 * i02 + s11 * i12 + s12 * i22
			const t20 = s20 * i00 + s21 * i10 + s22 * i20, t21 = s20 * i01 + s21 * i11 + s22 * i21, t22 = s20 * i02 + s21 * i12 + s22 * i22
			m[ 0 ] += t00 * s00 + t01 * s01 + t02 * s02
			m[ 1 ] += t00 * s10 + t01 * s11 + t02 * s12
			m[ 2 ] += t00 * s20 + t01 * s21 + t02 * s22
			m[ 3 ] += t10 * s00 + t11 * s01 + t12 * s02
			m[ 4 ] += t10 * s10 + t11 * s11 + t12 * s12
			m[ 5 ] += t10 * s20 + t11 * s21 + t12 * s22
			m[ 6 ] += t20 * s00 + t21 * s01 + t22 * s02
			m[ 7 ] += t20 * s10 + t21 * s11 + t22 * s12
			m[ 8 ] += t20 * s20 + t21 * s21 + t22 * s22
		}

		kin_ang( k: number ) {
			const k9 = k * 9
			const m = this.mat, iwa = this.iwa, iwb = this.iwb
			for( let i = 0; i < 9; ++ i ) m[ i ] = iwa[ k9 + i ] + iwb[ k9 + i ]
			this.invert3( m, 0, this.kin, k9 )
		}

		rel_vel( k: number ) {
			const world = this.world, vel = world.vel, ang = world.ang, ra = this.ra, rb = this.rb, out = this.tmp
			const a3 = this.a[ k ] * 3, b3 = this.b[ k ] * 3, k3 = k * 3
			const wax = ang[ a3 ], way = ang[ a3 + 1 ], waz = ang[ a3 + 2 ]
			const wbx = ang[ b3 ], wby = ang[ b3 + 1 ], wbz = ang[ b3 + 2 ]
			const rax = ra[ k3 ], ray = ra[ k3 + 1 ], raz = ra[ k3 + 2 ]
			const rbx = rb[ k3 ], rby = rb[ k3 + 1 ], rbz = rb[ k3 + 2 ]
			out[ 0 ] = vel[ b3 ] + ( wby * rbz - wbz * rby ) - vel[ a3 ] - ( way * raz - waz * ray )
			out[ 1 ] = vel[ b3 + 1 ] + ( wbz * rbx - wbx * rbz ) - vel[ a3 + 1 ] - ( waz * rax - wax * raz )
			out[ 2 ] = vel[ b3 + 2 ] + ( wbx * rby - wby * rbx ) - vel[ a3 + 2 ] - ( wax * ray - way * rax )
			return out
		}

		rel_ang( k: number ) {
			const ang = this.world.ang, out = this.tmp2
			const a3 = this.a[ k ] * 3, b3 = this.b[ k ] * 3
			out[ 0 ] = ang[ b3 ] - ang[ a3 ]
			out[ 1 ] = ang[ b3 + 1 ] - ang[ a3 + 1 ]
			out[ 2 ] = ang[ b3 + 2 ] - ang[ a3 + 2 ]
			return out
		}

		apply_lin( k: number, lx: number, ly: number, lz: number ) {
			const world = this.world, vel = world.vel, ang = world.ang
			const a = this.a[ k ], b = this.b[ k ], a3 = a * 3, b3 = b * 3, k3 = k * 3, k9 = k * 9
			const ima = this.ima[ k ], imb = this.imb[ k ], ra = this.ra, rb = this.rb, iwa = this.iwa, iwb = this.iwb
			if( ima > 0 ) {
				vel[ a3 ] -= lx * ima
				vel[ a3 + 1 ] -= ly * ima
				vel[ a3 + 2 ] -= lz * ima
				const tx = ra[ k3 + 1 ] * lz - ra[ k3 + 2 ] * ly, ty = ra[ k3 + 2 ] * lx - ra[ k3 ] * lz, tz = ra[ k3 ] * ly - ra[ k3 + 1 ] * lx
				ang[ a3 ] -= iwa[ k9 ] * tx + iwa[ k9 + 1 ] * ty + iwa[ k9 + 2 ] * tz
				ang[ a3 + 1 ] -= iwa[ k9 + 3 ] * tx + iwa[ k9 + 4 ] * ty + iwa[ k9 + 5 ] * tz
				ang[ a3 + 2 ] -= iwa[ k9 + 6 ] * tx + iwa[ k9 + 7 ] * ty + iwa[ k9 + 8 ] * tz
			}
			if( imb > 0 ) {
				vel[ b3 ] += lx * imb
				vel[ b3 + 1 ] += ly * imb
				vel[ b3 + 2 ] += lz * imb
				const tx = rb[ k3 + 1 ] * lz - rb[ k3 + 2 ] * ly, ty = rb[ k3 + 2 ] * lx - rb[ k3 ] * lz, tz = rb[ k3 ] * ly - rb[ k3 + 1 ] * lx
				ang[ b3 ] += iwb[ k9 ] * tx + iwb[ k9 + 1 ] * ty + iwb[ k9 + 2 ] * tz
				ang[ b3 + 1 ] += iwb[ k9 + 3 ] * tx + iwb[ k9 + 4 ] * ty + iwb[ k9 + 5 ] * tz
				ang[ b3 + 2 ] += iwb[ k9 + 6 ] * tx + iwb[ k9 + 7 ] * ty + iwb[ k9 + 8 ] * tz
			}
		}

		apply_ang( k: number, tx: number, ty: number, tz: number ) {
			const ang = this.world.ang
			const a3 = this.a[ k ] * 3, b3 = this.b[ k ] * 3, k9 = k * 9
			const iwa = this.iwa, iwb = this.iwb
			if( this.ima[ k ] > 0 ) {
				ang[ a3 ] -= iwa[ k9 ] * tx + iwa[ k9 + 1 ] * ty + iwa[ k9 + 2 ] * tz
				ang[ a3 + 1 ] -= iwa[ k9 + 3 ] * tx + iwa[ k9 + 4 ] * ty + iwa[ k9 + 5 ] * tz
				ang[ a3 + 2 ] -= iwa[ k9 + 6 ] * tx + iwa[ k9 + 7 ] * ty + iwa[ k9 + 8 ] * tz
			}
			if( this.imb[ k ] > 0 ) {
				ang[ b3 ] += iwb[ k9 ] * tx + iwb[ k9 + 1 ] * ty + iwb[ k9 + 2 ] * tz
				ang[ b3 + 1 ] += iwb[ k9 + 3 ] * tx + iwb[ k9 + 4 ] * ty + iwb[ k9 + 5 ] * tz
				ang[ b3 + 2 ] += iwb[ k9 + 6 ] * tx + iwb[ k9 + 7 ] * ty + iwb[ k9 + 8 ] * tz
			}
		}

		active( i: number ) {
			const world = this.world
			if( !( world.inv_mass[ i ] > 0 ) ) return false
			if( world.flags[ i ] & $bog_gamengine_phys3_joint.flag_sleep ) return false
			return true
		}

		moving( i: number ) {
			const vel = this.world.vel, ang = this.world.ang, i3 = i * 3
			const v2 = vel[ i3 ] * vel[ i3 ] + vel[ i3 + 1 ] * vel[ i3 + 1 ] + vel[ i3 + 2 ] * vel[ i3 + 2 ]
			const w2 = ang[ i3 ] * ang[ i3 ] + ang[ i3 + 1 ] * ang[ i3 + 1 ] + ang[ i3 + 2 ] * ang[ i3 + 2 ]
			const speed2 = $bog_gamengine_phys3_joint.sleep_speed * $bog_gamengine_phys3_joint.sleep_speed
			return v2 >= speed2 || w2 >= speed2
		}

		wake( i: number ) {
			this.world.flags[ i ] &= ~ $bog_gamengine_phys3_joint.flag_sleep
			this.world.sleep_timer[ i ] = 0
		}

		prepare( world: $bog_gamengine_phys3_joint_world, dt: number ) {
			this.world = world
			const count = this.count
			const pos = world.pos, rot = world.rot, inv_mass = world.inv_mass, flags = world.flags
			const type = this.type, live = this.live, ima = this.ima, imb = this.imb
			const ra = this.ra, rb = this.rb, iwa = this.iwa, iwb = this.iwb
			const axis = this.axis, u = this.u, v = this.v, tmp = this.tmp, tmp2 = this.tmp2, tmp3 = this.tmp3
			const bias_lin = this.bias_lin, bias_ang = this.bias_ang, imp_lin = this.imp_lin, imp_ang = this.imp_ang
			const beta_dt = $bog_gamengine_phys3_joint.beta / dt
			const sleep = $bog_gamengine_phys3_joint.flag_sleep
			for( let k = 0; k < count; ++ k ) {
				const k3 = k * 3, k9 = k * 9
				const a = this.a[ k ], b = this.b[ k ]
				let act_a = this.active( a ), act_b = this.active( b )
				live[ k ] = 0
				if( !act_a && !act_b ) continue
				if( !act_a && inv_mass[ a ] > 0 && flags[ a ] & sleep && this.moving( b ) ) {
					this.wake( a )
					act_a = true
				}
				if( !act_b && inv_mass[ b ] > 0 && flags[ b ] & sleep && this.moving( a ) ) {
					this.wake( b )
					act_b = true
				}
				ima[ k ] = act_a ? inv_mass[ a ] : 0
				imb[ k ] = act_b ? inv_mass[ b ] : 0
				if( act_a ) this.inertia_world( a, iwa, k9 )
				else iwa.fill( 0, k9, k9 + 9 )
				if( act_b ) this.inertia_world( b, iwb, k9 )
				else iwb.fill( 0, k9, k9 + 9 )
				const qa = rot.subarray( a * 4, a * 4 + 4 ), qb = rot.subarray( b * 4, b * 4 + 4 )
				$bog_gamengine_vec_quat_rotate( tmp, qa, this.anchor_a.subarray( k3, k3 + 3 ) )
				ra.set( tmp, k3 )
				$bog_gamengine_vec_quat_rotate( tmp, qb, this.anchor_b.subarray( k3, k3 + 3 ) )
				rb.set( tmp, k3 )
				const dx = pos[ b * 3 ] + rb[ k3 ] - pos[ a * 3 ] - ra[ k3 ]
				const dy = pos[ b * 3 + 1 ] + rb[ k3 + 1 ] - pos[ a * 3 + 1 ] - ra[ k3 + 1 ]
				const dz = pos[ b * 3 + 2 ] + rb[ k3 + 2 ] - pos[ a * 3 + 2 ] - ra[ k3 + 2 ]
				const kind = type[ k ]
				if( kind === $bog_gamengine_phys3_joint.type_spring ) {
					const len = Math.sqrt( dx * dx + dy * dy + dz * dz )
					if( len < 1e-6 ) continue
					const nx = dx / len, ny = dy / len, nz = dz / len
					const mass_n = this.mass_lin( k, nx, ny, nz )
					const rel = this.rel_vel( k )
					const vn = rel[ 0 ] * nx + rel[ 1 ] * ny + rel[ 2 ] * nz
					const rest = this.param[ k * 4 ], stiff = this.param[ k * 4 + 1 ], damp = this.param[ k * 4 + 2 ]
					const cd = damp * dt
					const lambda = - stiff * ( len - rest ) * dt - vn * ( cd < mass_n ? cd : mass_n )
					this.apply_lin( k, lambda * nx, lambda * ny, lambda * nz )
					continue
				}
				live[ k ] = 1
				if( kind === $bog_gamengine_phys3_joint.type_point ) {
					bias_lin[ k3 ] = beta_dt * dx
					bias_lin[ k3 + 1 ] = beta_dt * dy
					bias_lin[ k3 + 2 ] = beta_dt * dz
					this.kin_lin( k )
					this.apply_lin( k, imp_lin[ k3 ], imp_lin[ k3 + 1 ], imp_lin[ k3 + 2 ] )
					continue
				}
				$bog_gamengine_vec_quat_rotate( tmp, qa, this.axis_a.subarray( k3, k3 + 3 ) )
				axis.set( tmp, k3 )
				const ax = tmp[ 0 ], ay = tmp[ 1 ], az = tmp[ 2 ]
				this.perp( ax, ay, az, tmp2 )
				u.set( tmp2, k3 )
				const ux = tmp2[ 0 ], uy = tmp2[ 1 ], uz = tmp2[ 2 ]
				const vx = ay * uz - az * uy, vy = az * ux - ax * uz, vz = ax * uy - ay * ux
				v[ k3 ] = vx
				v[ k3 + 1 ] = vy
				v[ k3 + 2 ] = vz
				const min = this.param[ k * 4 ], max = this.param[ k * 4 + 1 ]
				if( kind === $bog_gamengine_phys3_joint.type_hinge ) {
					bias_lin[ k3 ] = beta_dt * dx
					bias_lin[ k3 + 1 ] = beta_dt * dy
					bias_lin[ k3 + 2 ] = beta_dt * dz
					this.kin_lin( k )
					$bog_gamengine_vec_quat_rotate( tmp3, qb, this.axis_b.subarray( k3, k3 + 3 ) )
					const ex = tmp3[ 1 ] * az - tmp3[ 2 ] * ay, ey = tmp3[ 2 ] * ax - tmp3[ 0 ] * az, ez = tmp3[ 0 ] * ay - tmp3[ 1 ] * ax
					bias_ang[ k3 ] = - beta_dt * ( ex * ux + ey * uy + ez * uz )
					bias_ang[ k3 + 1 ] = - beta_dt * ( ex * vx + ey * vy + ez * vz )
					this.mass_u[ k ] = this.mass_ang( k, ux, uy, uz )
					this.mass_v[ k ] = this.mass_ang( k, vx, vy, vz )
					let state = 0
					if( min < max ) {
						$bog_gamengine_vec_quat_rotate( tmp2, qa, this.ref_a.subarray( k3, k3 + 3 ) )
						$bog_gamengine_vec_quat_rotate( tmp3, qb, this.ref_b.subarray( k3, k3 + 3 ) )
						const cx = tmp2[ 1 ] * tmp3[ 2 ] - tmp2[ 2 ] * tmp3[ 1 ], cy = tmp2[ 2 ] * tmp3[ 0 ] - tmp2[ 0 ] * tmp3[ 2 ], cz = tmp2[ 0 ] * tmp3[ 1 ] - tmp2[ 1 ] * tmp3[ 0 ]
						const angle = Math.atan2( cx * ax + cy * ay + cz * az, tmp2[ 0 ] * tmp3[ 0 ] + tmp2[ 1 ] * tmp3[ 1 ] + tmp2[ 2 ] * tmp3[ 2 ] )
						state = angle - min < max - angle ? 1 : -1
						const c = state > 0 ? angle - min : max - angle
						this.lim_target[ k ] = - ( c > 0 ? c : c * $bog_gamengine_phys3_joint.beta ) / dt
						this.mass_lim[ k ] = this.mass_ang( k, ax, ay, az )
					}
					if( state !== this.lim[ k ] ) imp_ang[ k3 + 2 ] = 0
					this.lim[ k ] = state
					this.apply_lin( k, imp_lin[ k3 ], imp_lin[ k3 + 1 ], imp_lin[ k3 + 2 ] )
					const t1 = imp_ang[ k3 ], t2 = imp_ang[ k3 + 1 ], t3 = imp_ang[ k3 + 2 ] * state
					this.apply_ang( k, t1 * ux + t2 * vx + t3 * ax, t1 * uy + t2 * vy + t3 * ay, t1 * uz + t2 * vz + t3 * az )
					continue
				}
				ra[ k3 ] += dx
				ra[ k3 + 1 ] += dy
				ra[ k3 + 2 ] += dz
				bias_lin[ k3 ] = beta_dt * ( dx * ux + dy * uy + dz * uz )
				bias_lin[ k3 + 1 ] = beta_dt * ( dx * vx + dy * vy + dz * vz )
				this.mass_u[ k ] = this.mass_lin( k, ux, uy, uz )
				this.mass_v[ k ] = this.mass_lin( k, vx, vy, vz )
				const q1 = this.q1, q2 = this.q2
				$bog_gamengine_vec_quat_mul( q1, qa, this.rel.subarray( k * 4, k * 4 + 4 ) )
				q2[ 0 ] = - qb[ 0 ]
				q2[ 1 ] = - qb[ 1 ]
				q2[ 2 ] = - qb[ 2 ]
				q2[ 3 ] = qb[ 3 ]
				$bog_gamengine_vec_quat_mul( q1, q1, q2 )
				const sign = q1[ 3 ] < 0 ? -2 : 2
				bias_ang[ k3 ] = - beta_dt * sign * q1[ 0 ]
				bias_ang[ k3 + 1 ] = - beta_dt * sign * q1[ 1 ]
				bias_ang[ k3 + 2 ] = - beta_dt * sign * q1[ 2 ]
				this.kin_ang( k )
				let state = 0
				if( min < max ) {
					const s = dx * ax + dy * ay + dz * az
					state = s - min < max - s ? 1 : -1
					const c = state > 0 ? s - min : max - s
					this.lim_target[ k ] = - ( c > 0 ? c : c * $bog_gamengine_phys3_joint.beta ) / dt
					this.mass_lim[ k ] = this.mass_lin( k, ax, ay, az )
				}
				if( state !== this.lim[ k ] ) imp_lin[ k3 + 2 ] = 0
				this.lim[ k ] = state
				const l1 = imp_lin[ k3 ], l2 = imp_lin[ k3 + 1 ], l3 = imp_lin[ k3 + 2 ] * state
				this.apply_lin( k, l1 * ux + l2 * vx + l3 * ax, l1 * uy + l2 * vy + l3 * ay, l1 * uz + l2 * vz + l3 * az )
				this.apply_ang( k, imp_ang[ k3 ], imp_ang[ k3 + 1 ], imp_ang[ k3 + 2 ] )
			}
		}

		iterate() {
			const count = this.count
			const type = this.type, live = this.live, kin = this.kin
			const axis = this.axis, u = this.u, v = this.v
			const bias_lin = this.bias_lin, bias_ang = this.bias_ang, imp_lin = this.imp_lin, imp_ang = this.imp_ang
			const mass_u = this.mass_u, mass_v = this.mass_v, mass_lim = this.mass_lim, lim = this.lim, lim_target = this.lim_target
			for( let k = 0; k < count; ++ k ) {
				if( !live[ k ] ) continue
				const k3 = k * 3, k9 = k * 9
				const kind = type[ k ]
				if( kind !== $bog_gamengine_phys3_joint.type_slider ) {
					const rel = this.rel_vel( k )
					const rx = - rel[ 0 ] - bias_lin[ k3 ], ry = - rel[ 1 ] - bias_lin[ k3 + 1 ], rz = - rel[ 2 ] - bias_lin[ k3 + 2 ]
					const lx = kin[ k9 ] * rx + kin[ k9 + 1 ] * ry + kin[ k9 + 2 ] * rz
					const ly = kin[ k9 + 3 ] * rx + kin[ k9 + 4 ] * ry + kin[ k9 + 5 ] * rz
					const lz = kin[ k9 + 6 ] * rx + kin[ k9 + 7 ] * ry + kin[ k9 + 8 ] * rz
					imp_lin[ k3 ] += lx
					imp_lin[ k3 + 1 ] += ly
					imp_lin[ k3 + 2 ] += lz
					this.apply_lin( k, lx, ly, lz )
					if( kind === $bog_gamengine_phys3_joint.type_point ) continue
				}
				const ax = axis[ k3 ], ay = axis[ k3 + 1 ], az = axis[ k3 + 2 ]
				const ux = u[ k3 ], uy = u[ k3 + 1 ], uz = u[ k3 + 2 ]
				const vx = v[ k3 ], vy = v[ k3 + 1 ], vz = v[ k3 + 2 ]
				const state = lim[ k ]
				if( kind === $bog_gamengine_phys3_joint.type_hinge ) {
					let w = this.rel_ang( k )
					const lu = - mass_u[ k ] * ( w[ 0 ] * ux + w[ 1 ] * uy + w[ 2 ] * uz + bias_ang[ k3 ] )
					imp_ang[ k3 ] += lu
					this.apply_ang( k, lu * ux, lu * uy, lu * uz )
					w = this.rel_ang( k )
					const lv = - mass_v[ k ] * ( w[ 0 ] * vx + w[ 1 ] * vy + w[ 2 ] * vz + bias_ang[ k3 + 1 ] )
					imp_ang[ k3 + 1 ] += lv
					this.apply_ang( k, lv * vx, lv * vy, lv * vz )
					if( state === 0 ) continue
					w = this.rel_ang( k )
					const jv = state * ( w[ 0 ] * ax + w[ 1 ] * ay + w[ 2 ] * az )
					const old = imp_ang[ k3 + 2 ]
					let next = old + mass_lim[ k ] * ( lim_target[ k ] - jv )
					if( next < 0 ) next = 0
					imp_ang[ k3 + 2 ] = next
					const dl = ( next - old ) * state
					this.apply_ang( k, dl * ax, dl * ay, dl * az )
					continue
				}
				let rel = this.rel_vel( k )
				const lu = - mass_u[ k ] * ( rel[ 0 ] * ux + rel[ 1 ] * uy + rel[ 2 ] * uz + bias_lin[ k3 ] )
				imp_lin[ k3 ] += lu
				this.apply_lin( k, lu * ux, lu * uy, lu * uz )
				rel = this.rel_vel( k )
				const lv = - mass_v[ k ] * ( rel[ 0 ] * vx + rel[ 1 ] * vy + rel[ 2 ] * vz + bias_lin[ k3 + 1 ] )
				imp_lin[ k3 + 1 ] += lv
				this.apply_lin( k, lv * vx, lv * vy, lv * vz )
				if( state !== 0 ) {
					rel = this.rel_vel( k )
					const jv = state * ( rel[ 0 ] * ax + rel[ 1 ] * ay + rel[ 2 ] * az )
					const old = imp_lin[ k3 + 2 ]
					let next = old + mass_lim[ k ] * ( lim_target[ k ] - jv )
					if( next < 0 ) next = 0
					imp_lin[ k3 + 2 ] = next
					const dl = ( next - old ) * state
					this.apply_lin( k, dl * ax, dl * ay, dl * az )
				}
				const w = this.rel_ang( k )
				const rx = - w[ 0 ] - bias_ang[ k3 ], ry = - w[ 1 ] - bias_ang[ k3 + 1 ], rz = - w[ 2 ] - bias_ang[ k3 + 2 ]
				const tx = kin[ k9 ] * rx + kin[ k9 + 1 ] * ry + kin[ k9 + 2 ] * rz
				const ty = kin[ k9 + 3 ] * rx + kin[ k9 + 4 ] * ry + kin[ k9 + 5 ] * rz
				const tz = kin[ k9 + 6 ] * rx + kin[ k9 + 7 ] * ry + kin[ k9 + 8 ] * rz
				imp_ang[ k3 ] += tx
				imp_ang[ k3 + 1 ] += ty
				imp_ang[ k3 + 2 ] += tz
				this.apply_ang( k, tx, ty, tz )
			}
		}

	}

}
