namespace $ {

	export class $bog_gamengine_shader_post_bloom_bright extends $bog_gamengine_shader_post {

		frag() {
			return `
				void main() {
					vec3 base = max( texture( source, pipe_uv ).rgb, vec3( 0.0 ) );
					float power = max( max( base.r, base.g ), base.b );
					float over = max( power - 0.13, 0.0 );
					color = vec4( base * ( over / max( power, 0.0001 ) ), 1.0 );
				}
			`
		}

	}

	export class $bog_gamengine_shader_post_bloom_blur extends $bog_gamengine_shader_post {

		across() {
			return false
		}

		frag() {
			return `
				void main() {
					vec2 hop = vec2( ${ this.across() ? '0.0, 1.0' : '1.0, 0.0' } ) * texel;
					vec3 sum = texture( source, pipe_uv ).rgb * 0.227027;
					sum += ( texture( source, pipe_uv + hop * 1.384615 ).rgb + texture( source, pipe_uv - hop * 1.384615 ).rgb ) * 0.316216;
					sum += ( texture( source, pipe_uv + hop * 3.230769 ).rgb + texture( source, pipe_uv - hop * 3.230769 ).rgb ) * 0.070270;
					color = vec4( sum, 1.0 );
				}
			`
		}

	}

	export class $bog_gamengine_shader_post_bloom_blur_across extends $bog_gamengine_shader_post_bloom_blur {

		across() {
			return true
		}

	}

	export class $bog_gamengine_shader_post_bloom extends $bog_gamengine_shader_post {

		bright = new $bog_gamengine_shader_post_bloom_bright
		blur_along = new $bog_gamengine_shader_post_bloom_blur
		blur_across = new $bog_gamengine_shader_post_bloom_blur_across

		face() {
			return {
				glob: {
					source: 'sampler2D',
					texel: 'vec2',
					extra: 'sampler2D',
				},
				pipe: {
					pipe_uv: 'vec2',
				},
				output: { color: 'vec4' },
			} as const
		}

		frag() {
			return `
				void main() {
					vec4 base = texture( source, pipe_uv );
					vec3 glow = texture( extra, pipe_uv ).rgb;
					color = vec4( base.rgb + glow * 1.3, base.a );
				}
			`
		}

		steps(): readonly $bog_gamengine_shader_post_step[] {
			return [
				{ shader: this.bright, scale: 2, from: 'in', extra: null },
				{ shader: this.blur_along, scale: 2, from: 'prev', extra: null },
				{ shader: this.blur_across, scale: 2, from: 'prev', extra: null },
				{ shader: this, scale: 1, from: 'in', extra: 'prev' },
			]
		}

	}

}
