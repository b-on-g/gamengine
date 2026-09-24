namespace $ {

	const dt = 1 / 60

	function floor( world: $bog_gamengine_phys3, nx = 0, ny = 1, nz = 0 ) {
		return world.index_of( world.add( $bog_gamengine_phys3.shape_plane, new Float32Array([ nx, ny, nz ]), 0, new Float32Array( 3 ) ) )
	}

	function box( world: $bog_gamengine_phys3, x: number, y: number, z: number, rot?: Float32Array ) {
		return world.index_of( world.add( $bog_gamengine_phys3.shape_box, new Float32Array([ 0.5, 0.5, 0.5 ]), 1, new Float32Array([ x, y, z ]), rot ) )
	}

	function sphere( world: $bog_gamengine_phys3, x: number, y: number, z: number ) {
		return world.index_of( world.add( $bog_gamengine_phys3.shape_sphere, new Float32Array([ 0.5, 0, 0 ]), 1, new Float32Array([ x, y, z ]) ) )
	}

	function run( world: $bog_gamengine_phys3, seconds: number ) {
		const steps = Math.round( seconds / dt )
		for( let k = 0; k < steps; ++ k ) world.step( dt )
	}

	function speed( world: $bog_gamengine_phys3, i: number ) {
		return $bog_gamengine_vec_len( world.vel.subarray( i * 3, i * 3 + 3 ) )
	}

	function slope( angle: number ) {
		const world = new $bog_gamengine_phys3
		const rot = $bog_gamengine_vec_quat_from_axis( new Float32Array( 4 ), new Float32Array([ 0, 0, 1 ]), angle )
		const nx = - Math.sin( angle ), ny = Math.cos( angle )
		floor( world, nx, ny, 0 )
		const i = box( world, nx * 0.5, ny * 0.5, 0, rot )
		return { world, i }
	}

	$mol_test({

		'box dropped from 2 rests on the plane after 3 s and sleeps'() {
			const world = new $bog_gamengine_phys3
			floor( world )
			const i = box( world, 0, 2, 0 )
			run( world, 3 )
			$mol_assert_ok( Math.abs( world.pos[ i * 3 + 1 ] - 0.5 ) < 0.01 )
			$mol_assert_ok( speed( world, i ) < 0.01 )
			$mol_assert_ok( world.flags[ i ] & $bog_gamengine_phys3.flag_sleep )
		},

		'box on a 20 degree slope with friction 0.5 stays'() {
			const { world, i } = slope( 20 * Math.PI / 180 )
			const x0 = world.pos[ i * 3 ], y0 = world.pos[ i * 3 + 1 ]
			run( world, 2 )
			$mol_assert_ok( Math.abs( world.pos[ i * 3 ] - x0 ) < 0.02 )
			$mol_assert_ok( Math.abs( world.pos[ i * 3 + 1 ] - y0 ) < 0.02 )
		},

		'box on a 40 degree slope slides faster and faster'() {
			const { world, i } = slope( 40 * Math.PI / 180 )
			run( world, 0.5 )
			const first = speed( world, i )
			run( world, 0.5 )
			const second = speed( world, i )
			$mol_assert_ok( first > 0.5 )
			$mol_assert_ok( second > first + 0.5 )
		},

		'bouncy sphere dropped from 1 rises above 0.5'() {
			const world = new $bog_gamengine_phys3
			world.restitution( 0.8 )
			floor( world )
			const i = sphere( world, 0, 1.5, 0 )
			let top = 0, bounced = false
			for( let k = 0; k < 120; ++ k ) {
				world.step( dt )
				if( world.vel[ i * 3 + 1 ] > 0 ) bounced = true
				if( bounced && world.pos[ i * 3 + 1 ] > top ) top = world.pos[ i * 3 + 1 ]
			}
			$mol_assert_ok( top - 0.5 > 0.5 )
		},

		'stack of three boxes stands 3 s without drifting'() {
			const world = new $bog_gamengine_phys3
			floor( world )
			const ids = [ box( world, 0, 0.5, 0 ), box( world, 0, 1.51, 0 ), box( world, 0, 2.52, 0 ) ]
			run( world, 3 )
			for( const i of ids ) {
				$mol_assert_ok( Math.abs( world.pos[ i * 3 ] ) < 0.02 )
				$mol_assert_ok( Math.abs( world.pos[ i * 3 + 2 ] ) < 0.02 )
			}
			$mol_assert_ok( world.pos[ ids[ 2 ] * 3 + 1 ] > 2.4 )
		},

		'ghost neither pushes nor is pushed but has a contact'() {
			const world = new $bog_gamengine_phys3
			world.gravity( new Float32Array( 3 ) )
			const a = sphere( world, 0, 0, 0 )
			const g = sphere( world, 0.8, 0, 0 )
			world.flags[ g ] |= $bog_gamengine_phys3.flag_ghost
			world.vel[ a * 3 ] = 1
			world.step( dt )
			$mol_assert_equal( world.narrow.contact_count, 1 )
			$mol_assert_equal( world.vel[ a * 3 ], 1 )
			$mol_assert_equal( world.vel[ g * 3 ], 0 )
		},

		'two boxes collide head-on and keep total momentum'() {
			const world = new $bog_gamengine_phys3
			world.gravity( new Float32Array( 3 ) )
			world.restitution( 1 )
			const a = box( world, -1.5, 0, 0 )
			const b = box( world, 1.5, 0, 0 )
			world.vel[ a * 3 ] = 6
			world.vel[ b * 3 ] = -2
			run( world, 1 )
			$mol_assert_ok( world.vel[ a * 3 ] < 0 )
			$mol_assert_ok( world.vel[ b * 3 ] > 0 )
			$mol_assert_ok( Math.abs( world.vel[ a * 3 ] + world.vel[ b * 3 ] - 4 ) < 0.2 )
		},

		'warm start keeps the normal impulse of a resting box between frames'() {
			const world = new $bog_gamengine_phys3
			floor( world )
			box( world, 0, 0.497, 0 )
			world.step( dt )
			world.step( dt )
			let sum = 0
			for( let k = 0; k < world.solve.prev_count; ++ k ) sum += world.solve.prev_pn[ k ]
			$mol_assert_ok( Math.abs( sum - 9.81 * dt ) < 1e-3 )
		},

		'thousand boxes in a 10x10x10 pile settle above the plane within 20 ms per step'() {
			const world = new $bog_gamengine_phys3
			floor( world )
			for( let x = 0; x < 10; ++ x ) for( let y = 0; y < 10; ++ y ) for( let z = 0; z < 10; ++ z ) {
				box( world, x * 1.1 - 5, y * 1.1 + 0.6, z * 1.1 - 5 )
			}
			const steps = Math.round( 3 / dt )
			let total = 0
			for( let k = 0; k < steps; ++ k ) {
				const start = performance.now()
				world.step( dt )
				total += performance.now() - start
			}
			for( let i = 1; i < world.count; ++ i ) $mol_assert_ok( world.pos[ i * 3 + 1 ] > 0.4 )
			$mol_assert_ok( total / steps < 20 )
		},

	})

}
