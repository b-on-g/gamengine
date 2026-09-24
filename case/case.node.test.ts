namespace $ {

	function case_file( name: string ) {
		return $mol_file.relative( `bog/gamestudio/case/${ name }` ).text()
	}

	$mol_test({

		'module exported from the editor document is the one built in this folder'( $ ) {
			const doc = $bog_gamestudio_doc.create( doc => {
				doc.$ = $
				doc.source( $bog_gamestudio_case_source )
			} )
			const made = doc.module( '$bog_gamestudio_case' )
			$mol_assert_equal( made.tree, case_file( 'case.view.tree' ) )
			$mol_assert_equal( made.ts, case_file( 'case.view.ts' ) )
		},

		'editor document itself keeps the list form that never type checks'( $ ) {
			$mol_assert_ok( $bog_gamestudio_case_source.includes( '\t\t\tpos / 3.25 0 0\n' ) )
			$mol_assert_not( case_file( 'case.view.tree' ).includes( 'pos / ' ) )
		},

		'every vector of the document becomes a typed port'( $ ) {
			const doc = $bog_gamestudio_doc.create( doc => {
				doc.$ = $
				doc.source( $bog_gamestudio_case_source )
			} )
			const made = doc.module( '$bog_gamestudio_case' )
			$mol_assert_not( /^\t+\w+\?? \/ -?[\d.]/m.test( made.tree ) )
			for( const port of [ 'Hero_pos', 'Coin_pos', 'Coin_tint', 'Wall_pos', 'Wall_scale', 'Sprite_1_pos' ] ) {
				$mol_assert_ok( made.tree.includes( `<= ${ port } Float32Array` ) )
				$mol_assert_ok( made.ts.includes( `${ port }() {` ) )
			}
		},

		'lists of strings are left alone'( $ ) {
			const doc = $bog_gamestudio_doc.create( doc => {
				doc.$ = $
				doc.source( $bog_gamestudio_case_source )
			} )
			const made = doc.module( '$bog_gamestudio_case' )
			$mol_assert_ok( made.tree.includes( '\t\turis /\n\t\t\t\\bog/gamengine/demo/atlas/hero.png\n' ) )
		},

	})

}
