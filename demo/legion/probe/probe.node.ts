namespace $ {

	export const $bog_gamengine_demo_legion_probe_page = 'bog/gamengine/demo/-/index.html#!demo=legion'

	export const $bog_gamengine_demo_legion_probe_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0`

	export const $bog_gamengine_demo_legion_probe_ok = 'сто юнитов на карте, рамка выделяет своих, приказ ведёт их к точке, кадр не чёрный'

	export const $bog_gamengine_demo_legion_probe_flags = [ '--use-angle=swiftshader' ] as const

	export const $bog_gamengine_demo_legion_probe_tick_max = 8

	export const $bog_gamengine_demo_legion_probe_peak_max = 24

	export const $bog_gamengine_demo_legion_probe_far_max = 24

	export const $bog_gamengine_demo_legion_probe_far_ok = 'приказ всем своим в дальний угол доведён, и худший кадр не вырос выше признанного потолка'

	export const $bog_gamengine_demo_legion_probe_far_zooms = 10

	export const $bog_gamengine_demo_legion_probe_far_frames = 90

	export const $bog_gamengine_demo_legion_probe_far_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const canvas = document.querySelector( 'canvas' )
		const gl = canvas && canvas.getContext( 'webgl2' )
		if( !gl ) return { webgl: false, loaded: false }
		const num = re => {
			const found = document.body.innerText.match( re )
			return found ? Number( found[ 1 ] ) : NaN
		}
		const read = ()=> {
			const found = document.body.innerText.match( /mine (\\d+) \\| foes (\\d+) \\| sel (\\d+)/ )
			return found ? { mine: Number( found[ 1 ] ), foes: Number( found[ 2 ] ), sel: Number( found[ 3 ] ) } : null
		}
		const tick = ()=> num( /tick ([\\d.]+) ms/ )
		const peak = ()=> num( /peak ([\\d.]+) ms/ )
		let ready = null
		for( let i = 0; i < 900 && !ready; ++ i ) { await frame(); ready = read() }
		if( !ready ) return { webgl: true, loaded: false }
		for( let i = 0; i < 60; ++ i ) await frame()

		const page = $$.$bog_gamengine_demo.Root( 0 ).Legion()
		const box = canvas.getBoundingClientRect()
		for( let i = 0; i < ${ $bog_gamengine_demo_legion_probe_far_zooms }; ++ i ) {
			canvas.dispatchEvent( new WheelEvent( 'wheel', {
				bubbles: true, deltaY: 120, clientX: box.left + box.width / 2, clientY: box.top + box.height / 2,
			} ) )
			await frame()
		}

		const point = ( type, x, y, button )=> canvas.dispatchEvent( new PointerEvent( type, {
			clientX: box.left + x, clientY: box.top + y, pointerId: 1, button: button || 0, bubbles: true,
		} ) )
		point( 'pointerdown', 2, 2 )
		await frame()
		point( 'pointermove', box.width - 2, box.height - 2 )
		await frame()
		point( 'pointerup', box.width - 2, box.height - 2 )
		for( let i = 0; i < 6; ++ i ) await frame()
		const picked = read()

		const tile = page.Tile()
		const cell = [ tile.width() - 2, tile.height() - 2 ]
		const aim = new Float32Array( 3 )
		tile.cell_pos( cell[ 0 ], cell[ 1 ], aim )
		const seen = page.Point().screen( new Float32Array( 3 ), aim )
		const far = [ seen[ 0 ] / devicePixelRatio, seen[ 1 ] / devicePixelRatio ]
		const inside = far[ 0 ] > 0 && far[ 0 ] < box.width && far[ 1 ] > 0 && far[ 1 ] < box.height

		let plans = 0
		const native = $.$bog_gamengine_nav_agent.prototype.plan
		$.$bog_gamengine_nav_agent.prototype.plan = function() { ++ plans; return native.apply( this, arguments ) }

		point( 'pointerdown', far[ 0 ], far[ 1 ], 2 )
		await frame()
		const ticks = []
		const peaks = []
		const dense = []
		for( let i = 0; i < ${ $bog_gamengine_demo_legion_probe_far_frames }; ++ i ) {
			const was = plans
			await frame()
			ticks.push( tick() )
			peaks.push( peak() )
			dense.push( plans - was )
		}
		$.$bog_gamengine_nav_agent.prototype.plan = native

		const routes = page.Scene().nodes()
			.filter( one => typeof one.path_count === 'function' )
			.map( one => one.path_count() )
			.filter( one => one > 0 )

		return {
			webgl: true, loaded: true, picked, inside, cell, plans,
			dense_top: dense.reduce( ( most, one )=> one > most ? one : most, 0 ),
			route_top: routes.reduce( ( most, one )=> one > most ? one : most, 0 ),
			tick: ticks.reduce( ( sum, one )=> sum + one, 0 ) / ticks.length,
			peak: peaks.reduce( ( worst, one )=> one > worst ? one : worst, 0 ),
		}
	`

	export type $bog_gamengine_demo_legion_probe_far_result = {
		readonly webgl: boolean
		readonly loaded: boolean
		readonly picked?: $bog_gamengine_demo_legion_probe_read | null
		readonly inside?: boolean
		readonly cell?: readonly [ number, number ]
		readonly plans?: number
		readonly dense_top?: number
		readonly route_top?: number
		readonly tick?: number
		readonly peak?: number
	}

	export async function $bog_gamengine_demo_legion_probe_far(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_demo_legion_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_probe_run({
			root,
			flags,
			page: $bog_gamengine_demo_legion_probe_page,
			ready: $bog_gamengine_demo_legion_probe_ready,
			script: $bog_gamengine_demo_legion_probe_far_script,
			width: 1280,
			height: 800,
		}) as $bog_gamengine_demo_legion_probe_far_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( got ) }` ) )

		if( !got.webgl ) return fail( 'нет webgl2' )
		if( !got.loaded || !got.picked ) return fail( 'подвал не показал лагеря' )
		if( !( got.picked.mine > 0 ) ) return fail( 'в подвале нет своих' )
		if( got.picked.sel !== got.picked.mine ) {
			return fail( `рамка по всему холсту выделила ${ got.picked.sel } из ${ got.picked.mine } своих` )
		}
		if( !got.inside ) return fail( `дальний угол ${ got.cell } не попал в холст, приказ отдавать некуда` )
		if( !( got.dense_top! > 0 ) ) return fail( 'за окно замера никто не перепланировал путь, мерить нечего' )
		if( !( got.route_top! > 1 ) ) return fail( 'ни у кого нет пути длиннее точки, приказ не дошёл' )
		if( !Number.isFinite( got.peak! ) ) return fail( 'страница не печатает peak, худший кадр не с чем сверить' )

		if( !( got.peak! < $bog_gamengine_demo_legion_probe_far_max ) ) return fail(
			`худший кадр дороже ${ $bog_gamengine_demo_legion_probe_far_max } мс:`
			+ ` признанный потолок вырос, а цель ${ $bog_gamengine_demo_legion_probe_peak_max } мс`
		)

		return say(
			`${ $bog_gamengine_demo_legion_probe_far_ok }, худший кадр ${ got.peak!.toFixed( 1 ) } мс`
			+ ` при потолке ${ $bog_gamengine_demo_legion_probe_far_max } и цели ${ $bog_gamengine_demo_legion_probe_peak_max },`
			+ ` средний ${ got.tick!.toFixed( 2 ) } мс,`
			+ ` перепланирований ${ got.plans }, в густейшем кадре ${ got.dense_top }`
		)
	}

	export const $bog_gamengine_demo_legion_probe_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const canvas = document.querySelector( 'canvas' )
		const gl = canvas && canvas.getContext( 'webgl2' )
		if( !gl ) return { webgl: false, loaded: false }
		const read = ()=> {
			const found = document.body.innerText.match( /mine (\\d+) \\| foes (\\d+) \\| sel (\\d+) \\| at (-?[\\d.]+) × (-?[\\d.]+) \\| nodes (\\d+) \\| atlas (\\d+)/ )
			if( !found ) return null
			return {
				mine: Number( found[ 1 ] ), foes: Number( found[ 2 ] ), sel: Number( found[ 3 ] ),
				x: Number( found[ 4 ] ), y: Number( found[ 5 ] ), nodes: Number( found[ 6 ] ), atlas: Number( found[ 7 ] ),
			}
		}
		const tick = ()=> {
			const found = document.body.innerText.match( /tick ([\\d.]+) ms/ )
			return found ? Number( found[ 1 ] ) : NaN
		}
		const peak = ()=> {
			const found = document.body.innerText.match( /peak ([\\d.]+) ms/ )
			return found ? Number( found[ 1 ] ) : NaN
		}
		let ready = null
		for( let i = 0; i < 900 && !ready; ++ i ) { await frame(); ready = read() }
		if( !ready ) return { webgl: true, loaded: false }
		for( let i = 0; i < 60; ++ i ) await frame()
		const start = read()
		const box = canvas.getBoundingClientRect()
		const point = ( type, x, y, button )=> canvas.dispatchEvent( new PointerEvent( type, {
			clientX: box.left + x, clientY: box.top + y, pointerId: 1, button: button || 0, bubbles: true,
		} ) )
		point( 'pointerdown', box.width * 0.06, box.height * 0.3 )
		await frame()
		point( 'pointermove', box.width * 0.44, box.height * 0.72 )
		await frame()
		const band = document.querySelector( '[bog_gamengine_demo_legion_band]' )
		const band_box = band ? band.getBoundingClientRect() : null
		point( 'pointerup', box.width * 0.44, box.height * 0.72 )
		for( let i = 0; i < 4; ++ i ) await frame()
		const picked = read()
		point( 'pointerdown', box.width * 0.5, box.height * 0.5, 2 )
		for( let i = 0; i < 120; ++ i ) await frame()
		const moved = read()
		const ticks = []
		const peaks = []
		for( let i = 0; i < 60; ++ i ) { await frame(); ticks.push( tick() ); peaks.push( peak() ) }
		const after = read()
		const pixel = new Uint8Array( 4 )
		gl.readPixels( canvas.width / 2 | 0, canvas.height / 2 | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel )
		const dots = document.querySelectorAll( '[bog_gamengine_demo_legion_dot]' ).length
		return {
			webgl: true, loaded: true, start, picked, moved, after, dots,
			band: band_box ? [ band_box.width, band_box.height ] : null,
			tick: ticks.reduce( ( sum, one )=> sum + one, 0 ) / ticks.length,
			peak: peaks.reduce( ( worst, one )=> one > worst ? one : worst, 0 ),
			center: Array.from( pixel ), size: [ canvas.width, canvas.height ],
		}
	`

	export type $bog_gamengine_demo_legion_probe_read = {
		readonly mine: number
		readonly foes: number
		readonly sel: number
		readonly x: number
		readonly y: number
		readonly nodes: number
		readonly atlas: number
	}

	export type $bog_gamengine_demo_legion_probe_result = {
		readonly webgl: boolean
		readonly loaded: boolean
		readonly start?: $bog_gamengine_demo_legion_probe_read
		readonly picked?: $bog_gamengine_demo_legion_probe_read | null
		readonly moved?: $bog_gamengine_demo_legion_probe_read | null
		readonly after?: $bog_gamengine_demo_legion_probe_read | null
		readonly dots?: number
		readonly band?: readonly [ number, number ] | null
		readonly tick?: number
		readonly peak?: number
		readonly center?: readonly [ number, number, number, number ]
		readonly size?: readonly [ number, number ]
	}

	export async function $bog_gamengine_demo_legion_probe_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_demo_legion_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_probe_run({
			root,
			flags,
			page: $bog_gamengine_demo_legion_probe_page,
			ready: $bog_gamengine_demo_legion_probe_ready,
			script: $bog_gamengine_demo_legion_probe_script,
			width: 1280,
			height: 800,
		}) as $bog_gamengine_demo_legion_probe_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( got ) }` ) )

		if( !got.webgl ) return fail( 'нет webgl2' )
		if( !got.loaded || !got.start ) return fail( 'подвал не показал лагеря' )
		if( got.start.atlas !== 1 ) return fail( 'атлас не загрузился' )
		if( got.start.mine + got.start.foes !== 100 ) return fail( 'в подвале не сто юнитов' )
		if( !got.band || !( got.band[ 0 ] > 10 && got.band[ 1 ] > 10 ) ) return fail( 'рамка не нарисовалась' )
		if( !got.picked || !( got.picked.sel > 0 ) ) return fail( 'рамка никого не выделила' )
		if( !got.moved ) return fail( 'подвал пропал после приказа' )
		if( !( got.moved.x > got.picked.x + 0.8 ) ) return fail( 'выбранные не пошли к точке приказа' )
		if( !( got.dots! > 0 ) ) return fail( 'мини-карта пуста' )

		const [ r, g, b ] = got.center!
		if( r < 25 && g < 25 && b < 25 ) return fail( 'центр чёрный, карта не нарисована' )
		if( !Number.isFinite( got.peak! ) ) return fail( 'страница не печатает peak, худший кадр не с чем сверить' )
		if( !( got.peak! < $bog_gamengine_demo_legion_probe_peak_max ) ) {
			return fail( `худший кадр дороже ${ $bog_gamengine_demo_legion_probe_peak_max } мс` )
		}

		const mine = !$node.process.env[ $bog_probe_need ]
		if( mine && !( got.tick! < $bog_gamengine_demo_legion_probe_tick_max ) ) {
			return fail( `средний кадр дороже ${ $bog_gamengine_demo_legion_probe_tick_max } мс` )
		}
		if( !mine ) return say(
			`${ $bog_gamengine_demo_legion_probe_ok }, худший кадр ${ got.peak!.toFixed( 1 ) } мс,`
			+ ` средний ${ got.tick!.toFixed( 2 ) } мс не сверялся: прогон не на машине, где он назначен`
		)

		return say(
			`${ $bog_gamengine_demo_legion_probe_ok }, худший кадр ${ got.peak!.toFixed( 1 ) } мс,`
			+ ` средний ${ got.tick!.toFixed( 2 ) } мс`
		)
	}

}
