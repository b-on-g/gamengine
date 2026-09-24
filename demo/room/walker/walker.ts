namespace $ {

	const pitch_limit = Math.PI / 2 - 1e-3

	export class $bog_gamengine_demo_room_walker extends $bog_gamengine_cam_deep {

		@ $mol_mem
		input( next?: $bog_gamengine_input | null ) {
			return next ?? null
		}

		@ $mol_mem
		screen( next?: $bog_gamengine_screen | null ) {
			return next ?? null
		}

		@ $mol_mem
		sense( next = 0.003 ) {
			return next
		}

		look = new Float32Array( 2 )

		@ $mol_mem
		tile( next?: $bog_gamengine_phys_tile | null ) {
			return next ?? null
		}

		@ $mol_mem
		speed( next = 3 ) {
			return next
		}

		@ $mol_mem
		turn( next = 2 ) {
			return next
		}

		@ $mol_mem
		radius( next = 0.3 ) {
			return next
		}

		free( x: number, z: number ) {
			const tile = this.tile()
			if( !tile ) return true
			const r = this.radius()
			if( tile.solid_at( x - r, - ( z - r ) ) ) return false
			if( tile.solid_at( x + r, - ( z - r ) ) ) return false
			if( tile.solid_at( x - r, - ( z + r ) ) ) return false
			if( tile.solid_at( x + r, - ( z + r ) ) ) return false
			return true
		}

		step( dt: number ) {
			const input = this.input()
			if( !input ) return
			const rot = this.rot()
			let pitch = rot[ 0 ]
			let yaw = rot[ 1 ]
			let turned = false
			const spin = input.axis( 'turn_right', 'turn_left' )
			if( spin !== 0 ) {
				yaw += spin * this.turn() * dt
				turned = true
			}
			const screen = this.screen()
			if( screen ) {
				const look = screen.take( this.look )
				if( look[ 0 ] !== 0 || look[ 1 ] !== 0 ) {
					const sense = this.sense()
					yaw -= look[ 0 ] * sense
					pitch -= look[ 1 ] * sense
					if( pitch > pitch_limit ) pitch = pitch_limit
					if( pitch < - pitch_limit ) pitch = - pitch_limit
					turned = true
				}
			}
			if( turned ) {
				const next = new Float32Array( 3 )
				next[ 0 ] = pitch
				next[ 1 ] = yaw
				next[ 2 ] = rot[ 2 ]
				this.rot( next )
			}
			const track = input.axis( 'back', 'forward' )
			const side = input.axis( 'left', 'right' )
			if( track === 0 && side === 0 ) return
			const way = this.speed() * dt
			const sin = Math.sin( yaw )
			const cos = Math.cos( yaw )
			const dx = ( - sin * track + cos * side ) * way
			const dz = ( - cos * track - sin * side ) * way
			const pos = this.pos()
			let x = pos[ 0 ]
			let z = pos[ 2 ]
			if( this.free( x + dx, z ) ) x += dx
			if( this.free( x, z + dz ) ) z += dz
			if( x === pos[ 0 ] && z === pos[ 2 ] ) return
			const next = new Float32Array( 3 )
			next[ 0 ] = x
			next[ 1 ] = pos[ 1 ]
			next[ 2 ] = z
			this.pos( next )
		}

	}

}
