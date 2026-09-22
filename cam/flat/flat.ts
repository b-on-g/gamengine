namespace $ {

	export class $bog_gamengine_cam_flat extends $bog_gamengine_cam {

		@ $mol_mem
		zoom( next?: number ) {
			return next ?? 1
		}

		@ $mol_mem
		pixels_per_unit( next?: number ) {
			return next ?? 32
		}

		@ $mol_mem
		height( next?: number ) {
			return next ?? 10
		}

		proj( aspect: number ) {
			const h = this.height() / this.zoom()
			return $mol_3d_mat4.orthographic( - h * aspect / 2, h * aspect / 2, - h / 2, h / 2, -100, 100 )
		}

	}

}
