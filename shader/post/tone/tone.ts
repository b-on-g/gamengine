namespace $ {

	export class $bog_gamengine_shader_post_tone extends $bog_gamengine_shader_post {

		frag() {
			return `
				vec3 aces( vec3 hue ) {
					vec3 top = hue * ( 2.51 * hue + 0.03 );
					vec3 bottom = hue * ( 2.43 * hue + 0.59 ) + 0.14;
					return top / bottom;
				}
				void main() {
					vec4 base = texture( source, pipe_uv );
					vec3 white = aces( vec3( 1.0 ) );
					color = vec4( clamp( aces( max( base.rgb, vec3( 0.0 ) ) ) / white, 0.0, 1.0 ), base.a );
				}
			`
		}

	}

}
