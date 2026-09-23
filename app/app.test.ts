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

		'pos typed into the inspector rewrites the source'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.selected( 0 )
			app.Vec_num( 'pos_0' ).value( 5 )
			$mol_assert_ok( app.source().includes( '\t\t\tpos / 5 0 0\n' ) )
		},

		'source typed into the editor moves the node'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.source( app.source().replace( 'pos / -2 0 0', 'pos / 7 0 0' ) )
			$mol_assert_equal( app.Scene().nodes()[ 0 ].pos()[ 0 ], 7 )
		},

		'rotation is edited in degrees'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.selected( 0 )
			app.Vec_num( 'rot_2' ).value( 90 )
			$mol_assert_equal( Math.round( app.Scene().nodes()[ 0 ].rot()[ 2 ] * 1e6 ) / 1e6, Math.round( Math.PI / 2 * 1e6 ) / 1e6 )
		},

		'gizmo hit on the x arrow'( $ ) {
			$mol_assert_equal( $bog_gamestudio_app_gizmo_hit( 0.7, 0.05, 1 ), 'x' )
		},

		'gizmo hit on the y arrow'( $ ) {
			$mol_assert_equal( $bog_gamestudio_app_gizmo_hit( -0.05, 0.9, 1 ), 'y' )
		},

		'gizmo hit on the box'( $ ) {
			$mol_assert_equal( $bog_gamestudio_app_gizmo_hit( 0.1, -0.1, 1 ), 'xy' )
		},

		'gizmo miss'( $ ) {
			$mol_assert_equal( $bog_gamestudio_app_gizmo_hit( 0.5, 0.5, 1 ), null )
		},

	})

}
