namespace $ {

	function $bog_gamengine_particle_test_emitter( rate: number, life: number ) {
		const emitter = new $bog_gamengine_particle
		emitter.rate( rate )
		emitter.life( new Float32Array([ life, life ]) )
		return emitter
	}

	function $bog_gamengine_particle_test_run( emitter: $bog_gamengine_particle, seconds: number, steps = 60 ) {
		const dt = 1 / steps
		for( let i = 0; i < Math.round( seconds * steps ); ++ i ) emitter.step( dt )
		return emitter.pool().count
	}

	$mol_test({

		'rate 100 for a second with life 2 keeps about 100 alive'() {
			const count = $bog_gamengine_particle_test_run( $bog_gamengine_particle_test_emitter( 100, 2 ), 1 )
			$mol_assert_ok( count >= 95 && count <= 105 )
		},

		'rate 100 for a second with life 0.5 keeps about 50 alive'() {
			const count = $bog_gamengine_particle_test_run( $bog_gamengine_particle_test_emitter( 100, 0.5 ), 1 )
			$mol_assert_ok( count >= 45 && count <= 55 )
		},

		'burst of 20 gives 20 at once'() {
			const emitter = $bog_gamengine_particle_test_emitter( 0, 1 )
			$mol_assert_equal( emitter.burst( 20 ), 20 )
			$mol_assert_equal( emitter.pool().count, 20 )
		},

		'particles die by age so after life count drops to zero'() {
			const emitter = $bog_gamengine_particle_test_emitter( 0, 0.5 )
			emitter.burst( 10 )
			$bog_gamengine_particle_test_run( emitter, 0.6 )
			$mol_assert_equal( emitter.pool().count, 0 )
		},

		'gravity lowers the mean position'() {
			const emitter = $bog_gamengine_particle_test_emitter( 0, 10 )
			emitter.speed( new Float32Array([ 0, 0 ]) )
			emitter.gravity( new Float32Array([ 0, -10, 0 ]) )
			emitter.burst( 50 )
			$bog_gamengine_particle_test_run( emitter, 0.5 )
			const pool = emitter.pool()
			let sum = 0
			for( let i = 0; i < pool.count; ++ i ) sum += pool.pos[ i * 3 + 1 ]
			$mol_assert_ok( sum / pool.count < -1 )
		},

		'color and size are halfway at half life'() {
			const emitter = $bog_gamengine_particle_test_emitter( 0, 1 )
			emitter.speed( new Float32Array([ 0, 0 ]) )
			emitter.color( new Float32Array([ 1, 0, 0, 1, 0, 0, 1, 0 ]) )
			emitter.size( new Float32Array([ 1, 0 ]) )
			emitter.burst( 1 )
			emitter.step( 0.5 )
			const pool = emitter.pool()
			$mol_assert_equal( [ ...pool.tint.subarray( 0, 4 ) ], [ 0.5, 0, 0.5, 0.5 ] )
			$mol_assert_equal( pool.trans[ 0 ], 0.5 )
			$mol_assert_equal( pool.trans[ 5 ], 0.5 )
			$mol_assert_equal( pool.size[ 0 ], 0.5 )
		},

		'aabb covers every particle'() {
			const emitter = $bog_gamengine_particle_test_emitter( 0, 10 )
			emitter.spread( Math.PI )
			emitter.speed( new Float32Array([ 1, 3 ]) )
			emitter.burst( 100 )
			$bog_gamengine_particle_test_run( emitter, 0.5 )
			const pool = emitter.pool()
			for( let i = 0; i < pool.count; ++ i ) {
				for( let k = 0; k < 3; ++ k ) {
					const at = pool.pos[ i * 3 + k ]
					$mol_assert_ok( at >= pool.aabb[ i * 6 + k ] && at <= pool.aabb[ i * 6 + 3 + k ] )
				}
			}
		},

		'count never exceeds cap'() {
			const emitter = $bog_gamengine_particle_test_emitter( 1000, 10 )
			emitter.pool().cap( 10 )
			emitter.burst( 50 )
			$mol_assert_equal( emitter.pool().count, 10 )
			$bog_gamengine_particle_test_run( emitter, 1 )
			$mol_assert_equal( emitter.pool().count, 10 )
		},

		'frames switch layer by age through the atlas'() {
			const atlas = new $bog_gamengine_atlas
			atlas.uris([ 'x/a.png', 'x/b.png' ])
			const emitter = $bog_gamengine_particle_test_emitter( 0, 1 )
			emitter.atlas( atlas )
			emitter.frames([ 'a', 'b' ])
			emitter.burst( 1 )
			emitter.step( 0.25 )
			$mol_assert_equal( emitter.pool().layer[ 0 ], 0 )
			emitter.step( 0.5 )
			$mol_assert_equal( emitter.pool().layer[ 0 ], 1 )
		},

		'local space particles follow the emitter, world space ones stay'() {
			const local = $bog_gamengine_particle_test_emitter( 0, 10 )
			local.world_space( false )
			local.speed( new Float32Array([ 0, 0 ]) )
			local.pos( new Float32Array([ 5, 0, 0 ]) )
			local.burst( 1 )
			local.pos( new Float32Array([ 7, 0, 0 ]) )
			local.step( 0 )
			$mol_assert_equal( local.pool().trans[ 12 ], 7 )
			const world = $bog_gamengine_particle_test_emitter( 0, 10 )
			world.speed( new Float32Array([ 0, 0 ]) )
			world.pos( new Float32Array([ 5, 0, 0 ]) )
			world.burst( 1 )
			world.pos( new Float32Array([ 7, 0, 0 ]) )
			world.step( 0 )
			$mol_assert_equal( world.pool().trans[ 12 ], 5 )
		},

		'billboard takes rotation from the scene camera'() {
			const scene = new $bog_gamengine_scene
			const cam = new $bog_gamengine_cam
			cam.rot( new Float32Array([ 0, Math.PI / 2, 0 ]) )
			scene.cam( cam )
			const emitter = $bog_gamengine_particle_test_emitter( 0, 10 )
			emitter.billboard( true )
			emitter.speed( new Float32Array([ 0, 0 ]) )
			scene.kids([ emitter ])
			emitter.burst( 1 )
			const trans = emitter.pool().trans
			$mol_assert_ok( Math.abs( trans[ 0 ] ) < 1e-6 )
			$mol_assert_equal( Math.round( trans[ 2 ] * 1e6 ) / 1e6, -1 )
			$mol_assert_equal( Math.round( trans[ 5 ] * 1e6 ) / 1e6, 1 )
		},

		'spread zero sends every particle along minus z of the emitter'() {
			const emitter = $bog_gamengine_particle_test_emitter( 0, 10 )
			emitter.speed( new Float32Array([ 2, 2 ]) )
			emitter.burst( 5 )
			const vel = emitter.pool().vel
			for( let i = 0; i < 5; ++ i ) {
				$mol_assert_ok( Math.abs( vel[ i * 3 ] ) < 1e-6 )
				$mol_assert_ok( Math.abs( vel[ i * 3 + 1 ] ) < 1e-6 )
				$mol_assert_ok( Math.abs( vel[ i * 3 + 2 ] + 2 ) < 1e-6 )
			}
		},

	})

}
