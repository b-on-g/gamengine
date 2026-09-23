namespace $ {
	$mol_test({

		'first index read adds body to world'() {
			const world = new $bog_gamengine_phys3
			const body = new $bog_gamengine_phys3_body
			body.phys3( world )
			$mol_assert_equal( world.count, 0 )
			$mol_assert_equal( body.index(), 0 )
			$mol_assert_equal( body.index(), 0 )
			$mol_assert_equal( world.count, 1 )
		},

		'pos writes into world buffer and reads back after step'() {
			const world = new $bog_gamengine_phys3
			world.gravity( new Float32Array( 3 ) )
			const body = new $bog_gamengine_phys3_body
			body.phys3( world )
			body.pos( new Float32Array([ 1, 2, 3 ]) )
			$mol_assert_equal( [ ...world.pos.subarray( 0, 3 ) ], [ 1, 2, 3 ] )
			world.vel[ 0 ] = 1
			world.step( 0.5 )
			$mol_assert_equal( [ ...body.pos() ], [ 1.5, 2, 3 ] )
		},

		'rot writes euler as quaternion and reads it back'() {
			const body = new $bog_gamengine_phys3_body
			body.rot( new Float32Array([ 0.3, -0.5, 1.2 ]) )
			const q = body.phys3().rot.subarray( 0, 4 )
			$mol_assert_ok( Math.abs( Math.hypot( q[ 0 ], q[ 1 ], q[ 2 ], q[ 3 ] ) - 1 ) < 1e-6 )
			const rot = body.rot()
			$mol_assert_ok( Math.abs( rot[ 0 ] - 0.3 ) < 1e-6 )
			$mol_assert_ok( Math.abs( rot[ 1 ] + 0.5 ) < 1e-6 )
			$mol_assert_ok( Math.abs( rot[ 2 ] - 1.2 ) < 1e-6 )
		},

		'mass prop writes through to world'() {
			const body = new $bog_gamengine_phys3_body
			body.index()
			body.props().find( prop => prop.name === 'mass' )!.set( 4 )
			$mol_assert_equal( body.phys3().mass[ 0 ], 4 )
			$mol_assert_equal( body.phys3().inv_mass[ 0 ], 0.25 )
		},

	})
}
