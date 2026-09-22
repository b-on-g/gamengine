namespace $ {

	class $bog_gamengine_atlas_mock extends $bog_gamengine_atlas {

		sizes: Record< string, [ number, number ] > = {}

		image( uri: string ) {
			const [ width, height ] = this.sizes[ uri ] ?? [ 64, 64 ]
			return { data: ()=> ({ width, height }) } as unknown as $mol_3d_image
		}

	}

	function atlas_mock( uris: string[], sizes: Record< string, [ number, number ] > = {} ) {
		const atlas = new $bog_gamengine_atlas_mock
		atlas.uris( uris )
		atlas.sizes = sizes
		return atlas
	}

	$mol_test({

		'layer index equals position of file in uris'() {
			const atlas = atlas_mock([ 'bog/gamengine/demo/atlas/coin.png', 'bog/gamengine/demo/atlas/hero.png' ])
			$mol_assert_equal( atlas.layer( 'hero' ), 1 )
		},

		'image 64×32 in atlas 64 fails with file path'() {
			const uri = 'bog/gamengine/demo/atlas/hero.png'
			const atlas = atlas_mock([ uri ], { [ uri ]: [ 64, 32 ] })
			const error = $mol_assert_fail( ()=> atlas.images(), Error )
			$mol_assert_equal( error.message.includes( uri ), true )
			$mol_assert_equal( error.message.includes( '64×32' ), true )
		},

		'unknown layer name fails'() {
			const atlas = atlas_mock([ 'bog/gamengine/demo/atlas/hero.png' ])
			const error = $mol_assert_fail( ()=> atlas.layer( 'coin' ), Error )
			$mol_assert_equal( error.message.includes( 'coin' ), true )
			$mol_assert_equal( error.message.includes( 'hero' ), true )
		},

		'two files with same name fail'() {
			const atlas = atlas_mock([ 'bog/gamengine/demo/atlas/hero.png', 'bog/gamengine/demo/tiles/hero.png' ])
			const error = $mol_assert_fail( ()=> atlas.layer( 'hero' ), Error )
			$mol_assert_equal( error.message.includes( 'atlas/hero.png' ), true )
			$mol_assert_equal( error.message.includes( 'tiles/hero.png' ), true )
		},

		'ready is true when all images match size'() {
			const atlas = atlas_mock([ 'bog/gamengine/demo/atlas/hero.png' ])
			$mol_assert_equal( atlas.ready(), true )
		},

	})

}
