namespace $ {

	export class $bog_gamengine_spike_s1_good extends Object {

		static left_face = {
			glob: { shift: 'vec2', tint: 'vec4' },
			input: { vertex: 'vec2' },
			output: { color: 'vec4' },
		} as const

		static right_face = {
			glob: { shift: 'vec2', scale: 'float' },
			input: { vertex: 'vec2', hue: 'vec3' },
			pipe: { pipe_hue: 'vec3' },
			output: { color: 'vec4' },
		} as const

		static left( context: $mol_3d_context ) {
			return context.program( this.left_face,
				$mol_3d_glsl_both + `
					void main() {
						gl_Position = vec4( vertex + shift, 0.0, 1.0 );
					}
				`,
				$mol_3d_glsl_both + `
					void main() {
						color = tint;
					}
				`,
			)
		}

		static right( context: $mol_3d_context ) {
			return context.program( this.right_face,
				$mol_3d_glsl_both + `
					void main() {
						gl_Position = vec4( vertex * scale + shift, 0.0, 1.0 );
						pipe_hue = hue;
					}
				`,
				$mol_3d_glsl_both + `
					void main() {
						color = vec4( pipe_hue, 1.0 );
					}
				`,
			)
		}

	}

}
