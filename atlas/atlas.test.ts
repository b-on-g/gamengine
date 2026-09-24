namespace $ {

	class $bog_gamengine_atlas_mock extends $bog_gamengine_atlas {

		sizes: Record< string, [ number, number ] > = {}

		image( uri: string ) {
			const [ width, height ] = this.sizes[ uri ] ?? [ 64, 64 ]
			return { data: ()=> ({ width, height }) } as unknown as $mol_3d_image
		}

	}

	class $bog_gamengine_atlas_wait_mock extends $bog_gamengine_atlas {

		image( uri: string ) {
			return { data: ()=> $mol_fail_hidden( new Promise( ()=> {} ) ) } as unknown as $mol_3d_image
		}

	}

	class $bog_gamengine_atlas_blank_mock extends $bog_gamengine_atlas {

		image( uri: string ) {
			return { data: ()=> ({ width: 512, height: 512, data: new Uint8ClampedArray( 4 ) }) } as unknown as $mol_3d_image
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

		'two atlases share one image per uri'( $ ) {
			const uri = 'bog/gamengine/demo/atlas/hero.png'
			const left = new $bog_gamengine_atlas
			const right = new $bog_gamengine_atlas
			left.$ = $
			right.$ = $
			$mol_assert_equal( left.image( uri ), right.image( uri ) )
			$mol_assert_equal( left.image( uri ).uri(), uri )
		},

		'source layers follow layers of uris'() {
			const atlas = atlas_mock([ 'bog/gamengine/demo/atlas/hero.png' ])
			atlas.sources([ { name: 'A', image: { width: 64, height: 64 } as unknown as TexImageSource } ])
			$mol_assert_equal( atlas.layer( 'A' ), 1 )
			$mol_assert_equal( atlas.images().length, 2 )
		},

		'ready is true when all images match size'() {
			const atlas = atlas_mock([ 'bog/gamengine/demo/atlas/hero.png' ])
			$mol_assert_equal( atlas.ready(), true )
		},

		'ready is false while the image is still loading'() {
			const atlas = new $bog_gamengine_atlas_wait_mock
			atlas.uris([ 'bog/gamengine/demo/atlas/hero.png' ])
			$mol_assert_equal( atlas.ready(), false )
		},

		'placeholder image gives no size error and keeps atlas not ready'() {
			const atlas = new $bog_gamengine_atlas_blank_mock
			atlas.uris([ 'bog/gamengine/demo/atlas/hero.png' ])
			$mol_assert_equal( atlas.images().length, 1 )
			$mol_assert_equal( atlas.ready(), false )
		},

	})

}
