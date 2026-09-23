namespace $ {

	/** App tree: `plugins / <= Control mol_keyboard_state key <= key_map`, where `key_map()` in app ts returns `this.Key().keys()` */
	export class $bog_gamengine_key extends $mol_object2 {

		@ $mol_mem
		bind( next: Record< string, readonly string[] > = {} ) {
			return next
		}

		states = new Map< string, boolean >()

		pressed( name: string, next?: boolean ) {
			if( next !== undefined ) this.states.set( name, next )
			return this.states.get( name ) ?? false
		}

		action( name: string ) {
			const keys = this.bind()[ name ]
			if( !keys ) return false
			for( let i = 0; i < keys.length; ++ i ) if( this.pressed( keys[ i ] ) ) return true
			return false
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
