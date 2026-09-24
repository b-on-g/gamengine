namespace $ {

	export type $bog_gamengine_prefab_cell = {
		value: unknown
	}

	export type $bog_gamengine_prefab_mark = {
		prefab: $bog_gamengine_prefab
		id: string
		path: string
	}

	const marks = new WeakMap< $bog_gamengine_node, $bog_gamengine_prefab_mark >()

	export function $bog_gamengine_prefab_mark_of( node: $bog_gamengine_node ) {
		return marks.get( node ) ?? null
	}

	export class $bog_gamengine_prefab extends $mol_object2 {

		@ $mol_mem
		source( next?: $bog_gamengine_node | null ) {
			return next ?? null
		}

		@ $mol_mem
		ids( next?: readonly string[] ) {
			return next ?? []
		}

		key( id: string, path: string, prop: string ) {
			return path ? `${ id } ${ path }.${ prop }` : `${ id } ${ prop }`
		}

		@ $mol_mem_key
		over( key: string, next?: $bog_gamengine_prefab_cell | null ) {
			return next ?? null
		}

		set( id: string, prop: string, value: unknown, path = '' ) {
			this.over( this.key( id, path, prop ), { value } )
			return value
		}

		reset( id: string, prop: string, path = '' ) {
			this.over( this.key( id, path, prop ), null )
			return this
		}

		own( id: string, prop: string, path = '' ) {
			return this.over( this.key( id, path, prop ) ) !== null
		}

		@ $mol_mem_key
		Node( id: string ) {
			const source = this.source()
			if( !source ) return $mol_fail( new Error( `Prefab ${ this } has no source node` ) )
			return this.clone( source, id, '' )
		}

		@ $mol_mem
		nodes() {
			const ids = this.ids()
			const nodes = [] as $bog_gamengine_node[]
			for( let i = 0; i < ids.length; ++i ) nodes.push( this.Node( ids[ i ] ) )
			return nodes as readonly $bog_gamengine_node[]
		}

		clone( source: $bog_gamengine_node, id: string, path: string ): $bog_gamengine_node {

			const klass = source.constructor as new()=> $bog_gamengine_node
			const node = new klass
			const bind = node as unknown as Record< string, unknown >
			const from = source as unknown as Record< string, unknown >

			for( const name of Object.keys( source ) ) {
				const value = from[ name ]
				if( typeof value === 'function' ) bind[ name ] = value
			}

			for( const prop of source.props() ) {
				const key = this.key( id, path, prop.name )
				const get = prop.get
				bind[ prop.name ] = ( next?: unknown )=> {
					if( next !== undefined ) {
						this.over( key, { value: next } )
						return next
					}
					const cell = this.over( key )
					return cell ? cell.value : get()
				}
			}

			const kids = source.kids()
			if( kids.length ) {
				const clones = [] as $bog_gamengine_node[]
				for( let i = 0; i < kids.length; ++i ) {
					clones.push( this.clone( kids[ i ], id, path ? `${ path }.${ i }` : String( i ) ) )
				}
				bind.kids = ()=> clones as readonly $bog_gamengine_node[]
				for( let i = 0; i < clones.length; ++i ) clones[ i ].parent( node )
			}

			marks.set( node, { prefab: this, id, path } )
			return node
		}

	}

}
