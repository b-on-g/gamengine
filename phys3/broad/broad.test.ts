namespace $ {

	function box( world: $bog_gamengine_phys3, mass: number, x: number, y: number, z: number, rot?: Float32Array ) {
		return world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ 0.5, 0.5, 0.5 ]), mass, new Float32Array([ x, y, z ]), rot )
	}

	function sphere( world: $bog_gamengine_phys3, r: number, x: number ) {
		return world.add( $bog_gamengine_phys3.shape_sphere, new Float32Array([ r, 0, 0 ]), 1, new Float32Array([ x, 0, 0 ]) )
	}

	function pairs_of( broad: $bog_gamengine_phys3_broad ) {
		return [ ...broad.pairs.subarray( 0, broad.pair_count * 2 ) ]
	}

	$mol_test({

		'two boxes side by side give one pair'() {
			const world = new $bog_gamengine_phys3
			box( world, 1, 0, 0, 0 )
			box( world, 1, 0.9, 0, 0 )
			$mol_assert_equal( world.broad.find( world ), 1 )
			$mol_assert_equal( pairs_of( world.broad ), [ 0, 1 ] )
		},

		'two boxes apart give no pairs'() {
			const world = new $bog_gamengine_phys3
			box( world, 1, 0, 0, 0 )
			box( world, 1, 3, 0, 0 )
			$mol_assert_equal( world.broad.find( world ), 0 )
		},

		'boxes overlapping in X but apart in Y give no pairs'() {
			const world = new $bog_gamengine_phys3
			box( world, 1, 0, 0, 0 )
			box( world, 1, 0.5, 3, 0 )
			$mol_assert_equal( world.broad.find( world ), 0 )
		},

		'hundred spheres of radius 1 with step 3 give no pairs'() {
			const world = new $bog_gamengine_phys3
			for( let k = 0; k < 100; ++ k ) sphere( world, 1, k * 3 )
			$mol_assert_equal( world.broad.find( world ), 0 )
		},

		'hundred spheres of radius 2 with step 3 give 99 pairs'() {
			const world = new $bog_gamengine_phys3
			for( let k = 0; k < 100; ++ k ) sphere( world, 2, k * 3 )
			$mol_assert_equal( world.broad.find( world ), 99 )
		},

		'two statics give no pairs'() {
			const world = new $bog_gamengine_phys3
			box( world, 0, 0, 0, 0 )
			box( world, 0, 0.5, 0, 0 )
			$mol_assert_equal( world.broad.find( world ), 0 )
		},

		'two sleeping bodies give no pairs'() {
			const world = new $bog_gamengine_phys3
			const a = box( world, 1, 0, 0, 0 )
			const b = box( world, 1, 0.5, 0, 0 )
			world.flags[ a ] |= $bog_gamengine_phys3.flag_sleep
			world.flags[ b ] |= $bog_gamengine_phys3.flag_sleep
			$mol_assert_equal( world.broad.find( world ), 0 )
		},

		'ghost pairs with moving body'() {
			const world = new $bog_gamengine_phys3
			const ghost = box( world, 0, 0, 0, 0 )
			world.flags[ ghost ] |= $bog_gamengine_phys3.flag_ghost
			box( world, 1, 0.5, 0, 0 )
			$mol_assert_equal( world.broad.find( world ), 1 )
		},

		'plane pairs with every moving body and no static'() {
			const world = new $bog_gamengine_phys3
			world.add( $bog_gamengine_phys3.shape_plane, new Float32Array([ 0, 1, 0 ]), 0, new Float32Array( 3 ) )
			box( world, 1, 10, 0, 0 )
			box( world, 1, 20, 0, 0 )
			box( world, 0, 30, 0, 0 )
			$mol_assert_equal( world.broad.find( world ), 2 )
			$mol_assert_equal( pairs_of( world.broad ), [ 0, 1, 0, 2 ] )
		},

		'bounds of unit box turned 45 degrees around Y has half size about 0.707'() {
			const world = new $bog_gamengine_phys3
			const rot = $bog_gamengine_vec_quat_from_axis( new Float32Array( 4 ), new Float32Array([ 0, 1, 0 ]), Math.PI / 4 )
			const i = box( world, 1, 0, 0, 0, rot )
			world.bounds()
			const half = ( world.aabb[ i * 6 + 3 ] - world.aabb[ i * 6 ] ) / 2
			$mol_assert_ok( Math.abs( half - Math.SQRT1_2 ) < 1e-3 )
			$mol_assert_ok( Math.abs( world.aabb[ i * 6 + 4 ] - 0.5 ) < 1e-6 )
		},

		'bounds of capsule is sphere of radius plus half height'() {
			const world = new $bog_gamengine_phys3
			const i = world.add( $bog_gamengine_phys3.shape_capsule, new Float32Array([ 0.5, 1, 0 ]), 1, new Float32Array([ 1, 2, 3 ]) )
			$mol_assert_equal( [ ...world.aabb.subarray( i * 6, i * 6 + 6 ) ], [ -0.5, 0.5, 1.5, 2.5, 3.5, 4.5 ] )
		},

		'bounds of hull follows rotated points'() {
			const world = new $bog_gamengine_phys3
			const rot = $bog_gamengine_vec_quat_from_axis( new Float32Array( 4 ), new Float32Array([ 0, 0, 1 ]), Math.PI / 2 )
			const i = world.add( $bog_gamengine_phys3.shape_hull, new Float32Array( 3 ), 1, new Float32Array( 3 ), rot )
			world.hull_points( i, new Float32Array([ 0, 0, 0, 2, 0, 0, 0, 1, 0 ]) )
			$mol_assert_ok( Math.abs( world.aabb[ i * 6 ] + 1 ) < 1e-6 )
			$mol_assert_ok( Math.abs( world.aabb[ i * 6 + 4 ] - 2 ) < 1e-6 )
		},

		'second find without motion gives the same list'() {
			const world = new $bog_gamengine_phys3
			for( let k = 0; k < 20; ++ k ) box( world, 1, ( k * 7 ) % 20 * 0.8, 0, 0 )
			world.broad.find( world )
			const first = pairs_of( world.broad )
			$mol_assert_ok( first.length > 0 )
			world.broad.find( world )
			$mol_assert_equal( pairs_of( world.broad ), first )
		},

		'step refreshes bounds and pairs'() {
			const world = new $bog_gamengine_phys3
			world.gravity( new Float32Array( 3 ) )
			box( world, 1, 0, 0, 0 )
			const i = box( world, 1, 3, 0, 0 )
			world.vel[ i * 3 ] = -2
			world.step( 1 )
			world.step( 1 )
			$mol_assert_equal( world.aabb[ i * 6 ], 0.5 )
			$mol_assert_equal( world.broad.pair_count, 1 )
		},

		'remove keeps pairs of the moved body'() {
			const world = new $bog_gamengine_phys3
			box( world, 1, 0, 0, 0 )
			box( world, 1, 10, 0, 0 )
			box( world, 1, 0.5, 0, 0 )
			world.broad.find( world )
			world.remove( 1 )
			$mol_assert_equal( world.broad.find( world ), 1 )
			$mol_assert_equal( pairs_of( world.broad ), [ 0, 1 ] )
		},

	})

}
