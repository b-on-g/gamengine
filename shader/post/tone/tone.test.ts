namespace $ {
	$mol_test({

		'both entries have main'( $ ) {
			const shader = new $bog_gamengine_shader_post_tone
			$mol_assert_ok( shader.vert().includes( 'void main()' ) )
			$mol_assert_ok( shader.frag().includes( 'void main()' ) )
		},

		'face keeps source sampler of the base pass'( $ ) {
			const shader = new $bog_gamengine_shader_post_tone
			$mol_assert_equal( shader.face().glob.source, 'sampler2D' )
		},

		'frag rolls the tone off and encodes gamma at the end'( $ ) {
			const shader = new $bog_gamengine_shader_post_tone
			const frag = shader.frag()
			$mol_assert_ok( frag.includes( 'aces' ) )
			$mol_assert_not( frag.includes( 'white' ) )
			$mol_assert_ok( frag.includes( 'pow( mapped, vec3( 1.0 / 2.2 ) )' ) )
		},

		'source declares the sampler and the color output'( $ ) {
			const shader = new $bog_gamengine_shader_post_tone
			const source = $bog_gamengine_gl_source( shader.face(), shader.vert(), shader.frag() )
			$mol_assert_ok( source.frag.includes( 'uniform sampler2D source;' ) )
			$mol_assert_ok( source.frag.includes( 'out vec4 color;' ) )
		},

	})
}
