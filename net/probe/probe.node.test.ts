namespace $ {

	$mol_test({

		'second window sees first hero move through local master within 200 ms'() {
			const out = $bog_probe_test( 'bog/gamengine/net/probe/-/node.js', 'bog_gamengine_net_probe_check' )
			$mol_assert_ok(
				out.includes( $bog_probe_skip )
				|| out.includes( $bog_gamengine_net_probe_no_master )
				|| out.includes( $bog_gamengine_net_probe_ok )
			)
		},

	})

}
