namespace $ {

	$mol_test({

		'thousand rapier boxes settle on the floor within step budget'() {
			const out = $bog_probe_test( 'bog/gamengine/spike/rapier/probe/-/node.js', 'bog_gamengine_spike_rapier_probe_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_spike_rapier_probe_ok ) )
		},

	})

}
