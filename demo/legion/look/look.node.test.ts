namespace $ {

	$mol_test({

		'field before the battle keeps its recorded signature'() {
			const out = $bog_probe_test( 'bog/gamengine/demo/legion/look/-/node.js', 'bog_gamengine_demo_legion_look_check' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_look_ok, $bog_gamengine_look_away ) )
		},

	})

}
