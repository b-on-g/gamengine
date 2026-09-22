namespace $ {

	export class $bog_gamengine_node extends $mol_object2 {

		@ $mol_mem
		pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 0, 0, 0 ])
		}

		@ $mol_mem
		rot( next?: Float32Array ) {
			return next ?? new Float32Array([ 0, 0, 0 ])
		}

		@ $mol_mem
		scale( next?: Float32Array ) {
			return next ?? new Float32Array([ 1, 1, 1 ])
		}

		@ $mol_mem
		parent( next?: $bog_gamengine_node | null ) {
			return next ?? null
		}

		kids(): readonly $bog_gamengine_node[] {
			return []
		}

		@ $mol_mem
		trans() {
			const rot = this.rot()
			return $mol_3d_mat4.multiply(
				$mol_3d_mat4.translation( this.pos() ),
				$mol_3d_mat4.rotation( [ 0, 0, 1 ], rot[ 2 ] ),
				$mol_3d_mat4.rotation( [ 0, 1, 0 ], rot[ 1 ] ),
				$mol_3d_mat4.rotation( [ 1, 0, 0 ], rot[ 0 ] ),
				$mol_3d_mat4.scaling( this.scale() ),
			)
		}

		@ $mol_mem
		world(): $mol_3d_mat4 {
			const parent = this.parent()
			return parent ? $mol_3d_mat4.multiply( parent.world(), this.trans() ) : this.trans()
		}

		step( dt: number ) {}

	}

}
