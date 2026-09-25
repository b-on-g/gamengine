namespace $ {

	function world_of() {
		const world = new $bog_gamengine_demo_shooter_phys
		world.place( $bog_gamengine_phys3.shape_plane, new Float32Array([ 0, 1, 0 ]), 0, new Float32Array( 3 ), 0 )
		return world
	}

	function target_at( world: $bog_gamengine_demo_shooter_phys, at: Float32Array ) {
		const target = new $bog_gamengine_demo_shooter_target
		target.phys3( world )
		target.start( at )
		target.index()
		return target
	}

	function player_at( world: $bog_gamengine_demo_shooter_phys, at: Float32Array ) {
		const player = new $bog_gamengine_demo_shooter_player
		player.phys3( world )
		player.pos( at )
		return player
	}

	$mol_test({

		'the body lands where the start says'() {
			const world = world_of()
			const target = target_at( world, new Float32Array([ 3, 0.5, 5 ]) )
			$mol_assert_equal( [ ... target.pos() ], [ 3, 0.5, 5 ] )
		},

		'patrol walks along X until a wall turns it back'() {
			const world = world_of()
			world.place( $bog_gamengine_phys3.shape_box, new Float32Array([ 0.5, 1, 0.5 ]), 0, new Float32Array([ 2, 1, 0 ]), 0 )
			const target = target_at( world, new Float32Array([ 0, 0.9, 0 ]) )
			for( let i = 0; i < 15; ++ i ) target.step( 0.1 )
			$mol_assert_equal( target.pos()[ 0 ] > 0, true )
			$mol_assert_equal( target.way, -1 )
		},

		'patrol never turns back on its own body'() {
			const world = world_of()
			const target = target_at( world, new Float32Array([ 0, 0.9, 0 ]) )
			for( let i = 0; i < 5; ++ i ) target.step( 0.1 )
			$mol_assert_equal( target.way, 1 )
		},

		'a seen player takes damage'() {
			const world = world_of()
			const target = target_at( world, new Float32Array([ 0, 0.9, 0 ]) )
			const player = player_at( world, new Float32Array([ 0, 0.85, -5 ]) )
			target.player( player )
			target.aim( world, 0.016 )
			$mol_assert_equal( target.seen, true )
			$mol_assert_equal( player.health(), 94 )
		},

		'a wall on the line of sight saves the player'() {
			const world = world_of()
			world.place( $bog_gamengine_phys3.shape_box, new Float32Array([ 2, 2, 0.5 ]), 0, new Float32Array([ 0, 1, -2 ]), 0 )
			const target = target_at( world, new Float32Array([ 0, 0.9, 0 ]) )
			const player = player_at( world, new Float32Array([ 0, 0.85, -5 ]) )
			target.player( player )
			target.aim( world, 0.016 )
			$mol_assert_equal( target.seen, false )
			$mol_assert_equal( player.health(), 100 )
		},

		'a player further than the reach is left alone'() {
			const world = world_of()
			const target = target_at( world, new Float32Array([ 0, 0.9, 0 ]) )
			const player = player_at( world, new Float32Array([ 0, 0.85, -40 ]) )
			target.player( player )
			target.aim( world, 0.016 )
			$mol_assert_equal( target.seen, false )
			$mol_assert_equal( player.health(), 100 )
		},

		'the second shot waits for the delay'() {
			const world = world_of()
			const target = target_at( world, new Float32Array([ 0, 0.9, 0 ]) )
			const player = player_at( world, new Float32Array([ 0, 0.85, -5 ]) )
			target.player( player )
			target.aim( world, 0.016 )
			target.aim( world, 0.016 )
			$mol_assert_equal( player.health(), 94 )
		},

		'a dead target goes ghost and leaves the arena after the fade'() {
			const world = world_of()
			const target = target_at( world, new Float32Array([ 0, 0.9, 0 ]) )
			target.hurt( 2, new Float32Array([ 0, 0, -1 ]), 7 )
			$mol_assert_equal( target.alive(), false )
			for( let i = 0; i < 3; ++ i ) target.step( 1 )
			$mol_assert_equal( target.done, true )
			$mol_assert_equal( world.flags[ target.index() ] & $bog_gamengine_phys3.flag_ghost, $bog_gamengine_phys3.flag_ghost )
			$mol_assert_equal( target.pos()[ 1 ], -1000 )
		},

	})

}
