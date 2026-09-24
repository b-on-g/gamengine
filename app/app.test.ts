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

		'placed model gets a loader shape and no batch of its own'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.place( 'bog/gamengine/demo/room/model/pillar.glb', [ 0, 1, 0 ] )
			$mol_assert_equal( app.row_title( 3 ), 'pillar' )
			$mol_assert_ok( app.source().includes( '\t\t\tshape <= Mesh_1_shape $bog_gamestudio_assets_gltf\n\t\t\t\turi \\bog/gamengine/demo/room/model/pillar.glb\n' ) )
			$mol_assert_not( app.source().includes( '$bog_gamengine_batch' ) )
			$mol_assert_ok( app.Scene().batches().some( batch => batch.shape() instanceof $bog_gamestudio_assets_gltf ) )
			$mol_assert_ok( app.Scene().nodes()[ 3 ] instanceof $bog_gamengine_mesh )
		},

		'model and sprites go to batches of their own'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			const before = app.Scene().batches().length
			app.place( 'bog/gamengine/demo/room/model/pillar.glb', [ 0, 1, 0 ] )
			const batches = app.Scene().batches()
			$mol_assert_equal( batches.length, before + 1 )
			const mesh = batches.find( batch => batch.shape() instanceof $bog_gamestudio_assets_gltf )!
			$mol_assert_equal( mesh.nodes().length, 1 )
			$mol_assert_ok( mesh.nodes()[ 0 ] instanceof $bog_gamengine_mesh )
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

		'tiles tab lists the palette of the scene'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			$mol_assert_equal( app.tile_rows().length, 3 )
			$mol_assert_equal( app.tile_title( '#' ), '# wall' )
			$mol_assert_equal( app.tile_uri( '.' ), 'bog/gamengine/demo/atlas/floor.png' )
			$mol_assert_ok( app.tile_icon( '#' ) instanceof $mol_image )
		},

		'picked char and cell tool paint the map of the document'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.Tile( '#' ).checked( true )
			app.Tools().value( 'cell' )
			app.brush_down([ 1, 1 ])
			app.brush_move([ 2, 1 ])
			app.brush_up([ 2, 1 ])
			$mol_assert_equal( app.Doc().map()[ 1 ].join( '' ), '###..#' )
		},

		'rect tool paints a rectangle and shows a preview frame'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.Tile( '#' ).checked( true )
			app.Tools().value( 'rect' )
			app.brush_down([ 1, 1 ])
			app.brush_move([ 2, 2 ])
			$mol_assert_equal( app.rect_nodes().length, 1 )
			app.brush_up([ 2, 2 ])
			$mol_assert_equal( app.rect_nodes().length, 0 )
			$mol_assert_equal( app.Doc().map().map( row => row.join( '' ) ), [ '######', '###..#', '####.#', '#....#', '######' ] )
		},

		'fill tool floods the room and the tool blocks the gizmo'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.selected( 0 )
			$mol_assert_equal( app.gizmo_arrow_nodes().length, 2 )
			app.Tile( '#' ).checked( true )
			app.Tools().value( 'fill' )
			$mol_assert_equal( app.gizmo_arrow_nodes().length, 0 )
			app.brush_down([ 1, 1 ])
			$mol_assert_equal( app.Doc().map().map( row => row.join( '' ) ), [ '######', '######', '######', '######', '######' ] )
			app.tool_drop()
			$mol_assert_equal( app.gizmo_arrow_nodes().length, 2 )
		},

		'painted cell becomes a sprite of the scene'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			const scene = app.tile_scene()!
			$mol_assert_equal( scene.cells().length, 30 )
			$mol_assert_equal( scene.Cell( '1_1' ).frame(), 'floor' )
			app.Tile( '#' ).checked( true )
			app.Tools().value( 'cell' )
			app.brush_down([ 1, 1 ])
			app.brush_up([ 1, 1 ])
			$mol_assert_equal( app.tile_scene()!.Cell( '1_1' ).frame(), 'wall' )
		},

		'inspector draws a row per record of a list prop'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.source( $bog_gamestudio_sample_brain )
			app.selected( 1 )
			$mol_assert_equal( app.row_title( 1 ), 'Ходит' )
			$mol_assert_ok( app.fields().some( field => field.name() === 'next' ) )
			$mol_assert_equal( app.list_rows( 'next' ).length, 2 )
			$mol_assert_equal( app.list_row( 'next/0' ).length, 3 )
			$mol_assert_equal( app.List_field( 'next/0/to' ).value(), 'Ждёт' )
			$mol_assert_equal( app.List_field( 'next/0/when' ).value(), 'near' )
			$mol_assert_equal( app.List_field( 'next/0/when' ).hint(), 'when' )
		},

		'text typed into a list row rewrites the record in the source'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.source( $bog_gamestudio_sample_brain )
			app.selected( 1 )
			app.List_field( 'next/0/to' ).value( 'Спит' )
			$mol_assert_ok( app.source().includes( '\t\t\t\t\tto \\Спит\n\t\t\t\t\twhen \\near\n' ) )
			$mol_assert_equal( app.list_values( 'next' ).length, 1 )
		},

		'buttons add and drop a record of a list prop'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.source( $bog_gamestudio_sample_brain )
			app.selected( 1 )
			app.List_add( 'next' ).click( null )
			$mol_assert_equal( app.list_values( 'next' ).length, 2 )
			$mol_assert_equal( app.list_rows( 'next' ).length, 3 )
			app.List_field( 'next/1/to' ).value( 'Ждёт' )
			app.List_drop( 'next/0' ).click( null )
			$mol_assert_equal( app.list_values( 'next' ), [ { to: 'Ждёт', when: '' } ] )
		},

		'inspector writes into the nested node, not into its neighbour'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.source( $bog_gamestudio_sample_nest )
			const titles = app.Scene().nodes().map( node => node.title() )
			$mol_assert_equal( titles, [ 'Сторож', 'Ходит', 'Ждёт', 'Метка' ] )
			app.selected( titles.indexOf( 'Ходит' ) )
			app.Vec_num( 'pos_0' ).value( 5 )
			const nodes = app.Scene().nodes()
			const walk = nodes.find( node => node.title() === 'Ходит' )!
			$mol_assert_equal( walk.pos()[ 0 ], 5 )
			$mol_assert_equal( nodes.find( node => node.title() === 'Метка' )!.pos()[ 0 ], 2 )
			walk.pos([ 7, 0, 0 ])
			$mol_assert_equal( walk.pos()[ 0 ], 7 )
		},

		'inspector signs a field shared by prefab instances'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.source( $bog_gamestudio_sample_prefab )
			const titles = app.Scene().nodes().map( node => node.title() )
			app.selected( titles.indexOf( 'Ствол' ) )
			$mol_assert_equal( app.doc_path(), 'Enemy_1/Gun' )
			$mol_assert_equal( app.field_bids( 'pos' ), [ 'часть префаба, затронет 2 инстанса' ] )
			app.selected( titles.indexOf( 'Вожак' ) )
			$mol_assert_equal( app.field_bids( 'name' ), [] )
		},

		'detach button rebinds one instance and leaves the prefab compiling'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.source( $bog_gamestudio_sample_prefab )
			app.selected( app.Scene().nodes().map( node => node.title() ).indexOf( 'Ствол' ) )
			$mol_assert_equal( app.form_foot().length, 1 )
			app.Detach().click( null )
			$mol_assert_equal( app.doc_path(), 'Enemy_1/Enemy_1_Gun' )
			$mol_assert_equal( app.form_foot().length, 0 )
			app.Vec_num( 'pos_0' ).value( 9 )
			const nodes = app.Scene().nodes()
			$mol_assert_equal( nodes.map( node => node.title() ), [ 'Страж', 'Ствол', 'Вожак', 'Ствол' ] )
			$mol_assert_equal( nodes.filter( node => node.title() === 'Ствол' ).map( node => node.pos()[ 0 ] ), [ 9, 0 ] )
		},

		'edited source comes back to a freshly opened editor'( $ ) {
			const key = 'bog_gamestudio_source_test_keep'
			const make = ()=> {
				const app = $$.$bog_gamestudio_app.make({ $ })
				app.source_key = ()=> key
				return app
			}
			try {
				const first = make()
				const edited = first.source().replace( '\\Герой', '\\Крошка' )
				first.source( edited )
				$mol_assert_equal( make().source(), edited )
			} finally {
				$.$mol_state_local.value( key, null )
			}
		},

		'editor without kept source starts from the sample'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.source_key = ()=> 'bog_gamestudio_source_test_empty'
			$mol_assert_equal( app.source(), $bog_gamestudio_sample )
		},

		'source uri carries the document and asks to be saved as a tree file'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.source_key = ()=> 'bog_gamestudio_source_test_uri'
			const uri = app.source_uri()
			$mol_assert_ok( uri.startsWith( 'data:text/plain;charset=utf-8,' ) )
			$mol_assert_equal( decodeURIComponent( uri.slice( 'data:text/plain;charset=utf-8,'.length ) ), app.source() )
			$mol_assert_equal( app.Save().file_name(), 'scene.view.tree' )
		},

		'name typed into the inspector renames the node in the tree and in the source'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.selected( 0 )
			app.Name_string().value( 'Крошка' )
			$mol_assert_equal( app.row_title( 0 ), 'Крошка' )
			$mol_assert_ok( app.source().includes( 'name \\Крошка\n' ) )
			$mol_assert_not( app.source().includes( 'name \\Герой\n' ) )
		},

		'cleared name falls the node back to its declaration name'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.selected( 0 )
			app.Name_string().value( '' )
			$mol_assert_equal( app.node_name(), '' )
			$mol_assert_not( app.source().includes( 'name \\Герой' ) )
		},

		'name hint shows what the node is called now'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			app.selected( 1 )
			$mol_assert_equal( app.node_hint(), 'Монета' )
		},

		'form has no name field while nothing is selected'( $ ) {
			const app = $$.$bog_gamestudio_app.make({ $ })
			$mol_assert_equal( app.fields().length, 0 )
			app.selected( 0 )
			$mol_assert_equal( app.fields()[ 0 ], app.Name_field() )
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
