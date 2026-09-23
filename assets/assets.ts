namespace $ {

	export type $bog_gamestudio_assets_kind = 'image' | 'model' | 'sound'

	export type $bog_gamestudio_assets_item = {
		readonly uri: string
		readonly kind: $bog_gamestudio_assets_kind
	}

	export class $bog_gamestudio_assets extends $mol_object2 {

		@ $mol_mem
		list( next: readonly $bog_gamestudio_assets_item[] = [] ) {
			return next
		}

		@ $mol_mem_key
		of( kind: $bog_gamestudio_assets_kind ) {
			return this.list().filter( item => item.kind === kind )
		}

		kind( uri: string ) {
			return this.list().find( item => item.uri === uri )?.kind ?? null
		}

		file( uri: string ) {
			return uri.replace( /^.*\//, '' )
		}

		name( uri: string ) {
			return this.file( uri ).replace( /\.[^.]*$/, '' )
		}

	}

}
