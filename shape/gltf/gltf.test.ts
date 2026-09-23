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

		'glb without position fails with message'( $ ) {
			const shape = $bog_gamengine_shape_gltf.make({ $, json: ()=> ({ meshes: [ { primitives: [ { attributes: {} } ] } ] }) })
			$mol_assert_fail( ()=> shape.geometry(), 'glTF primitive has no POSITION' )
		},

	})

}
