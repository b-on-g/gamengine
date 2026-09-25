namespace $ {

	function grid( map: string ) {
		const tile = new $bog_gamengine_phys_tile
		tile.map( map )
		const grid = new $bog_gamengine_nav_grid
		grid.tile( tile )
		return grid
	}

	function length( path: Float32Array, count: number ) {
		let sum = 0
		for( let i = 1; i < count; ++i ) {
			sum += Math.hypot( path[ i * 2 ] - path[ i * 2 - 2 ], path[ i * 2 + 1 ] - path[ i * 2 - 1 ] )
		}
		return sum
	}

	$mol_test({

		'wall between points gives detour longer than straight line and outside the wall'() {
			const nav = grid( '#######\n#..#..#\n#..#..#\n#.....#\n#######' )
			const out = new Float32Array( 64 )
			const count = nav.path( new Float32Array([ 1.5, -1.5, 0 ]), new Float32Array([ 5.5, -1.5, 0 ]), out )
			$mol_assert_ok( count > 2 )
			$mol_assert_ok( length( out, count ) > 4 )
			for( let i = 0; i < count; ++i ) $mol_assert_not( nav.solid_at( out[ i * 2 ], out[ i * 2 + 1 ] ) )
		},

		'shifted grid takes and gives world points of the shifted map'() {
			const nav = grid( '#######\n#..#..#\n#..#..#\n#.....#\n#######' )
			nav.tile()!.origin([ 10, - 20 ])
			$mol_assert_equal( nav.solid_at( 11.5, - 21.5 ), false )
			$mol_assert_equal( nav.solid_at( 13.5, - 21.5 ), true )
			$mol_assert_equal( nav.solid_at( 1.5, - 1.5 ), true )
			const out = new Float32Array( 64 )
			const count = nav.path( new Float32Array([ 11.5, -21.5, 0 ]), new Float32Array([ 15.5, -21.5, 0 ]), out )
			$mol_assert_ok( count > 2 )
			$mol_assert_ok( length( out, count ) > 4 )
			for( let i = 0; i < count; ++i ) $mol_assert_not( nav.solid_at( out[ i * 2 ], out[ i * 2 + 1 ] ) )
			$mol_assert_equal( [ out[ 0 ], out[ 1 ] ], [ 11.5, - 21.5 ] )
			$mol_assert_equal( [ out[ count * 2 - 2 ], out[ count * 2 - 1 ] ], [ 15.5, - 21.5 ] )
		},

		'path off the shifted map gives zero'() {
			const nav = grid( '#######\n#..#..#\n#..#..#\n#.....#\n#######' )
			nav.tile()!.origin([ 10, - 20 ])
			const out = new Float32Array( 64 )
			$mol_assert_equal( nav.path( new Float32Array([ 1.5, -1.5, 0 ]), new Float32Array([ 15.5, -21.5, 0 ]), out ), 0 )
		},

		'unreachable target gives zero'() {
			const nav = grid( '#######\n#..#..#\n#..#..#\n#..#..#\n#######' )
			const out = new Float32Array( 64 )
			const count = nav.path( new Float32Array([ 1.5, -1.5, 0 ]), new Float32Array([ 5.5, -1.5, 0 ]), out )
			$mol_assert_equal( count, 0 )
		},

		'smooth on empty map gives two points'() {
			const nav = grid( '########\n#......#\n#......#\n#......#\n#......#\n########' )
			const out = new Float32Array( 64 )
			const count = nav.path( new Float32Array([ 1.5, -1.5, 0 ]), new Float32Array([ 6.5, -4.5, 0 ]), out )
			$mol_assert_ok( count > 2 )
			const smooth = nav.smooth( out, count, out )
			$mol_assert_equal( smooth, 2 )
			$mol_assert_equal( out[ 2 ], 6.5 )
			$mol_assert_equal( out[ 3 ], -4.5 )
		},

		'diagonal path does not cut wall corner'() {
			const nav = grid( '#####\n#.#.#\n#...#\n#####' )
			const out = new Float32Array( 64 )
			const count = nav.path( new Float32Array([ 1.5, -1.5, 0 ]), new Float32Array([ 3.5, -1.5, 0 ]), out )
			$mol_assert_equal( count, 5 )
			$mol_assert_equal( out[ 2 ], 1.5 )
			$mol_assert_equal( out[ 3 ], -2.5 )
			$mol_assert_equal( out[ 6 ], 3.5 )
			$mol_assert_equal( out[ 7 ], -2.5 )
		},

		'dynamic block changes the path'() {
			const nav = grid( '#####\n#...#\n#...#\n#####' )
			const out = new Float32Array( 64 )
			const from = new Float32Array([ 1.5, -1.5, 0 ])
			const to = new Float32Array([ 3.5, -1.5, 0 ])
			$mol_assert_equal( nav.path( from, to, out ), 3 )
			nav.block( 2, 1, true )
			$mol_assert_equal( nav.path( from, to, out ), 5 )
			nav.block( 2, 1, false )
			$mol_assert_equal( nav.path( from, to, out ), 3 )
		},

	})

}
