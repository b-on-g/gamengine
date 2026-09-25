namespace $ {
	$mol_test({

		'every palette item names a class and either a known world or none'() {
			const kit = new $bog_gamengine_studio_kit
			$mol_assert_ok( kit.list().length > 0 )
			for( const item of kit.list() ) {
				$mol_assert_ok( item.klass.startsWith( '$' ) )
				$mol_assert_ok( item.title.length > 0 )
				$mol_assert_ok( !item.world || Boolean( $bog_gamengine_studio_kit_worlds[ item.world ] ) )
				$mol_assert_ok( !item.part || !item.world )
			}
		},

		'part attaches to a node and keeps its own props'( $ ) {

			const doc = new $bog_gamengine_studio_doc
			doc.$ = $
			doc.source_own( [
				'$bog_gamengine_studio_sample $bog_gamengine_scene',
				'\tkids /',
				'\t\t<= Hero $bog_gamengine_node',
				'\t\t\tname \\Герой',
				'',
			].join( '\n' ) )

			const kit = new $bog_gamengine_studio_kit
			const name = $bog_gamengine_studio_kit_attach( doc, kit.item( 'combat' )!, 'Hero' )
			const source = doc.source()

			$mol_assert_ok( name.length > 0 )
			$mol_assert_ok( source.includes( '$bog_gamengine_combat' ) )
			$mol_assert_ok( source.includes( 'health_max 40' ) )
			$mol_assert_ok( source.includes( 'parts /' ) )
			$mol_assert_ok( source.includes( `<= ${ name }` ) )

			const scene = doc.scene()
			const hero = scene.nodes().find( one => one.name() === 'Герой' )!
			const part = hero.parts()[ 0 ]
			$mol_assert_equal( hero.parts().length, 1 )
			$mol_assert_equal( part.owner(), hero )
			$mol_assert_equal( part.props!().find( prop => prop.name === 'health_max' )!.get(), 40 )
			$mol_assert_equal( hero.props().map( prop => prop.name ).filter( name => /health|rate|\./.test( name ) ), [] )

		},

		'part of a missing host is not written at all'( $ ) {
			const doc = new $bog_gamengine_studio_doc
			doc.$ = $
			doc.source_own( '$bog_gamengine_studio_sample $bog_gamengine_scene\n\tkids /\n' )
			const before = doc.source()
			const kit = new $bog_gamengine_studio_kit
			$mol_assert_equal( $bog_gamengine_studio_kit_attach( doc, kit.item( 'combat' )!, 'Ghost' ), '' )
			$mol_assert_equal( doc.source(), before )
		},

		'item is found by id and missing one is null'() {
			const kit = new $bog_gamengine_studio_kit
			$mol_assert_equal( kit.item( 'walker' )!.klass, '$bog_gamengine_phys_walker' )
			$mol_assert_equal( kit.item( 'body' )!.klass, '$bog_gamengine_phys_body' )
			$mol_assert_equal( kit.item( 'ghost' ), null )
			$mol_assert_equal( kit.title( 'walker' ), 'Ходок' )
		},

		'body of the palette asks for the phys world and binds a tile only if there is one'() {
			const kit = new $bog_gamengine_studio_kit
			const world = kit.world( 'body' )!
			$mol_assert_equal( world.prop, 'phys' )
			$mol_assert_equal( world.node, 'Phys' )
			$mol_assert_equal( world.klass, '$bog_gamengine_phys' )
			$mol_assert_equal( world.list, 'bodies' )
			$mol_assert_equal( world.props.tile, undefined )
			$mol_assert_equal( world.binds.tile, 'Tile' )
		},

		'map of the palette gives a bare scene a tile and cells to paint on'( $ ) {

			const doc = new $bog_gamengine_studio_doc
			doc.$ = $
			doc.source_own( '$bog_gamengine_studio_sample $bog_gamengine_scene\n\tkids /\n' )

			const kit = new $bog_gamengine_studio_kit
			const name = $bog_gamengine_studio_kit_apply( doc, kit.item( 'map' )!, '/ 0 0 0' )
			const source = doc.source()

			$mol_assert_ok( source.includes( '$bog_gamengine_tilemap' ) )
			$mol_assert_ok( source.includes( 'Tile $bog_gamengine_phys_tile' ) )
			$mol_assert_ok( source.includes( 'tile <= Tile' ) )
			$mol_assert_equal( source.includes( 'atlas <=' ), false )

			const scene = doc.scene()
			const tiles = scene.nodes().find( one => one instanceof $bog_gamengine_tilemap ) as $bog_gamengine_tilemap
			$mol_assert_ok( tiles.emit() > 0 )
			$mol_assert_equal( tiles.atlas(), null )
			$mol_assert_ok( scene.nodes().some( one => one instanceof $bog_gamengine_tilemap && one.tile() ) )
			$mol_assert_equal( $bog_gamengine_studio_kit_bound( doc, name, 'atlas' ), '' )

		},

		'brush paints into the map that the palette has just placed'( $ ) {

			const doc = new $bog_gamengine_studio_doc
			doc.$ = $
			doc.source_own( '$bog_gamengine_studio_sample $bog_gamengine_scene\n\tkids /\n' )

			const kit = new $bog_gamengine_studio_kit
			$bog_gamengine_studio_kit_apply( doc, kit.item( 'map' )!, '/ 0 0 0' )
			doc.paint( 2, 1, '#' )

			const tiles = doc.scene().nodes().find( one => one instanceof $bog_gamengine_tilemap ) as $bog_gamengine_tilemap
			$mol_assert_equal( tiles.tile()!.char( 2, 1 ), '#' )
			$mol_assert_equal( tiles.tile()!.cell( 2, 1 ), true )
			$mol_assert_ok( tiles.emit() > 0 )

		},

		'map of the palette takes the tile that is already in the document'( $ ) {

			const doc = new $bog_gamengine_studio_doc
			doc.$ = $
			doc.source_own( [
				'$bog_gamengine_studio_sample $bog_gamengine_scene',
				'\tTile $bog_gamengine_phys_tile',
				'\t\tmap \\',
				'\t\t\t\\####',
				'\tkids /',
				'',
			].join( '\n' ) )

			const kit = new $bog_gamengine_studio_kit
			$bog_gamengine_studio_kit_apply( doc, kit.item( 'map' )!, '/ 0 0 0' )
			const source = doc.source()

			$mol_assert_equal( source.match( /\$bog_gamengine_phys_tile/g )!.length, 1 )
			$mol_assert_ok( source.includes( 'tile <= Tile' ) )
			$mol_assert_ok( source.includes( '\\####' ) )

		},

		'map of the palette binds the atlas only when the document has one'( $ ) {

			const doc = new $bog_gamengine_studio_doc
			doc.$ = $
			doc.source_own( [
				'$bog_gamengine_studio_sample $bog_gamengine_scene',
				'\tkids /',
				'\tAtlas $bog_gamengine_atlas',
				'\t\turis /',
				'\t\t\t\\bog/gamengine/demo/atlas/wall.png',
				'\t\t\t\\bog/gamengine/demo/atlas/floor.png',
				'\t\tsize 64',
				'',
			].join( '\n' ) )

			const kit = new $bog_gamengine_studio_kit
			const name = $bog_gamengine_studio_kit_apply( doc, kit.item( 'map' )!, '/ 0 0 0' )

			$mol_assert_ok( doc.source().includes( 'atlas <= Atlas' ) )
			$mol_assert_equal( $bog_gamengine_studio_kit_bound( doc, name, 'atlas' ), 'Atlas' )

			const tiles = doc.scene().nodes().find( one => one instanceof $bog_gamengine_tilemap ) as $bog_gamengine_tilemap
			$mol_assert_ok( Boolean( tiles.atlas() ) )
			const count = tiles.emit()
			$mol_assert_ok( count > 0 )
			$mol_assert_equal( tiles.pool().layer[ 0 ], tiles.atlas()!.layer( 'floor' ) )

		},

		'atlas of a tilemap is a reference in the panel, empty until it is bound'() {
			const tiles = new $bog_gamengine_tilemap
			const prop = tiles.props().find( one => one.name === 'atlas' )!
			$mol_assert_equal( prop.kind, 'node' )
			$mol_assert_equal( prop.klass, '$bog_gamengine_atlas' )
			$mol_assert_equal( prop.get(), null )
		},

		'reference of a wrong class is refused instead of being written'( $ ) {

			const doc = new $bog_gamengine_studio_doc
			doc.$ = $
			doc.source_own( [
				'$bog_gamengine_studio_sample $bog_gamengine_scene',
				'\tkids /',
				'\t\t<= Walker_1 $bog_gamengine_phys_walker',
				'\tAtlas $bog_gamengine_atlas',
				'\t\turis /',
				'\t\t\t\\bog/gamengine/demo/atlas/wall.png',
				'\t\tsize 64',
				'',
			].join( '\n' ) )

			const kit = new $bog_gamengine_studio_kit
			const name = $bog_gamengine_studio_kit_apply( doc, kit.item( 'map' )!, '/ 0 0 0' )

			$mol_assert_equal( $bog_gamengine_studio_kit_bind( doc, name, 'atlas', 'Walker_1', '$bog_gamengine_atlas' ), false )
			$mol_assert_equal( doc.source().includes( 'atlas <= Walker_1' ), false )
			$mol_assert_equal( $bog_gamengine_studio_kit_bind( doc, name, 'atlas', 'Atlas', '$bog_gamengine_atlas' ), true )
			$mol_assert_equal( $bog_gamengine_studio_kit_bound( doc, name, 'atlas' ), 'Atlas' )

		},

		'no world of the palette declares a tile or leans on a map of the root'() {
			const kit = new $bog_gamengine_studio_kit
			for( const id of [ 'walker', 'body', 'agent' ] ) {
				const world = kit.world( id )!
				$mol_assert_equal( Object.values( world.props ).indexOf( '<= map' ), -1 )
				$mol_assert_equal( world.binds.tile, 'Tile' )
				const plan = $bog_gamengine_studio_kit_plan_of( kit.item( id )!, [], [], '/ 0.5 -0.5 0' )
				$mol_assert_equal( plan.decls.some( one => one.klass === '$bog_gamengine_phys_tile' ), false )
			}
		},

		'walker is the engine primitive and asks for no input wiring'() {
			const kit = new $bog_gamengine_studio_kit
			const item = kit.item( 'walker' )!
			$mol_assert_equal( item.klass, '$bog_gamengine_phys_walker' )
			$mol_assert_equal( item.props.input, undefined )
			$mol_assert_equal( new $bog_gamengine_phys_walker().speed(), 3 )
		},

		'placed node comes with a readable name of its own'() {
			const kit = new $bog_gamengine_studio_kit
			const plan = $bog_gamengine_studio_kit_plan_of( kit.item( 'walker' )!, [ 'Tile', 'Phys' ], [ 'phys' ], '/ 1.5 -1.5 0' )
			$mol_assert_equal( plan.props.name, '\\Ходок' )
			$mol_assert_equal( kit.item( 'body' )!.props.name, '\\Тело' )
		},

		'empty scene gets the world and a line on the root'() {
			const kit = new $bog_gamengine_studio_kit
			const plan = $bog_gamengine_studio_kit_plan_of( kit.item( 'walker' )!, [], [ 'map', 'palette' ], '/ 1.5 -1.5 0' )
			$mol_assert_equal( plan.decls.map( one => one.node ), [ 'Phys' ] )
			$mol_assert_equal( plan.decls[ 0 ].props.bodies, '/' )
			$mol_assert_equal( plan.decls[ 0 ].props.tile, undefined )
			$mol_assert_equal( plan.root, [ 'phys <= Phys' ] )
			$mol_assert_equal( plan.klass, '$bog_gamengine_phys_walker' )
			$mol_assert_equal( plan.props.pos, '/ 1.5 -1.5 0' )
			$mol_assert_equal( plan.join, { node: 'Phys', prop: 'bodies' } )
		},

		'scene that already has a world only gets the node'() {
			const kit = new $bog_gamengine_studio_kit
			const plan = $bog_gamengine_studio_kit_plan_of( kit.item( 'body' )!, [ 'Tile', 'Phys' ], [ 'map', 'phys' ], '/ 2.5 -3.5 0' )
			$mol_assert_equal( plan.decls.length, 0 )
			$mol_assert_equal( plan.root.length, 0 )
			$mol_assert_equal( plan.join, { node: 'Phys', prop: 'bodies' } )
		},

		'half built world is filled up, not doubled, and takes the tile that is already there'() {
			const kit = new $bog_gamengine_studio_kit
			const plan = $bog_gamengine_studio_kit_plan_of( kit.item( 'body' )!, [ 'Tile' ], [ 'map' ], '/ 0.5 -0.5 0' )
			$mol_assert_equal( plan.decls.map( one => one.node ), [ 'Phys' ] )
			$mol_assert_equal( plan.decls[ 0 ].props.tile, '<= Tile' )
			$mol_assert_equal( plan.root, [ 'phys <= Phys' ] )
		},

		'placing a walker into a bare scene of the engine gives a working world'( $ ) {

			const doc = new $bog_gamengine_studio_doc
			doc.$ = $
			doc.source_own( [
				'$bog_gamengine_studio_sample $bog_gamengine_scene',
				'\tkids /',
				'',
			].join( '\n' ) )

			const kit = new $bog_gamengine_studio_kit
			const name = $bog_gamengine_studio_kit_apply( doc, kit.item( 'walker' )!, '/ 1.5 -1.5 0' )
			const source = doc.source()

			$mol_assert_ok( name.length > 0 )
			$mol_assert_ok( source.includes( 'Phys $bog_gamengine_phys' ) )
			$mol_assert_ok( source.includes( 'phys <= Phys' ) )
			$mol_assert_ok( source.includes( '$bog_gamengine_phys_walker' ) )
			$mol_assert_ok( source.includes( 'pos / 1.5 -1.5 0' ) )
			$mol_assert_ok( source.includes( `<= ${ name }` ) )
			$mol_assert_equal( source.includes( '$bog_gamengine_phys_tile' ), false )
			$mol_assert_equal( source.includes( 'map <= map' ), false )

			const scene = doc.scene()
			const phys = scene.phys()!
			$mol_assert_equal( phys.tile(), null )

			const body = scene.nodes().find( one => one instanceof $bog_gamengine_phys_body ) as $bog_gamengine_phys_body
			body.vel( new Float32Array([ 1, 0, 0 ]) )
			phys.step_world( 0.5 )
			$mol_assert_equal( body.pos()[ 0 ] > 1.5, true )

		},

		'second body joins the same world instead of making another'( $ ) {

			const doc = new $bog_gamengine_studio_doc
			doc.$ = $
			doc.source_own( [
				'$bog_gamengine_studio_sample $bog_gamengine_scene',
				'\tTile $bog_gamengine_phys_tile',
				'\t\tmap \\',
				'\t\t\t\\####',
				'\t\t\t\\#..#',
				'\t\t\t\\####',
				'\tkids /',
				'',
			].join( '\n' ) )

			const kit = new $bog_gamengine_studio_kit
			const first = $bog_gamengine_studio_kit_apply( doc, kit.item( 'walker' )!, '/ 1.5 -1.5 0' )
			const second = $bog_gamengine_studio_kit_apply( doc, kit.item( 'body' )!, '/ 2.5 -1.5 0' )
			const source = doc.source()

			$mol_assert_ok( first !== second )
			$mol_assert_equal( source.match( /Phys \$bog_gamengine_phys/g )!.length, 1 )
			$mol_assert_equal( source.match( /\$bog_gamengine_phys_tile/g )!.length, 1 )
			$mol_assert_equal( source.match( /tile <= Tile/g )!.length, 1 )
			$mol_assert_equal( source.match( /phys <= Phys/g )!.length, 1 )
			$mol_assert_ok( source.includes( `<= ${ first }` ) )
			$mol_assert_ok( source.includes( `<= ${ second }` ) )
			$mol_assert_equal( doc.nodes().filter( ( one: $bog_gamengine_studio_doc_node ) => one.kind === 'node' && one.klass.startsWith( '$bog_gamengine_phys' ) ).length, 2 )

		},

		'agent takes the grid by a reference of its own, not by a list'() {
			const kit = new $bog_gamengine_studio_kit
			const world = kit.world( 'agent' )!
			$mol_assert_equal( world.node, 'Grid' )
			$mol_assert_equal( world.klass, '$bog_gamengine_nav_grid' )
			$mol_assert_equal( world.list, '' )
			$mol_assert_equal( world.ref, 'grid' )
			$mol_assert_equal( world.prop, '' )
			const plan = $bog_gamengine_studio_kit_plan_of( kit.item( 'agent' )!, [], [ 'map' ], '/ 1.5 -1.5 0' )
			$mol_assert_equal( plan.decls.map( one => one.node ), [ 'Grid' ] )
			$mol_assert_equal( plan.root, [] )
			$mol_assert_equal( plan.join, null )
			$mol_assert_equal( plan.props.grid, '<= Grid' )
		},

		'two agents share one grid and one tile'( $ ) {

			const doc = new $bog_gamengine_studio_doc
			doc.$ = $
			doc.source_own( [
				'$bog_gamengine_studio_sample $bog_gamengine_scene',
				'\tTile $bog_gamengine_phys_tile',
				'\t\tmap \\',
				'\t\t\t\\######',
				'\t\t\t\\#....#',
				'\t\t\t\\######',
				'\tkids /',
				'',
			].join( '\n' ) )

			const kit = new $bog_gamengine_studio_kit
			const first = $bog_gamengine_studio_kit_apply( doc, kit.item( 'agent' )!, '/ 1.5 -1.5 0' )
			const second = $bog_gamengine_studio_kit_apply( doc, kit.item( 'agent' )!, '/ 3.5 -1.5 0' )
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
			$mol_assert_equal( ( agents[ 0 ] as $bog_gamengine_nav_agent ).grid()!.width(), 6 )
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

		'nodes are handed to a property one by one and read back by name'( $ ) {

			const doc = new $bog_gamengine_studio_doc
			doc.$ = $
			doc.source_own( [
				'$bog_gamengine_studio_sample $bog_gamengine_scene',
				'\tkids /',
				'\t\t<= First $bog_gamengine_nav_agent',
				'\t\t<= Second $bog_gamengine_nav_agent',
				'\t\t<= Third $bog_gamengine_nav_agent',
				'',
			].join( '\n' ) )

			$mol_assert_equal( $bog_gamengine_studio_kit_refs( doc, 'First', 'others' ), [] )

			$bog_gamengine_studio_kit_join( doc, 'First', 'others', 'Second' )
			$bog_gamengine_studio_kit_join( doc, 'First', 'others', 'Third' )
			$mol_assert_equal( $bog_gamengine_studio_kit_refs( doc, 'First', 'others' ), [ 'Second', 'Third' ] )

			$bog_gamengine_studio_kit_join( doc, 'First', 'others', 'Second' )
			$mol_assert_equal( $bog_gamengine_studio_kit_refs( doc, 'First', 'others' ), [ 'Second', 'Third' ] )

			const scene = doc.scene()
			const agents = scene.nodes() as readonly $bog_gamengine_nav_agent[]
			$mol_assert_equal( agents[ 0 ].others().length, 2 )
			$mol_assert_equal( agents[ 0 ].others()[ 0 ], agents[ 1 ] )
			$mol_assert_equal( agents[ 0 ].props().find( one => one.name === 'others' )!.kind, 'nodes' )

			$mol_assert_equal( $bog_gamengine_studio_kit_clear( doc, 'First', 'others' ), true )
			$mol_assert_equal( $bog_gamengine_studio_kit_refs( doc, 'First', 'others' ), [] )
			$mol_assert_equal( doc.source().includes( 'others' ), false )

		},

		'path of a live node is found by its place among the kids'( $ ) {
			const doc = new $bog_gamengine_studio_doc
			doc.$ = $
			doc.source_own( [
				'$bog_gamengine_studio_sample $bog_gamengine_scene',
				'\tkids /',
				'\t\t<= First $bog_gamengine_node',
				'\t\t<= Second $bog_gamengine_node',
				'',
			].join( '\n' ) )
			const scene = doc.scene()
			const nodes = scene.nodes()
			$mol_assert_equal( $bog_gamengine_studio_kit_path_of( doc, nodes[ 1 ] ), 'Second' )
			$mol_assert_equal( $bog_gamengine_studio_kit_path_of( doc, null ), '' )
			$mol_assert_equal( $bog_gamengine_studio_kit_path_of( doc, new $bog_gamengine_node ), '' )
		},

		'single reference is bound by name and replaced, not doubled'( $ ) {
			const doc = new $bog_gamengine_studio_doc
			doc.$ = $
			doc.source_own( [
				'$bog_gamengine_studio_sample $bog_gamengine_scene',
				'\tkids /',
				'\t\t<= Rule $bog_gamengine_node',
				'\t\t<= First $bog_gamengine_node',
				'\t\t<= Second $bog_gamengine_node',
				'',
			].join( '\n' ) )

			$mol_assert_equal( $bog_gamengine_studio_kit_bound( doc, 'Rule', 'hero' ), '' )
			$mol_assert_equal( $bog_gamengine_studio_kit_bind( doc, 'Rule', 'hero', 'First' ), true )
			$mol_assert_equal( $bog_gamengine_studio_kit_bound( doc, 'Rule', 'hero' ), 'First' )
			$mol_assert_equal( $bog_gamengine_studio_kit_bind( doc, 'Rule', 'hero', 'Second' ), true )
			$mol_assert_equal( $bog_gamengine_studio_kit_bound( doc, 'Rule', 'hero' ), 'Second' )
			$mol_assert_equal( doc.source().match( /hero <= /g )!.length, 1 )
			$mol_assert_equal( $bog_gamengine_studio_kit_bind( doc, 'Ghost', 'hero', 'First' ), false )
		},

		'clearing a property that is not there changes nothing'( $ ) {
			const doc = new $bog_gamengine_studio_doc
			doc.$ = $
			doc.source_own( '$bog_gamengine_studio_sample $bog_gamengine_scene\n\tkids /\n\t\t<= First $bog_gamengine_node\n' )
			const before = doc.source()
			$mol_assert_equal( $bog_gamengine_studio_kit_clear( doc, 'First', 'others' ), false )
			$mol_assert_equal( $bog_gamengine_studio_kit_clear( doc, 'Ghost', 'others' ), false )
			$mol_assert_equal( doc.source(), before )
		},

		'palette can be replaced from outside'() {
			const kit = new $bog_gamengine_studio_kit
			kit.list([ { id: 'own', title: 'Своё', klass: '$bog_gamengine_sprite', props: {}, world: 'phys' } ])
			$mol_assert_equal( kit.list().length, 1 )
			$mol_assert_equal( kit.item( 'own' )!.title, 'Своё' )
			$mol_assert_equal( kit.item( 'walker' ), null )
		},

	})
}
