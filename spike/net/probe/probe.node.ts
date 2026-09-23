namespace $ {

	export const $bog_gamengine_spike_net_probe_page = 'bog/gamengine/demo/-/index.html#!demo=net/master=localhost:9090'

	export const $bog_gamengine_spike_net_probe_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0 && /land \\S{10,}/.test( document.body.innerText )`

	export const $bog_gamengine_spike_net_probe_ok = 'второе окно увидело движение первого'

	export const $bog_gamengine_spike_net_probe_no_master = 'мастер Базы на 9090 не слушает, проба пропущена'

	export const $bog_gamengine_spike_net_probe_limit = 200

	export const $bog_gamengine_spike_net_probe_rounds = 3

	export const $bog_gamengine_spike_net_probe_flags = [ '--use-angle=swiftshader' ] as const

	export const $bog_gamengine_spike_net_probe_id_script = `
		return ( /me (\\w{8}) /.exec( document.body.innerText ) || [] )[ 1 ] || ''
	`

	export const $bog_gamengine_spike_net_probe_move_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const read = ()=> {
			const found = document.body.innerText.match( /me \\w{8} (-?[\\d.]+) × (-?[\\d.]+)/ )
			return found ? [ Number( found[ 1 ] ), Number( found[ 2 ] ) ] : null
		}
		const start = read()
		const t0 = Date.now()
		document.body.dispatchEvent( new KeyboardEvent( 'keydown', { keyCode: 68, bubbles: true } ) )
		for( let i = 0; i < 30; ++ i ) await frame()
		document.body.dispatchEvent( new KeyboardEvent( 'keyup', { keyCode: 68, bubbles: true } ) )
		for( let i = 0; i < 5; ++ i ) await frame()
		return { t0, start, moved: read() }
	`

	export function $bog_gamengine_spike_net_probe_watch_script( id: string ) {
		return `
			const tick = ()=> new Promise( done => setTimeout( done, 2 ) )
			const pattern = new RegExp( ${ JSON.stringify( id ) } + ' (-?[\\\\d.]+) × (-?[\\\\d.]+)' )
			const read = ()=> {
				const found = document.body.innerText.match( pattern )
				return found ? [ Number( found[ 1 ] ), Number( found[ 2 ] ) ] : null
			}
			const before = read()
			const began = Date.now()
			while( Date.now() - began < 5000 ) {
				await tick()
				const now = read()
				if( now && before && ( now[ 0 ] !== before[ 0 ] || now[ 1 ] !== before[ 1 ] ) ) return { t1: Date.now(), before, after: now }
			}
			return { t1: -1, before, after: read() }
		`
	}

	export type $bog_gamengine_spike_net_probe_move = {
		readonly t0: number
		readonly start: readonly [ number, number ] | null
		readonly moved: readonly [ number, number ] | null
	}

	export type $bog_gamengine_spike_net_probe_seen = {
		readonly t1: number
		readonly before: readonly [ number, number ] | null
		readonly after: readonly [ number, number ] | null
	}

	export function $bog_gamengine_spike_net_probe_master_alive( port = 9090 ) {
		return new Promise< boolean >( done => {
			const socket = $node.net.connect( port, '127.0.0.1' )
			socket.once( 'connect', ()=> { socket.destroy(); done( true ) } )
			socket.once( 'error', ()=> done( false ) )
		} )
	}

	export async function $bog_gamengine_spike_net_probe_window( bin: string, flags: readonly string[], width: number, height: number ) {
		const profile = String( $node.fs.mkdtempSync( $node.path.join( $node.os.tmpdir(), 'bog-net-' ) ) )
		const browser = new $bog_probe_browser( bin, profile, flags )
		await browser.open()
		await browser.viewport( width, height )
		return { browser, profile }
	}

	export async function $bog_gamengine_spike_net_probe_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_spike_net_probe_flags,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const bin = $bog_probe_chrome_bin()
		if( !bin ) return say( $bog_probe_skip )

		if( !await $bog_gamengine_spike_net_probe_master_alive() ) return say( $bog_gamengine_spike_net_probe_no_master )

		const started = Date.now()
		const site = await new $bog_probe_static( String( $node.path.resolve( root ) ) ).open()
		const windows = [] as { browser: $bog_probe_browser, profile: string }[]

		try {

			for( let i = 0; i < 2; ++ i ) windows.push( await $bog_gamengine_spike_net_probe_window( bin, flags, 800, 600 ) )
			const [ first, second ] = windows.map( window => window.browser )

			const page = site.uri( $bog_gamengine_spike_net_probe_page )
			await first.open_page( page, $bog_gamengine_spike_net_probe_ready, 60000 )
			await second.open_page( page, $bog_gamengine_spike_net_probe_ready, 60000 )

			const id = String( await first.evaluate( $bog_gamengine_spike_net_probe_id_script, 15000 ) )
			if( !id ) return $mol_fail( new Error( 'первое окно не показало свой id' ) )

			const seen_first = await second.until( `document.body.innerText.includes( ${ JSON.stringify( id ) } )`, 30000 )
			if( seen_first < 0 ) return $mol_fail( new Error( `второе окно не увидело героя первого за 30 с` ) )
			say( `оба окна открыты за ${ Date.now() - started } мс, второе увидело первого через ${ seen_first } мс после открытия` )

			await $bog_probe_pause( 1000 )

			const delays = [] as number[]

			for( let round = 0; round < $bog_gamengine_spike_net_probe_rounds; ++ round ) {

				const watching = second.evaluate( $bog_gamengine_spike_net_probe_watch_script( id ), 15000 )
				await $bog_probe_pause( 100 )

				const moved = await first.evaluate( $bog_gamengine_spike_net_probe_move_script, 15000 ) as $bog_gamengine_spike_net_probe_move
				const seen = await watching as $bog_gamengine_spike_net_probe_seen

				const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify({ moved, seen }) }` ) )
				if( !moved.start || !moved.moved || !( moved.moved[ 0 ] > moved.start[ 0 ] ) ) return fail( 'герой первого окна не сдвинулся вправо' )
				if( seen.t1 < 0 ) return fail( 'второе окно не увидело сдвига за 5 с' )

				delays.push( seen.t1 - moved.t0 )
				say( `раунд ${ round + 1 }: ${ seen.t1 - moved.t0 } мс, ${ JSON.stringify({ moved, seen }) }` )

				await $bog_probe_pause( 1500 )
			}

			say( `задержка: ${ delays.join( ', ' ) } мс, порог ${ $bog_gamengine_spike_net_probe_limit } мс` )

			const slow = delays.filter( delay => delay >= $bog_gamengine_spike_net_probe_limit )
			if( slow.length ) return $mol_fail( new Error( `задержка выше порога: ${ delays.join( ', ' ) } мс` ) )

			return say( $bog_gamengine_spike_net_probe_ok )

		} finally {
			for( const { browser, profile } of windows ) {
				browser.close()
				try { $node.fs.rmSync( profile, { recursive: true, force: true } ) } catch( error ) {}
			}
			site.close()
		}

	}

}
