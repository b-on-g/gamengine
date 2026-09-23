namespace $ {

	class $bog_gamengine_clock_time_mock extends $mol_state_time {

		@ $mol_mem
		static stamp( next = 0 ) {
			return next
		}

		static now( precision: number ) {
			return this.stamp()
		}

	}

	function clock_mock( $: $ ) {
		$.$mol_state_time = $bog_gamengine_clock_time_mock
		const clock = new $bog_gamengine_clock
		clock.$ = $
		return clock
	}

	$mol_test({

		'three ticks give frame 3'( $ ) {
			const clock = clock_mock( $ )
			$bog_gamengine_clock_time_mock.stamp( 0 )
			clock.frame()
			$bog_gamengine_clock_time_mock.stamp( 16 )
			clock.frame()
			$bog_gamengine_clock_time_mock.stamp( 32 )
			$mol_assert_equal( clock.frame(), 3 )
		},

		'dt is seconds since previous frame'( $ ) {
			const clock = clock_mock( $ )
			$bog_gamengine_clock_time_mock.stamp( 0 )
			clock.frame()
			$bog_gamengine_clock_time_mock.stamp( 16 )
			$mol_assert_equal( clock.dt(), 0.016 )
		},

		'paused gives dt 0'( $ ) {
			const clock = clock_mock( $ )
			$bog_gamengine_clock_time_mock.stamp( 0 )
			clock.frame()
			clock.paused( true )
			$bog_gamengine_clock_time_mock.stamp( 16 )
			$mol_assert_equal( clock.dt(), 0 )
		},

		'jump of 5 seconds gives dt 0.1'( $ ) {
			const clock = clock_mock( $ )
			$bog_gamengine_clock_time_mock.stamp( 0 )
			clock.frame()
			$bog_gamengine_clock_time_mock.stamp( 5000 )
			$mol_assert_equal( clock.dt(), 0.1 )
		},

		'speed scales dt'( $ ) {
			const clock = clock_mock( $ )
			$bog_gamengine_clock_time_mock.stamp( 0 )
			clock.frame()
			clock.speed( 0.5 )
			$bog_gamengine_clock_time_mock.stamp( 20 )
			$mol_assert_equal( clock.dt(), 0.01 )
		},

		'time accumulates dt'( $ ) {
			const clock = clock_mock( $ )
			$bog_gamengine_clock_time_mock.stamp( 0 )
			clock.time()
			$bog_gamengine_clock_time_mock.stamp( 10 )
			clock.time()
			$bog_gamengine_clock_time_mock.stamp( 30 )
			$mol_assert_equal( clock.time(), 0.03 )
		},

		'time set to 5 keeps accumulating dt from 5'( $ ) {
			const clock = clock_mock( $ )
			$bog_gamengine_clock_time_mock.stamp( 0 )
			clock.time()
			$bog_gamengine_clock_time_mock.stamp( 10 )
			clock.time()
			clock.time( 5 )
			$mol_assert_equal( clock.time(), 5 )
			$bog_gamengine_clock_time_mock.stamp( 30 )
			$mol_assert_equal( clock.time(), 5.02 )
		},

	})

}
