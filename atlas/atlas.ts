namespace $ {

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
		names() {
			const names = new Map< string, string >()
			for( const uri of this.uris() ) {
				const name = uri.replace( /^.*\//, '' ).replace( /\.[^.]*$/, '' )
				const known = names.get( name )
				if( known ) $mol_fail( new Error( `Atlas layer name ${ name } is used twice: ${ known } and ${ uri }` ) )
				names.set( name, uri )
			}
			return names
		}

		layer( name: string ) {
			const uri = this.names().get( name )
			if( !uri ) $mol_fail( new Error( `Atlas has no layer ${ name }, known: ${ [ ... this.names().keys() ].join( ', ' ) }` ) )
			return this.uris().indexOf( uri )
		}

		@ $mol_mem_key
		image( uri: string ) {
			const image = this.$.$mol_3d_image.make({ uri: ()=> uri })
			image.$ = this.$
			return image
		}

		@ $mol_mem
		images() {
			const uris = this.uris()
			const size = this.size()
			const images = $mol_wire_race( ... uris.map( uri => ()=> this.image( uri ).data() ) )
			for( let i = 0; i < images.length; ++i ) {
				const { width, height } = images[i]
				if( width === size && height === size ) continue
				const hint = width === 512 && height === 512 ? ', is it loaded?' : ''
				$mol_fail( new Error( `Atlas image ${ uris[i] } is ${ width }×${ height }, expected ${ size }×${ size }${ hint }` ) )
			}
			return images
		}

		@ $mol_mem
		ready() {
			try {
				this.images()
				return true
			} catch( error ) {
				if( $mol_promise_like( error ) ) return false
				return $mol_fail_hidden( error )
			}
		}

	}

}
