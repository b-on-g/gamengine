namespace $ {

	export class $bog_gamengine_demo_crumb_hero extends $bog_gamengine_phys_body {

		@ $mol_mem
		input( next?: $bog_gamengine_input | null ) {
			return next ?? null
		}

		@ $mol_mem
		speed( next = 4 ) {
			return next
		}

		@ $mol_mem
		size( next?: Float32Array ) {
			return next ?? new Float32Array([ 0.7, 0.7 ])
		}

		step( dt: number ) {
			const input = this.input()
			if( !input ) return
			const speed = this.speed()
			const vx = input.axis( 'left', 'right' ) * speed
			const vy = input.axis( 'down', 'up' ) * speed
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
