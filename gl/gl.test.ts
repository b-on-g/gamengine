namespace $ {
	$mol_test({

		'source starts with version line'( $ ) {
			const source = $bog_gamengine_gl_source( {}, 'void main() {}', 'void main() {}' )
			$mol_assert_ok( source.vert.startsWith( '#version 300 es\n' ) )
			$mol_assert_ok( source.frag.startsWith( '#version 300 es\n' ) )
		},

		'glob goes to both shaders as uniform'( $ ) {
			const source = $bog_gamengine_gl_source( { glob: { proj: 'mat4' } }, '', '' )
			$mol_assert_ok( source.vert.includes( 'uniform mat4 proj;\n' ) )
			$mol_assert_ok( source.frag.includes( 'uniform mat4 proj;\n' ) )
		},

		'input goes to vert only as in'( $ ) {
			const source = $bog_gamengine_gl_source( { input: { vertex: 'vec3' } }, '', '' )
			$mol_assert_ok( source.vert.includes( 'in vec3 vertex;\n' ) )
			$mol_assert_not( source.frag.includes( 'vertex' ) )
		},

		'pipe is out in vert and in in frag'( $ ) {
			const source = $bog_gamengine_gl_source( { pipe: { pipe_tint: 'vec4' } }, '', '' )
			$mol_assert_ok( source.vert.includes( 'out vec4 pipe_tint;\n' ) )
			$mol_assert_ok( source.frag.includes( 'in vec4 pipe_tint;\n' ) )
		},

		'output goes to frag only as out'( $ ) {
			const source = $bog_gamengine_gl_source( { output: { color: 'vec4' } }, '', '' )
			$mol_assert_ok( source.frag.includes( 'out vec4 color;\n' ) )
			$mol_assert_not( source.vert.includes( 'color' ) )
		},

		'entry text ends the source'( $ ) {
			const source = $bog_gamengine_gl_source( {}, 'void main() { v }', 'void main() { f }' )
			$mol_assert_ok( source.vert.endsWith( 'void main() { v }' ) )
			$mol_assert_ok( source.frag.endsWith( 'void main() { f }' ) )
		},

	})
}
