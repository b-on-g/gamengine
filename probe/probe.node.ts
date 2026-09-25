namespace $ {

	export const $bog_gamengine_probe_page = 'bog/gamengine/demo/-/index.html#!demo=quad'

	export const $bog_gamengine_probe_flat_page = 'bog/gamengine/demo/-/index.html#!demo=flat'

	export const $bog_gamengine_probe_room_page = 'bog/gamengine/demo/-/index.html#!demo=room'

	export const $bog_gamengine_probe_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0`

	export const $bog_gamengine_probe_ok = 'центр красный, буферы не создаются'

	export const $bog_gamengine_probe_flat_ok = 'герой идёт вправо, пол под прозрачным углом героя, клик собирает монету, подпись едет за героем, кадры ходьбы сменяются, джойстик ведёт героя и отпускает'

	export const $bog_gamengine_probe_room_ok = 'ходок идёт вперёд, стена к свету ярче стены в тени, столб из glb отличим от пола, ребро ящика с каркасом белое, дальняя стена в тумане темнеет сильнее ближнего пола, пол под тёплым светом краснее, блики ярче, пол за столбом в тени, со свечением строка ярче, отчёт кадра считает батчи, рука машет костью'

	export const $bog_gamengine_probe_boxes_page = 'bog/gamengine/demo/-/index.html#!demo=boxes'

	export const $bog_gamengine_probe_boxes_ok = 'куча ящиков лежит на полу с контактами, спиной к куче ящики отсечены, клик бросает ящик, цепь висит на пяти шарнирах, дверь на петле, центр не чёрный'

	export const $bog_gamengine_probe_boxes_count = 300

	export const $bog_gamengine_probe_boxes_low = 0.4

	export const $bog_gamengine_probe_flags = [ '--use-angle=swiftshader' ] as const

	export const $bog_gamengine_probe_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const canvas = document.querySelector( 'canvas' )
		const gl = canvas && canvas.getContext( 'webgl2' )
		if( !gl ) return { webgl: false, pixel: [ 0, 0, 0, 0 ], buffers: -1 }
		await frame()
		await frame()
		const pixel = new Uint8Array( 4 )
		gl.readPixels( canvas.width / 2 | 0, canvas.height / 2 | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel )
		const proto = WebGL2RenderingContext.prototype
		const create = proto.createBuffer
		let buffers = 0
		proto.createBuffer = function() { ++ buffers; return create.apply( this, arguments ) }
		await frame()
		await frame()
		proto.createBuffer = create
		return { webgl: true, pixel: Array.from( pixel ), buffers, size: [ canvas.width, canvas.height ] }
	`

	export const $bog_gamengine_probe_flat_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const canvas = document.querySelector( 'canvas' )
		const gl = canvas && canvas.getContext( 'webgl2' )
		if( !gl ) return { webgl: false, loaded: false }
		const read = ()=> {
			const found = document.body.innerText.match( /hero (-?[\\d.]+) × (-?[\\d.]+)/ )
			return found ? [ Number( found[ 1 ] ), Number( found[ 2 ] ) ] : null
		}
		let start = null
		for( let i = 0; i < 600 && !start; ++ i ) { await frame(); start = read() }
		if( !start ) return { webgl: true, loaded: false }
		await frame()
		await frame()
		const pixel = ( x, y )=> {
			const out = new Uint8Array( 4 )
			gl.readPixels( x | 0, y | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, out )
			return Array.from( out )
		}
		const ppu = canvas.height / 15
		const at = ( wx, wy )=> [ ( wx - 10 ) * ppu + canvas.width / 2, ( wy + 7.5 ) * ppu + canvas.height / 2 ]
		const center = pixel( canvas.width / 2, canvas.height / 2 )
		const hero = pixel( ... at( start[ 0 ], start[ 1 ] ) )
		const corner = pixel( ... at( start[ 0 ] - 0.45, start[ 1 ] + 0.45 ) )
		const floor = pixel( ... at( start[ 0 ] + 0.55, start[ 1 ] + 0.45 ) )
		const taken = ()=> {
			const found = document.body.innerText.match( /(\\d+) \\/ (\\d+)/ )
			return found ? Number( found[ 1 ] ) : -1
		}
		const dpr = devicePixelRatio
		const box = canvas.getBoundingClientRect()
		const coin_x = ( ( 18.5 - 10 ) * ppu + canvas.width / 2 ) / dpr
		const coin_y = ( canvas.height / 2 - ( -1.5 + 7.5 ) * ppu ) / dpr
		const taken_before = taken()
		canvas.dispatchEvent( new PointerEvent( 'pointerdown', {
			clientX: box.left + coin_x, clientY: box.top + coin_y, pointerId: 1, bubbles: true,
		} ) )
		await frame()
		await frame()
		const taken_after = taken()
		const label = document.querySelector( '[bog_gamengine_demo_flat_hero_label]' )
		const label_text = label ? label.textContent : ''
		const label_before = label ? label.getBoundingClientRect().left : NaN
		const frame_name = ()=> {
			const found = document.body.innerText.match( /\\| frame (\\S+)/ )
			return found ? found[ 1 ] : ''
		}
		document.body.dispatchEvent( new KeyboardEvent( 'keydown', { keyCode: 68, bubbles: true } ) )
		const walk_frames = new Set()
		for( let i = 0; i < 60; ++ i ) {
			await frame()
			walk_frames.add( frame_name() )
		}
		const frames_walk = [ ... walk_frames ]
		const moved = read()
		document.body.dispatchEvent( new KeyboardEvent( 'keyup', { keyCode: 68, bubbles: true } ) )
		for( let i = 0; i < 10; ++ i ) await frame()
		const frame_idle = frame_name()
		const label_after = label ? label.getBoundingClientRect().left : NaN
		const rest = read()
		const screen_switch = document.querySelector( '[bog_gamengine_demo_flat_screen_switch]' )
		if( screen_switch ) screen_switch.click()
		await frame()
		await frame()
		const screen_checked = screen_switch ? screen_switch.getAttribute( 'mol_check_checked' ) : null
		const stick = document.querySelector( '[bog_gamengine_input_screen_stick]' )
		const stick_box = stick ? stick.getBoundingClientRect() : null
		if( stick ) stick.dispatchEvent( new PointerEvent( 'pointerdown', {
			clientX: stick_box.left + stick_box.width * 0.9, clientY: stick_box.top + stick_box.height / 2, pointerId: 2, bubbles: true,
		} ) )
		for( let i = 0; i < 30; ++ i ) await frame()
		const touch_moved = read()
		if( stick ) stick.dispatchEvent( new PointerEvent( 'pointerup', { pointerId: 2, bubbles: true } ) )
		for( let i = 0; i < 10; ++ i ) await frame()
		const touch_stop = read()
		for( let i = 0; i < 10; ++ i ) await frame()
		const touch_rest = read()
		return {
			webgl: true, loaded: true, start, moved, center, hero, corner, floor,
			taken_before, taken_after, label_text, label_before, label_after,
			frames_walk, frame_idle, rest, screen_checked, stick: !!stick, touch_moved, touch_stop, touch_rest,
			size: [ canvas.width, canvas.height ],
		}
	`

	export const $bog_gamengine_probe_room_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const canvas = document.querySelector( 'canvas' )
		const gl = canvas && canvas.getContext( 'webgl2' )
		if( !gl ) return { webgl: false, loaded: false }
		const pillar_size = ()=> {
			const found = document.body.innerText.match( /pillar (\\d+)/ )
			return found ? Number( found[ 1 ] ) : 0
		}
		const read = ()=> {
			const found = document.body.innerText.match( /walker (-?[\\d.]+) × (-?[\\d.]+) yaw (-?[\\d.]+)/ )
			return found ? [ Number( found[ 1 ] ), Number( found[ 2 ] ), Number( found[ 3 ] ) ] : null
		}
		let start = null
		for( let i = 0; i < 600 && !( start && pillar_size() ); ++ i ) { await frame(); start = read() }
		if( !start ) return { webgl: true, loaded: false }
		const pillar = pillar_size()
		await frame()
		await frame()
		const pixel = ( x, y )=> {
			const out = new Uint8Array( 4 )
			gl.readPixels( x | 0, y | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, out )
			return Array.from( out )
		}
		const half = Math.tan( Math.PI / 6 )
		const aspect = canvas.width / canvas.height
		const at = ( wx, wy, wz )=> {
			const depth = start[ 1 ] - wz
			const nx = ( wx - start[ 0 ] ) / ( half * aspect * depth )
			const ny = ( wy - 0.5 ) / ( half * depth )
			return [ ( nx + 1 ) / 2 * canvas.width, ( ny + 1 ) / 2 * canvas.height ]
		}
		const center = pixel( canvas.width / 2, canvas.height / 2 )
		const lit_at = at( 4.5, 0.5, 5 )
		const shade_at = at( 8, 0.5, 3.5 )
		const lit = pixel( ... lit_at )
		const shade = pixel( ... shade_at )
		const pillar_at = at( 6.6, 0.5, 3.5 )
		const floor_at = at( 6.5, 0, 4.2 )
		const pillar_pixel = pixel( ... pillar_at )
		const floor_pixel = pixel( ... floor_at )
		const edge_at = at( 4.5, 1, 5 )
		const edge = ()=> {
			let best = [ 0, 0, 0, 0 ]
			for( let dy = -2; dy <= 2; ++ dy ) {
				const got = pixel( edge_at[ 0 ], edge_at[ 1 ] + dy )
				if( got[ 0 ] + got[ 1 ] + got[ 2 ] > best[ 0 ] + best[ 1 ] + best[ 2 ] ) best = got
			}
			return best
		}
		const wire = document.querySelector( '[bog_gamengine_demo_room_wireframe]' )
		if( !wire ) return { webgl: true, loaded: true, start, wire: false }
		wire.click()
		await frame()
		await frame()
		const wire_checked = wire.getAttribute( 'mol_check_checked' )
		const edge_on = edge()
		wire.click()
		await frame()
		await frame()
		const edge_off = edge()
		const fog_check = document.querySelector( '[bog_gamengine_demo_room_fog_check]' )
		if( !fog_check ) return { webgl: true, loaded: true, start, fog: false }
		const fog_near_at = at( start[ 0 ], 0, start[ 1 ] - 1 )
		const fog_far_at = lit_at
		const fog_near_off = pixel( ... fog_near_at )
		const fog_far_off = pixel( ... fog_far_at )
		fog_check.click()
		await frame()
		await frame()
		const fog_checked = fog_check.getAttribute( 'mol_check_checked' )
		const fog_near_on = pixel( ... fog_near_at )
		const fog_far_on = pixel( ... fog_far_at )
		fog_check.click()
		await frame()
		await frame()
		const lights = ()=> {
			const found = document.body.innerText.match( /lights (\\d+)/ )
			return found ? Number( found[ 1 ] ) : -1
		}
		const light_count = lights()
		const warm_at = at( 4.5, 0, 5.3 )
		const cold_at = at( 6.5, 0, 4.6 )
		const warm = pixel( ... warm_at )
		const cold = pixel( ... cold_at )
		const row_max = ()=> {
			let best = 0
			const y = canvas.height / 2 | 0
			const line = new Uint8Array( canvas.width * 4 )
			gl.readPixels( 0, y, canvas.width, 1, gl.RGBA, gl.UNSIGNED_BYTE, line )
			for( let x = 0; x < canvas.width; ++ x ) {
				const sum = line[ x * 4 ] + line[ x * 4 + 1 ] + line[ x * 4 + 2 ]
				if( sum > best ) best = sum
			}
			return best
		}
		const shine = document.querySelector( '[bog_gamengine_demo_room_shine]' )
		const row_plain = row_max()
		if( shine ) shine.click()
		await frame()
		await frame()
		const shine_checked = shine ? shine.getAttribute( 'mol_check_checked' ) : null
		const row_shine = row_max()
		if( shine ) shine.click()
		await frame()
		await frame()
		const glow = document.querySelector( '[bog_gamengine_demo_room_glow]' )
		const row_dim = row_max()
		if( glow ) glow.click()
		await frame()
		await frame()
		const glow_checked = glow ? glow.getAttribute( 'mol_check_checked' ) : null
		const row_glow = row_max()
		if( glow ) glow.click()
		await frame()
		await frame()
		const shadow_at = at( 6, 0, 3.2 )
		const open_at = at( 7.5, 0, 5 )
		const shadows = document.querySelector( '[bog_gamengine_demo_room_shadows]' )
		if( !shadows ) return { webgl: true, loaded: true, start, shadow_box: false }
		const shadow_on = pixel( ... shadow_at )
		const open_on = pixel( ... open_at )
		shadows.click()
		await frame()
		await frame()
		const shadow_checked = shadows.getAttribute( 'mol_check_checked' )
		const shadow_off = pixel( ... shadow_at )
		const open_off = pixel( ... open_at )
		shadows.click()
		await frame()
		await frame()
		const sum = got => got[ 0 ] + got[ 1 ] + got[ 2 ]
		const arm_spot = ()=> {
			const depth = start[ 1 ] - 3.5
			const wide = canvas.width / canvas.height
			return [
				( ( 4 - start[ 0 ] ) / ( half * wide * depth ) + 1 ) / 2 * canvas.width,
				( ( 1.9 - 0.5 ) / ( half * depth ) + 1 ) / 2 * canvas.height,
			]
		}
		const arm_peek = ()=> {
			const spot = arm_spot()
			let best = [ 0, 0, 0, 0 ]
			for( let dy = -3; dy <= 3; ++ dy ) for( let dx = -3; dx <= 3; ++ dx ) {
				const got = pixel( spot[ 0 ] + dx, spot[ 1 ] + dy )
				if( sum( got ) > sum( best ) ) best = got
			}
			return best
		}
		const arm_at = arm_spot()
		const arm_off = arm_peek()
		const arm_check = document.querySelector( '[bog_gamengine_demo_room_arm_check]' )
		if( !arm_check ) return { webgl: true, loaded: true, start, arm: false }
		arm_check.click()
		const arm_ready = ()=> /arm \\d+/.test( document.body.innerText )
		for( let i = 0; i < 600 && !arm_ready(); ++ i ) await frame()
		const arm_loaded = arm_ready()
		let arm_bright = arm_peek()
		let arm_dim = arm_bright
		const arm_near = ( a, b )=> {
			for( let i = 0; i < 4; ++ i ) if( Math.abs( a[ i ] - b[ i ] ) > 24 ) return false
			return true
		}
		const arm_enough = ()=> sum( arm_bright ) - sum( arm_off ) > 60 && arm_near( arm_dim, arm_off )
		let arm_frames = 0
		for( ; arm_frames < 360 && !arm_enough(); ++ arm_frames ) {
			await frame()
			const got = arm_peek()
			if( sum( got ) > sum( arm_bright ) ) arm_bright = got
			if( sum( got ) < sum( arm_dim ) ) arm_dim = got
		}
		arm_check.click()
		await frame()
		await frame()
		const arm_gone = arm_peek()
		document.body.dispatchEvent( new KeyboardEvent( 'keydown', { keyCode: 87, bubbles: true } ) )
		for( let i = 0; i < 60; ++ i ) await frame()
		const moved = read()
		document.body.dispatchEvent( new KeyboardEvent( 'keyup', { keyCode: 87, bubbles: true } ) )
		const profile = document.querySelector( '[bog_gamengine_demo_room_profile]' )
		if( profile ) profile.click()
		for( let i = 0; i < 10; ++ i ) await frame()
		const profile_checked = profile ? profile.getAttribute( 'mol_check_checked' ) : null
		const report_found = document.body.innerText.match( /\\u0411\\u0430\\u0442\\u0447\\u0438\\s+(\\d+)/ )
		const report_batches = report_found ? Number( report_found[ 1 ] ) : -1
		return {
			webgl: true, loaded: true, start, moved, center, lit, shade, lit_at, shade_at,
			glow: !!glow, glow_checked, row_dim, row_glow, profile_checked, report_batches,
			pillar, pillar_at, floor_at, pillar_pixel, floor_pixel,
			wire: true, wire_checked, edge_at, edge_on, edge_off,
			fog: true, fog_checked, fog_near_at, fog_far_at, fog_near_off, fog_far_off, fog_near_on, fog_far_on,
			light_count, warm_at, cold_at, warm, cold, shine: !!shine, shine_checked, row_plain, row_shine,
			shadow_box: true, shadow_checked, shadow_at, open_at, shadow_on, shadow_off, open_on, open_off,
			arm: true, arm_loaded, arm_at, arm_off, arm_bright, arm_dim, arm_gone, arm_frames,
			size: [ canvas.width, canvas.height ],
		}
	`

	export const $bog_gamengine_probe_quiet_page = 'bog/gamengine/demo/-/index.html#!demo=quad'

	export const $bog_gamengine_probe_quiet_ok = 'комната и плоский мир грузятся без единого исключения'

	export const $bog_gamengine_probe_quiet_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const errors = []
		addEventListener( 'error', event => errors.push( String( event.message || event.error ) ) )
		addEventListener( 'unhandledrejection', event => errors.push( 'rejection: ' + String( event.reason ) ) )
		const settle = async ( hash, mark )=> {
			location.hash = hash
			let seen = false
			for( let i = 0; i < 600 && !seen; ++ i ) { await frame(); seen = document.body.innerText.includes( mark ) }
			for( let i = 0; i < 60; ++ i ) await frame()
			return seen
		}
		const room = await settle( '#!demo=room', 'walker ' )
		const flat = await settle( '#!demo=flat', 'hero ' )
		return { room, flat, errors }
	`

	export const $bog_gamengine_probe_menu_page = 'bog/gamengine/demo/-/index.html#!demo=quad'

	export const $bog_gamengine_probe_menu_ok = 'строки меню каталога раскладываются без наездов на каждой его странице'

	export const $bog_gamengine_probe_menu_dpr = 2

	export const $bog_gamengine_probe_menu_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const book_of = ()=> document.querySelector( '[mol_book2_catalog]' )
		const box_of = ( node )=> {
			const box = node.getBoundingClientRect()
			return [ Math.round( box.left ), Math.round( box.right ), Math.round( box.top ), Math.round( box.bottom ) ]
		}
		const here = ()=> ( location.hash.match( /demo=([^&#]*)/ ) || [ '', '' ] )[ 1 ]
		const rows = ()=> [ ... document.querySelectorAll( '[mol_book2_catalog_menu_link]' ) ].map( item => {
			const found = ( item.getAttribute( 'href' ) || '' ).match( /demo=([^&#]*)/ )
			return { text: item.textContent.trim(), spread: found ? found[ 1 ] : here(), box: box_of( item ) }
		} )
		const shape = ()=> {
			const book = book_of()
			const canvas = document.querySelector( 'canvas' )
			return [
				book ? Math.round( book.scrollWidth ) : -1,
				book ? book.clientWidth : -1,
				canvas ? canvas.width : 0,
				rows().map( row => row.box.join( ' ' ) ).join( ',' ),
			].join( ' ' )
		}
		const settle = async ( cap )=> {
			let last = ''
			let same = 0
			for( let i = 0; i < cap && same < 3; ++ i ) {
				await frame()
				const now = shape()
				if( now === last ) ++ same
				else { same = 0; last = now }
			}
			return same >= 3
		}
		await settle( 60 )
		const book = book_of()
		if( !book ) return { dpr: devicePixelRatio, inner: innerWidth, spreads: [], pages: [] }
		const spreads = rows().map( row => row.spread )
		const pages = []
		for( const spread of spreads ) {
			location.hash = spread ? '#!demo=' + spread : '#!'
			const steady = await settle( 120 )
			const menu = document.querySelector( '[mol_book2_catalog_menu]' )
			const canvas = document.querySelector( 'canvas' )
			pages.push({
				spread,
				steady,
				rows: rows(),
				menu: menu ? box_of( menu ) : null,
				scroll: Math.round( book.scrollWidth ),
				client: book.clientWidth,
				canvas: canvas ? canvas.width : 0,
			})
		}
		return { dpr: devicePixelRatio, inner: innerWidth, spreads, pages }
	`

	export const $bog_gamengine_probe_boxes_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const canvas = document.querySelector( 'canvas' )
		const gl = canvas && canvas.getContext( 'webgl2' )
		if( !gl ) return { webgl: false, loaded: false }
		const read = ()=> {
			const found = document.body.innerText.match( /bodies (\\d+) \\| contacts (\\d+) \\| joints (\\d+) \\| chain_drop (-?[\\d.]+) \\| phys ([\\d.]+) ms \\| low (-?[\\d.]+|Infinity)/ )
			return found ? {
				bodies: Number( found[ 1 ] ), contacts: Number( found[ 2 ] ), joints: Number( found[ 3 ] ),
				chain_drop: Number( found[ 4 ] ), phys: Number( found[ 5 ] ), low: Number( found[ 6 ] ),
			} : null
		}
		let start = null
		for( let i = 0; i < 600 && !start; ++ i ) { await frame(); start = read() }
		if( !start ) return { webgl: true, loaded: false }
		const started = performance.now()
		let frames = 0
		while( performance.now() - started < 3000 ) { await frame(); ++ frames }
		const settled = read()
		const pixel = new Uint8Array( 4 )
		gl.readPixels( canvas.width / 2 | 0, canvas.height / 2 | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel )
		const drawn = ()=> {
			const found = document.body.innerText.match( /drawn (\\d+) \\/ (\\d+)/ )
			return found ? [ Number( found[ 1 ] ), Number( found[ 2 ] ) ] : null
		}
		const drawn_start = drawn()
		const turn = async ( keyCode, until )=> {
			document.body.dispatchEvent( new KeyboardEvent( 'keydown', { keyCode, bubbles: true } ) )
			const turn_started = performance.now()
			let last = drawn()
			while( performance.now() - turn_started < 20000 ) {
				await frame()
				last = drawn()
				if( last && until( last[ 0 ] ) ) break
			}
			document.body.dispatchEvent( new KeyboardEvent( 'keyup', { keyCode, bubbles: true } ) )
			return { last, took: performance.now() - turn_started }
		}
		const away = await turn( 81, count => count === 0 )
		const drawn_away = away.last
		const back = await turn( 69, count => count > 0 )
		const drawn_back = back.last
		const turn_ms = [ away.took, back.took ]
		const box = canvas.getBoundingClientRect()
		canvas.dispatchEvent( new PointerEvent( 'pointerdown', {
			clientX: box.left + box.width / 2, clientY: box.top + box.height / 2, pointerId: 1, bubbles: true,
		} ) )
		await frame()
		await frame()
		const thrown = read()
		const chain_button = document.querySelector( '[bog_gamengine_demo_boxes_chain]' )
		const door_button = document.querySelector( '[bog_gamengine_demo_boxes_door]' )
		if( !chain_button || !door_button ) return { webgl: true, loaded: true, start, settled, thrown, frames, buttons: false }
		chain_button.click()
		const chain_started = performance.now()
		while( performance.now() - chain_started < 2000 ) await frame()
		const chain = read()
		door_button.click()
		await frame()
		await frame()
		const door = read()
		return {
			webgl: true, loaded: true, start, settled, thrown, frames, buttons: true, chain, door,
			drawn_start, drawn_away, drawn_back, turn_ms,
			center: Array.from( pixel ), size: [ canvas.width, canvas.height ],
		}
	`

	export type $bog_gamengine_probe_result = {
		readonly webgl: boolean
		readonly pixel: readonly [ number, number, number, number ]
		readonly buffers: number
		readonly size?: readonly [ number, number ]
	}

	export type $bog_gamengine_probe_pixel = readonly [ number, number, number, number ]

	export type $bog_gamengine_probe_flat_result = {
		readonly webgl: boolean
		readonly loaded: boolean
		readonly start?: readonly [ number, number ]
		readonly moved?: readonly [ number, number ] | null
		readonly center?: $bog_gamengine_probe_pixel
		readonly hero?: $bog_gamengine_probe_pixel
		readonly corner?: $bog_gamengine_probe_pixel
		readonly floor?: $bog_gamengine_probe_pixel
		readonly taken_before?: number
		readonly taken_after?: number
		readonly label_text?: string
		readonly label_before?: number
		readonly label_after?: number
		readonly frames_walk?: readonly string[]
		readonly frame_idle?: string
		readonly rest?: readonly [ number, number ] | null
		readonly screen_checked?: string | null
		readonly stick?: boolean
		readonly touch_moved?: readonly [ number, number ] | null
		readonly touch_stop?: readonly [ number, number ] | null
		readonly touch_rest?: readonly [ number, number ] | null
		readonly size?: readonly [ number, number ]
	}

	export type $bog_gamengine_probe_room_result = {
		readonly webgl: boolean
		readonly loaded: boolean
		readonly start?: readonly [ number, number, number ]
		readonly moved?: readonly [ number, number, number ] | null
		readonly center?: $bog_gamengine_probe_pixel
		readonly lit?: $bog_gamengine_probe_pixel
		readonly shade?: $bog_gamengine_probe_pixel
		readonly lit_at?: readonly [ number, number ]
		readonly shade_at?: readonly [ number, number ]
		readonly pillar?: number
		readonly pillar_at?: readonly [ number, number ]
		readonly floor_at?: readonly [ number, number ]
		readonly pillar_pixel?: $bog_gamengine_probe_pixel
		readonly floor_pixel?: $bog_gamengine_probe_pixel
		readonly wire?: boolean
		readonly wire_checked?: string | null
		readonly edge_at?: readonly [ number, number ]
		readonly edge_on?: $bog_gamengine_probe_pixel
		readonly edge_off?: $bog_gamengine_probe_pixel
		readonly fog?: boolean
		readonly fog_checked?: string | null
		readonly fog_near_at?: readonly [ number, number ]
		readonly fog_far_at?: readonly [ number, number ]
		readonly fog_near_off?: $bog_gamengine_probe_pixel
		readonly fog_far_off?: $bog_gamengine_probe_pixel
		readonly fog_near_on?: $bog_gamengine_probe_pixel
		readonly fog_far_on?: $bog_gamengine_probe_pixel
		readonly light_count?: number
		readonly warm_at?: readonly [ number, number ]
		readonly cold_at?: readonly [ number, number ]
		readonly warm?: $bog_gamengine_probe_pixel
		readonly cold?: $bog_gamengine_probe_pixel
		readonly shine?: boolean
		readonly shine_checked?: string | null
		readonly row_plain?: number
		readonly row_shine?: number
		readonly glow?: boolean
		readonly glow_checked?: string | null
		readonly row_dim?: number
		readonly row_glow?: number
		readonly profile_checked?: string | null
		readonly report_batches?: number
		readonly shadow_box?: boolean
		readonly shadow_checked?: string | null
		readonly shadow_at?: readonly [ number, number ]
		readonly open_at?: readonly [ number, number ]
		readonly shadow_on?: $bog_gamengine_probe_pixel
		readonly shadow_off?: $bog_gamengine_probe_pixel
		readonly open_on?: $bog_gamengine_probe_pixel
		readonly open_off?: $bog_gamengine_probe_pixel
		readonly arm?: boolean
		readonly arm_loaded?: boolean
		readonly arm_at?: readonly [ number, number ]
		readonly arm_off?: $bog_gamengine_probe_pixel
		readonly arm_bright?: $bog_gamengine_probe_pixel
		readonly arm_dim?: $bog_gamengine_probe_pixel
		readonly arm_gone?: $bog_gamengine_probe_pixel
		readonly arm_frames?: number
		readonly size?: readonly [ number, number ]
	}

	export type $bog_gamengine_probe_quiet_result = {
		readonly room: boolean
		readonly flat: boolean
		readonly errors: readonly string[]
	}

	export type $bog_gamengine_probe_menu_box = readonly [ number, number, number, number ]

	export type $bog_gamengine_probe_menu_row = {
		readonly text: string
		readonly spread: string
		readonly box: $bog_gamengine_probe_menu_box
	}

	export type $bog_gamengine_probe_menu_page_result = {
		readonly spread: string
		readonly steady?: boolean
		readonly rows: readonly $bog_gamengine_probe_menu_row[]
		readonly menu: $bog_gamengine_probe_menu_box | null
		readonly scroll: number
		readonly client: number
		readonly canvas: number
	}

	export type $bog_gamengine_probe_menu_result = {
		readonly dpr: number
		readonly inner: number
		readonly spreads: readonly string[]
		readonly pages: readonly $bog_gamengine_probe_menu_page_result[]
	}

	export function $bog_gamengine_probe_warmth( pixel: $bog_gamengine_probe_pixel ) {
		const red = $bog_gamengine_probe_lin( pixel[ 0 ] )
		const blue = $bog_gamengine_probe_lin( pixel[ 2 ] )
		return red / Math.max( blue, $bog_gamengine_probe_lin( 1 ) )
	}

	export type $bog_gamengine_probe_boxes_stat = {
		readonly bodies: number
		readonly contacts: number
		readonly joints: number
		readonly chain_drop: number
		readonly phys: number
		readonly low: number
	}

	export type $bog_gamengine_probe_boxes_result = {
		readonly webgl: boolean
		readonly loaded: boolean
		readonly start?: $bog_gamengine_probe_boxes_stat
		readonly settled?: $bog_gamengine_probe_boxes_stat | null
		readonly thrown?: $bog_gamengine_probe_boxes_stat | null
		readonly frames?: number
		readonly buttons?: boolean
		readonly chain?: $bog_gamengine_probe_boxes_stat | null
		readonly door?: $bog_gamengine_probe_boxes_stat | null
		readonly drawn_start?: readonly [ number, number ] | null
		readonly drawn_away?: readonly [ number, number ] | null
		readonly drawn_back?: readonly [ number, number ] | null
		readonly turn_ms?: readonly [ number, number ]
		readonly center?: $bog_gamengine_probe_pixel
		readonly size?: readonly [ number, number ]
	}

	export function $bog_gamengine_probe_white( pixel: $bog_gamengine_probe_pixel ) {
		return pixel[ 0 ] > 200 && pixel[ 1 ] > 200 && pixel[ 2 ] > 200
	}

	/** Разброс каналов: у серого он нулевой, у освещённой грани нет. Не зависит от конца цепочки. */
	export function $bog_gamengine_probe_spread( pixel: $bog_gamengine_probe_pixel ) {
		return Math.max( pixel[ 0 ], pixel[ 1 ], pixel[ 2 ] ) - Math.min( pixel[ 0 ], pixel[ 1 ], pixel[ 2 ] )
	}

	export function $bog_gamengine_probe_sum( pixel: $bog_gamengine_probe_pixel ) {
		return pixel[ 0 ] + pixel[ 1 ] + pixel[ 2 ]
	}

	/** Канал в линейный свет: та же гамма 2.2, что тон-маппинг ставит в конце цепочки. */
	export function $bog_gamengine_probe_lin( channel: number ) {
		return Math.pow( channel / 255, 2.2 )
	}

	/**
	 * Сумма каналов в линейном свете. В экранном гамма жмёт отношения, и порог «ярче в N раз»
	 * сторожит не яркость, а величину гаммы. Отношения сравнивать здесь, разности — в экранном:
	 * там у них запас больше.
	 */
	export function $bog_gamengine_probe_linear( pixel: $bog_gamengine_probe_pixel ) {
		let sum = 0
		for( let i = 0; i < 3; ++ i ) sum += $bog_gamengine_probe_lin( pixel[ i ] )
		return sum
	}

	export function $bog_gamengine_probe_red( got: $bog_gamengine_probe_result ) {
		const [ r, g, b, a ] = got.pixel
		return got.webgl && r > 200 && g < 80 && b < 80 && a > 200
	}

	export function $bog_gamengine_probe_dark( pixel: $bog_gamengine_probe_pixel ) {
		return pixel[ 0 ] < 40 && pixel[ 1 ] < 40 && pixel[ 2 ] < 40
	}

	/** Не ярче фона: порог по сумме, а не по каналу, иначе синева фона задевает границу. */
	export function $bog_gamengine_probe_dim( pixel: $bog_gamengine_probe_pixel, limit = 150 ) {
		return $bog_gamengine_probe_sum( pixel ) < limit
	}

	export function $bog_gamengine_probe_near( a: $bog_gamengine_probe_pixel, b: $bog_gamengine_probe_pixel, gap = 16 ) {
		for( let i = 0; i < 4; ++ i ) if( Math.abs( a[ i ] - b[ i ] ) > gap ) return false
		return true
	}

	export async function $bog_gamengine_probe_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_probe_run({
			root,
			flags,
			page: $bog_gamengine_probe_page,
			ready: $bog_gamengine_probe_ready,
			script: $bog_gamengine_probe_script,
			width: 1024,
			height: 768,
		}) as $bog_gamengine_probe_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		if( !$bog_gamengine_probe_red( got ) ) return $mol_fail( new Error( `центр не красный: ${ JSON.stringify( got ) }` ) )
		if( got.buffers !== 0 ) return $mol_fail( new Error( `буферы создаются после второго кадра: ${ got.buffers }` ) )

		return say( $bog_gamengine_probe_ok )
	}

	export async function $bog_gamengine_probe_flat_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_probe_run({
			root,
			flags,
			page: $bog_gamengine_probe_flat_page,
			ready: $bog_gamengine_probe_ready,
			script: $bog_gamengine_probe_flat_script,
			width: 1024,
			height: 768,
		}) as $bog_gamengine_probe_flat_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( got ) }` ) )

		if( !got.webgl ) return fail( 'нет webgl2' )
		if( !got.loaded || !got.start ) return fail( 'подвал не показал позицию героя' )
		if( !got.moved || !( got.moved[ 0 ] > got.start[ 0 ] ) ) return fail( 'герой не сдвинулся вправо' )
		if( $bog_gamengine_probe_dark( got.center! ) ) return fail( 'центр чёрный, пол не нарисован' )
		if( $bog_gamengine_probe_dark( got.corner! ) ) return fail( 'угол героя чёрный' )
		if( !$bog_gamengine_probe_near( got.corner!, got.floor! ) ) return fail( 'угол героя не совпал с полом' )
		if( $bog_gamengine_probe_near( got.corner!, got.hero! ) ) return fail( 'угол героя совпал с центром героя' )
		if( got.taken_before !== 0 ) return fail( 'счётчик монет до клика не нулевой' )
		if( got.taken_after !== 1 ) return fail( 'клик по монете не собрал её' )
		if( got.label_text !== 'Герой' ) return fail( 'подписи над героем нет в DOM' )
		if( !( got.label_after! > got.label_before! ) ) return fail( 'подпись не поехала за героем' )
		if( !got.frames_walk || got.frames_walk.length < 2 ) return fail( 'кадры героя не сменялись за 60 кадров ходьбы' )
		if( got.frame_idle !== 'hero' ) return fail( 'кадр героя после остановки не hero' )
		if( got.screen_checked !== 'true' ) return fail( 'чекбокс «Кнопки» не включился' )
		if( !got.stick ) return fail( 'джойстика нет в DOM после включения кнопок' )
		if( !got.touch_moved || !got.rest || !( got.touch_moved[ 0 ] > got.rest[ 0 ] ) ) return fail( 'герой не пошёл вправо от джойстика' )
		if( !got.touch_stop || !got.touch_rest || got.touch_stop[ 0 ] !== got.touch_rest[ 0 ] ) return fail( 'герой не остановился после отпускания джойстика' )

		return say( $bog_gamengine_probe_flat_ok )
	}

	export async function $bog_gamengine_probe_room_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_probe_run({
			root,
			flags,
			page: $bog_gamengine_probe_room_page,
			ready: $bog_gamengine_probe_ready,
			script: $bog_gamengine_probe_room_script,
			width: 1024,
			height: 768,
		}) as $bog_gamengine_probe_room_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( got ) }` ) )

		if( !got.webgl ) return fail( 'нет webgl2' )
		if( !got.loaded || !got.start ) return fail( 'подвал не показал позицию ходока' )
		if( !got.moved || !( got.moved[ 1 ] < got.start[ 1 ] ) ) return fail( 'ходок не пошёл вперёд по W' )
		if( $bog_gamengine_probe_dark( got.center! ) ) return fail( 'центр чёрный, комната не нарисована' )
		if( $bog_gamengine_probe_dark( got.lit! ) ) return fail( 'освещённая грань чёрная' )
		if( !( $bog_gamengine_probe_linear( got.lit! ) > $bog_gamengine_probe_linear( got.shade! ) * 1.3 ) ) return fail( 'грань к свету не ярче грани в тени' )
		if( !( got.pillar! > 0 ) ) return fail( 'подвал не показал вершины столба' )
		if( $bog_gamengine_probe_dark( got.pillar_pixel! ) ) return fail( 'столб чёрный' )
		if( $bog_gamengine_probe_near( got.pillar_pixel!, got.floor_pixel! ) ) return fail( 'столб совпал с полом у его основания' )
		if( !got.wire ) return fail( 'чекбокса каркаса нет в DOM' )
		if( got.wire_checked !== 'true' ) return fail( 'клик по чекбоксу каркаса его не включил' )
		if( !( $bog_gamengine_probe_spread( got.edge_on! ) < 16 ) ) return fail( 'ребро ящика с каркасом не серое' )
		if( !( $bog_gamengine_probe_linear( got.edge_on! ) > $bog_gamengine_probe_linear( got.edge_off! ) * 1.5 ) ) {
			return fail( 'ребро ящика с каркасом не ярче ребра без каркаса' )
		}
		if( $bog_gamengine_probe_spread( got.edge_off! ) < 16 ) return fail( 'ребро ящика без каркаса серое' )
		if( !got.fog ) return fail( 'чекбокса тумана нет в DOM' )
		if( got.fog_checked !== 'true' ) return fail( 'клик по чекбоксу тумана его не включил' )
		const fog_far_drop = $bog_gamengine_probe_sum( got.fog_far_off! ) - $bog_gamengine_probe_sum( got.fog_far_on! )
		const fog_near_drop = $bog_gamengine_probe_sum( got.fog_near_off! ) - $bog_gamengine_probe_sum( got.fog_near_on! )
		if( !( fog_far_drop > 10 ) ) return fail( 'туман не затемнил дальнюю стену' )
		if( !( fog_far_drop > fog_near_drop ) ) return fail( 'дальняя стена в тумане потемнела не сильнее ближнего пола' )
		if( got.light_count !== 4 ) return fail( 'подвал не показал 4 источника света' )
		if( $bog_gamengine_probe_dark( got.warm! ) ) return fail( 'пол под тёплым светом чёрный' )
		if( !( $bog_gamengine_probe_warmth( got.warm! ) > $bog_gamengine_probe_warmth( got.cold! ) * 1.1 ) ) return fail( 'пол под тёплым светом не краснее пола под холодным' )
		if( !got.shine ) return fail( 'чекбокса бликов нет в DOM' )
		if( got.shine_checked !== 'true' ) return fail( 'клик по чекбоксу бликов его не включил' )
		if( !( got.row_shine! > got.row_plain! ) ) return fail( 'самая светлая точка строки с бликами не ярче, чем без' )
		if( !got.glow ) return fail( 'чекбокса свечения нет в DOM' )
		if( got.glow_checked !== 'true' ) return fail( 'клик по чекбоксу свечения его не включил' )
		if( !( got.row_glow! > got.row_dim! ) ) return fail( 'самая светлая точка строки со свечением не ярче, чем без' )
		if( got.profile_checked !== 'true' ) return fail( 'чекбокс профиля не включился' )
		if( !( got.report_batches! > 0 ) ) return fail( 'отчёт кадра не показал батчи' )
		if( !got.shadow_box ) return fail( 'чекбокса теней нет в DOM' )
		if( got.shadow_checked === 'true' ) return fail( 'клик по чекбоксу теней его не выключил' )
		if( !( $bog_gamengine_probe_sum( got.shadow_off! ) - $bog_gamengine_probe_sum( got.shadow_on! ) > 30 ) ) {
			return fail( 'пол за столбом с тенями не темнее, чем без теней' )
		}
		if( !( Math.abs( $bog_gamengine_probe_sum( got.open_off! ) - $bog_gamengine_probe_sum( got.open_on! ) ) < 10 ) ) {
			return fail( 'открытый пол поменялся от теней' )
		}
		if( !got.arm ) return fail( 'чекбокса руки нет в DOM' )
		if( !got.arm_loaded ) return fail( 'подвал не показал вершины руки' )
		if( !$bog_gamengine_probe_dim( got.arm_off! ) ) return fail( 'на конце руки есть пиксель при выключенной руке' )
		if( !( $bog_gamengine_probe_sum( got.arm_bright! ) - $bog_gamengine_probe_sum( got.arm_off! ) > 60 ) ) {
			return fail( 'рука не появилась на конце в позе привязки' )
		}
		if( !$bog_gamengine_probe_near( got.arm_dim!, got.arm_off!, 24 ) ) return fail( 'кость не увела конец руки из точки за клип' )
		if( !$bog_gamengine_probe_near( got.arm_gone!, got.arm_off!, 24 ) ) return fail( 'рука осталась после выключения' )

		return say( $bog_gamengine_probe_room_ok )
	}

	export async function $bog_gamengine_probe_quiet_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_probe_run({
			root,
			flags,
			page: $bog_gamengine_probe_quiet_page,
			ready: $bog_gamengine_probe_ready,
			script: $bog_gamengine_probe_quiet_script,
			width: 1024,
			height: 768,
		}) as $bog_gamengine_probe_quiet_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( got ) }` ) )

		if( !got.room ) return fail( 'комната не дошла до кадра с подвалом' )
		if( !got.flat ) return fail( 'плоский мир не дошёл до кадра с подвалом' )
		if( got.errors.length ) return fail( 'страница бросила исключения' )

		return say( $bog_gamengine_probe_quiet_ok )
	}

	export async function $bog_gamengine_probe_menu_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_probe_run({
			root,
			flags,
			page: $bog_gamengine_probe_menu_page,
			ready: $bog_gamengine_probe_ready,
			script: $bog_gamengine_probe_menu_script,
			width: 1440,
			height: 900,
			scale: $bog_gamengine_probe_menu_dpr,
			limit: 120000,
		}) as $bog_gamengine_probe_menu_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( got ) }` ) )

		if( got.dpr !== $bog_gamengine_probe_menu_dpr ) return fail( 'вьюпорт не встал на плотность ретины' )
		if( got.spreads.length < 2 ) return fail( 'в меню каталога меньше двух строк, раскладке нечего наезжать' )
		if( got.pages.length !== got.spreads.length ) return fail( 'обошлись не все страницы, которые меню объявило' )

		for( const page of got.pages ) {

			if( page.steady === false ) return fail( `на странице ${ page.spread } раскладка не устаканилась` )
			if( !page.menu ) return fail( `на странице ${ page.spread } нет меню каталога` )
			if( page.rows.length !== got.spreads.length ) {
				return fail( `на странице ${ page.spread } строк меню ${ page.rows.length } вместо ${ got.spreads.length }` )
			}

			for( const row of page.rows ) {
				const [ left, right ] = row.box
				if( right - left < 1 || row.box[ 3 ] - row.box[ 2 ] < 1 ) {
					return fail( `на странице ${ page.spread } строка «${ row.text }» схлопнулась` )
				}
				if( left < 0 || right > got.inner ) return fail( `на странице ${ page.spread } строка «${ row.text }» вышла за окно` )
				if( left < page.menu[ 0 ] || right > page.menu[ 1 ] ) {
					return fail( `на странице ${ page.spread } строка «${ row.text }» вылезла из меню по ширине` )
				}
			}

			for( let one = 0; one < page.rows.length; ++ one ) for( let two = one + 1; two < page.rows.length; ++ two ) {
				const here = page.rows[ one ].box
				const there = page.rows[ two ].box
				const apart = here[ 1 ] <= there[ 0 ] || there[ 1 ] <= here[ 0 ] || here[ 3 ] <= there[ 2 ] || there[ 3 ] <= here[ 2 ]
				if( apart ) continue
				return fail( `на странице ${ page.spread } строки «${ page.rows[ one ].text }» и «${ page.rows[ two ].text }» наезжают` )
			}

			if( page.scroll > page.client + 1 ) return fail( `на странице ${ page.spread } книга шире окна` )
			if( !( page.canvas > got.inner ) ) return fail( `на странице ${ page.spread } холст не вырос по плотности пикселей` )
		}

		return say( $bog_gamengine_probe_menu_ok )
	}

	export async function $bog_gamengine_probe_boxes_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_probe_flags,
		count = $bog_gamengine_probe_boxes_count,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_probe_run({
			root,
			flags,
			page: `${ $bog_gamengine_probe_boxes_page }/count=${ count }`,
			ready: $bog_gamengine_probe_ready,
			script: $bog_gamengine_probe_boxes_script,
			width: 1024,
			height: 768,
			limit: 60000,
		}) as $bog_gamengine_probe_boxes_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }, count ${ count }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( got ) }` ) )

		if( !got.webgl ) return fail( 'нет webgl2' )
		if( !got.loaded || !got.start ) return fail( 'подвал не показал тела' )
		if( !got.settled ) return fail( 'подвал пропал после падения' )
		if( got.settled.bodies !== count + 1 ) return fail( `тел не ${ count + 1 }` )
		if( !( got.settled.contacts > 0 ) ) return fail( 'контактов нет' )
		if( !( got.settled.low > $bog_gamengine_probe_boxes_low ) ) return fail( 'ящик ушёл под пол' )
		if( !got.thrown || got.thrown.bodies !== got.settled.bodies + 1 ) return fail( 'клик не добавил тело' )
		if( !got.buttons ) return fail( 'кнопок цепи и двери нет в DOM' )
		if( !got.chain || got.chain.joints !== 5 ) return fail( 'после цепи шарниров не 5' )
		if( !( Math.abs( got.chain.chain_drop - 4 ) <= 0.5 ) ) return fail( 'нижний ящик цепи не на 4 ниже верхнего' )
		if( !got.door || got.door.joints !== 6 ) return fail( 'после двери шарниров не 6' )
		if( $bog_gamengine_probe_dark( got.center! ) ) return fail( 'центр чёрный' )
		if( !got.drawn_start || !( got.drawn_start[ 0 ] > 0 ) ) return fail( 'подвал не показал нарисованные ящики' )
		if( got.drawn_start[ 1 ] !== count ) return fail( `в подвале не ${ count } тел для отсечения` )
		if( !got.drawn_away || !( got.drawn_away[ 0 ] < got.drawn_start[ 0 ] ) ) return fail( 'спиной к куче нарисовано не меньше ящиков' )
		if( !got.drawn_back || !( got.drawn_back[ 0 ] > got.drawn_away[ 0 ] ) ) return fail( 'после разворота обратно ящики не вернулись' )

		return say( $bog_gamengine_probe_boxes_ok )
	}

}
