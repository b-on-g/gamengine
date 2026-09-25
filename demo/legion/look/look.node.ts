namespace $ {

	export const $bog_gamengine_demo_legion_look_page = 'bog/gamengine/demo/-/index.html#!demo=legion'

	export const $bog_gamengine_demo_legion_look_scenes: readonly $bog_gamengine_look_scene[] = [
		{
			name: 'field',
			demo: 'legion',
			mark: 'mine 50',
			click: '[bog_gamengine_demo_legion_pause_switch]',
			spots: {
				grass: [ 0.5, 0.35 ],
				wall: [ 0.5, 0.15 ],
				unit: [ 0.1, 0.43 ],
				gold: [ 0.485, 0.47 ],
			},
		},
	]

	export const $bog_gamengine_demo_legion_look_base = {

		at: '2026-09-25',

		commit: '0056331',

		soft: {
			field: {
				median: 65, low: 55, high: 112, dark: 0, blown: 0, sat: 17.9,
				spots: {
					grass: [ 51, 67, 54, 255 ],
					wall: [ 107, 101, 100, 255 ],
					unit: [ 100, 174, 224, 255 ],
					gold: [ 222, 201, 59, 255 ],
				},
			},
		} as $bog_gamengine_look_base_keep,

		gpu: {
			field: {
				median: 65, low: 55, high: 111, dark: 0, blown: 0, sat: 17.91,
				spots: {
					grass: [ 51, 67, 54, 255 ],
					wall: [ 105, 100, 99, 255 ],
					unit: [ 100, 174, 224, 255 ],
					gold: [ 221, 201, 58, 255 ],
				},
			},
		} as $bog_gamengine_look_base_keep,

	}

	export async function $bog_gamengine_demo_legion_look_say(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_look_soft_flags,
	) {
		return await $bog_gamengine_look_say( root, flags, $bog_gamengine_demo_legion_look_page, $bog_gamengine_demo_legion_look_scenes )
	}

	export async function $bog_gamengine_demo_legion_look_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_look_soft_flags,
	) {
		return await $bog_gamengine_look_check(
			root,
			flags,
			$bog_gamengine_demo_legion_look_page,
			$bog_gamengine_demo_legion_look_scenes,
			$bog_gamengine_demo_legion_look_base,
		)
	}

}
