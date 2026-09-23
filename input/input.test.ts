namespace $ {

	class $bog_gamengine_input_pad_mock extends $bog_gamengine_pad {

		state = null as $bog_gamengine_pad_state | null

		pads() {
			return [ this.state ]
		}

	}

	function input_move() {
		const key = new $bog_gamengine_key
		key.bind({ left: [ 'A' ], right: [ 'D' ] })
		const pad = new $bog_gamengine_input_pad_mock
		pad.bind({ left: [ 'lx-' ], right: [ 'lx+' ] })
		const input = new $bog_gamengine_input
		input.key( key )
		input.pad( pad )
		return { input, key, pad }
	}

	$mol_test({

		'key held gives action while pad is silent'() {
			const { input, key } = input_move()
			key.keys().D( true )
			input.poll()
			$mol_assert_equal( input.action( 'right' ), true )
		},

		'key held gives full axis while pad is silent'() {
			const { input, key } = input_move()
			key.keys().D( true )
			input.poll()
			$mol_assert_equal( input.axis( 'left', 'right' ), 1 )
		},

		'pad stick gives its axis while keys are silent'() {
			const { input, pad } = input_move()
			pad.state = { buttons: [], axes: [ 0.5, 0, 0, 0 ] }
			input.poll()
			$mol_assert_ok( Math.abs( input.axis( 'left', 'right' ) - 0.5 ) < 1e-6 )
		},

		'key overrides pad stick'() {
			const { input, key, pad } = input_move()
			key.keys().A( true )
			pad.state = { buttons: [], axes: [ 0.5, 0, 0, 0 ] }
			input.poll()
			$mol_assert_equal( input.axis( 'left', 'right' ), -1 )
		},

		'both silent give zero axis'() {
			const { input } = input_move()
			input.poll()
			$mol_assert_equal( input.axis( 'left', 'right' ), 0 )
		},

		'both silent give false action'() {
			const { input } = input_move()
			input.poll()
			$mol_assert_equal( input.action( 'right' ), false )
		},

	})

}
