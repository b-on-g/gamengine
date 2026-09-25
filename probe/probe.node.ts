namespace $ {

	export const $bog_gamengine_demo_jumper_probe_page = 'bog/gamengine/demo/-/index.html#!demo=jumper'

	export const $bog_gamengine_demo_jumper_probe_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0`

	export const $bog_gamengine_demo_jumper_probe_ok = 'герой стоит на земле, прыгает и садится обратно, идёт вправо и берёт монету, центр не чёрный'

	export const $bog_gamengine_demo_jumper_probe_flags = [ '--use-angle=swiftshader' ] as const

	export const $bog_gamengine_demo_jumper_probe_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const canvas = document.querySelector( 'canvas' )
		const gl = canvas && canvas.getContext( 'webgl2' )
		if( !gl ) return { webgl: false, loaded: false }
		const read = ()=> {
			const found = document.body.innerText.match( /hero (-?[\\d.]+) × (-?[\\d.]+) \\| lives (\\d+) \\| coins (\\d+)/ )
			if( !found ) return null
			return { x: Number( found[ 1 ] ), y: Number( found[ 2 ] ), lives: Number( found[ 3 ] ), coins: Number( found[ 4 ] ) }
		}
		let ready = null
		for( let i = 0; i < 600 && !ready; ++ i ) { await frame(); ready = read() }
		if( !ready ) return { webgl: true, loaded: false }
		for( let i = 0; i < 30; ++ i ) await frame()
		const start = read()
		const key = ( code, type )=> document.body.dispatchEvent( new KeyboardEvent( type, { keyCode: code, bubbles: true } ) )
		key( 32, 'keydown' )
		let top = start.y
		for( let i = 0; i < 30; ++ i ) {
			await frame()
			const now = read()
			if( now && now.y > top ) top = now.y
		}
		key( 32, 'keyup' )
		let land = start
		for( let i = 0; i < 90; ++ i ) { await frame(); land = read() ?? land }
		key( 68, 'keydown' )
		let low = start.y
		let high = start.y
		for( let i = 0; i < 60; ++ i ) {
			await frame()
			const now = read()
			if( !now ) continue
			if( now.y < low ) low = now.y
			if( now.y > high ) high = now.y
		}
		const moved = read()
		key( 68, 'keyup' )
		for( let i = 0; i < 10; ++ i ) await frame()
		const rest = read()
		const pixel = new Uint8Array( 4 )
		gl.readPixels( canvas.width / 2 | 0, canvas.height / 2 | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel )
		return {
			webgl: true, loaded: true, start, top, land, moved, rest, low, high,
			center: Array.from( pixel ), size: [ canvas.width, canvas.height ],
		}
	`

	export type $bog_gamengine_demo_jumper_probe_hero = {
		readonly x: number
		readonly y: number
		readonly lives: number
		readonly coins: number
	}

	export type $bog_gamengine_demo_jumper_probe_result = {
		readonly webgl: boolean
		readonly loaded: boolean
		readonly start?: $bog_gamengine_demo_jumper_probe_hero
		readonly top?: number
		readonly land?: $bog_gamengine_demo_jumper_probe_hero | null
		readonly moved?: $bog_gamengine_demo_jumper_probe_hero | null
		readonly rest?: $bog_gamengine_demo_jumper_probe_hero | null
		readonly low?: number
		readonly high?: number
		readonly center?: readonly [ number, number, number, number ]
		readonly size?: readonly [ number, number ]
	}

	export async function $bog_gamengine_demo_jumper_probe_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_demo_jumper_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_probe_run({
			root,
			flags,
			page: $bog_gamengine_demo_jumper_probe_page,
			ready: $bog_gamengine_demo_jumper_probe_ready,
			script: $bog_gamengine_demo_jumper_probe_script,
			width: 1024,
			height: 768,
		}) as $bog_gamengine_demo_jumper_probe_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( got ) }` ) )

		if( !got.webgl ) return fail( 'нет webgl2' )
		if( !got.loaded || !got.start ) return fail( 'подвал не показал героя' )
		if( !( got.top! > got.start.y + 0.5 ) ) return fail( 'пробел не поднял героя' )
		if( !got.land || Math.abs( got.land.y - got.start.y ) > 0.05 ) return fail( 'герой не вернулся на землю' )
		if( !got.moved || !( got.moved.x > got.start.x + 1 ) ) return fail( 'герой не сдвинулся вправо' )
		if( Math.abs( got.high! - got.low! ) > 0.2 ) return fail( 'герой проваливается на бегу' )
		if( !( got.moved.coins > got.start.coins ) ) return fail( 'проход по монете не увеличил счётчик' )
		if( got.rest && got.rest.lives !== got.start.lives ) return fail( 'герой потерял жизнь на ровном месте' )
		const [ r, g, b ] = got.center!
		if( r < 40 && g < 40 && b < 40 ) return fail( 'центр чёрный, уровень не нарисован' )

		return say( $bog_gamengine_demo_jumper_probe_ok )
	}

}
