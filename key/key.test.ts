namespace $ {

	function key_jump() {
		const key = new $bog_gamengine_key
		key.bind({ jump: [ 'space', 'W' ] })
		return key
	}

	function key_axis() {
		const key = new $bog_gamengine_key
		key.bind({ left: [ 'A' ], right: [ 'D' ] })
		return key
	}

	$mol_test({

		'action is false before any key'() {
			const key = key_jump()
			$mol_assert_equal( key.action( 'jump' ), false )
		},

		'pressed key turns action on'() {
			const key = key_jump()
			key.keys().space( true )
			$mol_assert_equal( key.action( 'jump' ), true )
		},

		'second key keeps action while first released'() {
			const key = key_jump()
			key.keys().space( true )
			key.keys().W( true )
			key.keys().space( false )
			$mol_assert_equal( key.action( 'jump' ), true )
		},

		'both keys released turn action off'() {
			const key = key_jump()
			key.keys().space( true )
			key.keys().W( true )
			key.keys().space( false )
			key.keys().W( false )
			$mol_assert_equal( key.action( 'jump' ), false )
		},

		'axis is zero without keys'() {
			const key = key_axis()
			$mol_assert_equal( key.axis( 'left', 'right' ), 0 )
		},

		'axis is minus one on left'() {
			const key = key_axis()
			key.keys().A( true )
			$mol_assert_equal( key.axis( 'left', 'right' ), -1 )
		},

		'axis is one on right'() {
			const key = key_axis()
			key.keys().D( true )
			$mol_assert_equal( key.axis( 'left', 'right' ), 1 )
		},

		'unknown action is false'() {
			const key = key_jump()
			$mol_assert_equal( key.action( 'fly' ), false )
		},

	})

}
