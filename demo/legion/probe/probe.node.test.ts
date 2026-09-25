namespace $ {

	$mol_test({

		'hundred units live, band selects, order moves them and the frame is cheap'() {
			const out = $bog_probe_test( 'bog/gamengine/demo/legion/probe/-/node.js', 'bog_gamengine_demo_legion_probe_check' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_demo_legion_probe_ok ) )
		},

		'order to the far corner for every own unit keeps the worst frame in budget'() {
			const out = $bog_probe_test( 'bog/gamengine/demo/legion/probe/-/node.js', 'bog_gamengine_demo_legion_probe_far' )
			$mol_assert_ok( $bog_probe_done(
				out,
				$bog_gamengine_demo_legion_probe_far_ok,
				$bog_gamengine_demo_legion_probe_far_away,
			) )
		},

		'local threshold of the far order never sits below the budget of the running battle'() {
			$mol_assert_ok( $bog_gamengine_demo_legion_probe_far_max >= $bog_gamengine_demo_legion_probe_peak_max )
		},

		'compared threshold and a printed number are two different sayings'() {
			const said = [
				$bog_gamengine_demo_legion_probe_far_ok,
				$bog_gamengine_demo_legion_probe_far_away,
			]
			for( const one of said ) $mol_assert_ok( one.length > 0 )
			$mol_assert_equal( new Set( said ).size, said.length )
		},

	})

}
