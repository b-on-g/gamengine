namespace $ {

	export class $bog_gamengine_sound extends $mol_object2 {

		@ $mol_mem
		uris( next: Record< string, string > = {} ) {
			return next
		}

		@ $mol_mem
		Room() {
			return this.$.$mol_audio_room.make({ input: ()=> this.samples() })
		}

		@ $mol_mem
		samples() {
			return Object.keys( this.uris() ).map( name => this.sample( name ) )
		}

		@ $mol_mem_key
		sample( name: string ) {
			const uri = this.uris()[ name ]
			if( !uri ) $mol_fail( new Error( `Sound has no sample ${ name }, known: ${ Object.keys( this.uris() ).join( ', ' ) }` ) )
			return this.$.$mol_audio_sample.make({ buffer: ()=> this.$.$mol_fetch.buffer( uri ) })
		}

		play( name: string ) {
			const sample = this.sample( name )
			new this.$.$mol_after_tick( ()=> $mol_wire_async( this ).start( sample ) )
		}

		start( sample: $mol_audio_sample ) {
			try {
				sample.start()
				this.Room().output()
			} catch( error ) {
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				$mol_fail_log( error )
			}
		}

	}

}
