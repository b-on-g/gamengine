namespace $ {
	$mol_test({

		'view of camera shifted by (0, 0, 5) moves (0, 0, 5) to origin'() {

			const cam = new $bog_gamengine_cam
			cam.pos( new Float32Array([ 0, 0, 5 ]) )

			const view = cam.view()
			const point = [ 0, 0, 5, 1 ]
			const out = new Float32Array( 4 )
			for( let i = 0; i < 4; ++ i ) {
				out[ i ] = view[ i ] * point[ 0 ] + view[ 4 + i ] * point[ 1 ] + view[ 8 + i ] * point[ 2 ] + view[ 12 + i ] * point[ 3 ]
			}

			$mol_assert_ok( Math.abs( out[ 0 ] ) < 1e-6 )
			$mol_assert_ok( Math.abs( out[ 1 ] ) < 1e-6 )
			$mol_assert_ok( Math.abs( out[ 2 ] ) < 1e-6 )
			$mol_assert_ok( Math.abs( out[ 3 ] - 1 ) < 1e-6 )

		},

	})
}
