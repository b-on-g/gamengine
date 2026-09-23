namespace $ {
	$mol_test({

		'vert and frag have main'( $ ) {
			const shader = new $bog_gamengine_shader_solid
			$mol_assert_ok( shader.vert().includes( 'main' ) )
			$mol_assert_ok( shader.frag().includes( 'main' ) )
		},

		'every input name is used in vert'( $ ) {
			const shader = new $bog_gamengine_shader_solid
			const vert = shader.sources().vert
			const face = shader.face()
			for( const name in face.input ) $mol_assert_ok( vert.includes( name ) )
		},

		'every glob name is used in vert or frag'( $ ) {
			const shader = new $bog_gamengine_shader_solid
			const both = shader.sources().vert + shader.sources().frag
			const face = shader.face()
			for( const name in face.glob ) $mol_assert_ok( both.includes( name ) )
		},

		'sources mix only glsl both'( $ ) {
			const shader = new $bog_gamengine_shader_solid
			$mol_assert_equal( shader.sources().vert, $mol_3d_glsl_both + shader.vert() )
			$mol_assert_equal( shader.sources().frag, $mol_3d_glsl_both + shader.frag() )
		},

		'every pipe name is in both vert and frag'( $ ) {
			const shader = new $bog_gamengine_shader_solid
			const face = shader.face()
			for( const name in face.pipe ) {
				$mol_assert_ok( shader.vert().includes( name ) )
				$mol_assert_ok( shader.frag().includes( name ) )
			}
		},

		'wireframe glob is float and used in both vert and frag'( $ ) {
			const shader = new $bog_gamengine_shader_solid
			$mol_assert_equal( shader.face().glob.wireframe, 'float' )
			$mol_assert_ok( shader.vert().includes( 'wireframe' ) )
			$mol_assert_ok( shader.frag().includes( 'wireframe' ) )
		},

		'light uniforms are arrays of eight in face and used in frag'( $ ) {
			const shader = new $bog_gamengine_shader_solid
			const glob = shader.face().glob
			$mol_assert_equal( glob.light_count, 'int' )
			$mol_assert_equal( glob.light_pos, 'vec4[8]' )
			$mol_assert_equal( glob.light_dir, 'vec4[8]' )
			$mol_assert_equal( glob.light_color, 'vec4[8]' )
			$mol_assert_equal( glob.ambient, 'vec3' )
			$mol_assert_equal( glob.cam_pos, 'vec3' )
			const frag = shader.frag()
			for( const name of [ 'light_count', 'light_pos', 'light_dir', 'light_color', 'ambient', 'cam_pos' ] ) $mol_assert_ok( frag.includes( name ) )
		},

		'material and normal layer come per instance and reach frag'( $ ) {
			const shader = new $bog_gamengine_shader_solid
			$mol_assert_equal( shader.face().input.inst_material, 'vec4' )
			$mol_assert_equal( shader.face().input.inst_normal_layer, 'float' )
			$mol_assert_ok( shader.vert().includes( 'inst_material' ) )
			$mol_assert_ok( shader.frag().includes( 'pipe_material' ) )
			$mol_assert_ok( shader.frag().includes( 'pipe_normal_layer' ) )
		},

		'array uniform is declared with size after name'( $ ) {
			const source = $bog_gamengine_gl_source( { glob: { light_pos: 'vec4[8]' } }, '', '' )
			$mol_assert_ok( source.frag.includes( 'uniform vec4 light_pos[8];' ) )
		},

		'solid wants depth, flat does not'( $ ) {
			$mol_assert_equal( new $bog_gamengine_shader_solid().depth(), true )
			$mol_assert_equal( new $bog_gamengine_shader_flat().depth(), false )
		},

	})
}
