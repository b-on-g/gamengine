namespace $ {

	export class $bog_gamengine_shape_plane extends $bog_gamengine_shape {

		@ $mol_mem
		tile( next = 1 ) {
			return next
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
			return new Float32Array([
				0, tile,
				tile, tile,
				0, 0,
				tile, 0,
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
