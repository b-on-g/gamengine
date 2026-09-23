namespace $ {

	export class $bog_gamengine_shader_solid extends $bog_gamengine_shader {

		face() {
			return {
				glob: { proj: 'mat4', view: 'mat4', atlas: 'sampler2DArray', light_dir: 'vec3', ambient: 'float', wireframe: 'float' },
				input: { vertex: 'vec3', uv: 'vec2', normal: 'vec3', inst_trans: 'mat4', inst_tint: 'vec4', inst_layer: 'float', inst_uv: 'vec4' },
				pipe: { pipe_uv: 'vec2', pipe_layer: 'float', pipe_tint: 'vec4', pipe_normal: 'vec3' },
				output: { color: 'vec4' },
			} as const
		}

		depth() {
			return true
		}

		vert() {
			return `
				void main() {
					gl_Position = proj * view * inst_trans * vec4( vertex, 1.0 );
					if( wireframe > 0.5 ) gl_Position.z -= 0.001;
					pipe_normal = normalize( mat3( inst_trans ) * normal );
					pipe_uv = uv * inst_uv.zw + inst_uv.xy;
					pipe_layer = inst_layer;
					pipe_tint = inst_tint;
				}
			`
		}

		frag() {
			return `
				void main() {
					if( wireframe > 0.5 ) {
						color = vec4( 1.0 );
						return;
					}
					float light = ambient + ( 1.0 - ambient ) * max( dot( normalize( pipe_normal ), normalize( light_dir ) ), 0.0 );
					color = texture( atlas, vec3( pipe_uv, pipe_layer ) ) * pipe_tint * vec4( light, light, light, 1.0 );
				}
			`
		}

	}

}
