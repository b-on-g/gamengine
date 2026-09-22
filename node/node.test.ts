namespace $ {
	$mol_test({

		'child shifted by 1 under parent rotated by half pi lands at (0, 1, 0)'() {

			const parent = new $bog_gamengine_node
			parent.rot( new Float32Array([ 0, 0, Math.PI / 2 ]) )

			const child = new $bog_gamengine_node
			child.parent( parent )
			child.pos( new Float32Array([ 1, 0, 0 ]) )

			const world = child.world()
			$mol_assert_ok( Math.abs( world[ 12 ] - 0 ) < 1e-6 )
			$mol_assert_ok( Math.abs( world[ 13 ] - 1 ) < 1e-6 )
			$mol_assert_ok( Math.abs( world[ 14 ] - 0 ) < 1e-6 )

		},

	})
}
