namespace $ {

	export class $bog_gamengine_shader_sprite extends $bog_gamengine_shader {

		face() {
			return {
				glob: { proj: 'mat4', view: 'mat4', atlas: 'sampler2DArray' },
				input: { vertex: 'vec3', uv: 'vec2', inst_trans: 'mat4', inst_tint: 'vec4', inst_layer: 'float', inst_uv: 'vec4' },
				pipe: { pipe_uv: 'vec2', pipe_layer: 'float', pipe_tint: 'vec4' },
				output: { color: 'vec4' },
			} as const
		}

		vert() {
			return `
				void main() {
					gl_Position = proj * view * inst_trans * vec4( vertex, 1.0 );
					pipe_uv = uv * inst_uv.zw + inst_uv.xy;
					pipe_layer = inst_layer;
					pipe_tint = inst_tint;
				}
			`
		}

		frag() {
			return `
				void main() {
					color = texture( atlas, vec3( pipe_uv, pipe_layer ) ) * pipe_tint;
				}
			`
		}

	}

}
