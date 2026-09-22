namespace $ {

	export class $bog_gamengine_clock extends $mol_object2 {

		frames = 0
		now_last = NaN
		dt_raw = 0
		time_total = 0
		time_frame = 0
		tick_at = 0

		@ $mol_mem
		frame() {
			this.tick_at = performance.now()
			const now = this.$.$mol_state_time.now( 0 )
			this.dt_raw = isNaN( this.now_last ) ? 0 : Math.min( ( now - this.now_last ) / 1000, 0.1 )
			this.now_last = now
			return ++ this.frames
		}

		@ $mol_mem
		dt() {
			this.frame()
			if( this.paused() ) return 0
			return this.dt_raw * this.speed()
		}

		@ $mol_mem
		time() {
			const frame = this.frame()
			const dt = this.dt()
			if( frame !== this.time_frame ) {
				this.time_frame = frame
				this.time_total += dt
			}
			return this.time_total
		}

		@ $mol_mem
		paused( next = false ) {
			return next
		}

		@ $mol_mem
		speed( next = 1 ) {
			return next
		}

	}

}
