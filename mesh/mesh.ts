namespace $ {

	const uv_plain = new Float32Array([ 0, 0, 1, 1 ])

	export type $bog_gamengine_mesh_lod = {
		dist: number
		shape: $bog_gamengine_shape
	}

	export class $bog_gamengine_mesh extends $bog_gamengine_node {

		@ $mol_mem
		lods( next?: readonly $bog_gamengine_mesh_lod[] ) {
			return next ?? []
		}

		radius() {
			return this.shape().radius()
		}

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
		size( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 1, 1, 1 ])
		}

		@ $mol_mem
		material( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 0, 0.6, 0, 0 ])
		}

		@ $mol_mem
		normal_frame( next = '' ) {
			return next
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'frame', kind: 'frame', get: ()=> this.frame(), set: next => this.frame( next as string ) },
				{ name: 'normal_frame', kind: 'frame', get: ()=> this.normal_frame(), set: next => this.normal_frame( next as string ) },
				{ name: 'size', kind: 'vec3', get: ()=> this.size(), set: next => this.size( next as ArrayLike< number > ) },
				{ name: 'material', kind: 'vec4', get: ()=> this.material(), set: next => this.material( next as ArrayLike< number > ) },
			]
		}

		@ $mol_mem
		layer() {
			const atlas = this.atlas()
			return atlas ? atlas.layer( this.frame() ) : 0
		}

		@ $mol_mem
		normal_layer() {
			const atlas = this.atlas()
			const frame = this.normal_frame()
			return atlas && frame ? atlas.layer( frame ) : -1
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
