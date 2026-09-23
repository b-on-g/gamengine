namespace $ {

	$mol_test({

		'quad center is red and no buffers after second frame'() {
			const out = $bog_probe_test( 'bog/gamengine/probe/-/node.js', 'bog_gamengine_probe_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_probe_ok ) )
		},

		'flat hero walks right on D and floor shows through hero corner'() {
			const out = $bog_probe_test( 'bog/gamengine/probe/-/node.js', 'bog_gamengine_probe_flat_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_probe_flat_ok ) )
		},

		'room walker goes forward on W and lit wall is brighter than shaded one'() {
			const out = $bog_probe_test( 'bog/gamengine/probe/-/node.js', 'bog_gamengine_probe_room_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_probe_room_ok ) )
		},

	})

}
