namespace $ {

	export type $bog_gamestudio_kit_mate = {
		readonly node: string
		readonly klass: string
		readonly props: Readonly< Record< string, string > >
	}

	export type $bog_gamestudio_kit_world = {
		readonly prop: string
		readonly node: string
		readonly klass: string
		readonly props: Readonly< Record< string, string > >
		readonly mates: readonly $bog_gamestudio_kit_mate[]
		readonly list: string
		readonly ref: string
	}

	export type $bog_gamestudio_kit_item = {
		readonly id: string
		readonly title: string
		readonly klass: string
		readonly props: Readonly< Record< string, string > >
		readonly world: string
		readonly part?: boolean
	}

	export const $bog_gamestudio_kit_worlds: Readonly< Record< string, $bog_gamestudio_kit_world > > = {
		phys: {
			prop: 'phys',
			node: 'Phys',
			klass: '$bog_gamengine_phys',
			props: { tile: '<= Tile', bodies: '/' },
			mates: [
				{ node: 'Tile', klass: '$bog_gamengine_phys_tile', props: { map: '<= map' } },
			],
			list: 'bodies',
			ref: '',
		},
		nav: {
			prop: '',
			node: 'Grid',
			klass: '$bog_gamengine_nav_grid',
			props: { tile: '<= Tile' },
			mates: [
				{ node: 'Tile', klass: '$bog_gamengine_phys_tile', props: { map: '<= map' } },
			],
			list: '',
			ref: 'grid',
		},
	}

	export const $bog_gamestudio_kit_items: readonly $bog_gamestudio_kit_item[] = [
		{
			id: 'walker',
			title: 'Ходок',
			klass: '$bog_gamengine_phys_walker',
			props: { name: '\\Ходок', size: '/ 0.8 0.8' },
			world: 'phys',
		},
		{
			id: 'body',
			title: 'Тело',
			klass: '$bog_gamengine_phys_body',
			props: { name: '\\Тело', size: '/ 0.8 0.8' },
			world: 'phys',
		},
		{
			id: 'agent',
			title: 'Агент',
			klass: '$bog_gamengine_nav_agent',
			props: { name: '\\Агент' },
			world: 'nav',
		},
		{
			id: 'combat',
			title: 'Бой на узел',
			klass: '$bog_gamengine_combat',
			props: { health_max: '40', rate: '0.7' },
			world: '',
			part: true,
		},
	]

	export type $bog_gamestudio_kit_join = {
		readonly node: string
		readonly prop: string
	}

	export type $bog_gamestudio_kit_plan = {
		readonly decls: readonly $bog_gamestudio_kit_mate[]
		readonly root: readonly string[]
		readonly klass: string
		readonly props: Readonly< Record< string, string > >
		readonly join: $bog_gamestudio_kit_join | null
	}

	export function $bog_gamestudio_kit_plan_of(
		item: $bog_gamestudio_kit_item,
		known: readonly string[],
		root_props: readonly string[],
		pos: string,
	): $bog_gamestudio_kit_plan {

		const world = $bog_gamestudio_kit_worlds[ item.world ] ?? null
		const decls = [] as $bog_gamestudio_kit_mate[]
		const root = [] as string[]

		if( world ) {
			for( let i = 0; i < world.mates.length; ++i ) {
				const mate = world.mates[ i ]
				if( known.indexOf( mate.node ) < 0 ) decls.push( mate )
			}
			if( known.indexOf( world.node ) < 0 ) {
				decls.push({ node: world.node, klass: world.klass, props: world.props })
			}
			if( world.prop && root_props.indexOf( world.prop ) < 0 ) {
				root.push( `${ world.prop } <= ${ world.node }` )
			}
		}

		const props = { ... item.props, pos } as Record< string, string >
		if( world?.ref ) props[ world.ref ] = `<= ${ world.node }`

		return {
			decls,
			root,
			klass: item.klass,
			props,
			join: world?.list ? { node: world.node, prop: world.list } : null,
		}

	}

	export function $bog_gamestudio_kit_line( doc: $bog_gamestudio_doc, owner: string, line: string ) {
		const klass = doc.decls().get( owner )
		if( !klass ) return false
		doc.insert( doc.end_row( klass ), doc.indent( klass.span.row ) + 1, [ line ] )
		return true
	}

	export function $bog_gamestudio_kit_join( doc: $bog_gamestudio_doc, owner: string, prop: string, name: string ) {
		const klass = doc.decls().get( owner )
		if( !klass ) return false
		const item = `<= ${ name }`
		const line = klass.kids.find( kid => kid.type === prop )
		const list = line?.kids[ 0 ]
		if( !list ) {
			doc.insert( doc.end_row( klass ), doc.indent( klass.span.row ) + 1, [ `${ prop } /\n\t${ item }` ] )
			return true
		}
		const known = list.kids.some( kid => kid.type === '<=' && kid.kids[ 0 ]?.type === name )
		if( known ) return true
		doc.insert( doc.end_row( list ), doc.indent( list.span.row ) + 1, [ item ] )
		return true
	}

	export function $bog_gamestudio_kit_attach( doc: $bog_gamestudio_doc, item: $bog_gamestudio_kit_item, host: string ) {
		if( !doc.decls().get( host ) ) return ''
		const name = doc.free_name( item.klass )
		doc.declare( name, item.klass, item.props )
		$bog_gamestudio_kit_join( doc, host, 'parts', name )
		return name
	}

	export function $bog_gamestudio_kit_path_of( doc: $bog_gamestudio_doc, node: $bog_gamengine_node | null ) {
		if( !node ) return ''
		let step = node
		const steps = [] as number[]
		for( let parent = step.parent(); parent; parent = step.parent() ) {
			const at = parent.kids().indexOf( step )
			if( at < 0 ) return ''
			steps.unshift( at )
			step = parent
		}
		return doc.path_at( steps )
	}

	export function $bog_gamestudio_kit_refs( doc: $bog_gamestudio_doc, owner: string, prop: string ) {
		const klass = doc.decls().get( owner )
		if( !klass ) return [] as readonly string[]
		const items = klass.kids.find( kid => kid.type === prop )?.kids[ 0 ]?.kids ?? []
		const out = [] as string[]
		for( let i = 0; i < items.length; ++i ) {
			const item = items[ i ]
			if( item.type !== '<=' ) continue
			const name = item.kids[ 0 ]?.type
			if( name ) out.push( name )
		}
		return out as readonly string[]
	}

	export function $bog_gamestudio_kit_bound( doc: $bog_gamestudio_doc, owner: string, prop: string ) {
		const klass = doc.decls().get( owner )
		if( !klass ) return ''
		const line = klass.kids.find( kid => kid.type === prop )
		const bind = line?.kids[ 0 ]
		if( bind?.type !== '<=' ) return ''
		return bind.kids[ 0 ]?.type ?? ''
	}

	export function $bog_gamestudio_kit_bind( doc: $bog_gamestudio_doc, owner: string, prop: string, name: string ) {
		if( !doc.decls().get( owner ) ) return false
		$bog_gamestudio_kit_clear( doc, owner, prop )
		return $bog_gamestudio_kit_line( doc, owner, `${ prop } <= ${ name }` )
	}

	export function $bog_gamestudio_kit_clear( doc: $bog_gamestudio_doc, owner: string, prop: string ) {
		const klass = doc.decls().get( owner )
		if( !klass ) return false
		const line = klass.kids.find( kid => kid.type === prop )
		if( !line ) return false
		const tree = doc.tree()
		const kids = klass.kids.filter( kid => kid !== line )
		const swap = ( cur: $mol_tree2 ): $mol_tree2 => cur === klass ? cur.clone( kids ) : cur.clone( cur.kids.map( swap ) )
		doc.source( doc.print( swap( tree ) ) )
		return true
	}

	export function $bog_gamestudio_kit_apply( doc: $bog_gamestudio_doc, item: $bog_gamestudio_kit_item, pos: string ) {

		const root = doc.decls().get( '' )
		if( !root ) return ''

		const known = [ ... doc.decls().keys() ]
		const root_props = root.kids.map( kid => kid.type )
		const plan = $bog_gamestudio_kit_plan_of( item, known, root_props, pos )

		for( let i = 0; i < plan.decls.length; ++i ) {
			const decl = plan.decls[ i ]
			doc.declare( decl.node, decl.klass, decl.props )
		}
		for( let i = 0; i < plan.root.length; ++i ) {
			$bog_gamestudio_kit_line( doc, '', plan.root[ i ] )
		}

		const name = doc.add( plan.klass, plan.props )
		if( plan.join ) $bog_gamestudio_kit_join( doc, plan.join.node, plan.join.prop, name )

		return name
	}

	export class $bog_gamestudio_kit extends $mol_object2 {

		@ $mol_mem
		list( next?: readonly $bog_gamestudio_kit_item[] ) {
			return next ?? $bog_gamestudio_kit_items
		}

		item( id: string ) {
			return this.list().find( one => one.id === id ) ?? null
		}

		world( id: string ) {
			const item = this.item( id )
			if( !item ) return null
			return $bog_gamestudio_kit_worlds[ item.world ] ?? null
		}

		title( id: string ) {
			return this.item( id )?.title ?? id
		}

	}

}
