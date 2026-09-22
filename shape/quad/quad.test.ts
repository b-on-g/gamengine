namespace $ {
	$mol_test({

		'quad array lengths'( $ ) {
			const quad = $bog_gamengine_shape_quad.make({ $ })
			$mol_assert_equal( quad.geometry().length, 12 )
			$mol_assert_equal( quad.skin().length, 8 )
			$mol_assert_equal( quad.normals().length, 12 )
			$mol_assert_equal( quad.count(), 4 )
		},

		'quad strip triangles are counter clockwise'( $ ) {
			const geometry = $bog_gamengine_shape_quad.make({ $ }).geometry()
			const cross_z = ( a: number, b: number, c: number )=> {
				const ax = geometry[ b * 3 ] - geometry[ a * 3 ]
				const ay = geometry[ b * 3 + 1 ] - geometry[ a * 3 + 1 ]
				const bx = geometry[ c * 3 ] - geometry[ a * 3 ]
				const by = geometry[ c * 3 + 1 ] - geometry[ a * 3 + 1 ]
				return ax * by - ay * bx
			}
			$mol_assert_ok( cross_z( 0, 1, 2 ) > 0 )
			$mol_assert_ok( cross_z( 2, 1, 3 ) > 0 )
		},

		'quad normals point to plus z'( $ ) {
			const normals = $bog_gamengine_shape_quad.make({ $ }).normals()
			for( let i = 0; i < 4; ++ i ) {
				$mol_assert_equal( normals[ i * 3 ], 0 )
				$mol_assert_equal( normals[ i * 3 + 1 ], 0 )
				$mol_assert_equal( normals[ i * 3 + 2 ], 1 )
			}
		},

	})
}
