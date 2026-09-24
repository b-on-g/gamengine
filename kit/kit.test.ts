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

		'palette can be replaced from outside'() {
			const kit = new $bog_gamestudio_kit
			kit.list([ { id: 'own', title: 'Своё', klass: '$bog_gamengine_sprite', props: {}, world: 'phys' } ])
			$mol_assert_equal( kit.list().length, 1 )
			$mol_assert_equal( kit.item( 'own' )!.title, 'Своё' )
			$mol_assert_equal( kit.item( 'walker' ), null )
		},

	})
}
