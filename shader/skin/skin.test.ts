namespace $ {
	$mol_test({

		'vert and frag have main'( $ ) {
			const shader = new $bog_gamengine_shader_skin
			$mol_assert_ok( shader.vert().includes( 'main' ) )
			$mol_assert_ok( shader.frag().includes( 'main' ) )
		},

		'bones come as a plain sampler and joints with weights as inputs'( $ ) {
			const face = new $bog_gamengine_shader_skin().face()
			$mol_assert_equal( face.glob.bones, 'sampler2D' )
			$mol_assert_equal( face.input.joints, 'vec4' )
			$mol_assert_equal( face.input.weights, 'vec4' )
		},

		'vert fetches four bone rows and mixes them by weights'( $ ) {
			const vert = new $bog_gamengine_shader_skin().vert()
			$mol_assert_ok( vert.includes( 'texelFetch( bones, ivec2( 0, at ), 0 )' ) )
			$mol_assert_ok( vert.includes( 'texelFetch( bones, ivec2( 3, at ), 0 )' ) )
			$mol_assert_ok( vert.includes( 'bone( joints.w ) * weights.w' ) )
			$mol_assert_not( vert.includes( 'break' ) )
		},

		'skin keeps the solid input locations and puts its own after them'( $ ) {
			const skin = new $bog_gamengine_shader_skin()
			const solid = new $bog_gamengine_shader_solid()
			const source = $bog_gamengine_gl_source( skin.face(), skin.vert(), skin.frag() ).vert
			const before = $bog_gamengine_gl_source( solid.face(), solid.vert(), solid.frag() ).vert
			for( const name in solid.face().input ) {
				const line = before.split( '\n' ).find( row => row.endsWith( ` ${ name };` ) )!
				$mol_assert_ok( source.includes( line ) )
			}
			$mol_assert_ok( source.includes( 'layout( location = 12 ) in vec4 joints;' ) )
			$mol_assert_ok( source.includes( 'layout( location = 13 ) in vec4 weights;' ) )
			$mol_assert_ok( source.includes( 'uniform sampler2D bones;' ) )
		},

		'skin keeps the solid pipe, output and depth'( $ ) {
			const skin = new $bog_gamengine_shader_skin()
			const solid = new $bog_gamengine_shader_solid()
			$mol_assert_equal( Object.keys( skin.face().pipe ), Object.keys( solid.face().pipe ) )
			$mol_assert_equal( Object.keys( skin.face().output ), Object.keys( solid.face().output ) )
			$mol_assert_equal( skin.frag(), solid.frag() )
			$mol_assert_equal( skin.depth(), true )
		},

		'every pipe name is in both vert and frag'( $ ) {
			const shader = new $bog_gamengine_shader_skin
			const face = shader.face()
			for( const name in face.pipe ) {
				$mol_assert_ok( shader.vert().includes( name ) )
				$mol_assert_ok( shader.frag().includes( name ) )
			}
		},

	})
}
