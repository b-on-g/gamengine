namespace $ {

	export const $bog_gamengine_spike_s3_probe_page = 'bog/gamengine/spike/s3/quad/-/test.html'

	export const $bog_gamengine_spike_s3_probe_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0`

	export const $bog_gamengine_spike_s3_probe_ok = 'центр красный'

	export const $bog_gamengine_spike_s3_probe_flags = [ '--use-angle=swiftshader' ] as const

	export const $bog_gamengine_spike_s3_probe_script = `
		const canvas = document.querySelector( 'canvas' )
		const gl = canvas && canvas.getContext( 'webgl2' )
		if( !gl ) return { webgl: false, pixel: [ 0, 0, 0, 0 ], renderer: '' }
		const info = gl.getExtension( 'WEBGL_debug_renderer_info' )
		const renderer = String( info ? gl.getParameter( info.UNMASKED_RENDERER_WEBGL ) : gl.getParameter( gl.RENDERER ) )
		const pixel = new Uint8Array( 4 )
		gl.readPixels( canvas.width / 2 | 0, canvas.height / 2 | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel )
		return { webgl: true, pixel: Array.from( pixel ), renderer, size: [ canvas.width, canvas.height ] }
	`

	export type $bog_gamengine_spike_s3_probe_result = {
		readonly webgl: boolean
		readonly pixel: readonly [ number, number, number, number ]
		readonly renderer: string
		readonly size?: readonly [ number, number ]
	}

	export function $bog_gamengine_spike_s3_probe_red( got: $bog_gamengine_spike_s3_probe_result ) {
		const [ r, g, b, a ] = got.pixel
		return got.webgl && r > 200 && g < 50 && b < 50 && a > 200
	}

	export async function $bog_gamengine_spike_s3_probe_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_spike_s3_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_probe_run({
			root,
			flags,
			page: $bog_gamengine_spike_s3_probe_page,
			ready: $bog_gamengine_spike_s3_probe_ready,
			script: $bog_gamengine_spike_s3_probe_script,
			width: 640,
			height: 480,
		}) as $bog_gamengine_spike_s3_probe_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		if( !$bog_gamengine_spike_s3_probe_red( got ) ) return $mol_fail( new Error( `центр не красный: ${ JSON.stringify( got ) }` ) )

		return say( $bog_gamengine_spike_s3_probe_ok )
	}

}
