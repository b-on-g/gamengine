namespace $ {

	$mol_test({

		'agent reaches target behind wall within 3 seconds never entering a wall'() {
			const tile = new $bog_gamengine_phys_tile
			tile.map( '#######\n#..#..#\n#..#..#\n#.....#\n#######' )
			const grid = new $bog_gamengine_nav_grid
			grid.tile( tile )
			const agent = new $bog_gamengine_nav_agent
			agent.grid( grid )
			agent.pos( new Float32Array([ 1.5, -1.5, 0 ]) )
			const target = new Float32Array([ 5.5, -1.5, 0 ])
			agent.target( target )
			for( let i = 0; i < 180; ++i ) {
				agent.step( 1 / 60 )
				const pos = agent.pos()
				$mol_assert_not( tile.solid_at( pos[ 0 ], pos[ 1 ] ) )
			}
			const pos = agent.pos()
			$mol_assert_ok( Math.hypot( pos[ 0 ] - target[ 0 ], pos[ 1 ] - target[ 1 ] ) < agent.radius() )
		},

		'goal set once keeps moving the agent on the next frame'() {
			const tile = new $bog_gamengine_phys_tile
			tile.map( '#####\n#...#\n#...#\n#...#\n#####' )
			const grid = new $bog_gamengine_nav_grid
			grid.tile( tile )
			const agent = new $bog_gamengine_nav_agent
			agent.grid( grid )
			agent.pos( new Float32Array([ 1.5, -1.5, 0 ]) )
			agent.aim( 3.5, -1.5 )
			agent.step( 1 / 60 )
			const first = agent.pos()[ 0 ]
			agent.step( 1 / 60 )
			$mol_assert_ok( first > 1.5 )
			$mol_assert_ok( agent.pos()[ 0 ] > first )
			$mol_assert_equal( agent.target(), agent.goal )
		},

		'stop drops the goal and the route'() {
			const agent = new $bog_gamengine_nav_agent
			agent.aim( 3.5, -1.5 )
			agent.stop()
			$mol_assert_equal( agent.target(), null )
			$mol_assert_equal( agent.path_count(), 0 )
		},

		'agents push each other apart'() {
			const tile = new $bog_gamengine_phys_tile
			tile.map( '#####\n#...#\n#...#\n#...#\n#####' )
			const grid = new $bog_gamengine_nav_grid
			grid.tile( tile )
			const a = new $bog_gamengine_nav_agent
			const b = new $bog_gamengine_nav_agent
			a.grid( grid )
			b.grid( grid )
			a.pos( new Float32Array([ 2.4, -2.5, 0 ]) )
			b.pos( new Float32Array([ 2.6, -2.5, 0 ]) )
			a.others([ a, b ])
			b.others([ a, b ])
			a.target( new Float32Array([ 2.5, -2.5, 0 ]) )
			b.target( new Float32Array([ 2.5, -2.5, 0 ]) )
			for( let i = 0; i < 30; ++i ) {
				a.step( 1 / 60 )
				b.step( 1 / 60 )
			}
			$mol_assert_ok( b.pos()[ 0 ] - a.pos()[ 0 ] > 0.2 )
		},

	})

}
