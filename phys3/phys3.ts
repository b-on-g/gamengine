namespace $ {

	export class $bog_gamengine_phys3 extends $mol_object2 {

		static shape_sphere = 0
		static shape_box = 1
		static shape_capsule = 2
		static shape_plane = 3
		static shape_hull = 4

		static flag_sleep = 1
		static flag_ghost = 2

		static sleep_speed = 0.05
		static sleep_time = 0.5

		cap = 0
		count = 0
		pos = new Float32Array( 0 )
		rot = new Float32Array( 0 )
		vel = new Float32Array( 0 )
		ang = new Float32Array( 0 )
		mass = new Float32Array( 0 )
		inv_mass = new Float32Array( 0 )
		inv_inertia = new Float32Array( 0 )
		shape = new Uint8Array( 0 )
		size = new Float32Array( 0 )
		flags = new Uint8Array( 0 )
		trans = new Float32Array( 0 )
		aabb = new Float32Array( 0 )
		sleep_timer = new Float32Array( 0 )
		hull_off = new Uint32Array( 0 )
		hull_count = new Uint32Array( 0 )
		hull = new Float32Array( 0 )
		hull_len = 0
		pos_view = [] as Float32Array[]
		rot_view = [] as Float32Array[]
		ang_view = [] as Float32Array[]
		trans_view = [] as Float32Array[]

		tmp_scale = new Float32Array( 3 )
		tmp_point = new Float32Array( 3 )
		broad = new $bog_gamengine_phys3_broad
		narrow = new $bog_gamengine_phys3_narrow
		solve = new $bog_gamengine_phys3_solve
		joint = new $bog_gamengine_phys3_joint

		constructor() {
			super()
			this.joint.world = this
		}

		@ $mol_mem
		gravity( next?: Float32Array ) {
			return next ?? new Float32Array([ 0, -9.81, 0 ])
		}

		@ $mol_mem
		friction( next?: number ) {
			return next ?? 0.5
		}

		@ $mol_mem
		restitution( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		iterations( next?: number ) {
			return next ?? 8
		}

		grow( need: number ) {
			if( need <= this.cap ) return
			let cap = Math.max( this.cap, 16 )
			while( cap < need ) cap *= 2
			this.cap = cap
			this.pos = this.grow_f32( this.pos, cap * 3 )
			this.rot = this.grow_f32( this.rot, cap * 4 )
			this.vel = this.grow_f32( this.vel, cap * 3 )
			this.ang = this.grow_f32( this.ang, cap * 3 )
			this.mass = this.grow_f32( this.mass, cap )
			this.inv_mass = this.grow_f32( this.inv_mass, cap )
			this.inv_inertia = this.grow_f32( this.inv_inertia, cap * 3 )
			this.size = this.grow_f32( this.size, cap * 3 )
			this.trans = this.grow_f32( this.trans, cap * 16 )
			this.aabb = this.grow_f32( this.aabb, cap * 6 )
			this.sleep_timer = this.grow_f32( this.sleep_timer, cap )
			const shape = new Uint8Array( cap )
			shape.set( this.shape )
			this.shape = shape
			const flags = new Uint8Array( cap )
			flags.set( this.flags )
			this.flags = flags
			const hull_off = new Uint32Array( cap )
			hull_off.set( this.hull_off )
			this.hull_off = hull_off
			const hull_count = new Uint32Array( cap )
			hull_count.set( this.hull_count )
			this.hull_count = hull_count
			this.pos_view = this.views( this.pos, 3 )
			this.rot_view = this.views( this.rot, 4 )
			this.ang_view = this.views( this.ang, 3 )
			this.trans_view = this.views( this.trans, 16 )
		}

		views( buf: Float32Array, stride: number ) {
			const list = [] as Float32Array[]
			for( let i = 0; i < this.cap; ++ i ) list.push( buf.subarray( i * stride, i * stride + stride ) )
			return list
		}

		grow_f32( prev: Float32Array, len: number ) {
			const next = new Float32Array( len )
			next.set( prev )
			return next
		}

		add( shape: number, size: Float32Array, mass: number, pos: Float32Array, rot?: Float32Array ) {
			const i = this.count
			this.grow( i + 1 )
			this.count = i + 1
			this.shape[ i ] = shape
			this.size.set( size, i * 3 )
			this.pos.set( pos, i * 3 )
			if( rot ) this.rot.set( rot, i * 4 )
			else $bog_gamengine_vec_quat_identity( this.rot_view[ i ] )
			this.vel.fill( 0, i * 3, i * 3 + 3 )
			this.ang.fill( 0, i * 3, i * 3 + 3 )
			this.flags[ i ] = 0
			this.sleep_timer[ i ] = 0
			this.hull_off[ i ] = 0
			this.hull_count[ i ] = 0
			this.mass_set( i, mass )
			this.trans_write( i )
			this.bounds_of( i )
			return i
		}

		mass_set( i: number, mass: number ) {
			this.mass[ i ] = mass
			this.inv_mass[ i ] = mass > 0 ? 1 / mass : 0
			const inertia = this.inv_inertia
			inertia.fill( 0, i * 3, i * 3 + 3 )
			if( mass <= 0 ) return
			const size = this.size
			const sx = size[ i * 3 ], sy = size[ i * 3 + 1 ], sz = size[ i * 3 + 2 ]
			switch( this.shape[ i ] ) {
				case $bog_gamengine_phys3.shape_sphere: {
					const k = 2.5 / ( mass * sx * sx )
					inertia[ i * 3 ] = k
					inertia[ i * 3 + 1 ] = k
					inertia[ i * 3 + 2 ] = k
					break
				}
				case $bog_gamengine_phys3.shape_box: {
					inertia[ i * 3 ] = 3 / ( mass * ( sy * sy + sz * sz ) )
					inertia[ i * 3 + 1 ] = 3 / ( mass * ( sx * sx + sz * sz ) )
					inertia[ i * 3 + 2 ] = 3 / ( mass * ( sx * sx + sy * sy ) )
					break
				}
				case $bog_gamengine_phys3.shape_capsule: {
					const r = sx, h = sy
					const vol_cyl = Math.PI * r * r * 2 * h
					const vol_sph = Math.PI * r * r * r * 4 / 3
					const m_cyl = mass * vol_cyl / ( vol_cyl + vol_sph )
					const m_sph = mass - m_cyl
					const side = m_cyl * ( h * h / 3 + r * r / 4 ) + m_sph * ( r * r * 2 / 5 + h * h + h * r * 3 / 4 )
					const axis = m_cyl * r * r / 2 + m_sph * r * r * 2 / 5
					inertia[ i * 3 ] = 1 / side
					inertia[ i * 3 + 1 ] = 1 / axis
					inertia[ i * 3 + 2 ] = 1 / side
					break
				}
			}
		}

		remove( index: number ) {
			const last = this.count - 1
			if( index !== last ) {
				this.pos.copyWithin( index * 3, last * 3, last * 3 + 3 )
				this.rot.copyWithin( index * 4, last * 4, last * 4 + 4 )
				this.vel.copyWithin( index * 3, last * 3, last * 3 + 3 )
				this.ang.copyWithin( index * 3, last * 3, last * 3 + 3 )
				this.mass[ index ] = this.mass[ last ]
				this.inv_mass[ index ] = this.inv_mass[ last ]
				this.inv_inertia.copyWithin( index * 3, last * 3, last * 3 + 3 )
				this.shape[ index ] = this.shape[ last ]
				this.size.copyWithin( index * 3, last * 3, last * 3 + 3 )
				this.flags[ index ] = this.flags[ last ]
				this.trans.copyWithin( index * 16, last * 16, last * 16 + 16 )
				this.aabb.copyWithin( index * 6, last * 6, last * 6 + 6 )
				this.sleep_timer[ index ] = this.sleep_timer[ last ]
				this.hull_off[ index ] = this.hull_off[ last ]
				this.hull_count[ index ] = this.hull_count[ last ]
			}
			this.count = last
			this.joint.body_remove( index, last )
			return last
		}

		hull_points( index: number, points: Float32Array ) {
			const off = this.hull_len
			const need = off + points.length
			if( need > this.hull.length ) {
				let len = Math.max( this.hull.length, 64 * 3 )
				while( len < need ) len *= 2
				this.hull = this.grow_f32( this.hull, len )
			}
			this.hull.set( points, off )
			this.hull_len = need
			this.hull_off[ index ] = off
			this.hull_count[ index ] = points.length / 3
			this.bounds_of( index )
		}

		scale_of( i: number ) {
			const out = this.tmp_scale
			const size = this.size
			const sx = size[ i * 3 ], sy = size[ i * 3 + 1 ], sz = size[ i * 3 + 2 ]
			switch( this.shape[ i ] ) {
				case $bog_gamengine_phys3.shape_sphere:
					out[ 0 ] = out[ 1 ] = out[ 2 ] = sx * 2
					break
				case $bog_gamengine_phys3.shape_box:
					out[ 0 ] = sx * 2
					out[ 1 ] = sy * 2
					out[ 2 ] = sz * 2
					break
				case $bog_gamengine_phys3.shape_capsule:
					out[ 0 ] = out[ 2 ] = sx * 2
					out[ 1 ] = ( sx + sy ) * 2
					break
				default:
					out[ 0 ] = out[ 1 ] = out[ 2 ] = 1
			}
			return out
		}

		trans_write( i: number ) {
			$bog_gamengine_vec_quat_to_mat4( this.trans_view[ i ], this.rot_view[ i ], this.pos_view[ i ], this.scale_of( i ) )
		}

		timestep = 1 / 60
		max_steps = 4
		pending = 0
		steps_done = 0

		step( dt: number ) {
			this.steps_done = 0
			const timestep = this.timestep
			let pending = this.pending + dt
			let steps = Math.floor( pending / timestep + 1e-6 )
			if( steps > this.max_steps ) steps = this.max_steps
			pending -= steps * timestep
			if( pending >= timestep || pending < 0 ) pending = 0
			this.pending = pending
			for( let k = 0; k < steps; ++ k ) {
				this.substep( timestep )
				++ this.steps_done
			}
			const count = this.count
			const flags = this.flags, rot_view = this.rot_view, pos_view = this.pos_view, trans_view = this.trans_view
			const sleep = $bog_gamengine_phys3.flag_sleep
			for( let i = 0; i < count; ++ i ) {
				if( flags[ i ] & sleep ) continue
				$bog_gamengine_vec_quat_to_mat4( trans_view[ i ], rot_view[ i ], pos_view[ i ], this.scale_of( i ) )
			}
		}

		substep( dt: number ) {
			const count = this.count
			const gravity = this.gravity()
			const gx = gravity[ 0 ] * dt, gy = gravity[ 1 ] * dt, gz = gravity[ 2 ] * dt
			const pos = this.pos, vel = this.vel, ang = this.ang
			const inv_mass = this.inv_mass, flags = this.flags, timer = this.sleep_timer
			const rot_view = this.rot_view, ang_view = this.ang_view
			const sleep = $bog_gamengine_phys3.flag_sleep
			for( let i = 0; i < count; ++ i ) {
				if( flags[ i ] & sleep || !( inv_mass[ i ] > 0 ) ) continue
				const p = i * 3
				vel[ p ] += gx
				vel[ p + 1 ] += gy
				vel[ p + 2 ] += gz
			}
			this.bounds()
			this.broad.find( this )
			this.narrow.collide( this, this.broad.pairs, this.broad.pair_count )
			this.joint.prepare( this, dt )
			this.solve.solve( this, this.narrow, dt, this.joint )
			const speed2 = $bog_gamengine_phys3.sleep_speed * $bog_gamengine_phys3.sleep_speed
			const sleep_time = $bog_gamengine_phys3.sleep_time
			for( let i = 0; i < count; ++ i ) {
				if( flags[ i ] & sleep ) continue
				const p = i * 3
				if( inv_mass[ i ] > 0 ) {
					const v2 = vel[ p ] * vel[ p ] + vel[ p + 1 ] * vel[ p + 1 ] + vel[ p + 2 ] * vel[ p + 2 ]
					const w2 = ang[ p ] * ang[ p ] + ang[ p + 1 ] * ang[ p + 1 ] + ang[ p + 2 ] * ang[ p + 2 ]
					if( v2 < speed2 && w2 < speed2 ) {
						timer[ i ] += dt
						if( timer[ i ] >= sleep_time ) {
							flags[ i ] |= sleep
							vel.fill( 0, p, p + 3 )
							ang.fill( 0, p, p + 3 )
							continue
						}
					} else timer[ i ] = 0
					pos[ p ] += vel[ p ] * dt
					pos[ p + 1 ] += vel[ p + 1 ] * dt
					pos[ p + 2 ] += vel[ p + 2 ] * dt
					$bog_gamengine_vec_quat_integrate( rot_view[ i ], rot_view[ i ], ang_view[ i ], dt )
				}
			}
		}

		bounds() {
			const count = this.count
			const flags = this.flags
			const sleep = $bog_gamengine_phys3.flag_sleep
			for( let i = 0; i < count; ++ i ) {
				if( flags[ i ] & sleep ) continue
				this.bounds_of( i )
			}
		}

		bounds_of( i: number ) {
			const aabb = this.aabb
			const a = i * 6
			const pos = this.pos
			const px = pos[ i * 3 ], py = pos[ i * 3 + 1 ], pz = pos[ i * 3 + 2 ]
			const size = this.size
			const sx = size[ i * 3 ], sy = size[ i * 3 + 1 ], sz = size[ i * 3 + 2 ]
			switch( this.shape[ i ] ) {
				case $bog_gamengine_phys3.shape_sphere:
				case $bog_gamengine_phys3.shape_capsule: {
					const r = this.shape[ i ] === $bog_gamengine_phys3.shape_sphere ? sx : sx + sy
					aabb[ a ] = px - r
					aabb[ a + 1 ] = py - r
					aabb[ a + 2 ] = pz - r
					aabb[ a + 3 ] = px + r
					aabb[ a + 4 ] = py + r
					aabb[ a + 5 ] = pz + r
					break
				}
				case $bog_gamengine_phys3.shape_box: {
					const q = this.rot
					const x = q[ i * 4 ], y = q[ i * 4 + 1 ], z = q[ i * 4 + 2 ], w = q[ i * 4 + 3 ]
					const xx = x * x, yy = y * y, zz = z * z
					const xy = x * y, xz = x * z, yz = y * z
					const wx = w * x, wy = w * y, wz = w * z
					const ex = Math.abs( 1 - 2 * ( yy + zz ) ) * sx + Math.abs( 2 * ( xy - wz ) ) * sy + Math.abs( 2 * ( xz + wy ) ) * sz
					const ey = Math.abs( 2 * ( xy + wz ) ) * sx + Math.abs( 1 - 2 * ( xx + zz ) ) * sy + Math.abs( 2 * ( yz - wx ) ) * sz
					const ez = Math.abs( 2 * ( xz - wy ) ) * sx + Math.abs( 2 * ( yz + wx ) ) * sy + Math.abs( 1 - 2 * ( xx + yy ) ) * sz
					aabb[ a ] = px - ex
					aabb[ a + 1 ] = py - ey
					aabb[ a + 2 ] = pz - ez
					aabb[ a + 3 ] = px + ex
					aabb[ a + 4 ] = py + ey
					aabb[ a + 5 ] = pz + ez
					break
				}
				case $bog_gamengine_phys3.shape_hull: {
					const hull = this.hull
					const off = this.hull_off[ i ], end = off + this.hull_count[ i ] * 3
					const rot = this.rot_view[ i ]
					const point = this.tmp_point
					let min_x = Infinity, min_y = Infinity, min_z = Infinity
					let max_x = -Infinity, max_y = -Infinity, max_z = -Infinity
					for( let k = off; k < end; k += 3 ) {
						point[ 0 ] = hull[ k ]
						point[ 1 ] = hull[ k + 1 ]
						point[ 2 ] = hull[ k + 2 ]
						$bog_gamengine_vec_quat_rotate( point, rot, point )
						if( point[ 0 ] < min_x ) min_x = point[ 0 ]
						if( point[ 1 ] < min_y ) min_y = point[ 1 ]
						if( point[ 2 ] < min_z ) min_z = point[ 2 ]
						if( point[ 0 ] > max_x ) max_x = point[ 0 ]
						if( point[ 1 ] > max_y ) max_y = point[ 1 ]
						if( point[ 2 ] > max_z ) max_z = point[ 2 ]
					}
					if( end === off ) min_x = min_y = min_z = max_x = max_y = max_z = 0
					aabb[ a ] = px + min_x
					aabb[ a + 1 ] = py + min_y
					aabb[ a + 2 ] = pz + min_z
					aabb[ a + 3 ] = px + max_x
					aabb[ a + 4 ] = py + max_y
					aabb[ a + 5 ] = pz + max_z
					break
				}
				default: {
					aabb[ a ] = aabb[ a + 1 ] = aabb[ a + 2 ] = -1e9
					aabb[ a + 3 ] = aabb[ a + 4 ] = aabb[ a + 5 ] = 1e9
				}
			}
		}

	}

}
