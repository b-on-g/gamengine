namespace $ {

	class $bog_gamengine_save_time_mock extends $mol_state_time {

		@ $mol_mem
		static stamp( next = 0 ) {
			return next
		}

		static now( precision: number ) {
			return this.stamp()
		}

	}

	class $bog_gamengine_save_mover extends $bog_gamengine_node {

		step( dt: number ) {
			const pos = this.pos()
			this.pos( new Float32Array([ pos[ 0 ] + dt, pos[ 1 ], pos[ 2 ] ]) )
		}

	}

	function save_test_scene( $: $ ) {
		$.$mol_state_time = $bog_gamengine_save_time_mock
		const a = new $bog_gamengine_save_mover
		const b = new $bog_gamengine_save_mover
		b.pos( new Float32Array([ 0, 1, 0 ]) )
		const scene = new $bog_gamengine_scene
		scene.$ = $
		scene.kids([ a, b ])
		$bog_gamengine_save_time_mock.stamp( 0 )
		scene.step()
		return { scene, a, b }
	}

	function save_test_tick( scene: $bog_gamengine_scene, ms: number ) {
		$bog_gamengine_save_time_mock.stamp( ms )
		scene.step()
	}

	$mol_test({

		'load returns both nodes to the dumped position after more steps'( $ ) {
			const { scene, a, b } = save_test_scene( $ )
			save_test_tick( scene, 16 )
			const data = $bog_gamengine_save_dump( scene )
			save_test_tick( scene, 32 )
			$mol_assert_ok( Math.abs( a.pos()[ 0 ] - 0.032 ) < 1e-6 )
			$bog_gamengine_save_load( scene, data )
			$mol_assert_ok( Math.abs( a.pos()[ 0 ] - 0.016 ) < 1e-6 )
			$mol_assert_ok( Math.abs( b.pos()[ 0 ] - 0.016 ) < 1e-6 )
			$mol_assert_equal( b.pos()[ 1 ], 1 )
		},

		'dump holds plain arrays and titles'( $ ) {
			const { scene } = save_test_scene( $ )
			const data = $bog_gamengine_save_dump( scene )
			$mol_assert_equal( data.nodes.map( node => node.title ), [ 'save_mover', 'save_mover' ] )
			$mol_assert_equal( data.nodes[ 1 ].props.pos, [ 0, 1, 0 ] )
			$mol_assert_equal( data.nodes[ 0 ].klass, '$bog_gamengine_save_mover' )
		},

		'dump loads after json round trip'( $ ) {
			const { scene, a } = save_test_scene( $ )
			save_test_tick( scene, 16 )
			const data = JSON.parse( JSON.stringify( $bog_gamengine_save_dump( scene ) ) )
			save_test_tick( scene, 32 )
			$bog_gamengine_save_load( scene, data )
			$mol_assert_ok( Math.abs( a.pos()[ 0 ] - 0.016 ) < 1e-6 )
			$mol_assert_ok( a.pos() instanceof Float32Array )
		},

		'unknown title in data is skipped'( $ ) {
			const { scene, a } = save_test_scene( $ )
			const data = $bog_gamengine_save_dump( scene )
			data.nodes.unshift({ title: 'ghost', klass: '$bog_gamengine_node', props: { pos: [ 9, 9, 9 ] } })
			$bog_gamengine_save_load( scene, data )
			$mol_assert_equal( [ ... a.pos() ], [ 0, 0, 0 ] )
		},

		'duplicate titles match nodes by order'( $ ) {
			const { scene, a, b } = save_test_scene( $ )
			const data = $bog_gamengine_save_dump( scene )
			data.nodes[ 0 ].props.pos = [ 1, 0, 0 ]
			data.nodes[ 1 ].props.pos = [ 2, 0, 0 ]
			$bog_gamengine_save_load( scene, data )
			$mol_assert_equal( a.pos()[ 0 ], 1 )
			$mol_assert_equal( b.pos()[ 0 ], 2 )
		},

		'load restores clock time and it keeps running'( $ ) {
			const { scene } = save_test_scene( $ )
			save_test_tick( scene, 16 )
			const data = $bog_gamengine_save_dump( scene )
			$mol_assert_ok( Math.abs( data.time - 0.016 ) < 1e-9 )
			save_test_tick( scene, 32 )
			$bog_gamengine_save_load( scene, data )
			$mol_assert_ok( Math.abs( scene.clock().time() - 0.016 ) < 1e-9 )
			save_test_tick( scene, 48 )
			$mol_assert_ok( Math.abs( scene.clock().time() - 0.032 ) < 1e-9 )
		},

		'slot stores data and null clears it'( $ ) {
			const { scene } = save_test_scene( $ )
			const data = $bog_gamengine_save_dump( scene )
			const name = 'test_' + $mol_guid()
			$bog_gamengine_save_slot( name, data )
			$mol_assert_equal( $bog_gamengine_save_slot( name ), data )
			$bog_gamengine_save_slot( name, null )
			$mol_assert_equal( $bog_gamengine_save_slot( name ), null )
		},

	})

}
