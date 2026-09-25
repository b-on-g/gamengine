namespace $ {

	export type $bog_gamengine_look_base_keep = {
		readonly [ scene: string ]: $bog_gamengine_look_shot
	}

	export const $bog_gamengine_look_machine = {
		soft: 'ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (LLVM 10.0.0) (0x0000C0DE)), SwiftShader driver)',
		gpu: 'ANGLE (Apple, ANGLE Metal Renderer: Apple M4 Pro, Unspecified Version)',
	}

	export const $bog_gamengine_look_env = {
		at: '2026-09-25',
		pair: [ 'soft', 'gpu' ] as const,
		level: 2,
		share: 0.0001,
		sat: 0.06,
		spot: 2,
		same_way: 4,
		note: 'конверт замерен по одной паре машин и намеренно тесен: выход за него требует объяснения, а объяснение «просто другая машина» расширяет конверт новым замером с датой и строкой рендерера',
	}

	export const $bog_gamengine_look_base = {

		at: '2026-09-25',

		commit: '050ed25',

		soft: {
			flat: {
				median: 61, low: 58, high: 108, dark: 0.0599, blown: 0, sat: 43.24,
				spots: {
					wall: [ 199, 84, 45, 255 ],
					floor: [ 59, 59, 65, 255 ],
					hero: [ 227, 211, 166, 255 ],
					coin: [ 230, 216, 58, 255 ],
					outside: [ 12, 12, 16, 255 ],
				},
			},
			room: {
				median: 68, low: 11, high: 98, dark: 0.3871, blown: 0, sat: 29.84,
				spots: {
					lit: [ 196, 113, 88, 255 ],
					shade: [ 148, 90, 77, 255 ],
					floor: [ 94, 94, 102, 255 ],
					far: [ 116, 106, 102, 255 ],
					sky: [ 12, 12, 16, 255 ],
				},
			},
			shine: {
				median: 70, low: 11, high: 128, dark: 0.3773, blown: 0, sat: 32.11,
				spots: {
					lit: [ 220, 152, 126, 255 ],
					shade: [ 177, 109, 92, 255 ],
					floor: [ 94, 94, 102, 255 ],
					far: [ 182, 128, 115, 255 ],
					sky: [ 12, 12, 16, 255 ],
				},
			},
		} as $bog_gamengine_look_base_keep,

		gpu: {
			flat: {
				median: 60, low: 58, high: 107, dark: 0.0599, blown: 0, sat: 43.3,
				spots: {
					wall: [ 199, 84, 45, 255 ],
					floor: [ 59, 59, 65, 255 ],
					hero: [ 227, 211, 166, 255 ],
					coin: [ 230, 216, 57, 255 ],
					outside: [ 12, 12, 16, 255 ],
				},
			},
			room: {
				median: 68, low: 11, high: 98, dark: 0.3872, blown: 0, sat: 29.8,
				spots: {
					lit: [ 196, 113, 89, 255 ],
					shade: [ 148, 90, 78, 255 ],
					floor: [ 94, 94, 101, 255 ],
					far: [ 116, 106, 102, 255 ],
					sky: [ 12, 12, 16, 255 ],
				},
			},
			shine: {
				median: 70, low: 11, high: 127, dark: 0.3774, blown: 0, sat: 32.07,
				spots: {
					lit: [ 220, 152, 127, 255 ],
					shade: [ 177, 109, 92, 255 ],
					floor: [ 94, 94, 101, 255 ],
					far: [ 182, 128, 115, 255 ],
					sky: [ 12, 12, 16, 255 ],
				},
			},
		} as $bog_gamengine_look_base_keep,

	}

}
