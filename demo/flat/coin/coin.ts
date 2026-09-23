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
		taken( next = false ) {
			return next
		}

		hit( other: $bog_gamengine_phys_body | null ) {
			if( other instanceof $bog_gamengine_demo_flat_hero ) this.taken( true )
		}

	}

}
