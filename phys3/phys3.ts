namespace $ {

	export class $bog_gamengine_phys3 extends $mol_object2 {

		static shape_sphere = 0
		static shape_box = 1
		static shape_capsule = 2
		static shape_plane = 3
		static shape_hull = 4

		static flag_sleep = 1
		static flag_ghost = 2

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
		hull_off = new Uint32Array( 0 )
		hull_count = new Uint32Array( 0 )
		hull = new Float32Array( 0 )
		hull_len = 0
		pos_view = [] as Float32Array[]
		rot_view = [] as Float32Array[]
		ang_view = [] as Float32Array[]
		trans_view = [] as Float32Array[]

		tmp_scale = new Float32Array( 3 )

		@ $mol_mem
		gravity( next?: Float32Array ) {
			return next ?? new Float32Array([ 0, -9.81, 0 ])
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
			this.hull_off[ i ] = 0
			this.hull_count[ i ] = 0
			this.mass_set( i, mass )
			this.trans_write( i )
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
				this.hull_off[ index ] = this.hull_off[ last ]
				this.hull_count[ index ] = this.hull_count[ last ]
			}
			this.count = last
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

		step( dt: number ) {
			const count = this.count
			const gravity = this.gravity()
			const gx = gravity[ 0 ] * dt, gy = gravity[ 1 ] * dt, gz = gravity[ 2 ] * dt
			const pos = this.pos, vel = this.vel
			const inv_mass = this.inv_mass, flags = this.flags
			const pos_view = this.pos_view, rot_view = this.rot_view, ang_view = this.ang_view, trans_view = this.trans_view
			const sleep = $bog_gamengine_phys3.flag_sleep
			for( let i = 0; i < count; ++ i ) {
				if( flags[ i ] & sleep ) continue
				const p = i * 3
				if( inv_mass[ i ] > 0 ) {
					vel[ p ] += gx
					vel[ p + 1 ] += gy
					vel[ p + 2 ] += gz
					pos[ p ] += vel[ p ] * dt
					pos[ p + 1 ] += vel[ p + 1 ] * dt
					pos[ p + 2 ] += vel[ p + 2 ] * dt
					$bog_gamengine_vec_quat_integrate( rot_view[ i ], rot_view[ i ], ang_view[ i ], dt )
				}
				$bog_gamengine_vec_quat_to_mat4( trans_view[ i ], rot_view[ i ], pos_view[ i ], this.scale_of( i ) )
			}
		}

	}

}
