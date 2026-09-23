namespace $ {

	export class $bog_gamengine_shader_solid extends $bog_gamengine_shader {

		face() {
			return {
				glob: {
					proj: 'mat4',
					view: 'mat4',
					atlas: 'sampler2DArray',
					light_count: 'int',
					light_pos: 'vec4[8]',
					light_dir: 'vec4[8]',
					light_color: 'vec4[8]',
					ambient: 'vec3',
					cam_pos: 'vec3',
					wireframe: 'float',
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
				pipe: {
					pipe_uv: 'vec2',
					pipe_layer: 'float',
					pipe_tint: 'vec4',
					pipe_normal: 'vec3',
					pipe_pos: 'vec3',
					pipe_material: 'vec4',
					pipe_normal_layer: 'float',
				},
				output: { color: 'vec4' },
			} as const
		}

		depth() {
			return true
		}

		vert() {
			return `
				void main() {
					vec4 world = inst_trans * vec4( vertex, 1.0 );
					gl_Position = proj * view * world;
					if( wireframe > 0.5 ) gl_Position.z -= 0.001;
					pipe_pos = world.xyz;
					pipe_normal = normalize( mat3( inst_trans ) * normal );
					pipe_uv = uv * inst_uv.zw + inst_uv.xy;
					pipe_layer = inst_layer;
					pipe_tint = inst_tint;
					pipe_material = inst_material;
					pipe_normal_layer = inst_normal_layer;
				}
			`
		}

		frag() {
			return `
				vec3 perturb( vec3 normal, vec3 bump, vec3 pos, vec2 uv ) {
					vec3 dpx = dFdx( pos );
					vec3 dpy = dFdy( pos );
					vec2 dux = dFdx( uv );
					vec2 duy = dFdy( uv );
					vec3 px = cross( dpy, normal );
					vec3 py = cross( normal, dpx );
					vec3 tangent = px * dux.x + py * duy.x;
					vec3 bitangent = px * dux.y + py * duy.y;
					float scale = inversesqrt( max( dot( tangent, tangent ), dot( bitangent, bitangent ) ) );
					return normalize( mat3( tangent * scale, bitangent * scale, normal ) * bump );
				}
				void main() {
					if( wireframe > 0.5 ) {
						color = vec4( 1.0 );
						return;
					}
					vec4 base = texture( atlas, vec3( pipe_uv, pipe_layer ) ) * pipe_tint;
					vec3 normal = normalize( pipe_normal );
					if( pipe_normal_layer >= 0.0 ) {
						vec3 bump = texture( atlas, vec3( pipe_uv, pipe_normal_layer ) ).xyz * 2.0 - 1.0;
						normal = perturb( normal, bump, pipe_pos, pipe_uv );
					}
					vec3 eye = normalize( cam_pos - pipe_pos );
					float metallic = pipe_material.x;
					float roughness = max( pipe_material.y, 0.05 );
					vec3 albedo = base.rgb;
					vec3 f0 = mix( vec3( 0.04 ), albedo, metallic );
					vec3 diffuse = albedo * ( 1.0 - metallic );
					vec3 sum = albedo * ( ambient + pipe_material.z );
					for( int i = 0; i < 8; ++ i ) {
						if( i < light_count ) {
							vec3 way = light_pos[ i ].xyz - pipe_pos;
							float dist = length( way );
							vec3 aim = normalize( light_dir[ i ].xyz );
							vec3 light = - aim;
							float atten = 1.0;
							if( light_pos[ i ].w > 0.5 ) {
								light = way / max( dist, 0.0001 );
								atten = bog_gamengine_pbr_window( dist, light_color[ i ].w );
								if( light_dir[ i ].w > -0.5 ) atten *= bog_gamengine_pbr_cone( dot( - light, aim ), light_dir[ i ].w );
							}
							float ndl = max( dot( normal, light ), 0.0 );
							if( ndl > 0.0 && atten > 0.0 ) {
								sum += bog_gamengine_pbr_brdf( normal, eye, light, diffuse, f0, roughness ) * light_color[ i ].rgb * ( atten * ndl );
							}
						}
					}
					color = vec4( sum, base.a );
				}
			`
		}

	}

}
