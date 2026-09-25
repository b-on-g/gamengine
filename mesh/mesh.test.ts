namespace $ {

	class $bog_gamengine_mesh_test_atlas extends $bog_gamengine_atlas {

		image( uri: string ) {
			return { data: ()=> ({ width: 64, height: 64 }) } as unknown as $mol_3d_image
		}

	}

	class $bog_gamengine_mesh_test_shape_loading extends $bog_gamengine_shape {
		geometry() {
			return $mol_fail( new Promise< void >( ()=> {} ) ) as unknown as Float32Array< ArrayBuffer >
		}
	}

	class $bog_gamengine_mesh_test_cam extends $bog_gamengine_cam {
		proj( aspect: number ) {
			return $mol_3d_mat4.perspective( Math.PI / 3, aspect, 0.1, 100 )
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
			const shader = new $bog_gamengine_shader_solid
			const parts = $bog_gamengine_batch_group(
				[ mesh_test_mesh( first, 'wall' ), mesh_test_mesh( second, 'floor' ) ],
				()=> shader,
				node => node.shape!(),
			)
			$mol_assert_equal( parts.length, 2 )
			$mol_assert_equal( parts[ 0 ].atlas, first )
			$mol_assert_equal( parts[ 1 ].atlas, second )
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

		'lods are empty by default and can be set'() {
			const mesh = new $bog_gamengine_mesh
			$mol_assert_equal( mesh.lods().length, 0 )
			const low = new $bog_gamengine_shape_quad
			mesh.lods([ { dist: 6, shape: low } ])
			$mol_assert_equal( mesh.lods()[ 0 ].shape, low )
		},

		'radius of a loading shape is infinite and batch fill with frustum keeps the mesh'() {
			const mesh = new $bog_gamengine_mesh
			mesh.shape( new $bog_gamengine_mesh_test_shape_loading )
			mesh.pos( new Float32Array([ 0, 0, 5 ]) )
			$mol_assert_equal( mesh.radius(), Infinity )
			const batch = new $bog_gamengine_batch
			batch.nodes([ mesh ])
			const cam = new $bog_gamengine_mesh_test_cam
			$mol_assert_equal( batch.fill( cam.frustum( 1, new Float32Array( 24 ) ) ), 1 )
		},

		'radius of box mesh is half diagonal of unit cube'() {
			$mol_assert_ok( Math.abs( new $bog_gamengine_mesh().radius() - Math.sqrt( 3 ) / 2 ) < 1e-6 )
		},

		'normal frame takes its layer from the data atlas, not from the albedo one'() {
			const albedo = new $bog_gamengine_atlas
			albedo.uris([ 'bog/gamengine/demo/atlas/wall.png', 'bog/gamengine/demo/atlas/floor.png' ])
			const maps = new $bog_gamengine_atlas
			maps.kind( 'data' )
			maps.uris([ 'bog/gamengine/demo/atlas/floor.png', 'bog/gamengine/demo/atlas/wall.png' ])
			albedo.data( maps )
			const mesh = new $bog_gamengine_mesh
			mesh.atlas( albedo )
			mesh.frame( 'wall' )
			mesh.normal_frame( 'wall' )
			$mol_assert_equal( mesh.layer(), 0 )
			$mol_assert_equal( mesh.normal_layer(), 1 )
		},

		'mesh without data atlas has no normal layer'() {
			const albedo = new $bog_gamengine_atlas
			albedo.uris([ 'bog/gamengine/demo/atlas/wall.png' ])
			const mesh = new $bog_gamengine_mesh
			mesh.atlas( albedo )
			mesh.normal_frame( 'wall' )
			$mol_assert_equal( mesh.normal_layer(), -1 )
		},

		'set through props changes size'() {
			const mesh = new $bog_gamengine_mesh
			mesh.props().find( prop => prop.name === 'size' )!.set( new Float32Array([ 2, 3, 4 ]) )
			$mol_assert_equal( [ ... mesh.size() ], [ 2, 3, 4 ] )
		},

		'sphere of the culler holds every corner of the box in every state'() {
			for( const over of $bog_gamengine_node_reach_states ) {
				const node = new $bog_gamengine_mesh
				if( over.size ) node.size( new Float32Array( over.size.slice( 0, 3 ) ) )
				if( over.scale ) node.scale( new Float32Array( over.scale ) )
				if( over.rot ) node.rot( new Float32Array( over.rot ) )
				const sphere = node.radius() * $bog_gamengine_batch_scale_max( node.world() )
				$mol_assert_ok( sphere + 1e-6 >= $bog_gamengine_node_reach( node ) )
			}
		},

	})

}
