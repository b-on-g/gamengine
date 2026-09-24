namespace $ {

	function $bog_gamengine_map_test_make( plane: $bog_gamengine_map_plane = 'xy' ) {
		const map = new $bog_gamengine_map
		map.map( [
			'#####',
			'#.E.#',
			'#.P.',
			'#####',
		].join( '\n' ) )
		map.plane( plane )
		return map
	}

	$mol_test({

		'size comes from the row count and the longest row'() {
			const map = $bog_gamengine_map_test_make()
			$mol_assert_equal( map.width(), 5 )
			$mol_assert_equal( map.height(), 4 )
		},

		'char outside the map is empty'() {
			const map = $bog_gamengine_map_test_make()
			$mol_assert_equal( map.char( 2, 1 ), 'E' )
			$mol_assert_equal( map.char( 4, 2 ), '' )
			$mol_assert_equal( map.char( - 1, 0 ), '' )
			$mol_assert_equal( map.char( 0, 4 ), '' )
		},

		'spots list every cell with the char'() {
			const map = $bog_gamengine_map_test_make()
			$mol_assert_equal( map.spots( 'E' ), [ [ 2, 1 ] ] )
			$mol_assert_equal( map.spots( '#' ).length, 13 )
			$mol_assert_equal( map.spots( 'x' ).length, 0 )
		},

		'chars gather the whole alphabet of the map'() {
			const map = $bog_gamengine_map_test_make()
			$mol_assert_equal( [ ... map.chars() ].sort(), [ '#', '.', 'E', 'P' ] )
		},

		'id keeps the cell coordinates'() {
			const map = $bog_gamengine_map_test_make()
			$mol_assert_equal( map.ids( 'P' ), [ '2_2' ] )
			$mol_assert_equal( [ ... map.xy( '2_2', new Int32Array( 2 ) ) ], [ 2, 2 ] )
		},

		'flat plane puts the cell center on xy with rows going down'() {
			const map = $bog_gamengine_map_test_make()
			$mol_assert_equal( [ ... map.pos( 2, 1, 0, new Float32Array( 3 ) ) ], [ 2.5, - 1.5, 0 ] )
		},

		'ground plane puts the cell center on xz at the asked lift'() {
			const map = $bog_gamengine_map_test_make( 'xz' )
			$mol_assert_equal( [ ... map.spot_pos( '2_1', 0.5, new Float32Array( 3 ) ) ], [ 2.5, 0.5, 1.5 ] )
		},

		'center sits in the middle of the map on both planes'() {
			$mol_assert_equal( [ ... $bog_gamengine_map_test_make().center( 0, new Float32Array( 3 ) ) ], [ 2.5, - 2, 0 ] )
			$mol_assert_equal( [ ... $bog_gamengine_map_test_make( 'xz' ).center( 0, new Float32Array( 3 ) ) ], [ 2.5, 0, 2 ] )
		},

		'edit of the map moves the spots'() {
			const map = $bog_gamengine_map_test_make()
			map.map( '..\n.E' )
			$mol_assert_equal( map.spots( 'E' ), [ [ 1, 1 ] ] )
			$mol_assert_equal( map.ids( 'P' ).length, 0 )
		},

	})

}
