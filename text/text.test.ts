namespace $ {

	function $bog_gamengine_text_test_atlas( names: readonly string[] ) {
		const atlas = new $bog_gamengine_atlas
		atlas.sources( names.map( name => ({ name, image: { width: 64, height: 64 } as unknown as TexImageSource }) ) )
		return atlas
	}

	function $bog_gamengine_text_test_make( value: string, align: $bog_gamengine_text_align = 'left' ) {
		const text = new $bog_gamengine_text
		text.atlas( $bog_gamengine_text_test_atlas([ 'a', 'b' ]) )
		text.value( value )
		text.height( 0.5 )
		text.align( align )
		return text
	}

	function $bog_gamengine_text_test_round( value: number ) {
		return Math.round( value * 1e6 ) / 1e6
	}

	$mol_test({

		'string of two chars gives two glyphs'() {
			const text = $bog_gamengine_text_test_make( 'ab' )
			$mol_assert_equal( text.pool().count, 2 )
		},

		'second glyph is shifted by advance of the first'() {
			const text = $bog_gamengine_text_test_make( 'ab' )
			const trans = text.pool().trans
			const shift = trans[ 16 + 12 ] - trans[ 12 ]
			$mol_assert_equal( $bog_gamengine_text_test_round( shift ), text.font().advance( 'a' ) * text.height() )
		},

		'align center spreads the string around the node'() {
			const text = $bog_gamengine_text_test_make( 'ab', 'center' )
			const trans = text.pool().trans
			$mol_assert_equal( $bog_gamengine_text_test_round( trans[ 12 ] + trans[ 16 + 12 ] ), 0 )
		},

		'space takes width but gives no glyph'() {
			const text = $bog_gamengine_text_test_make( 'a b' )
			$mol_assert_equal( text.pool().count, 2 )
			$mol_assert_equal( text.width(), $bog_gamengine_text_test_make( 'ab' ).width() + 0.6 * 0.5 )
		},

		'layer of a glyph is its layer in the atlas'() {
			const text = $bog_gamengine_text_test_make( 'ba' )
			const layer = text.pool().layer
			$mol_assert_equal( layer[ 0 ], 1 )
			$mol_assert_equal( layer[ 1 ], 0 )
		},

		'pool follows the value without a manual emit'() {
			const text = $bog_gamengine_text_test_make( 'ab' )
			$mol_assert_equal( text.pool().count, 2 )
			text.value( 'aba' )
			$mol_assert_equal( text.pool().count, 3 )
		},

		'pool version grows only when the input changes'() {
			const text = $bog_gamengine_text_test_make( 'ab' )
			const version = text.pool().version
			text.emit()
			text.emit()
			$mol_assert_equal( text.pool().version, version )
			text.value( 'ba' )
			$mol_assert_equal( text.pool().version, version + 1 )
		},

		'aabb covers the quad of every glyph'() {
			const text = $bog_gamengine_text_test_make( 'ab' )
			const pool = text.pool()
			const half = text.height() / 2
			for( let i = 0; i < pool.count; ++i ) {
				const x = pool.trans[ i * 16 + 12 ]
				const y = pool.trans[ i * 16 + 13 ]
				$mol_assert_ok( pool.aabb[ i * 6 ] <= x - half )
				$mol_assert_ok( pool.aabb[ i * 6 + 1 ] <= y - half )
				$mol_assert_ok( pool.aabb[ i * 6 + 3 ] >= x + half )
				$mol_assert_ok( pool.aabb[ i * 6 + 4 ] >= y + half )
			}
		},

	})

}
