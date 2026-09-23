namespace $ {

	export class $bog_gamengine_shader_post_vignette extends $bog_gamengine_shader_post {

		frag() {
			return `
				void main() {
					vec4 base = texture( source, pipe_uv );
					float away = length( pipe_uv - vec2( 0.5 ) );
					float keep = mix( 0.7, 1.0, smoothstep( 0.85, 0.35, away ) );
					color = vec4( base.rgb * keep, base.a );
				}
			`
		}

	}

}
