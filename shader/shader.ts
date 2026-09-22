namespace $ {

	export class $bog_gamengine_shader extends $mol_object2 {

		programs = new WeakMap< $mol_3d_context, $mol_3d_program< $mol_3d_program_face > >()

		face(): $mol_3d_program_face {
			return {}
		}

		vert() {
			return `void main() {}`
		}

		frag() {
			return `void main() {}`
		}

		@ $mol_mem
		sources() {
			return {
				vert: $mol_3d_glsl_both + this.vert(),
				frag: $mol_3d_glsl_both + this.frag(),
			}
		}

		program( context: $mol_3d_context ): $mol_3d_program< ReturnType< this[ 'face' ] > > {
			let program = this.programs.get( context )
			if( !program ) {
				const sources = this.sources()
				program = context.program( this.face(), sources.vert, sources.frag )
				this.programs.set( context, program )
			}
			return program as $mol_3d_program< ReturnType< this[ 'face' ] > >
		}

	}

}
