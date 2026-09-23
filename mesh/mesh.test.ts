namespace $ {

	class $bog_gamengine_mesh_test_atlas extends $bog_gamengine_atlas {

		image( uri: string ) {
			return { data: ()=> ({ width: 64, height: 64 }) } as unknown as $mol_3d_image
		}

	}

	function mesh_test_atlas( uris: string[] ) {
		const atlas = new $bog_gamengine_mesh_test_atlas
		atlas.uris( uris )
		return atlas
	}

	function mesh_test_mesh( atlas: $bog_gamengine_atlas | null, frame: string ) {
		const mesh = new $bog_gamengine_mesh
		mesh.atlas( atlas )
		mesh.frame( frame )
		return mesh
	}

	$mol_test({

		'layer is taken from atlas by frame name'() {
			const atlas = mesh_test_atlas([ 'bog/gamengine/demo/atlas/wall.png', 'bog/gamengine/demo/atlas/floor.png' ])
			$mol_assert_equal( mesh_test_mesh( atlas, 'floor' ).layer(), 1 )
		},

		'layer without atlas is 0'() {
			$mol_assert_equal( mesh_test_mesh( null, 'floor' ).layer(), 0 )
		},

		'uv is whole layer'() {
			$mol_assert_equal( [ ... new $bog_gamengine_mesh().uv() ], [ 0, 0, 1, 1 ] )
		},

		'size scales trans in three axes'() {
			const mesh = new $bog_gamengine_mesh
			mesh.size( new Float32Array([ 2, 3, 4 ]) )
			const trans = mesh.trans()
			$mol_assert_equal( trans[ 0 ], 2 )
			$mol_assert_equal( trans[ 5 ], 3 )
			$mol_assert_equal( trans[ 10 ], 4 )
		},

		'default shape is box'() {
			$mol_assert_ok( new $bog_gamengine_mesh().shape() instanceof $bog_gamengine_shape_box )
		},

		'two meshes of different atlases give two batches'() {
			const first = mesh_test_atlas([ 'bog/gamengine/demo/atlas/wall.png' ])
			const second = mesh_test_atlas([ 'bog/gamengine/demo/atlas/floor.png' ])
			const batches = $bog_gamengine_batch_group(
				[ mesh_test_mesh( first, 'wall' ), mesh_test_mesh( second, 'floor' ) ],
				atlas => {
					const batch = new $bog_gamengine_batch
					batch.atlas( atlas )
					return batch
				},
			)
			$mol_assert_equal( batches.length, 2 )
			$mol_assert_equal( batches[ 0 ].atlas(), first )
			$mol_assert_equal( batches[ 1 ].atlas(), second )
		},

		'filled batch has layer and tint of mesh'() {
			const atlas = mesh_test_atlas([ 'bog/gamengine/demo/atlas/wall.png', 'bog/gamengine/demo/atlas/floor.png' ])
			const mesh = mesh_test_mesh( atlas, 'floor' )
			mesh.tint( new Float32Array([ 1, 0.5, 0.25, 1 ]) )
			const batch = new $bog_gamengine_batch
			batch.nodes([ mesh ])
			batch.fill()
			$mol_assert_equal( batch.layer[ 0 ], 1 )
			$mol_assert_equal( [ ... batch.tint.subarray( 0, 4 ) ], [ 1, 0.5, 0.25, 1 ] )
		},

		'set through props changes size'() {
			const mesh = new $bog_gamengine_mesh
			mesh.props().find( prop => prop.name === 'size' )!.set( new Float32Array([ 2, 3, 4 ]) )
			$mol_assert_equal( [ ... mesh.size() ], [ 2, 3, 4 ] )
		},

	})

}
