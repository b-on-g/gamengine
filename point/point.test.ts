namespace $ {

	function near( actual: number, expected: number ) {
		$mol_assert_ok( Math.abs( actual - expected ) < 1e-4 )
	}

	function flat_point() {
		const cam = new $bog_gamengine_cam_flat
		cam.height( 10 )
		const point = new $bog_gamengine_point
		point.cam( cam )
		point.width( 800 )
		point.height( 400 )
		return point
	}

	function deep_point() {
		const cam = new $bog_gamengine_cam_deep
		cam.pos( new Float32Array([ 0, 0, 5 ]) )
		const point = new $bog_gamengine_point
		point.cam( cam )
		point.width( 800 )
		point.height( 400 )
		return point
	}

	$mol_test({

		'flat camera at origin maps screen center to world (0, 0)'() {
			const out = new Float32Array( 3 )
			flat_point().world( out, 400, 200 )
			near( out[ 0 ], 0 )
			near( out[ 1 ], 0 )
		},

		'flat camera with height 10 maps top right corner to world (10, 5)'() {
			const out = new Float32Array( 3 )
			flat_point().world( out, 800, 0 )
			near( out[ 0 ], 10 )
			near( out[ 1 ], 5 )
		},

		'deep camera at (0, 0, 5) maps screen center to world (0, 0)'() {
			const out = new Float32Array( 3 )
			deep_point().world( out, 400, 200 )
			near( out[ 0 ], 0 )
			near( out[ 1 ], 0 )
		},

		'deep camera projects world origin to screen center'() {
			const out = new Float32Array( 3 )
			deep_point().screen( out, new Float32Array([ 0, 0, 0 ]) )
			near( out[ 0 ], 400 )
			near( out[ 1 ], 200 )
			$mol_assert_ok( out[ 2 ] > 0 )
		},

		'pick by screen center gives node at origin'() {
			const point = deep_point()
			const first = new $bog_gamengine_node
			const second = new $bog_gamengine_node
			second.pos( new Float32Array([ 3, 0, 0 ]) )
			$mol_assert_equal( point.pick( [ first, second ], 400, 200 ), first )
		},

		'pick by projected point gives shifted node'() {
			const point = deep_point()
			const first = new $bog_gamengine_node
			const second = new $bog_gamengine_node
			second.pos( new Float32Array([ 3, 0, 0 ]) )
			const at = new Float32Array( 3 )
			point.screen( at, second.pos() )
			$mol_assert_equal( point.pick( [ first, second ], at[ 0 ], at[ 1 ] ), second )
		},

		'pick away from all nodes gives null'() {
			const point = deep_point()
			const first = new $bog_gamengine_node
			const second = new $bog_gamengine_node
			second.pos( new Float32Array([ 3, 0, 0 ]) )
			$mol_assert_equal( point.pick( [ first, second ], 0, 0 ), null )
		},

	})
}
