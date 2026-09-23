namespace $ {

	function $bog_gamengine_shape_gltf_test_glb( normals: boolean, indices: boolean ) {
		const pos = [ 0, 0, 0, 1, 0, 0, 0, 1, 0 ]
		const norm = [ 0, 0, 1, 0, 0, 1, 0, 0, 1 ]
		const tex = [ 0, 0, 1, 0, 0, 1 ]
		const floats = [ ... pos, ... ( normals ? norm : [] ), ... tex ]
		const bin_size = floats.length * 4 + ( indices ? 8 : 0 )
		const bin = new ArrayBuffer( bin_size )
		const view = new DataView( bin )
		for( let i = 0; i < floats.length; ++ i ) view.setFloat32( i * 4, floats[ i ], true )
		if( indices ) for( let i = 0; i < 3; ++ i ) view.setUint16( floats.length * 4 + i * 2, i, true )
		const views = [] as object[]
		const accessors = [] as object[]
		const attributes = {} as Record< string, number >
		let offset = 0
		const add = ( name: string, count: number, type: string, size: number, componentType: number, unit: number )=> {
			views.push({ buffer: 0, byteOffset: offset, byteLength: count * size * unit })
			accessors.push({ bufferView: views.length - 1, componentType, count, type })
			attributes[ name ] = accessors.length - 1
			offset += count * size * unit
		}
		add( 'POSITION', 3, 'VEC3', 3, 5126, 4 )
		if( normals ) add( 'NORMAL', 3, 'VEC3', 3, 5126, 4 )
		add( 'TEXCOORD_0', 3, 'VEC2', 2, 5126, 4 )
		if( indices ) add( 'indices', 3, 'SCALAR', 1, 5123, 2 )
		const primitive: Record< string, unknown > = { attributes: { ... attributes } }
		if( indices ) {
			primitive.indices = attributes.indices
			delete ( primitive.attributes as Record< string, number > ).indices
		}
		const doc = { asset: { version: '2.0' }, meshes: [ { primitives: [ primitive ] } ], accessors, bufferViews: views, buffers: [ { byteLength: bin_size } ] }
		return $bog_gamengine_shape_gltf_test_wrap( doc, bin )
	}

	function $bog_gamengine_shape_gltf_test_wrap( doc: unknown, bin: ArrayBuffer ) {
		const bin_size = bin.byteLength
		let json = new TextEncoder().encode( JSON.stringify( doc ) )
		while( json.length % 4 ) json = new Uint8Array([ ... json, 0x20 ])
		const total = 12 + 8 + json.length + 8 + bin_size
		const glb = new ArrayBuffer( total )
		const out = new DataView( glb )
		out.setUint32( 0, 0x46546C67, true )
		out.setUint32( 4, 2, true )
		out.setUint32( 8, total, true )
		out.setUint32( 12, json.length, true )
		out.setUint32( 16, 0x4E4F534A, true )
		new Uint8Array( glb, 20, json.length ).set( json )
		out.setUint32( 20 + json.length, bin_size, true )
		out.setUint32( 24 + json.length, 0x004E4942, true )
		new Uint8Array( glb, 28 + json.length, bin_size ).set( new Uint8Array( bin ) )
		return glb
	}

	type $bog_gamengine_shape_gltf_test_part = {
		data: readonly number[]
		kind: 'f32' | 'u8' | 'u16'
		type: string
	}

	function $bog_gamengine_shape_gltf_test_skin_glb() {

		const parts: readonly $bog_gamengine_shape_gltf_test_part[] = [
			{ data: [ 0, 0, 0, 1, 0, 0, 0, 1, 0 ], kind: 'f32', type: 'VEC3' },
			{ data: [ 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0 ], kind: 'u8', type: 'VEC4' },
			{ data: [ 1, 0, 0, 0, 0.5, 0.5, 0, 0, 0.25, 0.75, 0, 0 ], kind: 'f32', type: 'VEC4' },
			{ data: [ 2, 1, 0 ], kind: 'u16', type: 'SCALAR' },
			{ data: [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -1, 0, 1 ], kind: 'f32', type: 'MAT4' },
			{ data: [ 0, 0.75 ], kind: 'f32', type: 'SCALAR' },
			{ data: [ 0, 0, 0, 1, 0, 0, 1, 0 ], kind: 'f32', type: 'VEC4' },
		]

		const dims: Record< string, number > = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 }
		const units = { f32: 4, u8: 1, u16: 2 }
		const codes = { f32: 5126, u8: 5121, u16: 5123 }
		const align = ( size: number )=> size + ( 4 - size % 4 ) % 4

		let bin_size = 0
		for( const part of parts ) bin_size += align( part.data.length * units[ part.kind ] )
		const bin = new ArrayBuffer( bin_size )
		const view = new DataView( bin )
		const views = [] as object[]
		const accessors = [] as object[]
		let at = 0
		for( const part of parts ) {
			const unit = units[ part.kind ]
			for( let i = 0; i < part.data.length; ++ i ) {
				const to = at + i * unit
				if( part.kind === 'f32' ) view.setFloat32( to, part.data[ i ], true )
				else if( part.kind === 'u16' ) view.setUint16( to, part.data[ i ], true )
				else view.setUint8( to, part.data[ i ] )
			}
			views.push({ buffer: 0, byteOffset: at, byteLength: part.data.length * unit })
			accessors.push({
				bufferView: views.length - 1,
				componentType: codes[ part.kind ],
				count: part.data.length / dims[ part.type ],
				type: part.type,
			})
			at += align( part.data.length * unit )
		}

		const doc = {
			asset: { version: '2.0' },
			nodes: [
				{ name: 'root', translation: [ 0, 0, 0 ], rotation: [ 0, 0, 0, 1 ], scale: [ 1, 1, 1 ], children: [ 1 ] },
				{ name: 'tip', translation: [ 0, 1, 0 ], rotation: [ 0, 0, 0, 1 ], scale: [ 1, 1, 1 ] },
				{ name: 'arm', mesh: 0, skin: 0 },
			],
			meshes: [ { primitives: [ { attributes: { POSITION: 0, JOINTS_0: 1, WEIGHTS_0: 2 }, indices: 3 } ] } ],
			skins: [ { joints: [ 0, 1 ], inverseBindMatrices: 4 } ],
			animations: [
				{
					name: 'wave',
					channels: [ { sampler: 0, target: { node: 1, path: 'rotation' } } ],
					samplers: [ { input: 5, output: 6, interpolation: 'LINEAR' } ],
				},
				{
					name: 'hold',
					channels: [ { sampler: 0, target: { node: 1, path: 'rotation' } } ],
					samplers: [ { input: 5, output: 6, interpolation: 'STEP' } ],
				},
			],
			accessors,
			bufferViews: views,
			buffers: [ { byteLength: bin_size } ],
		}

		return $bog_gamengine_shape_gltf_test_wrap( doc, bin )
	}

	$mol_test({

		'glb triangle gives positions, normals and flipped uv'( $ ) {
			const shape = $bog_gamengine_shape_gltf.make({ $, data: ()=> $bog_gamengine_shape_gltf_test_glb( true, true ) })
			$mol_assert_equal( shape.size(), 3 )
			$mol_assert_equal( shape.mode(), 'triangles' )
			$mol_assert_equal( [ ... shape.geometry() ], [ 0, 0, 0, 1, 0, 0, 0, 1, 0 ] )
			$mol_assert_equal( [ ... shape.normals() ], [ 0, 0, 1, 0, 0, 1, 0, 0, 1 ] )
			$mol_assert_equal( [ ... shape.skin() ], [ 0, 1, 1, 1, 0, 0 ] )
		},

		'glb without normals gets flat normal from ccw triangle'( $ ) {
			const shape = $bog_gamengine_shape_gltf.make({ $, data: ()=> $bog_gamengine_shape_gltf_test_glb( false, true ) })
			$mol_assert_equal( [ ... shape.normals() ], [ 0, 0, 1, 0, 0, 1, 0, 0, 1 ] )
		},

		'glb without indices takes vertices in order'( $ ) {
			const shape = $bog_gamengine_shape_gltf.make({ $, data: ()=> $bog_gamengine_shape_gltf_test_glb( true, false ) })
			$mol_assert_equal( shape.size(), 3 )
			$mol_assert_equal( [ ... shape.geometry() ], [ 0, 0, 0, 1, 0, 0, 0, 1, 0 ] )
		},

		'glb skin unrolls joints and weights by index'( $ ) {
			const shape = $bog_gamengine_shape_gltf.make({ $, data: ()=> $bog_gamengine_shape_gltf_test_skin_glb() })
			$mol_assert_equal( shape.size(), 3 )
			$mol_assert_equal( [ ... shape.joints() ], [ 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0 ] )
			$mol_assert_equal( [ ... shape.weights() ], [ 0.25, 0.75, 0, 0, 0.5, 0.5, 0, 0, 1, 0, 0, 0 ] )
		},

		'glb skeleton keeps parents, base pose and inverse binds'( $ ) {
			const shape = $bog_gamengine_shape_gltf.make({ $, data: ()=> $bog_gamengine_shape_gltf_test_skin_glb() })
			const skeleton = shape.skeleton()!
			$mol_assert_equal( skeleton.count, 2 )
			$mol_assert_equal( [ ... skeleton.names ], [ 'root', 'tip' ] )
			$mol_assert_equal( [ ... skeleton.parents ], [ -1, 0 ] )
			$mol_assert_equal( [ ... skeleton.order ], [ 0, 1 ] )
			$mol_assert_equal( [ ... skeleton.base.subarray( 10, 20 ) ], [ 0, 1, 0, 0, 0, 0, 1, 1, 1, 1 ] )
			$mol_assert_equal( skeleton.binds[ 16 + 13 ], -1 )
		},

		'glb clip with two keys takes duration from the last key'( $ ) {
			const shape = $bog_gamengine_shape_gltf.make({ $, data: ()=> $bog_gamengine_shape_gltf_test_skin_glb() })
			const clip = shape.clips().get( 'wave' )!
			$mol_assert_equal( clip.duration, 0.75 )
			$mol_assert_equal( clip.channels.length, 1 )
			$mol_assert_equal( clip.channels[ 0 ].joint, 1 )
			$mol_assert_equal( clip.channels[ 0 ].path, 'rotation' )
		},

		'glb marks a step sampler as step and a linear one as not'( $ ) {
			const shape = $bog_gamengine_shape_gltf.make({ $, data: ()=> $bog_gamengine_shape_gltf_test_skin_glb() })
			$mol_assert_equal( shape.clips().get( 'hold' )!.channels[ 0 ].step, true )
			$mol_assert_equal( shape.clips().get( 'wave' )!.channels[ 0 ].step, false )
		},

		'glb cubic spline animation fails with message'( $ ) {
			const shape = $bog_gamengine_shape_gltf.make({ $, json: ()=> ({
				nodes: [ { name: 'root' } ],
				skins: [ { joints: [ 0 ] } ],
				animations: [ {
					name: 'jump',
					channels: [ { sampler: 0, target: { node: 0, path: 'rotation' } } ],
					samplers: [ { input: 0, output: 1, interpolation: 'CUBICSPLINE' } ],
				} ],
			}) })
			$mol_assert_fail( ()=> shape.clips(), 'glTF animation interpolation CUBICSPLINE is not supported' )
		},

		'glb without skin gives no skeleton and no clips'( $ ) {
			const shape = $bog_gamengine_shape_gltf.make({ $, data: ()=> $bog_gamengine_shape_gltf_test_glb( true, true ) })
			$mol_assert_equal( shape.skeleton(), null )
			$mol_assert_equal( shape.clips().size, 0 )
			$mol_assert_equal( shape.joints().length, 0 )
		},

		'glb without position fails with message'( $ ) {
			const shape = $bog_gamengine_shape_gltf.make({ $, json: ()=> ({ meshes: [ { primitives: [ { attributes: {} } ] } ] }) })
			$mol_assert_fail( ()=> shape.geometry(), 'glTF primitive has no POSITION' )
		},

	})

}
