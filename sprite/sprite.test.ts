namespace $ {

	class $bog_gamengine_sprite_test_atlas extends $bog_gamengine_atlas {

		image( uri: string ) {
			return { data: ()=> ({ width: 64, height: 64 }) } as unknown as $mol_3d_image
		}

	}

	function sprite_test_atlas( uris: string[] ) {
		const atlas = new $bog_gamengine_sprite_test_atlas
		atlas.uris( uris )
		return atlas
	}

	function sprite_test_sprite( atlas: $bog_gamengine_atlas | null, frame: string ) {
		const sprite = new $bog_gamengine_sprite
		sprite.atlas( atlas )
		sprite.frame( frame )
		return sprite
	}

	class $bog_gamengine_sprite_test_clock extends $bog_gamengine_clock {

		at = 0

		time() {
			return this.at
		}

	}

	function sprite_test_walk( at: number ) {
		const clock = new $bog_gamengine_sprite_test_clock
		clock.at = at
		const sprite = sprite_test_sprite( null, 'a' )
		sprite.clock( clock )
		sprite.clips({ walk: [ 'a', 'b', 'c', 'd' ] })
		sprite.fps( 4 )
		sprite.clip( 'walk' )
		return sprite
	}

	const sprite_test_shader = new $bog_gamengine_shader_sprite
	const sprite_test_shape = new $bog_gamengine_shape_quad

	function sprite_test_group( sprites: readonly $bog_gamengine_sprite[] ) {
		const parts = $bog_gamengine_batch_group( sprites, ()=> sprite_test_shader, ()=> sprite_test_shape )
		return parts.map( part => {
			const batch = new $bog_gamengine_batch
			batch.atlas( part.atlas )
			batch.nodes( part.nodes )
			return batch
		} )
	}

	$mol_test({

		'two sprites of different atlases give two batches'() {
			const first = sprite_test_atlas([ 'bog/gamengine/demo/atlas/hero.png' ])
			const second = sprite_test_atlas([ 'bog/gamengine/demo/atlas/coin.png' ])
			const batches = sprite_test_group([
				sprite_test_sprite( first, 'hero' ),
				sprite_test_sprite( second, 'coin' ),
			])
			$mol_assert_equal( batches.length, 2 )
			$mol_assert_equal( batches[ 0 ].atlas(), first )
			$mol_assert_equal( batches[ 1 ].atlas(), second )
		},

		'two sprites of one atlas give one batch with both nodes'() {
			const atlas = sprite_test_atlas([ 'bog/gamengine/demo/atlas/hero.png', 'bog/gamengine/demo/atlas/coin.png' ])
			const hero = sprite_test_sprite( atlas, 'hero' )
			const coin = sprite_test_sprite( atlas, 'coin' )
			const batches = sprite_test_group([ hero, coin ])
			$mol_assert_equal( batches.length, 1 )
			$mol_assert_equal( batches[ 0 ].nodes(), [ hero, coin ] )
		},

		'layer is taken from atlas by frame name'() {
			const atlas = sprite_test_atlas([ 'bog/gamengine/demo/atlas/hero.png', 'bog/gamengine/demo/atlas/coin.png' ])
			$mol_assert_equal( sprite_test_sprite( atlas, 'coin' ).layer(), 1 )
		},

		'layer without atlas is 0'() {
			$mol_assert_equal( sprite_test_sprite( null, 'coin' ).layer(), 0 )
		},

		'clip frame at 0.5 s with fps 4 is third'() {
			$mol_assert_equal( sprite_test_walk( 0.5 ).frame_now(), 'c' )
		},

		'clip frame at 0.26 s with fps 4 is second'() {
			$mol_assert_equal( sprite_test_walk( 0.26 ).frame_now(), 'b' )
		},

		'frame_now without clip is frame'() {
			$mol_assert_equal( sprite_test_sprite( null, 'hero' ).frame_now(), 'hero' )
		},

		'layer follows clip frame'() {
			const atlas = sprite_test_atlas([ 'atlas/a.png', 'atlas/b.png', 'atlas/c.png', 'atlas/d.png' ])
			const sprite = sprite_test_walk( 0.26 )
			sprite.atlas( atlas )
			$mol_assert_equal( sprite.layer(), 1 )
		},

		'flip_x mirrors uv'() {
			const sprite = new $bog_gamengine_sprite
			$mol_assert_equal( [ ...sprite.uv() ], [ 0, 0, 1, 1 ] )
			sprite.flip_x( true )
			$mol_assert_equal( [ ...sprite.uv() ], [ 1, 0, -1, 1 ] )
		},

		'size scales trans'() {
			const sprite = new $bog_gamengine_sprite
			sprite.size( new Float32Array([ 2, 3 ]) )
			const trans = sprite.trans()
			$mol_assert_equal( trans[ 0 ], 2 )
			$mol_assert_equal( trans[ 5 ], 3 )
			$mol_assert_equal( trans[ 10 ], 1 )
		},

		'filled batch has layer and uv of sprite'() {
			const atlas = sprite_test_atlas([ 'bog/gamengine/demo/atlas/hero.png', 'bog/gamengine/demo/atlas/coin.png' ])
			const sprite = sprite_test_sprite( atlas, 'coin' )
			sprite.flip_x( true )
			const batch = sprite_test_group([ sprite ])[ 0 ]
			batch.fill()
			$mol_assert_equal( batch.layer[ 0 ], 1 )
			$mol_assert_equal( [ ...batch.uv.subarray( 0, 4 ) ], [ 1, 0, -1, 1 ] )
		},

		'props contain frame and flip_x'() {
			const names = new $bog_gamengine_sprite().props().map( prop => prop.name )
			$mol_assert_ok( names.includes( 'frame' ) )
			$mol_assert_ok( names.includes( 'flip_x' ) )
		},

		'set through props changes flip_x'() {
			const sprite = new $bog_gamengine_sprite
			sprite.props().find( prop => prop.name === 'flip_x' )!.set( true )
			$mol_assert_equal( sprite.flip_x(), true )
		},

		'sphere of the culler holds every corner of the box in every state'() {
			for( const over of $bog_gamengine_node_reach_states ) {
				const node = new $bog_gamengine_sprite
				if( over.size ) node.size( new Float32Array( over.size.slice( 0, 2 ) ) )
				if( over.scale ) node.scale( new Float32Array( over.scale ) )
				if( over.rot ) node.rot( new Float32Array( over.rot ) )
				const sphere = node.radius() * $bog_gamengine_batch_scale_max( node.world() )
				$mol_assert_ok( sphere + 1e-6 >= $bog_gamengine_node_reach( node ) )
			}
		},

	})

}
