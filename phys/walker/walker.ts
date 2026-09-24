namespace $ {

	export class $bog_gamengine_phys_walker extends $bog_gamengine_phys_body {

		@ $mol_mem
		input( next?: $bog_gamengine_input | null ) {
			return next ?? super.input()
		}

		@ $mol_mem
		speed( next = 3 ) {
			return next
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'speed', kind: 'number', get: ()=> this.speed(), set: next => this.speed( next as number ) },
			]
		}

		step( dt: number ) {

			const input = this.input()
			const speed = this.speed()
			let want_x = input ? input.axis( 'left', 'right' ) : 0
			let want_y = input ? input.axis( 'down', 'up' ) : 0

			const len = Math.sqrt( want_x * want_x + want_y * want_y )
			if( len > 1 ) {
				want_x /= len
				want_y /= len
			}

			const vx = want_x * speed
			const vy = want_y * speed

			const vel = this.vel()
			if( vel[ 0 ] === vx && vel[ 1 ] === vy ) return

			const next = new Float32Array( 3 )
			next[ 0 ] = vx
			next[ 1 ] = vy
			next[ 2 ] = vel[ 2 ]
			this.vel( next )

		}

	}

}
