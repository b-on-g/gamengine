namespace $ {

	function $bog_gamengine_text_font_test_make() {
		const font = new $bog_gamengine_text_font
		const glyphs: $bog_gamengine_text_font_glyphs = {
			sources: [],
			advance: new Map([ [ 'a', 0.25 ], [ 'b', 0.75 ], [ ' ', 0.5 ] ]),
		}
		Object.assign( font, { glyphs: ()=> glyphs } )
		return font
	}

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

		'advances in bulk agrees with advance one by one, edges included'() {
			const font = $bog_gamengine_text_font_test_make()
			const odd = String.fromCharCode( 0 ) + String.fromCharCode( 0xFFFF )
			for( const value of [ '', 'a', 'ab Ж', '  ', odd, '\u{1F600}', 'a\u{1F600}b', '\t\n' ] ) {
				const bulk = font.advances( value, new Float64Array( Math.max( 1, value.length ) ) )
				for( let i = 0; i < value.length; ++ i ) {
					$mol_assert_equal( bulk[ i ], font.advance( value[ i ] ) )
				}
			}
		},

		'total in bulk agrees with the sum of advance one by one'() {
			const font = $bog_gamengine_text_font_test_make()
			for( const value of [ '', 'a', 'ab Ж', '😀', 'a😀b' ] ) {
				let sum = 0
				for( let i = 0; i < value.length; ++ i ) sum += font.advance( value[ i ] )
				$mol_assert_equal( font.total( value ), sum )
			}
		},

		'bulk leaves the tail of a longer buffer alone'() {
			const font = $bog_gamengine_text_font_test_make()
			const out = new Float64Array( 8 ).fill( - 1 )
			font.advances( 'ab', out )
			$mol_assert_equal( [ out[ 0 ], out[ 1 ] ], [ font.advance( 'a' ), font.advance( 'b' ) ] )
			$mol_assert_equal( [ out[ 2 ], out[ 7 ] ], [ - 1, - 1 ] )
		},

	})

}
