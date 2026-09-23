namespace $ {

	class $bog_gamengine_scene_time_mock extends $mol_state_time {

		@ $mol_mem
		static stamp( next = 0 ) {
			return next
		}

		static now( precision: number ) {
			return this.stamp()
		}

	}

	class $bog_gamengine_scene_mover extends $bog_gamengine_node {

		step( dt: number ) {
			const pos = this.pos()
			this.pos( new Float32Array([ pos[ 0 ] + dt, pos[ 1 ], pos[ 2 ] ]) )
		}

	}

	class $bog_gamengine_scene_named extends $bog_gamengine_node {

		@ $mol_mem
		kids( next = [] as readonly $bog_gamengine_node[] ) {
			return next
		}

	}

	class $bog_gamengine_scene_test_cam extends $bog_gamengine_cam {
		proj( aspect: number ) {
			return $mol_3d_mat4.perspective( Math.PI / 3, aspect, 0.1, 100 )
		}
	}

	class $bog_gamengine_scene_input_mock extends $bog_gamengine_input {

		polls = 0

		poll() {
			++ this.polls
		}

	}

	$mol_test({

		'phys set by code survives a recompute within the frame'( $ ) {
			$.$mol_state_time = $bog_gamengine_scene_time_mock
			const body = new $bog_gamengine_phys_body
			body.vel( new Float32Array([ 1, 0, 0 ]) )
			const phys = new $bog_gamengine_phys
			phys.bodies([ body ])
			const scene = new $bog_gamengine_scene
			scene.$ = $
			scene.phys( phys )
			$bog_gamengine_scene_time_mock.stamp( 0 )
			scene.step()
			scene.batches([])
			scene.step()
			$bog_gamengine_scene_time_mock.stamp( 16 )
			scene.step()
			$bog_gamengine_scene_time_mock.stamp( 32 )
			scene.step()
			$mol_assert_ok( Math.abs( body.pos()[ 0 ] - 0.032 ) < 1e-6 )
		},

		'scene polls input once per frame'( $ ) {
			$.$mol_state_time = $bog_gamengine_scene_time_mock
			const input = new $bog_gamengine_scene_input_mock
			const scene = new $bog_gamengine_scene
			scene.$ = $
			scene.input( input )
			$bog_gamengine_scene_time_mock.stamp( 0 )
			scene.step()
			$bog_gamengine_scene_time_mock.stamp( 16 )
			scene.step()
			scene.batches([])
			scene.step()
			$mol_assert_equal( input.polls, 2 )
		},

		'three ticks of 16 ms move node by 0.048'( $ ) {
			$.$mol_state_time = $bog_gamengine_scene_time_mock
			const mover = new $bog_gamengine_scene_mover
			const scene = new $bog_gamengine_scene
			scene.$ = $
			scene.kids = ()=> [ mover ]
			$bog_gamengine_scene_time_mock.stamp( 0 )
			scene.step()
			$bog_gamengine_scene_time_mock.stamp( 16 )
			scene.step()
			$bog_gamengine_scene_time_mock.stamp( 32 )
			scene.step()
			$bog_gamengine_scene_time_mock.stamp( 48 )
			scene.step()
			$mol_assert_ok( Math.abs( mover.pos()[ 0 ] - 0.048 ) < 1e-9 )
		},

		'scene steps phys body by its velocity'( $ ) {
			$.$mol_state_time = $bog_gamengine_scene_time_mock
			const body = new $bog_gamengine_phys_body
			body.vel( new Float32Array([ 1, 0, 0 ]) )
			const phys = new $bog_gamengine_phys
			phys.bodies([ body ])
			const scene = new $bog_gamengine_scene
			scene.$ = $
			scene.phys( phys )
			$bog_gamengine_scene_time_mock.stamp( 0 )
			scene.step()
			$bog_gamengine_scene_time_mock.stamp( 16 )
			scene.step()
			$mol_assert_ok( Math.abs( body.pos()[ 0 ] - 0.016 ) < 1e-6 )
		},

		'step recomputed within one frame moves node once'( $ ) {
			$.$mol_state_time = $bog_gamengine_scene_time_mock
			const mover = new $bog_gamengine_scene_mover
			const scene = new $bog_gamengine_scene
			scene.$ = $
			scene.kids = ()=> [ mover ]
			$bog_gamengine_scene_time_mock.stamp( 0 )
			scene.step()
			$bog_gamengine_scene_time_mock.stamp( 16 )
			scene.step()
			scene.batches([])
			scene.step()
			$mol_assert_ok( Math.abs( mover.pos()[ 0 ] - 0.016 ) < 1e-9 )
		},

		'scene steps phys3 body by its velocity'( $ ) {
			$.$mol_state_time = $bog_gamengine_scene_time_mock
			const world = new $bog_gamengine_phys3
			world.gravity( new Float32Array( 3 ) )
			const i = world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ 0.5, 0.5, 0.5 ]), 1, new Float32Array( 3 ) )
			world.vel[ i * 3 ] = 1
			const scene = new $bog_gamengine_scene
			scene.$ = $
			scene.phys3( world )
			$bog_gamengine_scene_time_mock.stamp( 0 )
			scene.step()
			$bog_gamengine_scene_time_mock.stamp( 17 )
			scene.step()
			$mol_assert_ok( Math.abs( world.pos[ i * 3 ] - world.timestep ) < 1e-6 )
		},

		'cam is null by default and can be set'() {
			const scene = new $bog_gamengine_scene
			$mol_assert_equal( scene.cam(), null )
			const cam = new $bog_gamengine_scene_test_cam
			scene.cam( cam )
			$mol_assert_equal( scene.cam(), cam )
		},

		'scene with cam drops mesh behind it from batch count'( $ ) {
			$.$mol_state_time = $bog_gamengine_scene_time_mock
			const front = new $bog_gamengine_mesh
			front.pos( new Float32Array([ 0, 0, -5 ]) )
			const behind = new $bog_gamengine_mesh
			behind.pos( new Float32Array([ 0, 0, 5 ]) )
			const batch = new $bog_gamengine_batch
			batch.nodes([ front, behind ])
			const scene = new $bog_gamengine_scene
			scene.$ = $
			scene.batches([ batch ])
			$bog_gamengine_scene_time_mock.stamp( 0 )
			scene.step()
			$mol_assert_equal( batch.count, 2 )
			scene.cam( new $bog_gamengine_scene_test_cam )
			scene.step()
			$mol_assert_equal( batch.count, 1 )
		},

		'nodes lists tree depth first with parent before kids'() {
			const a = new $bog_gamengine_scene_named
			const b = new $bog_gamengine_scene_named
			const c = new $bog_gamengine_scene_named
			a.kids([ b ])
			const scene = new $bog_gamengine_scene
			scene.kids = ()=> [ a, c ]
			$mol_assert_equal( scene.nodes(), [ a, b, c ] )
		},

		'nodes see kids given through setter'() {
			const a = new $bog_gamengine_node
			const b = new $bog_gamengine_node
			const scene = new $bog_gamengine_scene
			scene.kids([ a, b ])
			$mol_assert_equal( scene.nodes(), [ a, b ] )
		},

	})

}
