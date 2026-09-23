namespace $ {
	$mol_test({

		'both entries have main'( $ ) {
			const shader = new $bog_gamengine_shader_post_vignette
			$mol_assert_ok( shader.vert().includes( 'void main()' ) )
			$mol_assert_ok( shader.frag().includes( 'void main()' ) )
		},

		'face keeps source sampler of the base pass'( $ ) {
			const shader = new $bog_gamengine_shader_post_vignette
			$mol_assert_equal( shader.face().glob.source, 'sampler2D' )
		},

		'frag dims by the distance from the middle'( $ ) {
			const frag = new $bog_gamengine_shader_post_vignette().frag()
			$mol_assert_ok( frag.includes( 'vec2( 0.5 )' ) )
			$mol_assert_ok( frag.includes( 'smoothstep' ) )
		},

	})
}
