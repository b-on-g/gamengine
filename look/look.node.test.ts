namespace $ {

	function $bog_gamengine_look_test_frame( fill: readonly number[], width = 4, height = 4 ) {
		const pixels = new Uint8Array( width * height * 4 )
		for( let i = 0; i < width * height; ++ i ) {
			pixels[ i * 4 ] = fill[ 0 ]
			pixels[ i * 4 + 1 ] = fill[ 1 ]
			pixels[ i * 4 + 2 ] = fill[ 2 ]
			pixels[ i * 4 + 3 ] = 255
		}
		return pixels
	}

	function $bog_gamengine_look_test_shot( over: Partial< $bog_gamengine_look_take_shot > = {} ) {
		return {
			median: 60, low: 20, high: 120, dark: 0.1, blown: 0, sat: 30,
			spots: { floor: [ 100, 100, 100, 255 ] },
			... over,
		} as $bog_gamengine_look_take_shot
	}

	$mol_test({

		'flat grey frame gives its own level as every percentile'() {
			const got = $bog_gamengine_look_stats( $bog_gamengine_look_test_frame([ 80, 80, 80 ]), 4, 4, {} )
			$mol_assert_equal( got.median, 80 )
			$mol_assert_equal( got.low, 80 )
			$mol_assert_equal( got.high, 80 )
			$mol_assert_equal( got.sat, 0 )
		},

		'dark and blown are counted as shares of the frame'() {
			const pixels = $bog_gamengine_look_test_frame([ 0, 0, 0 ], 2, 2 )
			pixels[ 0 ] = 255
			pixels[ 1 ] = 255
			pixels[ 2 ] = 255
			const got = $bog_gamengine_look_stats( pixels, 2, 2, {} )
			$mol_assert_equal( got.dark, 0.75 )
			$mol_assert_equal( got.blown, 0.25 )
		},

		'saturation is the spread between the channels'() {
			const got = $bog_gamengine_look_stats( $bog_gamengine_look_test_frame([ 200, 100, 50 ]), 4, 4, {} )
			$mol_assert_equal( got.sat, 150 )
		},

		'spot is taken by the share of the frame counted from the top'() {
			const pixels = $bog_gamengine_look_test_frame([ 10, 10, 10 ], 2, 2 )
			pixels[ 0 ] = 90
			pixels[ 4 ] = 200
			const got = $bog_gamengine_look_stats( pixels, 2, 2, { low: [ 0.01, 0.99 ], high: [ 0.51, 0.99 ] } )
			$mol_assert_equal( got.spots.low[ 0 ], 90 )
			$mol_assert_equal( got.spots.high[ 0 ], 200 )
		},

		'same shot does not drift from itself'() {
			$mol_assert_equal( $bog_gamengine_look_drift( 'test', $bog_gamengine_look_test_shot(), $bog_gamengine_look_test_shot() ), [] )
		},

		'even fading of the whole frame is caught by the median'() {
			const now = $bog_gamengine_look_test_shot({ median: 70, high: 140 })
			const drift = $bog_gamengine_look_drift( 'test', now, $bog_gamengine_look_test_shot() )
			$mol_assert_equal( drift.length, 2 )
			$mol_assert_ok( drift[ 0 ].includes( 'медиана' ) )
		},

		'lost saturation is caught, gained is not'() {
			const paler = $bog_gamengine_look_drift( 'test', $bog_gamengine_look_test_shot({ sat: 25 }), $bog_gamengine_look_test_shot() )
			const richer = $bog_gamengine_look_drift( 'test', $bog_gamengine_look_test_shot({ sat: 40 }), $bog_gamengine_look_test_shot() )
			$mol_assert_equal( paler.length, 1 )
			$mol_assert_equal( richer.length, 0 )
		},

		'drowned shadows are caught by the share of dark pixels'() {
			const drift = $bog_gamengine_look_drift( 'test', $bog_gamengine_look_test_shot({ dark: 0.15 }), $bog_gamengine_look_test_shot() )
			$mol_assert_equal( drift.length, 1 )
			$mol_assert_ok( drift[ 0 ].includes( 'провалов' ) )
		},

		'spot is compared in linear light'() {
			const drift = $bog_gamengine_look_drift(
				'test',
				$bog_gamengine_look_test_shot({ spots: { floor: [ 120, 120, 120, 255 ] } }),
				$bog_gamengine_look_test_shot(),
			)
			$mol_assert_equal( drift.length, 1 )
			$mol_assert_ok( drift[ 0 ].includes( 'точка floor' ) )
		},

		'small noise in a spot passes'() {
			const drift = $bog_gamengine_look_drift(
				'test',
				$bog_gamengine_look_test_shot({ spots: { floor: [ 101, 100, 99, 255 ] } }),
				$bog_gamengine_look_test_shot(),
			)
			$mol_assert_equal( drift, [] )
		},

		'written signature covers every scene of the tool'() {
			for( const scene of $bog_gamengine_look_scenes ) {
				$mol_assert_ok( Boolean( $bog_gamengine_look_base.soft[ scene.name ] ) )
				$mol_assert_ok( Boolean( $bog_gamengine_look_base.gpu[ scene.name ] ) )
			}
		},

		'both renderers agree on the written signature'() {
			for( const scene of $bog_gamengine_look_scenes ) {
				$mol_assert_equal( $bog_gamengine_look_drift(
					scene.name,
					$bog_gamengine_look_base.gpu[ scene.name ],
					$bog_gamengine_look_base.soft[ scene.name ],
				), [] )
			}
		},

		'recorded renderers are told apart from an unknown one'() {
			$mol_assert_equal( $bog_gamengine_look_family( $bog_gamengine_look_machine.soft ), 'soft' )
			$mol_assert_equal( $bog_gamengine_look_family( $bog_gamengine_look_machine.gpu ), 'gpu' )
			$mol_assert_equal( $bog_gamengine_look_family( 'ANGLE (NVIDIA, GeForce RTX 4090, OpenGL 4.6)' ), '' )
			$mol_assert_equal( $bog_gamengine_look_family( 'нет webgl2' ), '' )
		},

		'another backend of the same renderer keeps its family but is not the recorded one'() {
			const other = $bog_gamengine_look_machine.soft.replace( 'LLVM 10.0.0', 'Subzero' )
			$mol_assert_equal( $bog_gamengine_look_family( other ), 'soft' )
			$mol_assert_not( other === $bog_gamengine_look_machine.soft )
		},

		'scene signature holds against the written one'() {
			const out = $bog_probe_test( 'bog/gamengine/look/-/node.js', 'bog_gamengine_look_check' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_look_ok, $bog_gamengine_look_away ) )
		},

	})

}
