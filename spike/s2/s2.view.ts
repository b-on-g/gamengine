namespace $.$$ {

	export class $bog_gamengine_spike_s2 extends $.$bog_gamengine_spike_s2 {

		pane() {
			return this.mode() === 'cold' ? this.Cold() : this.Hot()
		}

		panes() {
			return [ this.pane() ]
		}

		@ $mol_mem
		stat() {
			this.$.$mol_state_time.now( 0 )
			return this.pane().stat_line()
		}

	}

}
