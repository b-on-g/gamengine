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
			$mol_assert_equal( kit.item( 'walker' )!.klass, '$bog_gamestudio_kit_walker' )
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

		'walker is placed with input of the scene and its own speed'() {
			const kit = new $bog_gamestudio_kit
			const item = kit.item( 'walker' )!
			$mol_assert_equal( item.props.input, '<= input' )
			$mol_assert_equal( item.props.speed, '3' )
		},

		'empty scene gets the tile, the world and a line on the root'() {
			const kit = new $bog_gamestudio_kit
			const plan = $bog_gamestudio_kit_plan_of( kit.item( 'walker' )!, [], [ 'map', 'palette' ], '/ 1.5 -1.5 0' )
			$mol_assert_equal( plan.decls.map( one => one.node ), [ 'Tile', 'Phys' ] )
			$mol_assert_equal( plan.decls[ 1 ].props.bodies, '/' )
			$mol_assert_equal( plan.root, [ 'phys <= Phys' ] )
			$mol_assert_equal( plan.klass, '$bog_gamestudio_kit_walker' )
			$mol_assert_equal( plan.props.pos, '/ 1.5 -1.5 0' )
			$mol_assert_equal( plan.props.input, '<= input' )
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

		'palette can be replaced from outside'() {
			const kit = new $bog_gamestudio_kit
			kit.list([ { id: 'own', title: 'Своё', klass: '$bog_gamengine_sprite', props: {}, world: 'phys' } ])
			$mol_assert_equal( kit.list().length, 1 )
			$mol_assert_equal( kit.item( 'own' )!.title, 'Своё' )
			$mol_assert_equal( kit.item( 'walker' ), null )
		},

		'walker turns input axes into velocity and keeps the reference when it stands'() {
			const walker = new $bog_gamestudio_kit_walker
			const key = new $bog_gamengine_key
			key.bind({ left: [ 'A' ], right: [ 'D' ], up: [ 'W' ], down: [ 'S' ] })
			const input = new $bog_gamengine_input
			input.key( key )
			walker.input( input )
			const still = walker.vel()
			walker.step( 0.1 )
			$mol_assert_equal( walker.vel(), still )
			key.pressed( 'D', true )
			walker.step( 0.1 )
			$mol_assert_equal( [ ... walker.vel() ], [ 3, 0, 0 ] )
			key.pressed( 'W', true )
			walker.step( 0.1 )
			$mol_assert_equal( [ ... walker.vel() ], [ 3, 3, 0 ] )
		},

		'walker shows its speed among props'() {
			const walker = new $bog_gamestudio_kit_walker
			const prop = walker.props().find( one => one.name === 'speed' )!
			$mol_assert_equal( prop.kind, 'number' )
			prop.set( 5 )
			$mol_assert_equal( walker.speed(), 5 )
		},

	})
}
