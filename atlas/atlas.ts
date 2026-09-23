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
			const uris = this.uris()
			const names = new Map< string, number >()
			for( let i = 0; i < uris.length; ++i ) {
				const name = uris[ i ].replace( /^.*\//, '' ).replace( /\.[^.]*$/, '' )
				const known = names.get( name )
				if( known !== undefined ) $mol_fail( new Error( `Atlas layer name ${ name } is used twice: ${ uris[ known ] } and ${ uris[ i ] }` ) )
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
			return this.$.$mol_3d_image.make({ uri: ()=> uri })
		}

		image( uri: string ) {
			return ( this.constructor as typeof $bog_gamengine_atlas ).image( uri )
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
