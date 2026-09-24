namespace $ {

	$mol_test({

		'editor edits the scene through its view.tree source both ways'() {
			const out = $bog_probe_test( 'bog/gamestudio/probe/-/node.js', 'bog_gamestudio_probe_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamestudio_probe_ok ) )
		},

		'edit lives through a reload and the editor tells the truth when saving is denied'() {
			const out = $bog_probe_test( 'bog/gamestudio/probe/-/node.js', 'bog_gamestudio_probe_keep' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamestudio_probe_keep_ok ) )
		},

		'second editor sees the scene edit of the first through a land within 500 ms'() {
			const out = $bog_probe_test( 'bog/gamestudio/probe/-/node.js', 'bog_gamestudio_probe_live' )
			$mol_assert_ok(
				out.includes( $bog_probe_skip )
				|| out.includes( $bog_gamestudio_probe_no_master )
				|| out.includes( $bog_gamestudio_probe_live_ok )
			)
		},

	})

}
