namespace $ {

	export async function $bog_gamengine_live_check(
		root = $node.process.cwd(),
		flags: readonly string[] = $bog_gamengine_studio_probe_flags,
	) {
		return await $bog_gamengine_studio_probe_live( root, flags )
	}

}
