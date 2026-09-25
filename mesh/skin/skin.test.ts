namespace $ {
	$mol_test({

		'skinned mesh takes its shape from the skin'( $ ) {
			const shape = $bog_gamengine_shape_gltf.make({ $, skeleton: ()=> null, geometry: ()=> new Float32Array( 9 ) })
			const skin = new $bog_gamengine_skin
			skin.shape( shape )
			const mesh = new $bog_gamengine_mesh_skin
			mesh.skin( skin )
			$mol_assert_equal( mesh.shape(), shape )
		},

		'every skinned mesh gets its own shader, so it gets its own batch'( $ ) {
			const one = new $bog_gamengine_mesh_skin
			const two = new $bog_gamengine_mesh_skin
			$mol_assert_ok( one.shader() instanceof $bog_gamengine_shader_skin )
			$mol_assert_not( one.shader() === two.shader() )
		},

		'batch of one skinned node gives its bones'( $ ) {
			const skin = new $bog_gamengine_skin
			const mesh = new $bog_gamengine_mesh_skin
			mesh.skin( skin )
			$mol_assert_equal( $bog_gamengine_skin_bones({ nodes: ()=> [ mesh ] }), skin.pose() )
			$mol_assert_equal( $bog_gamengine_skin_bones({ nodes: ()=> [ mesh, mesh ] }), null )
			$mol_assert_equal( $bog_gamengine_skin_bones({ nodes: ()=> [ new $bog_gamengine_mesh ] }), null )
		},

		'step moves the skin time'( $ ) {
			const clips = new Map< string, $bog_gamengine_shape_gltf_clip >([
				[ 'go', { name: 'go', duration: 2, channels: [] } ],
			])
			const shape = $bog_gamengine_shape_gltf.make({ $, skeleton: ()=> null, clips: ()=> clips })
			const skin = new $bog_gamengine_skin
			skin.shape( shape )
			skin.clip( 'go' )
			const mesh = new $bog_gamengine_mesh_skin
			mesh.skin( skin )
			mesh.step( 0.5 )
			$mol_assert_equal( skin.time(), 0.5 )
		},

		'sphere of the culler holds every corner of the box in every state'() {
			for( const over of $bog_gamengine_node_reach_states ) {
				const node = new $bog_gamengine_mesh_skin
				if( over.size ) node.size( new Float32Array( over.size.slice( 0, 3 ) ) )
				if( over.scale ) node.scale( new Float32Array( over.scale ) )
				if( over.rot ) node.rot( new Float32Array( over.rot ) )
				const sphere = node.radius() * $bog_gamengine_batch_scale_max( node.world() )
				$mol_assert_ok( sphere + 1e-6 >= $bog_gamengine_node_reach( node ) )
			}
		},

	})
}
