namespace $ {

	const tree_list = [
		{ uri: 'bog/gamengine/demo/atlas/hero.png', kind: 'image' },
		{ uri: 'bog/gamengine/demo/room/model/pillar.glb', kind: 'model' },
		{ uri: 'bog/gamengine/demo/sound/coin.wav', kind: 'sound' },
		{ uri: 'bog/gamengine/demo/atlas/coin.png', kind: 'image' },
	] as readonly $bog_gamengine_studio_assets_item[]

	function assets( $: $, json: unknown = null ) {
		$.$mol_fetch = class extends $mol_fetch {
			static json( input: RequestInfo ) {
				if( json === null ) return $mol_fail( new Error( `Not Found: ${ input }` ) )
				return json
			}
		}
		return $bog_gamengine_studio_assets.create( assets => {
			assets.$ = $
			assets.fallback = ()=> tree_list
		} )
	}

	$mol_test({

		'list comes from the json of the pack'( $ ) {
			const list = assets( $, [
				{ uri: 'bog/gamengine/demo/atlas/wall.png', kind: 'image' },
				{ uri: 'bog/gamengine/demo/icon/hero-192.png', kind: 'image' },
			] ).list()
			$mol_assert_equal( list.map( item => item.uri ), [ 'bog/gamengine/demo/atlas/wall.png', 'bog/gamengine/demo/icon/hero-192.png' ] )
		},

		'kinds beyond image, model and sound are dropped'( $ ) {
			const list = assets( $, [
				{ uri: 'bog/gamengine/demo/atlas/wall.png', kind: 'image' },
				{ uri: 'bog/gamengine/demo/room/room.view.tree', kind: 'file' },
			] ).list()
			$mol_assert_equal( list.map( item => item.uri ), [ 'bog/gamengine/demo/atlas/wall.png' ] )
		},

		'missing json falls back to the list of the tree'( $ ) {
			$mol_assert_equal( assets( $ ).list().map( item => item.uri ), tree_list.map( item => item.uri ) )
		},

		'empty json falls back to the list of the tree'( $ ) {
			$mol_assert_equal( assets( $, [] ).list().length, tree_list.length )
		},

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
