namespace $ {

	export class $bog_gamengine_demo_spin extends $bog_gamengine_node {

		@ $mol_mem
		tint() {
			return new Float32Array([ 1, 0.2, 0.2, 1 ])
		}

		step( dt: number ) {
			const rot = this.rot()
			this.rot( new Float32Array([ rot[ 0 ], rot[ 1 ], rot[ 2 ] + dt ]) )
		}

	}

}
