namespace $ {

	$mol_test({

		'agents made together replan on different frames, not all on one'() {
			const tile = new $bog_gamengine_phys_tile
			tile.map( '#######\n#.....#\n#.....#\n#.....#\n#######' )
			const grid = new $bog_gamengine_nav_grid
			grid.tile( tile )
			const proto = $bog_gamengine_nav_agent.prototype
			const real = proto.plan
			let plans = 0
			const agents = [] as $bog_gamengine_nav_agent[]
			for( let i = 0; i < 30; ++ i ) {
				const one = new $bog_gamengine_nav_agent
				one.grid( grid )
				one.pos( new Float32Array([ 1.5, - 1.5, 0 ]) )
				one.target( new Float32Array([ 5.5, - 3.5, 0 ]) )
				agents.push( one )
			}
			for( const one of agents ) one.step( 1 / 60 )
			Object.assign( proto, { plan( pos: Float32Array, to: Float32Array ) {
				++ plans
				return real.call( this, pos, to )
			} } )
			let worst = 0
			let frames = 0
			for( let f = 0; f < 60; ++ f ) {
				plans = 0
				for( const one of agents ) one.step( 1 / 60 )
				if( plans > worst ) worst = plans
				if( plans > 0 ) ++ frames
			}
			Object.assign( proto, { plan: real } )
			$mol_assert_ok( worst < agents.length / 2 )
			$mol_assert_ok( frames > 10 )
		},

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

		'goal of an agent is set through props and survives a snapshot'() {

			const agent = new $bog_gamengine_nav_agent
			const prop = ( name: string )=> agent.props().find( one => one.name === name )!

			$mol_assert_equal( prop( 'target' ).kind, 'point' )
			$mol_assert_equal( prop( 'aimed' ).kind, 'flag' )
			$mol_assert_equal( prop( 'aimed' ).get(), false )

			prop( 'target' ).set( new Float32Array([ 4.5, -2.5, 0 ]) )
			$mol_assert_equal( [ ... prop( 'target' ).get() as Float32Array ], [ 4.5, -2.5, 0 ] )
			$mol_assert_equal( prop( 'aimed' ).get(), true )
			$mol_assert_equal( agent.target(), agent.goal )

			const snap = [ new Float32Array( prop( 'target' ).get() as Float32Array ), prop( 'aimed' ).get() ]
			agent.aim( 9, 9 )
			prop( 'target' ).set( snap[ 0 ] as Float32Array )
			prop( 'aimed' ).set( snap[ 1 ] )
			$mol_assert_equal( [ ... agent.goal ], [ 4.5, -2.5, 0 ] )
			$mol_assert_equal( agent.goal_on, true )

		},

		'restored snapshot of an agent without a goal leaves it without a goal'() {
			const agent = new $bog_gamengine_nav_agent
			const prop = ( name: string )=> agent.props().find( one => one.name === name )!
			const snap = [ new Float32Array( prop( 'target' ).get() as Float32Array ), prop( 'aimed' ).get() ]
			agent.aim( 3, -3 )
			$mol_assert_equal( agent.goal_on, true )
			prop( 'target' ).set( snap[ 0 ] as Float32Array )
			prop( 'aimed' ).set( snap[ 1 ] )
			$mol_assert_equal( agent.goal_on, false )
			$mol_assert_equal( agent.target(), null )
		},

		'neighbours of an agent are a property of node kind'() {
			const agent = new $bog_gamengine_nav_agent
			const mate = new $bog_gamengine_nav_agent
			const prop = agent.props().find( one => one.name === 'others' )!
			$mol_assert_equal( prop.kind, 'nodes' )
			$mol_assert_equal( ( prop.get() as readonly $bog_gamengine_node[] ).length, 0 )
			prop.set([ mate ])
			$mol_assert_equal( agent.others(), [ mate ] )
			$mol_assert_equal( ( prop.get() as readonly $bog_gamengine_node[] )[ 0 ], mate )
		},

	})

}
