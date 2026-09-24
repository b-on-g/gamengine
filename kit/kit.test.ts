namespace $ {
	$mol_test({

		'every palette item names a class and a known world'() {
			const kit = new $bog_gamestudio_kit
			$mol_assert_ok( kit.list().length > 0 )
			for( const item of kit.list() ) {
				$mol_assert_ok( item.klass.startsWith( '$' ) )
				$mol_assert_ok( item.title.length > 0 )
				$mol_assert_ok( Boolean( $bog_gamestudio_kit_worlds[ item.world ] ) )
			}
		},

		'item is found by id and missing one is null'() {
			const kit = new $bog_gamestudio_kit
			$mol_assert_equal( kit.item( 'walker' )!.klass, '$bog_gamengine_phys_walker' )
			$mol_assert_equal( kit.item( 'body' )!.klass, '$bog_gamengine_phys_body' )
			$mol_assert_equal( kit.item( 'ghost' ), null )
			$mol_assert_equal( kit.title( 'walker' ), 'Ходок' )
		},

		'body of the palette asks for the phys world with a tile mate'() {
			const kit = new $bog_gamestudio_kit
			const world = kit.world( 'body' )!
			$mol_assert_equal( world.prop, 'phys' )
			$mol_assert_equal( world.node, 'Phys' )
			$mol_assert_equal( world.klass, '$bog_gamengine_phys' )
			$mol_assert_equal( world.list, 'bodies' )
			$mol_assert_equal( world.props.tile, '<= Tile' )
			$mol_assert_equal( world.mates.length, 1 )
			$mol_assert_equal( world.mates[ 0 ].node, 'Tile' )
			$mol_assert_equal( world.mates[ 0 ].klass, '$bog_gamengine_phys_tile' )
		},

		'tile of the phys world takes the map of the scene itself'() {
			const kit = new $bog_gamestudio_kit
			$mol_assert_equal( kit.world( 'walker' )!.mates[ 0 ].props.map, '<= map' )
		},

		'walker is the engine primitive and asks for no input wiring'() {
			const kit = new $bog_gamestudio_kit
			const item = kit.item( 'walker' )!
			$mol_assert_equal( item.klass, '$bog_gamengine_phys_walker' )
			$mol_assert_equal( item.props.input, undefined )
			$mol_assert_equal( new $bog_gamengine_phys_walker().speed(), 3 )
		},

		'placed node comes with a readable name of its own'() {
			const kit = new $bog_gamestudio_kit
			const plan = $bog_gamestudio_kit_plan_of( kit.item( 'walker' )!, [ 'Tile', 'Phys' ], [ 'phys' ], '/ 1.5 -1.5 0' )
			$mol_assert_equal( plan.props.name, '\\Ходок' )
			$mol_assert_equal( kit.item( 'body' )!.props.name, '\\Тело' )
		},

		'empty scene gets the tile, the world and a line on the root'() {
			const kit = new $bog_gamestudio_kit
			const plan = $bog_gamestudio_kit_plan_of( kit.item( 'walker' )!, [], [ 'map', 'palette' ], '/ 1.5 -1.5 0' )
			$mol_assert_equal( plan.decls.map( one => one.node ), [ 'Tile', 'Phys' ] )
			$mol_assert_equal( plan.decls[ 1 ].props.bodies, '/' )
			$mol_assert_equal( plan.root, [ 'phys <= Phys' ] )
			$mol_assert_equal( plan.klass, '$bog_gamengine_phys_walker' )
			$mol_assert_equal( plan.props.pos, '/ 1.5 -1.5 0' )
			$mol_assert_equal( plan.join, { node: 'Phys', prop: 'bodies' } )
		},

		'scene that already has a world only gets the node'() {
			const kit = new $bog_gamestudio_kit
			const plan = $bog_gamestudio_kit_plan_of( kit.item( 'body' )!, [ 'Tile', 'Phys' ], [ 'map', 'phys' ], '/ 2.5 -3.5 0' )
			$mol_assert_equal( plan.decls.length, 0 )
			$mol_assert_equal( plan.root.length, 0 )
			$mol_assert_equal( plan.join, { node: 'Phys', prop: 'bodies' } )
		},

		'half built world is filled up, not doubled'() {
			const kit = new $bog_gamestudio_kit
			const plan = $bog_gamestudio_kit_plan_of( kit.item( 'body' )!, [ 'Tile' ], [ 'map' ], '/ 0.5 -0.5 0' )
			$mol_assert_equal( plan.decls.map( one => one.node ), [ 'Phys' ] )
			$mol_assert_equal( plan.root, [ 'phys <= Phys' ] )
		},

		'placing a walker into a bare scene writes the world, the tile and the node'( $ ) {

			const doc = new $bog_gamestudio_doc
			doc.$ = $
			doc.source_own( [
				'$bog_gamestudio_sample $bog_gamestudio_sample_map',
				'\tmap \\',
				'\t\t\\####',
				'\t\t\\#..#',
				'\t\t\\####',
				'\tkids /',
				'',
			].join( '\n' ) )

			const kit = new $bog_gamestudio_kit
			const name = $bog_gamestudio_kit_apply( doc, kit.item( 'walker' )!, '/ 1.5 -1.5 0' )
			const source = doc.source()

			$mol_assert_ok( name.length > 0 )
			$mol_assert_ok( source.includes( '$bog_gamengine_phys_tile' ) )
			$mol_assert_ok( source.includes( 'map <= map' ) )
			$mol_assert_ok( source.includes( 'Phys $bog_gamengine_phys' ) )
			$mol_assert_ok( source.includes( 'tile <= Tile' ) )
			$mol_assert_ok( source.includes( 'phys <= Phys' ) )
			$mol_assert_ok( source.includes( '$bog_gamengine_phys_walker' ) )
			$mol_assert_ok( source.includes( 'pos / 1.5 -1.5 0' ) )
			$mol_assert_ok( source.includes( `<= ${ name }` ) )
			$mol_assert_ok( doc.tree().kids.length > 0 )

		},

		'second body joins the same world instead of making another'( $ ) {

			const doc = new $bog_gamestudio_doc
			doc.$ = $
			doc.source_own( [
				'$bog_gamestudio_sample $bog_gamestudio_sample_map',
				'\tmap \\',
				'\t\t\\####',
				'\t\t\\#..#',
				'\t\t\\####',
				'\tkids /',
				'',
			].join( '\n' ) )

			const kit = new $bog_gamestudio_kit
			const first = $bog_gamestudio_kit_apply( doc, kit.item( 'walker' )!, '/ 1.5 -1.5 0' )
			const second = $bog_gamestudio_kit_apply( doc, kit.item( 'body' )!, '/ 2.5 -1.5 0' )
			const source = doc.source()

			$mol_assert_ok( first !== second )
			$mol_assert_equal( source.match( /Phys \$bog_gamengine_phys/g )!.length, 1 )
			$mol_assert_equal( source.match( /\$bog_gamengine_phys_tile/g )!.length, 1 )
			$mol_assert_equal( source.match( /phys <= Phys/g )!.length, 1 )
			$mol_assert_ok( source.includes( `<= ${ first }` ) )
			$mol_assert_ok( source.includes( `<= ${ second }` ) )
			$mol_assert_equal( doc.nodes().filter( ( one: $bog_gamestudio_doc_node ) => one.klass.startsWith( '$bog_gamengine_phys' ) ).length, 2 )

		},

		'palette can be replaced from outside'() {
			const kit = new $bog_gamestudio_kit
			kit.list([ { id: 'own', title: 'Своё', klass: '$bog_gamengine_sprite', props: {}, world: 'phys' } ])
			$mol_assert_equal( kit.list().length, 1 )
			$mol_assert_equal( kit.item( 'own' )!.title, 'Своё' )
			$mol_assert_equal( kit.item( 'walker' ), null )
		},

	})
}
