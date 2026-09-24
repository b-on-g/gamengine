namespace $ {

	const map = [
		'#####',
		'#.E.#',
		'#.P.#',
		'#####',
	].join( '\n' )

	$mol_test({

		'arena measures the map by rows and the longest row'() {
			const arena = new $bog_shooter_arena
			arena.map( map )
			$mol_assert_equal( arena.width(), 5 )
			$mol_assert_equal( arena.height(), 4 )
		},

		'walls are every cell with the wall sign'() {
			const arena = new $bog_shooter_arena
			arena.map( map )
			$mol_assert_equal( arena.wall_ids().length, 14 )
			$mol_assert_equal( arena.wall( 0, 0 ), true )
			$mol_assert_equal( arena.wall( 2, 1 ), false )
		},

		'target ids keep the cell coordinates'() {
			const arena = new $bog_shooter_arena
			arena.map( map )
			$mol_assert_equal( arena.target_ids(), [ '2_1' ] )
			$mol_assert_equal( [ ... arena.xy( '2_1', new Int32Array( 2 ) ) ], [ 2, 1 ] )
		},

		'cell position lands in the middle of the cell at the asked height'() {
			const arena = new $bog_shooter_arena
			arena.map( map )
			$mol_assert_equal( [ ... arena.pos_of( '2_1', 0.5 ) ], [ 2.5, 0.5, 1.5 ] )
		},

		'start position comes from the start sign'() {
			const arena = new $bog_shooter_arena
			arena.map( map )
			$mol_assert_equal( [ ... arena.start_pos( 0.5 ) ], [ 2.5, 0.5, 2.5 ] )
		},

	})

}
