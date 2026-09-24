namespace $ {
	$mol_test({

		'pointer at the left edge pans the camera left'() {
			const cam = new $bog_gamengine_cam_flat
			const edge = new $bog_gamengine_cam_edge
			edge.cam( cam )
			edge.width( 800 )
			edge.height( 600 )
			edge.edge( 50 )
			edge.speed( 10 )
			edge.aim( 0, 300 )
			edge.step( 0.1 )
			$mol_assert_equal( cam.pos()[ 0 ], -1 )
			$mol_assert_equal( cam.pos()[ 1 ], 0 )
		},

		'pointer in the middle leaves the camera alone'() {
			const cam = new $bog_gamengine_cam_flat
			const edge = new $bog_gamengine_cam_edge
			edge.cam( cam )
			edge.width( 800 )
			edge.height( 600 )
			edge.aim( 400, 300 )
			edge.step( 0.1 )
			$mol_assert_equal( cam.pos()[ 0 ], 0 )
		},

		'pointer away from the panel stops the pan'() {
			const cam = new $bog_gamengine_cam_flat
			const edge = new $bog_gamengine_cam_edge
			edge.cam( cam )
			edge.width( 800 )
			edge.height( 600 )
			edge.aim( 799, 300 )
			edge.step( 0.1 )
			const moved = cam.pos()[ 0 ]
			$mol_assert_ok( moved > 0 )
			edge.away()
			edge.step( 0.1 )
			$mol_assert_equal( cam.pos()[ 0 ], moved )
		},

	})
}
