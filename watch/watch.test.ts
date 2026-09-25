namespace $ {

	$mol_test({

		'first pass is never fresh'() {
			const watch = new $bog_gamengine_watch
			watch.open()
			watch.of( 'a' )
			watch.of( 1 )
			$mol_assert_equal( watch.fresh(), false )
		},

		'same values in the same order are fresh'() {
			const watch = new $bog_gamengine_watch
			const list = [ 1, 2 ]
			watch.open().of( 'a' )
			watch.of( list )
			watch.open().of( 'a' )
			watch.of( list )
			$mol_assert_equal( watch.fresh(), true )
		},

		'changed value is not fresh'() {
			const watch = new $bog_gamengine_watch
			watch.open().of( 'a' )
			watch.open().of( 'b' )
			$mol_assert_equal( watch.fresh(), false )
		},

		'value passes through unchanged'() {
			const watch = new $bog_gamengine_watch
			const list = [ 1 ]
			$mol_assert_equal( watch.open().of( list ), list )
			$mol_assert_equal( watch.open().of( 7 ), 7 )
		},

		'one more watched value than last time is not fresh'() {
			const watch = new $bog_gamengine_watch
			watch.open().of( 'a' )
			watch.open().of( 'a' )
			$mol_assert_equal( watch.fresh(), true )
			watch.open().of( 'a' )
			watch.of( 'b' )
			$mol_assert_equal( watch.fresh(), false )
		},

		'one fewer watched value than last time is not fresh'() {
			const watch = new $bog_gamengine_watch
			watch.open().of( 'a' )
			watch.of( 'b' )
			watch.open().of( 'a' )
			watch.of( 'b' )
			$mol_assert_equal( watch.fresh(), true )
			watch.open().of( 'a' )
			$mol_assert_equal( watch.fresh(), false )
		},

	})

}
