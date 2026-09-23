namespace $ {

	const uv_plain = new Float32Array([ 0, 0, 1, 1 ])
	const uv_flip = new Float32Array([ 1, 0, -1, 1 ])

	export class $bog_gamengine_sprite extends $bog_gamengine_node {

		@ $mol_mem
		atlas( next?: $bog_gamengine_atlas | null ) {
			return next ?? null
		}

		@ $mol_mem
		frame( next = '' ) {
			return next
		}

		@ $mol_mem
		tint( next?: Float32Array ) {
			return next ?? new Float32Array([ 1, 1, 1, 1 ])
		}

		@ $mol_mem
		flip_x( next = false ) {
			return next
		}

		@ $mol_mem
		size( next?: Float32Array ) {
			return next ?? new Float32Array([ 1, 1 ])
		}

		@ $mol_mem
		layer() {
			const atlas = this.atlas()
			return atlas ? atlas.layer( this.frame() ) : 0
		}

		@ $mol_mem
		uv() {
			return this.flip_x() ? uv_flip : uv_plain
		}

		@ $mol_mem
		trans() {
			const size = this.size()
			return $mol_3d_mat4.multiply(
				super.trans(),
				$mol_3d_mat4.scaling([ size[ 0 ], size[ 1 ], 1 ]),
			)
		}

	}

}
