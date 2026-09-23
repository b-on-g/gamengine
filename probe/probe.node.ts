namespace $ {

	export const $bog_gamestudio_probe_page = 'bog/gamestudio/app/-/index.html'

	export const $bog_gamestudio_probe_ok = 'четыре колонки в ряд, холст нарисован, правка исходника перерисовала героя, правка в инспекторе переписала исходник, клик по холсту выбрал монету, стрелка гизмо перенесла её в исходнике, клик мимо снял выбор'

	export const $bog_gamestudio_probe_flags = [ '--use-angle=swiftshader' ] as const

	export const $bog_gamestudio_probe_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0`

	export const $bog_gamestudio_probe_selectors = [
		'[bog_gamestudio_app_tree]',
		'[bog_gamestudio_app_canvas]',
		'[bog_gamestudio_app_inspect]',
		'[bog_gamestudio_app_source]',
		'canvas',
	] as const

	export type $bog_gamestudio_probe_pixel = readonly [ number, number, number, number ]

	export type $bog_gamestudio_probe_result = $bog_probe_rects_result & {
		readonly webgl: boolean
		readonly waited: number
		readonly center: $bog_gamestudio_probe_pixel
		readonly hero_before: $bog_gamestudio_probe_pixel
		readonly hero_after: $bog_gamestudio_probe_pixel
		readonly rows: number
		readonly tree_text: string
		readonly fields_before: string
		readonly fields_after: string
		readonly source_after: string
		readonly ppu: number
		readonly fields_coin: string
		readonly row_coin: string | null
		readonly arrow: readonly [ number, number ] | null
		readonly source_moved: string
		readonly fields_clear: string
	}

	export function $bog_gamestudio_probe_script( selectors: readonly string[] ) {
		return `
			const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
			const canvas = document.querySelector( 'canvas' )
			const gl = canvas && canvas.getContext( 'webgl2' )
			if( !gl ) return { webgl: false }
			const pixel = ( x, y )=> {
				const out = new Uint8Array( 4 )
				gl.readPixels( x | 0, y | 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, out )
				return Array.from( out )
			}
			const dark = px => px[ 0 ] < 40 && px[ 1 ] < 40 && px[ 2 ] < 40
			const same = ( a, b )=> a.every( ( v, i )=> Math.abs( v - b[ i ] ) < 8 )
			const hero_x = canvas.width / 2 - 2 * canvas.height / 6
			let waited = 0
			let center = pixel( canvas.width / 2, canvas.height / 2 )
			while( waited < 600 && dark( center ) ) { await frame(); ++ waited; center = pixel( canvas.width / 2, canvas.height / 2 ) }
			const hero_before = pixel( hero_x, canvas.height / 2 )
			const base = (()=>{ ${ $bog_probe_rects_script( selectors ) } })()
			const type = ( input, text )=> {
				input.value = text
				input.dispatchEvent( new Event( 'input', { bubbles: true } ) )
			}
			const editor = document.querySelector( '[bog_gamestudio_app_source] textarea' )
			type( editor, editor.value.replace( 'frame \\\\hero', 'frame \\\\coin' ) )
			let hero_after = hero_before
			for( let i = 0; i < 120 && same( hero_after, hero_before ); ++ i ) {
				await frame()
				hero_after = pixel( hero_x, canvas.height / 2 )
			}
			const inspect = document.querySelector( '[bog_gamestudio_app_inspect]' )
			const fields_before = inspect ? inspect.innerText : ''
			const rows = document.querySelectorAll( '[bog_gamestudio_app_row]' )
			const tree = document.querySelector( '[bog_gamestudio_app_tree]' )
			const tree_text = tree ? tree.innerText : ''
			if( rows[ 0 ] ) rows[ 0 ].click()
			await frame()
			await frame()
			const fields_after = inspect ? inspect.innerText : ''
			const num = document.querySelector( '[bog_gamestudio_app_vec_num] input' )
			if( num ) type( num, '5' )
			await frame()
			await frame()
			const source_after = editor.value
			const rect = canvas.getBoundingClientRect()
			const dpr = devicePixelRatio
			const ppu = canvas.height / 6
			const coin_x = canvas.width / 2 + 2 * ppu
			const coin_y = canvas.height / 2
			const pointer = ( type, x, y )=> canvas.dispatchEvent( new PointerEvent( type, {
				bubbles: true, pointerId: 1, isPrimary: true, button: 0, buttons: type === 'pointerup' ? 0 : 1,
				clientX: rect.left + x / dpr, clientY: rect.top + y / dpr,
			} ) )
			const at = ( x, y )=> pixel( x, canvas.height - 1 - y )
			pointer( 'pointerdown', coin_x, coin_y )
			pointer( 'pointerup', coin_x, coin_y )
			await frame()
			await frame()
			const fields_coin = inspect ? inspect.innerText : ''
			const row_coin = rows[ 1 ] ? rows[ 1 ].getAttribute( 'mol_check_checked' ) : null
			let arrow = null
			for( let dx = 4; dx < 90 && !arrow; ++ dx ) for( let dy = -3; dy <= 3; ++ dy ) {
				const px = at( coin_x + dx, coin_y + dy )
				if( px[ 0 ] > 200 && px[ 1 ] < 100 && px[ 2 ] < 100 ) { arrow = [ coin_x + dx, coin_y + dy ]; break }
			}
			if( arrow ) {
				pointer( 'pointerdown', arrow[ 0 ], arrow[ 1 ] )
				pointer( 'pointermove', arrow[ 0 ] + 40, arrow[ 1 ] + 30 )
				await frame()
				pointer( 'pointermove', arrow[ 0 ] + 80, arrow[ 1 ] + 30 )
				await frame()
				pointer( 'pointerup', arrow[ 0 ] + 80, arrow[ 1 ] + 30 )
				await frame()
				await frame()
			}
			const source_moved = editor.value
			pointer( 'pointerdown', canvas.width / 2 + ppu, canvas.height / 2 - 2 * ppu )
			pointer( 'pointerup', canvas.width / 2 + ppu, canvas.height / 2 - 2 * ppu )
			await frame()
			await frame()
			const fields_clear = inspect ? inspect.innerText : ''
			return { ... base, webgl: true, waited, center, hero_before, hero_after, rows: rows.length, tree_text, fields_before, fields_after, source_after, ppu, fields_coin, row_coin, arrow, source_moved, fields_clear }
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
			width: 1600,
			height: 800,
		}) as $bog_gamestudio_probe_result | typeof $bog_probe_skip

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ flags.join( ' ' ) || 'без флагов' }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( got ) }` ) )

		if( !got.webgl ) return fail( 'нет webgl2' )

		const [ tree, canvas, inspect, source, holst ] = $bog_gamestudio_probe_selectors.map( selector => got.rects[ selector ] )

		if( !$bog_probe_beside( tree, canvas ) ) return fail( 'холст не справа от дерева' )
		if( !$bog_probe_beside( canvas, inspect ) ) return fail( 'инспектор не справа от холста' )
		if( !$bog_probe_beside( inspect, source ) ) return fail( 'исходник не справа от инспектора' )
		if( !$bog_probe_fits( got ) ) return fail( 'страница шире окна' )
		if( !holst || !( holst.width > 300 ) ) return fail( 'холст уже 300 px' )
		if( !( holst.height > 300 ) ) return fail( 'холст ниже 300 px' )
		if( got.center[ 0 ] < 40 && got.center[ 1 ] < 40 && got.center[ 2 ] < 40 ) return fail( 'центр холста чёрный' )
		if( got.hero_before.every( ( value, index )=> Math.abs( value - got.hero_after[ index ] ) < 8 ) ) return fail( 'замена кадра в исходнике не перерисовала героя' )
		if( got.rows !== 3 ) return fail( 'в дереве не три строки' )
		if( !got.tree_text.includes( 'Герой' ) ) return fail( 'в дереве нет имени «Герой»' )
		if( got.fields_before.includes( 'pos' ) ) return fail( 'инспектор показал pos до выбора' )
		if( !got.fields_after.includes( 'pos' ) ) return fail( 'клик по строке «Герой» не показал pos' )
		if( !got.source_after.includes( 'pos / 5 0 0' ) ) return fail( 'число из инспектора не попало в исходник' )
		if( !got.fields_coin.includes( 'coin' ) ) return fail( 'клик по монете на холсте не показал её в инспекторе' )
		if( got.row_coin !== 'true' ) return fail( 'строка «Монета» в дереве не подсвечена' )
		if( !got.arrow ) return fail( 'справа от монеты нет красной стрелки гизмо' )
		const moved = got.source_moved.match( /Монета[^]*?pos \/ (\S+) (\S+) (\S+)/ )
		if( !moved ) return fail( 'в исходнике нет pos монеты' )
		if( Math.abs( Number( moved[ 1 ] ) - 2 - 80 / got.ppu ) > 0.1 ) return fail( 'x монеты после переноса по стрелке не вырос на 80 px' )
		if( Number( moved[ 2 ] ) !== 0 ) return fail( 'перенос по стрелке X сдвинул y' )
		if( got.fields_clear.includes( 'pos' ) ) return fail( 'клик мимо не снял выбор' )

		return say( $bog_gamestudio_probe_ok )
	}

}
