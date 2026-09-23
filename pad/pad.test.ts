namespace $ {

	class $bog_gamengine_pad_mock extends $bog_gamengine_pad {

		state = null as $bog_gamengine_pad_state | null

		pads() {
			return [ this.state ]
		}

	}

	function pad_state( pressed: number[], axes: number[] ) {
		const buttons = [] as { pressed: boolean }[]
		for( let i = 0; i < 16; ++ i ) buttons.push({ pressed: pressed.includes( i ) })
		return { buttons, axes }
	}

	function pad_move() {
		const pad = new $bog_gamengine_pad_mock
		pad.bind({ jump: [ 'a' ], left: [ 'lx-' ], right: [ 'right', 'lx+' ] })
		return pad
	}

	$mol_test({

		'action is false without gamepad'() {
			const pad = pad_move()
			pad.poll()
			$mol_assert_equal( pad.action( 'jump' ), false )
		},

		'pressed button turns action on'() {
			const pad = pad_move()
			pad.state = pad_state( [ 0 ], [ 0, 0, 0, 0 ] )
			pad.poll()
			$mol_assert_equal( pad.action( 'jump' ), true )
		},

		'released button turns action off'() {
			const pad = pad_move()
			pad.state = pad_state( [ 0 ], [ 0, 0, 0, 0 ] )
			pad.poll()
			pad.state = pad_state( [], [ 0, 0, 0, 0 ] )
			pad.poll()
			$mol_assert_equal( pad.action( 'jump' ), false )
		},

		'stick inside dead zone gives zero axis'() {
			const pad = pad_move()
			pad.state = pad_state( [], [ 0.1, 0, 0, 0 ] )
			pad.poll()
			$mol_assert_equal( pad.axis( 'left', 'right' ), 0 )
		},

		'stick right gives positive axis'() {
			const pad = pad_move()
			pad.state = pad_state( [], [ 0.6, 0, 0, 0 ] )
			pad.poll()
			$mol_assert_ok( Math.abs( pad.axis( 'left', 'right' ) - 0.6 ) < 1e-6 )
		},

		'stick left gives negative axis'() {
			const pad = pad_move()
			pad.state = pad_state( [], [ -0.6, 0, 0, 0 ] )
			pad.poll()
			$mol_assert_ok( Math.abs( pad.axis( 'left', 'right' ) + 0.6 ) < 1e-6 )
		},

		'dpad button bound with stick turns action on'() {
			const pad = pad_move()
			pad.state = pad_state( [ 15 ], [ 0, 0, 0, 0 ] )
			pad.poll()
			$mol_assert_equal( pad.action( 'right' ), true )
		},

		'stick bound with dpad button turns action on'() {
			const pad = pad_move()
			pad.state = pad_state( [], [ 0.5, 0, 0, 0 ] )
			pad.poll()
			$mol_assert_equal( pad.action( 'right' ), true )
		},

		'unknown action is false'() {
			const pad = pad_move()
			pad.state = pad_state( [ 0 ], [ 0, 0, 0, 0 ] )
			pad.poll()
			$mol_assert_equal( pad.action( 'fly' ), false )
		},

	})

}
