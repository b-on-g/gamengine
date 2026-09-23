namespace $ {
	$mol_test({

		'vert has main and frag is empty main'( $ ) {
			const shader = new $bog_gamengine_shader_depth
			$mol_assert_ok( shader.vert().includes( 'void main()' ) )
			$mol_assert_equal( shader.frag().trim(), 'void main() {}' )
		},

		'vert uses shadow_mat, inst_trans and vertex'( $ ) {
			const shader = new $bog_gamengine_shader_depth
			const vert = shader.vert()
			$mol_assert_ok( vert.includes( 'shadow_mat' ) )
			$mol_assert_ok( vert.includes( 'inst_trans' ) )
			$mol_assert_ok( vert.includes( 'vertex' ) )
		},

		'inputs match solid inputs in order so the same vao fits both programs'( $ ) {
			const depth = Object.keys( new $bog_gamengine_shader_depth().face().input )
			const solid = Object.keys( new $bog_gamengine_shader_solid().face().input )
			$mol_assert_equal( depth, solid )
		},

		'sources mix only glsl both'( $ ) {
			const shader = new $bog_gamengine_shader_depth
			$mol_assert_equal( shader.sources().vert, $mol_3d_glsl_both + shader.vert() )
			$mol_assert_equal( shader.sources().frag, $mol_3d_glsl_both + shader.frag() )
		},

		'source declares shadow_mat uniform and no outputs'( $ ) {
			const shader = new $bog_gamengine_shader_depth
			const source = $bog_gamengine_gl_source( shader.face(), shader.vert(), shader.frag() )
			$mol_assert_ok( source.vert.includes( 'uniform mat4 shadow_mat;' ) )
			$mol_assert_not( source.frag.includes( 'out ' ) )
		},

	})
}
