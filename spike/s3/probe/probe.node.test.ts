namespace $ {

	$mol_test({

		'quad center is red in headless chrome'() {
			const out = $bog_probe_test( 'bog/gamengine/spike/s3/probe/-/node.js', 'bog_gamengine_spike_s3_probe_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_spike_s3_probe_ok ) )
		},

	})

}
