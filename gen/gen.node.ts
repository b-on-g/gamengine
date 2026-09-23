namespace $ {

	export const $bog_shooter_gen_size = 256

	export const $bog_shooter_gen_rate = 44100

	const crc_table = new Uint32Array( 256 )
	for( let n = 0; n < 256; ++ n ) {
		let c = n
		for( let k = 0; k < 8; ++ k ) c = c & 1 ? 0xEDB88320 ^ ( c >>> 1 ) : c >>> 1
		crc_table[ n ] = c >>> 0
	}

	export function $bog_shooter_gen_crc( data: Uint8Array ) {
		let crc = 0xFFFFFFFF
		for( let i = 0; i < data.length; ++ i ) crc = crc_table[ ( crc ^ data[ i ] ) & 0xFF ] ^ ( crc >>> 8 )
		return ( crc ^ 0xFFFFFFFF ) >>> 0
	}

	export function $bog_shooter_gen_chunk( type: string, body: Uint8Array ) {
		const out = new Uint8Array( 12 + body.length )
		const view = new DataView( out.buffer )
		view.setUint32( 0, body.length )
		for( let i = 0; i < 4; ++ i ) out[ 4 + i ] = type.charCodeAt( i )
		out.set( body, 8 )
		view.setUint32( 8 + body.length, $bog_shooter_gen_crc( out.subarray( 4, 8 + body.length ) ) )
		return out
	}

	export function $bog_shooter_gen_png( size: number, rgba: Uint8Array ) {
		const raw = new Uint8Array( size * ( size * 4 + 1 ) )
		for( let y = 0; y < size; ++ y ) raw.set( rgba.subarray( y * size * 4, ( y + 1 ) * size * 4 ), y * ( size * 4 + 1 ) + 1 )
		const head = new Uint8Array( 13 )
		const view = new DataView( head.buffer )
		view.setUint32( 0, size )
		view.setUint32( 4, size )
		head[ 8 ] = 8
		head[ 9 ] = 6
		const deflated = new Uint8Array( $node.zlib.deflateSync( raw ) )
		const sign = new Uint8Array([ 137, 80, 78, 71, 13, 10, 26, 10 ])
		const chunks = [ sign, $bog_shooter_gen_chunk( 'IHDR', head ), $bog_shooter_gen_chunk( 'IDAT', deflated ), $bog_shooter_gen_chunk( 'IEND', new Uint8Array( 0 ) ) ]
		let len = 0
		for( const chunk of chunks ) len += chunk.length
		const out = new Uint8Array( len )
		let at = 0
		for( const chunk of chunks ) {
			out.set( chunk, at )
			at += chunk.length
		}
		return out
	}

	export function $bog_shooter_gen_hash( x: number, y: number ) {
		let h = ( x * 374761393 + y * 668265263 ) | 0
		h = Math.imul( h ^ ( h >>> 13 ), 1274126177 )
		return ( ( h ^ ( h >>> 16 ) ) >>> 0 ) / 4294967296
	}

	export function $bog_shooter_gen_image( size: number, pixel: ( x: number, y: number )=> readonly [ number, number, number ] ) {
		const rgba = new Uint8Array( size * size * 4 )
		for( let y = 0; y < size; ++ y ) {
			for( let x = 0; x < size; ++ x ) {
				const [ r, g, b ] = pixel( x, y )
				const at = ( y * size + x ) * 4
				rgba[ at ] = r
				rgba[ at + 1 ] = g
				rgba[ at + 2 ] = b
				rgba[ at + 3 ] = 255
			}
		}
		return $bog_shooter_gen_png( size, rgba )
	}

	export function $bog_shooter_gen_image_rgba( size: number, pixel: ( x: number, y: number )=> readonly [ number, number, number, number ] ) {
		const rgba = new Uint8Array( size * size * 4 )
		for( let y = 0; y < size; ++ y ) {
			for( let x = 0; x < size; ++ x ) {
				const [ r, g, b, a ] = pixel( x, y )
				const at = ( y * size + x ) * 4
				rgba[ at ] = r
				rgba[ at + 1 ] = g
				rgba[ at + 2 ] = b
				rgba[ at + 3 ] = a
			}
		}
		return $bog_shooter_gen_png( size, rgba )
	}

	export function $bog_shooter_gen_spark( size: number ) {
		const c = ( size - 1 ) / 2
		return $bog_shooter_gen_image_rgba( size, ( x, y )=> {
			const d = Math.hypot( x - c, y - c ) / c
			const k = Math.max( 0, 1 - d )
			const glow = k * k
			return [ 255, 180 + 60 * glow, 90 * glow, Math.round( 255 * glow ) ]
		} )
	}

	export function $bog_shooter_gen_wall( size: number ) {
		const brick_w = size / 4, brick_h = size / 8, gap = 3
		return $bog_shooter_gen_image( size, ( x, y )=> {
			const row = Math.floor( y / brick_h )
			const shift = row % 2 ? brick_w / 2 : 0
			const bx = ( x + shift ) % brick_w
			const by = y % brick_h
			if( bx < gap || by < gap ) return [ 70, 60, 55 ]
			const col = Math.floor( ( x + shift ) / brick_w )
			const noise = $bog_shooter_gen_hash( col, row ) * 40 + $bog_shooter_gen_hash( x, y ) * 20
			return [ 150 + noise, 70 + noise / 2, 50 + noise / 3 ]
		} )
	}

	export function $bog_shooter_gen_floor( size: number ) {
		const tile = size / 4
		return $bog_shooter_gen_image( size, ( x, y )=> {
			const tx = Math.floor( x / tile ), ty = Math.floor( y / tile )
			const edge = x % tile < 2 || y % tile < 2
			const base = ( tx + ty ) % 2 ? 95 : 115
			const noise = $bog_shooter_gen_hash( x, y ) * 18
			const v = edge ? 60 : base + noise
			return [ v, v, v + 8 ]
		} )
	}

	export function $bog_shooter_gen_target( size: number ) {
		const c = size / 2
		return $bog_shooter_gen_image( size, ( x, y )=> {
			const d = Math.hypot( x - c, y - c ) / c
			if( d > 0.95 ) return [ 40, 40, 40 ]
			const ring = Math.floor( d * 5 )
			return ring % 2 ? [ 240, 240, 230 ] : [ 220, 40, 40 ]
		} )
	}

	export function $bog_shooter_gen_wav( rate: number, samples: Float32Array ) {
		const out = new Uint8Array( 44 + samples.length * 2 )
		const view = new DataView( out.buffer )
		const text = ( at: number, str: string )=> { for( let i = 0; i < str.length; ++ i ) out[ at + i ] = str.charCodeAt( i ) }
		text( 0, 'RIFF' )
		view.setUint32( 4, 36 + samples.length * 2, true )
		text( 8, 'WAVE' )
		text( 12, 'fmt ' )
		view.setUint32( 16, 16, true )
		view.setUint16( 20, 1, true )
		view.setUint16( 22, 1, true )
		view.setUint32( 24, rate, true )
		view.setUint32( 28, rate * 2, true )
		view.setUint16( 32, 2, true )
		view.setUint16( 34, 16, true )
		text( 36, 'data' )
		view.setUint32( 40, samples.length * 2, true )
		for( let i = 0; i < samples.length; ++ i ) {
			const v = Math.max( -1, Math.min( 1, samples[ i ] ) )
			view.setInt16( 44 + i * 2, v * 32767, true )
		}
		return out
	}

	export function $bog_shooter_gen_shot( rate: number ) {
		const len = Math.floor( rate * 0.2 )
		const samples = new Float32Array( len )
		let seed = 7
		for( let i = 0; i < len; ++ i ) {
			seed = ( seed * 1103515245 + 12345 ) & 0x7fffffff
			const noise = seed / 0x7fffffff * 2 - 1
			const t = i / rate
			const env = Math.exp( - t * 30 )
			const thump = Math.sin( 2 * Math.PI * 90 * t ) * Math.exp( - t * 20 )
			samples[ i ] = ( noise * 0.6 + thump * 0.8 ) * env
		}
		return $bog_shooter_gen_wav( rate, samples )
	}

	export function $bog_shooter_gen_hit( rate: number ) {
		const len = Math.floor( rate * 0.12 )
		const samples = new Float32Array( len )
		for( let i = 0; i < len; ++ i ) {
			const t = i / rate
			const freq = 1200 - t * 6000
			samples[ i ] = Math.sin( 2 * Math.PI * freq * t ) * Math.exp( - t * 40 ) * 0.7
		}
		return $bog_shooter_gen_wav( rate, samples )
	}

	export function $bog_shooter_gen_run( root = $node.process.cwd() ) {
		const size = $bog_shooter_gen_size
		const rate = $bog_shooter_gen_rate
		const files = {
			'bog/shooter/app/atlas/wall.png': $bog_shooter_gen_wall( size ),
			'bog/shooter/app/atlas/floor.png': $bog_shooter_gen_floor( size ),
			'bog/shooter/app/atlas/target.png': $bog_shooter_gen_target( size ),
			'bog/shooter/app/atlas/spark.png': $bog_shooter_gen_spark( size ),
			'bog/shooter/app/sound/shot.wav': $bog_shooter_gen_shot( rate ),
			'bog/shooter/app/sound/hit.wav': $bog_shooter_gen_hit( rate ),
		}
		for( const [ path, data ] of Object.entries( files ) ) {
			$node.fs.writeFileSync( $node.path.join( root, path ), data )
		}
		return Object.keys( files )
	}

}
