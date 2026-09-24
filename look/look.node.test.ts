namespace $ {

	$mol_test({

		'level at the start keeps its recorded signature'() {
			const out = $bog_probe_test( 'bog/jumper/look/-/node.js', 'bog_jumper_look_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_look_ok ) )
		},

	})

}
