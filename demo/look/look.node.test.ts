namespace $ {

	$mol_test({

		'level of the jumper at the start keeps its recorded signature'() {
			const out = $bog_probe_test( 'bog/gamengine/demo/look/-/node.js', 'bog_gamengine_demo_look_check_jumper' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_look_ok, $bog_gamengine_look_away ) )
		},

		'arena of the shooter before the first shot keeps its recorded signature'() {
			const out = $bog_probe_test( 'bog/gamengine/demo/look/-/node.js', 'bog_gamengine_demo_look_check_shooter' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_look_ok, $bog_gamengine_look_away ) )
		},

		'field of the legion before the battle keeps its recorded signature'() {
			const out = $bog_probe_test( 'bog/gamengine/demo/look/-/node.js', 'bog_gamengine_demo_look_check_legion' )
			$mol_assert_ok( $bog_probe_done( out, $bog_gamengine_look_ok, $bog_gamengine_look_away ) )
		},

		'dark end of the jumper level is a witness, not a gate'() {
			const it = $bog_gamengine_demo_look_of( 'jumper' )
			const scene = it.scenes[ 0 ]
			$mol_assert_ok( scene.witness!.includes( 'low' ) )
			$mol_assert_equal( $bog_gamengine_look_drift(
				scene.name,
				it.base.gpu[ scene.name ],
				it.base.soft[ scene.name ],
			).length, 1 )
			$mol_assert_equal( $bog_gamengine_look_drift(
				scene.name,
				it.base.gpu[ scene.name ],
				it.base.soft[ scene.name ],
				$bog_gamengine_look_tol,
				scene.witness,
			), [] )
		},

		'diff between the two recorded machines stays inside the envelope for every game'() {
			for( const game of Object.keys( $bog_gamengine_demo_look_games ) ) {
				const base = $bog_gamengine_demo_look_games[ game ].base
				for( const name of Object.keys( base.soft ) ) {
					const shifts = $bog_gamengine_look_shifts( game + '/' + name, base.gpu[ name ], base.soft[ name ] )
					$mol_assert_equal( $bog_gamengine_look_refuse( shifts ), [] )
				}
			}
		},

		'every game keeps the size of its frame in the soft signature'() {
			for( const game of Object.keys( $bog_gamengine_demo_look_games ) ) {
				const it = $bog_gamengine_demo_look_of( game )
				for( const scene of it.scenes ) $mol_assert_ok( Boolean( it.base.soft[ scene.name ].size ) )
			}
		},

		'every game of the demo has a signature of its own page'() {
			const games = Object.keys( $bog_gamengine_demo_look_games )
			$mol_assert_equal( games.length, new Set( games.map( game => $bog_gamengine_demo_look_of( game ).page ) ).size )
		},

	})

}
