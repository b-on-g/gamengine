namespace $ {
	$mol_test({

		'flat camera with height 10 and aspect 2 maps (10, 5, 0) to (1, 1)'() {

			const cam = new $bog_gamengine_cam_flat
			cam.height( 10 )

			const proj = cam.proj( 2 )
			const point = [ 10, 5, 0, 1 ]
			const out = new Float32Array( 4 )
			for( let i = 0; i < 4; ++ i ) {
				out[ i ] = proj[ i ] * point[ 0 ] + proj[ 4 + i ] * point[ 1 ] + proj[ 8 + i ] * point[ 2 ] + proj[ 12 + i ] * point[ 3 ]
			}

			$mol_assert_ok( Math.abs( out[ 0 ] - 1 ) < 1e-6 )
			$mol_assert_ok( Math.abs( out[ 1 ] - 1 ) < 1e-6 )

		},

	})
}
