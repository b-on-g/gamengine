namespace $ {

	$mol_test({

		'stick at seven tenths of radius gives seven tenths axis'() {
			const screen = new $bog_gamengine_input_screen
			screen.move( 0.7 * screen.radius(), 0 )
			$mol_assert_ok( Math.abs( screen.axis( 'left', 'right' ) - 0.7 ) < 1e-6 )
		},

		'stick pulled up gives positive vertical axis'() {
			const screen = new $bog_gamengine_input_screen
			screen.move( 0, - 0.5 * screen.radius() )
			$mol_assert_ok( Math.abs( screen.axis( 'down', 'up' ) - 0.5 ) < 1e-6 )
		},

		'stick inside dead zone gives zero axis'() {
			const screen = new $bog_gamengine_input_screen
			screen.move( 0.1 * screen.radius(), 0 )
			$mol_assert_equal( screen.axis( 'left', 'right' ), 0 )
		},

		'stick beyond radius is clamped to one'() {
			const screen = new $bog_gamengine_input_screen
			screen.move( 3 * screen.radius(), 0 )
			$mol_assert_ok( Math.abs( screen.axis( 'left', 'right' ) - 1 ) < 1e-6 )
		},

		'stick returned to center gives zero axis'() {
			const screen = new $bog_gamengine_input_screen
			screen.move( screen.radius(), 0 )
			screen.move( 0, 0 )
			$mol_assert_equal( screen.axis( 'left', 'right' ), 0 )
		},

		'pressed button holds action'() {
			const screen = new $bog_gamengine_input_screen
			screen.press( 'jump' )
			$mol_assert_equal( screen.action( 'jump' ), true )
		},

		'released button drops action'() {
			const screen = new $bog_gamengine_input_screen
			screen.press( 'jump' )
			screen.release( 'jump' )
			$mol_assert_equal( screen.action( 'jump' ), false )
		},

		'hidden screen has no widgets'() {
			const screen = new $bog_gamengine_input_screen
			$mol_assert_equal( screen.sub().length, 0 )
		},

		'shown screen has stick and buttons'() {
			const screen = new $bog_gamengine_input_screen
			screen.shown( true )
			$mol_assert_equal( screen.sub().length, 2 )
		},

	})

}
