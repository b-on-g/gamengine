namespace $ {

	export class $bog_gamengine_spike_s1_bad_b extends Object {

		static face = {
			glob: { shift: 'vec2', scale: 'float' },
			input: { vertex: 'vec2', hue: 'vec3' },
			pipe: { tone: 'vec3' },
			output: { color: 'vec4' },
		} as const

		static program( context: $mol_3d_context ) {
			return context.func( 'bog_gamengine_spike_s1_bad_b', this.face )
		}

	}

}
