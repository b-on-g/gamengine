namespace $ {

	export type $bog_gamengine_atlas_source = {
		name: string
		image: TexImageSource
	}

	export class $bog_gamengine_atlas_image extends $mol_3d_image {

		@ $mol_mem
		data(): HTMLImageElement | ImageData {
			$mol_wire_solid()
			return $mol_wire_sync( this as $mol_3d_image ).load()
		}

	}

	export function $bog_gamengine_atlas_blank( image: TexImageSource ) {
		return ArrayBuffer.isView( ( image as { data?: unknown } ).data as ArrayBufferView )
	}

	export class $bog_gamengine_atlas extends $mol_object2 {

		@ $mol_mem
		uris( next: readonly string[] = [] ) {
			return next
		}

		@ $mol_mem
		size( next = 64 ) {
			return next
		}

		@ $mol_mem
		sources( next: readonly $bog_gamengine_atlas_source[] = [] ) {
			return next
		}

		@ $mol_mem
		origins() {
			const uris = this.uris()
			const sources = this.sources()
			const origins = [] as { name: string, from: string }[]
			for( let i = 0; i < uris.length; ++i ) {
				origins.push({ name: uris[ i ].replace( /^.*\//, '' ).replace( /\.[^.]*$/, '' ), from: uris[ i ] })
			}
			for( let i = 0; i < sources.length; ++i ) {
				origins.push({ name: sources[ i ].name, from: sources[ i ].name })
			}
			return origins as readonly { name: string, from: string }[]
		}

		@ $mol_mem
		names() {
			const origins = this.origins()
			const names = new Map< string, number >()
			for( let i = 0; i < origins.length; ++i ) {
				const name = origins[ i ].name
				const known = names.get( name )
				if( known !== undefined ) $mol_fail( new Error( `Atlas layer name ${ name } is used twice: ${ origins[ known ].from } and ${ origins[ i ].from }` ) )
				names.set( name, i )
			}
			return names
		}

		layer( name: string ) {
			const index = this.names().get( name )
			if( index === undefined ) return $mol_fail( new Error( `Atlas has no layer ${ name }, known: ${ [ ... this.names().keys() ].join( ', ' ) }` ) )
			return index
		}

		@ $mol_mem_key
		static image( uri: string ) {
			$mol_wire_solid()
			return this.$.$bog_gamengine_atlas_image.make({ uri: ()=> uri })
		}

		image( uri: string ) {
			return ( this.constructor as typeof $bog_gamengine_atlas ).image( uri )
		}

		@ $mol_mem
		images() {
			const uris = this.uris()
			const size = this.size()
			const origins = this.origins()
			const loaded = $mol_wire_race( ... uris.map( uri => ()=> this.image( uri ).data() ) )
			const images = [ ... loaded, ... this.sources().map( source => source.image ) ] as readonly TexImageSource[]
			for( let i = 0; i < images.length; ++i ) {
				if( $bog_gamengine_atlas_blank( images[i] ) ) continue
				const box = images[i] as { width: number, height: number }
				const width = box.width
				const height = box.height
				if( width === size && height === size ) continue
				$mol_fail( new Error( `Atlas image ${ origins[i].from } is ${ width }×${ height }, expected ${ size }×${ size }` ) )
			}
			return images
		}

		@ $mol_mem
		ready() {
			try {
				const images = this.images()
				for( let i = 0; i < images.length; ++i ) if( $bog_gamengine_atlas_blank( images[i] ) ) return false
				return true
			} catch( error ) {
				if( $mol_promise_like( error ) ) return false
				return $mol_fail_hidden( error )
			}
		}

	}

}
