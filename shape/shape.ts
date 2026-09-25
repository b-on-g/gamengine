namespace $ {

	export class $bog_gamengine_shape extends $mol_3d_shape {

		@ $mol_memo.method
		normals() {
			const size = this.size()
			const normals = new Float32Array( size * 3 )
			for( let i = 0; i < size; ++ i ) normals[ i * 3 + 2 ] = 1
			return normals
		}

		@ $mol_memo.method
		box() {
			const geometry = this.geometry()
			const box = new Float32Array( 6 )
			for( let k = 0; k < 3; ++ k ) {
				box[ k ] = Infinity
				box[ k + 3 ] = - Infinity
			}
			for( let i = 0; i + 2 < geometry.length; i += 3 ) {
				for( let k = 0; k < 3; ++ k ) {
					const value = geometry[ i + k ]
					if( value < box[ k ] ) box[ k ] = value
					if( value > box[ k + 3 ] ) box[ k + 3 ] = value
				}
			}
			return box
		}

		@ $mol_memo.method
		radius() {
			const geometry = this.geometry()
			let max = 0
			for( let i = 0; i < geometry.length; i += 3 ) {
				const len = geometry[ i ] * geometry[ i ] + geometry[ i + 1 ] * geometry[ i + 1 ] + geometry[ i + 2 ] * geometry[ i + 2 ]
				if( len > max ) max = len
			}
			return Math.sqrt( max )
		}

		count() {
			return this.size()
		}

		mode(): 'strip' | 'triangles' | 'lines' {
			return 'strip'
		}

	}

}
