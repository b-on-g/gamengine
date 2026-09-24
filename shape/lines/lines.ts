namespace $ {

	export class $bog_gamengine_shape_lines extends $bog_gamengine_shape {

		@ $mol_mem
		points( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array( 0 )
		}

		@ $mol_mem
		count( next?: number ) {
			return next ?? this.points().length / 6
		}

		geometry() {
			return this.points() as Float32Array< ArrayBuffer >
		}

		size() {
			const all = this.points().length / 3
			const drawn = this.count() * 2
			return drawn < all ? drawn : all
		}

		@ $mol_mem
		normals() {
			return new Float32Array( this.points().length )
		}

		@ $mol_mem
		skin() {
			return new Float32Array( this.points().length / 3 * 2 )
		}

		radius() {
			return Infinity
		}

		mode() {
			return 'lines' as const
		}

	}

}
