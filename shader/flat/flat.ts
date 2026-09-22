namespace $ {

	export class $bog_gamengine_shader_flat extends $bog_gamengine_shader {

		face() {
			return {
				glob: { proj: 'mat4', view: 'mat4' },
				input: { vertex: 'vec3', inst_trans: 'mat4', inst_tint: 'vec4' },
				pipe: { pipe_tint: 'vec4' },
				output: { color: 'vec4' },
			} as const
		}

		vert() {
			return `
				void main() {
					gl_Position = proj * view * inst_trans * vec4( vertex, 1.0 );
					pipe_tint = inst_tint;
				}
			`
		}

		frag() {
			return `
				void main() {
					color = pipe_tint;
				}
			`
		}

	}

}
