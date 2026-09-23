namespace $ {

	class $bog_gamengine_cam_test_deep extends $bog_gamengine_cam {
		proj( aspect: number ) {
			return $mol_3d_mat4.perspective( Math.PI / 3, aspect, 0.1, 100 )
		}
	}

	function $bog_gamengine_cam_test_frustum() {
		return new $bog_gamengine_cam_test_deep().frustum( 1, new Float32Array( 24 ) )
	}

	$mol_test({

		'sphere in front of camera is inside frustum'() {
			$mol_assert_ok( $bog_gamengine_cam_frustum_sphere( $bog_gamengine_cam_test_frustum(), 0, 0, -5, 1 ) )
		},

		'sphere behind camera is outside frustum'() {
			$mol_assert_not( $bog_gamengine_cam_frustum_sphere( $bog_gamengine_cam_test_frustum(), 0, 0, 5, 1 ) )
		},

		'sphere aside beyond fov is outside frustum'() {
			$mol_assert_not( $bog_gamengine_cam_frustum_sphere( $bog_gamengine_cam_test_frustum(), 10, 0, -5, 1 ) )
		},

		'sphere crossing near plane from behind is inside frustum'() {
			$mol_assert_ok( $bog_gamengine_cam_frustum_sphere( $bog_gamengine_cam_test_frustum(), 0, 0, 0.5, 1 ) )
		},

		'aabb behind camera is outside, aabb in front is inside'() {
			const frustum = $bog_gamengine_cam_test_frustum()
			const aabb = new Float32Array([ -1, -1, 4, 1, 1, 6, -1, -1, -6, 1, 1, -4 ])
			$mol_assert_not( $bog_gamengine_cam_frustum_aabb( frustum, aabb, 0 ) )
			$mol_assert_ok( $bog_gamengine_cam_frustum_aabb( frustum, aabb, 6 ) )
		},

		'frustum follows camera turned around'() {
			const cam = new $bog_gamengine_cam_test_deep
			cam.rot( new Float32Array([ 0, Math.PI, 0 ]) )
			const frustum = cam.frustum( 1, new Float32Array( 24 ) )
			$mol_assert_ok( $bog_gamengine_cam_frustum_sphere( frustum, 0, 0, 5, 1 ) )
			$mol_assert_not( $bog_gamengine_cam_frustum_sphere( frustum, 0, 0, -5, 1 ) )
		},

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
