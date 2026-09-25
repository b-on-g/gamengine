namespace $ {

	export type $bog_gamengine_demo_look_game = {
		readonly page: string
		readonly scenes: readonly $bog_gamengine_look_scene[]
		readonly base: typeof $bog_gamengine_look_base
	}

	export const $bog_gamengine_demo_look_games: Record< string, $bog_gamengine_demo_look_game > = {

		jumper: {
			page: 'bog/gamengine/demo/-/index.html#!demo=jumper',
			scenes: [
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
			],
			base: {
				at: '2026-09-25',
				commit: '050ed25',
				soft: {
					level: {
						median: 204, low: 172, high: 204, dark: 0, blown: 0, sat: 71.79,
						spots: {
							sky: [ 161, 214, 230, 255 ],
							ground: [ 143, 86, 45, 255 ],
							hero: [ 220, 58, 58, 255 ],
						},
					},
				} as $bog_gamengine_look_base_keep,
				gpu: {
					level: {
						median: 204, low: 170, high: 204, dark: 0, blown: 0, sat: 71.79,
						spots: {
							sky: [ 161, 214, 230, 255 ],
							ground: [ 143, 86, 45, 255 ],
							hero: [ 220, 57, 57, 255 ],
						},
					},
				} as $bog_gamengine_look_base_keep,
			},
		},

		shooter: {
			page: 'bog/gamengine/demo/-/index.html#!demo=shooter',
			scenes: [
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
			],
			base: {
				at: '2026-09-25',
				commit: '050ed25',
				soft: {
					arena: {
						median: 60, low: 12, high: 127, dark: 0.3517, blown: 0, sat: 50.06,
						spots: {
							wall: [ 198, 95, 61, 255 ],
							target: [ 178, 25, 25, 255 ],
							floor: [ 129, 129, 139, 255 ],
							sky: [ 12, 12, 16, 255 ],
							far: [ 149, 57, 36, 255 ],
						},
					},
				} as $bog_gamengine_look_base_keep,
				gpu: {
					arena: {
						median: 60, low: 12, high: 127, dark: 0.3517, blown: 0, sat: 50.06,
						spots: {
							wall: [ 198, 96, 61, 255 ],
							target: [ 178, 25, 25, 255 ],
							floor: [ 129, 129, 139, 255 ],
							sky: [ 12, 12, 16, 255 ],
							far: [ 149, 57, 36, 255 ],
						},
					},
				} as $bog_gamengine_look_base_keep,
			},
		},

		legion: {
			page: 'bog/gamengine/demo/-/index.html#!demo=legion',
			scenes: [
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
			],
			base: {
				at: '2026-09-25',
				commit: '050ed25',
				soft: {
					field: {
						median: 65, low: 56, high: 111, dark: 0, blown: 0, sat: 17.9,
						spots: {
							grass: [ 54, 70, 57, 255 ],
							wall: [ 103, 97, 95, 255 ],
							unit: [ 99, 174, 223, 255 ],
							gold: [ 215, 191, 50, 255 ],
						},
					},
				} as $bog_gamengine_look_base_keep,
				gpu: {
					field: {
						median: 65, low: 55, high: 111, dark: 0, blown: 0, sat: 17.9,
						spots: {
							grass: [ 54, 70, 57, 255 ],
							wall: [ 102, 95, 95, 255 ],
							unit: [ 99, 174, 223, 255 ],
							gold: [ 215, 190, 49, 255 ],
						},
					},
				} as $bog_gamengine_look_base_keep,
			},
		},

	}

	export function $bog_gamengine_demo_look_of( game: string ) {
		const found = $bog_gamengine_demo_look_games[ game ]
		if( !found ) return $mol_fail( new Error( `Нет подписи для демо ${ game }` ) )
		return found
	}

	export async function $bog_gamengine_demo_look_say(
		game: string,
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_look_soft_flags,
	) {
		const it = $bog_gamengine_demo_look_of( game )
		return await $bog_gamengine_look_say( root, flags, it.page, it.scenes )
	}

	export async function $bog_gamengine_demo_look_check(
		game: string,
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_look_soft_flags,
	) {
		const it = $bog_gamengine_demo_look_of( game )
		return await $bog_gamengine_look_check( root, flags, it.page, it.scenes, it.base )
	}

	export function $bog_gamengine_demo_look_check_jumper() {
		return $bog_gamengine_demo_look_check( 'jumper' )
	}

	export function $bog_gamengine_demo_look_check_shooter() {
		return $bog_gamengine_demo_look_check( 'shooter' )
	}

	export function $bog_gamengine_demo_look_check_legion() {
		return $bog_gamengine_demo_look_check( 'legion' )
	}

}
