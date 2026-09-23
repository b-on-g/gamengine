namespace $ {

	function $bog_gamengine_skin_test_skeleton() {
		return {
			count: 2,
			names: [ 'root', 'tip' ],
			parents: new Int32Array([ -1, 0 ]),
			order: new Int32Array([ 0, 1 ]),
			base: new Float32Array([
				0, 0, 0, 0, 0, 0, 1, 1, 1, 1,
				0, 1, 0, 0, 0, 0, 1, 1, 1, 1,
			]),
			binds: new Float32Array([
				1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
				1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -1, 0, 1,
			]),
		} as $bog_gamengine_shape_gltf_skeleton
	}

	function $bog_gamengine_skin_test_clips() {
		const quarter = Math.PI / 2
		return new Map< string, $bog_gamengine_shape_gltf_clip >([
			[ 'turn', {
				name: 'turn',
				duration: 1,
				channels: [ {
					joint: 1,
					path: 'rotation',
					step: false,
					times: new Float32Array([ 0, 1 ]),
					values: new Float32Array([ 0, 0, 0, 1, 0, 0, Math.sin( quarter / 2 ), Math.cos( quarter / 2 ) ]),
				} ],
			} ],
			[ 'here', {
				name: 'here',
				duration: 1,
				channels: [ {
					joint: 0,
					path: 'translation',
					step: false,
					times: new Float32Array([ 0, 1 ]),
					values: new Float32Array([ 0, 0, 0, 0, 0, 0 ]),
				} ],
			} ],
			[ 'there', {
				name: 'there',
				duration: 1,
				channels: [ {
					joint: 0,
					path: 'translation',
					step: false,
					times: new Float32Array([ 0, 1 ]),
					values: new Float32Array([ 2, 0, 0, 2, 0, 0 ]),
				} ],
			} ],
			[ 'jump', {
				name: 'jump',
				duration: 1,
				channels: [ {
					joint: 0,
					path: 'translation',
					step: true,
					times: new Float32Array([ 0, 1 ]),
					values: new Float32Array([ 0, 0, 0, 4, 0, 0 ]),
				} ],
			} ],
		])
	}

	function $bog_gamengine_skin_test_make( $: $, clip: string ) {
		const skeleton = $bog_gamengine_skin_test_skeleton()
		const clips = $bog_gamengine_skin_test_clips()
		const shape = $bog_gamengine_shape_gltf.make({ $, skeleton: ()=> skeleton, clips: ()=> clips })
		const skin = new $bog_gamengine_skin
		skin.shape( shape )
		skin.clip( clip )
		return skin
	}

	$mol_test({

		'pose at time zero keeps the bind pose'( $ ) {
			const skin = $bog_gamengine_skin_test_make( $, 'turn' )
			const bones = skin.pose()
			for( let i = 0; i < 2; ++ i ) {
				for( let k = 0; k < 16; ++ k ) {
					$mol_assert_ok( Math.abs( bones[ i * 16 + k ] - ( k % 5 ? 0 : 1 ) ) < 1e-4 )
				}
			}
		},

		'pose in the middle of a clip turns the bone'( $ ) {
			const skin = $bog_gamengine_skin_test_make( $, 'turn' )
			skin.time( 0.5 )
			const bones = skin.pose()
			const cos = Math.cos( Math.PI / 4 )
			const sin = Math.sin( Math.PI / 4 )
			$mol_assert_ok( Math.abs( bones[ 16 ] - cos ) < 1e-4 )
			$mol_assert_ok( Math.abs( bones[ 17 ] - sin ) < 1e-4 )
			$mol_assert_ok( Math.abs( bones[ 20 ] + sin ) < 1e-4 )
			$mol_assert_ok( Math.abs( bones[ 28 ] - sin ) < 1e-4 )
			$mol_assert_ok( Math.abs( bones[ 29 ] - ( 1 - cos ) ) < 1e-4 )
			$mol_assert_ok( Math.abs( bones[ 0 ] - 1 ) < 1e-4 )
		},

		'blend of two clips with half weight gives the middle'( $ ) {
			const skin = $bog_gamengine_skin_test_make( $, 'here' )
			skin.blend( 'there', 0.5 )
			const bones = skin.pose()
			$mol_assert_ok( Math.abs( bones[ 12 ] - 1 ) < 1e-4 )
			$mol_assert_ok( Math.abs( bones[ 13 ] ) < 1e-4 )
		},

		'step interpolation holds the previous key'( $ ) {
			const skin = $bog_gamengine_skin_test_make( $, 'jump' )
			skin.time( 0.9 )
			$mol_assert_ok( Math.abs( skin.pose()[ 12 ] ) < 1e-4 )
			skin.time( 1 )
			$mol_assert_ok( Math.abs( skin.pose()[ 12 ] - 4 ) < 1e-4 )
		},

		'time runs by step and loops over the duration'( $ ) {
			const skin = $bog_gamengine_skin_test_make( $, 'turn' )
			skin.step( 0.6 )
			$mol_assert_ok( Math.abs( skin.time() - 0.6 ) < 1e-6 )
			skin.step( 0.6 )
			$mol_assert_ok( Math.abs( skin.time() - 0.2 ) < 1e-6 )
		},

		'time stops at the end without loop'( $ ) {
			const skin = $bog_gamengine_skin_test_make( $, 'turn' )
			skin.loop( false )
			skin.step( 0.8 )
			skin.step( 0.8 )
			$mol_assert_equal( skin.time(), 1 )
		},

		'pose without a skeleton stays identity'( $ ) {
			const skin = new $bog_gamengine_skin
			const bones = skin.pose()
			$mol_assert_equal( bones.length, $bog_gamengine_skin_max * 16 )
			$mol_assert_equal( [ ... bones.subarray( 0, 16 ) ], [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ] )
		},

		'pose keeps the same buffer and bumps version only on change'( $ ) {
			const skin = $bog_gamengine_skin_test_make( $, 'turn' )
			const first = skin.pose()
			const was = skin.version
			$mol_assert_equal( skin.pose(), first )
			$mol_assert_equal( skin.version, was )
			skin.time( 0.5 )
			$mol_assert_equal( skin.pose(), first )
			$mol_assert_equal( skin.version, was + 1 )
		},

	})

}
