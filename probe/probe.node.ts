namespace $ {

	export const $bog_gamestudio_probe_page = 'bog/gamestudio/app/-/index.html'

	export const $bog_gamestudio_probe_ok = 'три колонки в ряд, холст нарисован, клик по строке дерева показал pos в инспекторе'

	export const $bog_gamestudio_probe_flags = [ '--use-angle=swiftshader' ] as const

	export const $bog_gamestudio_probe_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0`

	export const $bog_gamestudio_probe_selectors = [
		'[bog_gamestudio_app_tree]',
		'[bog_gamestudio_app_canvas]',
		'[bog_gamestudio_app_inspect]',
		'canvas',
	] as const

	export type $bog_gamestudio_probe_pixel = readonly [ number, number, number, number ]

	export type $bog_gamestudio_probe_result = $bog_probe_rects_result & {
		readonly webgl: boolean
		readonly waited: number
		readonly center: $bog_gamestudio_probe_pixel
		readonly rows: number
		readonly fields_before: string
		readonly fields_after: string
	}

	export function $bog_gamestudio_probe_script( selectors: readonly string[] ) {
		return `
			const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
			const canvas = document.querySelector( 'canvas' )
			const gl = canvas && canvas.getContext( 'webgl2' )
			if( !gl ) return { webgl: false }
			const pixel = ()=> {
				const out = new Uint8Array( 4 )
				gl.readPixels( canvas.width / 2 | 0, canvas.height / 2 | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, out )
				return Array.from( out )
			}
			const dark = px => px[ 0 ] < 40 && px[ 1 ] < 40 && px[ 2 ] < 40
			let waited = 0
			let center = pixel()
			while( waited < 600 && dark( center ) ) { await frame(); ++ waited; center = pixel() }
			const base = (()=>{ ${ $bog_probe_rects_script( selectors ) } })()
			const inspect = document.querySelector( '[bog_gamestudio_app_inspect]' )
			const fields_before = inspect ? inspect.innerText : ''
			const rows = document.querySelectorAll( '[bog_gamestudio_app_row]' )
			if( rows[ 1 ] ) rows[ 1 ].click()
			await frame()
			await frame()
			const fields_after = inspect ? inspect.innerText : ''
			return { ... base, webgl: true, waited, center, rows: rows.length, fields_before, fields_after }
		`
	}

	export async function $bog_gamestudio_probe_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamestudio_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_probe_run({
			root,
			flags,
			page: $bog_gamestudio_probe_page,
			ready: $bog_gamestudio_probe_ready,
			script: $bog_gamestudio_probe_script( $bog_gamestudio_probe_selectors ),
			width: 1280,
			height: 800,
		}) as $bog_gamestudio_probe_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( got ) }` ) )

		if( !got.webgl ) return fail( 'нет webgl2' )

		const [ tree, canvas, inspect, holst ] = $bog_gamestudio_probe_selectors.map( selector => got.rects[ selector ] )

		if( !$bog_probe_beside( tree, canvas ) ) return fail( 'холст не справа от дерева' )
		if( !$bog_probe_beside( canvas, inspect ) ) return fail( 'инспектор не справа от холста' )
		if( !$bog_probe_fits( got ) ) return fail( 'страница шире окна' )
		if( !holst || !( holst.width > 300 ) ) return fail( 'холст уже 300 px' )
		if( !( holst.height > 300 ) ) return fail( 'холст ниже 300 px' )
		if( got.center[ 0 ] < 40 && got.center[ 1 ] < 40 && got.center[ 2 ] < 40 ) return fail( 'центр холста чёрный' )
		if( got.rows !== 3 ) return fail( 'в дереве не три строки' )
		if( got.fields_before.includes( 'pos' ) ) return fail( 'инспектор показал pos до выбора' )
		if( !got.fields_after.includes( 'pos' ) ) return fail( 'клик по второй строке не показал pos' )

		return say( $bog_gamestudio_probe_ok )
	}

}
