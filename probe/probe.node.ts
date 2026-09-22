namespace $ {

	export const $bog_gamengine_probe_page = 'bog/gamengine/demo/-/index.html'

	export const $bog_gamengine_probe_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0`

	export const $bog_gamengine_probe_ok = 'центр красный, буферы не создаются'

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

	export type $bog_gamengine_probe_result = {
		readonly webgl: boolean
		readonly pixel: readonly [ number, number, number, number ]
		readonly buffers: number
		readonly size?: readonly [ number, number ]
	}

	export function $bog_gamengine_probe_red( got: $bog_gamengine_probe_result ) {
		const [ r, g, b, a ] = got.pixel
		return got.webgl && r > 200 && g < 80 && b < 80 && a > 200
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

}
