namespace $ {

	class $bog_gamestudio_app_time_mock extends $mol_state_time {

		@ $mol_mem
		static stamp( next = 0 ) {
			return next
		}

		static now( precision: number ) {
			return this.stamp()
		}

	}

	function played( $: $ ) {
		$.$mol_state_time = $bog_gamestudio_app_time_mock
		const app = $$.$bog_gamestudio_app.make({ $ })
		$bog_gamestudio_app_time_mock.stamp( 0 )
		app.Scene().step()
		app.play()
		app.Key().keys().D( true )
		for( let tick = 1; tick <= 3; ++ tick ) {
			$bog_gamestudio_app_time_mock.stamp( tick * 16 )
			app.Scene().step()
		}
		return app
	}

	$mol_test({

		'play with D held moves the hero right'( $ ) {
			const app = played( $ )
			$mol_assert_ok( app.Scene().nodes()[ 0 ].pos()[ 0 ] > -2 )
		},

		'stop returns the hero pos to the document value'( $ ) {
			const app = played( $ )
			app.stop()
			$mol_assert_equal( app.Scene().nodes()[ 0 ].pos()[ 0 ], -2 )
		},

		'play and stop leave the source untouched'( $ ) {
			const app = played( $ )
			app.stop()
			$mol_assert_equal( app.source(), $bog_gamestudio_sample )
		},

		'pause stops the movement'( $ ) {
			const app = played( $ )
			app.Pause().checked( true )
			const before = app.Scene().nodes()[ 0 ].pos()[ 0 ]
			$bog_gamestudio_app_time_mock.stamp( 64 )
			app.Scene().step()
			$bog_gamestudio_app_time_mock.stamp( 80 )
			app.Scene().step()
			$mol_assert_equal( app.Scene().nodes()[ 0 ].pos()[ 0 ], before )
		},

		'hero stands still in the edit mode'( $ ) {
			$.$mol_state_time = $bog_gamestudio_app_time_mock
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.Key().keys().D( true )
			$bog_gamestudio_app_time_mock.stamp( 0 )
			app.Scene().step()
			$bog_gamestudio_app_time_mock.stamp( 16 )
			app.Scene().step()
			$mol_assert_equal( app.Scene().nodes()[ 0 ].pos()[ 0 ], -2 )
		},

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

		'assets tab lists every asset of the pack with its file name'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			$mol_assert_equal( app.asset_rows().length, 8 )
			$mol_assert_equal( app.Asset_row( 'bog/gamengine/demo/atlas/coin.png' ).title(), 'coin.png' )
			$mol_assert_ok( app.asset_icon( 'bog/gamengine/demo/atlas/coin.png' ) instanceof $mol_image )
			$mol_assert_ok( app.asset_icon( 'bog/gamengine/demo/sound/coin.wav' ) instanceof $mol_icon_music )
		},

		'picked image placed by a canvas click becomes a sprite at the click point'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.Asset_row( 'bog/gamengine/demo/atlas/floor.png' ).checked( true )
			$mol_assert_ok( app.placing() )
			app.place( 'bog/gamengine/demo/atlas/floor.png', [ 1, -2, 0 ] )
			$mol_assert_equal( app.node_rows().length, 4 )
			$mol_assert_equal( app.row_title( 3 ), 'floor' )
			$mol_assert_equal( app.Scene().nodes()[ 3 ].pos()[ 1 ], -2 )
			$mol_assert_ok( app.source().includes( '\t\t\t\\bog/gamengine/demo/atlas/floor.png\n' ) )
			$mol_assert_ok( app.source().includes( '\t\t<= Sprite_1 $bog_gamengine_sprite\n\t\t\tname \\floor\n\t\t\tatlas <= Atlas\n\t\t\tframe \\floor\n\t\t\tpos / 1 -2 0\n' ) )
		},

		'placed model gets a loader shape and its own batch'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.place( 'bog/gamengine/demo/room/model/pillar.glb', [ 0, 1, 0 ] )
			$mol_assert_equal( app.row_title( 3 ), 'pillar' )
			$mol_assert_ok( app.source().includes( '\t\t\tshape <= Mesh_1_shape $bog_gamestudio_assets_gltf\n\t\t\t\turi \\bog/gamengine/demo/room/model/pillar.glb\n' ) )
			$mol_assert_ok( app.source().includes( '\t\t<= Batch_1 $bog_gamengine_batch\n' ) )
			$mol_assert_ok( app.Scene().batches().some( batch => batch.shape() instanceof $bog_gamestudio_assets_gltf ) )
			$mol_assert_ok( app.Scene().nodes()[ 3 ] instanceof $bog_gamengine_mesh )
		},

		'placed sound is written into the sound dictionary'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.place( 'bog/gamengine/demo/sound/coin.wav', [ 0, 0, 0 ] )
			$mol_assert_ok( app.source().endsWith( '\tSound $bog_gamengine_sound\n\t\turis *\n\t\t\tcoin \\bog/gamengine/demo/sound/coin.wav\n' ) )
			app.place( 'bog/gamengine/demo/sound/coin.wav', [ 0, 0, 0 ] )
			$mol_assert_equal( app.source().split( 'coin.wav' ).length, 2 )
			$mol_assert_equal( app.node_rows().length, 3 )
		},

		'assets tab survives the scene rebuild'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.Side().current( '1' )
			app.place( 'bog/gamengine/demo/atlas/floor.png', [ 1, -2, 0 ] )
			$mol_assert_equal( app.Side().current(), '1' )
			app.Side().current( '' )
			$mol_assert_equal( app.Side().current(), '1' )
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
