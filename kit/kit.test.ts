namespace $ {
	$mol_test({

		'every palette item names a class and either a known world or none'() {
			const kit = new $bog_gamestudio_kit
			$mol_assert_ok( kit.list().length > 0 )
			for( const item of kit.list() ) {
				$mol_assert_ok( item.klass.startsWith( '$' ) )
				$mol_assert_ok( item.title.length > 0 )
				$mol_assert_ok( !item.world || Boolean( $bog_gamestudio_kit_worlds[ item.world ] ) )
				$mol_assert_ok( !item.part || !item.world )
			}
		},

		'part attaches to a node and its props show up under the host'( $ ) {

			const doc = new $bog_gamestudio_doc
			doc.$ = $
			doc.source_own( [
				'$bog_gamestudio_sample $bog_gamengine_scene',
				'\tkids /',
				'\t\t<= Hero $bog_gamengine_node',
				'\t\t\tname \\Герой',
				'',
			].join( '\n' ) )

			const kit = new $bog_gamestudio_kit
			const name = $bog_gamestudio_kit_attach( doc, kit.item( 'combat' )!, 'Hero' )
			const source = doc.source()

			$mol_assert_ok( name.length > 0 )
			$mol_assert_ok( source.includes( '$bog_gamengine_combat' ) )
			$mol_assert_ok( source.includes( 'health_max 40' ) )
			$mol_assert_ok( source.includes( 'parts /' ) )
			$mol_assert_ok( source.includes( `<= ${ name }` ) )

			const scene = doc.scene()
			const hero = scene.nodes().find( one => one.name() === 'Герой' )!
			const names = hero.props().map( prop => prop.name )
			$mol_assert_ok( names.indexOf( 'combat.health_max' ) > 0 )
			$mol_assert_equal( hero.props().find( prop => prop.name === 'combat.health_max' )!.get(), 40 )

		},

		'edit of a part prop lands in the part, not on the host'( $ ) {

			const doc = new $bog_gamestudio_doc
			doc.$ = $
			doc.source_own( [
				'$bog_gamestudio_sample $bog_gamengine_scene',
				'\tkids /',
				'\t\t<= Hero $bog_gamengine_node',
				'\t\t\tname \\Герой',
				'',
			].join( '\n' ) )

			const kit = new $bog_gamestudio_kit
			const part = $bog_gamestudio_kit_attach( doc, kit.item( 'combat' )!, 'Hero' )

			const route = $bog_gamestudio_kit_route_of( doc, 'Hero', 'combat.health_max' )
			$mol_assert_equal( route.path, part )
			$mol_assert_equal( route.prop, 'health_max' )

			doc.set( route.path, route.prop, 70 )
			const source = doc.source()
			$mol_assert_ok( source.includes( 'health_max 70' ) )
			$mol_assert_equal( source.includes( 'combat.health_max' ), false )

			const hero = doc.scene().nodes().find( one => one.name() === 'Герой' )!
			$mol_assert_equal( hero.props().find( one => one.name === 'combat.health_max' )!.get(), 70 )

		},

		'plain prop of the node itself is routed to the node'( $ ) {
			const doc = new $bog_gamestudio_doc
			doc.$ = $
			doc.source_own( '$bog_gamestudio_sample $bog_gamengine_scene\n\tkids /\n\t\t<= Hero $bog_gamengine_node\n' )
			const route = $bog_gamestudio_kit_route_of( doc, 'Hero', 'pos' )
			$mol_assert_equal( route.path, 'Hero' )
			$mol_assert_equal( route.prop, 'pos' )
		},

		'dotted prop without a matching part stays on the host'( $ ) {
			const doc = new $bog_gamestudio_doc
			doc.$ = $
			doc.source_own( '$bog_gamestudio_sample $bog_gamengine_scene\n\tkids /\n\t\t<= Hero $bog_gamengine_node\n' )
			const route = $bog_gamestudio_kit_route_of( doc, 'Hero', 'brain.speed' )
			$mol_assert_equal( route.path, 'Hero' )
			$mol_assert_equal( route.prop, 'brain.speed' )
		},

		'part of a missing host is not written at all'( $ ) {
			const doc = new $bog_gamestudio_doc
			doc.$ = $
			doc.source_own( '$bog_gamestudio_sample $bog_gamengine_scene\n\tkids /\n' )
			const before = doc.source()
			const kit = new $bog_gamestudio_kit
			$mol_assert_equal( $bog_gamestudio_kit_attach( doc, kit.item( 'combat' )!, 'Ghost' ), '' )
			$mol_assert_equal( doc.source(), before )
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

		'agent takes the grid by a reference of its own, not by a list'() {
			const kit = new $bog_gamestudio_kit
			const world = kit.world( 'agent' )!
			$mol_assert_equal( world.node, 'Grid' )
			$mol_assert_equal( world.klass, '$bog_gamengine_nav_grid' )
			$mol_assert_equal( world.list, '' )
			$mol_assert_equal( world.ref, 'grid' )
			$mol_assert_equal( world.prop, '' )
			const plan = $bog_gamestudio_kit_plan_of( kit.item( 'agent' )!, [], [ 'map' ], '/ 1.5 -1.5 0' )
			$mol_assert_equal( plan.decls.map( one => one.node ), [ 'Tile', 'Grid' ] )
			$mol_assert_equal( plan.root, [] )
			$mol_assert_equal( plan.join, null )
			$mol_assert_equal( plan.props.grid, '<= Grid' )
		},

		'two agents share one grid and one tile'( $ ) {

			const doc = new $bog_gamestudio_doc
			doc.$ = $
			doc.source_own( [
				'$bog_gamestudio_sample $bog_gamestudio_sample_map',
				'\tmap \\',
				'\t\t\\######',
				'\t\t\\#....#',
				'\t\t\\######',
				'\tkids /',
				'',
			].join( '\n' ) )

			const kit = new $bog_gamestudio_kit
			const first = $bog_gamestudio_kit_apply( doc, kit.item( 'agent' )!, '/ 1.5 -1.5 0' )
			const second = $bog_gamestudio_kit_apply( doc, kit.item( 'agent' )!, '/ 3.5 -1.5 0' )
			const source = doc.source()

			$mol_assert_ok( first !== second )
			$mol_assert_equal( source.match( /Grid \$bog_gamengine_nav_grid/g )!.length, 1 )
			$mol_assert_equal( source.match( /\$bog_gamengine_phys_tile/g )!.length, 1 )
			$mol_assert_equal( source.match( /grid <= Grid/g )!.length, 2 )
			$mol_assert_equal( source.includes( 'phys <= ' ), false )

			const scene = doc.scene()
			const agents = scene.nodes().filter( one => one instanceof $bog_gamengine_nav_agent )
			$mol_assert_equal( agents.length, 2 )
			$mol_assert_ok( Boolean( ( agents[ 0 ] as $bog_gamengine_nav_agent ).grid() ) )
			$mol_assert_equal(
				( agents[ 0 ] as $bog_gamengine_nav_agent ).grid(),
				( agents[ 1 ] as $bog_gamengine_nav_agent ).grid(),
			)

		},

		'agent shows its numbers to the inspector'() {
			const agent = new $bog_gamengine_nav_agent
			const names = agent.props().map( prop => prop.name )
			$mol_assert_ok( names.indexOf( 'speed' ) > 0 )
			$mol_assert_ok( names.indexOf( 'radius' ) > 0 )
			$mol_assert_ok( names.indexOf( 'replan' ) > 0 )
			agent.props().find( prop => prop.name === 'speed' )!.set( 5 )
			$mol_assert_equal( agent.speed(), 5 )
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
