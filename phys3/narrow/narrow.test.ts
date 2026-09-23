namespace $ {

	function near( actual: number, expected: number ) {
		if( Math.abs( actual - expected ) < 1e-4 ) return
		$mol_fail( new Error( `${ actual } ≠ ${ expected }` ) )
	}

	function sphere( world: $bog_gamengine_phys3, r: number, x: number, y: number, z: number ) {
		return world.add( $bog_gamengine_phys3.shape_sphere, new Float32Array([ r, 0, 0 ]), 1, new Float32Array([ x, y, z ]) )
	}

	function box( world: $bog_gamengine_phys3, h: number, x: number, y: number, z: number, rot?: Float32Array ) {
		return world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ h, h, h ]), 1, new Float32Array([ x, y, z ]), rot )
	}

	function capsule( world: $bog_gamengine_phys3, r: number, h: number, x: number, y: number, z: number, rot?: Float32Array ) {
		return world.add( $bog_gamengine_phys3.shape_capsule, new Float32Array([ r, h, 0 ]), 1, new Float32Array([ x, y, z ]), rot )
	}

	function floor( world: $bog_gamengine_phys3 ) {
		return world.add( $bog_gamengine_phys3.shape_plane, new Float32Array([ 0, 1, 0 ]), 0, new Float32Array( 3 ) )
	}

	function tetra( world: $bog_gamengine_phys3, x: number, y: number, z: number ) {
		const i = world.add( $bog_gamengine_phys3.shape_hull, new Float32Array([ 1, 1, 1 ]), 1, new Float32Array([ x, y, z ]) )
		world.hull_points( i, new Float32Array([ 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1 ]) )
		return i
	}

	function around_z( angle: number ) {
		return $bog_gamengine_vec_quat_from_axis( new Float32Array( 4 ), new Float32Array([ 0, 0, 1 ]), angle )
	}

	function collide( world: $bog_gamengine_phys3 ) {
		const narrow = new $bog_gamengine_phys3_narrow
		narrow.collide( world, new Uint32Array([ 0, 1 ]), 1 )
		return narrow
	}

	function normal_is( narrow: $bog_gamengine_phys3_narrow, k: number, x: number, y: number, z: number ) {
		near( narrow.contact_normal[ k * 3 ], x )
		near( narrow.contact_normal[ k * 3 + 1 ], y )
		near( narrow.contact_normal[ k * 3 + 2 ], z )
	}

	$mol_test({

		'two spheres of radius 1 at distance 1.5 give depth 0.5 along the center line'() {
			const world = new $bog_gamengine_phys3
			sphere( world, 1, 0, 0, 0 )
			sphere( world, 1, 1.5, 0, 0 )
			const narrow = collide( world )
			$mol_assert_equal( narrow.contact_count, 1 )
			$mol_assert_equal( narrow.contact_a[ 0 ], 0 )
			$mol_assert_equal( narrow.contact_b[ 0 ], 1 )
			near( narrow.contact_depth[ 0 ], 0.5 )
			normal_is( narrow, 0, 1, 0, 0 )
			near( narrow.contact_point[ 0 ], 0.75 )
		},

		'sphere above plane gives no contact'() {
			const world = new $bog_gamengine_phys3
			sphere( world, 1, 0, 1.5, 0 )
			floor( world )
			$mol_assert_equal( collide( world ).contact_count, 0 )
		},

		'sphere sunk 0.2 into plane gives depth 0.2 and plane normal'() {
			const world = new $bog_gamengine_phys3
			sphere( world, 1, 0, 0.8, 0 )
			floor( world )
			const narrow = collide( world )
			$mol_assert_equal( narrow.contact_count, 1 )
			near( narrow.contact_depth[ 0 ], 0.2 )
			normal_is( narrow, 0, 0, -1, 0 )
		},

		'plane first in pair gives normal from plane to sphere'() {
			const world = new $bog_gamengine_phys3
			floor( world )
			sphere( world, 1, 0, 0.8, 0 )
			const narrow = collide( world )
			$mol_assert_equal( narrow.contact_count, 1 )
			$mol_assert_equal( narrow.contact_a[ 0 ], 0 )
			$mol_assert_equal( narrow.contact_b[ 0 ], 1 )
			normal_is( narrow, 0, 0, 1, 0 )
		},

		'unit box centered 0.4 above plane gives four points of depth 0.1'() {
			const world = new $bog_gamengine_phys3
			box( world, 0.5, 0, 0.4, 0 )
			floor( world )
			const narrow = collide( world )
			$mol_assert_equal( narrow.contact_count, 4 )
			for( let k = 0; k < 4; ++ k ) {
				near( narrow.contact_depth[ k ], 0.1 )
				normal_is( narrow, k, 0, -1, 0 )
				near( narrow.contact_point[ k * 3 + 1 ], -0.05 )
			}
		},

		'boxes overlapping 0.2 along X give four points with normal X and depth 0.2'() {
			const world = new $bog_gamengine_phys3
			box( world, 0.5, 0, 0, 0 )
			box( world, 0.5, 0.8, 0, 0 )
			const narrow = collide( world )
			$mol_assert_equal( narrow.contact_count, 4 )
			for( let k = 0; k < 4; ++ k ) {
				near( narrow.contact_depth[ k ], 0.2 )
				normal_is( narrow, k, 1, 0, 0 )
				near( narrow.contact_point[ k * 3 ], 0.4 )
			}
		},

		'box rotated 45 degrees standing on an edge gives two points'() {
			const world = new $bog_gamengine_phys3
			box( world, 0.5, 0, 0.6, 0, around_z( Math.PI / 4 ) )
			floor( world )
			const narrow = collide( world )
			$mol_assert_equal( narrow.contact_count, 2 )
			near( narrow.contact_depth[ 0 ], Math.SQRT1_2 - 0.6 )
			near( narrow.contact_depth[ 1 ], Math.SQRT1_2 - 0.6 )
			normal_is( narrow, 0, 0, -1, 0 )
		},

		'rotated boxes meeting edge to edge give one point'() {
			const world = new $bog_gamengine_phys3
			box( world, 0.5, 0, 0, 0, around_z( Math.PI / 4 ) )
			box( world, 0.5, 0, 1.3, 0, $bog_gamengine_vec_quat_from_axis( new Float32Array( 4 ), new Float32Array([ 1, 0, 0 ]), Math.PI / 4 ) )
			const narrow = collide( world )
			$mol_assert_equal( narrow.contact_count, 1 )
			near( narrow.contact_depth[ 0 ], Math.SQRT2 - 1.3 )
			normal_is( narrow, 0, 0, 1, 0 )
			near( narrow.contact_point[ 0 ], 0 )
			near( narrow.contact_point[ 2 ], 0 )
		},

		'sphere against box face'() {
			const world = new $bog_gamengine_phys3
			sphere( world, 0.5, 0.9, 0, 0 )
			box( world, 0.5, 0, 0, 0 )
			const narrow = collide( world )
			$mol_assert_equal( narrow.contact_count, 1 )
			near( narrow.contact_depth[ 0 ], 0.1 )
			normal_is( narrow, 0, -1, 0, 0 )
			near( narrow.contact_point[ 0 ], 0.45 )
		},

		'sphere against box corner'() {
			const world = new $bog_gamengine_phys3
			box( world, 0.5, 0, 0, 0 )
			sphere( world, 0.5, 0.7, 0.7, 0.7 )
			const narrow = collide( world )
			$mol_assert_equal( narrow.contact_count, 1 )
			near( narrow.contact_depth[ 0 ], 0.5 - 0.2 * Math.sqrt( 3 ) )
			const k = 1 / Math.sqrt( 3 )
			normal_is( narrow, 0, k, k, k )
		},

		'capsule lying on plane gives two points'() {
			const world = new $bog_gamengine_phys3
			capsule( world, 0.3, 0.5, 0, 0.2, 0, around_z( Math.PI / 2 ) )
			floor( world )
			const narrow = collide( world )
			$mol_assert_equal( narrow.contact_count, 2 )
			near( narrow.contact_depth[ 0 ], 0.1 )
			near( narrow.contact_depth[ 1 ], 0.1 )
			normal_is( narrow, 0, 0, -1, 0 )
			near( Math.abs( narrow.contact_point[ 0 ] ), 0.5 )
		},

		'crossed capsules give one point at the crossing'() {
			const world = new $bog_gamengine_phys3
			capsule( world, 0.3, 1, 0, 0, 0 )
			capsule( world, 0.3, 1, 0.5, 0, 0, $bog_gamengine_vec_quat_from_axis( new Float32Array( 4 ), new Float32Array([ 1, 0, 0 ]), Math.PI / 2 ) )
			const narrow = collide( world )
			$mol_assert_equal( narrow.contact_count, 1 )
			near( narrow.contact_depth[ 0 ], 0.1 )
			normal_is( narrow, 0, 1, 0, 0 )
			near( narrow.contact_point[ 0 ], 0.25 )
		},

		'separated tetrahedra give no contact'() {
			const world = new $bog_gamengine_phys3
			tetra( world, 0, 0, 0 )
			tetra( world, 3, 3, 3 )
			$mol_assert_equal( collide( world ).contact_count, 0 )
		},

		'overlapping tetrahedra give depth and normal from a to b'() {
			const world = new $bog_gamengine_phys3
			tetra( world, 0, 0, 0 )
			tetra( world, 0.5, 0, 0 )
			const narrow = collide( world )
			$mol_assert_equal( narrow.contact_count, 1 )
			const k = 1 / Math.sqrt( 3 )
			near( narrow.contact_depth[ 0 ], 0.5 * k )
			normal_is( narrow, 0, k, k, k )
		},

		'ghost body still gets a contact'() {
			const world = new $bog_gamengine_phys3
			sphere( world, 1, 0, 0, 0 )
			const g = sphere( world, 1, 1.5, 0, 0 )
			world.flags[ g ] = $bog_gamengine_phys3.flag_ghost
			$mol_assert_equal( collide( world ).contact_count, 1 )
		},

		'contacts of a second collide overwrite the first'() {
			const world = new $bog_gamengine_phys3
			sphere( world, 1, 0, 0, 0 )
			sphere( world, 1, 1.5, 0, 0 )
			const narrow = collide( world )
			narrow.collide( world, new Uint32Array([ 0, 1 ]), 1 )
			$mol_assert_equal( narrow.contact_count, 1 )
		},

	})

}
