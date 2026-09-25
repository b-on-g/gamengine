namespace $ {

	class $bog_gamengine_demo_crumb2_time_mock extends $mol_state_time {

		@ $mol_mem
		static stamp( next = 0 ) {
			return next
		}

		static now( precision: number ) {
			return this.stamp()
		}

	}

	function $bog_gamengine_demo_crumb2_test_run( $: $, key: string, ticks: number ) {
		$.$mol_state_time = $bog_gamengine_demo_crumb2_time_mock
		const app = $$.$bog_gamengine_demo_crumb2.make({ $ })
		$bog_gamengine_demo_crumb2_time_mock.stamp( 0 )
		app.Scene().step()
		app.Key().keys()[ key ]( true )
		for( let tick = 1; tick <= ticks; ++ tick ) {
			$bog_gamengine_demo_crumb2_time_mock.stamp( tick * 16 )
			app.Scene().step()
		}
		return app
	}

	$mol_test({

		'hero walks right while D is held'( $ ) {
			const app = $bog_gamengine_demo_crumb2_test_run( $, 'D', 20 )
			$mol_assert_ok( app.hero().pos()[ 0 ] > 1 )
		},

		'wall of the painted map stops the hero'( $ ) {
			const app = $bog_gamengine_demo_crumb2_test_run( $, 'D', 400 )
			$mol_assert_ok( app.hero().pos()[ 0 ] < 5 )
		},

		'five crumbs are counted at the start'( $ ) {
			const app = $$.$bog_gamengine_demo_crumb2.make({ $ })
			$mol_assert_equal( app.crumbs().length, 5 )
			$mol_assert_equal( app.Rule().left(), 5 )
		},

		'crumb under the hero is taken'( $ ) {
			const app = $$.$bog_gamengine_demo_crumb2.make({ $ })
			app.hero().pos( new Float32Array( app.crumbs()[ 0 ].pos() ) )
			app.Rule().step( 0.1 )
			$mol_assert_equal( app.Rule().left(), 4 )
		},

		'every crumb taken is a win'( $ ) {
			const app = $$.$bog_gamengine_demo_crumb2.make({ $ })
			for( const crumb of app.crumbs() ) {
				app.hero().pos( new Float32Array( crumb.pos() ) )
				app.Rule().step( 0.1 )
			}
			$mol_assert_ok( app.Rule().won() )
			$mol_assert_equal( app.end_title(), 'Победа' )
		},

		'time over without crumbs is a loss'( $ ) {
			const app = $$.$bog_gamengine_demo_crumb2.make({ $ })
			app.Rule().spent( app.Rule().limit() )
			$mol_assert_ok( app.Rule().lost() )
			$mol_assert_equal( app.end_title(), 'Время вышло' )
		},

	})

}
