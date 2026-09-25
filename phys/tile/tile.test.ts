namespace $ {

	function $bog_gamengine_phys_tile_test_make() {
		const tile = new $bog_gamengine_phys_tile
		tile.map( '###\n#.#\n###' )
		return tile
	}

	function $bog_gamengine_phys_tile_test_level() {
		const tile = new $bog_gamengine_phys_tile
		tile.map( '..o..\n.###.\n.E...\n#####' )
		return tile
	}

	$mol_test({

		'ahead gives the char of the cell in the given direction'() {
			const tile = $bog_gamengine_phys_tile_test_level()
			$mol_assert_equal( tile.ahead( 0.5, -2.5, 1, 0, 1 ), 'E' )
			$mol_assert_equal( tile.ahead( 2.5, -0.5, 0, -1, 1 ), '#' )
			$mol_assert_equal( tile.ahead( 2.5, -0.5, 1, 0, 1 ), '.' )
			$mol_assert_equal( tile.ahead( 2.5, -0.5, 1, 0, 3 ), '' )
		},

		'edge is true past the end of the platform and false above it'() {
			const tile = $bog_gamengine_phys_tile_test_level()
			$mol_assert_equal( tile.edge( 2.5, -0.5, 1, 0 ), false )
			$mol_assert_equal( tile.edge( 3.5, -0.5, 1, 0 ), true )
			$mol_assert_equal( tile.edge( 1.5, -0.5, -1, 0 ), true )
		},

		'edge is false when the cell ahead is solid'() {
			const tile = $bog_gamengine_phys_tile_test_level()
			$mol_assert_equal( tile.edge( 1.5, -1.5, 1, 0 ), false )
		},

		'spots gives every cell with the char'() {
			const tile = $bog_gamengine_phys_tile_test_level()
			$mol_assert_equal( tile.spots( 'o' ).length, 1 )
			$mol_assert_equal( tile.spots( 'o' )[ 0 ][ 0 ], 2 )
			$mol_assert_equal( tile.spots( 'o' )[ 0 ][ 1 ], 0 )
			$mol_assert_equal( tile.spots( 'E' ).length, 1 )
			$mol_assert_equal( tile.spots( '#' ).length, 8 )
			$mol_assert_equal( tile.spots( 'x' ).length, 0 )
		},

		'chars gives the set of chars of the map'() {
			const tile = $bog_gamengine_phys_tile_test_level()
			const chars = tile.chars()
			$mol_assert_equal( chars.size, 4 )
			$mol_assert_equal( chars.has( 'o' ), true )
			$mol_assert_equal( chars.has( 'E' ), true )
			$mol_assert_equal( chars.has( '#' ), true )
			$mol_assert_equal( chars.has( 'x' ), false )
		},

		'spots follow the map'() {
			const tile = $bog_gamengine_phys_tile_test_level()
			$mol_assert_equal( tile.spots( 'o' ).length, 1 )
			tile.map( '.....\n#####' )
			$mol_assert_equal( tile.spots( 'o' ).length, 0 )
			$mol_assert_equal( tile.chars().size, 2 )
		},

		'cell pos is the center of the cell square'() {
			const tile = $bog_gamengine_phys_tile_test_make()
			const pos = tile.cell_pos( 2, 1, new Float32Array( 3 ) )
			$mol_assert_equal( pos[ 0 ], 2.5 )
			$mol_assert_equal( pos[ 1 ], -1.5 )
			$mol_assert_equal( pos[ 2 ], 0 )
		},

		'cell at the center of a cell gives that cell back'() {
			const tile = $bog_gamengine_phys_tile_test_make()
			const pos = tile.cell_pos( 2, 1, new Float32Array( 3 ) )
			const at = tile.cell_at( pos[ 0 ], pos[ 1 ], new Int32Array( 2 ) )
			$mol_assert_equal( at[ 0 ], 2 )
			$mol_assert_equal( at[ 1 ], 1 )
		},

		'corners of a cell belong to it'() {
			const tile = $bog_gamengine_phys_tile_test_make()
			const at = new Int32Array( 2 )
			tile.cell_at( 2, -1, at )
			$mol_assert_equal( at[ 0 ], 2 )
			$mol_assert_equal( at[ 1 ], 1 )
			tile.cell_at( 2.999, -1.001, at )
			$mol_assert_equal( at[ 0 ], 2 )
			$mol_assert_equal( at[ 1 ], 1 )
		},

		'cell at a point outside the map is outside its bounds'() {
			const tile = $bog_gamengine_phys_tile_test_make()
			const at = tile.cell_at( -0.5, 0.5, new Int32Array( 2 ) )
			$mol_assert_equal( at[ 0 ], -1 )
			$mol_assert_equal( at[ 1 ], -1 )
			$mol_assert_equal( tile.cell( at[ 0 ], at[ 1 ] ), true )
		},

		'shifted grid keeps drawing and passability on the same cell'() {
			const tile = $bog_gamengine_phys_tile_test_make()
			tile.origin([ 5, - 4 ])
			const pos = tile.cell_pos( 1, 1, new Float32Array( 3 ) )
			$mol_assert_equal( [ pos[ 0 ], pos[ 1 ] ], [ 6.5, - 5.5 ] )
			const at = tile.cell_at( pos[ 0 ], pos[ 1 ], new Int32Array( 2 ) )
			$mol_assert_equal( [ at[ 0 ], at[ 1 ] ], [ 1, 1 ] )
			$mol_assert_equal( tile.solid_at( pos[ 0 ], pos[ 1 ] ), false )
			const wall = tile.cell_pos( 0, 1, new Float32Array( 3 ) )
			$mol_assert_equal( tile.solid_at( wall[ 0 ], wall[ 1 ] ), true )
			$mol_assert_equal( tile.solid_at( 1.5, - 1.5 ), true )
		},

		'line free answers exactly what the per sample walk answered'() {
			for( const [ map, plane ] of [
				[ '#####\n#...#\n#.#.#\n#...#\n#####', 'xy' ],
				[ '#####\n#...#\n#.#.#\n#...#\n#####', 'xz' ],
				[ '#..#\n##\n#\n#..##', 'xy' ],
			] as const ) {
				const tile = new $bog_gamengine_phys_tile
				tile.map( map )
				tile.plane( plane )
				tile.origin([ 3, - 2 ])
				const width = tile.width()
				const height = tile.height()
				const solid = tile.cells( new Uint8Array( width * height ), width, height )
				const pad = 0.3
				const walk = ( x0: number, y0: number, x1: number, y1: number )=> {
					const dx = x1 - x0
					const dv = y1 - y0
					const steps = Math.ceil( Math.max( Math.abs( dx ), Math.abs( dv ) ) * 4 )
					const at = new Int32Array( 2 )
					for( let i = 0; i <= steps; ++ i ) {
						const t = steps === 0 ? 0 : i / steps
						const x = x0 + dx * t
						const v = y0 + dv * t
						for( let k = 0; k < 4; ++ k ) {
							tile.cell_at( k & 1 ? x + pad : x - pad, k & 2 ? v + pad : v - pad, at )
							if( at[ 0 ] < 0 || at[ 1 ] < 0 || at[ 0 ] >= width || at[ 1 ] >= height ) return false
							if( solid[ at[ 1 ] * width + at[ 0 ] ] ) return false
						}
					}
					return true
				}
				for( let a = 0; a < 6; ++ a ) {
					for( let b = 0; b < 6; ++ b ) {
						const x0 = 3 + a * 0.9
						const y0 = plane === 'xy' ? - 2 - b * 0.9 : - 2 + b * 0.9
						const x1 = 3 + b * 0.7 + 0.5
						const y1 = plane === 'xy' ? - 2 - a * 0.7 - 0.5 : - 2 + a * 0.7 + 0.5
						$mol_assert_equal(
							tile.line_free( x0, y0, x1, y1, pad, 4, solid ),
							walk( x0, y0, x1, y1 ),
						)
					}
				}
			}
		},

		'line free on an unknown plane falls instead of guessing'() {
			const tile = new $bog_gamengine_phys_tile
			tile.map( '###\n#.#\n###' )
			tile.plane( 'zx' )
			$mol_assert_fail(
				()=> tile.line_free( 0.5, - 0.5, 2.5, - 2.5, 0.3, 4, new Uint8Array( 9 ) ),
				'Map plane zx is unknown, known: xy, xz',
			)
		},

		'cells fills in bulk exactly what cell answers one by one'() {
			for( const map of [
				'###\n#.#\n###',
				'#..#\n##\n#\n#..##',
				'..o..\n.###.\n.E...\n#####',
			] ) {
				const tile = new $bog_gamengine_phys_tile
				tile.map( map )
				tile.solid( '#=' )
				const width = tile.width()
				const height = tile.height()
				const bulk = tile.cells( new Uint8Array( width * height ), width, height )
				for( let y = 0; y < height; ++ y ) {
					for( let x = 0; x < width; ++ x ) {
						$mol_assert_equal( bulk[ y * width + x ] === 1, tile.cell( x, y ) )
					}
				}
			}
		},

		'shifted grid on the vertical plane reads back the very cell it drew'() {
			const tile = new $bog_gamengine_phys_tile
			tile.map( '####\n#..#\n#..#\n####' )
			tile.plane( 'xz' )
			tile.origin([ 6, - 5 ])
			const spot = tile.cell_pos( 1, 2, new Float32Array( 3 ) )
			$mol_assert_equal( [ spot[ 0 ], spot[ 2 ] ], [ 7.5, - 2.5 ] )
			$mol_assert_equal( tile.solid_at( spot[ 0 ], spot[ 2 ] ), false )
			const pos = new Float32Array( 3 )
			const at = new Int32Array( 2 )
			for( let y = 0; y < tile.height(); ++ y ) {
				for( let x = 0; x < tile.width(); ++ x ) {
					tile.cell_pos( x, y, pos )
					tile.cell_at( pos[ 0 ], pos[ 2 ], at )
					$mol_assert_equal( [ at[ 0 ], at[ 1 ] ], [ x, y ] )
					$mol_assert_equal( tile.solid_at( pos[ 0 ], pos[ 2 ] ), tile.cell( x, y ) )
				}
			}
		},

		'cell spot is the packed pair that cell at consumes, on both planes'() {
			for( const plane of [ 'xy', 'xz' ] as const ) {
				const tile = new $bog_gamengine_phys_tile
				tile.map( '####\n#..#\n####' )
				tile.plane( plane )
				tile.origin([ 3, - 2 ])
				const spot = new Float32Array( 2 )
				const at = new Int32Array( 2 )
				for( let y = 0; y < tile.height(); ++ y ) {
					for( let x = 0; x < tile.width(); ++ x ) {
						tile.cell_spot( x, y, spot )
						tile.cell_at( spot[ 0 ], spot[ 1 ], at )
						$mol_assert_equal( [ at[ 0 ], at[ 1 ] ], [ x, y ] )
					}
				}
			}
		},

		'unknown plane falls at cell at, not into xy silently'() {
			const tile = new $bog_gamengine_phys_tile
			tile.map( '####\n#..#\n####' )
			tile.plane( 'zx' )
			$mol_assert_fail(
				()=> tile.cell_at( 1.5, - 1.5, new Int32Array( 2 ) ),
				'Map plane zx is unknown, known: xy, xz',
			)
		},

		'solid at a point uses the same cell as cell at'() {
			const tile = $bog_gamengine_phys_tile_test_make()
			const pos = tile.cell_pos( 1, 1, new Float32Array( 3 ) )
			$mol_assert_equal( tile.solid_at( pos[ 0 ], pos[ 1 ] ), false )
			const wall = tile.cell_pos( 0, 1, new Float32Array( 3 ) )
			$mol_assert_equal( tile.solid_at( wall[ 0 ], wall[ 1 ] ), true )
		},

	})

}
