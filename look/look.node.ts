namespace $ {

	export const $bog_gamengine_look_page = 'bog/gamengine/demo/-/index.html#!demo=flat'

	export const $bog_gamengine_look_width = 1024

	export const $bog_gamengine_look_height = 768

	export const $bog_gamengine_look_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0`

	export const $bog_gamengine_look_soft_flags = [ '--use-angle=swiftshader' ] as const

	export const $bog_gamengine_look_gpu_flags = [ '--ignore-gpu-blocklist', '--enable-gpu-rasterization' ] as const

	export const $bog_gamengine_look_ok = 'подпись сцен совпала с записанной'

	export const $bog_gamengine_look_away = 'подпись не сверялась: прогон не на машине, где она снята'

	export type $bog_gamengine_look_spots = { readonly [ name: string ]: readonly [ number, number ] }

	export type $bog_gamengine_look_scene = {
		readonly name: string
		readonly demo?: string
		readonly mark?: string
		readonly click?: string
		readonly spots: $bog_gamengine_look_spots
		readonly witness?: readonly string[]
	}

	export const $bog_gamengine_look_scenes: readonly $bog_gamengine_look_scene[] = [
		{
			name: 'flat',
			demo: 'flat',
			spots: {
				wall: [ 0.5, 0.03 ],
				floor: [ 0.52, 0.65 ],
				hero: [ 0.1, 0.1 ],
				coin: [ 0.9, 0.1 ],
				outside: [ 0.012, 0.48 ],
			},
		},
		{
			name: 'room',
			demo: 'room',
			spots: {
				lit: [ 0.3, 0.5 ],
				shade: [ 0.86, 0.5 ],
				floor: [ 0.5, 0.86 ],
				far: [ 0.5, 0.52 ],
				sky: [ 0.5, 0.12 ],
			},
		},
		{
			name: 'shine',
			demo: 'room',
			click: '[bog_gamengine_demo_room_glow]',
			spots: {
				lit: [ 0.3, 0.5 ],
				shade: [ 0.86, 0.5 ],
				floor: [ 0.5, 0.86 ],
				far: [ 0.5, 0.52 ],
				sky: [ 0.5, 0.12 ],
			},
		},
	]

	export type $bog_gamengine_look_shot = {
		readonly median: number
		readonly low: number
		readonly high: number
		readonly dark: number
		readonly blown: number
		readonly sat: number
		readonly spots: { readonly [ name: string ]: readonly number[] }
	}

	export function $bog_gamengine_look_stats(
		pixels: ArrayLike< number >,
		width: number,
		height: number,
		spots: { readonly [ name: string ]: readonly [ number, number ] },
	) {

		const hist = new Float64Array( 256 )
		let sat = 0
		let count = 0

		for( let i = 0; i + 3 < pixels.length; i += 4 ) {
			const r = pixels[ i ]
			const g = pixels[ i + 1 ]
			const b = pixels[ i + 2 ]
			let luma = Math.round( 0.2126 * r + 0.7152 * g + 0.0722 * b )
			if( luma < 0 ) luma = 0
			if( luma > 255 ) luma = 255
			hist[ luma ] += 1
			sat += Math.max( r, Math.max( g, b ) ) - Math.min( r, Math.min( g, b ) )
			++ count
		}

		const level = ( share: number )=> {
			const need = count * share
			let seen = 0
			for( let value = 0; value < 256; ++ value ) {
				seen += hist[ value ]
				if( seen >= need ) return value
			}
			return 255
		}

		let dark = 0
		let blown = 0
		for( let value = 0; value < 16; ++ value ) dark += hist[ value ]
		for( let value = 251; value < 256; ++ value ) blown += hist[ value ]

		const picked = {} as { [ name: string ]: number[] }
		for( const name of Object.keys( spots ) ) {
			const spot = spots[ name ]
			let x = Math.round( spot[ 0 ] * width )
			let y = Math.round( ( 1 - spot[ 1 ] ) * height )
			if( x < 0 ) x = 0
			if( x > width - 1 ) x = width - 1
			if( y < 0 ) y = 0
			if( y > height - 1 ) y = height - 1
			const at = ( y * width + x ) * 4
			picked[ name ] = [ pixels[ at ], pixels[ at + 1 ], pixels[ at + 2 ], pixels[ at + 3 ] ]
		}

		return {
			median: level( 0.5 ),
			low: level( 0.1 ),
			high: level( 0.9 ),
			dark: Math.round( dark / count * 1e4 ) / 1e4,
			blown: Math.round( blown / count * 1e4 ) / 1e4,
			sat: Math.round( sat / count * 100 ) / 100,
			spots: picked,
		}
	}

	export const $bog_gamengine_look_tol = {
		level: 1,
		share: 0.005,
		sat: 0.2,
		spot: 3,
	}

	export function $bog_gamengine_look_lin( value: number ) {
		return Math.pow( Math.max( 0, Math.min( 255, value ) ) / 255, 2.2 )
	}

	export function $bog_gamengine_look_sum( pixel: readonly number[] ) {
		return $bog_gamengine_look_lin( pixel[ 0 ] ) + $bog_gamengine_look_lin( pixel[ 1 ] ) + $bog_gamengine_look_lin( pixel[ 2 ] )
	}

	export function $bog_gamengine_look_drift(
		scene: string,
		now: $bog_gamengine_look_shot,
		base: $bog_gamengine_look_shot,
		tol = $bog_gamengine_look_tol,
		witness: readonly string[] = [],
	) {

		const out = [] as string[]

		const level_off = ( name: string, prop: string, fresh: number, kept: number )=> {
			if( witness.includes( prop ) ) return
			if( Math.abs( fresh - kept ) > tol.level ) {
				out.push( `${ scene }: ${ name } ${ fresh } против ${ kept }` )
			}
		}

		level_off( 'медиана', 'median', now.median, base.median )
		level_off( 'тёмный конец', 'low', now.low, base.low )
		level_off( 'светлый конец', 'high', now.high, base.high )

		if( !witness.includes( 'dark' ) && now.dark - base.dark > tol.share ) {
			out.push( `${ scene }: провалов ${ now.dark } против ${ base.dark }` )
		}
		if( !witness.includes( 'blown' ) && now.blown - base.blown > tol.share ) {
			out.push( `${ scene }: выжженных ${ now.blown } против ${ base.blown }` )
		}
		if( !witness.includes( 'sat' ) && base.sat - now.sat > tol.sat ) {
			out.push( `${ scene }: насыщенность ${ now.sat } против ${ base.sat }` )
		}

		for( const name of Object.keys( base.spots ) ) {
			if( witness.includes( name ) ) continue
			const fresh = now.spots[ name ]
			const kept = base.spots[ name ]
			if( !fresh ) {
				out.push( `${ scene }: точки ${ name } нет в замере` )
				continue
			}
			let gap = 0
			for( let i = 0; i < 3; ++ i ) gap = Math.max( gap, Math.abs( fresh[ i ] - kept[ i ] ) )
			if( gap > tol.spot ) {
				const fell = $bog_gamengine_look_sum( fresh )
				const was = $bog_gamengine_look_sum( kept )
				out.push( `${ scene }: точка ${ name } ${ fresh.slice( 0, 3 ).join( ',' ) } против ${ kept.slice( 0, 3 ).join( ',' ) }, в линейке ${ fell.toFixed( 3 ) } против ${ was.toFixed( 3 ) }` )
			}
		}

		return out as readonly string[]
	}

	export type $bog_gamengine_look_shift = {
		readonly name: string
		readonly gap: number
		readonly limit: number
		readonly fading: boolean
		readonly line: string
	}

	export function $bog_gamengine_look_round( value: number ) {
		return Math.round( value * 1e6 ) / 1e6
	}

	export function $bog_gamengine_look_shifts(
		scene: string,
		now: $bog_gamengine_look_shot,
		base: $bog_gamengine_look_shot,
		env = $bog_gamengine_look_env,
	) {

		const out = [] as $bog_gamengine_look_shift[]

		const put = ( name: string, fresh: number | string, kept: number | string, gap: number, limit: number, fading: boolean )=> {
			if( !gap ) return
			out.push({ name, gap, limit, fading, line: `${ scene }: ${ name } ${ fresh } против ${ kept }` })
		}

		for( const name of [ 'median', 'low', 'high' ] as const ) {
			put( name, now[ name ], base[ name ], Math.abs( now[ name ] - base[ name ] ), env.level, now[ name ] < base[ name ] )
		}
		put( 'dark', now.dark, base.dark, $bog_gamengine_look_round( Math.abs( now.dark - base.dark ) ), env.share, now.dark > base.dark )
		put( 'blown', now.blown, base.blown, $bog_gamengine_look_round( Math.abs( now.blown - base.blown ) ), env.share, now.blown < base.blown )
		put( 'sat', now.sat, base.sat, $bog_gamengine_look_round( Math.abs( now.sat - base.sat ) ), env.sat, now.sat < base.sat )

		for( const name of Object.keys( base.spots ) ) {
			const fresh = now.spots[ name ]
			const kept = base.spots[ name ]
			if( !fresh ) {
				out.push({ name, gap: 255, limit: env.spot, fading: false, line: `${ scene }: точки ${ name } нет в замере` })
				continue
			}
			let gap = 0
			for( let i = 0; i < 3; ++ i ) gap = Math.max( gap, Math.abs( fresh[ i ] - kept[ i ] ) )
			put(
				'точка ' + name,
				fresh.slice( 0, 3 ).join( ',' ),
				kept.slice( 0, 3 ).join( ',' ),
				gap,
				env.spot,
				$bog_gamengine_look_sum( fresh ) < $bog_gamengine_look_sum( kept ),
			)
		}

		return out as readonly $bog_gamengine_look_shift[]
	}

	export function $bog_gamengine_look_refuse(
		shifts: readonly $bog_gamengine_look_shift[],
		env = $bog_gamengine_look_env,
	) {

		const out = [] as string[]

		for( const shift of shifts ) {
			if( shift.gap > shift.limit ) {
				out.push( `${ shift.line }, это ${ shift.gap } при конверте окружения ${ shift.limit }` )
			}
		}

		const fading = shifts.filter( one => one.fading )
		if( fading.length >= env.same_way && fading.length === shifts.length ) {
			out.push(
				`${ fading.length } чисел уехали в сторону побледнения и ни одно против,`
				+ ` а окружение согласованно двигает не больше ${ env.same_way - 1 }`
			)
		}

		return out as readonly string[]
	}

	export function $bog_gamengine_look_script( scenes: readonly $bog_gamengine_look_scene[] = $bog_gamengine_look_scenes ) {
		return `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const stats = ${ $bog_gamengine_look_stats.toString() }
		const holds = new WeakMap()
		const live = ()=> {
			const canvas = document.querySelector( 'canvas' )
			if( !canvas ) return null
			let gl = holds.get( canvas )
			if( !gl ) {
				gl = canvas.getContext( 'webgl2' )
				holds.set( canvas, gl )
			}
			return gl ? { canvas, gl } : null
		}
		const first = live()
		if( !first ) return { renderer: 'нет webgl2', scenes: {} }
		const info = first.gl.getExtension( 'WEBGL_debug_renderer_info' )
		const renderer = String( info ? first.gl.getParameter( info.UNMASKED_RENDERER_WEBGL ) : first.gl.getParameter( first.gl.RENDERER ) )
		const line = ()=> {
			const now = live()
			if( !now ) return ''
			const width = now.canvas.width
			const row = new Uint8Array( width * 4 )
			now.gl.readPixels( 0, ( now.canvas.height / 2 ) | 0, width, 1, now.gl.RGBA, now.gl.UNSIGNED_BYTE, row )
			let sum = 0
			for( let i = 0; i < row.length; ++ i ) sum = ( sum * 31 + row[ i ] ) % 1000000007
			return width + ':' + now.canvas.height + ':' + sum
		}
		const shot = spots => {
			const now = live()
			if( !now ) return null
			const width = now.canvas.width
			const height = now.canvas.height
			const pixels = new Uint8Array( width * height * 4 )
			now.gl.readPixels( 0, 0, width, height, now.gl.RGBA, now.gl.UNSIGNED_BYTE, pixels )
			return stats( pixels, width, height, spots )
		}
		const settle = async cap => {
			let last = ''
			let same = 0
			for( let i = 0; i < cap && same < 3; ++ i ) {
				await frame()
				const now = line()
				if( now && now === last ) ++ same
				else { same = 0; last = now }
			}
			return same >= 3
		}
		const middle = list => {
			const sorted = [ ... list ].sort( ( a, b )=> a - b )
			return sorted[ sorted.length >> 1 ]
		}
		const scenes = {}
		for( const scene of ${ JSON.stringify( scenes ) } ) {
			if( scene.demo ) location.hash = '#!demo=' + scene.demo
			let marked = !scene.mark
			for( let i = 0; i < 600 && !marked; ++ i ) {
				await frame()
				marked = new RegExp( scene.mark ).test( document.body.innerText )
			}
			await settle( 240 )
			if( scene.click ) {
				const button = document.querySelector( scene.click )
				if( button ) button.click()
			}
			const steady = await settle( 240 )
			const takes = []
			for( let i = 0; i < 3; ++ i ) {
				await frame()
				await frame()
				const got = shot( scene.spots )
				if( got ) takes.push( got )
			}
			if( !takes.length ) { scenes[ scene.name ] = { steady: false }; continue }
			const last = takes[ takes.length - 1 ]
			scenes[ scene.name ] = {
				marked,
				median: middle( takes.map( take => take.median ) ),
				low: middle( takes.map( take => take.low ) ),
				high: middle( takes.map( take => take.high ) ),
				dark: middle( takes.map( take => take.dark ) ),
				blown: middle( takes.map( take => take.blown ) ),
				sat: middle( takes.map( take => take.sat ) ),
				spots: last.spots,
				size: [ live().canvas.width, live().canvas.height ],
				steady,
			}
			if( scene.click ) {
				const button = document.querySelector( scene.click )
				if( button ) button.click()
				await settle( 120 )
			}
		}
		return { renderer, scenes }
	`
	}

	export type $bog_gamengine_look_take_shot = $bog_gamengine_look_shot & {
		readonly steady?: boolean
		readonly marked?: boolean
		readonly size?: readonly [ number, number ]
	}

	export type $bog_gamengine_look_result = {
		readonly renderer: string
		readonly scenes: { readonly [ name: string ]: $bog_gamengine_look_take_shot }
	}

	export function $bog_gamengine_look_family( renderer: string, machine = $bog_gamengine_look_machine ) {
		if( /нет webgl2/i.test( renderer ) ) return ''
		if( /swiftshader|software|llvmpipe/i.test( renderer ) ) return 'soft'
		if( renderer === machine.gpu ) return 'gpu'
		return ''
	}

	export async function $bog_gamengine_look_take(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_look_soft_flags,
		page = $bog_gamengine_look_page,
		scenes: readonly $bog_gamengine_look_scene[] = $bog_gamengine_look_scenes,
	) {
		return await $bog_probe_run({
			root,
			flags,
			page,
			ready: $bog_gamengine_look_ready,
			script: $bog_gamengine_look_script( scenes ),
			width: $bog_gamengine_look_width,
			height: $bog_gamengine_look_height,
			limit: 180000,
		}) as $bog_gamengine_look_result | typeof $bog_probe_skip
	}

	export async function $bog_gamengine_look_take_gpu(
		root = $node.process.cwd(),
		page = $bog_gamengine_look_page,
		scenes: readonly $bog_gamengine_look_scene[] = $bog_gamengine_look_scenes,
	) {

		const bin = $bog_probe_chrome_bin()
		if( !bin ) return $bog_probe_skip

		const site = await new $bog_probe_static( String( $node.path.resolve( root ) ) ).open()
		const profile = String( $node.fs.mkdtempSync( $node.path.join( $node.os.tmpdir(), 'bog-look-' ) ) )
		const chrome = new $bog_gamengine_bench_chrome(
			bin,
			profile,
			$bog_gamengine_bench_argv( profile, $bog_gamengine_look_width, $bog_gamengine_look_height ),
		)

		try {

			await chrome.open()
			await chrome.send( 'Emulation.setDeviceMetricsOverride', {
				width: $bog_gamengine_look_width,
				height: $bog_gamengine_look_height,
				deviceScaleFactor: 1,
				mobile: false,
			}, chrome.page )
			await chrome.open_page( site.uri( page ) )

			for( let step = 0; step < 600; ++ step ) {
				const ready = await chrome.evaluate( `return ( ${ $bog_gamengine_look_ready } )` )
				if( ready ) break
				await $bog_probe_pause( 100 )
			}

			return await chrome.evaluate( $bog_gamengine_look_script( scenes ) ) as $bog_gamengine_look_result

		} finally {
			chrome.close()
			site.close()
			try { $node.fs.rmSync( profile, { recursive: true, force: true } ) } catch( error ) {}
		}

	}

	export async function $bog_gamengine_look_say(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_look_soft_flags,
		page = $bog_gamengine_look_page,
		scenes: readonly $bog_gamengine_look_scene[] = $bog_gamengine_look_scenes,
		base = $bog_gamengine_look_base,
		why = '',
		machine = $bog_gamengine_look_machine,
		env = $bog_gamengine_look_env,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, line + '\n' ); return line }

		const got = await $bog_gamengine_look_take( root, flags, page, scenes )
		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `рендерер: ${ got.renderer }` )
		say( JSON.stringify( got.scenes, null, '\t' ) )

		const family = $bog_gamengine_look_family( got.renderer, machine )
		if( !family ) return say( 'рендерер незнакомый, дифф с записанной подписью не считался' )

		const kept = family === 'soft' ? base.soft : base.gpu
		const shifts = [] as $bog_gamengine_look_shift[]

		for( const scene of scenes ) {
			const shot = kept[ scene.name ]
			const fresh = got.scenes[ scene.name ]
			if( !shot ) { say( `сцена ${ scene.name } записывается впервые, сверять не с чем` ); continue }
			if( !fresh ) { say( `сцена ${ scene.name } не снялась` ); continue }
			shifts.push( ... $bog_gamengine_look_shifts( scene.name, fresh, shot, env ) )
		}

		if( !shifts.length ) {
			say( `дифф с подписью ${ base.at } пуст` )
			return got
		}

		say( `дифф с подписью ${ base.at }:\n  ` + shifts.map( one => one.line ).join( '\n  ' ) )

		const refuse = $bog_gamengine_look_refuse( shifts, env )
		if( !refuse.length ) {
			say( `дифф лежит в конверте окружения ${ env.at }, пересъёмка не требует объяснения` )
			return got
		}

		if( !why ) return $mol_fail( new Error(
			`дифф не похож на смену машины:\n  ${ refuse.join( '\n  ' ) }\n`
			+ `  пересъёмка обязана объясниться: передай причину доводом why\n`
			+ `  ${ env.note }`
		) )

		say( `дифф вышел за конверт, причина названа: ${ why }\n  ${ refuse.join( '\n  ' ) }` )

		return got
	}

	export async function $bog_gamengine_look_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_look_soft_flags,
		page = $bog_gamengine_look_page,
		scenes: readonly $bog_gamengine_look_scene[] = $bog_gamengine_look_scenes,
		base = $bog_gamengine_look_base,
		mine = !$node.process.env[ 'CI' ],
		machine = $bog_gamengine_look_machine,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'подпись: ' + line + '\n' ); return line }

		if( !mine ) return say( $bog_gamengine_look_away )

		const started = Date.now()
		const got = await $bog_gamengine_look_take( root, flags, page, scenes )
		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `${ got.renderer }, ${ Date.now() - started } мс, ${ JSON.stringify( got.scenes ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( reason ) )

		const family = $bog_gamengine_look_family( got.renderer, machine )
		if( !family ) return fail( `рендерер не распознан, подпись сверять не с чем: ${ got.renderer }` )

		const renderer = family === 'soft' ? machine.soft : machine.gpu
		if( got.renderer !== renderer ) {
			return fail( `подпись снята не на этом рендерере:\n  ${ got.renderer }\n  против\n  ${ renderer }` )
		}

		for( const scene of scenes ) {
			const now = got.scenes[ scene.name ]
			if( !now ) return fail( `сцена ${ scene.name } не снялась` )
			if( now.marked === false ) return fail( `сцена ${ scene.name } не дождалась своей отметки ${ scene.mark }` )
			if( now.steady === false ) return fail( `сцена ${ scene.name } не устаканилась` )
		}

		const kept = family === 'soft' ? base.soft : base.gpu
		const drift = [] as string[]

		for( const scene of scenes ) {
			const shot = kept[ scene.name ]
			if( !shot ) return fail( `для сцены ${ scene.name } нет записанной подписи` )
			drift.push( ... $bog_gamengine_look_drift( scene.name, got.scenes[ scene.name ], shot, $bog_gamengine_look_tol, scene.witness ) )
		}

		if( drift.length ) return fail( `подпись ушла от записанной ${ base.at }:\n  ${ drift.join( '\n  ' ) }` )

		return say( $bog_gamengine_look_ok )
	}

}
