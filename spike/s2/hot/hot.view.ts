namespace $.$$ {

	export class $bog_gamengine_spike_s2_hot extends $.$bog_gamengine_spike_s2_hot {

		fill() {
			const t = this.$.$mol_state_time.now( 0 ) / 1000
			const trans = this.trans()
			const base = this.base()
			const count = this.count()
			for( let i = 0; i < count; ++ i ) {
				const a = t + i * 0.1
				const c = Math.cos( a ) * 0.35
				const s = Math.sin( a ) * 0.35
				const m = i * 16
				trans[ m ] = c
				trans[ m + 1 ] = s
				trans[ m + 4 ] = - s
				trans[ m + 5 ] = c
				trans[ m + 12 ] = base[ 2 * i ] + Math.sin( t + i ) * 0.2
				trans[ m + 13 ] = base[ 2 * i + 1 ] + Math.cos( t * 1.3 + i ) * 0.2
			}
			return trans
		}

	}

}
