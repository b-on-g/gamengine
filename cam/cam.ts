namespace $ {

	export function $bog_gamengine_cam_frustum_sphere( frustum: Float32Array, x: number, y: number, z: number, radius: number ) {
		for( let side = 0; side < 6; ++ side ) {
			const at = side * 4
			if( frustum[ at ] * x + frustum[ at + 1 ] * y + frustum[ at + 2 ] * z + frustum[ at + 3 ] < - radius ) return false
		}
		return true
	}

	export function $bog_gamengine_cam_frustum_aabb( frustum: Float32Array, aabb: Float32Array, at: number ) {
		for( let side = 0; side < 6; ++ side ) {
			const p = side * 4
			const a = frustum[ p ]
			const b = frustum[ p + 1 ]
			const c = frustum[ p + 2 ]
			const x = a > 0 ? aabb[ at + 3 ] : aabb[ at ]
			const y = b > 0 ? aabb[ at + 4 ] : aabb[ at + 1 ]
			const z = c > 0 ? aabb[ at + 5 ] : aabb[ at + 2 ]
			if( a * x + b * y + c * z + frustum[ p + 3 ] < 0 ) return false
		}
		return true
	}

	export class $bog_gamengine_cam extends $bog_gamengine_node {

		@ $mol_mem
		aspect( next?: number ) {
			return next ?? this.scene()?.aspect() ?? 1
		}

		@ $mol_mem
		view() {
			return this.world().inversed()
		}

		proj( aspect: number ): $mol_3d_mat4 {
			throw new Error( 'not implemented' )
		}

		clip = new Float32Array( 16 )

		frustum( aspect: number, out: Float32Array ) {
			const proj = this.proj( aspect )
			const view = this.view()
			const clip = this.clip
			for( let col = 0; col < 4; ++ col ) {
				for( let row = 0; row < 4; ++ row ) {
					clip[ col * 4 + row ] =
						proj[ row ] * view[ col * 4 ] +
						proj[ 4 + row ] * view[ col * 4 + 1 ] +
						proj[ 8 + row ] * view[ col * 4 + 2 ] +
						proj[ 12 + row ] * view[ col * 4 + 3 ]
				}
			}
			for( let side = 0; side < 6; ++ side ) {
				const row = side >> 1
				const sign = side & 1 ? -1 : 1
				const a = clip[ 3 ] + sign * clip[ row ]
				const b = clip[ 7 ] + sign * clip[ 4 + row ]
				const c = clip[ 11 ] + sign * clip[ 8 + row ]
				const d = clip[ 15 ] + sign * clip[ 12 + row ]
				const len = Math.sqrt( a * a + b * b + c * c ) || 1
				out[ side * 4 ] = a / len
				out[ side * 4 + 1 ] = b / len
				out[ side * 4 + 2 ] = c / len
				out[ side * 4 + 3 ] = d / len
			}
			return out
		}

	}

}
