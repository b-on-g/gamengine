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
			const vx = input ? input.axis( 'left', 'right' ) * speed : 0
			const vy = input ? input.axis( 'down', 'up' ) * speed : 0

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
