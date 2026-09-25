namespace $.$$ {

	export class $bog_gamengine_demo_crumb2_level extends $.$bog_gamengine_demo_crumb2_level {

		@ $mol_mem
		Hero_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 1.5, -1.5, 0 ])
		}

		@ $mol_mem
		Hero_size( next?: Float32Array ) {
			return next ?? new Float32Array([ 0.8, 0.8 ])
		}

		@ $mol_mem
		Coin_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 4.5, -1.5, 0 ])
		}

		@ $mol_mem
		Sprite_1_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 1.5, -3.5, 0 ])
		}

		@ $mol_mem
		Sprite_2_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 4.5, -3.5, 0 ])
		}

		@ $mol_mem
		Sprite_3_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 2.5, -2.5, 0 ])
		}

		@ $mol_mem
		Sprite_4_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 4.5, -2.5, 0 ])
		}

	}

}
