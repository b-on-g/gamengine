namespace $.$$ {

	export class $bog_gamestudio_sample extends $.$bog_gamestudio_sample {

		@ $mol_mem
		hero_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ -2, 0, 0 ])
		}

		@ $mol_mem
		coin_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 2, 0, 0 ])
		}

		@ $mol_mem
		wall_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 0, 0, 0 ])
		}

	}

}
