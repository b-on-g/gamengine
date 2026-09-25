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
			try {
				return this.shape().radius()
			} catch( error ) {
				if( $mol_promise_like( error ) ) return Infinity
				return $mol_fail_hidden( error )
			}
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
				{ name: 'billboard', kind: 'flag', get: ()=> this.billboard(), set: next => this.billboard( next as boolean ) },
			]
		}

		@ $mol_mem
		layer() {
			const atlas = this.atlas()
			return atlas ? atlas.layer( this.frame() ) : 0
		}

		@ $mol_mem
		normal_layer() {
			const data = this.atlas()?.data() ?? null
			const frame = this.normal_frame()
			return data && frame ? data.layer( frame ) : -1
		}

		uv() {
			return uv_plain
		}

		box_local() {
			let shape = null as $bog_gamengine_shape | null
			try {
				shape = this.shape()
			} catch( error ) {
				if( $mol_promise_like( error ) ) return null
				return $mol_fail_hidden( error )
			}
			const shown = shape.box()
			if( !( shown[ 0 ] <= shown[ 3 ] ) ) return null
			const box = this.local_box
			for( let k = 0; k < 6; ++ k ) box[ k ] = shown[ k ]
			return box
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
