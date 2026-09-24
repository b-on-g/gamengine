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
	}

	export type $bog_gamestudio_kit_item = {
		readonly id: string
		readonly title: string
		readonly klass: string
		readonly props: Readonly< Record< string, string > >
		readonly world: string
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
		},
	}

	export const $bog_gamestudio_kit_items: readonly $bog_gamestudio_kit_item[] = [
		{
			id: 'walker',
			title: 'Ходок',
			klass: '$bog_gamestudio_kit_walker',
			props: { input: '<= input', size: '/ 0.8 0.8', speed: '3' },
			world: 'phys',
		},
		{
			id: 'body',
			title: 'Тело',
			klass: '$bog_gamengine_phys_body',
			props: { size: '/ 0.8 0.8' },
			world: 'phys',
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
			if( root_props.indexOf( world.prop ) < 0 ) root.push( `${ world.prop } <= ${ world.node }` )
		}

		return {
			decls,
			root,
			klass: item.klass,
			props: { ... item.props, pos },
			join: world ? { node: world.node, prop: world.list } : null,
		}

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
