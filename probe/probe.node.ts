namespace $ {

	export const $bog_gamengine_probe_page = 'bog/gamengine/demo/-/index.html#!demo=quad'

	export const $bog_gamengine_probe_flat_page = 'bog/gamengine/demo/-/index.html#!demo=flat'

	export const $bog_gamengine_probe_room_page = 'bog/gamengine/demo/-/index.html#!demo=room'

	export const $bog_gamengine_probe_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0`

	export const $bog_gamengine_probe_ok = 'центр красный, буферы не создаются'

	export const $bog_gamengine_probe_flat_ok = 'герой идёт вправо, пол под прозрачным углом героя, клик собирает монету, подпись едет за героем, кадры ходьбы сменяются'

	export const $bog_gamengine_probe_room_ok = 'ходок идёт вперёд, стена к свету ярче стены в тени, столб из glb отличим от пола, ребро ящика с каркасом белое, пол под тёплым светом краснее, блики ярче'

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
		return {
			webgl: true, loaded: true, start, moved, center, hero, corner, floor,
			taken_before, taken_after, label_text, label_before, label_after,
			frames_walk, frame_idle,
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
		document.body.dispatchEvent( new KeyboardEvent( 'keydown', { keyCode: 87, bubbles: true } ) )
		for( let i = 0; i < 60; ++ i ) await frame()
		const moved = read()
		document.body.dispatchEvent( new KeyboardEvent( 'keyup', { keyCode: 87, bubbles: true } ) )
		return {
			webgl: true, loaded: true, start, moved, center, lit, shade, lit_at, shade_at,
			pillar, pillar_at, floor_at, pillar_pixel, floor_pixel,
			wire: true, wire_checked, edge_at, edge_on, edge_off,
			light_count, warm_at, cold_at, warm, cold, shine: !!shine, shine_checked, row_plain, row_shine,
			size: [ canvas.width, canvas.height ],
		}
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
			while( performance.now() - turn_started < 6000 ) {
				await frame()
				last = drawn()
				if( last && until( last[ 0 ] ) ) break
			}
			document.body.dispatchEvent( new KeyboardEvent( 'keyup', { keyCode, bubbles: true } ) )
			return { last, took: performance.now() - turn_started }
		}
		const away = await turn( 81, count => count === 0 )
		const drawn_away = away.last
		const back = await turn( 69, count => drawn_start && count >= drawn_start[ 0 ] )
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
		readonly light_count?: number
		readonly warm_at?: readonly [ number, number ]
		readonly cold_at?: readonly [ number, number ]
		readonly warm?: $bog_gamengine_probe_pixel
		readonly cold?: $bog_gamengine_probe_pixel
		readonly shine?: boolean
		readonly shine_checked?: string | null
		readonly row_plain?: number
		readonly row_shine?: number
		readonly size?: readonly [ number, number ]
	}

	export function $bog_gamengine_probe_warmth( pixel: $bog_gamengine_probe_pixel ) {
		return pixel[ 0 ] / Math.max( pixel[ 2 ], 1 )
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

	export function $bog_gamengine_probe_sum( pixel: $bog_gamengine_probe_pixel ) {
		return pixel[ 0 ] + pixel[ 1 ] + pixel[ 2 ]
	}

	export function $bog_gamengine_probe_red( got: $bog_gamengine_probe_result ) {
		const [ r, g, b, a ] = got.pixel
		return got.webgl && r > 200 && g < 80 && b < 80 && a > 200
	}

	export function $bog_gamengine_probe_dark( pixel: $bog_gamengine_probe_pixel ) {
		return pixel[ 0 ] < 40 && pixel[ 1 ] < 40 && pixel[ 2 ] < 40
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
		if( !( $bog_gamengine_probe_sum( got.lit! ) > $bog_gamengine_probe_sum( got.shade! ) * 1.3 ) ) return fail( 'грань к свету не ярче грани в тени' )
		if( !( got.pillar! > 0 ) ) return fail( 'подвал не показал вершины столба' )
		if( $bog_gamengine_probe_dark( got.pillar_pixel! ) ) return fail( 'столб чёрный' )
		if( $bog_gamengine_probe_near( got.pillar_pixel!, got.floor_pixel! ) ) return fail( 'столб совпал с полом у его основания' )
		if( !got.wire ) return fail( 'чекбокса каркаса нет в DOM' )
		if( got.wire_checked !== 'true' ) return fail( 'клик по чекбоксу каркаса его не включил' )
		if( !$bog_gamengine_probe_white( got.edge_on! ) ) return fail( 'ребро ящика с каркасом не белое' )
		if( $bog_gamengine_probe_white( got.edge_off! ) ) return fail( 'ребро ящика без каркаса белое' )
		if( got.light_count !== 4 ) return fail( 'подвал не показал 4 источника света' )
		if( $bog_gamengine_probe_dark( got.warm! ) ) return fail( 'пол под тёплым светом чёрный' )
		if( !( $bog_gamengine_probe_warmth( got.warm! ) > $bog_gamengine_probe_warmth( got.cold! ) * 1.1 ) ) return fail( 'пол под тёплым светом не краснее пола под холодным' )
		if( !got.shine ) return fail( 'чекбокса бликов нет в DOM' )
		if( got.shine_checked !== 'true' ) return fail( 'клик по чекбоксу бликов его не включил' )
		if( !( got.row_shine! > got.row_plain! ) ) return fail( 'самая светлая точка строки с бликами не ярче, чем без' )

		return say( $bog_gamengine_probe_room_ok )
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
