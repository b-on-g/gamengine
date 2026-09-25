namespace $ {

	$mol_test({

		'the arena draws, a shot removes a target and W walks the player forward'() {
			const out = $bog_probe_test( 'bog/gamengine/demo/shooter/probe/-/node.js', 'bog_gamengine_demo_shooter_probe_check' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_demo_shooter_probe_ok ) )
		},

	})

}
