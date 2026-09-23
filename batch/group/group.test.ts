namespace $ {

	function group_test_atlas( uris: readonly string[] ) {
		const atlas = new $bog_gamengine_atlas
		atlas.uris( uris )
		return atlas
	}

	function group_test_sprite( atlas: $bog_gamengine_atlas | null ) {
		const sprite = new $bog_gamengine_sprite
		sprite.atlas( atlas )
		return sprite
	}

	function group_test_mesh( atlas: $bog_gamengine_atlas | null, shape?: $bog_gamengine_shape ) {
		const mesh = new $bog_gamengine_mesh
		mesh.atlas( atlas )
		if( shape ) mesh.shape( shape )
		return mesh
	}

	const sprite_shader = new $bog_gamengine_shader_sprite
	const solid_shader = new $bog_gamengine_shader_solid
	const quad = new $bog_gamengine_shape_quad

	function group_test_parts( nodes: readonly $bog_gamengine_batch_group_node[] ) {
		return $bog_gamengine_batch_group(
			nodes,
			node => node.shader?.() ?? ( typeof node.normal_layer === 'function' ? solid_shader : sprite_shader ),
			node => typeof node.shape === 'function' ? node.shape() : quad,
		)
	}

	$mol_test({

		'two sprites of one atlas and a mesh with a box give two groups'() {
			const atlas = group_test_atlas([ 'bog/gamengine/demo/atlas/hero.png' ])
			const first = group_test_sprite( atlas )
			const second = group_test_sprite( atlas )
			const mesh = group_test_mesh( atlas )
			const parts = group_test_parts([ first, second, mesh ])
			$mol_assert_equal( parts.length, 2 )
			$mol_assert_equal( parts[ 0 ].nodes, [ first, second ] )
			$mol_assert_equal( parts[ 1 ].nodes, [ mesh ] )
			$mol_assert_equal( parts[ 0 ].atlas, atlas )
			$mol_assert_equal( parts[ 1 ].atlas, atlas )
		},

		'two meshes of different shapes give two groups'() {
			const atlas = group_test_atlas([ 'bog/gamengine/demo/atlas/wall.png' ])
			const box = group_test_mesh( atlas, new $bog_gamengine_shape_box )
			const plane = group_test_mesh( atlas, new $bog_gamengine_shape_plane )
			const parts = group_test_parts([ box, plane ])
			$mol_assert_equal( parts.length, 2 )
			$mol_assert_equal( parts[ 0 ].shape, box.shape() )
			$mol_assert_equal( parts[ 1 ].shape, plane.shape() )
		},

		'two meshes of different atlases give two groups'() {
			const first = group_test_atlas([ 'bog/gamengine/demo/atlas/wall.png' ])
			const second = group_test_atlas([ 'bog/gamengine/demo/atlas/floor.png' ])
			const shape = new $bog_gamengine_shape_box
			const parts = group_test_parts([ group_test_mesh( first, shape ), group_test_mesh( second, shape ) ])
			$mol_assert_equal( parts.length, 2 )
			$mol_assert_equal( parts[ 0 ].atlas, first )
			$mol_assert_equal( parts[ 1 ].atlas, second )
		},

		'node with its own shader goes to its own group'() {
			const atlas = group_test_atlas([ 'bog/gamengine/demo/atlas/hero.png' ])
			const plain = group_test_sprite( atlas )
			const own = group_test_sprite( atlas )
			own.shader( new $bog_gamengine_shader_flat )
			const parts = group_test_parts([ plain, own ])
			$mol_assert_equal( parts.length, 2 )
			$mol_assert_equal( parts[ 0 ].nodes, [ plain ] )
			$mol_assert_equal( parts[ 1 ].nodes, [ own ] )
			$mol_assert_equal( parts[ 1 ].shader, own.shader() )
		},

		'group key is the same for the same triple and differs otherwise'() {
			const atlas = group_test_atlas([ 'bog/gamengine/demo/atlas/hero.png' ])
			const shape = new $bog_gamengine_shape_box
			const parts = group_test_parts([ group_test_mesh( atlas, shape ), group_test_mesh( atlas, shape ) ])
			$mol_assert_equal( parts.length, 1 )
			const again = group_test_parts([ group_test_mesh( atlas, shape ) ])
			$mol_assert_equal( parts[ 0 ].key, again[ 0 ].key )
		},

		'id of null is zero and id of an object is stable'() {
			const atlas = group_test_atlas([ 'bog/gamengine/demo/atlas/hero.png' ])
			$mol_assert_equal( $bog_gamengine_batch_group_id( null ), '0' )
			$mol_assert_equal( $bog_gamengine_batch_group_id( atlas ), $bog_gamengine_batch_group_id( atlas ) )
			$mol_assert_not( $bog_gamengine_batch_group_id( atlas ) === $bog_gamengine_batch_group_id( new $bog_gamengine_atlas ) )
		},

	})

}
