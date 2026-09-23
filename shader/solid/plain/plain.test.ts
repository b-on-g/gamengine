namespace $ {
	$mol_test({

		'plain solid has no atlas sampler in face and sources'( $ ) {
			const shader = new $bog_gamengine_shader_solid_plain
			const glob = shader.face().glob as Record< string, string >
			$mol_assert_equal( glob.atlas, undefined )
			const both = shader.sources().vert + shader.sources().frag
			$mol_assert_not( both.includes( 'sampler2DArray' ) )
			$mol_assert_not( both.includes( 'texture( atlas' ) )
		},

		'plain solid takes color from instance tint'( $ ) {
			const shader = new $bog_gamengine_shader_solid_plain
			$mol_assert_equal( shader.face().input.inst_tint, 'vec4' )
			$mol_assert_ok( shader.vert().includes( 'pipe_tint = inst_tint;' ) )
			$mol_assert_ok( shader.frag().includes( 'vec3 albedo = pipe_tint.rgb;' ) )
		},

		'plain solid wants depth and lights like solid'( $ ) {
			const shader = new $bog_gamengine_shader_solid_plain
			$mol_assert_equal( shader.depth(), true )
			const glob = shader.face().glob
			$mol_assert_equal( glob.light_count, 'int' )
			$mol_assert_equal( glob.light_pos, 'vec4[8]' )
			$mol_assert_ok( shader.frag().includes( 'bog_gamengine_pbr_brdf' ) )
		},

		'every input and pipe name of plain solid is used'( $ ) {
			const shader = new $bog_gamengine_shader_solid_plain
			const face = shader.face()
			const vert = shader.sources().vert
			for( const name in face.input ) $mol_assert_ok( vert.includes( name ) )
			for( const name in face.pipe ) {
				$mol_assert_ok( shader.vert().includes( name ) )
				$mol_assert_ok( shader.frag().includes( name ) )
			}
		},

	})
}
