namespace $ {

	function walker_test_world() {
		const world = new $bog_gamengine_phys3
		world.add( $bog_gamengine_phys3.shape_plane, new Float32Array([ 0, 1, 0 ]), 0, new Float32Array( 3 ) )
		return world
	}

	function walker_test_box( world: $bog_gamengine_phys3, sx: number, sy: number, sz: number, x: number, y: number, z: number, rot?: Float32Array ) {
		return world.index_of( world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ sx, sy, sz ]), 0, new Float32Array([ x, y, z ]), rot ) )
	}

	function walker_test_key( ... held: string[] ) {
		const key = new $bog_gamengine_key
		key.bind({
			forward: [ 'W' ],
			back: [ 'S' ],
			left: [ 'A' ],
			right: [ 'D' ],
			jump: [ 'Space' ],
		})
		for( const name of held ) key.pressed( name, true )
		return key
	}

	function walker_test_walker( world: $bog_gamengine_phys3, key: $bog_gamengine_key, y = 0.9 ) {
		const walker = new $bog_gamengine_phys3_walker
		walker.phys3( world )
		const input = new $bog_gamengine_input
		input.key( key )
		walker.input( input )
		walker.pos( new Float32Array([ 0, y, 0 ]) )
		return walker
	}

	function walker_test_run( walker: $bog_gamengine_phys3_walker, steps: number ) {
		for( let k = 0; k < steps; ++ k ) walker.step( 1 / 60 )
		return walker.pos()
	}

	function walker_test_around( axis: number[], angle: number ) {
		return $bog_gamengine_vec_quat_from_axis( new Float32Array( 4 ), new Float32Array( axis ), angle )
	}

	function walker_test_near( actual: number, expected: number, eps: number ) {
		if( !( Math.abs( actual - expected ) < eps ) ) $mol_fail( new Error( `${ actual } is not near ${ expected }` ) )
	}

	$mol_test({

		'stands as a capsule body a ray can see'() {
			const world = walker_test_world()
			const walker = walker_test_walker( world, walker_test_key(), 3 )
			walker_test_run( walker, 120 )
			const out = new Float32Array( 7 )
			const i = new $bog_gamengine_phys3_cast().ray(
				world, new Float32Array([ 0, 0.9, 6 ]), new Float32Array([ 0, 0, -1 ]), 20, out,
			)
			$mol_assert_equal( i, world.index_of( walker.handle_last ) )
			walker_test_near( out[ 0 ], 5.7, 0.05 )
		},

		'own body neither blocks nor is pushed by its walk'() {
			const world = walker_test_world()
			const walker = walker_test_walker( world, walker_test_key( 'W' ) )
			const pos = walker_test_run( walker, 60 )
			walker_test_near( pos[ 2 ], -4, 1e-3 )
			const body = world.pos_of( walker.handle_last )!
			walker_test_near( body[ 2 ], pos[ 2 ], 1e-6 )
			walker_test_near( body[ 1 ], pos[ 1 ], 1e-6 )
		},

		'falls and stands on the floor with center at half height'() {
			const walker = walker_test_walker( walker_test_world(), walker_test_key(), 3 )
			const pos = walker_test_run( walker, 120 )
			$mol_assert_ok( walker.grounded )
			walker_test_near( pos[ 1 ], 0.9, 0.01 )
		},

		'walks forward a second at speed'() {
			const walker = walker_test_walker( walker_test_world(), walker_test_key( 'W' ) )
			const pos = walker_test_run( walker, 60 )
			walker_test_near( pos[ 2 ], -4, 1e-3 )
			walker_test_near( pos[ 0 ], 0, 1e-3 )
			$mol_assert_ok( walker.grounded )
		},

		'box wall ahead stops at its face minus radius'() {
			const world = walker_test_world()
			walker_test_box( world, 2, 1, 0.25, 0, 1, -3 )
			const walker = walker_test_walker( world, walker_test_key( 'W' ) )
			const pos = walker_test_run( walker, 90 )
			walker_test_near( pos[ 2 ], -2.45, 0.01 )
			walker_test_near( pos[ 1 ], 0.9, 0.01 )
		},

		'wall at 45 degrees slides along it'() {
			const world = walker_test_world()
			walker_test_box( world, 4, 1, 0.25, 0, 1, -3, walker_test_around( [ 0, 1, 0 ], Math.PI / 4 ) )
			const walker = walker_test_walker( world, walker_test_key( 'W' ) )
			const pos = walker_test_run( walker, 60 )
			$mol_assert_ok( pos[ 0 ] > 0.3 )
			$mol_assert_ok( pos[ 2 ] < -2.5 )
		},

		'step 0.3 high is climbed'() {
			const world = walker_test_world()
			walker_test_box( world, 1, 0.15, 0.5, 0, 0.15, -2 )
			const walker = walker_test_walker( world, walker_test_key( 'W' ) )
			const pos = walker_test_run( walker, 30 )
			$mol_assert_ok( pos[ 2 ] < -1.9 )
			walker_test_near( pos[ 1 ], 1.2, 0.02 )
			$mol_assert_ok( walker.grounded )
		},

		'step 0.5 high blocks'() {
			const world = walker_test_world()
			walker_test_box( world, 1, 0.25, 0.5, 0, 0.25, -2 )
			const walker = walker_test_walker( world, walker_test_key( 'W' ) )
			const pos = walker_test_run( walker, 60 )
			walker_test_near( pos[ 2 ], -1.2, 0.02 )
			walker_test_near( pos[ 1 ], 0.9, 0.01 )
		},

		'jump lifts and returns to the floor'() {
			const key = walker_test_key()
			const walker = walker_test_walker( walker_test_world(), key )
			walker_test_run( walker, 1 )
			key.pressed( 'Space', true )
			walker_test_run( walker, 1 )
			key.pressed( 'Space', false )
			$mol_assert_ok( !walker.grounded )
			$mol_assert_ok( walker_test_run( walker, 20 )[ 1 ] > 1.5 )
			const pos = walker_test_run( walker, 100 )
			$mol_assert_ok( walker.grounded )
			walker_test_near( pos[ 1 ], 0.9, 0.01 )
		},

		'slope of 30 degrees is walked up'() {
			const world = walker_test_world()
			walker_test_box( world, 2, 0.25, 3, 0, 0, -4, walker_test_around( [ 1, 0, 0 ], Math.PI / 6 ) )
			const walker = walker_test_walker( world, walker_test_key( 'W' ) )
			const pos = walker_test_run( walker, 90 )
			$mol_assert_ok( pos[ 1 ] > 1.5 )
			$mol_assert_ok( pos[ 2 ] < -4.5 )
			$mol_assert_ok( walker.grounded )
		},

		'slope of 60 degrees is a wall'() {
			const world = walker_test_world()
			walker_test_box( world, 2, 0.25, 3, 0, 0, -4, walker_test_around( [ 1, 0, 0 ], Math.PI / 3 ) )
			const walker = walker_test_walker( world, walker_test_key( 'W' ) )
			const pos = walker_test_run( walker, 120 )
			walker_test_near( pos[ 1 ], 0.9, 0.02 )
			$mol_assert_ok( pos[ 2 ] > -3.8 )
		},

		'yaw field turns the walk and shows up in rot'() {
			const world = walker_test_world()
			const walker = walker_test_walker( world, walker_test_key( 'W' ) )
			walker.yaw = Math.PI / 2
			const pos = walker_test_run( walker, 60 )
			walker_test_near( walker.rot()[ 1 ], Math.PI / 2, 1e-6 )
			walker_test_near( pos[ 0 ], -4, 1e-3 )
			walker_test_near( pos[ 2 ], 0, 1e-3 )
		},

		'no input and standing keeps pos reference'() {
			const walker = walker_test_walker( walker_test_world(), walker_test_key() )
			walker_test_run( walker, 2 )
			const pos = walker.pos()
			walker.step( 1 / 60 )
			$mol_assert_equal( walker.pos(), pos )
		},

	})

}
