namespace $ {

	function $bog_gamengine_phys_tile_test_make() {
		const tile = new $bog_gamengine_phys_tile
		tile.map( '###\n#.#\n###' )
		return tile
	}

	$mol_test({

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

		'solid at a point uses the same cell as cell at'() {
			const tile = $bog_gamengine_phys_tile_test_make()
			const pos = tile.cell_pos( 1, 1, new Float32Array( 3 ) )
			$mol_assert_equal( tile.solid_at( pos[ 0 ], pos[ 1 ] ), false )
			const wall = tile.cell_pos( 0, 1, new Float32Array( 3 ) )
			$mol_assert_equal( tile.solid_at( wall[ 0 ], wall[ 1 ] ), true )
		},

	})

}
