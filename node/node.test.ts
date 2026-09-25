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

		'base props name their kinds'() {
			const props = new $bog_gamengine_node().props()
			const kind = ( name: string )=> props.find( prop => prop.name === name )?.kind ?? 'нет такого'
			$mol_assert_equal( kind( 'pos' ), 'vec3' )
			$mol_assert_equal( kind( 'rot' ), 'euler' )
			$mol_assert_equal( kind( 'scale' ), 'vec3' )
			$mol_assert_equal( kind( 'tint' ), 'vec4' )
			$mol_assert_equal( kind( 'role' ), 'text' )
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
			node.billboard( 'cylinder' )
			scene.kids([ node ])

			const trans = node.trans()
			const to_cam = [ - Math.sin( Math.PI / 2 ), 0, - Math.cos( Math.PI / 2 ) ]
			const normal = [ trans[ 8 ], trans[ 9 ], trans[ 10 ] ]
			const dot = - ( normal[ 0 ] * to_cam[ 0 ] + normal[ 1 ] * to_cam[ 1 ] + normal[ 2 ] * to_cam[ 2 ] )
			$mol_assert_ok( Math.abs( dot - 1 ) < 1e-6 )

		},

		'cylinder stands upright under a tipped camera, sphere leans with it'() {
			const make = ( kind: $bog_gamengine_billboard, rot: readonly number[] )=> {
				const scene = new $bog_gamengine_scene
				const cam = new $bog_gamengine_cam
				cam.rot( new Float32Array( rot ) )
				scene.cam( cam )
				const node = new $bog_gamengine_node
				node.billboard( kind )
				scene.kids([ node ])
				const up = new Float32Array( 9 )
				if( kind === 'sphere' ) {
					$bog_gamengine_vec_mat4_basis( up, cam.world(), 3 )
					return [ up[ 3 ], up[ 4 ], up[ 5 ] ].map( v => Math.round( v * 1e4 ) / 1e4 )
				}
				const world = node.world()
				return [ world[ 4 ], world[ 5 ], world[ 6 ] ].map( v => Math.round( v * 1e4 ) / 1e4 )
			}
			const level = [ 0, 0, 0 ]
			$mol_assert_equal( make( 'cylinder', level ), make( 'sphere', level ) )
			for( const rot of [ [ - Math.PI / 4, 0, 0 ], [ 0, 0, Math.PI / 6 ] ] ) {
				$mol_assert_equal( make( 'cylinder', rot ), [ 0, 1, 0 ] )
				$mol_assert_unique( make( 'cylinder', rot ), make( 'sphere', rot ) )
			}
		},

		'sphere does not order the cylindrical turn, so the camera leaves its trans alone'() {
			const scene = new $bog_gamengine_scene
			const cam = new $bog_gamengine_cam
			cam.rot( new Float32Array([ 0, Math.PI / 2, 0 ]) )
			scene.cam( cam )
			const spun = new $bog_gamengine_node
			spun.billboard( 'sphere' )
			const plain = new $bog_gamengine_node
			scene.kids([ spun, plain ])
			$mol_assert_equal( [ ... spun.trans() ], [ ... plain.trans() ] )
			const turned = new $bog_gamengine_node
			turned.billboard( 'cylinder' )
			scene.kids([ spun, plain, turned ])
			$mol_assert_unique( [ ... turned.trans() ], [ ... plain.trans() ] )
		},

		'cylinder keeps its own pitch and roll, sphere keeps none of its rotation'() {
			const scene = new $bog_gamengine_scene
			const cam = new $bog_gamengine_cam
			cam.rot( new Float32Array([ 0, Math.PI / 2, 0 ]) )
			scene.cam( cam )
			const node = new $bog_gamengine_node
			node.billboard( 'cylinder' )
			node.rot( new Float32Array([ 0, 0, Math.PI / 2 ]) )
			const plain = new $bog_gamengine_node
			plain.billboard( 'cylinder' )
			scene.kids([ node, plain ])
			const up = ( one: $bog_gamengine_node )=> {
				const trans = one.trans()
				return [ trans[ 4 ], trans[ 5 ], trans[ 6 ] ].map( v => Math.round( v * 1e4 ) / 1e4 )
			}
			$mol_assert_equal( up( plain ), [ 0, 1, 0 ] )
			$mol_assert_unique( up( node ), up( plain ) )
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

		'attached part takes the node as its owner'() {
			const node = new $bog_gamengine_node
			const part = new $bog_gamengine_combat
			$mol_assert_equal( part.owner(), null )
			node.parts([ part ])
			$mol_assert_equal( part.owner(), node )
			$mol_assert_equal( node.parts().length, 1 )
		},

		'own owner of a part is not taken away'() {
			const first = new $bog_gamengine_node
			const second = new $bog_gamengine_node
			const part = new $bog_gamengine_combat
			part.owner( first )
			second.parts([ part ])
			$mol_assert_equal( part.owner(), first )
		},

		'part keeps its own props and the node does not borrow them'() {
			const node = new $bog_gamengine_node
			const part = new $bog_gamengine_combat
			part.health_max( 40 )
			node.parts([ part ])
			const names = node.props().map( prop => prop.name )
			$mol_assert_equal( names.filter( name => /health|rate|\./.test( name ) ), [] )
			$mol_assert_equal( part.props().find( prop => prop.name === 'health_max' )!.get(), 40 )
		},

		'node without parts keeps its props to itself'() {
			const names = new $bog_gamengine_node().props().map( prop => prop.name )
			$mol_assert_equal( names.filter( name => name.includes( '.' ) ), [] )
			$mol_assert_ok( names.indexOf( 'pos' ) >= 0 )
		},

	})
}
