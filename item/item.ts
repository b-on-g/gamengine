namespace $ {

	export class $bog_jumper_item extends $bog_gamengine_phys_body {

		@ $mol_mem
		role( next = 'coin' ) {
			return next
		}

		@ $mol_mem
		taken( next = false ) {
			return next
		}

		@ $mol_mem
		size( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 0.5, 0.5 ])
		}

		still() {
			return true
		}

		ghost() {
			return true
		}

	}

}
