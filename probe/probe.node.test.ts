namespace $ {

	$mol_test({

		'editor edits the scene through its view.tree source both ways'() {
			const out = $bog_probe_test( 'bog/gamengine/studio/probe/-/node.js', 'bog_gamengine_studio_probe_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_studio_probe_ok ) )
		},

		'brush keeps painting after every switch of the left column tabs'() {
			const out = $bog_probe_test( 'bog/gamengine/studio/probe/-/node.js', 'bog_gamengine_studio_probe_tabs' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_studio_probe_tabs_ok ) )
		},

		'brush over a picked asset paints and drops it, asset over a brush places and drops it'() {
			const out = $bog_probe_test( 'bog/gamengine/studio/probe/-/node.js', 'bog_gamengine_studio_probe_pick' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_studio_probe_pick_ok ) )
		},

		'gizmo drag lands on the grid with the tick and in the pointer spot without it'() {
			const out = $bog_probe_test( 'bog/gamengine/studio/probe/-/node.js', 'bog_gamengine_studio_probe_grid' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_studio_probe_grid_ok ) )
		},

		'edit lives through a reload and the editor tells the truth when saving is denied'() {
			const out = $bog_probe_test( 'bog/gamengine/studio/probe/-/node.js', 'bog_gamengine_studio_probe_keep' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_studio_probe_keep_ok ) )
		},

		'second editor sees the scene edit of the first through a land within 500 ms'() {
			const out = $bog_probe_test( 'bog/gamengine/studio/probe/-/node.js', 'bog_gamengine_studio_probe_live' )
			$mol_assert_ok(
				out.includes( $bog_probe_skip )
				|| out.includes( $bog_gamengine_studio_probe_no_master )
				|| out.includes( $bog_gamengine_studio_probe_live_ok )
			)
		},

	})

}
