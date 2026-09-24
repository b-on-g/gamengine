namespace $ {

	export class $bog_gamengine_shape_plane extends $bog_gamengine_shape {

		@ $mol_mem
		tile( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 1, 1 ])
		}

		@ $mol_memo.method
		geometry() {
			return new Float32Array([
				-0.5, 0, +0.5,
				+0.5, 0, +0.5,
				-0.5, 0, -0.5,
				+0.5, 0, -0.5,
			])
		}

		@ $mol_mem
		skin() {
			const tile = this.tile()
			const u = tile[ 0 ]
			const v = tile[ 1 ]
			return new Float32Array([
				0, v,
				u, v,
				0, 0,
				u, 0,
			])
		}

		@ $mol_memo.method
		normals() {
			return new Float32Array([
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
				0, 1, 0,
			])
		}

	}

}
