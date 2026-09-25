namespace $ {

	$mol_test({

		'level at the start keeps its recorded signature'() {
			const out = $bog_probe_test( 'bog/gamengine/demo/jumper/look/-/node.js', 'bog_gamengine_demo_jumper_look_check' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_look_ok ) )
		},

	})

}
