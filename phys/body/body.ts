namespace $ {

	export class $bog_gamengine_phys_body extends $bog_gamengine_node {

		@ $mol_mem
		vel( next?: Float32Array ) {
			return next ?? new Float32Array([ 0, 0, 0 ])
		}

		@ $mol_mem
		size( next?: Float32Array ) {
			return next ?? new Float32Array([ 1, 1 ])
		}

		@ $mol_mem
		kind( next?: 'aabb' | 'circle' ) {
			return next ?? 'aabb'
		}

		@ $mol_mem
		still( next?: boolean ) {
			return next ?? false
		}

		hit( other: $bog_gamengine_phys_body | null ) {}

	}

}
