namespace $ {

	function project( proj: Float32Array, point: number[] ) {
		const out = new Float32Array( 4 )
		for( let i = 0; i < 4; ++ i ) {
			out[ i ] = proj[ i ] * point[ 0 ] + proj[ 4 + i ] * point[ 1 ] + proj[ 8 + i ] * point[ 2 ] + proj[ 12 + i ] * point[ 3 ]
		}
		return out
	}

	$mol_test({

		'deep camera maps near plane to z = -1'() {
			const cam = new $bog_gamengine_cam_deep
			const out = project( cam.proj( 1 ), [ 0, 0, - cam.near(), 1 ] )
			$mol_assert_ok( Math.abs( out[ 2 ] / out[ 3 ] + 1 ) < 1e-6 )
		},

		'deep camera maps far plane to z = 1'() {
			const cam = new $bog_gamengine_cam_deep
			const out = project( cam.proj( 1 ), [ 0, 0, - cam.far(), 1 ] )
			$mol_assert_ok( Math.abs( out[ 2 ] / out[ 3 ] - 1 ) < 1e-6 )
		},

		'follow puts the camera over the node with its turn'() {
			const node = new $bog_gamengine_node
			node.pos( new Float32Array([ 2, 1, -3 ]) )
			node.rot( new Float32Array([ 0.25, 0.5, 0 ]) )
			const cam = new $bog_gamengine_cam_deep
			cam.follow( node )
			cam.lift( 0.5 )
			cam.step( 1 / 60 )
			$mol_assert_equal( Array.from( cam.pos() ), [ 2, 1.5, -3 ] )
			$mol_assert_equal( Array.from( cam.rot() ), [ 0.25, 0.5, 0 ] )
		},

		'follow of nothing leaves the camera alone'() {
			const cam = new $bog_gamengine_cam_deep
			const pos = cam.pos()
			cam.step( 1 / 60 )
			$mol_assert_equal( cam.pos(), pos )
		},

	})

}
