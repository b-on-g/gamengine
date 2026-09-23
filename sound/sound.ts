namespace $ {

	export type $bog_gamengine_sound_voice = {
		sample: $mol_audio_sample
		panner: StereoPannerNode
		gain: GainNode
		pos: ArrayLike< number >
	}

	export class $bog_gamengine_sound extends $mol_object2 {

		voices = [] as $bog_gamengine_sound_voice[]
		music_voice = null as null | { sample: $mol_audio_sample, gain: GainNode }
		timer = null as null | $mol_after_timeout
		effects_node = null as null | GainNode
		music_node = null as null | GainNode

		@ $mol_mem
		uris( next: Record< string, string > = {} ) {
			return next
		}

		@ $mol_mem
		listener( next: { world(): Float32Array } | null = null ) {
			return next
		}

		@ $mol_mem
		range( next = 10 ) {
			return next
		}

		@ $mol_mem
		fade( next = 1 ) {
			return next
		}

		@ $mol_mem
		Room() {
			return this.$.$mol_audio_room.make({})
		}

		native() {
			return this.Room().context().native()
		}

		time() {
			return this.Room().context().time()
		}

		panner() {
			return this.native().createStereoPanner()
		}

		gain() {
			return this.native().createGain()
		}

		gain_to_room() {
			const gain = this.gain()
			gain.connect( this.Room().node() )
			return gain
		}

		effects_gain() {
			return this.effects_node ??= this.gain_to_room()
		}

		@ $mol_mem
		effects( next = 1 ) {
			this.effects_gain().gain.value = next
			return next
		}

		music_gain() {
			return this.music_node ??= this.gain_to_room()
		}

		@ $mol_mem
		volume( next = 1 ) {
			this.music_gain().gain.value = next
			return next
		}

		uri( name: string ) {
			const uri = this.uris()[ name ]
			if( !uri ) $mol_fail( new Error( `Sound has no sample ${ name }, known: ${ Object.keys( this.uris() ).join( ', ' ) }` ) )
			return uri
		}

		@ $mol_mem_key
		sample( name: string ) {
			const uri = this.uri( name )
			return this.$.$mol_audio_sample.make({ buffer: ()=> this.$.$mol_fetch.buffer( uri ) })
		}

		@ $mol_mem_key
		music_sample( name: string ) {
			const uri = this.uri( name )
			return this.$.$mol_audio_sample.make({
				buffer: ()=> this.$.$mol_fetch.buffer( uri ),
				loop_default: ()=> true,
			})
		}

		play( name: string, pos?: ArrayLike< number > ) {
			const sample = this.sample( name )
			new this.$.$mol_after_tick( ()=> $mol_wire_async( this ).start( sample, pos ) )
		}

		start( sample: $mol_audio_sample, pos?: ArrayLike< number > ) {
			try {
				sample.start()
				const source = sample.output()
				this.effects()
				if( pos ) this.voice_add( sample, source, pos )
				else source.connect( this.effects_gain() )
			} catch( error ) {
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				$mol_fail_log( error )
			}
		}

		voice_add( sample: $mol_audio_sample, source: AudioNode, pos: ArrayLike< number > ) {
			const panner = this.panner()
			const gain = this.gain()
			source.connect( panner )
			panner.connect( gain )
			gain.connect( this.effects_gain() )
			const voice = { sample, panner, gain, pos }
			this.voices.push( voice )
			source.addEventListener( 'ended', ()=> this.voice_drop( voice ) )
			this.voice_update( voice, this.listener_world() )
			if( !this.timer ) this.follow()
		}

		voice_drop( voice: $bog_gamengine_sound_voice ) {
			const voices = this.voices
			const index = voices.indexOf( voice )
			if( index < 0 ) return
			voices[ index ] = voices[ voices.length - 1 ]
			voices.pop()
			voice.gain.disconnect()
		}

		listener_world() {
			return this.listener()?.world() ?? $mol_3d_mat4.identity()
		}

		update() {
			const world = this.listener_world()
			const voices = this.voices
			for( let i = 0; i < voices.length; ++ i ) this.voice_update( voices[ i ], world )
		}

		voice_update( voice: $bog_gamengine_sound_voice, world: Float32Array ) {
			const pos = voice.pos
			const dx = pos[ 0 ] - world[ 12 ]
			const dy = pos[ 1 ] - world[ 13 ]
			const dz = ( pos.length > 2 ? pos[ 2 ] : 0 ) - world[ 14 ]
			const dist = Math.hypot( dx, dy, dz )
			const right = Math.hypot( world[ 0 ], world[ 1 ], world[ 2 ] )
			const side = dx * world[ 0 ] + dy * world[ 1 ] + dz * world[ 2 ]
			const ratio = dist / this.range()
			voice.panner.pan.value = dist && right ? side / ( dist * right ) : 0
			voice.gain.gain.value = 1 / ( 1 + ratio * ratio )
		}

		follow() {
			this.timer = null
			$mol_wire_async( this ).update()
			if( this.voices.length ) this.timer = new this.$.$mol_after_timeout( 100, ()=> this.follow() )
		}

		@ $mol_mem
		music( next?: string | null ): string | null {
			if( next === undefined ) return null
			if( next === ( $mol_wire_probe( ()=> this.music() ) ?? null ) ) return next
			const sample = next === null ? null : this.music_sample( next )
			new this.$.$mol_after_tick( ()=> $mol_wire_async( this ).music_start( sample ) )
			return next
		}

		music_start( sample: $mol_audio_sample | null ) {
			try {
				const prev = this.music_voice
				if( prev ) {
					this.ramp( prev.gain, 0 )
					prev.sample.stop_at( this.fade() )
				}
				this.music_voice = sample && this.music_voice_add( sample )
			} catch( error ) {
				if( $mol_promise_like( error ) ) $mol_fail_hidden( error )
				$mol_fail_log( error )
			}
		}

		music_voice_add( sample: $mol_audio_sample ) {
			const gain = this.gain()
			gain.gain.value = 0
			this.volume()
			sample.start()
			sample.output().connect( gain )
			gain.connect( this.music_gain() )
			this.ramp( gain, 1 )
			return { sample, gain }
		}

		ramp( gain: GainNode, value: number ) {
			const now = this.time()
			gain.gain.setValueAtTime( gain.gain.value, now )
			gain.gain.linearRampToValueAtTime( value, now + this.fade() )
		}

	}

}
