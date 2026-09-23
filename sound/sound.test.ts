namespace $ {

	type $bog_gamengine_sound_gain_stub = GainNode & { ramps: number[] }

	type $bog_gamengine_sound_node_stub = AudioBufferSourceNode & { targets: AudioNode[] }

	function node_stub() {
		const targets = [] as AudioNode[]
		return {
			targets,
			connect: ( target: AudioNode )=> { targets.push( target ) },
			disconnect: ()=> {},
			addEventListener: ()=> {},
		} as unknown as $bog_gamengine_sound_node_stub
	}

	function gain_stub() {
		const ramps = [] as number[]
		return {
			ramps,
			gain: {
				value: 1,
				setValueAtTime: ()=> {},
				linearRampToValueAtTime: ( value: number )=> { ramps.push( value ) },
			},
			connect: ()=> {},
			disconnect: ()=> {},
		} as unknown as $bog_gamengine_sound_gain_stub
	}

	function panner_stub() {
		return {
			pan: { value: 0 },
			connect: ()=> {},
			disconnect: ()=> {},
		} as unknown as StereoPannerNode
	}

	function sample_stub() {
		const source = node_stub()
		return $mol_audio_sample.make({
			start: ()=> {},
			output: ()=> source,
			stop_at: ( next?: number )=> next ?? -1,
		})
	}

	class $bog_gamengine_sound_mute extends $bog_gamengine_sound {

		override uris() {
			return {
				coin: 'bog/gamengine/demo/sound/coin.wav',
				a: 'bog/gamengine/demo/sound/a.wav',
				b: 'bog/gamengine/demo/sound/b.wav',
			}
		}

		sample_last = null as null | $mol_audio_sample

		override sample( name: string ) {
			super.sample( name )
			return this.sample_last = sample_stub()
		}

		override music_sample( name: string ) {
			super.music_sample( name )
			return sample_stub()
		}

		override Room() {
			return $mol_audio_room.make({ node: ()=> node_stub() as unknown as AudioDestinationNode })
		}

		override time() {
			return 0
		}

		override panner() {
			return panner_stub()
		}

		override gain() {
			return gain_stub()
		}

	}

	function sound() {
		return new $bog_gamengine_sound_mute
	}

	function settle() {
		return new Promise( done => setTimeout( done ) )
	}

	function ramps( gain: GainNode ) {
		return ( gain as $bog_gamengine_sound_gain_stub ).ramps
	}

	$mol_test({

		'play known sample without AudioContext does not throw'() {
			sound().play( 'coin' )
		},

		'play unknown sample throws with its name'() {
			$mol_assert_fail( ()=> sound().play( 'nope' ), 'Sound has no sample nope, known: coin, a, b' )
		},

		async 'sample to the right of listener pans right'() {
			const snd = sound()
			snd.play( 'coin', [ 1, 0, 0 ] )
			await settle()
			$mol_assert_ok( snd.voices[ 0 ].panner.pan.value > 0 )
		},

		async 'sample to the left of listener pans left'() {
			const snd = sound()
			snd.play( 'coin', [ -1, 0, 0 ] )
			await settle()
			$mol_assert_ok( snd.voices[ 0 ].panner.pan.value < 0 )
		},

		async 'sample in front of listener stays centered'() {
			const snd = sound()
			snd.play( 'coin', [ 0, 0, -5 ] )
			await settle()
			$mol_assert_equal( snd.voices[ 0 ].panner.pan.value, 0 )
		},

		async 'sample twice as far fades by distance'() {
			const snd = sound()
			snd.play( 'coin', [ 5, 0, 0 ] )
			snd.play( 'coin', [ 10, 0, 0 ] )
			await settle()
			$mol_assert_equal( snd.voices[ 0 ].gain.gain.value, 0.8 )
			$mol_assert_equal( snd.voices[ 1 ].gain.gain.value, 0.5 )
		},

		async 'listener turned around flips the pan'() {
			const snd = sound()
			snd.play( 'coin', [ 1, 0, 0 ] )
			await settle()
			snd.listener({ world: ()=> $mol_3d_mat4.rotation( [ 0, 0, 1 ], Math.PI ) })
			snd.update()
			$mol_assert_ok( snd.voices[ 0 ].panner.pan.value < 0 )
		},

		async 'music switch fades old track out and new one in'() {
			const snd = sound()
			snd.music( 'a' )
			await settle()
			const old = snd.music_voice!
			snd.music( 'b' )
			await settle()
			$mol_assert_equal( ramps( old.gain ), [ 1, 0 ] )
			$mol_assert_equal( ramps( snd.music_voice!.gain ), [ 1 ] )
		},

		async 'music null fades track out'() {
			const snd = sound()
			snd.music( 'a' )
			await settle()
			const old = snd.music_voice!
			snd.music( null )
			await settle()
			$mol_assert_equal( ramps( old.gain ), [ 1, 0 ] )
			$mol_assert_equal( snd.music_voice, null )
		},

		'volume scales music before the room'() {
			const snd = sound()
			snd.volume( 0.5 )
			$mol_assert_equal( snd.music_gain().gain.value, 0.5 )
		},

		'effects scales samples before the room'() {
			const snd = sound()
			snd.effects( 0.5 )
			$mol_assert_equal( snd.effects_gain().gain.value, 0.5 )
		},

		async 'sample without position goes through effects gain'() {
			const snd = sound()
			snd.play( 'coin' )
			await settle()
			const source = snd.sample_last!.output() as $bog_gamengine_sound_node_stub
			$mol_assert_equal( source.targets, [ snd.effects_gain() ] )
		},

	})

}
