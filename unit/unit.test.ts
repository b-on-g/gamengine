namespace $ {

	function $bog_legion_unit_pair() {
		const tile = new $bog_gamengine_phys_tile
		tile.map( [
			'#####',
			'#...#',
			'#...#',
			'#...#',
			'#####',
		].join( '\n' ) )
		const grid = new $bog_gamengine_nav_grid
		grid.tile( tile )
		const mine = new $bog_legion_unit
		mine.camp( 0 )
		mine.grid( grid )
		const foe = new $bog_legion_unit
		foe.camp( 1 )
		foe.grid( grid )
		for( const unit of [ mine, foe ] ) {
			const fight = new $bog_gamengine_combat
			fight.owner( unit )
			fight.health_max( 40 )
			fight.rate( 0.7 )
			unit.fight( fight )
		}
		mine.foes( [ foe ] )
		foe.foes( [ mine ] )
		mine.pos( new Float32Array([ 1.5, -1.5, 0 ]) )
		foe.pos( new Float32Array([ 3.5, -3.5, 0 ]) )
		const clock = new $bog_gamengine_clock
		const scene = new $bog_gamengine_scene
		scene.clock( clock )
		scene.kids([ mine, foe ])
		return { tile, grid, mine, foe, clock, scene }
	}

	$mol_test({

		'order sends the unit toward the goal'() {
			const { mine } = $bog_legion_unit_pair()
			mine.mode_set( 'move' )
			mine.aim( 3.5, -3.5 )
			const before = mine.pos()[ 0 ]
			for( let i = 0; i < 10; ++i ) mine.step( 0.05 )
			$mol_assert_ok( mine.pos()[ 0 ] > before )
		},

		'foe in sight becomes the target, out of sight does not'() {
			const { mine, foe } = $bog_legion_unit_pair()
			mine.sight( 10 )
			mine.step( 0.05 )
			$mol_assert_equal( mine.has_foe(), true )
			mine.sight( 1 )
			mine.scan_left = 0
			mine.step( 0.05 )
			$mol_assert_equal( mine.has_foe(), false )
		},

		'attack drains health by the rate and kills'() {
			const { mine, foe, clock } = $bog_legion_unit_pair()
			foe.pos( new Float32Array([ 2, -1.5, 0 ]) )
			mine.damage( 10 )
			mine.fight()!.rate( 1 )
			mine.mode_set( 'attack' )
			for( let i = 0; i < 3; ++i ) {
				clock.time( i )
				mine.step( 0.1 )
			}
			$mol_assert_equal( foe.hp(), 10 )
			clock.time( 3 )
			mine.step( 0.1 )
			$mol_assert_equal( foe.dead(), true )
		},

		'dead unit stops moving'() {
			const { mine } = $bog_legion_unit_pair()
			mine.mode_set( 'move' )
			mine.aim( 3.5, -3.5 )
			mine.die()
			const at = mine.pos()[ 0 ]
			for( let i = 0; i < 10; ++i ) mine.step( 0.05 )
			$mol_assert_equal( mine.pos()[ 0 ], at )
			$mol_assert_equal( mine.shown(), false )
		},

		'reset brings the unit back to full health at the start'() {
			const { mine } = $bog_legion_unit_pair()
			mine.wound( mine.health_max() )
			$mol_assert_equal( mine.dead(), true )
			mine.reset( new Float32Array([ 1.5, -1.5, 0 ]) )
			$mol_assert_equal( mine.dead(), false )
			$mol_assert_equal( mine.hp(), mine.health_max() )
		},

		'patrol picks a goal around home and skips walls'() {
			const { mine, grid } = $bog_legion_unit_pair()
			mine.home( new Float32Array([ 2.5, -2.5, 0 ]) )
			mine.roam( 6 )
			mine.mode_set( 'patrol' )
			mine.step( 0.05 )
			$mol_assert_equal( grid.solid_at( mine.goal[ 0 ], mine.goal[ 1 ] ), false )
		},

	})

}
