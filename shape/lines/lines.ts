namespace $ {

	export class $bog_gamengine_shape_lines extends $bog_gamengine_shape {

		@ $mol_mem
		points( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array( 0 )
		}

		geometry() {
			return this.points() as Float32Array< ArrayBuffer >
		}

		@ $mol_mem
		normals() {
			return new Float32Array( this.size() * 3 )
		}

		@ $mol_mem
		skin() {
			return new Float32Array( this.size() * 2 )
		}

		radius() {
			return Infinity
		}

		mode() {
			return 'lines' as const
		}

	}

}
