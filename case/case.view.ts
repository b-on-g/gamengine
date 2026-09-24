namespace $.$$ {

	export class $bog_gamestudio_case extends $.$bog_gamestudio_case {

		@ $mol_mem
		Hero_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 3.25, 0, 0 ])
		}

		@ $mol_mem
		Coin_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 2, 0, 0 ])
		}

		@ $mol_mem
		Coin_tint( next?: Float32Array ) {
			return next ?? new Float32Array([ 1, 0.5, 0.25, 1 ])
		}

		@ $mol_mem
		Wall_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 0, 0, 0 ])
		}

		@ $mol_mem
		Wall_scale( next?: Float32Array ) {
			return next ?? new Float32Array([ 2, 2, 1 ])
		}

		@ $mol_mem
		Sprite_1_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 10.5, -1.5, 0 ])
		}

	}

}
