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

		'solid wants depth, flat does not'( $ ) {
			$mol_assert_equal( new $bog_gamengine_shader_solid().depth(), true )
			$mol_assert_equal( new $bog_gamengine_shader_flat().depth(), false )
		},

	})
}
