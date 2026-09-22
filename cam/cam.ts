namespace $ {

	export class $bog_gamengine_cam extends $bog_gamengine_node {

		@ $mol_mem
		view() {
			return this.world().inversed()
		}

		proj( aspect: number ): $mol_3d_mat4 {
			throw new Error( 'not implemented' )
		}

	}

}
