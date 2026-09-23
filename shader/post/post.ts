namespace $ {

	export type $bog_gamengine_shader_post_step = {
		readonly shader: $bog_gamengine_shader_post
		readonly scale: number
		readonly from: 'in' | 'prev'
		readonly extra: 'in' | 'prev' | null
	}

	export class $bog_gamengine_shader_post extends $bog_gamengine_shader {

		face() {
			return {
				glob: {
					source: 'sampler2D',
					texel: 'vec2',
				},
				pipe: {
					pipe_uv: 'vec2',
				},
				output: { color: 'vec4' },
			} as const
		}

		vert() {
			return `
				void main() {
					vec2 corner = vec2( float( ( gl_VertexID << 1 ) & 2 ), float( gl_VertexID & 2 ) );
					pipe_uv = corner;
					gl_Position = vec4( corner * 2.0 - 1.0, 0.0, 1.0 );
				}
			`
		}

		frag() {
			return `
				void main() {
					color = texture( source, pipe_uv );
				}
			`
		}

		steps(): readonly $bog_gamengine_shader_post_step[] {
			return [ { shader: this, scale: 1, from: 'in', extra: null } ]
		}

	}

}
