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

		'assets of demo pack come from meta.tree deploy lines with kinds'() {
			const list = $bog_gamengine_pack_assets( 'bog/gamengine/demo' )
			const kind = ( uri: string )=> list.find( item => item.uri === uri )?.kind ?? null
			$mol_assert_equal( kind( 'bog/gamengine/demo/atlas/hero.png' ), 'image' )
			$mol_assert_equal( kind( 'bog/gamengine/demo/room/model/pillar.glb' ), 'model' )
			$mol_assert_equal( kind( 'bog/gamengine/demo/sound/coin.wav' ), 'sound' )
			$mol_assert_equal( list.map( item => item.uri ), [ ... list.map( item => item.uri ) ].sort() )
		},

		'assets skip meta.tree inside build folders'() {
			const tmp = String( $node.fs.mkdtempSync( $node.path.join( $node.os.tmpdir(), 'bog-pack-' ) ) )
			try {
				$node.fs.mkdirSync( $node.path.join( tmp, '-' ) )
				$node.fs.mkdirSync( $node.path.join( tmp, 'deep' ) )
				$node.fs.writeFileSync( $node.path.join( tmp, '-', 'x.meta.tree' ), 'deploy \\/skip/hidden.png\n' )
				$node.fs.writeFileSync( $node.path.join( tmp, 'deep', 'deep.meta.tree' ), 'deploy \\/deep/seen.txt\ndeploy \\/deep/seen.txt\n' )
				$mol_assert_equal(
					$bog_gamengine_pack_assets( tmp ),
					[ { uri: 'deep/seen.txt', kind: 'file' } ],
				)
			} finally {
				$node.fs.rmSync( tmp, { recursive: true, force: true } )
			}
		},

		'square turns hero into 32×32 png'() {
			const out = $bog_probe_test( 'bog/gamengine/pack/-/node.js', 'bog_gamengine_pack_square_check' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_pack_square_ok ) )
		},

		'atlas of two images gives two squares, meta with deploys and layer list'() {
			const out = $bog_probe_test( 'bog/gamengine/pack/-/node.js', 'bog_gamengine_pack_atlas_check' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_pack_atlas_ok ) )
		},

	})

}
