namespace $ {

	export function $bog_gamengine_spike_rapier_world_euler(
		x: number, y: number, z: number, w: number,
		out: Float32Array,
	) {
		const r00 = 1 - 2 * ( y * y + z * z )
		const r10 = 2 * ( x * y + z * w )
		const r20 = 2 * ( x * z - y * w )
		const r21 = 2 * ( y * z + x * w )
		const r22 = 1 - 2 * ( x * x + y * y )
		const r01 = 2 * ( x * y - z * w )
		const r11 = 1 - 2 * ( x * x + z * z )
		if( r20 <= -0.999999 || r20 >= 0.999999 ) {
			out[ 0 ] = Math.atan2( - r01, r11 )
			out[ 1 ] = r20 < 0 ? Math.PI / 2 : - Math.PI / 2
			out[ 2 ] = 0
			return out
		}
		out[ 0 ] = Math.atan2( r21, r22 )
		out[ 1 ] = Math.asin( - r20 )
		out[ 2 ] = Math.atan2( r10, r00 )
		return out
	}

	const stat_window = 30

	export class $bog_gamengine_spike_rapier_world extends $bog_gamengine_node {

		@ $mol_mem
		boxes( next?: readonly $bog_gamengine_mesh[] ) {
			return next ?? []
		}

		@ $mol_mem
		starts( next?: readonly Float32Array[] ) {
			return next ?? []
		}

		@ $mol_mem
		floor_size( next?: Float32Array ) {
			return next ?? new Float32Array([ 40, 1, 40 ])
		}

		@ $mol_mem
		timestep( next = 1 / 60 ) {
			return next
		}

		@ $mol_mem
		rapier() {
			const api = $bog_gamengine_spike_rapier_core()
			$mol_wire_sync( api ).init()
			return api
		}

		@ $mol_mem
		sim() {
			const api = this.rapier()
			const sim = new api.World({ x: 0, y: -9.81, z: 0 })
			sim.timestep = this.timestep()
			const floor = this.floor_size()
			sim.createCollider(
				api.ColliderDesc.cuboid( floor[ 0 ] / 2, 0.5, floor[ 2 ] / 2 ).setTranslation( 0, -0.5, 0 )
			)
			return sim
		}

		@ $mol_mem
		bodies() {
			const api = this.rapier()
			const sim = this.sim()
			const starts = this.starts()
			const bodies = [] as $bog_gamengine_spike_rapier_core_body[]
			for( let i = 0; i < starts.length; ++ i ) {
				const pos = starts[ i ]
				const body = sim.createRigidBody(
					api.RigidBodyDesc.dynamic().setTranslation( pos[ 0 ], pos[ 1 ], pos[ 2 ] )
				)
				sim.createCollider( api.ColliderDesc.cuboid( 0.5, 0.5, 0.5 ), body )
				bodies.push( body )
			}
			this.lows = new Float32Array( starts.length )
			for( let i = 0; i < starts.length; ++ i ) this.lows[ i ] = starts[ i ][ 1 ]
			return bodies as readonly $bog_gamengine_spike_rapier_core_body[]
		}

		lows = new Float32Array( 0 )
		rest = 0
		steps = 0
		awake = 0
		low = 0
		step_at = 0
		samples = 0
		step_times = new Float32Array( stat_window )
		copy_times = new Float32Array( stat_window )
		frame_times = new Float32Array( stat_window )

		step( dt: number ) {
			const sim = this.sim()
			const bodies = this.bodies()
			const boxes = this.boxes()
			const timestep = this.timestep()
			const now = performance.now()
			const i = this.samples % stat_window
			this.frame_times[ i ] = this.step_at ? now - this.step_at : 0
			this.step_at = now
			this.rest += dt
			if( this.rest > timestep * 3 ) this.rest = timestep * 3
			let steps = 0
			const step_from = performance.now()
			while( this.rest >= timestep ) {
				sim.step()
				this.rest -= timestep
				++ steps
			}
			this.step_times[ i ] = steps ? ( performance.now() - step_from ) / steps : 0
			this.steps += steps
			const copy_from = performance.now()
			let awake = 0
			let low = Infinity
			for( let b = 0; b < bodies.length; ++ b ) {
				const body = bodies[ b ]
				if( body.isSleeping() ) {
					if( this.lows[ b ] < low ) low = this.lows[ b ]
					continue
				}
				++ awake
				const t = body.translation()
				const r = body.rotation()
				const pos = new Float32Array( 3 )
				pos[ 0 ] = t.x
				pos[ 1 ] = t.y
				pos[ 2 ] = t.z
				boxes[ b ].pos( pos )
				boxes[ b ].rot( $bog_gamengine_spike_rapier_world_euler( r.x, r.y, r.z, r.w, new Float32Array( 3 ) ) )
				this.lows[ b ] = t.y
				if( t.y < low ) low = t.y
			}
			this.copy_times[ i ] = performance.now() - copy_from
			this.awake = awake
			this.low = bodies.length ? low : 0
			++ this.samples
		}

		mean( times: Float32Array ) {
			const size = Math.min( this.samples, stat_window )
			let sum = 0
			for( let i = 0; i < size; ++ i ) sum += times[ i ]
			return sum / ( size || 1 )
		}

		stat() {
			return `bodies ${ this.bodies().length } | awake ${ this.awake } | low ${ this.low.toFixed( 2 ) }`
				+ ` | step ${ this.mean( this.step_times ).toFixed( 2 ) } ms`
				+ ` | copy ${ this.mean( this.copy_times ).toFixed( 2 ) } ms`
				+ ` | frame ${ this.mean( this.frame_times ).toFixed( 1 ) } ms`
		}

	}

}
