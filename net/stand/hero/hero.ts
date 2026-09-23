namespace $ {

	export class $bog_gamengine_net_stand_hero extends $bog_gamengine_node {

		@ $mol_mem
		key( next?: $bog_gamengine_key | null ) {
			return next ?? null
		}

		@ $mol_mem
		speed( next = 4 ) {
			return next
		}

		step( dt: number ) {
			const key = this.key()
			if( !key ) return
			const speed = this.speed()
			const dx = key.axis( 'left', 'right' ) * speed * dt
			const dy = key.axis( 'down', 'up' ) * speed * dt
			if( dx === 0 && dy === 0 ) return
			const pos = this.pos()
			this.pos( new Float32Array([ pos[ 0 ] + dx, pos[ 1 ] + dy, pos[ 2 ] ]) )
		}

	}

}
