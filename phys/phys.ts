namespace $ {

	const stat_window = 30

	export class $bog_shooter_phys extends $bog_gamengine_phys3 {

		layer = new Float32Array( 0 )

		times = new Float32Array( stat_window )
		samples = 0

		grow( need: number ) {
			super.grow( need )
			if( this.layer.length >= this.cap ) return
			const layer = new Float32Array( this.cap )
			layer.set( this.layer )
			this.layer = layer
		}

		place( shape: number, size: Float32Array, mass: number, pos: Float32Array, layer: number ) {
			const i = this.add( shape, size, mass, pos )
			this.layer[ i ] = layer
			return i
		}

		remove( index: number ) {
			const last = super.remove( index )
			if( index !== last ) this.layer[ index ] = this.layer[ last ]
			return last
		}

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

	}

}
