namespace $ {
	$mol_test({

		'box array lengths'( $ ) {
			const box = $bog_gamengine_shape_box.make({ $ })
			$mol_assert_equal( box.geometry().length, 102 )
			$mol_assert_equal( box.skin().length, 68 )
			$mol_assert_equal( box.normals().length, 102 )
			$mol_assert_equal( box.size(), 34 )
			$mol_assert_equal( box.count(), 24 )
			$mol_assert_equal( box.mode(), 'strip' )
		},

		'box has six different unit normals'( $ ) {
			const normals = $bog_gamengine_shape_box.make({ $ }).normals()
			const seen = new Set< string >()
			for( let i = 0; i < 34; ++ i ) {
				const x = normals[ i * 3 ]
				const y = normals[ i * 3 + 1 ]
				const z = normals[ i * 3 + 2 ]
				$mol_assert_equal( x * x + y * y + z * z, 1 )
				seen.add( `${ x } ${ y } ${ z }` )
			}
			$mol_assert_equal( seen.size, 6 )
		},

		'box faces are counter clockwise from outside'( $ ) {
			const box = $bog_gamengine_shape_box.make({ $ })
			const geometry = box.geometry()
			const normals = box.normals()
			const winding = ( a: number, b: number, c: number )=> {
				const ax = geometry[ b * 3 ] - geometry[ a * 3 ]
				const ay = geometry[ b * 3 + 1 ] - geometry[ a * 3 + 1 ]
				const az = geometry[ b * 3 + 2 ] - geometry[ a * 3 + 2 ]
				const bx = geometry[ c * 3 ] - geometry[ a * 3 ]
				const by = geometry[ c * 3 + 1 ] - geometry[ a * 3 + 1 ]
				const bz = geometry[ c * 3 + 2 ] - geometry[ a * 3 + 2 ]
				const cx = ay * bz - az * by
				const cy = az * bx - ax * bz
				const cz = ax * by - ay * bx
				return cx * normals[ a * 3 ] + cy * normals[ a * 3 + 1 ] + cz * normals[ a * 3 + 2 ]
			}
			for( let face = 0; face < 6; ++ face ) {
				const v = face * 6
				$mol_assert_ok( winding( v, v + 1, v + 2 ) > 0 )
				$mol_assert_ok( winding( v + 2, v + 1, v + 3 ) > 0 )
			}
		},

	})
}
