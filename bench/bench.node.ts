namespace $ {

	export const $bog_gamengine_bench_rounds = 300

	export const $bog_gamengine_bench_laps = 3

	export const $bog_gamengine_bench_warm = 180

	export const $bog_gamengine_bench_patience = 180000

	export const $bog_gamengine_bench_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0`

	export const $bog_gamengine_bench_lie = 'ВНИМАНИЕ: рисует не настоящий GPU, числа врут в пользу DOM, решение по ним принимать нельзя'

	export const $bog_gamengine_bench_flags = [
		'--headless=new',
		'--remote-debugging-port=0',
		'--no-first-run',
		'--no-default-browser-check',
		'--no-sandbox',
		'--disable-dev-shm-usage',
		'--ignore-gpu-blocklist',
		'--enable-gpu-rasterization',
		'--hide-scrollbars',
	] as const

	export function $bog_gamengine_bench_argv(
		profile: string,
		width = 1400,
		height = 900,
		extra: readonly string[] = [],
	) {
		return [
			... $bog_gamengine_bench_flags,
			`--user-data-dir=${ profile }`,
			`--window-size=${ width },${ height }`,
			... extra,
			'about:blank',
		] as readonly string[]
	}

	export function $bog_gamengine_bench_median( list: readonly number[] ) {
		if( !list.length ) return NaN
		const sorted = [ ... list ].sort( ( first, second )=> first - second )
		return sorted[ sorted.length >> 1 ]
	}

	export function $bog_gamengine_bench_counters( metrics: unknown ) {
		const out = {} as Record< string, number >
		const list = Array.isArray( metrics ) ? metrics : []
		for( let i = 0; i < list.length; ++ i ) {
			const one = list[ i ] as { name?: unknown, value?: unknown }
			if( typeof one?.name !== 'string' ) continue
			out[ one.name ] = Number( one.value ?? 0 )
		}
		return out
	}

	export function $bog_gamengine_bench_frame(
		before: Record< string, number >,
		after: Record< string, number >,
		rounds: number,
	) {
		const per = ( name: string )=> {
			if( rounds <= 0 ) return 0
			return ( ( after[ name ] ?? 0 ) - ( before[ name ] ?? 0 ) ) * 1000 / rounds
		}
		return {
			task: per( 'TaskDuration' ),
			script: per( 'ScriptDuration' ),
			layout: per( 'LayoutDuration' ),
			style: per( 'RecalcStyleDuration' ),
			layouts: rounds > 0 ? ( ( after.LayoutCount ?? 0 ) - ( before.LayoutCount ?? 0 ) ) / rounds : 0,
		}
	}

	export type $bog_gamengine_bench_page = {
		readonly name: string
		readonly page: string
		readonly dir?: string
	}

	export type $bog_gamengine_bench_lap = {
		readonly name: string
		readonly tick: number
		readonly task: number
		readonly layout: number
		readonly style: number
		readonly views: number
	}

	export type $bog_gamengine_bench_row = {
		readonly name: string
		readonly laps: number
		readonly tick: number
		readonly task: number
		readonly layout: number
		readonly style: number
		readonly views: number
	}

	export function $bog_gamengine_bench_report( laps: readonly $bog_gamengine_bench_lap[] ) {
		const names = [] as string[]
		for( let i = 0; i < laps.length; ++ i ) {
			if( names.indexOf( laps[ i ].name ) < 0 ) names.push( laps[ i ].name )
		}
		return names.map( name => {
			const own = laps.filter( lap => lap.name === name )
			const pick = ( key: 'tick' | 'task' | 'layout' | 'style' | 'views' )=>
				$bog_gamengine_bench_median( own.map( lap => lap[ key ] ) )
			return {
				name,
				laps: own.length,
				tick: pick( 'tick' ),
				task: pick( 'task' ),
				layout: pick( 'layout' ),
				style: pick( 'style' ),
				views: pick( 'views' ),
			} as $bog_gamengine_bench_row
		} )
	}

	export function $bog_gamengine_bench_table( rows: readonly $bog_gamengine_bench_row[] ) {
		const lines = [ 'страница\tкругов\ttick, мс\tпоток, мс\tlayout, мс\tвидов' ]
		for( let i = 0; i < rows.length; ++ i ) {
			const row = rows[ i ]
			lines.push( [
				row.name,
				String( row.laps ),
				row.tick.toFixed( 2 ),
				row.task.toFixed( 2 ),
				row.layout.toFixed( 2 ),
				String( row.views ),
			].join( '\t' ) )
		}
		return lines.join( '\n' )
	}

	export class $bog_gamengine_bench_shelf {

		port = 0
		server

		constructor(
			readonly root = String( $node.path.resolve( '.' ) ),
			readonly mounts: Readonly< Record< string, string > > = {},
		) {

			this.server = $node.http.createServer( (
				req: InstanceType< $node['http']['IncomingMessage'] >,
				res: InstanceType< $node['http']['ServerResponse'] >,
			)=> {

				const rel = decodeURIComponent( String( req.url ?? '' ).split( '?' )[ 0 ] ?? '' )
				const file = this.file_of( rel )

				if( !file ) { res.writeHead( 403 ); res.end(); return }

				$node.fs.readFile( file, ( error: unknown, data: unknown )=> {
					if( error ) { res.writeHead( 404 ); res.end( 'нет ' + rel ); return }
					res.writeHead( 200, {
						'content-type': $bog_probe_types[ String( $node.path.extname( file ) ) ] ?? 'application/octet-stream',
					} )
					res.end( data )
				} )

			} )

		}

		file_of( rel: string ) {
			const parts = rel.split( '/' ).filter( part => part && part !== '.' && part !== '..' )
			const mount = this.mounts[ parts[ 0 ] ?? '' ]
			if( mount && parts.length === 2 ) {
				const own = String( $node.path.resolve( mount ) )
				const file = String( $node.path.join( own, parts[ 1 ] ) )
				return file.startsWith( own ) ? file : ''
			}
			const rest = mount ? parts.slice( 1 ) : parts
			const file = String( $node.path.join( this.root, rest.join( '/' ) ) )
			return file.startsWith( this.root ) ? file : ''
		}

		async open() {
			await new Promise< void >( done => this.server.listen( 0, '127.0.0.1', done ) )
			this.port = Number( ( this.server.address() as { port: number } ).port )
			return this
		}

		close() {
			this.server.close()
		}

		uri( path: string ) {
			if( /^https?:\/\//.test( path ) ) return path
			return `http://127.0.0.1:${ this.port }${ path.startsWith( '/' ) ? '' : '/' }${ path }`
		}

	}

	export class $bog_gamengine_bench_chrome {

		child: ReturnType< typeof $node[ 'child_process' ][ 'spawn' ] > | null = null
		socket: WebSocket | null = null
		seq = 0
		waits = new Map< number, ( reply: unknown )=> void >()
		page = ''

		constructor( readonly bin: string, readonly profile: string, readonly argv: readonly string[] ) {}

		async port_of( file: string ) {
			for( let step = 0; step < 150; ++ step ) {
				if( $node.fs.existsSync( file ) ) {
					const line = String( $node.fs.readFileSync( file, 'utf8' ) ).split( '\n' )[ 0 ].trim()
					if( line ) return Number( line )
				}
				await $bog_probe_pause( 200 )
			}
			return $mol_fail( new Error( 'Chrome не открыл порт отладки' ) )
		}

		async open() {

			this.child = $node[ 'child_process' ].spawn( this.bin, [ ... this.argv ], { stdio: 'ignore' } )

			const port = await this.port_of( String( $node.path.join( this.profile, 'DevToolsActivePort' ) ) )
			const version = await ( await fetch( `http://127.0.0.1:${ port }/json/version` ) ).json()
			const socket = new WebSocket( String( version.webSocketDebuggerUrl ) )
			this.socket = socket

			await new Promise< void >( done => { socket.onopen = ()=> done() } )
			socket.onmessage = event => {
				const data = JSON.parse( String( event.data ) ) as { id?: number }
				const wait = this.waits.get( Number( data.id ) )
				if( !wait ) return
				this.waits.delete( Number( data.id ) )
				wait( data )
			}

			const made = await this.send( 'Target.createTarget', { url: 'about:blank' } )
			const target = String( $bog_gamengine_bench_dig( made, 'result', 'targetId' ) )
			const bound = await this.send( 'Target.attachToTarget', { targetId: target, flatten: true } )
			this.page = String( $bog_gamengine_bench_dig( bound, 'result', 'sessionId' ) )

			await this.send( 'Page.enable', {}, this.page )
			await this.send( 'Runtime.enable', {}, this.page )
			await this.send( 'Performance.enable', {}, this.page )

			return this
		}

		send( method: string, params: unknown, session = '' ) {
			return new Promise< unknown >( ( done, fail )=> {
				const id = ++ this.seq
				this.waits.set( id, done )
				this.socket?.send( JSON.stringify( { id, method, params, ... session ? { sessionId: session } : {} } ) )
				setTimeout( ()=> {
					if( this.waits.delete( id ) ) fail( new Error( `${ method } не ответил` ) )
				}, $bog_gamengine_bench_patience )
			} )
		}

		async evaluate( code: string ) {
			const got = await this.send( 'Runtime.evaluate', {
				expression: `(async ()=>{ ${ code } })()`,
				awaitPromise: true,
				returnByValue: true,
			}, this.page )
			const wrong = $bog_gamengine_bench_dig( got, 'result', 'exceptionDetails', 'text' )
			if( wrong ) return $mol_fail( new Error( 'Страница упала: ' + String( wrong ) ) )
			return $bog_gamengine_bench_dig( got, 'result', 'result', 'value' )
		}

		async counters() {
			const got = await this.send( 'Performance.getMetrics', {}, this.page )
			return $bog_gamengine_bench_counters( $bog_gamengine_bench_dig( got, 'result', 'metrics' ) )
		}

		async open_page( uri: string ) {
			await this.send( 'Page.navigate', { url: uri }, this.page )
		}

		close() {
			try { this.socket?.close() } catch( error ) {}
			try { this.child?.kill( 'SIGKILL' ) } catch( error ) {}
		}

	}

	export function $bog_gamengine_bench_dig( source: unknown, ... path: readonly string[] ): unknown {
		let step = source
		for( let i = 0; i < path.length; ++ i ) {
			if( step === null || typeof step !== 'object' ) return undefined
			step = ( step as Record< string, unknown > )[ path[ i ] ]
		}
		return step
	}

	export function $bog_gamengine_bench_warm_script( ready: string, warm: number, before = '' ) {
		return `
			const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
			for( let i = 0; i < 1800; ++ i ) {
				if( ( ()=> { try { return ( ${ ready } ) } catch( error ) { return false } } )() ) break
				await frame()
			}
			${ before }
			for( let i = 0; i < ${ warm }; ++ i ) await frame()
			return true
		`
	}

	export const $bog_gamengine_bench_gpu_script = `
		const canvas = document.createElement( 'canvas' )
		const gl = canvas.getContext( 'webgl2' )
		if( !gl ) return 'нет webgl2'
		const info = gl.getExtension( 'WEBGL_debug_renderer_info' )
		return String( info ? gl.getParameter( info.UNMASKED_RENDERER_WEBGL ) : gl.getParameter( gl.RENDERER ) )
	`

	export function $bog_gamengine_bench_soft( renderer: string ) {
		return /swiftshader|software|llvmpipe|нет webgl2/i.test( renderer )
	}

	export const $bog_gamengine_bench_tick_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const read = ()=> {
			const found = document.body.innerText.match( /tick ([\\d.]+) ms/ )
			return found ? Number( found[ 1 ] ) : NaN
		}
		const ticks = []
		for( let i = 0; i < ROUNDS; ++ i ) { await frame(); ticks.push( read() ) }
		return { ticks, views: document.querySelectorAll( '[mol_view]' ).length }
	`

	export type $bog_gamengine_bench_opts = {
		readonly pages: readonly $bog_gamengine_bench_page[]
		readonly root?: string
		readonly rounds?: number
		readonly laps?: number
		readonly warm?: number
		readonly ready?: string
		readonly before?: string
		readonly width?: number
		readonly height?: number
		readonly flags?: readonly string[]
	}

	export async function $bog_gamengine_bench_run( opts: $bog_gamengine_bench_opts ) {

		const bin = $bog_probe_chrome_bin()
		if( !bin ) return $bog_probe_skip

		const rounds = opts.rounds ?? $bog_gamengine_bench_rounds
		const laps = opts.laps ?? $bog_gamengine_bench_laps
		const warm = opts.warm ?? $bog_gamengine_bench_warm
		const root = String( $node.path.resolve( opts.root ?? '.' ) )

		const mounts = {} as Record< string, string >
		for( let i = 0; i < opts.pages.length; ++ i ) {
			const page = opts.pages[ i ]
			if( page.dir ) mounts[ page.name ] = page.dir
		}

		const shelf = await new $bog_gamengine_bench_shelf( root, mounts ).open()
		const profile = String( $node.fs.mkdtempSync( $node.path.join( $node.os.tmpdir(), 'gamengine-bench-' ) ) )
		const chrome = new $bog_gamengine_bench_chrome(
			bin,
			profile,
			$bog_gamengine_bench_argv( profile, opts.width, opts.height, opts.flags ),
		)

		const all = [] as $bog_gamengine_bench_lap[]
		let gpu = ''

		try {

			await chrome.open()
			gpu = String( await chrome.evaluate( $bog_gamengine_bench_gpu_script ) )

			for( let lap = 0; lap < laps; ++ lap ) {
				for( let i = 0; i < opts.pages.length; ++ i ) {

					const page = opts.pages[ i ]
					const uri = shelf.uri( page.dir ? `${ page.name }/${ page.page }` : page.page )

					await chrome.open_page( uri )
					await chrome.evaluate( $bog_gamengine_bench_warm_script(
						opts.ready ?? $bog_gamengine_bench_ready,
						warm,
						opts.before ?? '',
					) )

					const before = await chrome.counters()
					const got = await chrome.evaluate(
						$bog_gamengine_bench_tick_script.replace( 'ROUNDS', String( rounds ) )
					) as { ticks: number[], views: number }
					const after = await chrome.counters()
					const frame = $bog_gamengine_bench_frame( before, after, rounds )

					all.push( {
						name: page.name,
						tick: $bog_gamengine_bench_median( got.ticks.filter( one => one >= 0 ) ),
						task: frame.task,
						layout: frame.layout,
						style: frame.style,
						views: got.views,
					} )

				}
			}

		} finally {
			chrome.close()
			shelf.close()
			try { $node.fs.rmSync( profile, { recursive: true, force: true } ) } catch( error ) {}
		}

		return { gpu, rows: $bog_gamengine_bench_report( all ) }

	}

	export async function $bog_gamengine_bench_say( opts: $bog_gamengine_bench_opts ) {

		const got = await $bog_gamengine_bench_run( opts )
		if( got === $bog_probe_skip ) {
			$node.fs.writeSync( 1, $bog_probe_skip + '\n' )
			return got
		}

		$node.fs.writeSync( 1, `рисует: ${ got.gpu }\n` )
		if( $bog_gamengine_bench_soft( got.gpu ) ) {
			$node.fs.writeSync( 1, `${ $bog_gamengine_bench_lie }\n` )
		}
		$node.fs.writeSync( 1, $bog_gamengine_bench_table( got.rows ) + '\n' )

		return got
	}

}
