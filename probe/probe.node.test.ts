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

		'room walker goes forward on W, lit wall is brighter than shaded one, glb pillar differs from floor'() {
			const out = $bog_probe_test( 'bog/gamengine/probe/-/node.js', 'bog_gamengine_probe_room_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_probe_room_ok ) )
		},

		'room and flat pages load without a single thrown exception'() {
			const out = $bog_probe_test( 'bog/gamengine/probe/-/node.js', 'bog_gamengine_probe_quiet_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_probe_quiet_ok ) )
		},

		'boxes settle on the floor with contacts, click throws one more, center is not black'() {
			const out = $bog_probe_test( 'bog/gamengine/probe/-/node.js', 'bog_gamengine_probe_boxes_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_probe_boxes_ok ) )
		},

		'lit over shade holds in linear light and slips in screen light'() {
			const lit = [ 152, 75, 59, 255 ] as const
			const shade = [ 120, 55, 47, 255 ] as const
			$mol_assert_ok( $bog_gamengine_probe_linear( lit ) > $bog_gamengine_probe_linear( shade ) * 1.3 )
			$mol_assert_ok( !( $bog_gamengine_probe_sum( lit ) > $bog_gamengine_probe_sum( shade ) * 1.3 ) )
		},

	})

}
