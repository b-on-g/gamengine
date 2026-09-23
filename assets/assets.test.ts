namespace $ {

	function assets( $: $ ) {
		return $bog_gamestudio_assets.create( assets => {
			assets.$ = $
			assets.list = ()=> [
				{ uri: 'bog/gamengine/demo/atlas/hero.png', kind: 'image' },
				{ uri: 'bog/gamengine/demo/room/model/pillar.glb', kind: 'model' },
				{ uri: 'bog/gamengine/demo/sound/coin.wav', kind: 'sound' },
				{ uri: 'bog/gamengine/demo/atlas/coin.png', kind: 'image' },
			]
		} )
	}

	$mol_test({

		'list is filtered by kind'( $ ) {
			$mol_assert_equal( assets( $ ).of( 'image' ).map( item => item.uri ), [ 'bog/gamengine/demo/atlas/hero.png', 'bog/gamengine/demo/atlas/coin.png' ] )
			$mol_assert_equal( assets( $ ).of( 'sound' ).length, 1 )
		},

		'kind is found by uri'( $ ) {
			$mol_assert_equal( assets( $ ).kind( 'bog/gamengine/demo/room/model/pillar.glb' ), 'model' )
			$mol_assert_equal( assets( $ ).kind( 'bog/gamengine/demo/nothing.png' ), null )
		},

		'name is the file without the extension'( $ ) {
			$mol_assert_equal( assets( $ ).name( 'bog/gamengine/demo/atlas/coin.png' ), 'coin' )
			$mol_assert_equal( assets( $ ).file( 'bog/gamengine/demo/atlas/coin.png' ), 'coin.png' )
		},

	})

}
