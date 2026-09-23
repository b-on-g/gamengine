namespace $ {

	export class $bog_gamengine_shader_depth extends $bog_gamengine_shader {

		face() {
			return {
				glob: {
					shadow_mat: 'mat4',
				},
				input: {
					vertex: 'vec3',
					uv: 'vec2',
					normal: 'vec3',
					inst_trans: 'mat4',
					inst_tint: 'vec4',
					inst_layer: 'float',
					inst_uv: 'vec4',
					inst_material: 'vec4',
					inst_normal_layer: 'float',
				},
			} as const
		}

		vert() {
			return `
				void main() {
					gl_Position = shadow_mat * inst_trans * vec4( vertex, 1.0 );
				}
			`
		}

		frag() {
			return `
				void main() {}
			`
		}

	}

}
