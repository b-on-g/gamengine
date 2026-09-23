namespace $ {

	$mol_test({

		'without a canvas the font gives no glyphs'() {
			const font = new $bog_gamengine_text_font
			$mol_assert_equal( font.sources().length, 0 )
		},

		'without a canvas every char advances by 0.6 of the square'() {
			const font = new $bog_gamengine_text_font
			$mol_assert_equal( font.advance( 'a' ), 0.6 )
			$mol_assert_equal( font.advance( 'Ж' ), 0.6 )
		},

	})

}
