namespace $ {
	$mol_test({

		'lines array lengths follow points'( $ ) {
			const lines = $bog_gamengine_shape_lines.make({ $ })
			lines.points( new Float32Array([ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0 ]) )
			$mol_assert_equal( lines.geometry().length, 12 )
			$mol_assert_equal( lines.size(), 4 )
			$mol_assert_equal( lines.count(), 4 )
			$mol_assert_equal( lines.normals().length, 12 )
			$mol_assert_equal( lines.skin().length, 8 )
		},

		'lines normals and skin are zeros'( $ ) {
			const lines = $bog_gamengine_shape_lines.make({ $ })
			lines.points( new Float32Array([ 0, 0, 0, 1, 1, 1 ]) )
			for( const value of lines.normals() ) $mol_assert_equal( value, 0 )
			for( const value of lines.skin() ) $mol_assert_equal( value, 0 )
		},

		'lines mode is lines and empty by default'( $ ) {
			const lines = $bog_gamengine_shape_lines.make({ $ })
			$mol_assert_equal( lines.mode(), 'lines' )
			$mol_assert_equal( lines.size(), 0 )
		},

	})
}
