namespace $ {

	const map = [ '..o.', '..=.', 'E..F', '####' ].join( '\n' )

	function level_test() {
		const tile = new $bog_gamengine_phys_tile
		tile.map( map )
		tile.solid( '#=' )
		const level = new $bog_jumper_level
		level.tile( tile )
		return level
	}

	$mol_test({

		'level map gives coins, enemies, flag and size'() {
			const level = level_test()
			$mol_assert_equal( level.width(), 4 )
			$mol_assert_equal( level.height(), 4 )
			$mol_assert_equal( level.ids( 'o' ).join(), '2_0' )
			$mol_assert_equal( level.ids( 'E' ).join(), '0_2' )
			$mol_assert_equal( level.ids( 'F' ).join(), '3_2' )
		},

		'level start is the lowest free cell over the solid one'() {
			const level = level_test()
			$mol_assert_equal( level.start().join(), '0,2' )
			$mol_assert_equal( level.start_pos()[ 0 ], 0.5 )
			$mol_assert_equal( level.start_pos()[ 1 ], -2.5 )
		},

		'level tells ground from platform and sky'() {
			const level = level_test()
			$mol_assert_equal( level.frame( 0, 3 ), 'ground' )
			$mol_assert_equal( level.frame( 2, 1 ), 'platform' )
			$mol_assert_equal( level.frame( 0, 0 ), 'sky' )
			$mol_assert_equal( level.solid( 2, 1 ), true )
			$mol_assert_equal( level.solid( 2, 0 ), false )
		},

	})

}
