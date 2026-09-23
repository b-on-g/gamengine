namespace $ {

	$mol_test({

		'editor shows three columns, draws the sample and inspects the clicked node'() {
			const out = $bog_probe_test( 'bog/gamestudio/probe/-/node.js', 'bog_gamestudio_probe_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamestudio_probe_ok ) )
		},

	})

}
