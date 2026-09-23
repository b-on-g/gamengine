namespace $ {

	export type $bog_gamengine_save_node = {
		title: string
		klass: string
		props: Record< string, unknown >
	}

	export type $bog_gamengine_save_data = {
		time: number
		nodes: $bog_gamengine_save_node[]
	}

	const vec_kinds = new Set([ 'vec2', 'vec3', 'vec4', 'euler' ])

	export function $bog_gamengine_save_dump( scene: $bog_gamengine_scene ): $bog_gamengine_save_data {
		const nodes = scene.nodes().map( node => {
			const props = {} as Record< string, unknown >
			for( const prop of node.props() ) {
				const value = prop.get()
				props[ prop.name ] = value instanceof Float32Array ? Array.from( value ) : value
			}
			return {
				title: node.title(),
				klass: scene.$.$mol_func_name( node.constructor as typeof $bog_gamengine_node ),
				props,
			}
		} )
		return { time: scene.clock().time(), nodes }
	}

	export function $bog_gamengine_save_load( scene: $bog_gamengine_scene, data: $bog_gamengine_save_data ) {
		const rest = new Map< string, $bog_gamengine_node[] >()
		for( const node of scene.nodes() ) {
			const title = node.title()
			const list = rest.get( title )
			if( list ) list.push( node )
			else rest.set( title, [ node ] )
		}
		for( const rec of data.nodes ) {
			const node = rest.get( rec.title )?.shift()
			if( !node ) continue
			for( const prop of node.props() ) {
				const value = rec.props[ prop.name ]
				if( value === undefined ) continue
				prop.set( vec_kinds.has( prop.kind ) && Array.isArray( value ) ? new Float32Array( value ) : value )
			}
		}
		const clock = scene.clock()
		clock.time()
		clock.time( data.time )
	}

	export function $bog_gamengine_save_slot( name: string, next?: $bog_gamengine_save_data | null ) {
		return $mol_state_local.value< $bog_gamengine_save_data >( 'bog_gamengine_save=' + name, next )
	}

}
