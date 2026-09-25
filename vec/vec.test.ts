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

		'mat4_apply multiplies column-major matrix by vec4'() {
			const out = new Float32Array( 4 )
			const m = $mol_3d_mat4.translation([ 10, 20, 30 ])
			const res = $bog_gamengine_vec_mat4_apply( out, m, new Float32Array([ 1, 2, 3, 1 ]) )
			$mol_assert_equal( res, out )
			$mol_assert_equal( [ ...out ], [ 11, 22, 33, 1 ] )
		},

		'quat_rotate by half pi around Y sends x to minus z'() {
			const q = $bog_gamengine_vec_quat_from_axis( new Float32Array( 4 ), new Float32Array([ 0, 1, 0 ]), Math.PI / 2 )
			const out = $bog_gamengine_vec_quat_rotate( new Float32Array( 3 ), q, new Float32Array([ 1, 0, 0 ]) )
			$mol_assert_ok( Math.abs( out[ 0 ] ) < 1e-6 )
			$mol_assert_ok( Math.abs( out[ 1 ] ) < 1e-6 )
			$mol_assert_ok( Math.abs( out[ 2 ] + 1 ) < 1e-6 )
		},

		'quat_mul of two quarter turns around Y is a half turn'() {
			const q = $bog_gamengine_vec_quat_from_axis( new Float32Array( 4 ), new Float32Array([ 0, 1, 0 ]), Math.PI / 2 )
			const qq = $bog_gamengine_vec_quat_mul( new Float32Array( 4 ), q, q )
			const out = $bog_gamengine_vec_quat_rotate( new Float32Array( 3 ), qq, new Float32Array([ 1, 0, 0 ]) )
			$mol_assert_ok( Math.abs( out[ 0 ] + 1 ) < 1e-6 )
			$mol_assert_ok( Math.abs( out[ 2 ] ) < 1e-6 )
		},

		'quat_identity leaves vector as is'() {
			const q = $bog_gamengine_vec_quat_identity( new Float32Array( 4 ) )
			const out = $bog_gamengine_vec_quat_rotate( new Float32Array( 3 ), q, new Float32Array([ 1, 2, 3 ]) )
			$mol_assert_equal( [ ...out ], [ 1, 2, 3 ] )
		},

		'quat_normalize gives unit length'() {
			const out = $bog_gamengine_vec_quat_normalize( new Float32Array( 4 ), new Float32Array([ 0, 3, 0, 4 ]) )
			$mol_assert_ok( Math.abs( out[ 1 ] - 0.6 ) < 1e-6 )
			$mol_assert_ok( Math.abs( out[ 3 ] - 0.8 ) < 1e-6 )
		},

		'quat_from_euler to_mat4 matches mat4 translation rotation ZYX scaling for random angles'() {
			for( let trial = 0; trial < 20; ++ trial ) {
				const x = ( Math.random() - 0.5 ) * 6
				const y = ( Math.random() - 0.5 ) * 6
				const z = ( Math.random() - 0.5 ) * 6
				const pos = new Float32Array([ 1, 2, 3 ])
				const scale = new Float32Array([ 1, 2, 0.5 ])
				const q = $bog_gamengine_vec_quat_from_euler( new Float32Array( 4 ), x, y, z )
				const out = $bog_gamengine_vec_quat_to_mat4( new Float32Array( 16 ), q, pos, scale )
				const ref = $mol_3d_mat4.multiply(
					$mol_3d_mat4.translation( pos ),
					$mol_3d_mat4.rotation( [ 0, 0, 1 ], z ),
					$mol_3d_mat4.rotation( [ 0, 1, 0 ], y ),
					$mol_3d_mat4.rotation( [ 1, 0, 0 ], x ),
					$mol_3d_mat4.scaling( scale ),
				)
				for( let i = 0; i < 16; ++ i ) $mol_assert_ok( Math.abs( out[ i ] - ref[ i ] ) < 1e-5 )
			}
		},

		'quat_to_euler inverts from_euler'() {
			const q = $bog_gamengine_vec_quat_from_euler( new Float32Array( 4 ), 0.3, -0.5, 1.2 )
			const out = $bog_gamengine_vec_quat_to_euler( new Float32Array( 3 ), q )
			$mol_assert_ok( Math.abs( out[ 0 ] - 0.3 ) < 1e-6 )
			$mol_assert_ok( Math.abs( out[ 1 ] + 0.5 ) < 1e-6 )
			$mol_assert_ok( Math.abs( out[ 2 ] - 1.2 ) < 1e-6 )
		},

		'mat4_basis normalizes the three columns, which scale makes visible'() {
			const m = new Float32Array([
				2, 0, 0, 0,
				0, 0, 3, 0,
				0, - 4, 0, 0,
				7, 8, 9, 1,
			])
			const out = $bog_gamengine_vec_mat4_basis( new Float32Array( 16 ), m, 4 )
			$mol_assert_equal( [ out[ 0 ], out[ 1 ], out[ 2 ] ], [ 1, 0, 0 ] )
			$mol_assert_equal( [ out[ 4 ], out[ 5 ], out[ 6 ] ], [ 0, 0, 1 ] )
			$mol_assert_equal( [ out[ 8 ], out[ 9 ], out[ 10 ] ], [ 0, - 1, 0 ] )
		},

		'mat4_basis with stride three packs columns tight and clobbers nothing'() {
			const m = new Float32Array([
				2, 0, 0, 0,
				0, 0, 3, 0,
				0, - 4, 0, 0,
				7, 8, 9, 1,
			])
			const out = $bog_gamengine_vec_mat4_basis( new Float32Array( 9 ).fill( 5 ), m, 3 )
			$mol_assert_equal( [ ... out ], [ 1, 0, 0, 0, 0, 1, 0, - 1, 0 ] )
		},

		'mat4_basis leaves the translation of the matrix alone'() {
			const m = new Float32Array( 16 )
			m[ 0 ] = 1; m[ 5 ] = 1; m[ 10 ] = 1
			m[ 12 ] = 7; m[ 13 ] = 8; m[ 14 ] = 9; m[ 15 ] = 1
			const out = $bog_gamengine_vec_mat4_basis( new Float32Array( 16 ), m, 4 )
			$mol_assert_equal( [ out[ 12 ], out[ 13 ], out[ 14 ], out[ 15 ] ], [ 0, 0, 0, 0 ] )
			$mol_assert_equal( [ m[ 12 ], m[ 13 ], m[ 14 ] ], [ 7, 8, 9 ] )
		},

		'mat4_basis of a zero column gives zero instead of dividing by it'() {
			const out = $bog_gamengine_vec_mat4_basis( new Float32Array( 9 ), new Float32Array( 16 ), 3 )
			$mol_assert_equal( [ ... out ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ] )
		},

		'quat_integrate one second at half pi around Y turns x to minus z'() {
			const q = $bog_gamengine_vec_quat_identity( new Float32Array( 4 ) )
			const ang = new Float32Array([ 0, Math.PI / 2, 0 ])
			for( let i = 0; i < 60; ++ i ) $bog_gamengine_vec_quat_integrate( q, q, ang, 1 / 60 )
			const out = $bog_gamengine_vec_quat_rotate( new Float32Array( 3 ), q, new Float32Array([ 1, 0, 0 ]) )
			$mol_assert_ok( Math.abs( out[ 0 ] ) < 1e-3 )
			$mol_assert_ok( Math.abs( out[ 2 ] + 1 ) < 1e-3 )
		},

	})
}
