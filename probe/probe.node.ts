namespace $ {

	export const $bog_gamengine_demo_shooter_probe_page = 'bog/gamengine/demo/-/index.html#!demo=shooter'

	export const $bog_gamengine_demo_shooter_probe_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0`

	export const $bog_gamengine_demo_shooter_probe_ok = 'арена нарисована, выстрел снял мишень, W увёл игрока вперёд'

	export const $bog_gamengine_demo_shooter_probe_flags = [ '--use-angle=swiftshader' ] as const

	export const $bog_gamengine_demo_shooter_probe_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const canvas = document.querySelector( 'canvas' )
		const gl = canvas && canvas.getContext( 'webgl2' )
		if( !gl ) return { webgl: false, loaded: false }
		const read = ()=> {
			const found = document.body.innerText.match( /player (-?[\\d.]+) × (-?[\\d.]+) \\| health (-?[\\d.]+) \\| targets (\\d+) \\| shots (\\d+)/ )
			if( !found ) return null
			return { x: Number( found[ 1 ] ), z: Number( found[ 2 ] ), health: Number( found[ 3 ] ), targets: Number( found[ 4 ] ), shots: Number( found[ 5 ] ) }
		}
		let start = null
		for( let i = 0; i < 600 && !start; ++ i ) { await frame(); start = read() }
		if( !start ) return { webgl: true, loaded: false }
		const key = ( code, type )=> document.body.dispatchEvent( new KeyboardEvent( type, { keyCode: code, bubbles: true } ) )
		key( 70, 'keydown' )
		let shot = start
		let frames = 0
		for( let i = 0; i < 120; ++ i ) {
			await frame()
			++ frames
			shot = read() ?? shot
			if( shot.targets < start.targets ) break
		}
		key( 70, 'keyup' )
		const began = performance.now()
		key( 87, 'keydown' )
		for( let i = 0; i < 60; ++ i ) await frame()
		const fps = 60 / ( ( performance.now() - began ) / 1000 )
		key( 87, 'keyup' )
		for( let i = 0; i < 5; ++ i ) await frame()
		const moved = read() ?? shot
		const pixel = new Uint8Array( 4 )
		gl.readPixels( canvas.width / 2 | 0, canvas.height / 2 | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel )
		const foot = document.body.innerText.match( /bodies (\\d+) \\| contacts (\\d+) \\| phys ([\\d.]+) мс/ )
		return {
			webgl: true, loaded: true, start, shot, moved, fps, frames,
			stat: document.body.innerText.match( /frame [^\\n]*/ )?.[ 0 ] ?? '',
			bodies: foot ? Number( foot[ 1 ] ) : 0,
			phys_ms: foot ? Number( foot[ 3 ] ) : 0,
			center: Array.from( pixel ), size: [ canvas.width, canvas.height ],
		}
	`

	export type $bog_gamengine_demo_shooter_probe_look = {
		readonly x: number
		readonly z: number
		readonly health: number
		readonly targets: number
		readonly shots: number
	}

	export type $bog_gamengine_demo_shooter_probe_result = {
		readonly webgl: boolean
		readonly loaded: boolean
		readonly start?: $bog_gamengine_demo_shooter_probe_look
		readonly shot?: $bog_gamengine_demo_shooter_probe_look
		readonly moved?: $bog_gamengine_demo_shooter_probe_look
		readonly fps?: number
		readonly frames?: number
		readonly stat?: string
		readonly bodies?: number
		readonly phys_ms?: number
		readonly center?: readonly [ number, number, number, number ]
		readonly size?: readonly [ number, number ]
	}

	export async function $bog_gamengine_demo_shooter_probe_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_demo_shooter_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_probe_run({
			root,
			flags,
			page: $bog_gamengine_demo_shooter_probe_page,
			ready: $bog_gamengine_demo_shooter_probe_ready,
			script: $bog_gamengine_demo_shooter_probe_script,
			width: 1024,
			height: 768,
		}) as $bog_gamengine_demo_shooter_probe_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( got ) }` ) )

		if( !got.webgl ) return fail( 'нет webgl2' )
		if( !got.loaded || !got.start ) return fail( 'подвал не показал игрока, атлас не загрузился' )
		if( !( got.start.targets > 0 ) ) return fail( 'арена без мишеней' )
		if( !( got.shot!.targets < got.start.targets ) ) return fail( 'выстрел не снял мишень' )
		if( !( got.moved!.z < got.start.z - 0.5 ) ) return fail( 'W не увёл игрока вперёд' )
		if( !( got.moved!.health > 0 ) ) return fail( 'игрок не дожил до конца пробы' )
		const [ r, g, b ] = got.center!
		if( r < 25 && g < 25 && b < 25 ) return fail( 'центр чёрный, арена не нарисована' )

		return say( $bog_gamengine_demo_shooter_probe_ok )
	}

}
