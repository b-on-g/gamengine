namespace $ {

	function $bog_gamengine_text_test_atlas( names: readonly string[] ) {
		const atlas = new $bog_gamengine_atlas
		atlas.sources( names.map( name => ({ name, image: { width: 64, height: 64 } as unknown as TexImageSource }) ) )
		return atlas
	}

	function $bog_gamengine_text_test_make( value: string, align: $bog_gamengine_text_align = 'left' ) {
		const text = new $bog_gamengine_text
		text.atlas( $bog_gamengine_text_test_atlas([ 'a', 'b' ]) )
		text.value( value )
		text.height( 0.5 )
		text.align( align )
		return text
	}

	function $bog_gamengine_text_test_round( value: number ) {
		return Math.round( value * 1e6 ) / 1e6
	}

	function $bog_gamengine_text_test_other( kind: string, was: unknown ) {
		if( kind === 'vec3' || kind === 'euler' ) return [ 1, 2, 3 ]
		if( kind === 'vec4' ) return [ 0.25, 0.5, 0.75, 1 ]
		if( kind === 'number' ) return Number( was ) + 1
		if( kind === 'flag' ) return !was
		if( kind === 'text' ) return was === 'center' ? 'right' : 'center'
		if( kind === 'node' ) return null
		return null
	}

	$mol_test({

		'string of two chars gives two glyphs'() {
			const text = $bog_gamengine_text_test_make( 'ab' )
			$mol_assert_equal( text.pool().count, 2 )
		},

		'second glyph is shifted by advance of the first'() {
			const text = $bog_gamengine_text_test_make( 'ab' )
			const trans = text.pool().trans
			const shift = trans[ 16 + 12 ] - trans[ 12 ]
			$mol_assert_equal( $bog_gamengine_text_test_round( shift ), text.font().advance( 'a' ) * text.height() )
		},

		'align center spreads the string around the node'() {
			const text = $bog_gamengine_text_test_make( 'ab', 'center' )
			const trans = text.pool().trans
			$mol_assert_equal( $bog_gamengine_text_test_round( trans[ 12 ] + trans[ 16 + 12 ] ), 0 )
		},

		'space takes width but gives no glyph'() {
			const text = $bog_gamengine_text_test_make( 'a b' )
			$mol_assert_equal( text.pool().count, 2 )
			$mol_assert_equal( text.width(), $bog_gamengine_text_test_make( 'ab' ).width() + 0.6 * 0.5 )
		},

		'layer of a glyph is its layer in the atlas'() {
			const text = $bog_gamengine_text_test_make( 'ba' )
			const layer = text.pool().layer
			$mol_assert_equal( layer[ 0 ], 1 )
			$mol_assert_equal( layer[ 1 ], 0 )
		},

		'pool follows the value without a manual emit'() {
			const text = $bog_gamengine_text_test_make( 'ab' )
			$mol_assert_equal( text.pool().count, 2 )
			text.value( 'aba' )
			$mol_assert_equal( text.pool().count, 3 )
		},

		'every drawing prop of the text is watched, and the idle ones are named'() {
			const idle = [ 'role', 'tint' ]
			const known = new $bog_gamengine_text().props().map( prop => prop.name )
			$mol_assert_equal( known, [ 'pos', 'rot', 'scale', 'tint', 'role', 'value', 'height', 'align', 'color', 'billboard' ] )
			for( const name of known ) {
				const text = $bog_gamengine_text_test_make( 'ab' )
				const prop = text.props().find( one => one.name === name )!
				const version = text.pool().version
				prop.set( $bog_gamengine_text_test_other( prop.kind, prop.get() ) as never )
				text.emit()
				if( idle.includes( name ) ) $mol_assert_equal( text.pool().version, version )
				else $mol_assert_equal( text.pool().version > version, true )
			}
		},

		'cylinder text keeps world up under a pitched camera, sphere does not'() {
			const build = ( kind: $bog_gamengine_billboard )=> {
				const text = $bog_gamengine_text_test_make( 'a' )
				text.height( 1 )
				const cam = new $bog_gamengine_cam
				const scene = new $bog_gamengine_scene
				scene.cam( cam )
				scene.kids([ text ])
				text.billboard( kind )
				cam.rot( new Float32Array([ - Math.PI / 4, 0, 0 ]) )
				const trans = text.pool().trans
				return [ trans[ 4 ], trans[ 5 ], trans[ 6 ] ].map( $bog_gamengine_text_test_round )
			}
			$mol_assert_equal( build( 'cylinder' ), [ 0, 1, 0 ] )
			$mol_assert_unique( build( 'sphere' ), build( 'cylinder' ) )
		},

		'billboard glyph axes are the camera basis under pitch and under roll'() {
			for( const rot of [ [ - Math.PI / 4, 0, 0 ], [ 0, 0, Math.PI / 6 ], [ - 0.3, 0.7, 0.2 ] ] ) {
				const text = $bog_gamengine_text_test_make( 'a' )
				text.height( 1 )
				const cam = new $bog_gamengine_cam
				const scene = new $bog_gamengine_scene
				scene.cam( cam )
				scene.kids([ text ])
				text.billboard( 'sphere' )
				cam.scale( new Float32Array([ 2, 2, 2 ]) )
				cam.rot( new Float32Array( rot ) )
				const view = cam.world()
				const trans = text.pool().trans
				for( let c = 0; c < 3; ++ c ) {
					const x = view[ c * 4 ]
					const y = view[ c * 4 + 1 ]
					const z = view[ c * 4 + 2 ]
					const k = 1 / Math.sqrt( x * x + y * y + z * z )
					$mol_assert_equal( $bog_gamengine_text_test_round( trans[ c * 4 ] ), $bog_gamengine_text_test_round( x * k ) )
					$mol_assert_equal( $bog_gamengine_text_test_round( trans[ c * 4 + 1 ] ), $bog_gamengine_text_test_round( y * k ) )
					$mol_assert_equal( $bog_gamengine_text_test_round( trans[ c * 4 + 2 ] ), $bog_gamengine_text_test_round( z * k ) )
					const len = Math.hypot( trans[ c * 4 ], trans[ c * 4 + 1 ], trans[ c * 4 + 2 ] )
					$mol_assert_ok( Math.abs( len - 1 ) < 1e-5 )
				}
			}
		},

		'camera tipped in pitch redraws a billboard string though its own world stays'() {
			const text = $bog_gamengine_text_test_make( 'ab' )
			const cam = new $bog_gamengine_cam
			const scene = new $bog_gamengine_scene
			scene.cam( cam )
			scene.kids([ text ])
			text.billboard( 'sphere' )
			cam.rot( new Float32Array([ 0, 0, 0 ]) )
			const version = text.pool().version
			const world = [ ... text.world() ]
			const was = $bog_gamengine_text_test_round( text.pool().trans[ 6 ] )
			cam.rot( new Float32Array([ Math.PI / 4, 0, 0 ]) )
			$mol_assert_equal( [ ... text.world() ], world )
			text.emit()
			$mol_assert_equal( text.pool_own().version > version, true )
			$mol_assert_equal( $bog_gamengine_text_test_round( text.pool_own().trans[ 6 ] ) === was, false )
		},

		'font edited in place redraws the string without being swapped'() {
			const text = $bog_gamengine_text_test_make( 'ab' )
			const font = text.font()
			font.family( 'sans-serif' )
			font.size( 64 )
			const version = text.pool().version
			font.size( 32 )
			text.emit()
			$mol_assert_equal( text.pool_own().version > version, true )
			const after = text.pool_own().version
			font.family( 'serif' )
			text.emit()
			$mol_assert_equal( text.pool_own().version > after, true )
			const last = text.pool_own().version
			font.chars( 'ab' )
			text.emit()
			$mol_assert_equal( text.pool_own().version > last, true )
		},

		'swapped font and swapped atlas both redraw the string'() {
			const text = $bog_gamengine_text_test_make( 'ab' )
			const version = text.pool().version
			text.atlas( $bog_gamengine_text_test_atlas([ 'b', 'a' ]) )
			text.emit()
			$mol_assert_equal( text.pool().version > version, true )
			const after = text.pool().version
			const font = new $bog_gamengine_text_font
			font.family( 'serif' )
			text.font( font )
			text.emit()
			$mol_assert_equal( text.pool().version > after, true )
		},

		'pool version grows only when the input changes'() {
			const text = $bog_gamengine_text_test_make( 'ab' )
			const version = text.pool().version
			text.emit()
			text.emit()
			$mol_assert_equal( text.pool().version, version )
			text.value( 'ba' )
			$mol_assert_equal( text.pool().version, version + 1 )
		},

		'aabb covers the quad of every glyph'() {
			const text = $bog_gamengine_text_test_make( 'ab' )
			const pool = text.pool()
			const half = text.height() / 2
			for( let i = 0; i < pool.count; ++i ) {
				const x = pool.trans[ i * 16 + 12 ]
				const y = pool.trans[ i * 16 + 13 ]
				$mol_assert_ok( pool.aabb[ i * 6 ] <= x - half )
				$mol_assert_ok( pool.aabb[ i * 6 + 1 ] <= y - half )
				$mol_assert_ok( pool.aabb[ i * 6 + 3 ] >= x + half )
				$mol_assert_ok( pool.aabb[ i * 6 + 4 ] >= y + half )
			}
		},

	})

}
