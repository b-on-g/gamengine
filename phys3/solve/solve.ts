namespace $ {

	export type $bog_gamengine_phys3_solve_world = {
		pos: Float32Array
		rot: Float32Array
		vel: Float32Array
		ang: Float32Array
		inv_mass: Float32Array
		inv_inertia: Float32Array
		flags: Uint8Array
		sleep_timer: Float32Array
		friction(): number
		restitution(): number
		iterations(): number
	}

	export type $bog_gamengine_phys3_solve_narrow = {
		contact_count: number
		contact_a: Uint32Array
		contact_b: Uint32Array
		contact_point: Float32Array
		contact_normal: Float32Array
		contact_depth: Float32Array
	}

	export type $bog_gamengine_phys3_solve_joint = {
		iterate(): void
	}

	export class $bog_gamengine_phys3_solve extends $mol_object2 {

		static beta = 0.2
		static slop = 0.005
		static bounce_speed = 1
		static warm_dist = 0.05
		static flag_sleep = 1
		static flag_ghost = 2

		world = {} as $bog_gamengine_phys3_solve_world

		cap = 0
		count = 0
		body_a = new Uint32Array( 0 )
		body_b = new Uint32Array( 0 )
		point = new Float32Array( 0 )
		normal: Float32Array< ArrayBufferLike > = new Float32Array( 0 )
		ra = new Float32Array( 0 )
		rb = new Float32Array( 0 )
		t1 = new Float32Array( 0 )
		t2 = new Float32Array( 0 )
		an_a = new Float32Array( 0 )
		an_b = new Float32Array( 0 )
		at1_a = new Float32Array( 0 )
		at1_b = new Float32Array( 0 )
		at2_a = new Float32Array( 0 )
		at2_b = new Float32Array( 0 )
		mass_n = new Float32Array( 0 )
		mass_t1 = new Float32Array( 0 )
		mass_t2 = new Float32Array( 0 )
		bias = new Float32Array( 0 )
		pn = new Float32Array( 0 )
		pt1 = new Float32Array( 0 )
		pt2 = new Float32Array( 0 )
		pt = new Float32Array( 0 )
		live = new Uint8Array( 0 )

		prev_count = 0
		prev_a = new Uint32Array( 0 )
		prev_b = new Uint32Array( 0 )
		prev_point = new Float32Array( 0 )
		prev_pn = new Float32Array( 0 )
		prev_pt = new Float32Array( 0 )

		hash_cap = 0
		hash_head = new Int32Array( 0 )
		hash_next = new Int32Array( 0 )

		tmp = new Float32Array( 3 )

		grow( need: number ) {
			if( need <= this.cap ) return
			let cap = Math.max( this.cap, 64 )
			while( cap < need ) cap *= 2
			this.cap = cap
			this.body_a = this.grow_u32( this.body_a, cap )
			this.body_b = this.grow_u32( this.body_b, cap )
			this.point = this.grow_f32( this.point, cap * 3 )
			this.ra = this.grow_f32( this.ra, cap * 3 )
			this.rb = this.grow_f32( this.rb, cap * 3 )
			this.t1 = this.grow_f32( this.t1, cap * 3 )
			this.t2 = this.grow_f32( this.t2, cap * 3 )
			this.an_a = this.grow_f32( this.an_a, cap * 3 )
			this.an_b = this.grow_f32( this.an_b, cap * 3 )
			this.at1_a = this.grow_f32( this.at1_a, cap * 3 )
			this.at1_b = this.grow_f32( this.at1_b, cap * 3 )
			this.at2_a = this.grow_f32( this.at2_a, cap * 3 )
			this.at2_b = this.grow_f32( this.at2_b, cap * 3 )
			this.mass_n = this.grow_f32( this.mass_n, cap )
			this.mass_t1 = this.grow_f32( this.mass_t1, cap )
			this.mass_t2 = this.grow_f32( this.mass_t2, cap )
			this.bias = this.grow_f32( this.bias, cap )
			this.pn = this.grow_f32( this.pn, cap )
			this.pt1 = this.grow_f32( this.pt1, cap )
			this.pt2 = this.grow_f32( this.pt2, cap )
			this.pt = this.grow_f32( this.pt, cap * 3 )
			const live = new Uint8Array( cap )
			live.set( this.live )
			this.live = live
			this.prev_a = this.grow_u32( this.prev_a, cap )
			this.prev_b = this.grow_u32( this.prev_b, cap )
			this.prev_point = this.grow_f32( this.prev_point, cap * 3 )
			this.prev_pn = this.grow_f32( this.prev_pn, cap )
			this.prev_pt = this.grow_f32( this.prev_pt, cap * 3 )
			const next = new Int32Array( cap )
			next.set( this.hash_next )
			this.hash_next = next
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

		solve( world: $bog_gamengine_phys3_solve_world, narrow: $bog_gamengine_phys3_solve_narrow, dt: number, joint?: $bog_gamengine_phys3_solve_joint ) {
			this.world = world
			const count = narrow.contact_count
			this.grow( count )
			this.count = count
			this.normal = narrow.contact_normal
			this.hash_build()
			this.prepare( narrow, dt )
			const iterations = world.iterations()
			const friction = world.friction()
			for( let it = 0; it < iterations; ++ it ) {
				this.iterate( friction )
				joint?.iterate()
			}
			this.remember()
			return count
		}

		hash_of( a: number, b: number ) {
			return ( Math.imul( a, 73856093 ) ^ Math.imul( b, 19349663 ) ) & ( this.hash_cap - 1 )
		}

		hash_build() {
			const need = this.prev_count * 2
			if( this.hash_cap < need ) {
				let cap = Math.max( this.hash_cap, 64 )
				while( cap < need ) cap *= 2
				this.hash_cap = cap
				this.hash_head = new Int32Array( cap )
			}
			const head = this.hash_head, next = this.hash_next
			head.fill( -1, 0, this.hash_cap )
			if( this.hash_cap === 0 ) return
			const prev_a = this.prev_a, prev_b = this.prev_b
			for( let j = 0; j < this.prev_count; ++ j ) {
				const h = this.hash_of( prev_a[ j ], prev_b[ j ] )
				next[ j ] = head[ h ]
				head[ h ] = j
			}
		}

		prev_find( a: number, b: number, px: number, py: number, pz: number ) {
			if( this.hash_cap === 0 ) return -1
			const prev_a = this.prev_a, prev_b = this.prev_b, prev_point = this.prev_point, next = this.hash_next
			let best = -1
			let best_dist = $bog_gamengine_phys3_solve.warm_dist * $bog_gamengine_phys3_solve.warm_dist
			for( let j = this.hash_head[ this.hash_of( a, b ) ]; j >= 0; j = next[ j ] ) {
				if( prev_a[ j ] !== a || prev_b[ j ] !== b ) continue
				const dx = prev_point[ j * 3 ] - px, dy = prev_point[ j * 3 + 1 ] - py, dz = prev_point[ j * 3 + 2 ] - pz
				const dist = dx * dx + dy * dy + dz * dz
				if( dist >= best_dist ) continue
				best_dist = dist
				best = j
			}
			return best
		}

		inertia_apply( i: number, vx: number, vy: number, vz: number, out: Float32Array, off: number ) {
			const rot = this.world.rot, inv = this.world.inv_inertia
			const qx = rot[ i * 4 ], qy = rot[ i * 4 + 1 ], qz = rot[ i * 4 + 2 ], qw = rot[ i * 4 + 3 ]
			let tx = 2 * ( qz * vy - qy * vz )
			let ty = 2 * ( qx * vz - qz * vx )
			let tz = 2 * ( qy * vx - qx * vy )
			const lx = ( vx + qw * tx + qz * ty - qy * tz ) * inv[ i * 3 ]
			const ly = ( vy + qw * ty + qx * tz - qz * tx ) * inv[ i * 3 + 1 ]
			const lz = ( vz + qw * tz + qy * tx - qx * ty ) * inv[ i * 3 + 2 ]
			tx = 2 * ( qy * lz - qz * ly )
			ty = 2 * ( qz * lx - qx * lz )
			tz = 2 * ( qx * ly - qy * lx )
			out[ off ] = lx + qw * tx + qy * tz - qz * ty
			out[ off + 1 ] = ly + qw * ty + qz * tx - qx * tz
			out[ off + 2 ] = lz + qw * tz + qx * ty - qy * tx
		}

		axis_mass( k: number, a: number, b: number, ax: number, ay: number, az: number, out_a: Float32Array, out_b: Float32Array ) {
			const ra = this.ra, rb = this.rb, world = this.world
			const k3 = k * 3
			const rax = ra[ k3 ], ray = ra[ k3 + 1 ], raz = ra[ k3 + 2 ]
			const rbx = rb[ k3 ], rby = rb[ k3 + 1 ], rbz = rb[ k3 + 2 ]
			const cax = ray * az - raz * ay, cay = raz * ax - rax * az, caz = rax * ay - ray * ax
			const cbx = rby * az - rbz * ay, cby = rbz * ax - rbx * az, cbz = rbx * ay - rby * ax
			this.inertia_apply( a, cax, cay, caz, out_a, k3 )
			this.inertia_apply( b, cbx, cby, cbz, out_b, k3 )
			const sum = world.inv_mass[ a ] + world.inv_mass[ b ]
				+ cax * out_a[ k3 ] + cay * out_a[ k3 + 1 ] + caz * out_a[ k3 + 2 ]
				+ cbx * out_b[ k3 ] + cby * out_b[ k3 + 1 ] + cbz * out_b[ k3 + 2 ]
			return sum > 0 ? 1 / sum : 0
		}

		wake( i: number ) {
			this.world.flags[ i ] &= ~ $bog_gamengine_phys3_solve.flag_sleep
			this.world.sleep_timer[ i ] = 0
		}

		prepare( narrow: $bog_gamengine_phys3_solve_narrow, dt: number ) {
			const world = this.world
			const pos = world.pos, inv_mass = world.inv_mass, flags = world.flags
			const ca = narrow.contact_a, cb = narrow.contact_b, cp = narrow.contact_point, cn = narrow.contact_normal, cd = narrow.contact_depth
			const body_a = this.body_a, body_b = this.body_b, point = this.point, live = this.live
			const ra = this.ra, rb = this.rb, t1 = this.t1, t2 = this.t2, tmp = this.tmp
			const pn = this.pn, pt1 = this.pt1, pt2 = this.pt2, bias = this.bias
			const prev_pn = this.prev_pn, prev_pt = this.prev_pt
			const sleep = $bog_gamengine_phys3_solve.flag_sleep, ghost = $bog_gamengine_phys3_solve.flag_ghost
			const restitution = world.restitution()
			const bounce_speed = $bog_gamengine_phys3_solve.bounce_speed
			const beta_dt = $bog_gamengine_phys3_solve.beta / dt
			const slop = $bog_gamengine_phys3_solve.slop
			for( let k = 0; k < this.count; ++ k ) {
				const k3 = k * 3
				const a = ca[ k ], b = cb[ k ]
				body_a[ k ] = a
				body_b[ k ] = b
				const px = cp[ k3 ], py = cp[ k3 + 1 ], pz = cp[ k3 + 2 ]
				point[ k3 ] = px
				point[ k3 + 1 ] = py
				point[ k3 + 2 ] = pz
				live[ k ] = 0
				pn[ k ] = 0
				pt1[ k ] = 0
				pt2[ k ] = 0
				const fa = flags[ a ], fb = flags[ b ]
				if( ( fa | fb ) & ghost ) continue
				const ima = inv_mass[ a ], imb = inv_mass[ b ]
				if( ima === 0 && imb === 0 ) continue
				const sa = fa & sleep, sb = fb & sleep
				if( sa && sb ) continue
				if( sa ) this.wake( a )
				if( sb ) this.wake( b )
				live[ k ] = 1
				ra[ k3 ] = px - pos[ a * 3 ]
				ra[ k3 + 1 ] = py - pos[ a * 3 + 1 ]
				ra[ k3 + 2 ] = pz - pos[ a * 3 + 2 ]
				rb[ k3 ] = px - pos[ b * 3 ]
				rb[ k3 + 1 ] = py - pos[ b * 3 + 1 ]
				rb[ k3 + 2 ] = pz - pos[ b * 3 + 2 ]
				const nx = cn[ k3 ], ny = cn[ k3 + 1 ], nz = cn[ k3 + 2 ]
				this.mass_n[ k ] = this.axis_mass( k, a, b, nx, ny, nz, this.an_a, this.an_b )
				let ux = 0, uy = 0, uz = 0
				if( Math.abs( nx ) >= 0.57735 ) {
					ux = ny
					uy = - nx
				} else {
					uy = nz
					uz = - ny
				}
				const ul = 1 / Math.sqrt( ux * ux + uy * uy + uz * uz )
				ux *= ul
				uy *= ul
				uz *= ul
				t1[ k3 ] = ux
				t1[ k3 + 1 ] = uy
				t1[ k3 + 2 ] = uz
				const vx = ny * uz - nz * uy, vy = nz * ux - nx * uz, vz = nx * uy - ny * ux
				t2[ k3 ] = vx
				t2[ k3 + 1 ] = vy
				t2[ k3 + 2 ] = vz
				this.mass_t1[ k ] = this.axis_mass( k, a, b, ux, uy, uz, this.at1_a, this.at1_b )
				this.mass_t2[ k ] = this.axis_mass( k, a, b, vx, vy, vz, this.at2_a, this.at2_b )
				this.rel_vel( k, a, b )
				const vn = tmp[ 0 ] * nx + tmp[ 1 ] * ny + tmp[ 2 ] * nz
				const bounce = vn < - bounce_speed ? - restitution * vn : 0
				let baum = beta_dt * ( cd[ k ] - slop )
				if( baum < 0 ) baum = 0
				bias[ k ] = bounce > baum ? bounce : baum
				const j = this.prev_find( a, b, px, py, pz )
				if( j < 0 ) continue
				const ln = prev_pn[ j ]
				const ptx = prev_pt[ j * 3 ], pty = prev_pt[ j * 3 + 1 ], ptz = prev_pt[ j * 3 + 2 ]
				const l1 = ptx * ux + pty * uy + ptz * uz
				const l2 = ptx * vx + pty * vy + ptz * vz
				pn[ k ] = ln
				pt1[ k ] = l1
				pt2[ k ] = l2
				this.apply( k, a, b, cn, this.an_a, this.an_b, ln )
				this.apply( k, a, b, t1, this.at1_a, this.at1_b, l1 )
				this.apply( k, a, b, t2, this.at2_a, this.at2_b, l2 )
			}
		}

		rel_vel( k: number, a: number, b: number ) {
			const vel = this.world.vel, ang = this.world.ang, ra = this.ra, rb = this.rb, out = this.tmp
			const a3 = a * 3, b3 = b * 3, k3 = k * 3
			const wax = ang[ a3 ], way = ang[ a3 + 1 ], waz = ang[ a3 + 2 ]
			const wbx = ang[ b3 ], wby = ang[ b3 + 1 ], wbz = ang[ b3 + 2 ]
			const rax = ra[ k3 ], ray = ra[ k3 + 1 ], raz = ra[ k3 + 2 ]
			const rbx = rb[ k3 ], rby = rb[ k3 + 1 ], rbz = rb[ k3 + 2 ]
			out[ 0 ] = vel[ b3 ] + ( wby * rbz - wbz * rby ) - vel[ a3 ] - ( way * raz - waz * ray )
			out[ 1 ] = vel[ b3 + 1 ] + ( wbz * rbx - wbx * rbz ) - vel[ a3 + 1 ] - ( waz * rax - wax * raz )
			out[ 2 ] = vel[ b3 + 2 ] + ( wbx * rby - wby * rbx ) - vel[ a3 + 2 ] - ( wax * ray - way * rax )
			return out
		}

		apply( k: number, a: number, b: number, axis: Float32Array, ang_a: Float32Array, ang_b: Float32Array, lambda: number ) {
			if( lambda === 0 ) return
			const vel = this.world.vel, ang = this.world.ang, inv_mass = this.world.inv_mass
			const a3 = a * 3, b3 = b * 3, k3 = k * 3
			const ima = inv_mass[ a ] * lambda, imb = inv_mass[ b ] * lambda
			vel[ a3 ] -= axis[ k3 ] * ima
			vel[ a3 + 1 ] -= axis[ k3 + 1 ] * ima
			vel[ a3 + 2 ] -= axis[ k3 + 2 ] * ima
			ang[ a3 ] -= ang_a[ k3 ] * lambda
			ang[ a3 + 1 ] -= ang_a[ k3 + 1 ] * lambda
			ang[ a3 + 2 ] -= ang_a[ k3 + 2 ] * lambda
			vel[ b3 ] += axis[ k3 ] * imb
			vel[ b3 + 1 ] += axis[ k3 + 1 ] * imb
			vel[ b3 + 2 ] += axis[ k3 + 2 ] * imb
			ang[ b3 ] += ang_b[ k3 ] * lambda
			ang[ b3 + 1 ] += ang_b[ k3 + 1 ] * lambda
			ang[ b3 + 2 ] += ang_b[ k3 + 2 ] * lambda
		}

		iterate( friction: number ) {
			const body_a = this.body_a, body_b = this.body_b, live = this.live, tmp = this.tmp
			const normal = this.normal, t1 = this.t1, t2 = this.t2
			const mass_n = this.mass_n, mass_t1 = this.mass_t1, mass_t2 = this.mass_t2, bias = this.bias
			const pn = this.pn, pt1 = this.pt1, pt2 = this.pt2
			for( let k = 0; k < this.count; ++ k ) {
				if( !live[ k ] ) continue
				const k3 = k * 3
				const a = body_a[ k ], b = body_b[ k ]
				const max = friction * pn[ k ]
				this.rel_vel( k, a, b )
				const vt1 = tmp[ 0 ] * t1[ k3 ] + tmp[ 1 ] * t1[ k3 + 1 ] + tmp[ 2 ] * t1[ k3 + 2 ]
				const old1 = pt1[ k ]
				let new1 = old1 - mass_t1[ k ] * vt1
				new1 = new1 < - max ? - max : new1 > max ? max : new1
				pt1[ k ] = new1
				this.apply( k, a, b, t1, this.at1_a, this.at1_b, new1 - old1 )
				this.rel_vel( k, a, b )
				const vt2 = tmp[ 0 ] * t2[ k3 ] + tmp[ 1 ] * t2[ k3 + 1 ] + tmp[ 2 ] * t2[ k3 + 2 ]
				const old2 = pt2[ k ]
				let new2 = old2 - mass_t2[ k ] * vt2
				new2 = new2 < - max ? - max : new2 > max ? max : new2
				pt2[ k ] = new2
				this.apply( k, a, b, t2, this.at2_a, this.at2_b, new2 - old2 )
				this.rel_vel( k, a, b )
				const vn = tmp[ 0 ] * normal[ k3 ] + tmp[ 1 ] * normal[ k3 + 1 ] + tmp[ 2 ] * normal[ k3 + 2 ]
				const old = pn[ k ]
				let next = old + mass_n[ k ] * ( bias[ k ] - vn )
				if( next < 0 ) next = 0
				pn[ k ] = next
				this.apply( k, a, b, normal, this.an_a, this.an_b, next - old )
			}
		}

		remember() {
			const pt = this.pt, pt1 = this.pt1, pt2 = this.pt2, t1 = this.t1, t2 = this.t2
			for( let k = 0; k < this.count; ++ k ) {
				const k3 = k * 3
				pt[ k3 ] = t1[ k3 ] * pt1[ k ] + t2[ k3 ] * pt2[ k ]
				pt[ k3 + 1 ] = t1[ k3 + 1 ] * pt1[ k ] + t2[ k3 + 1 ] * pt2[ k ]
				pt[ k3 + 2 ] = t1[ k3 + 2 ] * pt1[ k ] + t2[ k3 + 2 ] * pt2[ k ]
			}
			const a = this.body_a
			this.body_a = this.prev_a
			this.prev_a = a
			const b = this.body_b
			this.body_b = this.prev_b
			this.prev_b = b
			const point = this.point
			this.point = this.prev_point
			this.prev_point = point
			const pn = this.pn
			this.pn = this.prev_pn
			this.prev_pn = pn
			this.pt = this.prev_pt
			this.prev_pt = pt
			this.prev_count = this.count
		}

	}

}
