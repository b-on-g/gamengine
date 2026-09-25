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

	function $bog_gamengine_tilemap_test_mark( node: $bog_gamengine_tilemap ) {
		const pool = node.pool()
		const marks = [ pool.count ] as number[]
		for( let i = 0; i < pool.count; ++ i ) {
			for( let k = 0; k < 16; ++ k ) marks.push( pool.trans[ i * 16 + k ] )
			for( let k = 0; k < 4; ++ k ) marks.push( pool.tint[ i * 4 + k ] )
			marks.push( pool.layer[ i ] )
		}
		return marks.join( ' ' )
	}

	function $bog_gamengine_tilemap_test_other( kind: string, was: unknown ) {
		if( kind === 'vec3' || kind === 'euler' ) return [ 1, 2, 3 ]
		if( kind === 'vec4' ) return [ 0.25, 0.5, 0.75, 1 ]
		if( kind === 'number' ) return Number( was ) + 1
		if( kind === 'text' ) return 'other'
		if( kind === 'flag' ) return !was
		if( kind === 'node' ) return null
		return null
	}

	$mol_test({

		'every drawing prop of the tilemap is watched, and the idle ones are named'() {
			const idle = [ 'role' ]
			const known = new $bog_gamengine_tilemap().props().map( prop => prop.name )
			$mol_assert_equal( known, [ 'pos', 'rot', 'scale', 'tint', 'role', 'size', 'atlas' ] )
			for( const name of known ) {
				const node = $bog_gamengine_tilemap_test_make()
				const prop = node.props().find( one => one.name === name )!
				const before = $bog_gamengine_tilemap_test_mark( node )
				prop.set( $bog_gamengine_tilemap_test_other( prop.kind, prop.get() ) as never )
				node.emit()
				const after = $bog_gamengine_tilemap_test_mark( node )
				if( idle.includes( name ) ) $mol_assert_equal( after, before )
				else $mol_assert_equal( after === before, false )
			}
		},

		'every drawing input of the grid is watched too'() {
			for( const change of [
				( tile: $bog_gamengine_phys_tile )=> tile.map( '..#\n#..' ),
				( tile: $bog_gamengine_phys_tile )=> tile.plane( 'xz' ),
				( tile: $bog_gamengine_phys_tile )=> tile.origin([ 3, - 4 ]),
			] ) {
				const node = $bog_gamengine_tilemap_test_make()
				const before = $bog_gamengine_tilemap_test_mark( node )
				change( node.tile()! )
				node.emit()
				$mol_assert_equal( $bog_gamengine_tilemap_test_mark( node ) === before, false )
			}
		},


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

		'changed palette relayers the cells'() {
			const node = $bog_gamengine_tilemap_test_make()
			const before = $bog_gamengine_tilemap_test_mark( node )
			node.palette({ '#': 'floor', '.': 'wall' })
			node.emit()
			$mol_assert_equal( $bog_gamengine_tilemap_test_mark( node ) === before, false )
			$mol_assert_equal( node.pool().layer[ 0 ], node.atlas()!.layer( 'floor' ) )
		},

		'grid swapped for another one redraws from the new grid'() {
			const node = $bog_gamengine_tilemap_test_make()
			const before = $bog_gamengine_tilemap_test_mark( node )
			const other = new $bog_gamengine_phys_tile
			other.map( '##\n##' )
			node.tile( other )
			node.emit()
			$mol_assert_equal( $bog_gamengine_tilemap_test_mark( node ) === before, false )
			$mol_assert_equal( node.pool().count, 4 )
		},

		'atlas reordered in place relayers the cells without being swapped'() {
			const node = $bog_gamengine_tilemap_test_make()
			const atlas = node.atlas()!
			$mol_assert_equal( node.pool().layer[ 0 ], 0 )
			atlas.sources( [ 'floor', 'wall' ].map(
				name => ({ name, image: { width: 64, height: 64 } as unknown as TexImageSource } )
			) )
			node.emit()
			$mol_assert_equal( atlas.layer( 'wall' ), 1 )
			$mol_assert_equal( node.pool().layer[ 0 ], 1 )
		},

		'swapped atlas relayers the cells instead of keeping the old layers'() {
			const node = $bog_gamengine_tilemap_test_make()
			$mol_assert_equal( node.pool().layer[ 0 ], 0 )
			const swapped = new $bog_gamengine_atlas
			swapped.sources( [ 'floor', 'wall' ].map(
				name => ({ name, image: { width: 64, height: 64 } as unknown as TexImageSource } )
			) )
			node.atlas( swapped )
			node.emit()
			$mol_assert_equal( node.pool().layer[ 0 ], swapped.layer( 'wall' ) )
			$mol_assert_equal( node.pool().layer[ 1 ], swapped.layer( 'floor' ) )
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
