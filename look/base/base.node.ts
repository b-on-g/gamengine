namespace $ {

	export type $bog_gamengine_look_base_keep = {
		readonly [ scene: string ]: $bog_gamengine_look_shot
	}

	export const $bog_gamengine_look_machine = {
		soft: 'ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (LLVM 10.0.0) (0x0000C0DE)), SwiftShader driver)',
		gpu: 'ANGLE (Apple, ANGLE Metal Renderer: Apple M4 Pro, Unspecified Version)',
	}

	export const $bog_gamengine_look_base = {

		at: '2026-09-25',

		commit: 'f1bc287',

		soft: {
			flat: {
				median: 60, low: 58, high: 107, dark: 0.061, blown: 0, sat: 43.2,
				spots: {
					wall: [ 199, 85, 45, 255 ],
					floor: [ 59, 59, 64, 255 ],
					hero: [ 227, 211, 166, 255 ],
					coin: [ 230, 216, 58, 255 ],
					outside: [ 12, 12, 16, 255 ],
				},
			},
			room: {
				median: 68, low: 11, high: 98, dark: 0.3873, blown: 0, sat: 29.81,
				spots: {
					lit: [ 192, 110, 88, 255 ],
					shade: [ 138, 95, 85, 255 ],
					floor: [ 93, 94, 101, 255 ],
					far: [ 123, 104, 99, 255 ],
					sky: [ 12, 12, 16, 255 ],
				},
			},
			shine: {
				median: 70, low: 11, high: 128, dark: 0.3774, blown: 0, sat: 32.07,
				spots: {
					lit: [ 219, 151, 127, 255 ],
					shade: [ 170, 113, 99, 255 ],
					floor: [ 93, 94, 101, 255 ],
					far: [ 183, 128, 114, 255 ],
					sky: [ 12, 12, 16, 255 ],
				},
			},
		} as $bog_gamengine_look_base_keep,

		gpu: {
			flat: {
				median: 60, low: 58, high: 107, dark: 0.061, blown: 0, sat: 43.22,
				spots: {
					wall: [ 199, 85, 45, 255 ],
					floor: [ 59, 59, 64, 255 ],
					hero: [ 227, 211, 166, 255 ],
					coin: [ 230, 216, 57, 255 ],
					outside: [ 12, 12, 16, 255 ],
				},
			},
			room: {
				median: 68, low: 11, high: 98, dark: 0.3873, blown: 0, sat: 29.79,
				spots: {
					lit: [ 192, 110, 89, 255 ],
					shade: [ 138, 95, 85, 255 ],
					floor: [ 93, 94, 101, 255 ],
					far: [ 123, 104, 99, 255 ],
					sky: [ 12, 12, 16, 255 ],
				},
			},
			shine: {
				median: 70, low: 11, high: 128, dark: 0.3773, blown: 0, sat: 32.04,
				spots: {
					lit: [ 219, 150, 126, 255 ],
					shade: [ 170, 113, 99, 255 ],
					floor: [ 93, 94, 101, 255 ],
					far: [ 183, 128, 114, 255 ],
					sky: [ 12, 12, 16, 255 ],
				},
			},
		} as $bog_gamengine_look_base_keep,

	}

}
