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

		'tint of bare node defaults to opaque white through props'() {
			const node = new $bog_gamengine_node
			$mol_assert_equal( [ ... node_test_prop( node, 'tint' ).get() as Float32Array ], [ 1, 1, 1, 1 ] )
			node_test_prop( node, 'tint' ).set([ 1, 0, 0, 0.5 ])
			$mol_assert_equal( [ ... node.tint() ], [ 1, 0, 0, 0.5 ] )
		},

	})
}
