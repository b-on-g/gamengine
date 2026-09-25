namespace $ {

	function $bog_gamengine_phys_tile_test_make() {
		const tile = new $bog_gamengine_phys_tile
		tile.map( '###\n#.#\n###' )
		return tile
	}

	function $bog_gamengine_phys_tile_test_level() {
		const tile = new $bog_gamengine_phys_tile
		tile.map( '..o..\n.###.\n.E...\n#####' )
		return tile
	}

	$mol_test({

		'ahead gives the char of the cell in the given direction'() {
			const tile = $bog_gamengine_phys_tile_test_level()
			$mol_assert_equal( tile.ahead( 0.5, -2.5, 1, 0, 1 ), 'E' )
			$mol_assert_equal( tile.ahead( 2.5, -0.5, 0, -1, 1 ), '#' )
			$mol_assert_equal( tile.ahead( 2.5, -0.5, 1, 0, 1 ), '.' )
			$mol_assert_equal( tile.ahead( 2.5, -0.5, 1, 0, 3 ), '' )
		},

		'edge is true past the end of the platform and false above it'() {
			const tile = $bog_gamengine_phys_tile_test_level()
			$mol_assert_equal( tile.edge( 2.5, -0.5, 1, 0 ), false )
			$mol_assert_equal( tile.edge( 3.5, -0.5, 1, 0 ), true )
			$mol_assert_equal( tile.edge( 1.5, -0.5, -1, 0 ), true )
		},

		'edge is false when the cell ahead is solid'() {
			const tile = $bog_gamengine_phys_tile_test_level()
			$mol_assert_equal( tile.edge( 1.5, -1.5, 1, 0 ), false )
		},

		'spots gives every cell with the char'() {
			const tile = $bog_gamengine_phys_tile_test_level()
			$mol_assert_equal( tile.spots( 'o' ).length, 1 )
			$mol_assert_equal( tile.spots( 'o' )[ 0 ][ 0 ], 2 )
			$mol_assert_equal( tile.spots( 'o' )[ 0 ][ 1 ], 0 )
			$mol_assert_equal( tile.spots( 'E' ).length, 1 )
			$mol_assert_equal( tile.spots( '#' ).length, 8 )
			$mol_assert_equal( tile.spots( 'x' ).length, 0 )
		},

		'chars gives the set of chars of the map'() {
			const tile = $bog_gamengine_phys_tile_test_level()
			const chars = tile.chars()
			$mol_assert_equal( chars.size, 4 )
			$mol_assert_equal( chars.has( 'o' ), true )
			$mol_assert_equal( chars.has( 'E' ), true )
			$mol_assert_equal( chars.has( '#' ), true )
			$mol_assert_equal( chars.has( 'x' ), false )
		},

		'spots follow the map'() {
			const tile = $bog_gamengine_phys_tile_test_level()
			$mol_assert_equal( tile.spots( 'o' ).length, 1 )
			tile.map( '.....\n#####' )
			$mol_assert_equal( tile.spots( 'o' ).length, 0 )
			$mol_assert_equal( tile.chars().size, 2 )
		},

		'cell pos is the center of the cell square'() {
			const tile = $bog_gamengine_phys_tile_test_make()
			const pos = tile.cell_pos( 2, 1, new Float32Array( 3 ) )
			$mol_assert_equal( pos[ 0 ], 2.5 )
			$mol_assert_equal( pos[ 1 ], -1.5 )
			$mol_assert_equal( pos[ 2 ], 0 )
		},

		'cell at the center of a cell gives that cell back'() {
			const tile = $bog_gamengine_phys_tile_test_make()
			const pos = tile.cell_pos( 2, 1, new Float32Array( 3 ) )
			const at = tile.cell_at( pos[ 0 ], pos[ 1 ], new Int32Array( 2 ) )
			$mol_assert_equal( at[ 0 ], 2 )
			$mol_assert_equal( at[ 1 ], 1 )
		},

		'corners of a cell belong to it'() {
			const tile = $bog_gamengine_phys_tile_test_make()
			const at = new Int32Array( 2 )
			tile.cell_at( 2, -1, at )
			$mol_assert_equal( at[ 0 ], 2 )
			$mol_assert_equal( at[ 1 ], 1 )
			tile.cell_at( 2.999, -1.001, at )
			$mol_assert_equal( at[ 0 ], 2 )
			$mol_assert_equal( at[ 1 ], 1 )
		},

		'cell at a point outside the map is outside its bounds'() {
			const tile = $bog_gamengine_phys_tile_test_make()
			const at = tile.cell_at( -0.5, 0.5, new Int32Array( 2 ) )
			$mol_assert_equal( at[ 0 ], -1 )
			$mol_assert_equal( at[ 1 ], -1 )
			$mol_assert_equal( tile.cell( at[ 0 ], at[ 1 ] ), true )
		},

		'shifted grid keeps drawing and passability on the same cell'() {
			const tile = $bog_gamengine_phys_tile_test_make()
			tile.origin([ 5, - 4 ])
			const pos = tile.cell_pos( 1, 1, new Float32Array( 3 ) )
			$mol_assert_equal( [ pos[ 0 ], pos[ 1 ] ], [ 6.5, - 5.5 ] )
			const at = tile.cell_at( pos[ 0 ], pos[ 1 ], new Int32Array( 2 ) )
			$mol_assert_equal( [ at[ 0 ], at[ 1 ] ], [ 1, 1 ] )
			$mol_assert_equal( tile.solid_at( pos[ 0 ], pos[ 1 ] ), false )
			const wall = tile.cell_pos( 0, 1, new Float32Array( 3 ) )
			$mol_assert_equal( tile.solid_at( wall[ 0 ], wall[ 1 ] ), true )
			$mol_assert_equal( tile.solid_at( 1.5, - 1.5 ), true )
		},

		'solid at a point uses the same cell as cell at'() {
			const tile = $bog_gamengine_phys_tile_test_make()
			const pos = tile.cell_pos( 1, 1, new Float32Array( 3 ) )
			$mol_assert_equal( tile.solid_at( pos[ 0 ], pos[ 1 ] ), false )
			const wall = tile.cell_pos( 0, 1, new Float32Array( 3 ) )
			$mol_assert_equal( tile.solid_at( wall[ 0 ], wall[ 1 ] ), true )
		},

	})

}
