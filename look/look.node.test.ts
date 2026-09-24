namespace $ {

	$mol_test({

		'field before the battle keeps its recorded signature'() {
			const out = $bog_probe_test( 'bog/legion/look/-/node.js', 'bog_legion_look_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_look_ok ) )
		},

	})

}
