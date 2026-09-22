namespace $ {

	export class $bog_gamengine_spike_s2_cold_quad extends $mol_object2 {

		constructor(
			readonly id: number,
			readonly home_x: number,
			readonly home_y: number,
		) {
			super()
		}

		@ $mol_mem
		pos( next?: Float32Array ) {
			return next ?? Float32Array.of( this.home_x, this.home_y )
		}

		@ $mol_mem
		angle( next?: number ) {
			return next ?? 0
		}

		step( t: number ) {
			const i = this.id
			this.pos( Float32Array.of(
				this.home_x + Math.sin( t + i ) * 0.2,
				this.home_y + Math.cos( t * 1.3 + i ) * 0.2,
			) )
			this.angle( t + i * 0.1 )
		}

	}

}
