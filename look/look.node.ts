namespace $ {

	export const $bog_jumper_look_page = 'bog/jumper/app/-/index.html'

	export const $bog_jumper_look_scenes: readonly $bog_gamengine_look_scene[] = [
		{
			name: 'level',
			mark: 'lives 3',
			spots: {
				sky: [ 0.5, 0.15 ],
				ground: [ 0.3, 0.96 ],
				hero: [ 0.025, 0.861 ],
			},
		},
	]

	export const $bog_jumper_look_base = {

		at: '2026-09-25',

		commit: '3732d8a',

		soft: {
			level: {
				median: 204, low: 168, high: 204, dark: 0, blown: 0, sat: 71.61,
				spots: {
					sky: [ 161, 214, 230, 255 ],
					ground: [ 143, 86, 45, 255 ],
					hero: [ 220, 58, 58, 255 ],
				},
			},
		} as $bog_gamengine_look_base_keep,

		gpu: {
			level: {
				median: 204, low: 168, high: 204, dark: 0, blown: 0, sat: 71.61,
				spots: {
					sky: [ 161, 214, 230, 255 ],
					ground: [ 143, 86, 45, 255 ],
					hero: [ 220, 57, 57, 255 ],
				},
			},
		} as $bog_gamengine_look_base_keep,

	}

	export async function $bog_jumper_look_say(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_look_soft_flags,
	) {
		return await $bog_gamengine_look_say( root, flags, $bog_jumper_look_page, $bog_jumper_look_scenes )
	}

	export async function $bog_jumper_look_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_look_soft_flags,
	) {
		return await $bog_gamengine_look_check(
			root,
			flags,
			$bog_jumper_look_page,
			$bog_jumper_look_scenes,
			$bog_jumper_look_base,
		)
	}

}
