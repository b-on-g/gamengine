namespace $ {

	const programs = new WeakMap< WebGL2RenderingContext, $bog_gamengine_gl_program< $bog_gamengine_gl_face > >()

	export class $bog_gamengine_shader_skin extends $bog_gamengine_shader_solid {

		programs = programs

		face() {
			const base = super.face()
			return {
				glob: { ... base.glob, bones: 'sampler2D' },
				input: { ... base.input, joints: 'vec4', weights: 'vec4' },
				pipe: { ... base.pipe },
				output: { ... base.output },
			} as const
		}

		vert() {
			return `
				mat4 bone( float index ) {
					int at = int( index );
					return mat4(
						texelFetch( bones, ivec2( 0, at ), 0 ),
						texelFetch( bones, ivec2( 1, at ), 0 ),
						texelFetch( bones, ivec2( 2, at ), 0 ),
						texelFetch( bones, ivec2( 3, at ), 0 )
					);
				}
				void main() {
					float total = weights.x + weights.y + weights.z + weights.w;
					mat4 pose = mat4( 1.0 );
					if( total > 0.0 ) {
						pose = (
							bone( joints.x ) * weights.x
							+ bone( joints.y ) * weights.y
							+ bone( joints.z ) * weights.z
							+ bone( joints.w ) * weights.w
						) * ( 1.0 / total );
					}
					mat4 model = inst_trans * pose;
					vec4 world = model * vec4( vertex, 1.0 );
					gl_Position = proj * view * world;
					if( wireframe > 0.5 ) gl_Position.z -= 0.001;
					pipe_pos = world.xyz;
					pipe_normal = normalize( mat3( model ) * normal );
					pipe_uv = uv * inst_uv.zw + inst_uv.xy;
					pipe_layer = inst_layer;
					pipe_tint = inst_tint;
					pipe_material = inst_material;
					pipe_normal_layer = inst_normal_layer;
				}
			`
		}

	}

}
