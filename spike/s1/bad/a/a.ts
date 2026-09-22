namespace $ {

	export class $bog_gamengine_spike_s1_bad_a extends Object {

		static face = {
			glob: { shift: 'vec2', tint: 'vec4' },
			input: { vertex: 'vec2' },
			output: { color: 'vec4' },
		} as const

		static program( context: $mol_3d_context ) {
			return context.func( 'bog_gamengine_spike_s1_bad_a', this.face )
		}

	}

}
