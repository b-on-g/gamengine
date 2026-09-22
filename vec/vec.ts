namespace $ {

	export function $bog_gamengine_vec_add( out: Float32Array, a: Float32Array, b: Float32Array ) {
		for( let i = 0; i < a.length; ++i ) out[ i ] = a[ i ] + b[ i ]
		return out
	}

	export function $bog_gamengine_vec_sub( out: Float32Array, a: Float32Array, b: Float32Array ) {
		for( let i = 0; i < a.length; ++i ) out[ i ] = a[ i ] - b[ i ]
		return out
	}

	export function $bog_gamengine_vec_scale( out: Float32Array, a: Float32Array, k: number ) {
		for( let i = 0; i < a.length; ++i ) out[ i ] = a[ i ] * k
		return out
	}

	export function $bog_gamengine_vec_len( a: Float32Array ) {
		let sum = 0
		for( let i = 0; i < a.length; ++i ) sum += a[ i ] * a[ i ]
		return Math.sqrt( sum )
	}

	export function $bog_gamengine_vec_norm( out: Float32Array, a: Float32Array ) {
		const len = $bog_gamengine_vec_len( a )
		const k = len === 0 ? 0 : 1 / len
		for( let i = 0; i < a.length; ++i ) out[ i ] = a[ i ] * k
		return out
	}

	export function $bog_gamengine_vec_dot( a: Float32Array, b: Float32Array ) {
		let sum = 0
		for( let i = 0; i < a.length; ++i ) sum += a[ i ] * b[ i ]
		return sum
	}

	export function $bog_gamengine_vec_cross( out: Float32Array, a: Float32Array, b: Float32Array ) {
		const ax = a[ 0 ], ay = a[ 1 ], az = a[ 2 ]
		const bx = b[ 0 ], by = b[ 1 ], bz = b[ 2 ]
		out[ 0 ] = ay * bz - az * by
		out[ 1 ] = az * bx - ax * bz
		out[ 2 ] = ax * by - ay * bx
		return out
	}

	export function $bog_gamengine_vec_lerp( out: Float32Array, a: Float32Array, b: Float32Array, t: number ) {
		for( let i = 0; i < a.length; ++i ) out[ i ] = a[ i ] + ( b[ i ] - a[ i ] ) * t
		return out
	}

}
