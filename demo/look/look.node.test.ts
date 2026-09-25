namespace $ {

	$mol_test({

		'level of the jumper at the start keeps its recorded signature'() {
			const out = $bog_probe_test( 'bog/gamengine/demo/look/-/node.js', 'bog_gamengine_demo_look_check_jumper' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_look_ok, $bog_gamengine_look_away ) )
		},

		'arena of the shooter before the first shot keeps its recorded signature'() {
			const out = $bog_probe_test( 'bog/gamengine/demo/look/-/node.js', 'bog_gamengine_demo_look_check_shooter' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_look_ok, $bog_gamengine_look_away ) )
		},

		'field of the legion before the battle keeps its recorded signature'() {
			const out = $bog_probe_test( 'bog/gamengine/demo/look/-/node.js', 'bog_gamengine_demo_look_check_legion' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_look_ok, $bog_gamengine_look_away ) )
		},

		'every game of the demo has a signature of its own page'() {
			const games = Object.keys( $bog_gamengine_demo_look_games )
			$mol_assert_equal( games.length, new Set( games.map( game => $bog_gamengine_demo_look_of( game ).page ) ).size )
		},

	})

}
