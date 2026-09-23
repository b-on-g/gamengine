namespace $ {
	$mol_test({

		'points of two sphere-plane contacts give 12 numbers with normals of 0.2'() {
			const world = new $bog_gamengine_phys3
			world.add( $bog_gamengine_phys3.shape_plane, new Float32Array([ 0, 1, 0 ]), 0, new Float32Array( 3 ) )
			world.add( $bog_gamengine_phys3.shape_sphere, new Float32Array([ 0.5, 0, 0 ]), 1, new Float32Array([ -2, 0.4, 0 ]) )
			world.add( $bog_gamengine_phys3.shape_sphere, new Float32Array([ 0.5, 0, 0 ]), 1, new Float32Array([ 2, 0.4, 0 ]) )
			world.step( 1 / 60 )
			$mol_assert_equal( world.narrow.contact_count, 2 )
			const debug = new $bog_gamengine_phys3_debug
			debug.phys3( world )
			const points = debug.points()
			$mol_assert_equal( points.length, 12 )
			for( let i = 0; i < 2; ++ i ) {
				const o = i * 6
				const len = Math.hypot( points[ o + 3 ] - points[ o ], points[ o + 4 ] - points[ o + 1 ], points[ o + 5 ] - points[ o + 2 ] )
				$mol_assert_ok( Math.abs( len - 0.2 ) < 1e-6 )
			}
		},

		'points keep the buffer when contacts do not grow'() {
			const world = new $bog_gamengine_phys3
			world.add( $bog_gamengine_phys3.shape_plane, new Float32Array([ 0, 1, 0 ]), 0, new Float32Array( 3 ) )
			world.add( $bog_gamengine_phys3.shape_sphere, new Float32Array([ 0.5, 0, 0 ]), 1, new Float32Array([ 0, 0.4, 0 ]) )
			world.step( 1 / 60 )
			const debug = new $bog_gamengine_phys3_debug
			debug.phys3( world )
			const first = debug.points()
			world.step( 1 / 60 )
			$mol_assert_equal( debug.points(), first )
		},

		'points without a world are empty'() {
			const debug = new $bog_gamengine_phys3_debug
			$mol_assert_equal( debug.points().length, 0 )
		},

	})
}
