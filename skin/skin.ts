namespace $ {

	export const $bog_gamengine_skin_max = 64

	export const $bog_gamengine_skin_empty = new Float32Array( 0 )

	export function $bog_gamengine_skin_mat_trs( out: Float32Array, at: number, trs: Float32Array, from: number ) {
		const x = trs[ from + 3 ]
		const y = trs[ from + 4 ]
		const z = trs[ from + 5 ]
		const w = trs[ from + 6 ]
		const sx = trs[ from + 7 ]
		const sy = trs[ from + 8 ]
		const sz = trs[ from + 9 ]
		const xx = x * x
		const yy = y * y
		const zz = z * z
		const xy = x * y
		const xz = x * z
		const yz = y * z
		const wx = w * x
		const wy = w * y
		const wz = w * z
		out[ at ] = ( 1 - 2 * ( yy + zz ) ) * sx
		out[ at + 1 ] = 2 * ( xy + wz ) * sx
		out[ at + 2 ] = 2 * ( xz - wy ) * sx
		out[ at + 3 ] = 0
		out[ at + 4 ] = 2 * ( xy - wz ) * sy
		out[ at + 5 ] = ( 1 - 2 * ( xx + zz ) ) * sy
		out[ at + 6 ] = 2 * ( yz + wx ) * sy
		out[ at + 7 ] = 0
		out[ at + 8 ] = 2 * ( xz + wy ) * sz
		out[ at + 9 ] = 2 * ( yz - wx ) * sz
		out[ at + 10 ] = ( 1 - 2 * ( xx + yy ) ) * sz
		out[ at + 11 ] = 0
		out[ at + 12 ] = trs[ from ]
		out[ at + 13 ] = trs[ from + 1 ]
		out[ at + 14 ] = trs[ from + 2 ]
		out[ at + 15 ] = 1
		return out
	}

	export function $bog_gamengine_skin_mat_mul(
		out: Float32Array, at: number,
		left: Float32Array, left_at: number,
		right: Float32Array, right_at: number,
	) {
		for( let col = 0; col < 4; ++ col ) {
			const b0 = right[ right_at + col * 4 ]
			const b1 = right[ right_at + col * 4 + 1 ]
			const b2 = right[ right_at + col * 4 + 2 ]
			const b3 = right[ right_at + col * 4 + 3 ]
			for( let row = 0; row < 4; ++ row ) {
				out[ at + col * 4 + row ] =
					left[ left_at + row ] * b0
					+ left[ left_at + 4 + row ] * b1
					+ left[ left_at + 8 + row ] * b2
					+ left[ left_at + 12 + row ] * b3
			}
		}
		return out
	}

	export function $bog_gamengine_skin_quat_mix(
		out: Float32Array, at: number,
		left: Float32Array, left_at: number,
		right: Float32Array, right_at: number,
		weight: number,
	) {
		const ax = left[ left_at ]
		const ay = left[ left_at + 1 ]
		const az = left[ left_at + 2 ]
		const aw = left[ left_at + 3 ]
		let bx = right[ right_at ]
		let by = right[ right_at + 1 ]
		let bz = right[ right_at + 2 ]
		let bw = right[ right_at + 3 ]
		let dot = ax * bx + ay * by + az * bz + aw * bw
		if( dot < 0 ) {
			dot = - dot
			bx = - bx
			by = - by
			bz = - bz
			bw = - bw
		}
		let ka = 1 - weight
		let kb = weight
		if( dot < 0.9995 ) {
			const angle = Math.acos( dot > 1 ? 1 : dot )
			const sin = Math.sin( angle )
			ka = Math.sin( ka * angle ) / sin
			kb = Math.sin( kb * angle ) / sin
		}
		const x = ax * ka + bx * kb
		const y = ay * ka + by * kb
		const z = az * ka + bz * kb
		const w = aw * ka + bw * kb
		const len = Math.sqrt( x * x + y * y + z * z + w * w ) || 1
		out[ at ] = x / len
		out[ at + 1 ] = y / len
		out[ at + 2 ] = z / len
		out[ at + 3 ] = w / len
		return out
	}

	export function $bog_gamengine_skin_sample( channel: $bog_gamengine_shape_gltf_channel, time: number, out: Float32Array, at: number ) {
		const times = channel.times
		const values = channel.values
		const size = times.length
		if( !size ) return out
		const shift = channel.path === 'translation' ? 0 : channel.path === 'rotation' ? 3 : 7
		const dim = channel.path === 'rotation' ? 4 : 3
		let from = 0
		while( from < size - 1 && times[ from + 1 ] <= time ) ++ from
		const to = from + 1 < size ? from + 1 : from
		const span = times[ to ] - times[ from ]
		let part = span > 0 ? ( time - times[ from ] ) / span : 0
		if( part < 0 ) part = 0
		if( part > 1 ) part = 1
		if( channel.step ) part = 0
		if( dim === 4 ) {
			$bog_gamengine_skin_quat_mix( out, at + shift, values, from * 4, values, to * 4, part )
		} else {
			for( let k = 0; k < 3; ++ k ) {
				out[ at + shift + k ] = values[ from * 3 + k ] * ( 1 - part ) + values[ to * 3 + k ] * part
			}
		}
		return out
	}

	export function $bog_gamengine_skin_bones( batch: { nodes(): readonly unknown[] } ) {
		const nodes = batch.nodes()
		if( nodes.length !== 1 ) return null
		const node = nodes[ 0 ] as { skin?(): $bog_gamengine_skin | null }
		const skin = typeof node.skin === 'function' ? node.skin() : null
		return skin ? skin.pose() : null
	}

	export function $bog_gamengine_skin_shape_joints( shape: unknown ) {
		const probe = shape as { joints?(): Float32Array }
		return typeof probe.joints === 'function' ? probe.joints() : $bog_gamengine_skin_empty
	}

	export function $bog_gamengine_skin_shape_weights( shape: unknown ) {
		const probe = shape as { weights?(): Float32Array }
		return typeof probe.weights === 'function' ? probe.weights() : $bog_gamengine_skin_empty
	}

	export class $bog_gamengine_skin extends $mol_object2 {

		@ $mol_mem
		shape( next?: $bog_gamengine_shape_gltf | null ) {
			return next ?? null
		}

		@ $mol_mem
		clip( next?: string ) {
			return next ?? ''
		}

		@ $mol_mem
		mix( next?: string ) {
			return next ?? ''
		}

		@ $mol_mem
		weight( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		time( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		loop( next?: boolean ) {
			return next ?? true
		}

		@ $mol_mem
		speed( next?: number ) {
			return next ?? 1
		}

		blend( clip: string, weight: number ) {
			this.mix( clip )
			this.weight( weight )
			return weight
		}

		@ $mol_mem
		duration() {
			return this.shape()?.clips().get( this.clip() )?.duration ?? 0
		}

		version = 0
		bones = $bog_gamengine_skin_empty
		locals = $bog_gamengine_skin_empty
		worlds = $bog_gamengine_skin_empty
		trs_main = $bog_gamengine_skin_empty
		trs_mix = $bog_gamengine_skin_empty
		done_skeleton = null as $bog_gamengine_shape_gltf_skeleton | null
		done_time = NaN
		done_clip = ''
		done_mix = ''
		done_weight = NaN

		prepare() {
			if( this.bones.length ) return this.bones
			const max = $bog_gamengine_skin_max
			this.bones = new Float32Array( max * 16 )
			for( let i = 0; i < max; ++ i ) for( let k = 0; k < 4; ++ k ) this.bones[ i * 16 + k * 5 ] = 1
			this.locals = new Float32Array( max * 16 )
			this.worlds = new Float32Array( max * 16 )
			this.trs_main = new Float32Array( max * 10 )
			this.trs_mix = new Float32Array( max * 10 )
			return this.bones
		}

		apply( clip: $bog_gamengine_shape_gltf_clip | undefined, time: number, trs: Float32Array, count: number, base: Float32Array ) {
			for( let k = 0; k < count * 10; ++ k ) trs[ k ] = base[ k ]
			if( !clip ) return trs
			const channels = clip.channels
			for( let c = 0; c < channels.length; ++ c ) {
				const channel = channels[ c ]
				if( channel.joint >= count ) continue
				$bog_gamengine_skin_sample( channel, time, trs, channel.joint * 10 )
			}
			return trs
		}

		pose() {

			const shape = this.shape()
			const skeleton = shape?.skeleton() ?? null
			this.prepare()
			if( !skeleton ) return this.bones
			if( skeleton.count > $bog_gamengine_skin_max ) {
				return $mol_fail( new Error( `Skeleton has more than ${ $bog_gamengine_skin_max } joints` ) )
			}

			const time = this.time()
			const clip = this.clip()
			const mix = this.mix()
			const weight = this.weight()
			if(
				this.done_skeleton === skeleton
				&& this.done_time === time
				&& this.done_clip === clip
				&& this.done_mix === mix
				&& this.done_weight === weight
			) return this.bones

			const clips = shape!.clips()
			const count = skeleton.count
			const trs = this.trs_main
			this.apply( clips.get( clip ), time, trs, count, skeleton.base )
			if( mix && weight > 0 ) {
				const other = this.trs_mix
				this.apply( clips.get( mix ), time, other, count, skeleton.base )
				for( let i = 0; i < count; ++ i ) {
					const at = i * 10
					for( let k = 0; k < 3; ++ k ) {
						trs[ at + k ] = trs[ at + k ] * ( 1 - weight ) + other[ at + k ] * weight
						trs[ at + 7 + k ] = trs[ at + 7 + k ] * ( 1 - weight ) + other[ at + 7 + k ] * weight
					}
					$bog_gamengine_skin_quat_mix( trs, at + 3, trs, at + 3, other, at + 3, weight )
				}
			}

			for( let o = 0; o < count; ++ o ) {
				const i = skeleton.order[ o ]
				$bog_gamengine_skin_mat_trs( this.locals, i * 16, trs, i * 10 )
				const parent = skeleton.parents[ i ]
				if( parent < 0 ) {
					for( let k = 0; k < 16; ++ k ) this.worlds[ i * 16 + k ] = this.locals[ i * 16 + k ]
				} else {
					$bog_gamengine_skin_mat_mul( this.worlds, i * 16, this.worlds, parent * 16, this.locals, i * 16 )
				}
				$bog_gamengine_skin_mat_mul( this.bones, i * 16, this.worlds, i * 16, skeleton.binds, i * 16 )
			}

			this.done_skeleton = skeleton
			this.done_time = time
			this.done_clip = clip
			this.done_mix = mix
			this.done_weight = weight
			++ this.version
			return this.bones
		}

		step( dt: number ) {
			const speed = this.speed()
			const duration = this.duration()
			if( !speed || !duration ) return
			let time = this.time() + dt * speed
			if( this.loop() ) {
				time = time % duration
				if( time < 0 ) time += duration
			} else {
				if( time > duration ) time = duration
				if( time < 0 ) time = 0
			}
			this.time( time )
		}

	}

}
