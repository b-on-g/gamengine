namespace $ {

	$mol_test({

		'owner reaches the target in four steps and the status is ok'() {
			const owner = new $bog_gamengine_node
			const move = new $bog_gamengine_brain_act_move
			move.target([ 1, 0, 0 ])
			move.speed( 1 )
			const root = new $bog_gamengine_brain_bt
			root.kids([ move ])
			root.owner( owner )
			for( let i = 0; i < 3; ++i ) {
				root.step( 0.25 )
				$mol_assert_equal( root.status(), 'run' )
			}
			root.step( 0.25 )
			$mol_assert_equal( root.status(), 'ok' )
			$mol_assert_equal( [ ... owner.pos() ], [ 1, 0, 0 ] )
		},

	})

}
