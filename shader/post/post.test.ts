namespace $ {
	$mol_test({

		'face gives source sampler, uv pipe and color output'( $ ) {
			const shader = new $bog_gamengine_shader_post
			const face = shader.face()
			$mol_assert_equal( face.glob.source, 'sampler2D' )
			$mol_assert_equal( face.pipe.pipe_uv, 'vec2' )
			$mol_assert_equal( face.output.color, 'vec4' )
		},

		'both entries have main'( $ ) {
			const shader = new $bog_gamengine_shader_post
			$mol_assert_ok( shader.vert().includes( 'void main()' ) )
			$mol_assert_ok( shader.frag().includes( 'void main()' ) )
		},

		'vert makes the quad out of gl_VertexID without attributes'( $ ) {
			const shader = new $bog_gamengine_shader_post
			$mol_assert_ok( shader.vert().includes( 'gl_VertexID' ) )
			$mol_assert_not( 'input' in shader.face() )
		},

		'source declares the sampler and mixes only glsl both'( $ ) {
			const shader = new $bog_gamengine_shader_post
			const source = $bog_gamengine_gl_source( shader.face(), shader.vert(), shader.frag() )
			$mol_assert_ok( source.frag.includes( 'uniform sampler2D source;' ) )
			$mol_assert_ok( source.frag.includes( 'out vec4 color;' ) )
			$mol_assert_equal( shader.sources().vert, $mol_3d_glsl_both + shader.vert() )
		},

		'one step reads the pass input at full size'( $ ) {
			const shader = new $bog_gamengine_shader_post
			const steps = shader.steps()
			$mol_assert_equal( steps.length, 1 )
			$mol_assert_equal( steps[ 0 ].shader, shader )
			$mol_assert_equal( steps[ 0 ].scale, 1 )
			$mol_assert_equal( steps[ 0 ].from, 'in' )
			$mol_assert_equal( steps[ 0 ].extra, null )
		},

	})
}
