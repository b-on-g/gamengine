namespace $ {

	class $bog_gamengine_draw_time_mock extends $mol_state_time {

		@ $mol_mem
		static stamp( next = 0 ) {
			return next
		}

		static now( precision: number ) {
			return this.stamp()
		}

	}

	$mol_test({

		'stat without context is a string'( $ ) {
			$.$mol_state_time = $bog_gamengine_draw_time_mock
			const draw = new $bog_gamengine_draw
			draw.$ = $
			$mol_assert_equal( draw.stat(), 'frame 1 | 0.0 ms | tick 0.0 ms' )
		},

	})

}
