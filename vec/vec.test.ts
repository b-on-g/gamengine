namespace $ {
	$mol_test({

		'add writes sum into out'() {
			const out = new Float32Array( 2 )
			const res = $bog_gamengine_vec_add( out, new Float32Array([ 1, 2 ]), new Float32Array([ 3, 5 ]) )
			$mol_assert_equal( res, out )
			$mol_assert_equal( [ ...out ], [ 4, 7 ] )
		},

		'sub writes difference into out shared with a'() {
			const a = new Float32Array([ 5, 7, 9 ])
			const res = $bog_gamengine_vec_sub( a, a, new Float32Array([ 1, 2, 3 ]) )
			$mol_assert_equal( res, a )
			$mol_assert_equal( [ ...a ], [ 4, 5, 6 ] )
		},

		'scale multiplies by scalar'() {
			const out = new Float32Array( 3 )
			const res = $bog_gamengine_vec_scale( out, new Float32Array([ 1, -2, 3 ]), 2 )
			$mol_assert_equal( res, out )
			$mol_assert_equal( [ ...out ], [ 2, -4, 6 ] )
		},

		'len is euclidean length'() {
			$mol_assert_equal( $bog_gamengine_vec_len( new Float32Array([ 3, 4 ]) ), 5 )
			$mol_assert_equal( $bog_gamengine_vec_len( new Float32Array([ 2, 3, 6 ]) ), 7 )
		},

		'norm gives unit vector'() {
			const out = new Float32Array( 2 )
			const res = $bog_gamengine_vec_norm( out, new Float32Array([ 0, -5 ]) )
			$mol_assert_equal( res, out )
			$mol_assert_equal( [ ...out ], [ 0, -1 ] )
		},

		'dot is scalar product'() {
			$mol_assert_equal( $bog_gamengine_vec_dot( new Float32Array([ 1, 2, 3 ]), new Float32Array([ 4, 5, 6 ]) ), 32 )
		},

		'cross of x and y is z'() {
			const out = new Float32Array( 3 )
			const res = $bog_gamengine_vec_cross( out, new Float32Array([ 1, 0, 0 ]), new Float32Array([ 0, 1, 0 ]) )
			$mol_assert_equal( res, out )
			$mol_assert_equal( [ ...out ], [ 0, 0, 1 ] )
		},

		'lerp interpolates into out shared with b'() {
			const b = new Float32Array([ 10, 20 ])
			const res = $bog_gamengine_vec_lerp( b, new Float32Array([ 0, 0 ]), b, 0.25 )
			$mol_assert_equal( res, b )
			$mol_assert_equal( [ ...b ], [ 2.5, 5 ] )
		},

	})
}
