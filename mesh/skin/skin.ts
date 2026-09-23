namespace $ {

	export class $bog_gamengine_mesh_skin extends $bog_gamengine_mesh {

		@ $mol_mem
		skin( next?: $bog_gamengine_skin | null ) {
			return next ?? null
		}

		@ $mol_mem
		Shader() {
			return new this.$.$bog_gamengine_shader_skin
		}

		@ $mol_mem
		shader( next?: $bog_gamengine_shader | null ) {
			return next ?? this.Shader()
		}

		@ $mol_mem
		shape( next?: $bog_gamengine_shape ) {
			return next ?? this.skin()?.shape() ?? new $bog_gamengine_shape_box
		}

		bones() {
			return this.skin()?.pose() ?? null
		}

		step( dt: number ) {
			super.step( dt )
			this.skin()?.step( dt )
		}

	}

}
