namespace $ {

	function box( world: $bog_gamengine_phys3, mass: number, x: number, y: number, z: number ) {
		return world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ 0.5, 0.5, 0.5 ]), mass, new Float32Array([ x, y, z ]) )
	}

	$mol_test({

		'add two bodies gives indices 0 and 1 and count 2'() {
			const world = new $bog_gamengine_phys3
			$mol_assert_equal( box( world, 1, 0, 0, 0 ), 0 )
			$mol_assert_equal( box( world, 1, 0, 0, 0 ), 1 )
			$mol_assert_equal( world.count, 2 )
		},

		'remove first moves second into its place and returns 1'() {
			const world = new $bog_gamengine_phys3
			box( world, 1, 1, 1, 1 )
			box( world, 2, 5, 6, 7 )
			$mol_assert_equal( world.remove( 0 ), 1 )
			$mol_assert_equal( world.count, 1 )
			$mol_assert_equal( [ ...world.pos.subarray( 0, 3 ) ], [ 5, 6, 7 ] )
			$mol_assert_equal( world.mass[ 0 ], 2 )
			$mol_assert_equal( [ ...world.trans.subarray( 12, 15 ) ], [ 5, 6, 7 ] )
		},

		'body with mass falls about 4.9 in one second'() {
			const world = new $bog_gamengine_phys3
			const i = box( world, 1, 0, 0, 0 )
			for( let k = 0; k < 60; ++ k ) world.step( 1 / 60 )
			$mol_assert_ok( Math.abs( world.pos[ i * 3 + 1 ] + 4.9 ) < 0.2 )
		},

		'body without mass stays still under gravity'() {
			const world = new $bog_gamengine_phys3
			const i = box( world, 0, 1, 2, 3 )
			for( let k = 0; k < 60; ++ k ) world.step( 1 / 60 )
			$mol_assert_equal( [ ...world.pos.subarray( i * 3, i * 3 + 3 ) ], [ 1, 2, 3 ] )
			$mol_assert_equal( world.inv_mass[ i ], 0 )
		},

		'trans of body at (1,2,3) keeps translation in 12 to 14'() {
			const world = new $bog_gamengine_phys3
			const i = box( world, 1, 1, 2, 3 )
			$mol_assert_equal( [ ...world.trans.subarray( i * 16 + 12, i * 16 + 15 ) ], [ 1, 2, 3 ] )
		},

		'trans scales unit box to full size'() {
			const world = new $bog_gamengine_phys3
			const i = world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ 1, 2, 3 ]), 1, new Float32Array( 3 ) )
			$mol_assert_equal( world.trans[ i * 16 ], 2 )
			$mol_assert_equal( world.trans[ i * 16 + 5 ], 4 )
			$mol_assert_equal( world.trans[ i * 16 + 10 ], 6 )
		},

		'angular velocity turns body a quarter around Y in one second'() {
			const world = new $bog_gamengine_phys3
			const i = box( world, 1, 0, 0, 0 )
			world.gravity( new Float32Array( 3 ) )
			world.ang[ i * 3 + 1 ] = Math.PI / 2
			for( let k = 0; k < 60; ++ k ) world.step( 1 / 60 )
			const out = $bog_gamengine_vec_quat_rotate( new Float32Array( 3 ), world.rot.subarray( i * 4, i * 4 + 4 ), new Float32Array([ 1, 0, 0 ]) )
			$mol_assert_ok( Math.abs( out[ 2 ] + 1 ) < 1e-3 )
		},

		'sleeping body is skipped'() {
			const world = new $bog_gamengine_phys3
			const i = box( world, 1, 0, 0, 0 )
			world.flags[ i ] |= $bog_gamengine_phys3.flag_sleep
			world.step( 1 )
			$mol_assert_equal( world.pos[ i * 3 + 1 ], 0 )
		},

		'growing cap keeps data'() {
			const world = new $bog_gamengine_phys3
			for( let k = 0; k < 20; ++ k ) box( world, k + 1, k, 0, 0 )
			$mol_assert_equal( world.cap, 32 )
			$mol_assert_equal( world.pos[ 3 * 3 ], 3 )
			$mol_assert_equal( world.mass[ 17 ], 18 )
			$mol_assert_equal( world.rot[ 17 * 4 + 3 ], 1 )
			$mol_assert_equal( world.trans[ 17 * 16 + 12 ], 17 )
		},

		'sphere and box inverse inertia follow standard formulas'() {
			const world = new $bog_gamengine_phys3
			const s = world.add( $bog_gamengine_phys3.shape_sphere, new Float32Array([ 2, 0, 0 ]), 5, new Float32Array( 3 ) )
			$mol_assert_ok( Math.abs( world.inv_inertia[ s * 3 ] - 1 / ( 0.4 * 5 * 4 ) ) < 1e-6 )
			const b = world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ 1, 2, 3 ]), 3, new Float32Array( 3 ) )
			$mol_assert_ok( Math.abs( world.inv_inertia[ b * 3 ] - 1 / ( 3 / 12 * ( 16 + 36 ) ) ) < 1e-6 )
		},

		'hull_points stores points with offset and count per body'() {
			const world = new $bog_gamengine_phys3
			const a = world.add( $bog_gamengine_phys3.shape_hull, new Float32Array( 3 ), 1, new Float32Array( 3 ) )
			const b = world.add( $bog_gamengine_phys3.shape_hull, new Float32Array( 3 ), 1, new Float32Array( 3 ) )
			world.hull_points( a, new Float32Array([ 0, 0, 0, 1, 0, 0 ]) )
			world.hull_points( b, new Float32Array([ 0, 1, 0, 0, 0, 1, 1, 1, 1 ]) )
			$mol_assert_equal( world.hull_off[ b ], 6 )
			$mol_assert_equal( world.hull_count[ b ], 3 )
			$mol_assert_equal( [ ...world.hull.subarray( 6, 9 ) ], [ 0, 1, 0 ] )
		},

	})

}
