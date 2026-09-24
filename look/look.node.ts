namespace $ {

	export const $bog_legion_look_page = 'bog/legion/app/-/index.html'

	export const $bog_legion_look_scenes: readonly $bog_gamengine_look_scene[] = [
		{
			name: 'field',
			mark: 'mine 50',
			click: '[bog_legion_app_pause_switch]',
			spots: {
				grass: [ 0.5, 0.35 ],
				wall: [ 0.5, 0.15 ],
				unit: [ 0.1, 0.43 ],
				gold: [ 0.485, 0.47 ],
			},
		},
	]

	export const $bog_legion_look_base = {

		at: '2026-09-25',

		commit: '5d60da7',

		soft: {
			field: {
				median: 65, low: 55, high: 109, dark: 0, blown: 0, sat: 18.26,
				spots: {
					grass: [ 51, 67, 54, 255 ],
					wall: [ 107, 101, 100, 255 ],
					unit: [ 78, 146, 207, 255 ],
					gold: [ 224, 205, 63, 255 ],
				},
			},
		} as $bog_gamengine_look_base_keep,

		gpu: {
			field: {
				median: 65, low: 55, high: 108, dark: 0, blown: 0, sat: 18.29,
				spots: {
					grass: [ 51, 67, 54, 255 ],
					wall: [ 105, 100, 99, 255 ],
					unit: [ 77, 146, 206, 255 ],
					gold: [ 224, 205, 62, 255 ],
				},
			},
		} as $bog_gamengine_look_base_keep,

	}

	export async function $bog_legion_look_say(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_look_soft_flags,
	) {
		return await $bog_gamengine_look_say( root, flags, $bog_legion_look_page, $bog_legion_look_scenes )
	}

	export async function $bog_legion_look_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_look_soft_flags,
	) {
		return await $bog_gamengine_look_check(
			root,
			flags,
			$bog_legion_look_page,
			$bog_legion_look_scenes,
			$bog_legion_look_base,
		)
	}

}
