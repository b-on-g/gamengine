namespace $ {

	class $bog_gamengine_sound_mute extends $bog_gamengine_sound {

		override sample( name: string ) {
			super.sample( name )
			return $mol_audio_sample.make({ start: ()=> {} })
		}

		override Room() {
			return $mol_audio_room.make({ output: ()=> null! })
		}

	}

	function sound() {
		const sound = new $bog_gamengine_sound_mute
		sound.uris({ coin: 'bog/gamengine/demo/sound/coin.wav' })
		return sound
	}

	$mol_test({

		'play known sample without AudioContext does not throw'() {
			sound().play( 'coin' )
		},

		'play unknown sample throws with its name'() {
			$mol_assert_fail( ()=> sound().play( 'nope' ), 'Sound has no sample nope, known: coin' )
		},

	})

}
