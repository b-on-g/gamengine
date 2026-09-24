namespace $ {

	function $bog_gamengine_phys_walker_keys() {
		const key = new $bog_gamengine_key
		key.bind({ left: [ 'A' ], right: [ 'D' ], up: [ 'W' ], down: [ 'S' ] })
		const input = new $bog_gamengine_input
		input.key( key )
		return { key, input }
	}

	class $bog_gamengine_phys_walker_stick extends $bog_gamengine_input {

		lean = 0

		axis( neg: string, pos: string ) {
			return pos === 'right' ? this.lean : 0
		}

	}

	$mol_test({

		'walker without input writes no velocity at all'() {
			const walker = new $bog_gamengine_phys_walker
			const still = walker.vel()
			walker.step( 0.1 )
			$mol_assert_equal( walker.vel(), still )
		},

		'axes turn into velocity by the speed'() {
			const { key, input } = $bog_gamengine_phys_walker_keys()
			const walker = new $bog_gamengine_phys_walker
			walker.input( input )
			walker.speed( 4 )
			key.pressed( 'D', true )
			walker.step( 0.1 )
			$mol_assert_equal( [ ... walker.vel() ], [ 4, 0, 0 ] )
		},

		'diagonal does not go faster than a straight line'() {
			const { key, input } = $bog_gamengine_phys_walker_keys()
			const walker = new $bog_gamengine_phys_walker
			walker.input( input )
			walker.speed( 4 )
			key.pressed( 'D', true )
			key.pressed( 'W', true )
			walker.step( 0.1 )
			const vel = walker.vel()
			$mol_assert_ok( Math.abs( Math.sqrt( vel[ 0 ] * vel[ 0 ] + vel[ 1 ] * vel[ 1 ] ) - 4 ) < 1e-6 )
			$mol_assert_ok( Math.abs( vel[ 0 ] - vel[ 1 ] ) < 1e-6 )
			$mol_assert_ok( vel[ 0 ] > 2.8 && vel[ 0 ] < 2.9 )
		},

		'half pressed stick keeps half of the speed'() {
			const stick = new $bog_gamengine_phys_walker_stick
			const walker = new $bog_gamengine_phys_walker
			walker.input( stick )
			walker.speed( 4 )
			stick.lean = 0.5
			walker.step( 0.1 )
			$mol_assert_equal( [ ... walker.vel() ], [ 2, 0, 0 ] )
			stick.lean = 1
			walker.step( 0.1 )
			$mol_assert_equal( [ ... walker.vel() ], [ 4, 0, 0 ] )
		},

		'released keys stop the walker once and then it keeps silent'() {
			const { key, input } = $bog_gamengine_phys_walker_keys()
			const walker = new $bog_gamengine_phys_walker
			walker.input( input )
			key.pressed( 'D', true )
			walker.step( 0.1 )
			key.pressed( 'D', false )
			walker.step( 0.1 )
			$mol_assert_equal( [ ... walker.vel() ], [ 0, 0, 0 ] )
			const stopped = walker.vel()
			walker.step( 0.1 )
			walker.step( 0.1 )
			$mol_assert_equal( walker.vel(), stopped )
		},

		'same keys on the next frame write nothing'() {
			const { key, input } = $bog_gamengine_phys_walker_keys()
			const walker = new $bog_gamengine_phys_walker
			walker.input( input )
			key.pressed( 'A', true )
			walker.step( 0.1 )
			const going = walker.vel()
			walker.step( 0.1 )
			walker.step( 0.1 )
			$mol_assert_equal( walker.vel(), going )
			$mol_assert_equal( going[ 0 ], - walker.speed() )
		},

		'walker takes the input of its scene when none is set'() {
			const { key, input } = $bog_gamengine_phys_walker_keys()
			const walker = new $bog_gamengine_phys_walker
			const scene = new $bog_gamengine_scene
			scene.input( input )
			scene.kids([ walker ])
			scene.nodes()
			$mol_assert_equal( walker.input(), input )
			key.pressed( 'D', true )
			walker.step( 0.1 )
			$mol_assert_equal( walker.vel()[ 0 ], walker.speed() )
		},

		'speed is shown among props for the inspector'() {
			const walker = new $bog_gamengine_phys_walker
			const prop = walker.props().find( one => one.name === 'speed' )!
			$mol_assert_equal( prop.kind, 'number' )
			prop.set( 6 )
			$mol_assert_equal( walker.speed(), 6 )
		},

		'walker driven into a wall of the map stops at its edge'() {
			const { key, input } = $bog_gamengine_phys_walker_keys()
			const tile = new $bog_gamengine_phys_tile
			tile.map( '########\n#......#\n########' )
			const walker = new $bog_gamengine_phys_walker
			walker.input( input )
			walker.speed( 4 )
			walker.size( new Float32Array([ 0.8, 0.8 ]) )
			walker.pos( new Float32Array([ 1.5, -1.5, 0 ]) )
			const phys = new $bog_gamengine_phys
			phys.tile( tile )
			phys.bodies([ walker ])
			key.pressed( 'D', true )
			for( let i = 0; i < 120; ++i ) {
				walker.step( 1 / 60 )
				phys.step( 1 / 60 )
			}
			const pos = walker.pos()
			$mol_assert_ok( pos[ 0 ] > 5 )
			$mol_assert_ok( pos[ 0 ] <= 6.6 )
			$mol_assert_ok( Math.abs( pos[ 1 ] + 1.5 ) < 1e-6 )
		},

	})

}
