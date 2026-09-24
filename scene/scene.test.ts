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

	class $bog_gamengine_scene_generated extends $bog_gamengine_scene {

		extra = new $bog_gamengine_scene_mover

		auto_nodes() {
			return [ this.extra ] as readonly $bog_gamengine_node[]
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
			scene.aspect( 2 )
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
			scene.aspect( 2 )
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
			scene.aspect( 2 )
			scene.step()
			$mol_assert_ok( Math.abs( mover.pos()[ 0 ] - 0.016 ) < 1e-9 )
		},

		'gravity of phys set by code lives through two frames'( $ ) {
			$.$mol_state_time = $bog_gamengine_scene_time_mock
			const body = new $bog_gamengine_phys_body
			const phys = new $bog_gamengine_phys
			phys.bodies([ body ])
			phys.gravity( new Float32Array([ 0, -10 ]) )
			const scene = new $bog_gamengine_scene
			scene.$ = $
			scene.phys( phys )
			$bog_gamengine_scene_time_mock.stamp( 0 )
			scene.step()
			scene.aspect( 2 )
			scene.step()
			$mol_wire_fiber.sync()
			$bog_gamengine_scene_time_mock.stamp( 16 )
			scene.step()
			$bog_gamengine_scene_time_mock.stamp( 32 )
			scene.step()
			$mol_assert_equal( [ ... phys.gravity() ], [ 0, -10 ] )
			$mol_assert_ok( body.vel()[ 1 ] < -0.3 )
		},

		'scene steps phys3 body by its velocity'( $ ) {
			$.$mol_state_time = $bog_gamengine_scene_time_mock
			const world = new $bog_gamengine_phys3
			world.gravity( new Float32Array( 3 ) )
			const i = world.index_of( world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ 0.5, 0.5, 0.5 ]), 1, new Float32Array( 3 ) ) )
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

		'auto batches group scene nodes by shader, shape and atlas'() {
			const atlas = new $bog_gamengine_atlas
			atlas.uris([ 'bog/gamengine/demo/atlas/hero.png' ])
			const hero = new $bog_gamengine_sprite
			hero.atlas( atlas )
			const coin = new $bog_gamengine_sprite
			coin.atlas( atlas )
			const mesh = new $bog_gamengine_mesh
			mesh.atlas( atlas )
			const scene = new $bog_gamengine_scene
			scene.kids([ hero, coin, mesh ])
			const batches = scene.auto_batches()
			$mol_assert_equal( batches.length, 2 )
			$mol_assert_equal( batches[ 0 ].nodes(), [ hero, coin ] )
			$mol_assert_equal( batches[ 1 ].nodes(), [ mesh ] )
			$mol_assert_ok( batches[ 0 ].shader() instanceof $bog_gamengine_shader_sprite )
			$mol_assert_ok( batches[ 0 ].shape() instanceof $bog_gamengine_shape_quad )
			$mol_assert_ok( batches[ 1 ].shader() instanceof $bog_gamengine_shader_solid )
			$mol_assert_equal( batches[ 1 ].shape(), mesh.shape() )
			$mol_assert_equal( batches[ 1 ].atlas(), atlas )
		},

		'batches fall back to auto batches and explicit batches win'() {
			const sprite = new $bog_gamengine_sprite
			const scene = new $bog_gamengine_scene
			scene.kids([ sprite ])
			$mol_assert_equal( scene.batches(), scene.auto_batches() )
			$mol_assert_equal( scene.batches().length, 1 )
			const own = new $bog_gamengine_batch
			scene.batches([ own ])
			$mol_assert_equal( scene.batches(), [ own ] )
		},

		'mesh without atlas gets the plain solid shader'() {
			const mesh = new $bog_gamengine_mesh
			const scene = new $bog_gamengine_scene
			scene.kids([ mesh ])
			const batches = scene.auto_batches()
			$mol_assert_equal( batches.length, 1 )
			$mol_assert_ok( batches[ 0 ].shader() instanceof $bog_gamengine_shader_solid_plain )
			$mol_assert_equal( batches[ 0 ].atlas(), null )
		},

		'node shader set by hand takes its own batch'() {
			const atlas = new $bog_gamengine_atlas
			atlas.uris([ 'bog/gamengine/demo/atlas/hero.png' ])
			const plain = new $bog_gamengine_sprite
			plain.atlas( atlas )
			const own = new $bog_gamengine_sprite
			own.atlas( atlas )
			own.shader( new $bog_gamengine_shader_flat )
			const scene = new $bog_gamengine_scene
			scene.kids([ plain, own ])
			const batches = scene.auto_batches()
			$mol_assert_equal( batches.length, 2 )
			$mol_assert_equal( batches[ 1 ].shader(), own.shader() )
		},

		'source node gets its own batch without uv'() {
			const atlas = new $bog_gamengine_atlas
			atlas.uris([ 'bog/gamengine/demo/atlas/hero.png' ])
			const spark = new $bog_gamengine_particle
			spark.atlas( atlas )
			const scene = new $bog_gamengine_scene
			scene.kids([ spark ])
			const batches = scene.auto_batches()
			$mol_assert_equal( batches.length, 1 )
			$mol_assert_equal( batches[ 0 ].source(), spark.pool() )
			$mol_assert_equal( batches[ 0 ].nodes(), [] )
			$mol_assert_equal( batches[ 0 ].atlas(), atlas )
			$mol_assert_ok( batches[ 0 ].shader() instanceof $bog_gamengine_shader_sprite )
		},

		'auto batches keep the order the nodes are listed in'() {
			const atlas = new $bog_gamengine_atlas
			atlas.uris([ 'bog/gamengine/demo/atlas/hero.png' ])
			const map = new $bog_gamengine_tilemap
			map.atlas( atlas )
			const hero = new $bog_gamengine_sprite
			hero.atlas( atlas )
			const spark = new $bog_gamengine_particle
			spark.atlas( atlas )
			const scene = new $bog_gamengine_scene
			scene.kids([ map, hero, spark ])
			const batches = scene.auto_batches()
			$mol_assert_equal( batches.length, 3 )
			$mol_assert_equal( batches[ 0 ].source(), map.pool() )
			$mol_assert_equal( batches[ 1 ].nodes(), [ hero ] )
			$mol_assert_equal( batches[ 2 ].source(), spark.pool() )
		},

		'nodes without layer and uv stay out of auto batches'() {
			const bare = new $bog_gamengine_node
			const scene = new $bog_gamengine_scene
			scene.kids([ bare ])
			$mol_assert_equal( scene.auto_batches().length, 0 )
		},

		'auto batch of the same group survives a nodes recompute'() {
			const atlas = new $bog_gamengine_atlas
			atlas.uris([ 'bog/gamengine/demo/atlas/hero.png' ])
			const first = new $bog_gamengine_sprite
			first.atlas( atlas )
			const second = new $bog_gamengine_sprite
			second.atlas( atlas )
			const scene = new $bog_gamengine_scene
			scene.kids([ first ])
			const before = scene.auto_batches()[ 0 ]
			scene.kids([ first, second ])
			const after = scene.auto_batches()[ 0 ]
			$mol_assert_equal( before, after )
			$mol_assert_equal( after.nodes(), [ first, second ] )
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

		'node in scene kids sees scene, its input and clock'() {
			const a = new $bog_gamengine_node
			const scene = new $bog_gamengine_scene
			const input = new $bog_gamengine_input
			scene.input( input )
			scene.kids([ a ])
			$mol_assert_equal( a.scene(), scene )
			$mol_assert_equal( a.input(), input )
			$mol_assert_equal( a.clock(), scene.clock() )
		},

		'generated nodes live alongside the tree ones'( $ ) {
			$.$mol_state_time = $bog_gamengine_scene_time_mock
			const kid = new $bog_gamengine_scene_mover
			const scene = new $bog_gamengine_scene_generated
			scene.$ = $
			scene.kids([ kid ])
			$mol_assert_equal( scene.nodes(), [ kid, scene.extra ] )
			$bog_gamengine_scene_time_mock.stamp( 0 )
			scene.step()
			$bog_gamengine_scene_time_mock.stamp( 16 )
			scene.step()
			$mol_assert_ok( Math.abs( kid.pos()[ 0 ] - 0.016 ) < 1e-9 )
			$mol_assert_ok( Math.abs( scene.extra.pos()[ 0 ] - 0.016 ) < 1e-9 )
			$mol_assert_equal( kid.parent(), scene )
			$mol_assert_equal( scene.extra.parent(), scene )
		},

		'auto batches take generated nodes too'() {
			const atlas = new $bog_gamengine_atlas
			atlas.uris([ 'bog/gamengine/demo/atlas/hero.png' ])
			const sprite = new $bog_gamengine_sprite
			sprite.atlas( atlas )
			const scene = new $bog_gamengine_scene
			scene.auto_nodes([ sprite ])
			const batches = scene.auto_batches()
			$mol_assert_equal( batches.length, 1 )
			$mol_assert_equal( batches[ 0 ].nodes(), [ sprite ] )
		},

		'grandchild of overridden kids sees scene after nodes walk'() {
			const a = new $bog_gamengine_scene_named
			const b = new $bog_gamengine_node
			a.kids([ b ])
			const scene = new $bog_gamengine_scene
			scene.kids = ()=> [ a ]
			$mol_assert_equal( a.scene(), null )
			scene.nodes()
			$mol_assert_equal( a.scene(), scene )
			$mol_assert_equal( b.scene(), scene )
			$mol_assert_equal( b.clock(), scene.clock() )
		},

	})

}
