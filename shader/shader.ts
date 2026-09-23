namespace $ {

	export class $bog_gamengine_shader extends $mol_object2 {

		programs = new WeakMap< WebGL2RenderingContext, $bog_gamengine_gl_program< $bog_gamengine_gl_face > >()

		face(): $bog_gamengine_gl_face {
			return {}
		}

		vert() {
			return `void main() {}`
		}

		frag() {
			return `void main() {}`
		}

		depth() {
			return false
		}

		@ $mol_mem
		sources() {
			return {
				vert: $mol_3d_glsl_both + this.vert(),
				frag: $mol_3d_glsl_both + this.frag(),
			}
		}

		program( gl: WebGL2RenderingContext ): $bog_gamengine_gl_program< ReturnType< this[ 'face' ] > > {
			let program = this.programs.get( gl )
			if( !program ) {
				const sources = this.sources()
				program = new $bog_gamengine_gl_program( gl, this.face(), sources.vert, sources.frag )
				this.programs.set( gl, program )
			}
			return program as $bog_gamengine_gl_program< ReturnType< this[ 'face' ] > >
		}

	}

}
