namespace $.$$ {

	export class $bog_gamengine_spike_s2_cold extends $.$bog_gamengine_spike_s2_cold {

		@ $mol_mem_key
		quad( id: number ) {
			const base = this.base()
			return new $bog_gamengine_spike_s2_cold_quad( id, base[ 2 * id ], base[ 2 * id + 1 ] )
		}

		@ $mol_mem
		quads() {
			const count = this.count()
			const quads = new Array< $bog_gamengine_spike_s2_cold_quad >( count )
			for( let i = 0; i < count; ++ i ) quads[ i ] = this.quad( i )
			return quads
		}

		@ $mol_mem
		step() {
			const t = this.$.$mol_state_time.now( 0 ) / 1000
			const quads = this.quads()
			for( let i = 0; i < quads.length; ++ i ) quads[ i ].step( t )
			return t
		}

		@ $mol_mem
		matrices() {
			const trans = this.trans()
			const quads = this.quads()
			for( let i = 0; i < quads.length; ++ i ) {
				const pos = quads[ i ].pos()
				const a = quads[ i ].angle()
				const c = Math.cos( a ) * 0.35
				const s = Math.sin( a ) * 0.35
				const m = i * 16
				trans[ m ] = c
				trans[ m + 1 ] = s
				trans[ m + 4 ] = - s
				trans[ m + 5 ] = c
				trans[ m + 12 ] = pos[ 0 ]
				trans[ m + 13 ] = pos[ 1 ]
			}
			return trans
		}

		fill() {
			this.step()
			return this.matrices()
		}

	}

}
