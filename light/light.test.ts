namespace $ {

	$mol_test({

		'props contain kind, color and power'() {
			const names = new $bog_gamengine_light().props().map( prop => prop.name )
			$mol_assert_ok( names.includes( 'kind' ) )
			$mol_assert_ok( names.includes( 'color' ) )
			$mol_assert_ok( names.includes( 'power' ) )
		},

		'defaults are white sun of power 1'() {
			const light = new $bog_gamengine_light
			$mol_assert_equal( light.kind(), 'sun' )
			$mol_assert_equal( [ ... light.color() ], [ 1, 1, 1 ] )
			$mol_assert_equal( light.power(), 1 )
		},

		'spot rotated around Y by half pi shines to minus X'() {
			const light = new $bog_gamengine_light
			light.kind( 'spot' )
			light.rot( new Float32Array([ 0, Math.PI / 2, 0 ]) )
			const dir = light.dir()
			$mol_assert_ok( Math.abs( dir[ 0 ] + 1 ) < 1e-6 )
			$mol_assert_ok( Math.abs( dir[ 1 ] ) < 1e-6 )
			$mol_assert_ok( Math.abs( dir[ 2 ] ) < 1e-6 )
		},

		'direction follows parent rotation'() {
			const parent = new $bog_gamengine_node
			parent.rot( new Float32Array([ 0, Math.PI / 2, 0 ]) )
			const light = new $bog_gamengine_light
			light.parent( parent )
			const dir = light.dir()
			$mol_assert_ok( Math.abs( dir[ 0 ] + 1 ) < 1e-6 )
			$mol_assert_ok( Math.abs( dir[ 2 ] ) < 1e-6 )
		},

	})

}
