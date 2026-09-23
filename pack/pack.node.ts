namespace $ {

	export const $bog_gamengine_pack_exts = [ '.png', '.jpg', '.jpeg' ] as const

	export const $bog_gamengine_pack_ready = `document.readyState === 'complete'`

	export const $bog_gamengine_pack_square_ok = 'квадрат 32×32 из героя'

	export const $bog_gamengine_pack_atlas_ok = 'два квадрата, мета и список слоёв'

	export type $bog_gamengine_pack_result = {
		readonly names: readonly string[]
		readonly files: readonly string[]
	}

	export function $bog_gamengine_pack_say( line: string ) {
		$node.fs.writeSync( 1, 'упаковка: ' + line + '\n' )
		return line
	}

	export function $bog_gamengine_pack_scan( dir: string ) {
		const found = $node.fs.readdirSync( dir, { recursive: true, encoding: 'utf8' } ) as string[]
		return found
			.map( rel => String( rel ).replace( /\\/g, '/' ) )
			.filter( rel => ( $bog_gamengine_pack_exts as readonly string[] ).includes( String( $node.path.extname( rel ) ).toLowerCase() ) )
			.sort()
			.map( rel => String( $node.path.join( dir, rel ) ) )
	}

	export function $bog_gamengine_pack_names( dir: string, files: readonly string[] ) {
		const names = [] as string[]
		const seen = new Map< string, string >()
		for( const file of files ) {
			const name = String( $node.path.relative( dir, file ) ).replace( /\.[^.]*$/, '' ).replace( /[\\/]/g, '_' )
			const known = seen.get( name )
			if( known ) $mol_fail( new Error( `Layer name ${ name } is used twice: ${ known } and ${ file }` ) )
			seen.set( name, file )
			names.push( name )
		}
		return names
	}

	export function $bog_gamengine_pack_script( uris: readonly string[], size: number ) {
		return `
			const size = ${ size }
			const out = []
			for( const uri of ${ JSON.stringify( uris ) } ) {
				const img = new Image()
				await new Promise( ( done, fail )=> {
					img.onload = ()=> done()
					img.onerror = ()=> fail( new Error( 'не загрузилась ' + uri ) )
					img.src = uri
				} )
				const canvas = document.createElement( 'canvas' )
				canvas.width = size
				canvas.height = size
				const scale = Math.min( size / img.naturalWidth, size / img.naturalHeight )
				const width = Math.max( 1, Math.round( img.naturalWidth * scale ) )
				const height = Math.max( 1, Math.round( img.naturalHeight * scale ) )
				const ctx = canvas.getContext( '2d' )
				ctx.imageSmoothingQuality = 'high'
				ctx.drawImage( img, Math.floor( ( size - width ) / 2 ), Math.floor( ( size - height ) / 2 ), width, height )
				out.push( canvas.toDataURL( 'image/png' ).split( ',' )[ 1 ] )
			}
			return out
		`
	}

	export async function $bog_gamengine_pack_squares(
		root: string,
		srcs: readonly string[],
		dsts: readonly string[],
		size: number,
	): Promise< readonly string[] | null > {

		if( !srcs.length ) return []

		const base = String( $node.path.resolve( root ) )
		const uris = srcs.map( src => '/' + String( $node.path.relative( base, $node.path.resolve( src ) ) ).replace( /\\/g, '/' ) )

		const got = await $bog_probe_run({
			root: base,
			page: uris[ 0 ]!,
			ready: $bog_gamengine_pack_ready,
			script: $bog_gamengine_pack_script( uris, size ),
			limit: 30000 + 1000 * srcs.length,
		})

		if( got === $bog_probe_skip ) return null

		const pngs = got as readonly string[]
		if( pngs.length !== srcs.length ) return $mol_fail( new Error( `Chrome вернул ${ pngs.length } картинок из ${ srcs.length }` ) )

		for( let i = 0; i < dsts.length; ++ i ) {
			$node.fs.mkdirSync( $node.path.dirname( dsts[ i ] ), { recursive: true } )
			$node.fs.writeFileSync( dsts[ i ], Buffer.from( pngs[ i ]!, 'base64' ) )
		}

		return dsts
	}

	export async function $bog_gamengine_pack_square( src: string, dst: string, size: number ) {
		const made = await $bog_gamengine_pack_squares( String( $node.path.dirname( src ) ), [ src ], [ dst ], size )
		return made ? dst : null
	}

	export async function $bog_gamengine_pack_atlas( dir: string, out_dir: string, size: number ): Promise< $bog_gamengine_pack_result | null > {

		const files = $bog_gamengine_pack_scan( dir )
		const names = $bog_gamengine_pack_names( dir, files )
		const dsts = names.map( name => String( $node.path.join( out_dir, name + '.png' ) ) )

		const made = await $bog_gamengine_pack_squares( dir, files, dsts, size )
		if( !made ) return null

		const cwd = $node.process.cwd()
		const list = String( $node.path.join( out_dir, 'atlas.json' ) )
		const deploy = [ ... dsts, list ].map( file => `deploy \\/${ String( $node.path.relative( cwd, file ) ).replace( /\\/g, '/' ) }` )

		$node.fs.mkdirSync( out_dir, { recursive: true } )
		$node.fs.writeFileSync( String( $node.path.join( out_dir, 'atlas.meta.tree' ) ), deploy.join( '\n' ) + '\n' )
		$node.fs.writeFileSync( list, JSON.stringify( names ) + '\n' )

		return { names, files: dsts }
	}

	export function $bog_gamengine_pack_png_size( file: string ) {
		const head = $node.fs.readFileSync( file )
		if( head.length < 24 || head.toString( 'latin1', 1, 4 ) !== 'PNG' ) return $mol_fail( new Error( `${ file } is not a PNG` ) )
		return [ head.readUInt32BE( 16 ), head.readUInt32BE( 20 ) ] as const
	}

	export async function $bog_gamengine_pack_square_check() {

		const tmp = String( $node.fs.mkdtempSync( $node.path.join( $node.os.tmpdir(), 'bog-pack-' ) ) )

		try {

			const dst = String( $node.path.join( tmp, 'hero.png' ) )
			const made = await $bog_gamengine_pack_square( 'bog/gamengine/demo/atlas/hero.png', dst, 32 )
			if( !made ) return $bog_gamengine_pack_say( $bog_probe_skip )

			const size = $bog_gamengine_pack_png_size( dst )
			if( size[ 0 ] !== 32 || size[ 1 ] !== 32 ) return $mol_fail( new Error( `квадрат вышел ${ size.join( '×' ) }` ) )

			return $bog_gamengine_pack_say( $bog_gamengine_pack_square_ok )

		} finally {
			$node.fs.rmSync( tmp, { recursive: true, force: true } )
		}

	}

	export async function $bog_gamengine_pack_atlas_check() {

		const tmp = String( $node.fs.mkdtempSync( $node.path.join( $node.os.tmpdir(), 'bog-pack-' ) ) )

		try {

			const src = String( $node.path.join( tmp, 'src' ) )
			const out = String( $node.path.join( tmp, 'out' ) )
			const hero = 'bog/gamengine/demo/atlas/hero.png'

			$node.fs.mkdirSync( String( $node.path.join( src, 'far' ) ), { recursive: true } )
			$node.fs.copyFileSync( hero, String( $node.path.join( src, 'big.png' ) ) )

			const small = await $bog_gamengine_pack_square( hero, String( $node.path.join( src, 'far', 'small.png' ) ), 32 )
			if( !small ) return $bog_gamengine_pack_say( $bog_probe_skip )

			const made = await $bog_gamengine_pack_atlas( src, out, 16 )
			if( !made ) return $bog_gamengine_pack_say( $bog_probe_skip )

			const fail = ( line: string )=> $mol_fail( new Error( line + ': ' + JSON.stringify( made ) ) )

			if( made.names.join( ',' ) !== 'big,far_small' ) return fail( 'имена слоёв не те' )

			for( const file of made.files ) {
				const size = $bog_gamengine_pack_png_size( file )
				if( size[ 0 ] !== 16 || size[ 1 ] !== 16 ) return fail( `${ file } вышел ${ size.join( '×' ) }` )
			}

			const meta = String( $node.fs.readFileSync( $node.path.join( out, 'atlas.meta.tree' ), 'utf8' ) )
			const deploys = meta.split( '\n' ).filter( line => line.startsWith( 'deploy \\/' ) )
			if( deploys.filter( line => line.endsWith( '.png' ) ).length !== 2 ) return fail( 'в мете не два deploy картинок: ' + meta )
			if( !deploys.some( line => line.endsWith( '/atlas.json' ) ) ) return fail( 'в мете нет deploy списка: ' + meta )

			const list = JSON.parse( String( $node.fs.readFileSync( $node.path.join( out, 'atlas.json' ), 'utf8' ) ) )
			if( JSON.stringify( list ) !== '["big","far_small"]' ) return fail( 'список слоёв не тот: ' + JSON.stringify( list ) )

			return $bog_gamengine_pack_say( $bog_gamengine_pack_atlas_ok )

		} finally {
			$node.fs.rmSync( tmp, { recursive: true, force: true } )
		}

	}

	export async function $bog_gamengine_pack_main( args: readonly string[] ) {

		const [ dir, out_dir, size ] = args
		if( !dir || !out_dir ) return $mol_fail( new Error( 'node bog/gamengine/pack/-/node.js <dir> <out_dir> [size=256]' ) )

		const made = await $bog_gamengine_pack_atlas( dir, out_dir, Number( size ?? 256 ) )
		if( !made ) return $bog_gamengine_pack_say( $bog_probe_skip )

		return $bog_gamengine_pack_say( `${ made.names.length } слоёв по ${ size ?? 256 } в ${ out_dir }: ${ made.names.join( ', ' ) }` )
	}

	if( /gamengine\/pack\/-\/node\.js$/.test( String( $node.process.argv[ 1 ] ?? '' ) ) ) {
		setTimeout( ()=> $bog_gamengine_pack_main( $node.process.argv.slice( 2 ) ).catch( ( error: unknown )=> {
			$node.fs.writeSync( 2, String( ( error as Error )?.stack ?? error ) + '\n' )
			$node.process.exitCode = 1
		} ) )
	}

}
