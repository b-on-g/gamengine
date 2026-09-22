namespace $ {

	/** App tree: `plugins / <= Control mol_keyboard_state key <= key_map`, where `key_map()` in app ts returns `this.Key().keys()` */
	export class $bog_gamengine_key extends $mol_object2 {

		@ $mol_mem
		bind( next: Record< string, readonly string[] > = {} ) {
			return next
		}

		@ $mol_mem_key
		pressed( name: string, next = false ) {
			return next
		}

		@ $mol_mem_key
		action( name: string ) {
			const keys = this.bind()[ name ] ?? []
			return keys.some( key => this.pressed( key ) )
		}

		axis( neg: string, pos: string ) {
			return ( this.action( pos ) ? 1 : 0 ) - ( this.action( neg ) ? 1 : 0 )
		}

		@ $mol_mem
		keys() {
			const keys: Record< string, ( state?: boolean )=> boolean > = {}
			for( const names of Object.values( this.bind() ) ) {
				for( const name of names ) {
					keys[ name ] = ( state?: boolean )=> this.pressed( name, state )
				}
			}
			return keys
		}

	}

}
