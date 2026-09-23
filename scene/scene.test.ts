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

	$mol_test({

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

		'nodes lists tree depth first with parent before kids'() {
			const a = new $bog_gamengine_scene_named
			const b = new $bog_gamengine_scene_named
			const c = new $bog_gamengine_scene_named
			a.kids([ b ])
			const scene = new $bog_gamengine_scene
			scene.kids = ()=> [ a, c ]
			$mol_assert_equal( scene.nodes(), [ a, b, c ] )
		},

	})

}
