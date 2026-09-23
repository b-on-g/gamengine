namespace $ {

	export function $bog_gamengine_net_lerp(
		out: Float32Array,
		a: ArrayLike< number >,
		ta: number,
		b: ArrayLike< number >,
		tb: number,
		now: number,
		delay: number,
		ahead = 0.2,
	) {
		const span = tb - ta
		let t = span > 0 ? ( now - delay - ta ) / span : 1
		const max = span > 0 ? 1 + ahead / span : 1
		if( t < 0 ) t = 0
		if( t > max ) t = max
		for( let i = 0; i < out.length; ++ i ) out[ i ] = a[ i ] + ( b[ i ] - a[ i ] ) * t
		return out
	}

}
