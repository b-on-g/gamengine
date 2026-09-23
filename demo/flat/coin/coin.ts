namespace $ {

	export class $bog_gamengine_demo_flat_coin extends $bog_gamengine_phys_body {

		@ $mol_mem
		size( next?: Float32Array ) {
			return next ?? new Float32Array([ 0.6, 0.6 ])
		}

		ghost() {
			return true
		}

		still() {
			return true
		}

		@ $mol_mem
		sound( next?: $bog_gamengine_sound | null ) {
			return next ?? null
		}

		@ $mol_mem
		emitter( next?: $bog_gamengine_particle | null ) {
			return next ?? null
		}

		@ $mol_mem
		taken( next = false ) {
			if( next ) {
				this.sound()?.play( 'coin' )
				const emitter = this.emitter()
				const pos = this.pos()
				if( emitter ) new this.$.$mol_after_tick( ()=> emitter.burst( 20, pos ) )
			}
			return next
		}

		hit( other: $bog_gamengine_phys_body | null ) {
			if( other instanceof $bog_gamengine_demo_flat_hero && !this.taken() ) this.taken( true )
		}

	}

}
