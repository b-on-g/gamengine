namespace $ {

	function cast_test_world() {
		return new $bog_gamengine_phys3
	}

	function cast_test_add( world: $bog_gamengine_phys3, shape: number, sx: number, sy: number, sz: number, x: number, y: number, z: number, rot?: Float32Array ) {
		return world.index_of( world.add( shape, new Float32Array([ sx, sy, sz ]), 0, new Float32Array([ x, y, z ]), rot ) )
	}

	function cast_test_ray( world: $bog_gamengine_phys3, ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, opts?: $bog_gamengine_phys3_cast_opts ) {
		const out = new Float32Array( 7 )
		const i = new $bog_gamengine_phys3_cast().ray( world, new Float32Array([ ox, oy, oz ]), new Float32Array([ dx, dy, dz ]), 100, out, opts )
		return { i, out }
	}

	function cast_test_near( actual: number, expected: number ) {
		if( !( Math.abs( actual - expected ) < 1e-3 ) ) $mol_fail( new Error( `${ actual } is not near ${ expected }` ) )
	}

	function cast_test_hit( out: Float32Array, t: number, px: number, py: number, pz: number, nx: number, ny: number, nz: number ) {
		cast_test_near( out[ 0 ], t )
		cast_test_near( out[ 1 ], px )
		cast_test_near( out[ 2 ], py )
		cast_test_near( out[ 3 ], pz )
		cast_test_near( out[ 4 ], nx )
		cast_test_near( out[ 5 ], ny )
		cast_test_near( out[ 6 ], nz )
	}

	$mol_test({

		'ray hits sphere at its near surface'() {
			const world = cast_test_world()
			cast_test_add( world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -5 )
			const { i, out } = cast_test_ray( world, 0, 0, 0, 0, 0, -1 )
			$mol_assert_equal( i, 0 )
			cast_test_hit( out, 4, 0, 0, -4, 0, 0, 1 )
		},

		'ray hits box face with face normal'() {
			const world = cast_test_world()
			cast_test_add( world, $bog_gamengine_phys3.shape_box, 0.5, 0.5, 0.5, 3, 0, 0 )
			const { i, out } = cast_test_ray( world, 0, 0.2, 0.1, 1, 0, 0 )
			$mol_assert_equal( i, 0 )
			cast_test_hit( out, 2.5, 2.5, 0.2, 0.1, -1, 0, 0 )
		},

		'ray past box misses'() {
			const world = cast_test_world()
			cast_test_add( world, $bog_gamengine_phys3.shape_box, 0.5, 0.5, 0.5, 3, 0, 0 )
			$mol_assert_equal( cast_test_ray( world, 0, 0.7, 0, 1, 0, 0 ).i, -1 )
			$mol_assert_equal( cast_test_ray( world, 0, 0, 0, -1, 0, 0 ).i, -1 )
		},

		'ray hits rotated box on its tilted face'() {
			const world = cast_test_world()
			const rot = $bog_gamengine_vec_quat_from_axis( new Float32Array( 4 ), new Float32Array([ 0, 1, 0 ]), Math.PI / 4 )
			cast_test_add( world, $bog_gamengine_phys3.shape_box, 0.5, 0.5, 0.5, 3, 0, 0, rot )
			const { i, out } = cast_test_ray( world, 0, 0, 0.1, 1, 0, 0 )
			$mol_assert_equal( i, 0 )
			cast_test_near( out[ 0 ], 3.1 - Math.SQRT1_2 )
			cast_test_near( out[ 4 ], - Math.SQRT1_2 )
			cast_test_near( out[ 5 ], 0 )
			cast_test_near( out[ 6 ], Math.SQRT1_2 )
		},

		'ray hits capsule side'() {
			const world = cast_test_world()
			cast_test_add( world, $bog_gamengine_phys3.shape_capsule, 0.5, 1, 0, 0, 0.5, -4 )
			const { i, out } = cast_test_ray( world, 0, 0, 0, 0, 0, -1 )
			$mol_assert_equal( i, 0 )
			cast_test_hit( out, 3.5, 0, 0, -3.5, 0, 0, 1 )
		},

		'ray hits capsule cap'() {
			const world = cast_test_world()
			cast_test_add( world, $bog_gamengine_phys3.shape_capsule, 0.5, 1, 0, 0, 0, -4 )
			const { i, out } = cast_test_ray( world, 0, 3, -4, 0, -1, 0 )
			$mol_assert_equal( i, 0 )
			cast_test_hit( out, 1.5, 0, 1.5, -4, 0, 1, 0 )
		},

		'ray hits plane from above and misses from below'() {
			const world = cast_test_world()
			cast_test_add( world, $bog_gamengine_phys3.shape_plane, 0, 1, 0, 0, 0, 0 )
			const { i, out } = cast_test_ray( world, 1, 2, 3, 0, -1, 0 )
			$mol_assert_equal( i, 0 )
			cast_test_hit( out, 2, 1, 0, 3, 0, 1, 0 )
			$mol_assert_equal( cast_test_ray( world, 1, 2, 3, 0, 1, 0 ).i, -1 )
		},

		'ray hits hull tetrahedron on its face'() {
			const world = cast_test_world()
			const i = cast_test_add( world, $bog_gamengine_phys3.shape_hull, 0, 0, 0, 0, 0, 0 )
			world.hull_points( i, new Float32Array([ 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1 ]) )
			const hit = cast_test_ray( world, -2, 0.2, 0.2, 1, 0, 0 )
			$mol_assert_equal( hit.i, 0 )
			cast_test_hit( hit.out, 2, 0, 0.2, 0.2, -1, 0, 0 )
			$mol_assert_equal( cast_test_ray( world, -2, 0.6, 0.6, 1, 0, 0 ).i, -1 )
		},

		'ray skips ghost when asked'() {
			const world = cast_test_world()
			const ghost = cast_test_add( world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -3 )
			world.flags[ ghost ] |= $bog_gamengine_phys3.flag_ghost
			cast_test_add( world, $bog_gamengine_phys3.shape_box, 0.5, 0.5, 0.5, 0, 0, -6 )
			$mol_assert_equal( cast_test_ray( world, 0, 0, 0, 0, 0, -1 ).i, 0 )
			const { i, out } = cast_test_ray( world, 0, 0, 0, 0, 0, -1, { skip_ghost: true } )
			$mol_assert_equal( i, 1 )
			cast_test_near( out[ 0 ], 5.5 )
		},

		'ray returns nearest of two bodies'() {
			const world = cast_test_world()
			cast_test_add( world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -8 )
			cast_test_add( world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -4 )
			const { i, out } = cast_test_ray( world, 0, 0, 0, 0, 0, -1 )
			$mol_assert_equal( i, 1 )
			cast_test_near( out[ 0 ], 3 )
		},

		'ray with skip index does not see that body'() {
			const world = cast_test_world()
			const near = cast_test_add( world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -3 )
			cast_test_add( world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -6 )
			$mol_assert_equal( cast_test_ray( world, 0, 0, 0, 0, 0, -1 ).i, near )
			const { i, out } = cast_test_ray( world, 0, 0, 0, 0, 0, -1, { skip: near } )
			$mol_assert_equal( i, 1 )
			cast_test_near( out[ 0 ], 5 )
		},

		'ray with skip list does not see any listed body'() {
			const world = cast_test_world()
			const a = cast_test_add( world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -3 )
			const b = cast_test_add( world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -6 )
			cast_test_add( world, $bog_gamengine_phys3.shape_sphere, 1, 0, 0, 0, 0, -9 )
			const { i, out } = cast_test_ray( world, 0, 0, 0, 0, 0, -1, { skip: [ a, b ] } )
			$mol_assert_equal( i, 2 )
			cast_test_near( out[ 0 ], 8 )
		},

		'ray hits a body at the place given by move in the same step'() {
			const world = cast_test_world()
			const handle = world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ 0.5, 0.5, 0.5 ]), 0, new Float32Array([ 0, 0, -4 ]) )
			world.move( handle, new Float32Array([ 0, 0, -8 ]) )
			const { i, out } = cast_test_ray( world, 0, 0, 0, 0, 0, -1 )
			$mol_assert_equal( i, world.index_of( handle ) )
			cast_test_near( out[ 0 ], 7.5 )
		},

		'sweep sphere down to plane stops at distance minus radius'() {
			const world = cast_test_world()
			cast_test_add( world, $bog_gamengine_phys3.shape_plane, 0, 1, 0, 0, 0, 0 )
			const out = new Float32Array( 7 )
			const i = new $bog_gamengine_phys3_cast().sweep(
				world, $bog_gamengine_phys3.shape_sphere, new Float32Array([ 0.5, 0, 0 ]),
				new Float32Array([ 0, 3, 0 ]), new Float32Array([ 0, 0, 0, 1 ]), new Float32Array([ 0, -1, 0 ]), 10, out,
			)
			$mol_assert_equal( i, 0 )
			cast_test_hit( out, 2.5, 0, 0, 0, 0, 1, 0 )
		},

		'sweep box to box stops face to face'() {
			const world = cast_test_world()
			cast_test_add( world, $bog_gamengine_phys3.shape_box, 0.5, 0.5, 0.5, 4, 0, 0 )
			const out = new Float32Array( 7 )
			const i = new $bog_gamengine_phys3_cast().sweep(
				world, $bog_gamengine_phys3.shape_box, new Float32Array([ 0.5, 0.5, 0.5 ]),
				new Float32Array([ 0, 0, 0 ]), new Float32Array([ 0, 0, 0, 1 ]), new Float32Array([ 1, 0, 0 ]), 10, out,
			)
			$mol_assert_equal( i, 0 )
			cast_test_near( out[ 0 ], 3 )
			cast_test_near( out[ 1 ], 3.5 )
			cast_test_near( out[ 4 ], -1 )
			cast_test_near( out[ 5 ], 0 )
			cast_test_near( out[ 6 ], 0 )
		},

		'sweep capsule to box stops with box face normal'() {
			const world = cast_test_world()
			cast_test_add( world, $bog_gamengine_phys3.shape_box, 0.5, 1, 0.5, 0, 1, -4 )
			const out = new Float32Array( 7 )
			const i = new $bog_gamengine_phys3_cast().sweep(
				world, $bog_gamengine_phys3.shape_capsule, new Float32Array([ 0.3, 0.6, 0 ]),
				new Float32Array([ 0, 0.9, 0 ]), new Float32Array([ 0, 0, 0, 1 ]), new Float32Array([ 0, 0, -1 ]), 10, out,
			)
			$mol_assert_equal( i, 0 )
			cast_test_near( out[ 0 ], 3.2 )
			cast_test_near( out[ 6 ], 1 )
		},

		'sweep past a body misses'() {
			const world = cast_test_world()
			cast_test_add( world, $bog_gamengine_phys3.shape_box, 0.5, 0.5, 0.5, 4, 0, 0 )
			const out = new Float32Array( 7 )
			const i = new $bog_gamengine_phys3_cast().sweep(
				world, $bog_gamengine_phys3.shape_sphere, new Float32Array([ 0.5, 0, 0 ]),
				new Float32Array([ 0, 2, 0 ]), new Float32Array([ 0, 0, 0, 1 ]), new Float32Array([ 1, 0, 0 ]), 10, out,
			)
			$mol_assert_equal( i, -1 )
		},

	})

}
