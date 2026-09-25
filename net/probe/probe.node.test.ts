namespace $ {

	$mol_test({

		'window asked for a master comes up on its own, declares the room and drives the hero'() {
			const out = $bog_probe_test( 'bog/gamengine/net/probe/-/node.js', 'bog_gamengine_net_probe_alone' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_net_probe_alone_ok ) )
		},

		'skipping the paired scenario, passing it and coming up alone are three different sayings'() {
			const said: readonly string[] = [
				$bog_gamengine_net_probe_no_master,
				$bog_gamengine_net_probe_ok,
				$bog_gamengine_net_probe_alone_ok,
			]
			for( const one of said ) $mol_assert_ok( one.length > 0 )
			$mol_assert_equal( new Set( said ).size, said.length )
		},

	})

}
