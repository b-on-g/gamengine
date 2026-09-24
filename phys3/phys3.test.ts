namespace $ {

	function box( world: $bog_gamengine_phys3, mass: number, x: number, y: number, z: number ) {
		return world.index_of( world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ 0.5, 0.5, 0.5 ]), mass, new Float32Array([ x, y, z ]) ) )
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
			$mol_assert_equal( world.remove( world.handle_of( 0 ) ), true )
			$mol_assert_equal( world.count, 1 )
			$mol_assert_equal( [ ...world.pos.subarray( 0, 3 ) ], [ 5, 6, 7 ] )
			$mol_assert_equal( world.mass[ 0 ], 2 )
			$mol_assert_equal( [ ...world.trans.subarray( 12, 15 ) ], [ 5, 6, 7 ] )
		},

		'handle of a neighbour survives removal of the body between them'() {
			const world = new $bog_gamengine_phys3
			const a = world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ 0.5, 0.5, 0.5 ]), 1, new Float32Array([ 1, 0, 0 ]) )
			const b = world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ 0.5, 0.5, 0.5 ]), 1, new Float32Array([ 2, 0, 0 ]) )
			const c = world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ 0.5, 0.5, 0.5 ]), 1, new Float32Array([ 3, 0, 0 ]) )
			$mol_assert_equal( world.remove( b ), true )
			$mol_assert_equal( world.count, 2 )
			$mol_assert_equal( world.index_of( b ), -1 )
			$mol_assert_equal( world.pos_of( a )![ 0 ], 1 )
			$mol_assert_equal( world.pos_of( c )![ 0 ], 3 )
			$mol_assert_equal( world.handle_of( world.index_of( c ) ), c )
		},

		'removed handle is not answered twice'() {
			const world = new $bog_gamengine_phys3
			const a = world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ 0.5, 0.5, 0.5 ]), 1, new Float32Array( 3 ) )
			$mol_assert_equal( world.remove( a ), true )
			$mol_assert_equal( world.remove( a ), false )
			$mol_assert_equal( world.pos_of( a ), null )
		},

		'move updates bounds and trans within the same step'() {
			const world = new $bog_gamengine_phys3
			const a = world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ 0.5, 0.5, 0.5 ]), 0, new Float32Array( 3 ) )
			world.move( a, new Float32Array([ 5, 0, 0 ]) )
			const i = world.index_of( a )
			$mol_assert_equal( [ ...world.aabb.subarray( i * 6, i * 6 + 6 ) ], [ 4.5, -0.5, -0.5, 5.5, 0.5, 0.5 ] )
			$mol_assert_equal( [ ...world.trans.subarray( i * 16 + 12, i * 16 + 15 ) ], [ 5, 0, 0 ] )
		},

		'kinematic body carries a box along and does not fall'() {
			const world = new $bog_gamengine_phys3
			const plate = world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ 2, 0.25, 2 ]), 0, new Float32Array( 3 ) )
			world.kinematic_of( plate, true )
			const cargo = box( world, 1, 0, 0.76, 0 )
			world.vel[ world.index_of( plate ) * 3 ] = 1
			for( let k = 0; k < 60; ++ k ) world.step( 1 / 60 )
			const at = world.pos_of( plate )!
			$mol_assert_ok( Math.abs( at[ 0 ] - 1 ) < 0.05 )
			$mol_assert_equal( at[ 1 ], 0 )
			$mol_assert_ok( world.pos[ cargo * 3 ] > 0.5 )
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
			const i = world.index_of( world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ 1, 2, 3 ]), 1, new Float32Array( 3 ) ) )
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
			const s = world.index_of( world.add( $bog_gamengine_phys3.shape_sphere, new Float32Array([ 2, 0, 0 ]), 5, new Float32Array( 3 ) ) )
			$mol_assert_ok( Math.abs( world.inv_inertia[ s * 3 ] - 1 / ( 0.4 * 5 * 4 ) ) < 1e-6 )
			const b = world.index_of( world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ 1, 2, 3 ]), 3, new Float32Array( 3 ) ) )
			$mol_assert_ok( Math.abs( world.inv_inertia[ b * 3 ] - 1 / ( 3 / 12 * ( 16 + 36 ) ) ) < 1e-6 )
		},

		'hull_points stores points with offset and count per body'() {
			const world = new $bog_gamengine_phys3
			const a = world.index_of( world.add( $bog_gamengine_phys3.shape_hull, new Float32Array( 3 ), 1, new Float32Array( 3 ) ) )
			const b = world.index_of( world.add( $bog_gamengine_phys3.shape_hull, new Float32Array( 3 ), 1, new Float32Array( 3 ) ) )
			world.hull_points( a, new Float32Array([ 0, 0, 0, 1, 0, 0 ]) )
			world.hull_points( b, new Float32Array([ 0, 1, 0, 0, 0, 1, 1, 1, 1 ]) )
			$mol_assert_equal( world.hull_off[ b ], 6 )
			$mol_assert_equal( world.hull_count[ b ], 3 )
			$mol_assert_equal( [ ...world.hull.subarray( 6, 9 ) ], [ 0, 1, 0 ] )
		},

		'hull of four tetrahedron points gives aabb by these points'() {
			const world = new $bog_gamengine_phys3
			const a = world.index_of( world.add( $bog_gamengine_phys3.shape_hull, new Float32Array( 3 ), 1, new Float32Array( 3 ) ) )
			const b = world.index_of( world.add( $bog_gamengine_phys3.shape_hull, new Float32Array( 3 ), 1, new Float32Array([ 10, 20, 30 ]) ) )
			world.hull_points( a, new Float32Array([ 5, 5, 5, 6, 6, 6 ]) )
			world.hull_points( b, new Float32Array([ 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 3 ]) )
			$mol_assert_equal( [ ...world.aabb.subarray( b * 6, b * 6 + 6 ) ], [ 10, 20, 30, 11, 22, 33 ] )
		},

		'step of 0.1 equals six steps of 1/60 for a box over the floor'() {
			const one = new $bog_gamengine_phys3
			const six = new $bog_gamengine_phys3
			for( const world of [ one, six ] ) {
				world.max_steps = 6
				world.add( $bog_gamengine_phys3.shape_plane, new Float32Array([ 0, 1, 0 ]), 0, new Float32Array( 3 ) )
				box( world, 1, 0, 0.6, 0 )
			}
			one.step( 0.1 )
			for( let k = 0; k < 6; ++ k ) six.step( 1 / 60 )
			$mol_assert_equal( one.steps_done, 6 )
			for( let n = 0; n < 6; ++ n ) $mol_assert_ok( Math.abs( one.pos[ n ] - six.pos[ n ] ) < 1e-6 )
			for( let n = 0; n < 6; ++ n ) $mol_assert_ok( Math.abs( one.vel[ n ] - six.vel[ n ] ) < 1e-6 )
		},

		'step of 1 makes at most four substeps and drops the debt'() {
			const world = new $bog_gamengine_phys3
			box( world, 1, 0, 0, 0 )
			world.step( 1 )
			$mol_assert_equal( world.steps_done, 4 )
			world.step( 0 )
			$mol_assert_equal( world.steps_done, 1 )
			world.step( 0 )
			$mol_assert_equal( world.steps_done, 0 )
		},

	})

}
