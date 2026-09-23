namespace $ {

	export const $bog_gamengine_probe_page = 'bog/gamengine/demo/-/index.html#!demo=quad'

	export const $bog_gamengine_probe_flat_page = 'bog/gamengine/demo/-/index.html#!demo=flat'

	export const $bog_gamengine_probe_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0`

	export const $bog_gamengine_probe_ok = 'центр красный, буферы не создаются'

	export const $bog_gamengine_probe_flat_ok = 'герой идёт вправо, пол под прозрачным углом героя'

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
		document.body.dispatchEvent( new KeyboardEvent( 'keydown', { keyCode: 68, bubbles: true } ) )
		for( let i = 0; i < 60; ++ i ) await frame()
		const moved = read()
		document.body.dispatchEvent( new KeyboardEvent( 'keyup', { keyCode: 68, bubbles: true } ) )
		return { webgl: true, loaded: true, start, moved, center, hero, corner, floor, size: [ canvas.width, canvas.height ] }
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
		readonly size?: readonly [ number, number ]
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

		return say( $bog_gamengine_probe_flat_ok )
	}

}
