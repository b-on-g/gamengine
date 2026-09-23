namespace $ {

	export type $bog_gamengine_shape_gltf_doc = {
		meshes?: readonly { primitives?: readonly { attributes: Record< string, number >, indices?: number }[] }[]
		accessors?: readonly { bufferView?: number, byteOffset?: number, componentType: number, count: number, type: string }[]
		bufferViews?: readonly { buffer: number, byteOffset?: number, byteLength: number, byteStride?: number }[]
	}

	type $bog_gamengine_shape_gltf_arrays = {
		geometry: Float32Array
		normals: Float32Array
		skin: Float32Array
	}

	const magic = 0x46546C67
	const chunk_json = 0x4E4F534A
	const chunk_bin = 0x004E4942

	const dims: Record< string, number > = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }

	export class $bog_gamengine_shape_gltf extends $bog_gamengine_shape {

		@ $mol_mem
		data( next?: ArrayBuffer | null ) {
			return next ?? null
		}

		@ $mol_mem
		chunks() {
			const data = this.data()
			if( !data ) return $mol_fail( new Error( 'glTF has no data' ) )
			const view = new DataView( data )
			if( view.getUint32( 0, true ) !== magic ) return $mol_fail( new Error( 'glTF is not a GLB container' ) )
			let json = null as null | $bog_gamengine_shape_gltf_doc
			let bin = null as null | ArrayBuffer
			let at = 12
			while( at + 8 <= data.byteLength ) {
				const length = view.getUint32( at, true )
				const type = view.getUint32( at + 4, true )
				const body = data.slice( at + 8, at + 8 + length )
				if( type === chunk_json ) json = JSON.parse( new TextDecoder().decode( body ) )
				if( type === chunk_bin ) bin = body
				at += 8 + length
			}
			if( !json ) return $mol_fail( new Error( 'GLB has no JSON chunk' ) )
			return { json, bin }
		}

		@ $mol_mem
		json( next?: $bog_gamengine_shape_gltf_doc ) {
			return next ?? this.chunks().json
		}

		@ $mol_mem
		bin( next?: ArrayBuffer ) {
			return next ?? this.chunks().bin ?? $mol_fail( new Error( 'GLB has no BIN chunk' ) )
		}

		accessor( index: number ) {
			const doc = this.json()
			const accessor = doc.accessors?.[ index ] ?? $mol_fail( new Error( `glTF has no accessor ${ index }` ) )
			const dim = dims[ accessor.type ] ?? $mol_fail( new Error( `glTF accessor type ${ accessor.type } is not supported` ) )
			const out = new Float32Array( accessor.count * dim )
			if( accessor.bufferView === undefined ) return out
			const bview = doc.bufferViews?.[ accessor.bufferView ] ?? $mol_fail( new Error( `glTF has no bufferView ${ accessor.bufferView }` ) )
			const view = new DataView( this.bin(), ( bview.byteOffset ?? 0 ) + ( accessor.byteOffset ?? 0 ) )
			const unit = accessor.componentType === 5126 || accessor.componentType === 5125 ? 4 : accessor.componentType === 5123 ? 2 : 1
			const stride = bview.byteStride ?? unit * dim
			for( let i = 0; i < accessor.count; ++ i ) {
				for( let d = 0; d < dim; ++ d ) {
					const at = i * stride + d * unit
					switch( accessor.componentType ) {
						case 5126: out[ i * dim + d ] = view.getFloat32( at, true ); break
						case 5125: out[ i * dim + d ] = view.getUint32( at, true ); break
						case 5123: out[ i * dim + d ] = view.getUint16( at, true ); break
						case 5121: out[ i * dim + d ] = view.getUint8( at ); break
						case 5122: out[ i * dim + d ] = view.getInt16( at, true ); break
						case 5120: out[ i * dim + d ] = view.getInt8( at ); break
						default: return $mol_fail( new Error( `glTF component type ${ accessor.componentType } is not supported` ) )
					}
				}
			}
			return out
		}

		@ $mol_mem
		arrays(): $bog_gamengine_shape_gltf_arrays {
			const doc = this.json()
			const prim = doc.meshes?.[ 0 ]?.primitives?.[ 0 ] ?? $mol_fail( new Error( 'glTF has no mesh primitive' ) )
			const attrs = prim.attributes
			if( attrs.POSITION === undefined ) return $mol_fail( new Error( 'glTF primitive has no POSITION' ) )
			const pos = this.accessor( attrs.POSITION )
			const norm = attrs.NORMAL === undefined ? null : this.accessor( attrs.NORMAL )
			const tex = attrs.TEXCOORD_0 === undefined ? null : this.accessor( attrs.TEXCOORD_0 )
			const index = prim.indices === undefined ? null : this.accessor( prim.indices )
			const size = index ? index.length : pos.length / 3
			const geometry = new Float32Array( size * 3 )
			const normals = new Float32Array( size * 3 )
			const skin = new Float32Array( size * 2 )
			for( let i = 0; i < size; ++ i ) {
				const v = index ? index[ i ] : i
				for( let axis = 0; axis < 3; ++ axis ) {
					geometry[ i * 3 + axis ] = pos[ v * 3 + axis ]
					if( norm ) normals[ i * 3 + axis ] = norm[ v * 3 + axis ]
				}
				if( tex ) {
					skin[ i * 2 ] = tex[ v * 2 ]
					skin[ i * 2 + 1 ] = 1 - tex[ v * 2 + 1 ]
				}
			}
			if( !norm ) {
				for( let t = 0; t + 2 < size; t += 3 ) {
					const a = t * 3
					const b = a + 3
					const c = a + 6
					const ux = geometry[ b ] - geometry[ a ]
					const uy = geometry[ b + 1 ] - geometry[ a + 1 ]
					const uz = geometry[ b + 2 ] - geometry[ a + 2 ]
					const vx = geometry[ c ] - geometry[ a ]
					const vy = geometry[ c + 1 ] - geometry[ a + 1 ]
					const vz = geometry[ c + 2 ] - geometry[ a + 2 ]
					let nx = uy * vz - uz * vy
					let ny = uz * vx - ux * vz
					let nz = ux * vy - uy * vx
					const len = Math.hypot( nx, ny, nz ) || 1
					nx /= len
					ny /= len
					nz /= len
					for( let k = 0; k < 3; ++ k ) {
						normals[ a + k * 3 ] = nx
						normals[ a + k * 3 + 1 ] = ny
						normals[ a + k * 3 + 2 ] = nz
					}
				}
			}
			return { geometry, normals, skin }
		}

		geometry() {
			return this.arrays().geometry
		}

		normals() {
			return this.arrays().normals
		}

		skin() {
			return this.arrays().skin
		}

		mode() {
			return 'triangles' as const
		}

	}

}
