namespace $ {
	$mol_test({

		'plane array lengths'( $ ) {
			const plane = $bog_gamengine_shape_plane.make({ $ })
			$mol_assert_equal( plane.geometry().length, 12 )
			$mol_assert_equal( plane.skin().length, 8 )
			$mol_assert_equal( plane.normals().length, 12 )
			$mol_assert_equal( plane.count(), 4 )
		},

		'plane normals point up'( $ ) {
			const normals = $bog_gamengine_shape_plane.make({ $ }).normals()
			for( let i = 0; i < 4; ++ i ) {
				$mol_assert_equal( normals[ i * 3 ], 0 )
				$mol_assert_equal( normals[ i * 3 + 1 ], 1 )
				$mol_assert_equal( normals[ i * 3 + 2 ], 0 )
			}
		},

		'plane strip is counter clockwise from above'( $ ) {
			const geometry = $bog_gamengine_shape_plane.make({ $ }).geometry()
			const cross_y = ( a: number, b: number, c: number )=> {
				const ax = geometry[ b * 3 ] - geometry[ a * 3 ]
				const az = geometry[ b * 3 + 2 ] - geometry[ a * 3 + 2 ]
				const bx = geometry[ c * 3 ] - geometry[ a * 3 ]
				const bz = geometry[ c * 3 + 2 ] - geometry[ a * 3 + 2 ]
				return az * bx - ax * bz
			}
			$mol_assert_ok( cross_y( 0, 1, 2 ) > 0 )
			$mol_assert_ok( cross_y( 2, 1, 3 ) > 0 )
		},

		'plane skin stretches by tile'( $ ) {
			const plane = $bog_gamengine_shape_plane.make({ $ })
			$mol_assert_equal( Math.max( ...plane.skin() ), 1 )
			plane.tile( 4 )
			$mol_assert_equal( Math.max( ...plane.skin() ), 4 )
		},

	})
}
