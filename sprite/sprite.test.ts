namespace $ {

	class $bog_gamengine_sprite_test_atlas extends $bog_gamengine_atlas {

		image( uri: string ) {
			return { data: ()=> ({ width: 64, height: 64 }) } as unknown as $mol_3d_image
		}

	}

	function sprite_test_atlas( uris: string[] ) {
		const atlas = new $bog_gamengine_sprite_test_atlas
		atlas.uris( uris )
		return atlas
	}

	function sprite_test_sprite( atlas: $bog_gamengine_atlas | null, frame: string ) {
		const sprite = new $bog_gamengine_sprite
		sprite.atlas( atlas )
		sprite.frame( frame )
		return sprite
	}

	function sprite_test_group( sprites: readonly $bog_gamengine_sprite[] ) {
		return $bog_gamengine_batch_group( sprites, atlas => {
			const batch = new $bog_gamengine_batch
			batch.atlas( atlas )
			return batch
		} )
	}

	$mol_test({

		'two sprites of different atlases give two batches'() {
			const first = sprite_test_atlas([ 'bog/gamengine/demo/atlas/hero.png' ])
			const second = sprite_test_atlas([ 'bog/gamengine/demo/atlas/coin.png' ])
			const batches = sprite_test_group([
				sprite_test_sprite( first, 'hero' ),
				sprite_test_sprite( second, 'coin' ),
			])
			$mol_assert_equal( batches.length, 2 )
			$mol_assert_equal( batches[ 0 ].atlas(), first )
			$mol_assert_equal( batches[ 1 ].atlas(), second )
		},

		'two sprites of one atlas give one batch with both nodes'() {
			const atlas = sprite_test_atlas([ 'bog/gamengine/demo/atlas/hero.png', 'bog/gamengine/demo/atlas/coin.png' ])
			const hero = sprite_test_sprite( atlas, 'hero' )
			const coin = sprite_test_sprite( atlas, 'coin' )
			const batches = sprite_test_group([ hero, coin ])
			$mol_assert_equal( batches.length, 1 )
			$mol_assert_equal( batches[ 0 ].nodes(), [ hero, coin ] )
		},

		'layer is taken from atlas by frame name'() {
			const atlas = sprite_test_atlas([ 'bog/gamengine/demo/atlas/hero.png', 'bog/gamengine/demo/atlas/coin.png' ])
			$mol_assert_equal( sprite_test_sprite( atlas, 'coin' ).layer(), 1 )
		},

		'layer without atlas is 0'() {
			$mol_assert_equal( sprite_test_sprite( null, 'coin' ).layer(), 0 )
		},

		'flip_x mirrors uv'() {
			const sprite = new $bog_gamengine_sprite
			$mol_assert_equal( [ ...sprite.uv() ], [ 0, 0, 1, 1 ] )
			sprite.flip_x( true )
			$mol_assert_equal( [ ...sprite.uv() ], [ 1, 0, -1, 1 ] )
		},

		'size scales trans'() {
			const sprite = new $bog_gamengine_sprite
			sprite.size( new Float32Array([ 2, 3 ]) )
			const trans = sprite.trans()
			$mol_assert_equal( trans[ 0 ], 2 )
			$mol_assert_equal( trans[ 5 ], 3 )
			$mol_assert_equal( trans[ 10 ], 1 )
		},

		'filled batch has layer and uv of sprite'() {
			const atlas = sprite_test_atlas([ 'bog/gamengine/demo/atlas/hero.png', 'bog/gamengine/demo/atlas/coin.png' ])
			const sprite = sprite_test_sprite( atlas, 'coin' )
			sprite.flip_x( true )
			const batch = sprite_test_group([ sprite ])[ 0 ]
			batch.fill()
			$mol_assert_equal( batch.layer[ 0 ], 1 )
			$mol_assert_equal( [ ...batch.uv.subarray( 0, 4 ) ], [ 1, 0, -1, 1 ] )
		},

	})

}
