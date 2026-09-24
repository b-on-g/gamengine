namespace $ {

	export const $bog_shooter_look_page = 'bog/shooter/app/-/index.html'

	export const $bog_shooter_look_scenes: readonly $bog_gamengine_look_scene[] = [
		{
			name: 'arena',
			mark: 'shots 0',
			click: '[bog_shooter_app_pause]',
			spots: {
				wall: [ 0.19, 0.48 ],
				target: [ 0.5, 0.56 ],
				floor: [ 0.59, 0.89 ],
				sky: [ 0.5, 0.08 ],
				far: [ 0.64, 0.52 ],
			},
		},
	]

	export const $bog_shooter_look_base = {

		at: '2026-09-25',

		commit: '3f63f40',

		soft: {
			arena: {
				median: 58, low: 12, high: 125, dark: 0.3638, blown: 0, sat: 50.06,
				spots: {
					wall: [ 193, 89, 57, 255 ],
					target: [ 178, 25, 25, 255 ],
					floor: [ 130, 130, 139, 255 ],
					sky: [ 12, 12, 16, 255 ],
					far: [ 145, 54, 35, 255 ],
				},
			},
		} as $bog_gamengine_look_base_keep,

		gpu: {
			arena: {
				median: 58, low: 12, high: 125, dark: 0.3639, blown: 0, sat: 50.06,
				spots: {
					wall: [ 193, 89, 57, 255 ],
					target: [ 178, 25, 25, 255 ],
					floor: [ 129, 129, 139, 255 ],
					sky: [ 12, 12, 16, 255 ],
					far: [ 145, 54, 35, 255 ],
				},
			},
		} as $bog_gamengine_look_base_keep,

	}

	export async function $bog_shooter_look_say(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_look_soft_flags,
	) {
		return await $bog_gamengine_look_say( root, flags, $bog_shooter_look_page, $bog_shooter_look_scenes )
	}

	export async function $bog_shooter_look_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_look_soft_flags,
	) {
		return await $bog_gamengine_look_check(
			root,
			flags,
			$bog_shooter_look_page,
			$bog_shooter_look_scenes,
			$bog_shooter_look_base,
		)
	}

}
