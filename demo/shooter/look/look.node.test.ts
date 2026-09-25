namespace $ {

	$mol_test({

		'arena before the first shot keeps its recorded signature'() {
			const out = $bog_probe_test( 'bog/gamengine/demo/shooter/look/-/node.js', 'bog_gamengine_demo_shooter_look_check' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_look_ok ) )
		},

	})

}
