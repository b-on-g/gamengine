namespace $ {
	$mol_test({

		'ten agents get ten distinct passable goals around a wall'() {

			const tile = new $bog_gamengine_phys_tile
			tile.map([
				'####################',
				'#..................#',
				'#..................#',
				'#..................#',
				'#........####......#',
				'#........####......#',
				'#..................#',
				'#..................#',
				'#..................#',
				'####################',
			].join( '\n' ) )

			const grid = new $bog_gamengine_nav_grid
			grid.tile( tile )

			const squad = new $bog_gamengine_nav_squad
			const agents = [] as $bog_gamengine_nav_agent[]
			for( let i = 0; i < 10; ++i ) agents.push( new $bog_gamengine_nav_agent )

			squad.order( agents, 10.5, -4.5, grid )
			$mol_assert_equal( squad.count, 10 )

			for( let i = 0; i < agents.length; ++i ) {
				const goal = agents[ i ].target()!
				$mol_assert_not( grid.solid_at( goal[ 0 ], goal[ 1 ] ) )
				for( let k = 0; k < i; ++k ) {
					const other = agents[ k ].target()!
					$mol_assert_ok( Math.hypot( goal[ 0 ] - other[ 0 ], goal[ 1 ] - other[ 1 ] ) > 0.1 )
				}
			}

		},

		'second order allocates nothing'() {
			const squad = new $bog_gamengine_nav_squad
			const agents = [] as $bog_gamengine_nav_agent[]
			for( let i = 0; i < 10; ++i ) agents.push( new $bog_gamengine_nav_agent )
			squad.order( agents, 0, 0 )
			const spots = squad.spots
			const first = agents[ 0 ].target()![ 0 ]
			squad.order( agents, 5, 5 )
			$mol_assert_equal( squad.spots, spots )
			$mol_assert_ok( Math.abs( agents[ 0 ].target()![ 0 ] - first - 5 ) < 1e-6 )
		},

	})
}
