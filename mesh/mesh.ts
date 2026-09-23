namespace $ {

	const uv_plain = new Float32Array([ 0, 0, 1, 1 ])

	export class $bog_gamengine_mesh extends $bog_gamengine_node {

		@ $mol_mem
		shape( next?: $bog_gamengine_shape ) {
			return next ?? new $bog_gamengine_shape_box
		}

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
		size( next?: Float32Array ) {
			return next ?? new Float32Array([ 1, 1, 1 ])
		}

		@ $mol_mem
		layer() {
			const atlas = this.atlas()
			return atlas ? atlas.layer( this.frame() ) : 0
		}

		uv() {
			return uv_plain
		}

		@ $mol_mem
		trans() {
			return $mol_3d_mat4.multiply(
				super.trans(),
				$mol_3d_mat4.scaling( this.size() ),
			)
		}

	}

}
