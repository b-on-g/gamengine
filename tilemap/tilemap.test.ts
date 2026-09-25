namespace $ {

	function $bog_gamengine_tilemap_test_atlas() {
		const atlas = new $bog_gamengine_atlas
		atlas.sources( [ 'wall', 'floor' ].map( name => ({ name, image: { width: 64, height: 64 } as unknown as TexImageSource }) ) )
		return atlas
	}

	function $bog_gamengine_tilemap_test_make( map = '#.#\n..#' ) {
		const tile = new $bog_gamengine_phys_tile
		tile.map( map )
		const node = new $bog_gamengine_tilemap
		node.tile( tile )
		node.atlas( $bog_gamengine_tilemap_test_atlas() )
		node.palette({ '#': 'wall', '.': 'floor' })
		node.emit()
		return node
	}

	$mol_test({

		'map of three by two gives an instance per cell'() {
			const node = $bog_gamengine_tilemap_test_make()
			$mol_assert_equal( node.pool().count, 6 )
		},

		'cell kinds take their layers from the atlas'() {
			const node = $bog_gamengine_tilemap_test_make()
			const layer = node.pool().layer
			$mol_assert_equal( layer[ 0 ], 0 )
			$mol_assert_equal( layer[ 1 ], 1 )
		},

		'char outside the palette is skipped'() {
			const node = $bog_gamengine_tilemap_test_make( '#x#\n..#' )
			$mol_assert_equal( node.pool().count, 5 )
		},

		'first cell sits in the center the tile gives it'() {
			const node = $bog_gamengine_tilemap_test_make()
			const pos = node.tile()!.cell_pos( 0, 0, new Float32Array( 3 ) )
			const trans = node.pool().trans
			$mol_assert_equal( trans[ 12 ], pos[ 0 ] )
			$mol_assert_equal( trans[ 13 ], pos[ 1 ] )
			$mol_assert_equal( trans[ 14 ], pos[ 2 ] )
		},

		'edit of the map refills the pool'() {
			const node = $bog_gamengine_tilemap_test_make()
			node.tile()!.map( '##\n##\n##\n##' )
			node.emit()
			$mol_assert_equal( node.pool().count, 8 )
		},

		'aabb covers the whole map'() {
			const node = $bog_gamengine_tilemap_test_make()
			const tile = node.tile()!
			const box = node.aabb()
			$mol_assert_equal( box[ 0 ], 0 )
			$mol_assert_equal( box[ 1 ], - tile.height() )
			$mol_assert_equal( box[ 3 ], tile.width() )
			$mol_assert_equal( box[ 4 ], 0 )
		},

		'shifted grid moves the drawing and the box with it'() {
			const node = $bog_gamengine_tilemap_test_make()
			const tile = node.tile()!
			tile.origin([ 5, - 4 ])
			$mol_assert_equal( node.emit(), 6 )
			const pos = tile.cell_pos( 0, 0, new Float32Array( 3 ) )
			$mol_assert_equal( [ pos[ 0 ], pos[ 1 ] ], [ 5.5, - 4.5 ] )
			const trans = node.pool().trans
			$mol_assert_equal( [ trans[ 12 ], trans[ 13 ] ], [ pos[ 0 ], pos[ 1 ] ] )
			const box = node.aabb()
			$mol_assert_equal( [ box[ 0 ], box[ 1 ] ], [ 5, - 4 - tile.height() ] )
			$mol_assert_equal( [ box[ 3 ], box[ 4 ] ], [ 5 + tile.width(), - 4 ] )
		},

	})

}
