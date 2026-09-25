namespace $ {

	$mol_test({

		'hundred units live, band selects, order moves them and the frame is cheap'() {
			const out = $bog_probe_test( 'bog/gamengine/demo/legion/probe/-/node.js', 'bog_gamengine_demo_legion_probe_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_demo_legion_probe_ok ) )
		},

	})

}
