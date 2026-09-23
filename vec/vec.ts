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

	export function $bog_gamengine_vec_mat4_apply( out: Float32Array, m: Float32List, v: Float32Array ) {
		const x = v[ 0 ], y = v[ 1 ], z = v[ 2 ], w = v[ 3 ]
		out[ 0 ] = m[ 0 ] * x + m[ 4 ] * y + m[ 8 ] * z + m[ 12 ] * w
		out[ 1 ] = m[ 1 ] * x + m[ 5 ] * y + m[ 9 ] * z + m[ 13 ] * w
		out[ 2 ] = m[ 2 ] * x + m[ 6 ] * y + m[ 10 ] * z + m[ 14 ] * w
		out[ 3 ] = m[ 3 ] * x + m[ 7 ] * y + m[ 11 ] * z + m[ 15 ] * w
		return out
	}

	export function $bog_gamengine_vec_quat_identity( out: Float32Array ) {
		out[ 0 ] = 0
		out[ 1 ] = 0
		out[ 2 ] = 0
		out[ 3 ] = 1
		return out
	}

	export function $bog_gamengine_vec_quat_mul( out: Float32Array, a: Float32Array, b: Float32Array ) {
		const ax = a[ 0 ], ay = a[ 1 ], az = a[ 2 ], aw = a[ 3 ]
		const bx = b[ 0 ], by = b[ 1 ], bz = b[ 2 ], bw = b[ 3 ]
		out[ 0 ] = aw * bx + ax * bw + ay * bz - az * by
		out[ 1 ] = aw * by - ax * bz + ay * bw + az * bx
		out[ 2 ] = aw * bz + ax * by - ay * bx + az * bw
		out[ 3 ] = aw * bw - ax * bx - ay * by - az * bz
		return out
	}

	export function $bog_gamengine_vec_quat_from_axis( out: Float32Array, axis: Float32Array, angle: number ) {
		const len = Math.hypot( axis[ 0 ], axis[ 1 ], axis[ 2 ] )
		const k = len === 0 ? 0 : Math.sin( angle / 2 ) / len
		out[ 0 ] = axis[ 0 ] * k
		out[ 1 ] = axis[ 1 ] * k
		out[ 2 ] = axis[ 2 ] * k
		out[ 3 ] = Math.cos( angle / 2 )
		return out
	}

	export function $bog_gamengine_vec_quat_from_euler( out: Float32Array, x: number, y: number, z: number ) {
		const cx = Math.cos( x / 2 ), sx = Math.sin( x / 2 )
		const cy = Math.cos( y / 2 ), sy = Math.sin( y / 2 )
		const cz = Math.cos( z / 2 ), sz = Math.sin( z / 2 )
		out[ 0 ] = sx * cy * cz - cx * sy * sz
		out[ 1 ] = cx * sy * cz + sx * cy * sz
		out[ 2 ] = cx * cy * sz - sx * sy * cz
		out[ 3 ] = cx * cy * cz + sx * sy * sz
		return out
	}

	export function $bog_gamengine_vec_quat_normalize( out: Float32Array, q: Float32Array ) {
		const len = Math.hypot( q[ 0 ], q[ 1 ], q[ 2 ], q[ 3 ] )
		if( len === 0 ) return $bog_gamengine_vec_quat_identity( out )
		const k = 1 / len
		out[ 0 ] = q[ 0 ] * k
		out[ 1 ] = q[ 1 ] * k
		out[ 2 ] = q[ 2 ] * k
		out[ 3 ] = q[ 3 ] * k
		return out
	}

	export function $bog_gamengine_vec_quat_rotate( out: Float32Array, q: Float32Array, v: Float32Array ) {
		const qx = q[ 0 ], qy = q[ 1 ], qz = q[ 2 ], qw = q[ 3 ]
		const vx = v[ 0 ], vy = v[ 1 ], vz = v[ 2 ]
		const tx = 2 * ( qy * vz - qz * vy )
		const ty = 2 * ( qz * vx - qx * vz )
		const tz = 2 * ( qx * vy - qy * vx )
		out[ 0 ] = vx + qw * tx + qy * tz - qz * ty
		out[ 1 ] = vy + qw * ty + qz * tx - qx * tz
		out[ 2 ] = vz + qw * tz + qx * ty - qy * tx
		return out
	}

	export function $bog_gamengine_vec_quat_integrate( out: Float32Array, q: Float32Array, ang: Float32Array, dt: number ) {
		const qx = q[ 0 ], qy = q[ 1 ], qz = q[ 2 ], qw = q[ 3 ]
		const wx = ang[ 0 ] * dt / 2, wy = ang[ 1 ] * dt / 2, wz = ang[ 2 ] * dt / 2
		out[ 0 ] = qx + wx * qw + wy * qz - wz * qy
		out[ 1 ] = qy - wx * qz + wy * qw + wz * qx
		out[ 2 ] = qz + wx * qy - wy * qx + wz * qw
		out[ 3 ] = qw - wx * qx - wy * qy - wz * qz
		return $bog_gamengine_vec_quat_normalize( out, out )
	}

	export function $bog_gamengine_vec_quat_to_mat4( out: Float32Array, q: Float32Array, pos: Float32Array, scale: Float32Array ) {
		const x = q[ 0 ], y = q[ 1 ], z = q[ 2 ], w = q[ 3 ]
		const xx = x * x, yy = y * y, zz = z * z
		const xy = x * y, xz = x * z, yz = y * z
		const wx = w * x, wy = w * y, wz = w * z
		const sx = scale[ 0 ], sy = scale[ 1 ], sz = scale[ 2 ]
		out[ 0 ] = ( 1 - 2 * ( yy + zz ) ) * sx
		out[ 1 ] = 2 * ( xy + wz ) * sx
		out[ 2 ] = 2 * ( xz - wy ) * sx
		out[ 3 ] = 0
		out[ 4 ] = 2 * ( xy - wz ) * sy
		out[ 5 ] = ( 1 - 2 * ( xx + zz ) ) * sy
		out[ 6 ] = 2 * ( yz + wx ) * sy
		out[ 7 ] = 0
		out[ 8 ] = 2 * ( xz + wy ) * sz
		out[ 9 ] = 2 * ( yz - wx ) * sz
		out[ 10 ] = ( 1 - 2 * ( xx + yy ) ) * sz
		out[ 11 ] = 0
		out[ 12 ] = pos[ 0 ]
		out[ 13 ] = pos[ 1 ]
		out[ 14 ] = pos[ 2 ]
		out[ 15 ] = 1
		return out
	}

	export function $bog_gamengine_vec_quat_to_euler( out: Float32Array, q: Float32Array ) {
		const x = q[ 0 ], y = q[ 1 ], z = q[ 2 ], w = q[ 3 ]
		const sy = 2 * ( w * y - x * z )
		out[ 1 ] = sy >= 1 ? Math.PI / 2 : sy <= -1 ? - Math.PI / 2 : Math.asin( sy )
		out[ 0 ] = Math.atan2( 2 * ( w * x + y * z ), 1 - 2 * ( x * x + y * y ) )
		out[ 2 ] = Math.atan2( 2 * ( w * z + x * y ), 1 - 2 * ( y * y + z * z ) )
		return out
	}

}
