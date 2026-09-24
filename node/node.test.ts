namespace $ {

	class $bog_gamengine_node_test_hero extends $bog_gamengine_node {}

	function node_test_prop( node: $bog_gamengine_node, name: string ) {
		return node.props().find( prop => prop.name === name )!
	}

	$mol_test({

		'child shifted by 1 under parent rotated by half pi lands at (0, 1, 0)'() {

			const parent = new $bog_gamengine_node
			parent.rot( new Float32Array([ 0, 0, Math.PI / 2 ]) )

			const child = new $bog_gamengine_node
			child.parent( parent )
			child.pos( new Float32Array([ 1, 0, 0 ]) )

			const world = child.world()
			$mol_assert_ok( Math.abs( world[ 12 ] - 0 ) < 1e-6 )
			$mol_assert_ok( Math.abs( world[ 13 ] - 1 ) < 1e-6 )
			$mol_assert_ok( Math.abs( world[ 14 ] - 0 ) < 1e-6 )

		},

		'title without name is class name without prefix'() {
			$mol_assert_equal( new $bog_gamengine_node_test_hero().title(), 'node_test_hero' )
		},

		'title with name is name'() {
			const node = new $bog_gamengine_node_test_hero
			node.name( 'Hero' )
			$mol_assert_equal( node.title(), 'Hero' )
		},

		'base props are pos, rot, scale and tint with kinds'() {
			const props = new $bog_gamengine_node().props()
			$mol_assert_equal( props.map( prop => prop.name ), [ 'pos', 'rot', 'scale', 'tint' ] )
			$mol_assert_equal( props.map( prop => prop.kind ), [ 'vec3', 'euler', 'vec3', 'vec4' ] )
		},

		'set through props changes pos'() {
			const node = new $bog_gamengine_node
			node_test_prop( node, 'pos' ).set( new Float32Array([ 1, 2, 3 ]) )
			$mol_assert_equal( [ ... node.pos() ], [ 1, 2, 3 ] )
		},

		'pos from plain array is typed array with same numbers'() {
			const node = new $bog_gamengine_node
			node.pos([ 1, 2, 3 ])
			$mol_assert_ok( node.pos() instanceof Float32Array )
			$mol_assert_equal( [ ... node.pos() ], [ 1, 2, 3 ] )
		},

		'pos from typed array keeps the same reference'() {
			const node = new $bog_gamengine_node
			const typed = new Float32Array([ 1, 2, 3 ])
			node.pos( typed )
			$mol_assert_equal( node.pos(), typed )
		},

		'kids setter stores nodes'() {
			const a = new $bog_gamengine_node
			const b = new $bog_gamengine_node
			const parent = new $bog_gamengine_node
			parent.kids([ a, b ])
			$mol_assert_equal( parent.kids(), [ a, b ] )
		},

		'kids setter sets parent of kids'() {
			const a = new $bog_gamengine_node
			const parent = new $bog_gamengine_node
			parent.kids([ a ])
			$mol_assert_equal( a.parent(), parent )
		},

		'kids setter keeps parent already set'() {
			const a = new $bog_gamengine_node
			const own = new $bog_gamengine_node
			a.parent( own )
			new $bog_gamengine_node().kids([ a ])
			$mol_assert_equal( a.parent(), own )
		},

		'root of a bare node is itself and scene is null'() {
			const node = new $bog_gamengine_node
			$mol_assert_equal( node.root(), node )
			$mol_assert_equal( node.scene(), null )
			$mol_assert_equal( node.input(), null )
			$mol_assert_equal( node.clock(), null )
		},

		'billboard normal looks at the camera turned by half pi'() {

			const scene = new $bog_gamengine_scene
			const cam = new $bog_gamengine_cam
			cam.rot( new Float32Array([ 0, Math.PI / 2, 0 ]) )
			scene.cam( cam )

			const node = new $bog_gamengine_node
			node.billboard( true )
			scene.kids([ node ])

			const trans = node.trans()
			const to_cam = [ - Math.sin( Math.PI / 2 ), 0, - Math.cos( Math.PI / 2 ) ]
			const normal = [ trans[ 8 ], trans[ 9 ], trans[ 10 ] ]
			const dot = - ( normal[ 0 ] * to_cam[ 0 ] + normal[ 1 ] * to_cam[ 1 ] + normal[ 2 ] * to_cam[ 2 ] )
			$mol_assert_ok( Math.abs( dot - 1 ) < 1e-6 )

		},

		'node without billboard keeps its own yaw'() {
			const scene = new $bog_gamengine_scene
			const cam = new $bog_gamengine_cam
			cam.rot( new Float32Array([ 0, Math.PI / 2, 0 ]) )
			scene.cam( cam )
			const node = new $bog_gamengine_node
			scene.kids([ node ])
			$mol_assert_ok( Math.abs( node.trans()[ 10 ] - 1 ) < 1e-6 )
		},

		'tint of bare node defaults to opaque white through props'() {
			const node = new $bog_gamengine_node
			$mol_assert_equal( [ ... node_test_prop( node, 'tint' ).get() as Float32Array ], [ 1, 1, 1, 1 ] )
			node_test_prop( node, 'tint' ).set([ 1, 0, 0, 0.5 ])
			$mol_assert_equal( [ ... node.tint() ], [ 1, 0, 0, 0.5 ] )
		},

	})
}
