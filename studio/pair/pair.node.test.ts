namespace $ {

	$mol_test({

		'second editor sees the scene edit of the first through a land within 500 ms'() {
			const out = $bog_probe_test( 'bog/gamengine/studio/probe/-/node.js', 'bog_gamengine_studio_probe_live' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_studio_probe_no_master, $bog_gamengine_studio_probe_live_ok ) )
		},

	})

}
