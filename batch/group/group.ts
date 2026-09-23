namespace $ {

	export type $bog_gamengine_batch_group_node = $bog_gamengine_batch_node & {
		atlas(): $bog_gamengine_atlas | null
	}

	export type $bog_gamengine_batch_group_part = {
		key: string
		shader: $bog_gamengine_shader
		shape: $bog_gamengine_shape
		atlas: $bog_gamengine_atlas | null
		nodes: $bog_gamengine_batch_group_node[]
	}

	const group_ids = new WeakMap< object, string >()
	let group_id_last = 0

	export function $bog_gamengine_batch_group_id( item: object | null ) {
		if( !item ) return '0'
		let id = group_ids.get( item )
		if( !id ) group_ids.set( item, id = String( ++ group_id_last ) )
		return id
	}

	export function $bog_gamengine_batch_group(
		nodes: readonly $bog_gamengine_batch_group_node[],
		shader: ( node: $bog_gamengine_batch_group_node )=> $bog_gamengine_shader,
		shape: ( node: $bog_gamengine_batch_group_node )=> $bog_gamengine_shape,
	) {
		const parts = new Map< string, $bog_gamengine_batch_group_part >()
		for( const node of nodes ) {
			const node_shader = shader( node )
			const node_shape = shape( node )
			const atlas = node.atlas()
			const key = $bog_gamengine_batch_group_id( node_shader )
				+ ' ' + $bog_gamengine_batch_group_id( node_shape )
				+ ' ' + $bog_gamengine_batch_group_id( atlas )
			const part = parts.get( key )
			if( part ) part.nodes.push( node )
			else parts.set( key, { key, shader: node_shader, shape: node_shape, atlas, nodes: [ node ] } )
		}
		return [ ... parts.values() ] as readonly $bog_gamengine_batch_group_part[]
	}

}
