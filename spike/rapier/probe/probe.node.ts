namespace $ {

	export const $bog_gamengine_spike_rapier_probe_page = 'bog/gamengine/demo/-/index.html#!demo=rapier'

	export const $bog_gamengine_spike_rapier_probe_ready = `typeof $ !== 'undefined' && ( document.querySelector( 'canvas' )?.width ?? 0 ) > 0`

	export const $bog_gamengine_spike_rapier_probe_ok = 'ящики лежат на полу, шаг Rapier в бюджете'

	export const $bog_gamengine_spike_rapier_probe_flags = [ '--ignore-gpu-blocklist' ] as const

	export const $bog_gamengine_spike_rapier_probe_step_limit = 8

	export const $bog_gamengine_spike_rapier_probe_low_limit = 0.4

	export const $bog_gamengine_spike_rapier_probe_script = `
		const frame = ()=> new Promise( done => requestAnimationFrame( ()=> done() ) )
		const canvas = document.querySelector( 'canvas' )
		const gl = canvas && canvas.getContext( 'webgl2' )
		if( !gl ) return { webgl: false, loaded: false }
		const dbg = gl.getExtension( 'WEBGL_debug_renderer_info' )
		const renderer = dbg ? gl.getParameter( dbg.UNMASKED_RENDERER_WEBGL ) : ''
		const read = ()=> {
			const text = document.body.innerText
			const found = text.match( /bodies (\\d+) \\| awake (\\d+) \\| low (-?[\\d.]+) \\| step ([\\d.]+) ms \\| copy ([\\d.]+) ms \\| frame ([\\d.]+) ms/ )
			const draw = text.match( /frame (\\d+) \\| ([\\d.]+) ms \\| tick ([\\d.]+) ms/ )
			if( !found ) return null
			return {
				bodies: Number( found[ 1 ] ), awake: Number( found[ 2 ] ), low: Number( found[ 3 ] ),
				step: Number( found[ 4 ] ), copy: Number( found[ 5 ] ), frame: Number( found[ 6 ] ),
				tick: draw ? Number( draw[ 3 ] ) : 0,
			}
		}
		let start = null
		for( let i = 0; i < 1200 && !( start && start.awake > 0 ); ++ i ) { await frame(); start = read() }
		if( !start ) return { webgl: true, loaded: false, renderer }
		const samples = []
		for( let i = 0; i < 6; ++ i ) {
			await new Promise( done => setTimeout( done, 500 ) )
			samples.push( read() )
		}
		return { webgl: true, loaded: true, renderer, start, samples, settled: samples[ samples.length - 1 ], size: [ canvas.width, canvas.height ] }
	`

	export type $bog_gamengine_spike_rapier_probe_stat = {
		readonly bodies: number
		readonly awake: number
		readonly low: number
		readonly step: number
		readonly copy: number
		readonly frame: number
		readonly tick: number
	}

	export type $bog_gamengine_spike_rapier_probe_result = {
		readonly webgl: boolean
		readonly loaded: boolean
		readonly renderer?: string
		readonly start?: $bog_gamengine_spike_rapier_probe_stat | null
		readonly samples?: readonly ( $bog_gamengine_spike_rapier_probe_stat | null )[]
		readonly settled?: $bog_gamengine_spike_rapier_probe_stat | null
		readonly size?: readonly [ number, number ]
	}

	export function $bog_gamengine_spike_rapier_probe_peak( got: $bog_gamengine_spike_rapier_probe_result ) {
		let peak = got.start?.step ?? 0
		for( const sample of got.samples ?? [] ) if( sample && sample.step > peak ) peak = sample.step
		return peak
	}

	export async function $bog_gamengine_spike_rapier_probe_run( page: string, root: string ) {
		const child = $node[ 'child_process' ]
		const spawn = child.spawn
		child.spawn = ( ( bin: string, args: readonly string[], opts: unknown )=> spawn.call(
			child, bin, args.filter( arg => arg !== '--disable-gpu' ), opts,
		) ) as typeof spawn
		try {
			return await $bog_probe_run({
				root,
				flags: $bog_gamengine_spike_rapier_probe_flags,
				page,
				ready: $bog_gamengine_spike_rapier_probe_ready,
				script: $bog_gamengine_spike_rapier_probe_script,
				width: 1024,
				height: 768,
				limit: 60000,
			}) as $bog_gamengine_spike_rapier_probe_result | typeof $bog_probe_skip
		} finally {
			child.spawn = spawn
		}
	}

	export async function $bog_gamengine_spike_rapier_probe_check(
		root = $node.process.cwd(),
		count = 1000,
	) {

		const say = ( line: string )=> { $node.fs.writeSync( 1, 'проба: ' + line + '\n' ); return line }

		const started = Date.now()

		const got = await $bog_gamengine_spike_rapier_probe_run( `${ $bog_gamengine_spike_rapier_probe_page }/count=${ count }`, root )

		if( got === $bog_probe_skip ) return say( $bog_probe_skip )

		say( `count ${ count }: ${ Date.now() - started } мс, ${ JSON.stringify( got ) }` )

		const fail = ( reason: string )=> $mol_fail( new Error( `${ reason }: ${ JSON.stringify( got ) }` ) )

		if( !got.webgl ) return fail( 'нет webgl2' )
		if( !got.loaded || !got.start ) return fail( 'подвал не показал тела' )
		if( !got.settled ) return fail( 'подвал пропал после падения' )
		if( got.settled.bodies !== count ) return fail( `тел не ${ count }` )
		if( !( got.settled.low > $bog_gamengine_spike_rapier_probe_low_limit ) ) return fail( 'ящики провалились сквозь пол' )
		if( !( $bog_gamengine_spike_rapier_probe_peak( got ) < $bog_gamengine_spike_rapier_probe_step_limit ) ) return fail( 'шаг Rapier дольше бюджета' )

		return say( $bog_gamengine_spike_rapier_probe_ok )
	}

}
