namespace $ {

	export const $bog_gamengine_demo_jumper_look_page = 'bog/gamengine/demo/-/index.html#!demo=jumper'

	export const $bog_gamengine_demo_jumper_look_scenes: readonly $bog_gamengine_look_scene[] = [
		{
			name: 'level',
			demo: 'jumper',
			mark: 'lives 3',
			spots: {
				sky: [ 0.5, 0.15 ],
				ground: [ 0.3, 0.96 ],
				hero: [ 0.025, 0.861 ],
			},
		},
	]

	export const $bog_gamengine_demo_jumper_look_base = {

		at: '2026-09-25',

		commit: 'ab4ce86',

		soft: {
			level: {
				median: 204, low: 172, high: 204, dark: 0, blown: 0, sat: 71.79,
				spots: {
					sky: [ 161, 214, 230, 255 ],
					ground: [ 105, 57, 30, 255 ],
					hero: [ 220, 58, 58, 255 ],
				},
			},
		} as $bog_gamengine_look_base_keep,

		gpu: {
			level: {
				median: 204, low: 170, high: 204, dark: 0, blown: 0, sat: 71.79,
				spots: {
					sky: [ 161, 214, 230, 255 ],
					ground: [ 106, 58, 30, 255 ],
					hero: [ 220, 57, 57, 255 ],
				},
			},
		} as $bog_gamengine_look_base_keep,

	}

	export async function $bog_gamengine_demo_jumper_look_say(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_look_soft_flags,
	) {
		return await $bog_gamengine_look_say( root, flags, $bog_gamengine_demo_jumper_look_page, $bog_gamengine_demo_jumper_look_scenes )
	}

	export async function $bog_gamengine_demo_jumper_look_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_look_soft_flags,
	) {
		return await $bog_gamengine_look_check(
			root,
			flags,
			$bog_gamengine_demo_jumper_look_page,
			$bog_gamengine_demo_jumper_look_scenes,
			$bog_gamengine_demo_jumper_look_base,
		)
	}

}
