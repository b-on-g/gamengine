namespace $ {

	$mol_test({

		'hero jumps and lands, walks right over a coin and the level is drawn'() {
			const out = $bog_probe_test( 'bog/gamengine/demo/jumper/probe/-/node.js', 'bog_gamengine_demo_jumper_probe_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_demo_jumper_probe_ok ) )
		},

	})

}
