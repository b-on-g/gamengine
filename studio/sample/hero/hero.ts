namespace $ {

	export class $bog_gamengine_studio_sample_hero extends $bog_gamengine_sprite {

		@ $mol_mem
		input( next?: $bog_gamengine_input | null ) {
			return next ?? null
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
			if( !input || dt === 0 ) return
			const vx = input.axis( 'left', 'right' )
			const vy = input.axis( 'down', 'up' )
			if( vx === 0 && vy === 0 ) return
			const way = this.speed() * dt
			const pos = this.pos()
			this.pos( new Float32Array([ pos[ 0 ] + vx * way, pos[ 1 ] + vy * way, pos[ 2 ] ]) )
		}

	}

}
