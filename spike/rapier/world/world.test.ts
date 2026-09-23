namespace $ {

	function quat_axis( ax: number, ay: number, az: number, angle: number ) {
		const s = Math.sin( angle / 2 )
		return [ ax * s, ay * s, az * s, Math.cos( angle / 2 ) ] as const
	}

	function quat_mul( a: readonly [ number, number, number, number ], b: readonly [ number, number, number, number ] ) {
		return [
			a[ 3 ] * b[ 0 ] + a[ 0 ] * b[ 3 ] + a[ 1 ] * b[ 2 ] - a[ 2 ] * b[ 1 ],
			a[ 3 ] * b[ 1 ] - a[ 0 ] * b[ 2 ] + a[ 1 ] * b[ 3 ] + a[ 2 ] * b[ 0 ],
			a[ 3 ] * b[ 2 ] + a[ 0 ] * b[ 1 ] - a[ 1 ] * b[ 0 ] + a[ 2 ] * b[ 3 ],
			a[ 3 ] * b[ 3 ] - a[ 0 ] * b[ 0 ] - a[ 1 ] * b[ 1 ] - a[ 2 ] * b[ 2 ],
		] as const
	}

	$mol_test({

		'euler from quaternion matches node rotation order z y x'() {
			const q = quat_mul( quat_mul( quat_axis( 0, 0, 1, 0.5 ), quat_axis( 0, 1, 0, 0.4 ) ), quat_axis( 1, 0, 0, 0.3 ) )
			const out = $bog_gamengine_spike_rapier_world_euler( q[ 0 ], q[ 1 ], q[ 2 ], q[ 3 ], new Float32Array( 3 ) )
			$mol_assert_equal( Math.round( out[ 0 ] * 1e6 ) / 1e6, 0.3 )
			$mol_assert_equal( Math.round( out[ 1 ] * 1e6 ) / 1e6, 0.4 )
			$mol_assert_equal( Math.round( out[ 2 ] * 1e6 ) / 1e6, 0.5 )
		},

	})

}
