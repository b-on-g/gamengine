namespace $ {

	function world_of() {
		const world = new $bog_shooter_phys
		world.place( $bog_gamengine_phys3.shape_plane, new Float32Array([ 0, 1, 0 ]), 0, new Float32Array( 3 ), 0 )
		return world
	}

	function player_of( world: $bog_shooter_phys ) {
		const player = new $bog_shooter_player
		player.phys3( world )
		player.pos( new Float32Array([ 0, 0.85, 0 ]) )
		return player
	}

	function target_of( world: $bog_shooter_phys, at: Float32Array ) {
		const target = new $bog_shooter_target
		target.phys3( world )
		target.start( at )
		target.index()
		return target
	}

	$mol_test({

		'aim looks along minus Z while the head is straight'() {
			const player = player_of( world_of() )
			const dir = player.aim()
			$mol_assert_equal( Math.abs( dir[ 0 ] ) < 1e-6, true )
			$mol_assert_equal( dir[ 1 ], 0 )
			$mol_assert_equal( dir[ 2 ], -1 )
		},

		'quarter turn left aims along minus X'() {
			const player = player_of( world_of() )
			player.yaw( Math.PI / 2 )
			const dir = player.aim()
			$mol_assert_equal( dir[ 0 ].toFixed( 4 ), '-1.0000' )
			$mol_assert_equal( Math.abs( dir[ 2 ] ) < 1e-6, true )
		},

		'eye sits above the capsule center by half the height less the drop'() {
			const player = player_of( world_of() )
			const eye = player.eye()
			$mol_assert_equal( eye[ 1 ].toFixed( 2 ), ( 0.85 + player.height() / 2 - 0.15 ).toFixed( 2 ) )
		},

		'a shot into a target ahead takes its health down'() {
			const world = world_of()
			const player = player_of( world )
			const target = target_of( world, new Float32Array([ 0, 0.9, -3 ]) )
			player.targets([ target ])
			$mol_assert_equal( player.fire(), target )
			$mol_assert_equal( target.health(), 1 )
		},

		'a wall between the eye and the target eats the shot'() {
			const world = world_of()
			const player = player_of( world )
			world.place( $bog_gamengine_phys3.shape_box, new Float32Array([ 2, 2, 0.5 ]), 0, new Float32Array([ 0, 1, -1.5 ]), 0 )
			const target = target_of( world, new Float32Array([ 0, 0.9, -3 ]) )
			player.targets([ target ])
			$mol_assert_equal( player.fire(), null )
			$mol_assert_equal( target.health(), 2 )
		},

		'the next shot waits for the delay'() {
			const world = world_of()
			const player = player_of( world )
			const target = target_of( world, new Float32Array([ 0, 0.9, -3 ]) )
			player.targets([ target ])
			player.fire()
			$mol_assert_equal( player.fire(), null )
			$mol_assert_equal( target.health(), 1 )
		},

		'the last shot pushes the target and makes it fall'() {
			const world = world_of()
			const player = player_of( world )
			const target = target_of( world, new Float32Array([ 0, 0.9, -3 ]) )
			player.targets([ target ])
			for( let i = 0; i < 2; ++ i ) {
				player.wait = 0
				player.fire()
			}
			$mol_assert_equal( target.alive(), false )
			$mol_assert_equal( world.inv_mass[ target.index() ] > 0, true )
			$mol_assert_equal( world.vel[ target.index() * 3 + 2 ] < 0, true )
		},

		'damage taken lands in health and ends at zero'() {
			const player = player_of( world_of() )
			player.hurt( 40 )
			$mol_assert_equal( player.health(), 60 )
			player.hurt( 100 )
			$mol_assert_equal( player.health(), 0 )
			$mol_assert_equal( player.dead(), true )
		},

	})

}
