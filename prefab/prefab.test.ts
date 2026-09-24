namespace $ {

	class $bog_gamengine_prefab_test_atlas extends $bog_gamengine_atlas {

		image( uri: string ) {
			return { data: ()=> ({ width: 64, height: 64 }) } as unknown as $mol_3d_image
		}

	}

	function prefab_test_source() {
		const source = new $bog_gamengine_mesh
		source.frame( 'wall' )
		source.material( new Float32Array([ 0.5, 0.5, 0, 0 ]) )
		return source
	}

	function prefab_test_make( source: $bog_gamengine_node, ids: readonly string[] ) {
		const prefab = new $bog_gamengine_prefab
		prefab.source( source )
		prefab.ids( ids )
		return prefab
	}

	function prefab_test_mesh( prefab: $bog_gamengine_prefab, id: string ) {
		return prefab.Node( id ) as $bog_gamengine_mesh
	}

	$mol_test({

		'instance of a prefab is another object of the source class'() {
			const source = prefab_test_source()
			const prefab = prefab_test_make( source, [ 'a', 'b' ] )
			const first = prefab.Node( 'a' )
			$mol_assert_ok( first instanceof $bog_gamengine_mesh )
			$mol_assert_ok( first !== source )
			$mol_assert_ok( first !== prefab.Node( 'b' ) )
			$mol_assert_equal( prefab.Node( 'a' ), first )
			$mol_assert_equal( prefab.nodes().length, 2 )
		},

		'instance without own value reads the source and follows its change'() {
			const source = prefab_test_source()
			const prefab = prefab_test_make( source, [ 'a' ] )
			const node = prefab_test_mesh( prefab, 'a' )
			$mol_assert_equal( node.frame(), 'wall' )
			source.frame( 'floor' )
			$mol_assert_equal( node.frame(), 'floor' )
		},

		'own value of one instance wins and leaves the source and the neighbour alone'() {
			const source = prefab_test_source()
			const prefab = prefab_test_make( source, [ 'a', 'b' ] )
			const first = prefab_test_mesh( prefab, 'a' )
			const second = prefab_test_mesh( prefab, 'b' )
			first.frame( 'floor' )
			$mol_assert_equal( first.frame(), 'floor' )
			$mol_assert_equal( second.frame(), 'wall' )
			$mol_assert_equal( source.frame(), 'wall' )
			$mol_assert_equal( prefab.own( 'a', 'frame' ), true )
			$mol_assert_equal( prefab.own( 'b', 'frame' ), false )
		},

		'reset gives the instance back to the source'() {
			const source = prefab_test_source()
			const prefab = prefab_test_make( source, [ 'a' ] )
			const node = prefab_test_mesh( prefab, 'a' )
			prefab.set( 'a', 'frame', 'floor' )
			$mol_assert_equal( node.frame(), 'floor' )
			prefab.reset( 'a', 'frame' )
			$mol_assert_equal( node.frame(), 'wall' )
			$mol_assert_equal( prefab.own( 'a', 'frame' ), false )
		},

		'own position of the instance reaches its world matrix'() {
			const source = prefab_test_source()
			const prefab = prefab_test_make( source, [ 'a' ] )
			const node = prefab.Node( 'a' )
			node.pos( new Float32Array([ 2, 3, 4 ]) )
			const world = node.world()
			$mol_assert_equal( [ world[ 12 ], world[ 13 ], world[ 14 ] ], [ 2, 3, 4 ] )
			$mol_assert_equal( [ ... source.pos() ], [ 0, 0, 0 ] )
		},

		'binding put on the source by the tree travels to the instance'() {
			const atlas = new $bog_gamengine_prefab_test_atlas
			atlas.uris([ 'bog/gamengine/demo/atlas/wall.png', 'bog/gamengine/demo/atlas/floor.png' ])
			const source = prefab_test_source()
			Object.assign( source, { atlas: ()=> atlas } )
			const node = prefab_test_make( source, [ 'a' ] ).Node( 'a' ) as $bog_gamengine_mesh
			$mol_assert_equal( node.atlas(), atlas )
			$mol_assert_equal( node.layer(), 0 )
			node.frame( 'floor' )
			$mol_assert_equal( node.layer(), 1 )
		},

		'kids of the source are cloned per instance, not shared'() {
			const source = prefab_test_source()
			const kid = new $bog_gamengine_mesh
			kid.frame( 'floor' )
			kid.pos( new Float32Array([ 0, 1, 0 ]) )
			source.kids([ kid ])
			const prefab = prefab_test_make( source, [ 'a', 'b' ] )
			const first = prefab.Node( 'a' ).kids()[ 0 ]
			const second = prefab.Node( 'b' ).kids()[ 0 ]
			$mol_assert_ok( first !== kid )
			$mol_assert_ok( first !== second )
			$mol_assert_equal( first.parent(), prefab.Node( 'a' ) )
			first.pos( new Float32Array([ 0, 5, 0 ]) )
			$mol_assert_equal( [ ... second.pos() ], [ 0, 1, 0 ] )
			$mol_assert_equal( [ ... kid.pos() ], [ 0, 1, 0 ] )
		},

		'world of a cloned kid counts the instance it hangs on'() {
			const source = prefab_test_source()
			const kid = new $bog_gamengine_mesh
			kid.pos( new Float32Array([ 0, 1, 0 ]) )
			source.kids([ kid ])
			const prefab = prefab_test_make( source, [ 'a' ] )
			const node = prefab.Node( 'a' )
			node.pos( new Float32Array([ 3, 0, 0 ]) )
			const world = node.kids()[ 0 ].world()
			$mol_assert_equal( [ world[ 12 ], world[ 13 ], world[ 14 ] ], [ 3, 1, 0 ] )
		},

		'mark tells the prefab, the instance and the path of a node'() {
			const source = prefab_test_source()
			source.kids([ new $bog_gamengine_mesh ])
			const prefab = prefab_test_make( source, [ 'a' ] )
			const node = prefab.Node( 'a' )
			$mol_assert_equal( $bog_gamengine_prefab_mark_of( node )!.prefab, prefab )
			$mol_assert_equal( $bog_gamengine_prefab_mark_of( node )!.id, 'a' )
			$mol_assert_equal( $bog_gamengine_prefab_mark_of( node )!.path, '' )
			$mol_assert_equal( $bog_gamengine_prefab_mark_of( node.kids()[ 0 ] )!.path, '0' )
			$mol_assert_equal( $bog_gamengine_prefab_mark_of( source ), null )
		},

		'prefab without source fails with a clear error'() {
			const prefab = new $bog_gamengine_prefab
			$mol_assert_fail( ()=> prefab.Node( 'a' ), 'Prefab $bog_gamengine_prefab<> has no source node' )
		},

	})

}
