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

		'camera without target keeps its own position'() {
			const cam = new $bog_gamengine_cam_flat
			cam.pos( new Float32Array([ 3, 4, 0 ]) )
			cam.step( 0.016 )
			$mol_assert_equal( cam.pos()[ 0 ], 3 )
			$mol_assert_equal( cam.pos()[ 1 ], 4 )
		},

		'camera jumps to the target with no follow'() {
			const target = new $bog_gamengine_node
			target.pos( new Float32Array([ 5, -3, 0 ]) )
			const cam = new $bog_gamengine_cam_flat
			cam.target( target )
			cam.step( 0.016 )
			$mol_assert_equal( cam.pos()[ 0 ], 5 )
			$mol_assert_equal( cam.pos()[ 1 ], -3 )
		},

		'camera stops at the bounds of the level'() {
			const target = new $bog_gamengine_node
			target.pos( new Float32Array([ 5, 8, 0 ]) )
			const cam = new $bog_gamengine_cam_flat
			cam.height( 10 )
			cam.aspect( 2 )
			cam.target( target )
			cam.bounds( new Float32Array([ 0, 0, 40, 10 ]) )
			cam.step( 0.016 )
			$mol_assert_equal( cam.pos()[ 0 ], 10 )
			$mol_assert_equal( cam.pos()[ 1 ], 5 )
			target.pos( new Float32Array([ 35, 8, 0 ]) )
			cam.step( 0.016 )
			$mol_assert_equal( cam.pos()[ 0 ], 30 )
		},

		'follow moves the camera part of the way to the target'() {
			const target = new $bog_gamengine_node
			target.pos( new Float32Array([ 10, 0, 0 ]) )
			const cam = new $bog_gamengine_cam_flat
			cam.target( target )
			cam.follow( 0.5 )
			cam.step( 0.1 )
			const rate = 1 - Math.exp( -0.2 )
			$mol_assert_ok( Math.abs( cam.pos()[ 0 ] - 10 * rate ) < 1e-5 )
			for( let i = 0; i < 100; ++ i ) cam.step( 0.1 )
			$mol_assert_ok( Math.abs( cam.pos()[ 0 ] - 10 ) < 1e-3 )
		},

		'set through props changes zoom'() {
			const cam = new $bog_gamengine_cam_flat
			cam.props().find( prop => prop.name === 'zoom' )!.set( 2 )
			$mol_assert_equal( cam.zoom(), 2 )
		},

	})
}
