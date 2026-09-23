namespace $ {

	function walker_test_key( ... held: string[] ) {
		const key = new $bog_gamengine_key
		key.bind({
			forward: [ 'W' ],
			back: [ 'S' ],
			left: [ 'A' ],
			right: [ 'D' ],
			turn_left: [ 'Q' ],
			turn_right: [ 'E' ],
		})
		for( const name of held ) key.pressed( name, true )
		return key
	}

	function walker_test_walker( key: $bog_gamengine_key, tile: $bog_gamengine_phys_tile | null = null ) {
		const input = new $bog_gamengine_input
		input.key( key )
		const walker = new $bog_gamengine_demo_room_walker
		walker.input( input )
		walker.tile( tile )
		return walker
	}

	function walker_test_tile() {
		const tile = new $bog_gamengine_phys_tile
		tile.map( [
			'#####',
			'#...#',
			'#...#',
			'#####',
		].join( '\n' ) )
		return tile
	}

	$mol_test({

		'forward for a second walks speed units along minus z'() {
			const walker = walker_test_walker( walker_test_key( 'W' ) )
			walker.step( 1 )
			$mol_assert_equal( [ ... walker.pos() ], [ 0, 0, - walker.speed() ] )
		},

		'right strafes along plus x'() {
			const walker = walker_test_walker( walker_test_key( 'D' ) )
			walker.step( 1 )
			$mol_assert_equal( [ ... walker.pos() ], [ walker.speed(), 0, 0 ] )
		},

		'turn left grows yaw and forward follows it'() {
			const walker = walker_test_walker( walker_test_key( 'Q', 'W' ) )
			walker.turn( Math.PI / 2 )
			walker.step( 1 )
			const pos = walker.pos()
			$mol_assert_ok( Math.abs( walker.rot()[ 1 ] - Math.PI / 2 ) < 1e-6 )
			$mol_assert_ok( Math.abs( pos[ 0 ] + walker.speed() ) < 1e-6 )
			$mol_assert_ok( Math.abs( pos[ 2 ] ) < 1e-6 )
		},

		'no keys held keeps pos reference'() {
			const walker = walker_test_walker( walker_test_key() )
			const pos = walker.pos()
			walker.step( 1 )
			$mol_assert_equal( walker.pos(), pos )
		},

		'wall ahead stops at its face with radius'() {
			const walker = walker_test_walker( walker_test_key( 'W' ), walker_test_tile() )
			walker.radius( 0.25 )
			walker.speed( 2 )
			walker.pos( new Float32Array([ 2.5, 0.5, 2.75 ]) )
			for( let i = 0; i < 8; ++ i ) walker.step( 0.125 )
			$mol_assert_equal( [ ... walker.pos() ], [ 2.5, 0.5, 1.25 ] )
		},

		'wall aside slides along it'() {
			const walker = walker_test_walker( walker_test_key( 'W', 'A' ), walker_test_tile() )
			walker.radius( 0.25 )
			walker.speed( 2 )
			walker.pos( new Float32Array([ 1.25, 0.5, 2.75 ]) )
			walker.step( 0.125 )
			$mol_assert_equal( [ ... walker.pos() ], [ 1.25, 0.5, 2.5 ] )
		},

	})

}
