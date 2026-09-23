namespace $ {

	$mol_test({

		'scene tree lists three rows'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			$mol_assert_equal( app.node_rows().length, 3 )
		},

		'tree row shows node name'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			$mol_assert_equal( app.row_title( 0 ), 'Герой' )
		},

		'pos typed into the inspector moves the selected node'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.selected( 1 )
			app.Vec_num( 'pos_0' ).value( 5 )
			$mol_assert_equal( app.Scene().nodes()[ 1 ].pos()[ 0 ], 5 )
		},

		'rotation is edited in degrees'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.selected( 0 )
			app.Vec_num( 'rot_2' ).value( 90 )
			$mol_assert_equal( Math.round( app.Scene().nodes()[ 0 ].rot()[ 2 ] * 1e6 ) / 1e6, Math.round( Math.PI / 2 * 1e6 ) / 1e6 )
		},

	})

}
