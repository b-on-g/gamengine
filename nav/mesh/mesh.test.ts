namespace $ {

	function rect( x0: number, z0: number, x1: number, z1: number ) {
		return new Float32Array([ x0, z0, x1, z0, x1, z1, x0, z1 ])
	}

	function length( path: Float32Array, count: number ) {
		let sum = 0
		for( let i = 1; i < count; ++i ) {
			sum += Math.hypot( path[ i * 3 ] - path[ i * 3 - 3 ], path[ i * 3 + 2 ] - path[ i * 3 - 1 ] )
		}
		return sum
	}

	$mol_test({

		'two rectangles with common edge give path through the edge'() {
			const mesh = new $bog_gamengine_nav_mesh
			mesh.polys([ rect( 0, 0, 1, 1 ), rect( 1, 0, 2, 1 ) ])
			$mol_assert_equal( mesh.build(), 1 )
			const out = new Float32Array( 30 )
			const count = mesh.path( new Float32Array([ 0.5, 0, 0.5 ]), new Float32Array([ 1.5, 0, 0.5 ]), out )
			$mol_assert_equal( count, 2 )
			$mol_assert_equal( out[ 0 ], 0.5 )
			$mol_assert_equal( out[ 3 ], 1.5 )
			$mol_assert_equal( out[ 5 ], 0.5 )
		},

		'funnel on L corridor of three rectangles gives start corner and finish'() {
			const mesh = new $bog_gamengine_nav_mesh
			mesh.polys([ rect( 0, 0, 1, 2 ), rect( 0, 2, 1, 3 ), rect( 1, 2, 3, 3 ) ])
			$mol_assert_equal( mesh.build(), 2 )
			const out = new Float32Array( 30 )
			const count = mesh.path( new Float32Array([ 0.5, 0, 0.5 ]), new Float32Array([ 2.5, 0, 2.5 ]), out )
			$mol_assert_equal( count, 3 )
			$mol_assert_equal( out[ 3 ], 1 )
			$mol_assert_equal( out[ 5 ], 2 )
			$mol_assert_equal( out[ 6 ], 2.5 )
			$mol_assert_equal( out[ 8 ], 2.5 )
		},

		'from_tile of 5x5 map with one wall gives several polygons and detour'() {
			const tile = new $bog_gamengine_phys_tile
			tile.map( '.....\n.....\n..#..\n.....\n.....' )
			const mesh = new $bog_gamengine_nav_mesh
			mesh.from_tile( tile, 1 )
			$mol_assert_ok( mesh.polys().length > 1 )
			const out = new Float32Array( 30 )
			const count = mesh.path( new Float32Array([ 2.5, 0, 0.5 ]), new Float32Array([ 2.5, 0, 4.5 ]), out )
			$mol_assert_ok( count > 2 )
			$mol_assert_ok( length( out, count ) > 4 )
			$mol_assert_equal( out[ 1 ], 1 )
			for( let i = 0; i < count; ++i ) {
				const inside = out[ i * 3 ] > 2 && out[ i * 3 ] < 3 && out[ i * 3 + 2 ] > 2 && out[ i * 3 + 2 ] < 3
				$mol_assert_not( inside )
			}
		},

	})

}
