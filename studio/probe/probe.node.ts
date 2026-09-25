namespace $ {

	export const $bog_gamengine_studio_probe_page = 'bog/gamengine/demo/-/index.html#!demo=studio'

	export const $bog_gamengine_studio_probe_ok = 'четыре колонки в ряд, холст нарисован, правка исходника перерисовала героя, правка в инспекторе переписала исходник, клик по холсту выбрал монету, стрелка гизмо перенесла её в исходнике, клик мимо снял выбор, игра с зажатой D сдвинула героя вправо, стоп вернул его на место и не тронул исходник, пять правок pos героя не мигают и не копят текстуры и буферы, вкладка «Ассеты» показала файлы пака, монета с панели встала на холст по клику и записалась в исходник спрайтом, столб мешем с загрузчиком, звук строкой в Sound, кисть на вкладке «Тайлы» покрасила клетку пола в стену одним символом, заливка перекрасила комнату, Esc снял инструмент'

	export const $bog_gamengine_studio_probe_moves = 5

	export const $bog_gamengine_studio_probe_flags = [ '--use-angle=swiftshader' ] as const

	export const $bog_gamengine_studio_probe_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0`

	export const $bog_gamengine_studio_probe_selectors = [
		'[bog_gamengine_studio_tree]',
		'[bog_gamengine_studio_canvas]',
		'[bog_gamengine_studio_inspect]',
		'[bog_gamengine_studio_source]',
		'canvas',
	] as const

	export type $bog_gamengine_studio_probe_pixel = readonly [ number, number, number, number ]

	export type $bog_gamengine_studio_probe_result = $bog_probe_rects_result & {
		readonly webgl: boolean
		readonly waited: number
		readonly center: $bog_gamengine_studio_probe_pixel
		readonly hero_before: $bog_gamengine_studio_probe_pixel
		readonly hero_after: $bog_gamengine_studio_probe_pixel
		readonly rows: number
		readonly tree_text: string
		readonly fields_before: string
		readonly fields_after: string
		readonly typed: string
		readonly source_after: string
		readonly unit: number
		readonly floors: number
		readonly fields_coin: string
		readonly row_coin: string | null
		readonly arrow: readonly [ number, number ] | null
		readonly coin_from: readonly [ number, number ]
		readonly source_moved: string
		readonly fields_clear: string
		readonly hero_line_before: string
		readonly x_before: string
		readonly x_play: string
		readonly x_stop: string
		readonly hero_line_after: string
		readonly textures: { readonly created: number, readonly deleted: number }
		readonly buffers: { readonly created: number, readonly deleted: number, readonly scene: number }
		readonly images: number
		readonly moves: readonly { readonly x: number, readonly first: $bog_gamengine_studio_probe_pixel, readonly pixel: $bog_gamengine_studio_probe_pixel }[]
		readonly tiles: {
			readonly titles: readonly string[]
			readonly cell_diff: number
			readonly fill_diff: number
			readonly wall_pixel: $bog_gamengine_studio_probe_pixel
			readonly cell_before: $bog_gamengine_studio_probe_pixel
			readonly cell_pixel: $bog_gamengine_studio_probe_pixel
			readonly tool_after: string
			readonly map_fill: string
			readonly wall_found: boolean
		}
		readonly asset_files: readonly string[]
		readonly drop_before: $bog_gamengine_studio_probe_pixel
		readonly drop_after: $bog_gamengine_studio_probe_pixel
		readonly cursor: string
		readonly tab_after: string
		readonly rows_assets: number
		readonly tree_assets: string
		readonly sprite_line: string
		readonly mesh_line: string
		readonly sound_line: string
		readonly status: string
		readonly mesh_pixel: $bog_gamengine_studio_probe_pixel
	}

	export const $bog_gamengine_studio_probe_gizmo_from = 20

	export const $bog_gamengine_studio_probe_arrow_script = `
		const arrow_at = ( at, x, y )=> {
			for( let dx = ${ $bog_gamengine_studio_probe_gizmo_from }; dx < 90; ++ dx ) for( let dy = -3; dy <= 3; ++ dy ) {
				const px = at( x + dx, y + dy )
				if( px[ 0 ] > 200 && px[ 1 ] < 100 && px[ 2 ] < 100 ) return [ x + dx, y + dy ]
			}
			return null
		}
	`

	export function $bog_gamengine_studio_probe_script( selectors: readonly string[] ) {
		return `
			const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
			const canvas = document.querySelector( 'canvas' )
			const gl = canvas && canvas.getContext( 'webgl2' )
			if( !gl ) return { webgl: false }
			const pixel = ( x, y )=> {
				const out = new Uint8Array( 4 )
				gl.readPixels( x | 0, y | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, out )
				return Array.from( out )
			}
			const at = ( x, y )=> pixel( x, canvas.height - 1 - y )
			const dark = px => px[ 0 ] < 40 && px[ 1 ] < 40 && px[ 2 ] < 40
			const same = ( a, b )=> a.every( ( v, i )=> Math.abs( v - b[ i ] ) < 8 )
			${ $bog_gamengine_studio_probe_spot_script }
			const source_now = ()=> document.querySelector( '[bog_gamengine_studio_source] textarea' ).value
			const screen_of = spot => seen( spot[ 0 ], spot[ 1 ] )
			const shown_all = [ ... document.querySelectorAll( '[mol_button]' ) ].find( el => el.innerText.trim() === 'Показать всё' )
			if( shown_all ) shown_all.click()
			await frame()
			await frame()
			const cell_seen = ( text, char )=> {
				const cell = cell_of( text, char )
				return cell ? screen_of( map_spot( text, cell ) ) : null
			}
			const hero_seen = screen_of( spot_of( source_now(), 'Hero' ) || [ 0, 0 ] )
			const hero_x = hero_seen[ 0 ]
			const hero_y = hero_seen[ 1 ]
			let waited = 0
			let center = at( hero_x, hero_y )
			while( waited < 600 && dark( center ) ) { await frame(); ++ waited; center = at( hero_x, hero_y ) }
			const hero_before = at( hero_x, hero_y )
			const base = (()=>{ ${ $bog_probe_rects_script( selectors ) } })()
			const type = ( input, text )=> {
				input.value = text
				input.dispatchEvent( new Event( 'input', { bubbles: true } ) )
			}
			const proto = WebGL2RenderingContext.prototype
			const count = name => {
				const native = proto[ name ]
				const counter = { count: 0 }
				proto[ name ] = function() { ++ counter.count; return native.apply( this, arguments ) }
				return counter
			}
			const tex_created = count( 'createTexture' )
			const tex_deleted = count( 'deleteTexture' )
			const buf_created = count( 'createBuffer' )
			const buf_deleted = count( 'deleteBuffer' )
			const image_native = window.Image
			const images = { count: 0 }
			window.Image = function() { ++ images.count; return new image_native() }
			const editor = document.querySelector( '[bog_gamengine_studio_source] textarea' )
			type( editor, editor.value.replace( 'frame \\\\hero', 'frame \\\\coin' ) )
			let hero_after = hero_before
			for( let i = 0; i < 120 && same( hero_after, hero_before ); ++ i ) {
				await frame()
				hero_after = at( hero_x, hero_y )
			}
			const inspect = document.querySelector( '[bog_gamengine_studio_inspect]' )
			const fields_before = inspect ? inspect.innerText : ''
			const rows = document.querySelectorAll( '[bog_gamengine_studio_row]' )
			const tree = document.querySelector( '[bog_gamengine_studio_tree]' )
			const tree_text = tree ? tree.innerText : ''
			const row_by = title => Array.from( document.querySelectorAll( '[bog_gamengine_studio_row]' ) ).find( el => el.innerText.trim() === title )
			const hero_row = row_by( 'Герой' )
			if( hero_row ) hero_row.click()
			await frame()
			await frame()
			const fields_after = inspect ? inspect.innerText : ''
			const typed = String( ( spot_of( source_now(), 'Hero' ) || [ 0, 0 ] )[ 0 ] + 1 )
			const num = document.querySelector( '[bog_gamengine_studio_vec_num] input' )
			if( num ) type( num, typed )
			await frame()
			await frame()
			const source_after = editor.value
			const rect = canvas.getBoundingClientRect()
			const dpr = devicePixelRatio
			const snap = value => Math.round( value * 2 ) / 2
			const own_spot = world_at( canvas.width / 4, canvas.height / 4 )
			const own_x = snap( own_spot[ 0 ] )
			const own_y = snap( own_spot[ 1 ] )
			const coin_seat = row_by( 'Монета' )
			if( coin_seat ) coin_seat.click()
			await frame()
			await frame()
			const coin_nums = document.querySelectorAll( '[bog_gamengine_studio_vec_num] input' )
			type( coin_nums[ 0 ], String( own_x ) )
			type( coin_nums[ 1 ], String( own_y ) )
			await frame()
			await frame()
			const coin_from = spot_of( source_now(), 'Coin' ) || [ 0, 0 ]
			const coin_seen = screen_of( coin_from )
			const coin_x = coin_seen[ 0 ]
			const coin_y = coin_seen[ 1 ]
			const pointer = ( type, x, y )=> canvas.dispatchEvent( new PointerEvent( type, {
				bubbles: true, pointerId: 1, isPrimary: true, button: 0, buttons: type === 'pointerup' ? 0 : 1,
				clientX: rect.left + x / dpr, clientY: rect.top + y / dpr,
			} ) )
			const void_seen = screen_of([ own_x, 1 ])
			pointer( 'pointerdown', void_seen[ 0 ], void_seen[ 1 ] )
			pointer( 'pointerup', void_seen[ 0 ], void_seen[ 1 ] )
			await frame()
			await frame()
			pointer( 'pointerdown', coin_x, coin_y )
			pointer( 'pointerup', coin_x, coin_y )
			await frame()
			await frame()
			const fields_coin = inspect ? inspect.innerText : ''
			const coin_row = row_by( 'Монета' )
			const row_coin = coin_row ? coin_row.getAttribute( 'mol_check_checked' ) : null
			${ $bog_gamengine_studio_probe_arrow_script }
			const grid = document.querySelector( '[bog_gamengine_studio_grid]' )
			if( grid && grid.getAttribute( 'mol_check_checked' ) === 'true' ) grid.click()
			await frame()
			await frame()
			const arrow = arrow_at( at, coin_x, coin_y )
			if( arrow ) {
				pointer( 'pointerdown', arrow[ 0 ], arrow[ 1 ] )
				pointer( 'pointermove', arrow[ 0 ] + 40, arrow[ 1 ] + 30 )
				await frame()
				pointer( 'pointermove', arrow[ 0 ] + 80, arrow[ 1 ] + 30 )
				await frame()
				pointer( 'pointerup', arrow[ 0 ] + 80, arrow[ 1 ] + 30 )
				await frame()
				await frame()
			}
			const source_moved = editor.value
			pointer( 'pointerdown', void_seen[ 0 ], void_seen[ 1 ] )
			pointer( 'pointerup', void_seen[ 0 ], void_seen[ 1 ] )
			await frame()
			await frame()
			const fields_clear = inspect ? inspect.innerText : ''
			const hero_line = ()=> ( editor.value.match( /Герой[^]*?pos \\/ [^\\n]*/ ) || [ '' ] )[ 0 ]
			const x_value = ()=> document.querySelector( '[bog_gamengine_studio_vec_num] input' ).value
			row_by( 'Герой' ).click()
			await frame()
			await frame()
			const hero_line_before = hero_line()
			const x_before = x_value()
			document.querySelector( '[bog_gamengine_studio_play]' ).click()
			await frame()
			document.body.dispatchEvent( new KeyboardEvent( 'keydown', { keyCode: 68, bubbles: true } ) )
			for( let i = 0; i < 30; ++ i ) await frame()
			document.body.dispatchEvent( new KeyboardEvent( 'keyup', { keyCode: 68, bubbles: true } ) )
			await frame()
			await frame()
			const x_play = x_value()
			document.querySelector( '[bog_gamengine_studio_stop]' ).click()
			await frame()
			await frame()
			const x_stop = x_value()
			const hero_line_after = hero_line()
			const floors = []
			const map_rows = rows_of( editor.value )
			for( let y = 0; y < map_rows.length; ++ y ) for( let x = 0; x < map_rows[ y ].length; ++ x ) {
				if( map_rows[ y ][ x ] !== '.' ) continue
				const spot = map_spot( editor.value, [ x, y ] )
				const spot_seen = screen_of( spot )
				const edge = unit_px() / 2
				if( spot_seen[ 0 ] > edge && spot_seen[ 0 ] < canvas.width - edge && spot_seen[ 1 ] > edge && spot_seen[ 1 ] < canvas.height - edge ) floors.push( spot )
			}
			const moves = []
			let scene_buffers = 0
			for( let step = 0; step < ${ $bog_gamengine_studio_probe_moves } && floors.length; ++ step ) {
				const spot = floors[ step % floors.length ]
				const spot_seen = screen_of( spot )
				const created = buf_created.count
				type( editor, editor.value.replace( /(Герой[^]*?pos \\/ )[^\\n]*/, '$1' + spot[ 0 ] + ' ' + spot[ 1 ] + ' 0' ) )
				await frame()
				const first = at( spot_seen[ 0 ], spot_seen[ 1 ] )
				await frame()
				if( !scene_buffers ) scene_buffers = buf_created.count - created
				moves.push({ x: spot[ 0 ], first, pixel: at( spot_seen[ 0 ], spot_seen[ 1 ] ) })
			}
			const textures = { created: tex_created.count, deleted: tex_deleted.count }
			const buffers = { created: buf_created.count, deleted: buf_deleted.count, scene: scene_buffers }
			const tab = title => Array.from( document.querySelectorAll( '[bog_gamengine_studio_side] [mol_switch] [mol_check]' ) ).find( el => el.innerText.trim() === title )
			tab( 'Тайлы' ).click()
			await frame()
			await frame()
			const tile_rows = Array.from( document.querySelectorAll( '[bog_gamengine_studio_tile]' ) )
			const tile_titles = tile_rows.map( el => el.innerText.trim() )
			const tool = title => Array.from( document.querySelectorAll( '[bog_gamengine_studio_tools] [mol_check]' ) ).find( el => el.innerText.trim() === title )
			const map_text = ()=> rows_of( editor.value ).join( '\\n' )
			const diff = ( a, b )=> {
				let count = 0
				for( let i = 0; i < Math.max( a.length, b.length ); ++ i ) if( a[ i ] !== b[ i ] ) ++ count
				return count
			}
			tile_rows.find( el => el.innerText.includes( 'wall' ) ).click()
			tool( 'Клетка' ).click()
			await frame()
			const map_before = map_text()
			const brush_spot = floors[ floors.length - 1 ] || [ 0, 0 ]
			const near_wall = ( text, spot )=> {
				const rows = rows_of( text )
				let best = null
				let away = Infinity
				for( let y = 0; y < rows.length; ++ y ) for( let x = 0; x < rows[ y ].length; ++ x ) {
					if( rows[ y ][ x ] !== '#' ) continue
					const at_spot = map_spot( text, [ x, y ] )
					const gap = Math.max( Math.abs( at_spot[ 0 ] - spot[ 0 ] ), Math.abs( at_spot[ 1 ] - spot[ 1 ] ) )
					if( gap < away ) { away = gap; best = at_spot }
				}
				return best
			}
			const wall_spot = near_wall( editor.value, brush_spot )
			const wall_seen = screen_of( wall_spot || [ 0, 0 ] )
			const wall_pixel = at( wall_seen[ 0 ], wall_seen[ 1 ] )
			const floor_seen = screen_of( brush_spot )
			const cell_x = floor_seen[ 0 ]
			const cell_y = floor_seen[ 1 ]
			const cell_before = at( cell_x, cell_y )
			pointer( 'pointerdown', cell_x, cell_y )
			pointer( 'pointerup', cell_x, cell_y )
			let cell_pixel = cell_before
			for( let i = 0; i < 120 && same( cell_pixel, cell_before ); ++ i ) {
				await frame()
				cell_pixel = at( cell_x, cell_y )
			}
			const map_cell = map_text()
			tool( 'Заливка' ).click()
			await frame()
			const fill_seen = screen_of( floors[ 0 ] || [ 0, 0 ] )
			pointer( 'pointerdown', fill_seen[ 0 ], fill_seen[ 1 ] )
			pointer( 'pointerup', fill_seen[ 0 ], fill_seen[ 1 ] )
			await frame()
			await frame()
			const map_fill = map_text()
			document.querySelector( '[bog_gamengine_studio]' ).dispatchEvent( new KeyboardEvent( 'keydown', { keyCode: 27, bubbles: true } ) )
			await frame()
			const tool_after = ( document.querySelector( '[bog_gamengine_studio_tools] [mol_check_checked="true"]' ) || { innerText: '' } ).innerText.trim()
			const tiles = { titles: tile_titles, cell_diff: diff( map_before, map_cell ), fill_diff: diff( map_cell, map_fill ), wall_pixel, cell_before, cell_pixel, tool_after, map_fill, wall_found: !!wall_spot }
			tab( 'Ассеты' ).click()
			await frame()
			await frame()
			const asset_rows = document.querySelectorAll( '[bog_gamengine_studio_asset_row]' )
			const asset = file => Array.from( asset_rows ).find( el => el.innerText.trim() === file )
			const asset_files = Array.from( asset_rows ).map( el => el.innerText.trim() )
			const drop_x = void_seen[ 0 ]
			const drop_y = void_seen[ 1 ]
			const drop_before = at( drop_x, drop_y )
			asset( 'coin.png' ).click()
			await frame()
			const cursor = getComputedStyle( canvas ).cursor
			pointer( 'pointerdown', drop_x, drop_y )
			pointer( 'pointerup', drop_x, drop_y )
			let drop_after = drop_before
			for( let i = 0; i < 120 && same( drop_after, drop_before ); ++ i ) {
				await frame()
				drop_after = at( drop_x, drop_y )
			}
			asset( 'pillar.glb' ).click()
			await frame()
			const mesh_seen = seen( own_x + 2, 1 )
			pointer( 'pointerdown', mesh_seen[ 0 ], mesh_seen[ 1 ] )
			pointer( 'pointerup', mesh_seen[ 0 ], mesh_seen[ 1 ] )
			await frame()
			await frame()
			asset( 'coin.wav' ).click()
			await frame()
			pointer( 'pointerdown', drop_x, drop_y )
			pointer( 'pointerup', drop_x, drop_y )
			await frame()
			await frame()
			const tab_after = document.querySelector( '[bog_gamengine_studio_side] [mol_switch] [mol_check_checked="true"]' ).innerText.trim()
			tab( 'Сцена' ).click()
			await frame()
			await frame()
			const rows_assets = document.querySelectorAll( '[bog_gamengine_studio_row]' ).length
			const tree_assets = ( document.querySelector( '[bog_gamengine_studio_tree]' ) || { innerText: '' } ).innerText
			const line = re => ( editor.value.match( re ) || [ '' ] )[ 0 ]
			const sprite_line = line( /<= Sprite_1[^]*?frame \\\\[^\\n]*/ )
			const mesh_line = line( /<= Mesh_1_shape[^]*?uri \\\\[^\\n]*/ )
			const sound_line = line( /Sound [^]*?coin \\\\[^\\n]*/ )
			for( let i = 0; i < 60; ++ i ) await frame()
			const status_node = document.querySelector( '[bog_gamengine_studio_status]' )
			const status = status_node ? status_node.innerText.trim() : ''
			const mesh_pixel = at( mesh_seen[ 0 ], mesh_seen[ 1 ] )
			return { ... base, webgl: true, waited, center, hero_before, hero_after, rows: rows.length, tree_text, fields_before, fields_after, typed, source_after, unit: unit_px(), floors: floors.length, fields_coin, row_coin, arrow, coin_from, source_moved, fields_clear, hero_line_before, x_before, x_play, x_stop, hero_line_after, textures, buffers, images: images.count, moves, tiles, asset_files, drop_before, drop_after, cursor, tab_after, rows_assets, tree_assets, sprite_line, mesh_line, sound_line, status, mesh_pixel }
		`
	}

	export const $bog_gamengine_studio_probe_spot_script = `
		const block_of = ( text, name )=> {
			const tail = text.split( '<= ' + name + ' $' )[ 1 ] || ''
			const next = tail.search( /\\n\\t\\t<= / )
			return next < 0 ? tail : tail.slice( 0, next )
		}
		const spot_of = ( text, name )=> {
			const found = block_of( text, name ).match( /pos \\/ (-?[\\d.]+) (-?[\\d.]+)/ )
			return found ? [ Number( found[ 1 ] ), Number( found[ 2 ] ) ] : null
		}
		const map_spot = ( text, cell )=> {
			const named = text.match( /<= (\\w+) \\$bog_gamengine_tilemap/ )
			const base = named && spot_of( text, named[ 1 ] ) || [ 0, 0 ]
			return [ base[ 0 ] + cell[ 0 ] + 0.5, base[ 1 ] - cell[ 1 ] - 0.5 ]
		}
		const studio_page = ()=> $$.$bog_gamengine_demo.Root( 0 ).Studio()
		const seen = ( wx, wy )=> {
			const out = studio_page().Point().screen( new Float32Array( 3 ), new Float32Array([ wx, wy, 0 ]) )
			return [ out[ 0 ], out[ 1 ] ]
		}
		const world_at = ( sx, sy )=> {
			const out = studio_page().Point().world( new Float32Array( 3 ), sx, sy )
			return [ out[ 0 ], out[ 1 ] ]
		}
		const unit_px = ()=> Math.abs( seen( 1, 0 )[ 0 ] - seen( 0, 0 )[ 0 ] )
		const rows_of = text => {
			const map = ( text.match( /map \\\\\\n(?:[ \\t]*\\\\.*\\n)+/ ) || [ '' ] )[ 0 ]
			return ( map.match( /\\\\[^\\n]+/g ) || [] ).map( row => row.slice( 1 ) )
		}
		const cell_of = ( text, char )=> {
			const rows = rows_of( text )
			for( let y = 0; y < rows.length; ++ y ) {
				const x = rows[ y ].indexOf( char )
				if( x >= 0 ) return [ x, y ]
			}
			return null
		}
	`

	export const $bog_gamengine_studio_probe_tabs_ok = 'кисть красит после каждого переключения вкладок левой колонки'

	export const $bog_gamengine_studio_probe_tabs_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const wait = async n => { for( let i = 0; i < n; ++ i ) await frame() }
		const canvas = ()=> document.querySelector( 'canvas' )
		const editor = document.querySelector( '[bog_gamengine_studio_source] textarea' )
		if( !canvas() || !editor ) return { ready: false }
		const map_of = ()=> ( editor.value.match( /map \\\\\\n(?:[ \\t]*\\\\.*\\n)+/ ) || [ '' ] )[ 0 ]
		${ $bog_gamengine_studio_probe_spot_script }
		const tab = async title => {
			const hit = [ ... document.querySelectorAll( '[mol_check]' ) ].find( el => el.textContent.trim() === title )
			if( hit ) hit.click()
			await wait( 8 )
			return Boolean( hit )
		}
		const floor_cell = ()=> cell_of( editor.value, '.' )
		const paint = async ( cx, cy )=> {
			const node = canvas()
			const box = node.getBoundingClientRect()
			const dpr = devicePixelRatio
			const spot = map_spot( editor.value, [ cx, cy ] )
			const spot_seen = seen( spot[ 0 ], spot[ 1 ] )
			const x = spot_seen[ 0 ]
			const y = spot_seen[ 1 ]
			const before = map_of()
			for( const kind of [ 'pointerdown', 'pointerup' ] ) node.dispatchEvent( new PointerEvent( kind, {
				bubbles: true, pointerId: 1, isPrimary: true, button: 0, buttons: kind === 'pointerup' ? 0 : 1,
				clientX: box.left + x / dpr, clientY: box.top + y / dpr,
			} ) )
			await wait( 8 )
			return map_of() !== before
		}
		await wait( 20 )
		if( !await tab( 'Тайлы' ) ) return { ready: false }
		const tile = [ ... document.querySelectorAll( '[bog_gamengine_studio_tile]' ) ].find( el => el.textContent.includes( 'wall' ) )
		const tool = [ ... document.querySelectorAll( '[mol_check]' ) ].find( el => el.textContent.trim() === 'Клетка' )
		if( !tile || !tool ) return { ready: false }
		tile.click()
		await wait( 4 )
		tool.click()
		await wait( 8 )
		const stroke = async ()=> {
			const cell = floor_cell()
			if( !cell ) return false
			return await paint( cell[ 0 ], cell[ 1 ] )
		}
		const armed = await stroke()
		await tab( 'Классы' )
		const after_kit = await stroke()
		await tab( 'Сцена' )
		const after_tree = await stroke()
		await tab( 'Тайлы' )
		const back = await stroke()
		const tile_kept = tile.getAttribute( 'mol_check_checked' ) === 'true'
		const tool_kept = tool.getAttribute( 'mol_check_checked' ) === 'true'
		return { ready: true, armed, after_kit, after_tree, back, tile_kept, tool_kept, map: map_of().replace( /\\s+/g, ' ' ) }
	`

	export type $bog_gamengine_studio_probe_tabs_result = {
		readonly ready: boolean
		readonly armed?: boolean
		readonly after_kit?: boolean
		readonly after_tree?: boolean
		readonly back?: boolean
		readonly tile_kept?: boolean
		readonly tool_kept?: boolean
		readonly map?: string
	}

	export async function $bog_gamengine_studio_probe_tabs(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_studio_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_probe_run({
			root,
			flags,
			page: $bog_gamengine_studio_probe_page,
			ready: $bog_gamengine_studio_probe_ready,
			script: $bog_gamengine_studio_probe_tabs_script,
			width: 1600,
			height: 800,
		}) as $bog_gamengine_studio_probe_tabs_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( got ) }` ) )

		if( !got.ready ) return fail( 'страница не собралась для замера' )
		if( !got.armed ) return fail( 'кисть не покрасила до переключения' )
		if( !got.after_kit ) return fail( 'кисть умерла после ухода на «Классы»' )
		if( !got.after_tree ) return fail( 'кисть умерла после ухода на «Сцену»' )
		if( !got.back ) return fail( 'кисть умерла после возврата на «Тайлы»' )
		if( !got.tile_kept || !got.tool_kept ) return fail( 'переключение сбросило выбор тайла или инструмента' )

		return say( $bog_gamengine_studio_probe_tabs_ok )
	}

	export const $bog_gamengine_studio_probe_pick_ok = 'кисть поверх ассета красит и снимает ассет, ассет поверх кисти ставит узел и снимает кисть'

	export const $bog_gamengine_studio_probe_pick_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const wait = async n => { for( let i = 0; i < n; ++ i ) await frame() }
		const canvas = document.querySelector( 'canvas' )
		if( !canvas ) return { webgl: false }
		const editor = document.querySelector( '[bog_gamengine_studio_source] textarea' )
		const source = ()=> editor.value
		const map_of = ()=> ( source().match( /map \\\\\\n(?:[ \\t]*\\\\.*\\n)+/ ) || [ '' ] )[ 0 ]
		const sprites = ()=> source().split( '$bog_gamengine_sprite' ).length - 1
		const rect = ()=> canvas.getBoundingClientRect()
		const dpr = devicePixelRatio
		const pointer = ( kind, x, y )=> canvas.dispatchEvent( new PointerEvent( kind, {
			bubbles: true, pointerId: 1, isPrimary: true, button: 0, buttons: kind === 'pointerup' ? 0 : 1,
			clientX: rect().left + x / dpr, clientY: rect().top + y / dpr,
		} ) )
		const click_cell = async ( cx, cy )=> {
			const spot = map_spot( source(), [ cx, cy ] )
			const spot_seen = seen( spot[ 0 ], spot[ 1 ] )
			const x = spot_seen[ 0 ]
			const y = spot_seen[ 1 ]
			pointer( 'pointerdown', x, y )
			pointer( 'pointerup', x, y )
			await wait( 6 )
		}
		const tab = async title => {
			const hit = [ ... document.querySelectorAll( '[mol_check]' ) ].find( el => el.textContent.trim() === title )
			if( hit ) hit.click()
			await wait( 4 )
			return Boolean( hit )
		}
		const row_of = ( attr, mark )=> [ ... document.querySelectorAll( '[' + attr + ']' ) ]
			.find( el => el.textContent.includes( mark ) ) || null
		const checked = el => el && el.getAttribute( 'mol_check_checked' ) === 'true'
		const drop = document.querySelector( '[bog_gamengine_studio_drop]' )
		const placing = ()=> drop ? drop.getAttribute( 'bog_gamengine_studio_placing' ) : null
		${ $bog_gamengine_studio_probe_spot_script }

		await wait( 20 )

		await tab( 'Ассеты' )
		const asset = row_of( 'bog_gamengine_studio_asset_row', 'coin.png' )
		if( !asset ) return { webgl: true, fail: 'нет строки ассета' }
		asset.click()
		await wait( 6 )
		const asset_on = checked( asset )
		const placing_asset = placing()

		await tab( 'Тайлы' )
		const tile = row_of( 'bog_gamengine_studio_tile', 'wall' )
		const tool = [ ... document.querySelectorAll( '[mol_check]' ) ].find( el => el.textContent.trim() === 'Клетка' )
		if( !tile || !tool ) return { webgl: true, fail: 'нет тайла или инструмента' }
		tile.click()
		await wait( 4 )
		tool.click()
		await wait( 6 )
		const asset_after_brush = checked( row_of( 'bog_gamengine_studio_asset_row', 'coin.png' ) )
		const placing_after_brush = placing()
		const map_before = map_of()
		const sprites_before = sprites()
		const floor = cell_of( source(), '.' )
		if( !floor ) return { webgl: true, fail: 'в карте нет клетки пола' }
		await click_cell( floor[ 0 ], floor[ 1 ] )
		const map_after = map_of()
		const sprites_after = sprites()

		const asset_again = row_of( 'bog_gamengine_studio_asset_row', 'coin.png' )
		asset_again.click()
		await wait( 6 )
		const tile_after_asset = checked( row_of( 'bog_gamengine_studio_tile', 'wall' ) )
		const tool_after_asset = checked( [ ... document.querySelectorAll( '[mol_check]' ) ].find( el => el.textContent.trim() === 'Клетка' ) )
		const map_mid = map_of()
		const sprites_mid = sprites()
		const floor_more = cell_of( source(), '.' )
		await click_cell( floor_more ? floor_more[ 0 ] : 2, floor_more ? floor_more[ 1 ] : 2 )
		const map_end = map_of()
		const sprites_end = sprites()

		return {
			webgl: true,
			asset_on, placing_asset, asset_after_brush, placing_after_brush,
			painted: map_after !== map_before,
			map_before: map_before.replace( /\\s+/g, ' ' ).slice( 0, 60 ),
			map_after: map_after.replace( /\\s+/g, ' ' ).slice( 0, 60 ),
			sprites_by_brush: sprites_after - sprites_before,
			tile_after_asset, tool_after_asset,
			map_kept: map_end === map_mid,
			sprites_by_asset: sprites_end - sprites_mid,
		}
	`

	export type $bog_gamengine_studio_probe_pick_result = {
		readonly webgl: boolean
		readonly fail?: string
		readonly asset_on?: boolean
		readonly placing_asset?: string | null
		readonly asset_after_brush?: boolean
		readonly placing_after_brush?: string | null
		readonly painted?: boolean
		readonly map_before?: string
		readonly map_after?: string
		readonly sprites_by_brush?: number
		readonly tile_after_asset?: boolean
		readonly tool_after_asset?: boolean
		readonly map_kept?: boolean
		readonly sprites_by_asset?: number
	}

	export async function $bog_gamengine_studio_probe_pick(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_studio_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_probe_run({
			root,
			flags,
			page: $bog_gamengine_studio_probe_page,
			ready: $bog_gamengine_studio_probe_ready,
			script: $bog_gamengine_studio_probe_pick_script,
			width: 1600,
			height: 800,
		}) as $bog_gamengine_studio_probe_pick_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( got ) }` ) )

		if( !got.webgl ) return fail( 'нет webgl2' )
		if( got.fail ) return fail( got.fail )
		if( !got.asset_on ) return fail( 'ассет не выбрался' )
		if( got.placing_asset !== 'true' ) return fail( 'холст не показал, что ставим ассет' )
		if( got.asset_after_brush ) return fail( 'кисть взяли, а ассет остался выбранным' )
		if( got.placing_after_brush === 'true' ) return fail( 'кисть взяли, а холст всё ещё ставит ассет' )
		if( !got.painted ) return fail( 'кисть поверх ассета не покрасила клетку' )
		if( got.sprites_by_brush !== 0 ) return fail( 'кисть поставила узел вместо покраски' )
		if( got.tile_after_asset ) return fail( 'ассет взяли, а тайл остался выбранным' )
		if( got.tool_after_asset ) return fail( 'ассет взяли, а инструмент кисти остался включённым' )
		if( !got.map_kept ) return fail( 'ассет поверх кисти покрасил карту' )
		if( got.sprites_by_asset !== 1 ) return fail( 'ассет поверх кисти не поставил узел' )

		return say( $bog_gamengine_studio_probe_pick_ok )
	}

	export const $bog_gamengine_studio_probe_grid_ok = 'с галкой узел встаёт на половину клетки, без галки — в точку указателя без хвоста цифр'

	export const $bog_gamengine_studio_probe_grid_drag = 83

	export function $bog_gamengine_studio_probe_grid_script( snap: boolean ) {
		return `
			const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
			const wait = async n => { for( let i = 0; i < n; ++ i ) await frame() }
			const canvas = document.querySelector( 'canvas' )
			const gl = canvas && canvas.getContext( 'webgl2' )
			if( !gl ) return { webgl: false }
			const pixel = ( x, y )=> {
				const out = new Uint8Array( 4 )
				gl.readPixels( x | 0, y | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, out )
				return Array.from( out )
			}
			const at = ( x, y )=> pixel( x, canvas.height - 1 - y )
			${ $bog_gamengine_studio_probe_spot_script }
			const editor = document.querySelector( '[bog_gamengine_studio_source] textarea' )
			if( !editor ) return { webgl: true, fail: 'нет исходника' }
			const hero_at = ()=> spot_of( editor.value, 'Hero' )
			const dpr = devicePixelRatio
			const pointer = ( type, x, y )=> {
				const rect = canvas.getBoundingClientRect()
				canvas.dispatchEvent( new PointerEvent( type, {
					bubbles: true, pointerId: 1, isPrimary: true, button: 0, buttons: type === 'pointerup' ? 0 : 1,
					clientX: rect.left + x / dpr, clientY: rect.top + y / dpr,
				} ) )
			}
			await wait( 20 )
			const start_spot = hero_at()
			if( !start_spot ) return { webgl: true, fail: 'в документе нет узла Hero с позицией' }
			const hero_seen = ()=> {
				const spot = hero_at()
				return seen( spot[ 0 ], spot[ 1 ] )
			}
			const spot_screen = hero_seen()
			if( spot_screen[ 0 ] < 0 || spot_screen[ 0 ] > canvas.width ) return { webgl: true, fail: 'узел вне холста, сценарию нужен видимый узел' }
			const grid = document.querySelector( '[bog_gamengine_studio_grid]' )
			if( !grid ) return { webgl: true, fail: 'нет галки «К сетке»' }
			const want = ${ snap ? 'true' : 'false' }
			if( ( grid.getAttribute( 'mol_check_checked' ) === 'true' ) !== want ) grid.click()
			await wait( 6 )
			const snapping = grid.getAttribute( 'mol_check_checked' ) === 'true'
			pointer( 'pointerdown', spot_screen[ 0 ], spot_screen[ 1 ] )
			pointer( 'pointerup', spot_screen[ 0 ], spot_screen[ 1 ] )
			await wait( 8 )
			let arrow = null
			for( let dx = ${ $bog_gamengine_studio_probe_gizmo_from }; dx < 90 && !arrow; ++ dx ) for( let dy = -3; dy <= 3; ++ dy ) {
				const px = at( spot_screen[ 0 ] + dx, spot_screen[ 1 ] + dy )
				if( px[ 0 ] > 200 && px[ 1 ] < 100 && px[ 2 ] < 100 ) { arrow = [ spot_screen[ 0 ] + dx, spot_screen[ 1 ] + dy ]; break }
			}
			if( !arrow ) return { webgl: true, fail: 'стрелка гизмо не нашлась у выбранного узла', snapping }
			pointer( 'pointerdown', arrow[ 0 ], arrow[ 1 ] )
			await wait( 6 )
			for( let step = 1; step <= 4; ++ step ) {
				pointer( 'pointermove', arrow[ 0 ] - ${ $bog_gamengine_studio_probe_grid_drag } * step / 4, arrow[ 1 ] )
				await wait( 6 )
			}
			pointer( 'pointerup', arrow[ 0 ] - ${ $bog_gamengine_studio_probe_grid_drag }, arrow[ 1 ] )
			await wait( 12 )
			const now = hero_at()
			return {
				webgl: true, snapping, unit: unit_px(),
				start: start_spot[ 0 ],
				moved: now ? now[ 0 ] : null,
				step: - ${ $bog_gamengine_studio_probe_grid_drag } / unit_px(),
			}
		`
	}

	export type $bog_gamengine_studio_probe_grid_result = {
		readonly webgl: boolean
		readonly fail?: string
		readonly snapping?: boolean
		readonly start?: number
		readonly moved?: number | null
		readonly step?: number
		readonly unit?: number
	}

	export async function $bog_gamengine_studio_probe_grid(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_studio_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const take = async ( snap: boolean )=> await $bog_probe_run({
			root,
			flags,
			page: $bog_gamengine_studio_probe_page,
			ready: $bog_gamengine_studio_probe_ready,
			script: $bog_gamengine_studio_probe_grid_script( snap ),
			width: 1600,
			height: 800,
		}) as $bog_gamengine_studio_probe_grid_result | typeof $bog_probe_skip

		const snapped = await take( true )
		if( snapped === $bog_probe_skip ) return say( $bog_probe_skip )
		const free = await take( false )
		if( free === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, с галкой ${ JSON.stringify( snapped ) }, без галки ${ JSON.stringify( free ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( reason ) )

		for( const got of [ snapped, free ] ) {
			if( !got.webgl ) return fail( 'нет webgl2' )
			if( got.fail ) return fail( got.fail )
			if( typeof got.moved !== 'number' ) return fail( `перенос не дошёл до исходника: ${ JSON.stringify( got ) }` )
		}

		if( !snapped.snapping ) return fail( 'галка «К сетке» не включилась' )
		if( free.snapping ) return fail( 'галка «К сетке» не снялась' )
		if( snapped.moved === snapped.start ) return fail( 'перенос с галкой не сдвинул узел' )

		const half = snapped.moved! / $bog_gamengine_studio_grid_step
		if( Math.abs( half - Math.round( half ) ) > 1e-9 ) {
			return fail( `с галкой ${ snapped.moved } не кратно ${ $bog_gamengine_studio_grid_step }` )
		}

		const shift = free.moved! - free.start!
		if( Math.abs( shift ) < 0.05 ) return fail( `без галки узел не сдвинулся: ${ JSON.stringify( free ) }` )
		const free_half = free.moved! / $bog_gamengine_studio_grid_step
		if( Math.abs( free_half - Math.round( free_half ) ) < 1e-9 ) {
			return fail( `без галки ${ free.moved } всё равно кратно ${ $bog_gamengine_studio_grid_step }` )
		}
		if( Number( free.moved!.toFixed( 3 ) ) !== free.moved ) return fail( `без галки ${ free.moved } с хвостом длиннее тысячной` )

		return say( $bog_gamengine_studio_probe_grid_ok )
	}

	export async function $bog_gamengine_studio_probe_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_studio_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_probe_run({
			root,
			flags,
			page: $bog_gamengine_studio_probe_page,
			ready: $bog_gamengine_studio_probe_ready,
			script: $bog_gamengine_studio_probe_script( $bog_gamengine_studio_probe_selectors ),
			width: 1600,
			height: 800,
		}) as $bog_gamengine_studio_probe_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( got ) }` ) )

		if( !got.webgl ) return fail( 'нет webgl2' )

		const [ tree, canvas, inspect, source, holst ] = $bog_gamengine_studio_probe_selectors.map( selector => got.rects[ selector ] )

		if( !$bog_probe_beside( tree, canvas ) ) return fail( 'холст не справа от дерева' )
		if( !$bog_probe_beside( canvas, inspect ) ) return fail( 'инспектор не справа от холста' )
		if( !$bog_probe_beside( inspect, source ) ) return fail( 'исходник не справа от инспектора' )
		if( !$bog_probe_fits( got ) ) return fail( 'страница шире окна' )
		if( !holst || !( holst.width > 300 ) ) return fail( 'холст уже 300 px' )
		if( !( holst.height > 300 ) ) return fail( 'холст ниже 300 px' )
		if( got.center[ 0 ] < 40 && got.center[ 1 ] < 40 && got.center[ 2 ] < 40 ) return fail( 'герой не нарисован' )
		if( got.hero_before.every( ( value, index )=> Math.abs( value - got.hero_after[ index ] ) < 8 ) ) return fail( 'замена кадра в исходнике не перерисовала героя' )
		const named = [ 'Герой', 'Монета', 'Стена' ].map( name => got.tree_text.indexOf( name ) )
		if( named.some( ( at, index )=> at < 0 || index > 0 && at < named[ index - 1 ] ) ) return fail( 'в дереве нет трёх узлов сцены по порядку' )
		if( !( got.rows >= 3 ) ) return fail( 'в дереве меньше трёх строк' )
		if( got.fields_before.includes( 'pos' ) ) return fail( 'инспектор показал pos до выбора' )
		if( !got.fields_after.includes( 'pos' ) ) return fail( 'клик по строке «Герой» не показал pos' )
		const hero_x = got.source_after.match( /Герой[^]*?pos \/ (\S+)/ )
		if( !hero_x || hero_x[ 1 ] !== got.typed ) return fail( 'число из инспектора не попало в исходник' )
		if( got.row_coin !== 'true' ) return fail( 'клик по монете на холсте выбрал не её: строка «Монета» в дереве не подсвечена' )
		if( !got.fields_coin.includes( 'coin' ) ) return fail( 'монета выбрана, но инспектор не показал её кадр' )
		if( !got.arrow ) return fail( 'справа от монеты нет красной стрелки гизмо' )
		const moved = got.source_moved.match( /Монета[^]*?pos \/ (\S+) (\S+) (\S+)/ )
		if( !moved ) return fail( 'в исходнике нет pos монеты' )
		if( Math.abs( Number( moved[ 1 ] ) - got.coin_from[ 0 ] - 80 / got.unit ) > 0.1 ) return fail( 'x монеты после переноса по стрелке не вырос на 80 px' )
		if( Number( moved[ 2 ] ) !== got.coin_from[ 1 ] ) return fail( 'перенос по стрелке X сдвинул y' )
		if( got.fields_clear.includes( 'pos' ) ) return fail( 'клик мимо не снял выбор' )
		if( !got.hero_line_before ) return fail( 'в исходнике нет pos героя' )
		if( !( Number( got.x_play ) > Number( got.x_before ) ) ) return fail( 'игра с зажатой D не сдвинула героя вправо' )
		if( got.x_stop !== got.x_before ) return fail( 'стоп не вернул x героя к исходному' )
		if( got.hero_line_after !== got.hero_line_before ) return fail( 'игра изменила pos героя в исходнике' )
		if( !( got.floors >= $bog_gamengine_studio_probe_moves ) ) return fail( `на холсте видно ${ got.floors } клеток пола, а правок нужно ${ $bog_gamengine_studio_probe_moves }: сценарию не на чем ставить героя` )
		if( got.moves.length !== $bog_gamengine_studio_probe_moves ) return fail( 'правок pos героя не пять' )
		for( const move of got.moves ) {
			if( move.pixel[ 0 ] < 40 && move.pixel[ 1 ] < 40 && move.pixel[ 2 ] < 40 ) return fail( `после правки pos героя на ${ move.x } его пиксель чёрный через два кадра` )
		}
		if( got.textures.created - got.textures.deleted > 1 ) return fail( 'правки исходника копят текстуры' )
		if( got.buffers.created - got.buffers.deleted > got.buffers.scene ) return fail( 'правки исходника копят буферы' )
		if( got.images !== 0 ) return fail( 'правки исходника грузят картинки заново' )
		const tiles = got.tiles
		if( !tiles.titles.some( title => title.includes( 'wall' ) ) ) return fail( 'на вкладке «Тайлы» нет символа стены' )
		if( !tiles.titles.some( title => title.includes( 'floor' ) ) ) return fail( 'на вкладке «Тайлы» нет символа пола' )
		if( !tiles.wall_found ) return fail( 'в карте нет ни одной стены, сравнивать цвет клика не с чем' )
		if( tiles.cell_diff !== 1 ) return fail( 'клик кистью по клетке изменил в карте не один символ' )
		if( tiles.cell_pixel.every( ( value, index )=> Math.abs( value - tiles.cell_before[ index ] ) < 8 ) ) return fail( 'клик кистью не перерисовал клетку' )
		if( !tiles.cell_pixel.every( ( value, index )=> Math.abs( value - tiles.wall_pixel[ index ] ) < 16 ) ) return fail( 'пиксель в точке клика не цвета стены' )
		if( tiles.fill_diff < 5 ) return fail( 'заливка по полу изменила меньше пяти символов' )
		if( tiles.tool_after ) return fail( 'Esc не снял инструмент кисти' )
		if( got.asset_files.length < 3 ) return fail( 'на вкладке «Ассеты» меньше трёх строк' )
		if( !got.asset_files.includes( 'coin.png' ) || !got.asset_files.includes( 'pillar.glb' ) || !got.asset_files.includes( 'coin.wav' ) ) return fail( 'на вкладке «Ассеты» нет coin.png, pillar.glb или coin.wav' )
		if( got.cursor !== 'copy' ) return fail( 'после выбора ассета курсор над холстом не «поставить»' )
		if( got.drop_before.every( ( value, index )=> Math.abs( value - got.drop_after[ index ] ) < 8 ) ) return fail( 'клик по холсту с выбранной монетой не нарисовал её в точке клика' )
		if( !got.hero_after.every( ( value, index )=> Math.abs( value - got.drop_after[ index ] ) < 8 ) ) return fail( 'пиксель в точке клика не цвета монеты' )
		if( got.tab_after !== 'Ассеты' ) return fail( 'вкладка «Ассеты» сбросилась после пересборки сцены' )
		if( !( got.rows_assets > got.rows ) ) return fail( 'монета и модель не добавили строк в дерево' )
		if( !got.tree_assets.includes( 'coin' ) ) return fail( 'поставленной монеты нет в дереве' )
		if( !got.tree_assets.includes( 'pillar' ) ) return fail( 'поставленной модели нет в дереве' )
		if( !got.sprite_line.endsWith( 'frame \\coin' ) ) return fail( 'у нового спрайта в исходнике нет frame \\coin' )
		if( !got.mesh_line.endsWith( 'uri \\bog/gamengine/demo/room/model/pillar.glb' ) ) return fail( 'у новой модели в исходнике нет uri столба' )
		if( !got.sound_line.endsWith( 'coin \\bog/gamengine/demo/sound/coin.wav' ) ) return fail( 'звук не записался в Sound uris' )
		if( got.status ) return fail( 'подвал холста показал ошибку: ' + got.status )
		if( got.mesh_pixel[ 0 ] < 40 && got.mesh_pixel[ 1 ] < 40 && got.mesh_pixel[ 2 ] < 40 ) return fail( 'в точке модели пиксель чёрный' )
		if( got.mesh_pixel.every( ( value, index )=> Math.abs( value - got.hero_after[ index ] ) < 8 ) ) return fail( 'пиксель модели не отличается от пикселя героя, модель рисуется квадом спрайтов' )

		return say( $bog_gamengine_studio_probe_ok )
	}

	export const $bog_gamengine_studio_probe_pass_klass = '$bog_gamengine_demo_jumper_level'

	export const $bog_gamengine_studio_probe_pass_ok = 'путь пройден мышью: два узла убраны, кисть покрасила клетку, два ассета встали щелчками, «Ходок» из палитры встал телом в мир физики, роли дошли до вывоза, вывезенное дерево стоит на движковой сцене и без имён студии'

	export const $bog_gamengine_studio_probe_pass_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const wait = async n => { for( let i = 0; i < n; ++ i ) await frame() }
		const missed = []
		const need = ( name, hit )=> { if( !hit ) missed.push( name ); return hit }
		const canvas = ()=> document.querySelector( 'canvas' )
		const editor = document.querySelector( '[bog_gamengine_studio_source] textarea' )
		if( !need( 'canvas', canvas() ) || !need( 'editor', editor ) ) return { ready: false, missed }
		${ $bog_gamengine_studio_probe_spot_script }
		const source = ()=> editor.value
		const titles = ()=> [ ... document.querySelectorAll( '[bog_gamengine_studio_row]' ) ].map( el => el.textContent.trim() )
		const checks = title => [ ... document.querySelectorAll( '[mol_check]' ) ].find( el => el.textContent.trim() === title )
		const button = title => [ ... document.querySelectorAll( '[mol_button]' ) ].find( el => el.textContent.trim() === title )
		const tab = async title => {
			const hit = need( 'вкладка ' + title, checks( title ) )
			if( hit ) hit.click()
			await wait( 8 )
			return Boolean( hit )
		}
		const row = async title => {
			await tab( 'Сцена' )
			const hit = need( 'строка ' + title, [ ... document.querySelectorAll( '[bog_gamengine_studio_row]' ) ].find( el => el.textContent.trim() === title ) )
			if( hit ) hit.click()
			await wait( 8 )
			return Boolean( hit )
		}
		const press = async title => {
			const hit = need( 'кнопка ' + title, button( title ) )
			if( hit ) hit.click()
			await wait( 8 )
			return Boolean( hit )
		}
		const drop = async title => {
			if( !await row( title ) ) return false
			return await press( 'Удалить' )
		}
		const type = async ( input, text )=> {
			input.value = text
			input.dispatchEvent( new Event( 'input', { bubbles: true } ) )
			await wait( 8 )
			return input.value === text
		}
		const field = async ( hint, text )=> {
			const one = need( 'поле ' + hint, [ ... document.querySelectorAll( '[bog_gamengine_studio_inspect] [mol_form_field]' ) ].find( el => el.textContent.trim().indexOf( hint ) === 0 ) )
			if( !one ) return false
			const input = need( 'ввод поля ' + hint, one.querySelector( 'input, textarea' ) )
			return input ? await type( input, text ) : false
		}
		const studio = need( 'страница студии', studio_page() )
		const click_world = async ( wx, wy )=> {
			const node = canvas()
			const box = node.getBoundingClientRect()
			const dpr = devicePixelRatio
			const at = seen( wx, wy )
			for( const kind of [ 'pointerdown', 'pointerup' ] ) node.dispatchEvent( new PointerEvent( kind, {
				bubbles: true, pointerId: 1, isPrimary: true, button: 0, buttons: kind === 'pointerup' ? 0 : 1,
				clientX: box.left + at[ 0 ] / dpr, clientY: box.top + at[ 1 ] / dpr,
			} ) )
			await wait( 8 )
		}
		const cell_click = async ( cx, cy )=> await click_world( cx + 0.5, - ( cy + 0.5 ) )
		const sprites = () => ( source().match( /\\$bog_gamengine_sprite/g ) || [] ).length
		const roles = role => ( source().match( new RegExp( 'role \\\\\\\\' + role, 'g' ) ) || [] ).length
		const diff_cells = ( before, after )=> {
			let count = 0
			for( let y = 0; y < Math.max( before.length, after.length ); ++ y ) {
				const one = before[ y ] || ''
				const two = after[ y ] || ''
				for( let x = 0; x < Math.max( one.length, two.length ); ++ x ) if( one[ x ] !== two[ x ] ) ++ count
			}
			return count
		}
		await wait( 20 )
		const started = titles()
		await drop( 'Вид героя' )
		await drop( 'Стена' )
		const dropped = titles()
		await press( 'Показать всё' )
		const sprites_before = sprites()
		const map_before = rows_of( source() )
		if( !await tab( 'Тайлы' ) ) return { ready: false, missed }
		const tile = need( 'тайл wall', [ ... document.querySelectorAll( '[bog_gamengine_studio_tile]' ) ].find( el => el.textContent.includes( 'wall' ) ) )
		if( tile ) tile.click()
		await wait( 4 )
		if( !await tab( 'Тайлы' ) ) return { ready: false, missed }
		const tool = need( 'инструмент Клетка', checks( 'Клетка' ) )
		if( tool ) tool.click()
		await wait( 8 )
		const hero_spot = spot_of( source(), 'Hero' ) || [ 0.5, -0.5 ]
		const hero_cell = [ Math.floor( hero_spot[ 0 ] ), Math.floor( - hero_spot[ 1 ] ) ]
		const floors = []
		const rows_map = rows_of( source() )
		for( let y = 0; y < rows_map.length; ++ y ) {
			for( let x = 0; x < rows_map[ y ].length; ++ x ) {
				if( rows_map[ y ][ x ] !== '.' ) continue
				if( x === hero_cell[ 0 ] && y === hero_cell[ 1 ] ) continue
				floors.push( [ x, y ] )
			}
		}
		if( !need( 'клетки пола без героя', floors.length > 3 ) ) return { ready: false, missed }
		const brush_cell = floors[ floors.length - 1 ]
		await cell_click( brush_cell[ 0 ], brush_cell[ 1 ] )
		const painted = rows_of( source() )
		if( !await tab( 'Ассеты' ) ) return { ready: false, missed }
		const asset = need( 'ассет coin.png', [ ... document.querySelectorAll( '[bog_gamengine_studio_asset_row]' ) ].find( el => el.textContent.includes( 'coin.png' ) ) )
		if( asset ) asset.click()
		await wait( 8 )
		const spots = floors.slice( 0, 2 )
		for( const spot of spots ) await cell_click( spot[ 0 ], spot[ 1 ] )
		if( asset ) asset.click()
		await wait( 8 )
		const placed = sprites()
		const walkers_before = ( source().match( /\\$bog_gamengine_phys_walker/g ) || [] ).length
		if( !await tab( 'Классы' ) ) return { ready: false, missed }
		const kit = need( 'палитра Ходок', [ ... document.querySelectorAll( '[bog_gamengine_studio_kit_row]' ) ].find( el => el.textContent.trim() === 'Ходок' ) )
		if( kit ) kit.click()
		await wait( 8 )
		const kit_cell = floors[ 2 ]
		await cell_click( kit_cell[ 0 ], kit_cell[ 1 ] )
		const walkers = ( source().match( /\\$bog_gamengine_phys_walker/g ) || [] ).length
		const bodies = ( ( source().match( /bodies \\/\\n(?:\\t+<= \\w+\\n)+/ ) || [ '' ] )[ 0 ].match( /<= \\w+/g ) || [] ).length
		let roles_set = 0
		const coin_rows = ()=> [ ... document.querySelectorAll( '[bog_gamengine_studio_row]' ) ].filter( el => el.textContent.trim() === 'coin' )
		if( !need( 'строки поставленных крошек', coin_rows().length === spots.length ) ) return { ready: false, missed }
		for( let i = 0; i < spots.length; ++ i ) {
			await tab( 'Сцена' )
			coin_rows()[ i ].click()
			await wait( 8 )
			if( studio.doc_path() && await field( 'role', 'crumb' ) ) ++ roles_set
		}
		if( await row( 'Герой' ) && await field( 'role', 'hero' ) ) ++ roles_set
		const klass = document.querySelector( '[bog_gamengine_studio_klass]' )
		const klass_input = need( 'поле класса', klass && ( klass.tagName === 'INPUT' ? klass : klass.querySelector( 'input' ) ) )
		if( klass_input ) await type( klass_input, ${ JSON.stringify( $bog_gamengine_studio_probe_pass_klass ) } )
		const link = name => {
			const el = need( 'ссылка ' + name, document.querySelector( '[bog_gamengine_studio_' + name + ']' ) )
			if( !el ) return ''
			const uri = el.getAttribute( 'href' ) || ''
			const at = uri.indexOf( ',' )
			return at < 0 ? '' : decodeURIComponent( uri.slice( at + 1 ) )
		}
		const tree = link( 'export_tree' )
		const ts = link( 'export_ts' )
		return {
			ready: true,
			missed,
			started,
			dropped,
			cells: diff_cells( map_before, painted ),
			sprites_before,
			placed,
			walkers_before,
			walkers,
			bodies,
			roles_set,
			roles_hero: roles( 'hero' ),
			roles_crumb: roles( 'crumb' ),


			tree_head: tree.split( '\\n' )[ 0 ],
			tree_lines: tree ? tree.split( '\\n' ).length : 0,
			tree_studio: ( tree.match( /studio/g ) || [] ).length,
			ts_lines: ts ? ts.split( '\\n' ).length : 0,
			ts_ports: ( ts.match( /Float32Array\\(\\[/g ) || [] ).length,
		}
	`

	export type $bog_gamengine_studio_probe_pass_result = {
		readonly ready: boolean
		readonly missed: readonly string[]
		readonly started?: readonly string[]
		readonly dropped?: readonly string[]
		readonly cells?: number
		readonly sprites_before?: number
		readonly placed?: number
		readonly walkers_before?: number
		readonly walkers?: number
		readonly bodies?: number
		readonly roles_set?: number
		readonly roles_hero?: number
		readonly roles_crumb?: number


		readonly tree_head?: string
		readonly tree_lines?: number
		readonly tree_studio?: number
		readonly ts_lines?: number
		readonly ts_ports?: number
	}

	export async function $bog_gamengine_studio_probe_pass(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_studio_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_probe_run({
			root,
			flags,
			page: $bog_gamengine_studio_probe_page,
			ready: $bog_gamengine_studio_probe_ready,
			script: $bog_gamengine_studio_probe_pass_script,
			width: 1600,
			height: 900,
		}) as $bog_gamengine_studio_probe_pass_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( got ) }` ) )

		if( !got.ready ) return fail( 'страница не собралась для прохода' )
		if( got.missed.length ) return fail( `сценарий не нашёл по имени: ${ got.missed.join( ', ' ) }` )
		if( !got.started?.includes( 'Вид героя' ) ) return fail( 'в начале не было узла «Вид героя», проход мерит не тот документ' )
		if( got.dropped?.includes( 'Вид героя' ) ) return fail( 'удаление не убрало «Вид героя»' )
		if( got.dropped?.includes( 'Стена' ) ) return fail( 'удаление не убрало «Стена»' )
		if( !got.dropped?.includes( 'Карта' ) || !got.dropped?.includes( 'Герой' ) ) return fail( 'удаление унесло лишнее' )
		if( got.cells !== 1 ) return fail( 'кисть покрасила не одну клетку' )
		if( got.placed !== ( got.sprites_before ?? 0 ) + 2 ) return fail( 'два щелчка ассетом не дали двух спрайтов' )
		if( got.walkers !== ( got.walkers_before ?? 0 ) + 1 ) return fail( 'палитра «Ходок» не поставила второе тело' )
		if( got.bodies !== 2 ) return fail( 'в списке тел мира не два тела' )
		if( got.roles_set !== 3 ) return fail( 'роль встала не во все три узла' )
		if( got.roles_hero !== 1 ) return fail( 'роль hero не одна' )
		if( got.roles_crumb !== 2 ) return fail( 'ролей crumb не две' )
		if( !got.tree_head?.startsWith( `${ $bog_gamengine_studio_probe_pass_klass } $bog_gamengine_scene` ) ) {
			return fail( 'вывезенное дерево начинается не с движковой сцены под именем из поля класса' )
		}
		if( ( got.tree_lines ?? 0 ) < 20 ) return fail( 'вывезенное дерево короче двадцати строк, вывоз сломан' )
		if( ( got.ts_lines ?? 0 ) < 5 ) return fail( 'вывезенный спутник короче пяти строк, вывоз сломан' )
		if( ( got.ts_ports ?? 0 ) < 1 ) return fail( 'в спутнике нет ни одного порта вектора' )
		if( got.tree_studio !== 0 ) return fail( 'в вывезенном дереве есть имена студии' )

		return say( $bog_gamengine_studio_probe_pass_ok )
	}

	export const $bog_gamengine_studio_probe_live_page = 'bog/gamengine/demo/-/index.html'

	export const $bog_gamengine_studio_probe_master = 'localhost:9090'

	export const $bog_gamengine_studio_probe_live_ok = 'второй редактор увидел правку первого в исходнике и на холсте'

	export const $bog_gamengine_studio_probe_no_master = 'мастер Базы на 9090 не слушает, проба пропущена'

	export const $bog_gamengine_studio_probe_live_limit = 500

	export const $bog_gamengine_studio_probe_live_rounds = 3

	export const $bog_gamengine_studio_probe_live_shift = 80

	export const $bog_gamengine_studio_probe_live_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0 && /land \\S{10,}/.test( document.body.innerText )`

	export const $bog_gamengine_studio_probe_head_script = `
		const text = document.body.innerText
		const me = ( /me (\\S+) \\|/.exec( text ) || [] )[ 1 ] || ''
		const land = ( /land (\\S+)/.exec( text ) || [] )[ 1 ] || ''
		const mates = Number( ( /mates (\\d+)/.exec( text ) || [] )[ 1 ] || -1 )
		return { me, land, mates }
	`

	export const $bog_gamengine_studio_probe_drag_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const canvas = document.querySelector( 'canvas' )
		const gl = canvas.getContext( 'webgl2' )
		const pixel = ( x, y )=> {
			const out = new Uint8Array( 4 )
			gl.readPixels( x | 0, y | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, out )
			return Array.from( out )
		}
		const at = ( x, y )=> pixel( x, canvas.height - 1 - y )
		const editor = document.querySelector( '[bog_gamengine_studio_source] textarea' )
		const hero_x = ()=> Number( ( editor.value.match( /Герой[^]*?pos \\/ (\\S+)/ ) || [] )[ 1 ] )
		const hero_y = ()=> Number( ( editor.value.match( /Герой[^]*?pos \\/ \\S+ (\\S+)/ ) || [] )[ 1 ] )
		${ $bog_gamengine_studio_probe_spot_script }
		const rect = canvas.getBoundingClientRect()
		const dpr = devicePixelRatio
		const pointer = ( type, x, y )=> canvas.dispatchEvent( new PointerEvent( type, {
			bubbles: true, pointerId: 1, isPrimary: true, button: 0, buttons: type === 'pointerup' ? 0 : 1,
			clientX: rect.left + x / dpr, clientY: rect.top + y / dpr,
		} ) )
		Array.from( document.querySelectorAll( '[bog_gamengine_studio_row]' ) ).find( el => el.innerText.trim() === 'Герой' ).click()
		await frame()
		await frame()
		const before = hero_x()
		const origin = seen( before, hero_y() )
		const origin_x = origin[ 0 ]
		const origin_y = origin[ 1 ]
		${ $bog_gamengine_studio_probe_arrow_script }
		const arrow = arrow_at( at, origin_x, origin_y )
		if( !arrow ) return { t0: -1, before, after: before, arrow }
		const shift = ${ $bog_gamengine_studio_probe_live_shift }
		pointer( 'pointerdown', arrow[ 0 ], arrow[ 1 ] )
		pointer( 'pointermove', arrow[ 0 ] + shift / 2, arrow[ 1 ] )
		await frame()
		pointer( 'pointermove', arrow[ 0 ] + shift, arrow[ 1 ] )
		await frame()
		pointer( 'pointerup', arrow[ 0 ] + shift, arrow[ 1 ] )
		const t0 = Date.now()
		await frame()
		await frame()
		return { t0, before, after: hero_x(), arrow }
	`

	export const $bog_gamengine_studio_probe_watch_script = `
		const tick = ()=> new Promise( done => setTimeout( done, 2 ) )
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const editor = document.querySelector( '[bog_gamengine_studio_source] textarea' )
		const hero_x = ()=> Number( ( editor.value.match( /Герой[^]*?pos \\/ (\\S+)/ ) || [] )[ 1 ] )
		const hero_y = ()=> Number( ( editor.value.match( /Герой[^]*?pos \\/ \\S+ (\\S+)/ ) || [] )[ 1 ] )
		const before = hero_x()
		const began = Date.now()
		let t1 = -1
		while( Date.now() - began < 8000 ) {
			await tick()
			const now = hero_x()
			if( now === now && now !== before ) { t1 = Date.now(); break }
		}
		const after = hero_x()
		for( let i = 0; i < 20; ++ i ) await frame()
		const canvas = document.querySelector( 'canvas' )
		const gl = canvas.getContext( 'webgl2' )
		const out = new Uint8Array( 4 )
		${ $bog_gamengine_studio_probe_spot_script }
		const hero_seen = seen( after, hero_y() )
		gl.readPixels( hero_seen[ 0 ] | 0, ( canvas.height - 1 - hero_seen[ 1 ] ) | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, out )
		const mates = Number( ( /mates (\\d+)/.exec( document.body.innerText ) || [] )[ 1 ] || -1 )
		return { t1, before, after, spot: Array.from( out ), mates }
	`

	export type $bog_gamengine_studio_probe_head = {
		readonly me: string
		readonly land: string
		readonly mates: number
	}

	export type $bog_gamengine_studio_probe_drag = {
		readonly t0: number
		readonly before: number
		readonly after: number
		readonly arrow: readonly [ number, number ] | null
	}

	export type $bog_gamengine_studio_probe_watch = {
		readonly t1: number
		readonly before: number
		readonly after: number
		readonly spot: readonly number[]
		readonly mates: number
	}

	export const $bog_gamengine_studio_probe_alone_ok = 'редактор с мастером в адресе поднялся, объявил свой ленд и показал документ'

	export async function $bog_gamengine_studio_probe_alone(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_studio_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const bin = $bog_probe_chrome_bin()
		if( !bin ) return say( $bog_probe_skip )

		const started = Date.now()
		const site = await new $bog_probe_static( String( $node.path.resolve( root ) ) ).open()
		const window = await $bog_gamengine_studio_probe_window( bin, flags, 1600, 800 )

		try {

			const page = site.uri( $bog_gamengine_studio_probe_live_page )

			await window.browser.open_page(
				`${ page }#!demo=studio/master=${ $bog_gamengine_studio_probe_master }`,
				$bog_gamengine_studio_probe_live_ready,
				60000,
			)

			const head = await window.browser.evaluate(
				$bog_gamengine_studio_probe_head_script, 15000,
			) as $bog_gamengine_studio_probe_head

			const source = await window.browser.evaluate(
				`return document.querySelector( '[bog_gamengine_studio_source] textarea' )?.value?.length ?? -1`, 15000,
			) as number

			say( `${ Date.now() - started } мс, ${ JSON.stringify( head ) }, исходник ${ source } знаков` )

			if( !head.me ) return $mol_fail( new Error( 'редактор не показал свой id' ) )
			if( !head.land ) return $mol_fail( new Error( 'редактор не показал ленд документа' ) )
			if( !( source > 0 ) ) return $mol_fail( new Error( 'редактор не показал документ' ) )

			return say( $bog_gamengine_studio_probe_alone_ok )

		} finally {
			window.browser.close()
			site.close()
			try { $node.fs.rmSync( window.profile, { recursive: true, force: true } ) } catch( error ) {}
		}

	}

	export function $bog_gamengine_studio_probe_master_alive( port = 9090 ) {
		return new Promise< boolean >( done => {
			const socket = $node.net.connect( port, '127.0.0.1' )
			socket.once( 'connect', ()=> { socket.destroy(); done( true ) } )
			socket.once( 'error', ()=> done( false ) )
		} )
	}

	export async function $bog_gamengine_studio_probe_window( bin: string, flags: readonly string[], width: number, height: number ) {
		const profile = String( $node.fs.mkdtempSync( $node.path.join( $node.os.tmpdir(), 'bog-gamengine-studio-live-' ) ) )
		const browser = new $bog_probe_browser( bin, profile, flags )
		await browser.open()
		await browser.viewport( width, height )
		return { browser, profile }
	}

	export async function $bog_gamengine_studio_probe_live(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_studio_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const bin = $bog_probe_chrome_bin()
		if( !bin ) return say( $bog_probe_skip )

		if( !await $bog_gamengine_studio_probe_master_alive() ) return say( $bog_gamengine_studio_probe_no_master )

		const started = Date.now()
		const site = await new $bog_probe_static( String( $node.path.resolve( root ) ) ).open()
		const windows = [] as { browser: $bog_probe_browser, profile: string }[]

		try {

			for( let i = 0; i < 2; ++ i ) windows.push( await $bog_gamengine_studio_probe_window( bin, flags, 1600, 800 ) )
			const [ first, second ] = windows.map( window => window.browser )

			const page = site.uri( $bog_gamengine_studio_probe_live_page )
			await first.open_page( `${ page }#!demo=studio/master=${ $bog_gamengine_studio_probe_master }`, $bog_gamengine_studio_probe_live_ready, 60000 )

			const head = await first.evaluate( $bog_gamengine_studio_probe_head_script, 15000 ) as $bog_gamengine_studio_probe_head
			if( !head.me ) return $mol_fail( new Error( 'первый редактор не показал свой id' ) )
			if( !head.land ) return $mol_fail( new Error( 'первый редактор не показал ленд документа' ) )
			say( `документ ${ head.land }, первый редактор ${ head.me }` )

			await second.open_page(
				`${ page }#!demo=studio/land=${ head.land }/master=${ $bog_gamengine_studio_probe_master }`,
				$bog_gamengine_studio_probe_live_ready,
				60000,
			)

			const got_doc = await second.until( `/Герой/.test( document.querySelector( '[bog_gamengine_studio_source] textarea' ).value )`, 30000 )
			if( got_doc < 0 ) return $mol_fail( new Error( 'второй редактор не получил документ за 30 с' ) )
			say( `оба редактора открыты за ${ Date.now() - started } мс, второй получил документ через ${ got_doc } мс` )

			await $bog_probe_pause( 1000 )

			const delays = [] as number[]

			for( let round = -1; round < $bog_gamengine_studio_probe_live_rounds; ++ round ) {

				const watching = second.evaluate( $bog_gamengine_studio_probe_watch_script, 20000 )
				await $bog_probe_pause( 100 )

				const moved = await first.evaluate( $bog_gamengine_studio_probe_drag_script, 20000 ) as $bog_gamengine_studio_probe_drag
				const seen = await watching as $bog_gamengine_studio_probe_watch

				const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify({ moved, seen }) }` ) )
				if( !moved.arrow ) return fail( 'у выбранного узла нет красной стрелки гизмо' )
				if( !( moved.after > moved.before ) ) return fail( 'гизмо не сдвинул героя вправо в первом редакторе' )
				if( seen.t1 < 0 ) return fail( 'второй редактор не увидел правку за 8 с' )
				if( Math.abs( seen.after - moved.after ) > 0.001 ) return fail( 'во втором редакторе другая позиция героя' )
				if( seen.spot[ 0 ] < 40 && seen.spot[ 1 ] < 40 && seen.spot[ 2 ] < 40 ) return fail( 'во втором редакторе на холсте в новой точке чёрный пиксель' )

				if( round < 0 ) say( `прогрев: ${ seen.t1 - moved.t0 } мс, в замер не идёт` )
				else {
					delays.push( seen.t1 - moved.t0 )
					say( `раунд ${ round + 1 }: ${ seen.t1 - moved.t0 } мс, ${ JSON.stringify({ moved, seen }) }` )
				}

				await $bog_probe_pause( 1500 )
			}

			const mates = await second.evaluate( $bog_gamengine_studio_probe_head_script, 15000 ) as $bog_gamengine_studio_probe_head
			if( mates.mates < 1 ) return $mol_fail( new Error( `второй редактор не видит первого в присутствии: ${ JSON.stringify( mates ) }` ) )
			say( `второй редактор видит ${ mates.mates } чужой курсор` )

			say( `задержка: ${ delays.join( ', ' ) } мс, порог ${ $bog_gamengine_studio_probe_live_limit } мс` )

			const slow = delays.filter( delay => delay >= $bog_gamengine_studio_probe_live_limit )
			if( slow.length ) return $mol_fail( new Error( `задержка выше порога: ${ delays.join( ', ' ) } мс` ) )

			return say( $bog_gamengine_studio_probe_live_ok )

		} finally {
			for( const { browser, profile } of windows ) {
				browser.close()
				try { $node.fs.rmSync( profile, { recursive: true, force: true } ) } catch( error ) {}
			}
			site.close()
		}

	}

	export const $bog_gamengine_studio_probe_keep_page = 'bog/gamengine/demo/-/index.html#!demo=studio'

	export const $bog_gamengine_studio_probe_keep_ok = 'правка дожила до перезагрузки, подвал сказал где она лежит, при запрете записи редактор жив и признался'

	export const $bog_gamengine_studio_probe_keep_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0 && !!document.querySelector( '[bog_gamengine_studio_kept]' )`

	export const $bog_gamengine_studio_probe_keep_state_script = `
		const kept_editor = document.querySelector( '[bog_gamengine_studio_source] textarea' )
		const text = kept_editor ? kept_editor.value : ''
		const foot = document.querySelector( '[bog_gamengine_studio_kept]' )
		const canvas = document.querySelector( 'canvas' )
		const gl = canvas && canvas.getContext( 'webgl2' )
		const out = new Uint8Array( 4 )
		let lit = [ 0, 0, 0, 0 ]
		for( let y = 16; gl && y < canvas.height && !lit[ 3 ]; y += 32 ) for( let x = 16; x < canvas.width; x += 32 ) {
			gl.readPixels( x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, out )
			if( out[ 0 ] > 40 || out[ 1 ] > 40 || out[ 2 ] > 40 ) { lit = Array.from( out ); break }
		}
		const state = {
			first: /name \\\\Крошка/.test( text ),
			second: /name \\\\Дозор/.test( text ),
			size: text.length,
			rows: document.querySelectorAll( '[bog_gamengine_studio_row]' ).length,
			foot: foot ? foot.innerText : '',
			stored: localStorage.getItem( 'bog_gamengine_studio_source' ) !== null,
			lit,
		}
	`

	export const $bog_gamengine_studio_probe_keep_type_script = ( from: string, to: string )=> `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const editor = document.querySelector( '[bog_gamengine_studio_source] textarea' )
		editor.value = editor.value.replace( 'name \\\\${ from }', 'name \\\\${ to }' )
		editor.dispatchEvent( new Event( 'input', { bubbles: true } ) )
		await frame()
		await frame()
		${ $bog_gamengine_studio_probe_keep_state_script }
		return state
	`

	export const $bog_gamengine_studio_probe_keep_read_script = `
		${ $bog_gamengine_studio_probe_keep_state_script }
		return state
	`

	export const $bog_gamengine_studio_probe_keep_lock_script = `
		Storage.prototype.setItem = function() { throw new Error( 'The operation is insecure' ) }
		return { locked: true }
	`

	export type $bog_gamengine_studio_probe_keep_state = {
		readonly first: boolean
		readonly second: boolean
		readonly size: number
		readonly rows: number
		readonly foot: string
		readonly stored: boolean
		readonly lit: readonly number[]
	}

	export function $bog_gamengine_studio_probe_keep_dark( lit: readonly number[] ) {
		return lit[ 0 ] < 40 && lit[ 1 ] < 40 && lit[ 2 ] < 40
	}

	export async function $bog_gamengine_studio_probe_keep(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_studio_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const bin = $bog_probe_chrome_bin()
		if( !bin ) return say( $bog_probe_skip )

		const site = await new $bog_probe_static( String( $node.path.resolve( root ) ) ).open()
		const windows = [] as { browser: $bog_probe_browser, profile: string }[]

		try {

			windows.push( await $bog_gamengine_studio_probe_window( bin, flags, 1600, 800 ) )
			const browser = windows[ 0 ].browser
			const page = site.uri( $bog_gamengine_studio_probe_keep_page )
			const fail = ( reason: string, state: unknown )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( state ) }` ) )

			await browser.open_page( page, $bog_gamengine_studio_probe_keep_ready, 60000 )

			const typed = await browser.evaluate(
				$bog_gamengine_studio_probe_keep_type_script( 'Герой', 'Крошка' ),
				15000,
			) as $bog_gamengine_studio_probe_keep_state
			say( `правка: ${ JSON.stringify( typed ) }` )

			if( !typed.first ) return fail( 'правка не попала в исходник', typed )
			if( !typed.stored ) return fail( 'правка не дошла до хранилища браузера', typed )
			if( !typed.foot.startsWith( 'Браузер этой машины' ) ) return fail( 'подвал не сказал, что работа лежит в браузере', typed )

			await browser.open_page( page, $bog_gamengine_studio_probe_keep_ready, 60000 )

			const back = await browser.evaluate( $bog_gamengine_studio_probe_keep_read_script, 15000 ) as $bog_gamengine_studio_probe_keep_state
			say( `после перезагрузки: ${ JSON.stringify( back ) }` )

			if( !back.first ) return fail( 'перезагрузка потеряла правку', back )
			if( back.rows !== typed.rows ) return fail( 'после перезагрузки в дереве сцены не столько узлов, сколько до неё', back )
			if( $bog_gamengine_studio_probe_keep_dark( back.lit ) ) return fail( 'после перезагрузки холст чёрный', back )

			await browser.evaluate( $bog_gamengine_studio_probe_keep_lock_script, 15000 )

			const locked = await browser.evaluate(
				$bog_gamengine_studio_probe_keep_type_script( 'Крошка', 'Дозор' ),
				15000,
			) as $bog_gamengine_studio_probe_keep_state
			say( `при запрете записи: ${ JSON.stringify( locked ) }` )

			if( !locked.second ) return fail( 'при запрете записи правка пропала из редактора', locked )
			if( locked.rows !== back.rows ) return fail( 'при запрете записи дерево сцены осыпалось', locked )
			if( $bog_gamengine_studio_probe_keep_dark( locked.lit ) ) return fail( 'при запрете записи холст почернел', locked )
			if( !locked.foot.startsWith( 'Браузер не сохраняет' ) ) return fail( 'подвал не признался, что запись не идёт', locked )

			return say( $bog_gamengine_studio_probe_keep_ok )

		} finally {
			for( const { browser, profile } of windows ) {
				browser.close()
				try { $node.fs.rmSync( profile, { recursive: true, force: true } ) } catch( error ) {}
			}
			site.close()
		}

	}

}
