namespace $ {
	$mol_test({

		'both entries have main'( $ ) {
			const shader = new $bog_gamengine_shader_post_bloom
			$mol_assert_ok( shader.vert().includes( 'void main()' ) )
			$mol_assert_ok( shader.frag().includes( 'void main()' ) )
		},

		'mix face adds the blurred sampler next to the source'( $ ) {
			const face = new $bog_gamengine_shader_post_bloom().face()
			$mol_assert_equal( face.glob.source, 'sampler2D' )
			$mol_assert_equal( face.glob.extra, 'sampler2D' )
		},

		'chain is bright, two blurs at half size and a mix at full'( $ ) {
			const shader = new $bog_gamengine_shader_post_bloom
			const steps = shader.steps()
			$mol_assert_equal( steps.map( step => step.scale ), [ 2, 2, 2, 1 ] )
			$mol_assert_equal( steps.map( step => step.from ), [ 'in', 'prev', 'prev', 'in' ] )
			$mol_assert_equal( steps.map( step => step.extra ), [ null, null, null, 'prev' ] )
			$mol_assert_equal( steps[ 3 ].shader, shader )
		},

		'blurs walk different axes'( $ ) {
			const along = new $bog_gamengine_shader_post_bloom_blur
			const across = new $bog_gamengine_shader_post_bloom_blur_across
			$mol_assert_ok( along.frag().includes( 'vec2( 1.0, 0.0 ) * texel' ) )
			$mol_assert_ok( across.frag().includes( 'vec2( 0.0, 1.0 ) * texel' ) )
		},

		'bright pass keeps only what is over the threshold'( $ ) {
			const frag = new $bog_gamengine_shader_post_bloom_bright().frag()
			$mol_assert_ok( frag.includes( 'power - 0.13' ) )
		},

		'source of the mix declares both samplers'( $ ) {
			const shader = new $bog_gamengine_shader_post_bloom
			const source = $bog_gamengine_gl_source( shader.face(), shader.vert(), shader.frag() )
			$mol_assert_ok( source.frag.includes( 'uniform sampler2D source;' ) )
			$mol_assert_ok( source.frag.includes( 'uniform sampler2D extra;' ) )
		},

	})
}
