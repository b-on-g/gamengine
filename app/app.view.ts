namespace $.$$ {

	const vec_empty = new Float32Array( 0 )

	export class $bog_gamestudio_app extends $.$bog_gamestudio_app {

		@ $mol_mem
		source( next = $bog_gamestudio_sample ) {
			return next
		}

		@ $mol_mem
		selected( next?: number | null ) {
			return next ?? null
		}

		@ $mol_mem
		node() {
			const index = this.selected()
			if( index === null ) return null
			return this.Scene().nodes()[ index ] ?? null
		}

		@ $mol_mem
		node_rows() {
			return this.Scene().nodes().map( ( node, index )=> this.Row( index ) )
		}

		row_title( index: number ) {
			return this.Scene().nodes()[ index ].title()
		}

		row_selected( index: number, next?: boolean ) {
			if( next ) this.selected( index )
			return this.selected() === index
		}

		@ $mol_mem
		props() {
			return this.node()?.props() ?? []
		}

		prop( name: string ) {
			return this.props().find( prop => prop.name === name ) ?? null
		}

		@ $mol_mem
		fields() {
			return this.props().map( prop => this.Field( prop.name ) )
		}

		field_name( name: string ) {
			return name
		}

		field_content( name: string ) {
			switch( this.prop( name )?.kind ) {
				case 'vec2':
				case 'vec3':
				case 'vec4':
				case 'euler': return this.vec_nums( name )
				case 'number': return [ this.Num( name ) ]
				case 'flag': return [ this.Flag( name ) ]
				case 'text': return [ this.Text( name ) ]
				case 'frame': return [ this.frame_options().length ? this.Frame( name ) : this.Text( name ) ]
			}
			return []
		}

		write( prop: string, value: $bog_gamestudio_doc_value ) {
			const index = this.selected()
			if( index === null ) return
			this.Doc().set( this.Doc().nodes()[ index ].title, prop, value )
		}

		vec( name: string ) {
			return ( this.prop( name )?.get() as Float32Array | undefined ) ?? vec_empty
		}

		vec_nums( name: string ) {
			return Array.from( this.vec( name ), ( value, index )=> this.Vec_num( `${ name }_${ index }` ) )
		}

		vec_value( key: string, next?: number ) {
			const cut = key.lastIndexOf( '_' )
			const name = key.slice( 0, cut )
			const at = Number( key.slice( cut + 1 ) )
			const prop = this.prop( name )
			if( !prop ) return NaN
			const scale = prop.kind === 'euler' ? 180 / Math.PI : 1
			const vec = prop.get() as Float32Array
			if( next === undefined ) return vec[ at ] * scale
			const fresh = Array.from( vec )
			fresh[ at ] = next / scale
			this.write( name, fresh )
			return next
		}

		num_value( name: string, next?: number ) {
			const prop = this.prop( name )
			if( !prop ) return NaN
			if( next === undefined ) return prop.get() as number
			this.write( name, next )
			return next
		}

		flag_value( name: string, next?: boolean ) {
			const prop = this.prop( name )
			if( !prop ) return false
			if( next === undefined ) return prop.get() as boolean
			this.write( name, next )
			return next
		}

		text_value( name: string, next?: string ) {
			const prop = this.prop( name )
			if( !prop ) return ''
			if( next === undefined ) return prop.get() as string
			this.write( name, next )
			return next
		}

		@ $mol_mem
		frame_options() {
			const node = this.node() as $bog_gamengine_node & { atlas?(): $bog_gamengine_atlas | null } | null
			const atlas = node?.atlas?.()
			return atlas ? [ ... atlas.names().keys() ] : []
		}

	}

}
