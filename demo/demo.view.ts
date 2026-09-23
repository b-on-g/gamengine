namespace $.$$ {

	export class $bog_gamengine_demo extends $.$bog_gamengine_demo {

		key_map() {
			return this.Flat().Key().keys()
		}

		@ $mol_mem
		cam() {
			return this.cam_kind() === 'deep' ? this.Cam_deep() : this.Cam_flat()
		}

		@ $mol_mem
		cam_deep_pos() {
			return new Float32Array([ 0, 0, 3 ])
		}

	}

}
