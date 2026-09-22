namespace $ {

	export class $bog_gamengine_shape_quad extends $bog_gamengine_shape {

		@ $mol_memo.method
		geometry() {
			return new Float32Array([
				-0.5, -0.5, 0,
				+0.5, -0.5, 0,
				-0.5, +0.5, 0,
				+0.5, +0.5, 0,
			])
		}

		@ $mol_memo.method
		skin() {
			return new Float32Array([
				0, 1,
				1, 1,
				0, 0,
				1, 0,
			])
		}

	}

}
