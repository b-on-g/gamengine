namespace $ {

	export type $bog_gamengine_batch_group_node = $bog_gamengine_batch_node & {
		atlas(): $bog_gamengine_atlas | null
	}

	export function $bog_gamengine_batch_group(
		nodes: readonly $bog_gamengine_batch_group_node[],
		make: ( atlas: $bog_gamengine_atlas | null )=> $bog_gamengine_batch,
	) {
		const groups = new Map< $bog_gamengine_atlas | null, $bog_gamengine_batch_group_node[] >()
		for( const node of nodes ) {
			const atlas = node.atlas()
			const group = groups.get( atlas )
			if( group ) group.push( node )
			else groups.set( atlas, [ node ] )
		}
		const batches = [] as $bog_gamengine_batch[]
		for( const [ atlas, group ] of groups ) {
			const batch = make( atlas )
			batch.nodes( group )
			batches.push( batch )
		}
		return batches as readonly $bog_gamengine_batch[]
	}

}
