namespace $ {

	$mol_test({

		'editor edits the scene through its view.tree source both ways'() {
			const out = $bog_probe_test( 'bog/gamengine/studio/probe/-/node.js', 'bog_gamengine_studio_probe_check' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_studio_probe_ok ) )
		},

		'brush keeps painting after every switch of the left column tabs'() {
			const out = $bog_probe_test( 'bog/gamengine/studio/probe/-/node.js', 'bog_gamengine_studio_probe_tabs' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_studio_probe_tabs_ok ) )
		},

		'brush over a picked asset paints and drops it, asset over a brush places and drops it'() {
			const out = $bog_probe_test( 'bog/gamengine/studio/probe/-/node.js', 'bog_gamengine_studio_probe_pick' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_studio_probe_pick_ok ) )
		},

		'gizmo drag lands on the grid with the tick and in the pointer spot without it'() {
			const out = $bog_probe_test( 'bog/gamengine/studio/probe/-/node.js', 'bog_gamengine_studio_probe_grid' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_studio_probe_grid_ok ) )
		},

		'edit lives through a reload and the editor tells the truth when saving is denied'() {
			const out = $bog_probe_test( 'bog/gamengine/studio/probe/-/node.js', 'bog_gamengine_studio_probe_keep' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_studio_probe_keep_ok ) )
		},

		'whole path from the sample to an exported level goes by mouse alone'() {
			const out = $bog_probe_test( 'bog/gamengine/studio/probe/-/node.js', 'bog_gamengine_studio_probe_pass' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_studio_probe_pass_ok ) )
		},

		'editor asked for a master comes up on its own, declares its land and shows the document'() {
			const out = $bog_probe_test( 'bog/gamengine/studio/probe/-/node.js', 'bog_gamengine_studio_probe_alone' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_studio_probe_alone_ok ) )
		},

		'skipping the live scenario, passing it and coming up alone are three different sayings'() {
			const said: readonly string[] = [
				$bog_gamengine_studio_probe_no_master,
				$bog_gamengine_studio_probe_live_ok,
				$bog_gamengine_studio_probe_alone_ok,
			]
			for( const one of said ) $mol_assert_ok( one.length > 0 )
			$mol_assert_equal( new Set( said ).size, said.length )
		},

	})

}
