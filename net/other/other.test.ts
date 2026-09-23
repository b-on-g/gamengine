namespace $ {

	$mol_test({

		'half an interval after the second sample the delayed target is the midpoint'() {
			const out = $bog_gamengine_net_lerp( new Float32Array( 3 ), [ 0, 0, 0 ], 0, [ 2, 4, 0 ], 0.1, 0.15, 0.1 )
			$mol_assert_equal( out[ 0 ], 1 )
			$mol_assert_equal( out[ 1 ], 2 )
			$mol_assert_equal( out[ 2 ], 0 )
		},

		'before the first sample the target stays at the first sample'() {
			const out = $bog_gamengine_net_lerp( new Float32Array( 3 ), [ 1, 1, 1 ], 0, [ 3, 3, 3 ], 0.1, 0.05, 0.1 )
			$mol_assert_equal( out[ 0 ], 1 )
		},

		'extrapolation past the last sample is cut at ahead'() {
			const out = $bog_gamengine_net_lerp( new Float32Array( 3 ), [ 0, 0, 0 ], 0, [ 2, 0, 0 ], 0.1, 10, 0.1, 0.2 )
			$mol_assert_equal( out[ 0 ], 6 )
		},

		'same timestamps give the last sample'() {
			const out = $bog_gamengine_net_lerp( new Float32Array( 3 ), [ 0, 0, 0 ], 1, [ 5, 0, 0 ], 1, 2, 0.1 )
			$mol_assert_equal( out[ 0 ], 5 )
		},

	})

}
