namespace $ {

	const dt = 1 / 60

	function ground( world: $bog_gamengine_phys3 ) {
		return world.add( $bog_gamengine_phys3.shape_plane, new Float32Array([ 0, 1, 0 ]), 0, new Float32Array([ 0, -100, 0 ]) )
	}

	function box( world: $bog_gamengine_phys3, x: number, y: number, z: number, half = 0.5, mass = 1 ) {
		return world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ half, half, half ]), mass, new Float32Array([ x, y, z ]) )
	}

	function run( world: $bog_gamengine_phys3, seconds: number ) {
		const steps = Math.round( seconds / dt )
		for( let k = 0; k < steps; ++ k ) world.step( dt )
	}

	function anchor_world( world: $bog_gamengine_phys3, i: number, local: Float32Array ) {
		const out = new Float32Array( 3 )
		$bog_gamengine_vec_quat_rotate( out, world.rot_view[ i ], local )
		return $bog_gamengine_vec_add( out, out, world.pos_view[ i ] )
	}

	function gap( world: $bog_gamengine_phys3, a: number, b: number, anchor_a: Float32Array, anchor_b: Float32Array ) {
		const pa = anchor_world( world, a, anchor_a ), pb = anchor_world( world, b, anchor_b )
		return $bog_gamengine_vec_len( $bog_gamengine_vec_sub( pa, pa, pb ) )
	}

	function speed( world: $bog_gamengine_phys3, i: number ) {
		return $bog_gamengine_vec_len( world.vel.subarray( i * 3, i * 3 + 3 ) )
	}

	function angle_y( world: $bog_gamengine_phys3, i: number ) {
		const out = new Float32Array( 3 )
		$bog_gamengine_vec_quat_to_euler( out, world.rot_view[ i ] )
		return out[ 1 ]
	}

	$mol_test({

		'box on a point joint 2 m below the anchor hangs there after 3 s'() {
			const world = new $bog_gamengine_phys3
			const g = ground( world )
			const i = box( world, 0, 4, 0 )
			const local = new Float32Array([ 0, 2, 0 ])
			world.joint.add( $bog_gamengine_phys3_joint.type_point, i, g, local, new Float32Array([ 0, 106, 0 ]) )
			run( world, 3 )
			const dx = world.pos[ i * 3 ], dy = world.pos[ i * 3 + 1 ] - 6, dz = world.pos[ i * 3 + 2 ]
			$mol_assert_ok( Math.abs( Math.sqrt( dx * dx + dy * dy + dz * dz ) - 2 ) < 0.05 )
			$mol_assert_ok( dy < 0 )
			$mol_assert_ok( speed( world, i ) < 0.05 )
		},

		'swinging box on a point joint keeps its distance to the anchor'() {
			const world = new $bog_gamengine_phys3
			const g = ground( world )
			const i = box( world, 2, 6, 0 )
			world.joint.add( $bog_gamengine_phys3_joint.type_point, i, g, new Float32Array([ -2, 0, 0 ]), new Float32Array([ 0, 106, 0 ]) )
			let worst = 0
			for( let k = 0; k < 180; ++ k ) {
				world.step( dt )
				const dx = world.pos[ i * 3 ], dy = world.pos[ i * 3 + 1 ] - 6, dz = world.pos[ i * 3 + 2 ]
				const err = Math.abs( Math.sqrt( dx * dx + dy * dy + dz * dz ) - 2 )
				if( err > worst ) worst = err
			}
			$mol_assert_ok( worst < 0.05 )
		},

		'chain of five boxes on hinges does not tear after 3 s'() {
			const world = new $bog_gamengine_phys3
			const g = ground( world )
			const axis = new Float32Array([ 0, 0, 1 ])
			const ids = [] as number[]
			for( let n = 0; n < 5; ++ n ) ids.push( box( world, 0.55 + n * 1.1, 6, 0 ) )
			world.joint.add( $bog_gamengine_phys3_joint.type_point, ids[ 0 ], g, new Float32Array([ -0.55, 0, 0 ]), new Float32Array([ 0, 106, 0 ]) )
			for( let n = 1; n < 5; ++ n ) {
				world.joint.add( $bog_gamengine_phys3_joint.type_hinge, ids[ n ], ids[ n - 1 ], new Float32Array([ -0.55, 0, 0 ]), new Float32Array([ 0.55, 0, 0 ]), axis )
			}
			run( world, 3 )
			for( let n = 1; n < 5; ++ n ) {
				$mol_assert_ok( gap( world, ids[ n ], ids[ n - 1 ], new Float32Array([ -0.55, 0, 0 ]), new Float32Array([ 0.55, 0, 0 ]) ) <= 0.05 )
			}
			$mol_assert_ok( world.pos[ ids[ 4 ] * 3 + 1 ] < 3 )
		},

		'hinge with limits stops the door at the limit'() {
			const world = new $bog_gamengine_phys3
			world.gravity( new Float32Array( 3 ) )
			const g = ground( world )
			const i = box( world, 0.6, 0, 0 )
			const limit = Math.PI / 2
			world.joint.add(
				$bog_gamengine_phys3_joint.type_hinge, g, i,
				new Float32Array([ 0, 100, 0 ]), new Float32Array([ -0.6, 0, 0 ]),
				new Float32Array([ 0, 1, 0 ]), new Float32Array([ - limit, limit ]),
			)
			world.ang[ i * 3 + 1 ] = 6
			let worst = 0
			for( let k = 0; k < 120; ++ k ) {
				world.step( dt )
				const angle = Math.abs( angle_y( world, i ) )
				if( angle > worst ) worst = angle
			}
			$mol_assert_ok( worst > limit - 0.1 )
			$mol_assert_ok( worst <= limit + 0.02 )
		},

		'hinge keeps its axis while the body spins'() {
			const world = new $bog_gamengine_phys3
			world.gravity( new Float32Array( 3 ) )
			const g = ground( world )
			const i = box( world, 0.6, 0, 0 )
			world.joint.add( $bog_gamengine_phys3_joint.type_hinge, g, i, new Float32Array([ 0, 100, 0 ]), new Float32Array([ -0.6, 0, 0 ]), new Float32Array([ 0, 1, 0 ]) )
			world.ang[ i * 3 ] = 3
			world.ang[ i * 3 + 1 ] = 3
			run( world, 1 )
			const out = new Float32Array( 3 )
			$bog_gamengine_vec_quat_rotate( out, world.rot_view[ i ], new Float32Array([ 0, 1, 0 ]) )
			$mol_assert_ok( out[ 1 ] > 0.99 )
			$mol_assert_ok( Math.abs( world.ang[ i * 3 + 1 ] ) > 0.5 )
		},

		'slider moves only along its axis and stops at the limit'() {
			const world = new $bog_gamengine_phys3
			world.gravity( new Float32Array( 3 ) )
			const g = ground( world )
			const i = box( world, 0, 0, 0 )
			world.joint.add(
				$bog_gamengine_phys3_joint.type_slider, g, i,
				new Float32Array([ 0, 100, 0 ]), new Float32Array( 3 ),
				new Float32Array([ 1, 0, 0 ]), new Float32Array([ -1, 1 ]),
			)
			world.vel[ i * 3 ] = 4
			world.vel[ i * 3 + 1 ] = 2
			world.ang[ i * 3 + 2 ] = 2
			let worst = 0
			for( let k = 0; k < 90; ++ k ) {
				world.step( dt )
				const side = Math.hypot( world.pos[ i * 3 + 1 ], world.pos[ i * 3 + 2 ] )
				if( side > worst ) worst = side
			}
			$mol_assert_ok( worst <= 0.01 )
			$mol_assert_ok( world.pos[ i * 3 ] > 0.95 )
			$mol_assert_ok( world.pos[ i * 3 ] <= 1.01 )
			$mol_assert_ok( Math.abs( angle_y( world, i ) ) < 0.01 )
		},

		'spring oscillates around its rest length and settles in 5 s'() {
			const world = new $bog_gamengine_phys3
			world.gravity( new Float32Array( 3 ) )
			const g = ground( world )
			const i = box( world, 3, 0, 0 )
			world.joint.add(
				$bog_gamengine_phys3_joint.type_spring, g, i,
				new Float32Array([ 0, 100, 0 ]), new Float32Array( 3 ),
				undefined, new Float32Array([ 2, 20, 2 ]),
			)
			let nearest = Infinity
			for( let k = 0; k < 300; ++ k ) {
				world.step( dt )
				if( world.pos[ i * 3 ] < nearest ) nearest = world.pos[ i * 3 ]
			}
			$mol_assert_ok( nearest < 1.9 )
			$mol_assert_ok( Math.abs( world.pos[ i * 3 ] - 2 ) < 0.05 )
		},

		'sleeping box joined to a moving one wakes up'() {
			const world = new $bog_gamengine_phys3
			world.gravity( new Float32Array( 3 ) )
			const a = box( world, 0, 0, 0 )
			const b = box( world, 2, 0, 0 )
			world.joint.add( $bog_gamengine_phys3_joint.type_point, a, b, new Float32Array([ 1, 0, 0 ]), new Float32Array([ -1, 0, 0 ]) )
			world.flags[ a ] |= $bog_gamengine_phys3.flag_sleep
			world.vel[ b * 3 + 1 ] = 2
			world.step( dt )
			$mol_assert_equal( world.flags[ a ] & $bog_gamengine_phys3.flag_sleep, 0 )
			$mol_assert_ok( world.vel[ a * 3 + 1 ] > 0.1 )
		},

		'removing a body drops its joints and renumbers the moved one'() {
			const world = new $bog_gamengine_phys3
			const a = box( world, 0, 0, 0 )
			const b = box( world, 2, 0, 0 )
			const c = box( world, 4, 0, 0 )
			world.joint.add( $bog_gamengine_phys3_joint.type_point, a, b, new Float32Array( 3 ), new Float32Array( 3 ) )
			world.joint.add( $bog_gamengine_phys3_joint.type_point, b, c, new Float32Array( 3 ), new Float32Array( 3 ) )
			world.remove( a )
			$mol_assert_equal( world.joint.count, 1 )
			$mol_assert_equal( world.joint.a[ 0 ], b )
			$mol_assert_equal( world.joint.b[ 0 ], a )
		},

	})

}
