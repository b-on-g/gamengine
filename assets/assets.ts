namespace $ {

	export type $bog_gamestudio_assets_kind = 'image' | 'model' | 'sound'

	export type $bog_gamestudio_assets_item = {
		readonly uri: string
		readonly kind: $bog_gamestudio_assets_kind
	}

	export class $bog_gamestudio_assets extends $mol_object2 {

		@ $mol_mem
		uri( next = 'bog/gamestudio/app/assets.json' ) {
			return next
		}

		@ $mol_mem
		fallback( next: readonly $bog_gamestudio_assets_item[] = [] ) {
			return next
		}

		@ $mol_mem
		loaded() {
			try {
				return this.$.$mol_fetch.json( this.uri() ) as readonly $bog_gamestudio_assets_item[]
			} catch( error ) {
				if( $mol_promise_like( error ) ) return $mol_fail_hidden( error )
				return null
			}
		}

		@ $mol_mem
		list( next?: readonly $bog_gamestudio_assets_item[] ) {
			if( next ) return next
			const loaded = this.loaded()
			if( !loaded?.length ) return this.fallback()
			return loaded.filter( item => item.kind === 'image' || item.kind === 'model' || item.kind === 'sound' )
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
