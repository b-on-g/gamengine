namespace $ {

	export class $bog_gamengine_demo_room_walker extends $bog_gamengine_cam_deep {

		@ $mol_mem
		key( next?: $bog_gamengine_key | null ) {
			return next ?? null
		}

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
			const key = this.key()
			if( !key ) return
			const rot = this.rot()
			let yaw = rot[ 1 ]
			const spin = key.axis( 'turn_right', 'turn_left' )
			if( spin !== 0 ) {
				yaw += spin * this.turn() * dt
				const next = new Float32Array( 3 )
				next[ 0 ] = rot[ 0 ]
				next[ 1 ] = yaw
				next[ 2 ] = rot[ 2 ]
				this.rot( next )
			}
			const track = key.axis( 'back', 'forward' )
			const side = key.axis( 'left', 'right' )
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
