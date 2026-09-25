namespace $ {

	export const $bog_gamengine_demo_legion_probe_page = 'bog/gamengine/demo/-/index.html#!demo=legion'

	export const $bog_gamengine_demo_legion_probe_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0`

	export const $bog_gamengine_demo_legion_probe_ok = 'сто юнитов на карте, рамка выделяет своих, приказ ведёт их к точке, кадр не чёрный'

	export const $bog_gamengine_demo_legion_probe_flags = [ '--use-angle=swiftshader' ] as const

	export const $bog_gamengine_demo_legion_probe_tick_max = 8

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
		for( let i = 0; i < 60; ++ i ) { await frame(); ticks.push( tick() ) }
		const after = read()
		const pixel = new Uint8Array( 4 )
		gl.readPixels( canvas.width / 2 | 0, canvas.height / 2 | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel )
		const dots = document.querySelectorAll( '[bog_gamengine_demo_legion_dot]' ).length
		return {
			webgl: true, loaded: true, start, picked, moved, after, dots,
			band: band_box ? [ band_box.width, band_box.height ] : null,
			tick: ticks.reduce( ( sum, one )=> sum + one, 0 ) / ticks.length,
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
		const mine = !$node.process.env[ $bog_probe_need ]
		if( mine && !( got.tick! < $bog_gamengine_demo_legion_probe_tick_max ) ) {
			return fail( `кадр дороже ${ $bog_gamengine_demo_legion_probe_tick_max } мс` )
		}
		if( !mine ) return say(
			`${ $bog_gamengine_demo_legion_probe_ok }, tick ${ got.tick!.toFixed( 2 ) } мс,`
			+ ` бюджет кадра не сверялся: прогон не на машине, где он назначен`
		)

		return say( `${ $bog_gamengine_demo_legion_probe_ok }, tick ${ got.tick!.toFixed( 2 ) } мс` )
	}

}
