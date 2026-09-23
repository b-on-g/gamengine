namespace $ {

	export type $bog_gamengine_phys3_walker_input = {
		axis( neg: string, pos: string ): number
		action( name: string ): boolean
	}

	export class $bog_gamengine_phys3_walker extends $bog_gamengine_node {

		static skin = 0.005

		@ $mol_mem
		phys3( next?: $bog_gamengine_phys3 | null ) {
			return next ?? null
		}

		@ $mol_mem
		input( next?: $bog_gamengine_input | null ) {
			return next ?? super.input()
		}

		@ $mol_mem
		radius( next = 0.3 ) {
			return next
		}

		@ $mol_mem
		height( next = 1.8 ) {
			return next
		}

		@ $mol_mem
		speed( next = 4 ) {
			return next
		}

		@ $mol_mem
		jump( next = 5 ) {
			return next
		}

		@ $mol_mem
		step_height( next = 0.35 ) {
			return next
		}

		@ $mol_mem
		slope( next = 50 * Math.PI / 180 ) {
			return next
		}

		@ $mol_mem
		yaw( next = 0 ) {
			return next
		}

		grounded = false
		vel_y = 0

		cast = new $bog_gamengine_phys3_cast
		size = new Float32Array( 3 )
		rot_id = new Float32Array([ 0, 0, 0, 1 ])
		at = new Float32Array( 3 )
		move = new Float32Array( 3 )
		dir = new Float32Array( 3 )
		hit = new Float32Array( 7 )
		probe = new Float32Array( 3 )
		cos_slope = 0

		step( dt: number ) {
			const world = this.phys3()
			if( !world ) return
			const input = this.input()
			const radius = this.radius()
			const size = this.size
			size[ 0 ] = radius
			size[ 1 ] = Math.max( this.height() / 2 - radius, 0 )
			size[ 2 ] = 0
			this.cos_slope = Math.cos( this.slope() )
			const pos = this.pos()
			const at = this.at
			at[ 0 ] = pos[ 0 ]
			at[ 1 ] = pos[ 1 ]
			at[ 2 ] = pos[ 2 ]
			this.vel_y += world.gravity()[ 1 ] * dt
			if( this.grounded && input?.action( 'jump' ) ) {
				this.vel_y = this.jump()
				this.grounded = false
			}
			this.vertical( world, dt )
			if( input ) this.horizontal( world, input, dt )
			if( Math.abs( at[ 0 ] - pos[ 0 ] ) < 1e-6 && Math.abs( at[ 1 ] - pos[ 1 ] ) < 1e-6 && Math.abs( at[ 2 ] - pos[ 2 ] ) < 1e-6 ) return
			this.pos( new Float32Array( at ) )
		}

		vertical( world: $bog_gamengine_phys3, dt: number ) {
			const dy = this.vel_y * dt
			const skin = $bog_gamengine_phys3_walker.skin
			const dir = this.dir, hit = this.hit, at = this.at, move = this.move
			const was_grounded = this.grounded
			const rising = this.vel_y > 0
			this.grounded = false
			move[ 0 ] = 0
			move[ 1 ] = dy
			move[ 2 ] = 0
			this.slide( world, move, 3, false )
			if( this.grounded || rising || !was_grounded ) return
			dir[ 0 ] = 0
			dir[ 1 ] = -1
			dir[ 2 ] = 0
			const i = this.cast.sweep( world, $bog_gamengine_phys3.shape_capsule, this.size, at, this.rot_id, dir, this.step_height(), hit, true )
			if( i < 0 || hit[ 5 ] <= this.cos_slope ) return
			at[ 0 ] += hit[ 4 ] * skin
			at[ 1 ] += hit[ 5 ] * skin - hit[ 0 ]
			at[ 2 ] += hit[ 6 ] * skin
			this.grounded = true
			this.vel_y = 0
		}

		horizontal( world: $bog_gamengine_phys3, input: $bog_gamengine_phys3_walker_input, dt: number ) {
			const side = input.axis( 'left', 'right' )
			const track = input.axis( 'back', 'forward' )
			if( side === 0 && track === 0 ) return
			const yaw = this.yaw()
			const sin = Math.sin( yaw ), cos = Math.cos( yaw )
			const dx = - sin * track + cos * side
			const dz = - cos * track - sin * side
			const len = Math.sqrt( dx * dx + dz * dz )
			const way = this.speed() * dt / ( len > 1 ? len : 1 )
			const move = this.move
			move[ 0 ] = dx * way
			move[ 1 ] = 0
			move[ 2 ] = dz * way
			this.slide( world, move, 3, true )
		}

		slide( world: $bog_gamengine_phys3, move: Float32Array, iterations: number, walking: boolean ) {
			const skin = $bog_gamengine_phys3_walker.skin
			const at = this.at, hit = this.hit
			for( let iter = 0; iter < iterations; ++ iter ) {
				const len = Math.sqrt( move[ 0 ] * move[ 0 ] + move[ 1 ] * move[ 1 ] + move[ 2 ] * move[ 2 ] )
				if( len < 1e-6 ) return
				const i = this.cast.sweep( world, $bog_gamengine_phys3.shape_capsule, this.size, at, this.rot_id, move, len, hit, true )
				if( i < 0 ) {
					at[ 0 ] += move[ 0 ]
					at[ 1 ] += move[ 1 ]
					at[ 2 ] += move[ 2 ]
					return
				}
				const t = hit[ 0 ]
				const k = t / len
				at[ 0 ] += move[ 0 ] * k + hit[ 4 ] * skin
				at[ 1 ] += move[ 1 ] * k + hit[ 5 ] * skin
				at[ 2 ] += move[ 2 ] * k + hit[ 6 ] * skin
				const rest = 1 - k
				move[ 0 ] *= rest
				move[ 1 ] *= rest
				move[ 2 ] *= rest
				let nx = hit[ 4 ], ny = hit[ 5 ], nz = hit[ 6 ]
				const floor = ny > this.cos_slope
				if( !walking ) {
					if( floor && move[ 1 ] <= 0 ) {
						this.grounded = true
						this.vel_y = 0
						return
					}
					if( ny < - this.cos_slope && move[ 1 ] > 0 ) {
						this.vel_y = 0
						return
					}
				}
				if( !floor && walking && this.grounded && this.climb( world, move ) ) return
				if( !floor && walking ) {
					const h = Math.sqrt( nx * nx + nz * nz )
					if( h > 1e-6 ) {
						nx /= h
						ny = 0
						nz /= h
					}
				}
				const d = move[ 0 ] * nx + move[ 1 ] * ny + move[ 2 ] * nz
				move[ 0 ] -= nx * d
				move[ 1 ] -= ny * d
				move[ 2 ] -= nz * d
			}
		}

		climb( world: $bog_gamengine_phys3, move: Float32Array ) {
			const skin = $bog_gamengine_phys3_walker.skin
			const at = this.at, hit = this.hit, dir = this.dir, probe = this.probe
			const size = this.size, rot = this.rot_id, cast = this.cast
			const shape = $bog_gamengine_phys3.shape_capsule
			const step = this.step_height()
			probe[ 0 ] = at[ 0 ]
			probe[ 1 ] = at[ 1 ]
			probe[ 2 ] = at[ 2 ]
			dir[ 0 ] = 0
			dir[ 1 ] = 1
			dir[ 2 ] = 0
			let up = step
			if( cast.sweep( world, shape, size, probe, rot, dir, step, hit, true ) >= 0 ) up = Math.max( hit[ 0 ] - skin, 0 )
			if( up < skin ) return false
			probe[ 1 ] += up
			const len = Math.sqrt( move[ 0 ] * move[ 0 ] + move[ 1 ] * move[ 1 ] + move[ 2 ] * move[ 2 ] )
			let fwd = len
			if( cast.sweep( world, shape, size, probe, rot, move, len, hit, true ) >= 0 ) fwd = Math.max( hit[ 0 ] - skin, 0 )
			if( fwd < 1e-3 ) return false
			probe[ 0 ] += move[ 0 ] * fwd / len
			probe[ 1 ] += move[ 1 ] * fwd / len
			probe[ 2 ] += move[ 2 ] * fwd / len
			const nudge = this.radius() / 2
			for( let attempt = 0; attempt < 4; ++ attempt ) {
				dir[ 0 ] = 0
				dir[ 1 ] = -1
				dir[ 2 ] = 0
				if( cast.sweep( world, shape, size, probe, rot, dir, up + skin, hit, true ) < 0 ) return false
				if( hit[ 5 ] > this.cos_slope ) {
					if( probe[ 1 ] - hit[ 0 ] < at[ 1 ] + skin ) return false
					at[ 0 ] = probe[ 0 ] + hit[ 4 ] * skin
					at[ 1 ] = probe[ 1 ] - hit[ 0 ] + hit[ 5 ] * skin
					at[ 2 ] = probe[ 2 ] + hit[ 6 ] * skin
					return true
				}
				dir[ 0 ] = move[ 0 ] / len
				dir[ 1 ] = move[ 1 ] / len
				dir[ 2 ] = move[ 2 ] / len
				let extra = nudge
				if( cast.sweep( world, shape, size, probe, rot, dir, nudge, hit, true ) >= 0 ) extra = Math.max( hit[ 0 ] - skin, 0 )
				if( extra < 1e-3 ) return false
				probe[ 0 ] += dir[ 0 ] * extra
				probe[ 1 ] += dir[ 1 ] * extra
				probe[ 2 ] += dir[ 2 ] * extra
			}
			return false
		}

	}

}
