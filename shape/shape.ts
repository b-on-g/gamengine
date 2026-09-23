namespace $ {

	export class $bog_gamengine_shape extends $mol_3d_shape {

		@ $mol_memo.method
		normals() {
			const size = this.size()
			const normals = new Float32Array( size * 3 )
			for( let i = 0; i < size; ++ i ) normals[ i * 3 + 2 ] = 1
			return normals
		}

		count() {
			return this.size()
		}

		mode(): 'strip' | 'triangles' {
			return 'strip'
		}

	}

}
