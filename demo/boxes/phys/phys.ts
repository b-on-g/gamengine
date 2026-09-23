namespace $ {

	const stat_window = 30

	export class $bog_gamengine_demo_boxes_phys extends $bog_gamengine_phys3 {

		times = new Float32Array( stat_window )
		samples = 0

		step( dt: number ) {
			const start = performance.now()
			super.step( dt )
			this.times[ this.samples % stat_window ] = performance.now() - start
			++ this.samples
		}

		step_ms() {
			const size = Math.min( this.samples, stat_window )
			let sum = 0
			for( let i = 0; i < size; ++ i ) sum += this.times[ i ]
			return size ? sum / size : 0
		}

		low() {
			let low = Infinity
			const pos = this.pos, inv_mass = this.inv_mass
			for( let i = 0; i < this.count; ++ i ) {
				if( !( inv_mass[ i ] > 0 ) ) continue
				if( pos[ i * 3 + 1 ] < low ) low = pos[ i * 3 + 1 ]
			}
			return low
		}

	}

}
