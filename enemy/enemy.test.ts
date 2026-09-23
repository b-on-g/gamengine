namespace $ {

	function enemy_test() {
		const tile = new $bog_gamengine_phys_tile
		tile.map( '....\n.==.\n....' )
		tile.solid( '#=' )
		const brain = new $bog_gamengine_brain_fsm
		const right = new $bog_gamengine_brain_state
		right.name( 'right' )
		right.next([ { to: 'left', when: 'edge_right' } ])
		const left = new $bog_gamengine_brain_state
		left.name( 'left' )
		left.next([ { to: 'right', when: 'edge_left' } ])
		brain.kids([ right, left ])
		const enemy = new $bog_jumper_enemy
		enemy.tile( tile )
		enemy.brain( brain )
		enemy.pos( new Float32Array([ 1.5, -0.6, 0 ]) )
		brain.owner( enemy )
		return { enemy, brain }
	}

	$mol_test({

		'enemy in the middle of the platform goes right'() {
			const { enemy, brain } = enemy_test()
			brain.step( 0.1 )
			enemy.step( 0.1 )
			$mol_assert_equal( enemy.edge_right(), false )
			$mol_assert_ok( enemy.vel()[ 0 ] > 0 )
		},

		'enemy at the platform edge turns back'() {
			const { enemy, brain } = enemy_test()
			brain.step( 0.1 )
			enemy.pos( new Float32Array([ 2.5, -0.6, 0 ]) )
			$mol_assert_equal( enemy.edge_right(), true )
			brain.step( 0.1 )
			$mol_assert_equal( brain.state(), 'left' )
			enemy.step( 0.1 )
			$mol_assert_ok( enemy.vel()[ 0 ] < 0 )
			$mol_assert_equal( enemy.face_left(), true )
		},

	})

}
