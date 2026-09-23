namespace $ {

	export type $bog_gamengine_spike_rapier_core_vec = {
		readonly x: number
		readonly y: number
		readonly z: number
	}

	export type $bog_gamengine_spike_rapier_core_quat = $bog_gamengine_spike_rapier_core_vec & {
		readonly w: number
	}

	export type $bog_gamengine_spike_rapier_core_body = {
		translation(): $bog_gamengine_spike_rapier_core_vec
		rotation(): $bog_gamengine_spike_rapier_core_quat
		isSleeping(): boolean
	}

	export type $bog_gamengine_spike_rapier_core_body_desc = {
		setTranslation( x: number, y: number, z: number ): $bog_gamengine_spike_rapier_core_body_desc
	}

	export type $bog_gamengine_spike_rapier_core_shape_desc = {
		setTranslation( x: number, y: number, z: number ): $bog_gamengine_spike_rapier_core_shape_desc
	}

	export type $bog_gamengine_spike_rapier_core_world = {
		timestep: number
		step(): void
		createRigidBody( desc: $bog_gamengine_spike_rapier_core_body_desc ): $bog_gamengine_spike_rapier_core_body
		createCollider( desc: $bog_gamengine_spike_rapier_core_shape_desc, body?: $bog_gamengine_spike_rapier_core_body ): unknown
		free(): void
	}

	export type $bog_gamengine_spike_rapier_core_api = {
		init(): Promise< void >
		version(): string
		World: new ( gravity: $bog_gamengine_spike_rapier_core_vec )=> $bog_gamengine_spike_rapier_core_world
		RigidBodyDesc: { dynamic(): $bog_gamengine_spike_rapier_core_body_desc }
		ColliderDesc: { cuboid( hx: number, hy: number, hz: number ): $bog_gamengine_spike_rapier_core_shape_desc }
	}

	export function $bog_gamengine_spike_rapier_core(): $bog_gamengine_spike_rapier_core_api {
		const lib = $node
		return lib[ '../bog/gamengine/spike/rapier/core/rapier' ]
	}

}
