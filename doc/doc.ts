namespace $ {

	export type $bog_gamestudio_doc_value = string | number | boolean | readonly number[]

	export type $bog_gamestudio_doc_node = {
		readonly name: string
		readonly title: string
		readonly klass: string
		readonly props: Readonly< Record< string, $mol_tree2 > >
	}

	export class $bog_gamestudio_doc extends $mol_object2 {

		@ $mol_mem
		source( next = '' ) {
			return next
		}

		@ $mol_mem
		tree() {
			return this.$.$mol_tree2_from_string( this.source(), 'scene.view.tree' )
		}

		@ $mol_mem
		decls() {
			const map = new Map< string, $mol_tree2 >()
			const walk = ( tree: $mol_tree2 )=> {
				const klass = tree.kids[ 0 ]
				if( klass?.type.startsWith( '$' ) ) {
					if( tree.type.startsWith( '$' ) ) map.set( '', klass )
					if( /^[A-Z]/.test( tree.type ) ) map.set( tree.type, klass )
				}
				for( const kid of tree.kids ) walk( kid )
			}
			walk( this.tree() )
			return map
		}

		@ $mol_mem
		nodes(): readonly $bog_gamestudio_doc_node[] {
			const root = this.decls().get( '' )
			if( !root ) return []
			return root.select( 'kids', '/', '<=', null ).kids.map( ref => this.node( ref.type ) )
		}

		@ $mol_mem_key
		node( name: string ): $bog_gamestudio_doc_node {
			const klass = this.decls().get( name )
			if( !klass ) return $mol_fail( new Error( `Node ${ name } is not declared` ) )
			const props = {} as Record< string, $mol_tree2 >
			for( const line of klass.kids ) props[ line.type.replace( /\?$/, '' ) ] = line
			return { name, title: props.name?.text() || name, klass: klass.type, props }
		}

		set( title: string, prop: string, value: $bog_gamestudio_doc_value ) {
			const node = this.nodes().find( node => node.title === title )
			if( !node ) return $mol_fail( new Error( `Node ${ title } is not found` ) )
			const klass = this.decls().get( node.name )!
			const tree = this.tree()
			const line = this.line( tree, prop, value )
			const old = node.props[ prop ]
			const kids = old ? klass.kids.map( kid => kid === old ? line : kid ) : [ ... klass.kids, line ]
			const swap = ( cur: $mol_tree2 ): $mol_tree2 => cur === klass ? cur.clone( kids ) : cur.clone( cur.kids.map( swap ) )
			this.source( this.print( swap( tree ) ) )
		}

		print( tree: $mol_tree2 ) {
			const out = [] as string[]
			this.dump( tree, '', out )
			return out.join( '' )
		}

		dump( tree: $mol_tree2, prefix: string, out: string[] ) {
			if( tree.type ) {
				if( !prefix ) prefix = '\t'
				out.push( tree.type )
				const only = tree.kids.length === 1 ? tree.kids[ 0 ] : null
				if( only && only.span.row === tree.span.row ) {
					out.push( ' ' )
					this.dump( only, prefix, out )
					return
				}
				out.push( '\n' )
			} else if( tree.value || prefix ) {
				out.push( '\\' + tree.value + '\n' )
			}
			for( const kid of tree.kids ) {
				out.push( prefix )
				this.dump( kid, prefix + '\t', out )
			}
		}

		line( tree: $mol_tree2, prop: string, value: $bog_gamestudio_doc_value ) {
			if( typeof value === 'string' ) return tree.struct( prop, [ tree.data( value ) ] )
			if( typeof value !== 'object' ) return tree.struct( prop, [ tree.struct( this.token( value ) ) ] )
			let chain = [] as $mol_tree2[]
			for( let i = value.length - 1; i >= 0; --i ) chain = [ tree.struct( this.token( value[ i ] ), chain ) ]
			return tree.struct( prop, [ tree.struct( '/', chain ) ] )
		}

		token( value: number | boolean ) {
			return typeof value === 'number' ? String( Math.round( value * 1e6 ) / 1e6 ) : String( value )
		}

		strip( tree: $mol_tree2 ): $mol_tree2 {
			if( /^[A-Z]/.test( tree.type ) && tree.kids[ 0 ]?.type.startsWith( '$' ) ) return tree.clone( [] )
			return tree.clone( tree.kids.map( kid => this.strip( kid ) ) )
		}

		@ $mol_mem_key
		decl_text( name: string ) {
			const klass = this.decls().get( name )
			return klass ? this.strip( klass ).toString() : ''
		}

		@ $mol_mem_key
		decl( name: string ) {
			return this.$.$mol_tree2_from_string( this.decl_text( name ), name || 'scene' ).kids[ 0 ] ?? null
		}

		@ $mol_mem_key
		part( name: string ) {
			const klass = this.decl( name )
			if( !klass ) return $mol_fail( new Error( `${ name || 'Scene' } is not declared` ) )
			const Klass = ( this.$ as unknown as Record< string, unknown > )[ klass.type ]
			if( typeof Klass !== 'function' ) return $mol_fail( new Error( `Unknown class ${ klass.type } of ${ name || 'scene' }` ) )
			const obj = new ( Klass as typeof $mol_object2 )
			obj.$ = this.$
			const props = obj instanceof $bog_gamengine_node ? obj.props() : []
			for( const line of klass.kids ) {
				const prop = line.type.replace( /\?$/, '' )
				const value = line.kids[ 0 ]
				if( !value ) continue
				const known = value.type === '<=' ? null : props.find( known => known.name === prop )
				if( known ) {
					known.set( this.parse( known.kind, line ) )
					continue
				}
				( obj as unknown as Record< string, unknown > )[ prop ] = ()=> this.value( `${ name }.${ prop }` )
			}
			return obj
		}

		parse( kind: $bog_gamengine_prop[ 'kind' ], line: $mol_tree2 ): unknown {
			switch( kind ) {
				case 'number': return Number( line.kids[ 0 ].type )
				case 'flag': return line.kids[ 0 ].type === 'true'
				case 'text':
				case 'frame': return line.text()
			}
			return new Float32Array( this.nums( line.kids[ 0 ] ) )
		}

		nums( list: $mol_tree2 ) {
			const out = [] as number[]
			let cur = list.kids[ 0 ] as $mol_tree2 | undefined
			while( cur ) {
				out.push( Number( cur.type ) )
				cur = cur.kids[ 0 ]
			}
			return out
		}

		items( list: $mol_tree2 ) {
			const out = [] as $mol_tree2[]
			for( const kid of list.kids ) {
				if( !kid.type || Number.isNaN( Number( kid.type ) ) ) {
					out.push( kid )
					continue
				}
				let cur = kid as $mol_tree2 | undefined
				while( cur ) {
					out.push( cur )
					cur = cur.kids[ 0 ]
				}
			}
			return out
		}

		@ $mol_mem_key
		value( path: string ): unknown {
			const cut = path.indexOf( '.' )
			const owner = path.slice( 0, cut )
			const prop = path.slice( cut + 1 )
			const line = this.decl( owner )?.kids.find( kid => kid.type.replace( /\?$/, '' ) === prop )
			if( !line ) return undefined
			if( line.kids.length && !line.kids[ 0 ].type ) return line.text()
			return this.eval( line.kids[ 0 ] )
		}

		eval( value: $mol_tree2 ): unknown {
			if( !value.type ) return value.value
			if( value.type === '<=' ) return this.ref( value.kids[ 0 ].type.replace( /\?$/, '' ) )
			if( value.type === '/' ) return this.items( value ).map( item => this.eval( item ) )
			if( value.type === 'true' ) return true
			if( value.type === 'false' ) return false
			if( value.type === 'null' ) return null
			return Number( value.type )
		}

		ref( name: string ) {
			return this.decl_text( name ) ? this.part( name ) : this.value( `.${ name }` )
		}

		@ $mol_mem
		scene() {
			if( !this.decl_text( '' ) ) {
				const empty = new this.$.$bog_gamengine_scene
				empty.$ = this.$
				return empty
			}
			const scene = this.part( '' )
			if( scene instanceof $bog_gamengine_scene ) return scene
			return $mol_fail( new Error( `Scene class ${ this.decl( '' )!.type } is not a scene` ) )
		}

	}

}
