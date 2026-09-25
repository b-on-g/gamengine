namespace $ {

	export const $bog_gamengine_demo_shooter_look_page = 'bog/gamengine/demo/-/index.html#!demo=shooter'

	export const $bog_gamengine_demo_shooter_look_scenes: readonly $bog_gamengine_look_scene[] = [
		{
			name: 'arena',
			demo: 'shooter',
			mark: 'shots 0',
			click: '[bog_gamengine_demo_shooter_pause]',
			spots: {
				wall: [ 0.19, 0.48 ],
				target: [ 0.5, 0.56 ],
				floor: [ 0.59, 0.89 ],
				sky: [ 0.5, 0.08 ],
				far: [ 0.64, 0.52 ],
			},
		},
	]

	export const $bog_gamengine_demo_shooter_look_base = {

		at: '2026-09-25',

		commit: 'fed05fa',

		soft: {
			arena: {
				median: 60, low: 12, high: 127, dark: 0.3517, blown: 0, sat: 50.11,
				spots: {
					wall: [ 197, 94, 61, 255 ],
					target: [ 178, 25, 25, 255 ],
					floor: [ 127, 127, 137, 255 ],
					sky: [ 12, 12, 16, 255 ],
					far: [ 150, 57, 37, 255 ],
				},
			},
		} as $bog_gamengine_look_base_keep,

		gpu: {
			arena: {
				median: 60, low: 12, high: 127, dark: 0.3518, blown: 0, sat: 50.12,
				spots: {
					wall: [ 197, 94, 61, 255 ],
					target: [ 178, 25, 25, 255 ],
					floor: [ 127, 127, 137, 255 ],
					sky: [ 12, 12, 16, 255 ],
					far: [ 150, 57, 37, 255 ],
				},
			},
		} as $bog_gamengine_look_base_keep,

	}

	export async function $bog_gamengine_demo_shooter_look_say(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_look_soft_flags,
	) {
		return await $bog_gamengine_look_say( root, flags, $bog_gamengine_demo_shooter_look_page, $bog_gamengine_demo_shooter_look_scenes )
	}

	export async function $bog_gamengine_demo_shooter_look_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_look_soft_flags,
	) {
		return await $bog_gamengine_look_check(
			root,
			flags,
			$bog_gamengine_demo_shooter_look_page,
			$bog_gamengine_demo_shooter_look_scenes,
			$bog_gamengine_demo_shooter_look_base,
		)
	}

}
