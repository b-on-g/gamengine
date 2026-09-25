namespace $.$$ {

	export class $bog_gamengine_demo extends $.$bog_gamengine_demo {

		@ $mol_mem
		key_map() {
			const maps = [
				this.Flat().Key().keys(),
				this.Room().Key().keys(),
				this.Boxes().Key().keys(),
				this.Jumper().Key().keys(),
				this.Shooter().Key().keys(),
				this.Legion().key_map(),
				this.Studio().Key().keys(),
			]
			const keys: Record< string, ( state?: boolean )=> boolean > = {}
			for( const map of maps ) {
				for( const name of Object.keys( map ) ) {
					const prev = keys[ name ]
					const own = map[ name ]
					keys[ name ] = prev ? ( state?: boolean )=> { prev( state ); return own( state ) } : own
				}
			}
			return keys
		}

		@ $mol_mem
		cam() {
			return this.cam_kind() === 'deep' ? this.Cam_deep() : this.Cam_flat()
		}

		@ $mol_mem
		cam_deep_pos() {
			return new Float32Array([ 0, 0, 3 ])
		}

	}

}
