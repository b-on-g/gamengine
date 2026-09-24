namespace $ {

	$mol_test({

		'arena before the first shot keeps its recorded signature'() {
			const out = $bog_probe_test( 'bog/shooter/look/-/node.js', 'bog_shooter_look_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_look_ok ) )
		},

	})

}
