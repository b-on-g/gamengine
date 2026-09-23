namespace $ {

	$mol_test({

		'scan finds six png in demo atlas'() {
			const files = $bog_gamengine_pack_scan( 'bog/gamengine/demo/atlas' )
			$mol_assert_equal( files.length, 6 )
			$mol_assert_ok( files.every( file => file.endsWith( '.png' ) ) )
		},

		'names collapse folders into underscores and drop extensions'() {
			$mol_assert_equal(
				$bog_gamengine_pack_names( 'tex', [ 'tex/meme/1.jpg', 'tex/wall_0.png' ] ),
				[ 'meme_1', 'wall_0' ],
			)
		},

		'names fail on a duplicate layer'() {
			$mol_assert_fail( ()=> $bog_gamengine_pack_names( 'tex', [ 'tex/a.png', 'tex/a.jpg' ] ), Error )
		},

		'square turns hero into 32×32 png'() {
			const out = $bog_probe_test( 'bog/gamengine/pack/-/node.js', 'bog_gamengine_pack_square_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_pack_square_ok ) )
		},

		'atlas of two images gives two squares, meta with deploys and layer list'() {
			const out = $bog_probe_test( 'bog/gamengine/pack/-/node.js', 'bog_gamengine_pack_atlas_check' )
			$mol_assert_ok( out.includes( $bog_probe_skip ) || out.includes( $bog_gamengine_pack_atlas_ok ) )
		},

	})

}
