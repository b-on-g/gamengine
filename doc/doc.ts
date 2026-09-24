namespace $ {

	export type $bog_gamestudio_doc_value = string | number | boolean | readonly number[]

	export type $bog_gamestudio_doc_row = Readonly< Record< string, string > >

	export type $bog_gamestudio_doc_node = {
		readonly name: string
		readonly path: string
		readonly title: string
		readonly klass: string
		readonly props: Readonly< Record< string, $mol_tree2 > >
	}

	export type $bog_gamestudio_doc_klass = new()=> $bog_gamengine_scene

	export class $bog_gamestudio_doc extends $mol_object2 {

		@ $mol_mem
		land( next?: $bog_gamestudio_doc_land | null ) {
			return next ?? null
		}

		@ $mol_mem
		source_own( next = '' ) {
			return next
		}

		source( next?: string ) {
			const land = this.land()
			if( land ) return land.source( next )
			return this.source_own( next )
		}

		@ $mol_mem
		tree() {
			return this.$.$mol_tree2_from_string( this.source(), 'scene.view.tree' )
		}

		@ $mol_mem
		decls() {
			const map = new Map< string, $mol_tree2 >()
			const tops = this.tree().kids
			const walk = ( tree: $mol_tree2 )=> {
				const klass = tree.kids[ 0 ]
				if( klass?.type.startsWith( '$' ) && /^[A-Z]/.test( tree.type ) ) map.set( tree.type, klass )
				for( const kid of tree.kids ) walk( kid )
			}
			for( let i = 0; i < tops.length; ++ i ) {
				const klass = tops[ i ].kids[ 0 ]
				if( klass?.type.startsWith( '$' ) && tops[ i ].type.startsWith( '$' ) ) {
					map.set( i ? tops[ i ].type : '', klass )
				}
				walk( tops[ i ] )
			}
			return map
		}

		@ $mol_mem
		prefabs() {
			const names = new Set< string >()
			const tops = this.tree().kids
			for( let i = 1; i < tops.length; ++ i ) {
				if( tops[ i ].type.startsWith( '$' ) ) names.add( tops[ i ].type )
			}
			return names
		}

		refs( name: string ): readonly $mol_tree2[] {
			const seen = new Set< string >()
			let klass = this.decls().get( name )
			while( klass ) {
				const own = klass.select( 'kids', '/', '<=', null ).kids
				if( own.length ) return own
				if( seen.has( klass.type ) ) break
				seen.add( klass.type )
				klass = this.decls().get( klass.type )
			}
			return []
		}

		@ $mol_mem
		nodes(): readonly $bog_gamestudio_doc_node[] {
			const list = [] as $bog_gamestudio_doc_node[]
			const walk = ( name: string, prefix: string, chain: readonly string[] )=> {
				for( const ref of this.refs( name ) ) {
					if( chain.indexOf( ref.type ) >= 0 ) continue
					const path = prefix + ref.type
					list.push( this.node( path ) )
					walk( ref.type, path + '/', [ ... chain, ref.type ] )
				}
			}
			walk( '', '', [] )
			return list
		}

		path_at( steps: readonly number[] ) {
			let name = ''
			let path = ''
			for( let i = 0; i < steps.length; ++ i ) {
				const ref = this.refs( name )[ steps[ i ] ]
				if( !ref ) return ''
				name = ref.type
				path = path ? `${ path }/${ name }` : name
			}
			return path
		}

		chain( name: string ): readonly $mol_tree2[] {
			const list = [] as $mol_tree2[]
			const seen = new Set< string >()
			for( let cur = this.decls().get( name ); cur && !seen.has( cur.type ); cur = this.decls().get( cur.type ) ) {
				seen.add( cur.type )
				list.unshift( cur )
			}
			return list
		}

		@ $mol_mem_key
		node( path: string ): $bog_gamestudio_doc_node {
			const name = path.slice( path.lastIndexOf( '/' ) + 1 )
			const klass = this.decls().get( name )
			if( !klass ) return $mol_fail( new Error( `Node ${ path } is not declared` ) )
			const props = {} as Record< string, $mol_tree2 >
			for( const step of this.chain( name ) ) {
				for( const line of step.kids ) props[ line.type.replace( /\?$/, '' ) ] = line
			}
			return { name, path, title: props.name?.text() || name, klass: klass.type, props }
		}

		own( klass: $mol_tree2, line?: $mol_tree2 ) {
			return line && klass.kids.indexOf( line ) >= 0 ? line : null
		}

		shared( path: string ): readonly string[] {
			const name = this.node( path ).name
			return this.nodes().filter( item => item.name === name ).map( item => item.path )
		}

		set( path: string, prop: string, value: $bog_gamestudio_doc_value ) {
			const node = this.node( path )
			const klass = this.decls().get( node.name )!
			const tree = this.tree()
			const line = this.line( tree, prop, value )
			const old = this.own( klass, node.props[ prop ] )
			const kids = old ? klass.kids.map( kid => kid === old ? line : kid ) : [ ... klass.kids, line ]
			const swap = ( cur: $mol_tree2 ): $mol_tree2 => cur === klass ? cur.clone( kids ) : cur.clone( cur.kids.map( swap ) )
			this.source( this.print( swap( tree ) ) )
		}

		list_rows( path: string, prop: string ): readonly $bog_gamestudio_doc_row[] {
			const node = this.node( path )
			const items = node.props[ prop ]?.kids[ 0 ]?.kids ?? []
			return items.map( item => {
				const row = {} as Record< string, string >
				for( const field of item.kids ) row[ field.type ] = field.kids[ 0 ]?.value ?? ''
				return row
			} )
		}

		list_write( path: string, prop: string, rows: readonly $bog_gamestudio_doc_row[] ) {
			const node = this.node( path )
			const klass = this.decls().get( node.name )!
			const tree = this.tree()
			const head = tree.span.span( 1, 1, 0 )
			const body = tree.span.span( 2, 1, 0 )
			const slot = $mol_tree2.struct( '*', [], tree.span.span( 3, 1, 0 ) )
			const items = rows.map( row => $mol_tree2.struct( '*', Object.entries( row ).map( ( [ field, value ] )=> this.line( slot, field, value ) ), body ) )
			const line = $mol_tree2.struct( prop, [ $mol_tree2.struct( '/', items, head ) ], head )
			const old = this.own( klass, node.props[ prop ] )
			const kids = old ? klass.kids.map( kid => kid === old ? line : kid ) : [ ... klass.kids, line ]
			const swap = ( cur: $mol_tree2 ): $mol_tree2 => cur === klass ? cur.clone( kids ) : cur.clone( cur.kids.map( swap ) )
			this.source( this.print( swap( tree ) ) )
		}

		list_set( path: string, prop: string, index: number, field: string, value: string ) {
			this.list_write( path, prop, this.list_rows( path, prop ).map( ( row, at )=> at === index ? { ... row, [ field ]: value } : row ) )
		}

		list_add( path: string, prop: string, row: $bog_gamestudio_doc_row ) {
			this.list_write( path, prop, [ ... this.list_rows( path, prop ), row ] )
		}

		list_drop( path: string, prop: string, index: number ) {
			this.list_write( path, prop, this.list_rows( path, prop ).filter( ( row, at )=> at !== index ) )
		}

		@ $mol_mem
		map_lines() {
			const root = this.decls().get( '' )
			return ( root?.kids.find( kid => kid.type === 'map' )?.kids[ 0 ]?.kids ?? [] ) as readonly $mol_tree2[]
		}

		@ $mol_mem
		map() {
			return this.map_lines().map( line => [ ...line.value ] as readonly string[] ) as readonly ( readonly string[] )[]
		}

		paint_all( cells: readonly ( readonly [ number, number ] )[], char: string ) {
			const lines = this.map_lines()
			const rows = this.map()
			const edits = new Map< number, string[] >()
			for( const [ x, y ] of cells ) {
				const row = rows[ y ]
				if( !row || x < 0 || x >= row.length ) continue
				let chars = edits.get( y )
				if( !chars ) edits.set( y, chars = [ ...row ] )
				chars[ x ] = char
			}
			const source = this.source().split( '\n' )
			let changed = false
			for( const [ y, chars ] of edits ) {
				const text = chars.join( '' )
				if( text === rows[ y ].join( '' ) ) continue
				const at = lines[ y ].span.row - 1
				const cut = source[ at ].indexOf( '\\' )
				source[ at ] = source[ at ].slice( 0, cut + 1 ) + text
				changed = true
			}
			if( changed ) this.source( source.join( '\n' ) )
		}

		paint( x: number, y: number, char: string ) {
			this.paint_all( [ [ x, y ] ], char )
		}

		rect( x0: number, y0: number, x1: number, y1: number, char: string ) {
			const cells = [] as ( readonly [ number, number ] )[]
			for( let y = Math.min( y0, y1 ); y <= Math.max( y0, y1 ); ++y ) {
				for( let x = Math.min( x0, x1 ); x <= Math.max( x0, x1 ); ++x ) cells.push( [ x, y ] )
			}
			this.paint_all( cells, char )
		}

		fill( x: number, y: number, char: string ) {
			const rows = this.map()
			const from = rows[ y ]?.[ x ]
			if( from === undefined || from === char ) return
			const seen = new Set< string >()
			const queue = [ [ x, y ] as readonly [ number, number ] ]
			const cells = [] as ( readonly [ number, number ] )[]
			while( queue.length ) {
				const [ cx, cy ] = queue.pop()!
				const key = `${ cx }_${ cy }`
				if( seen.has( key ) ) continue
				seen.add( key )
				if( rows[ cy ]?.[ cx ] !== from ) continue
				cells.push( [ cx, cy ] )
				queue.push( [ cx + 1, cy ], [ cx - 1, cy ], [ cx, cy + 1 ], [ cx, cy - 1 ] )
			}
			this.paint_all( cells, char )
		}

		end_row( tree: $mol_tree2 ): number {
			let row = tree.span.row
			for( const kid of tree.kids ) row = Math.max( row, this.end_row( kid ) )
			return row
		}

		indent( row: number ) {
			return this.source().split( '\n' )[ row - 1 ]?.match( /^\t*/ )![ 0 ].length ?? 0
		}

		insert( row: number, indent: number, lines: readonly string[] ) {
			const tabs = '\t'.repeat( indent )
			const text = lines.map( line => line.split( '\n' ).map( part => tabs + part ).join( '\n' ) + '\n' ).join( '' )
			const source = this.source()
			let at = 0
			for( let i = 0; i < row; ++ i ) at = source.indexOf( '\n', at ) + 1
			this.source( source.slice( 0, at ) + text + source.slice( at ) )
		}

		free_name( klass: string ) {
			const word = klass.replace( /^.*_/, '' )
			const base = word[ 0 ].toUpperCase() + word.slice( 1 )
			for( let i = 1; ; ++ i ) {
				if( !this.decls().has( `${ base }_${ i }` ) ) return `${ base }_${ i }`
			}
		}

		block( name: string, klass: string, props: Readonly< Record< string, string > > ) {
			return [ `${ name } ${ klass }`, ... Object.entries( props ).map( ( [ prop, value ] )=> `\t${ prop } ${ value.replace( /\n/g, '\n\t' ) }` ) ].join( '\n' )
		}

		add( klass: string, props: Readonly< Record< string, string > > ) {
			const root = this.decls().get( '' )
			if( !root ) return $mol_fail( new Error( `Scene has no root class` ) )
			const items = root.select( 'kids', '/' ).kids[ 0 ]
			if( !items ) return $mol_fail( new Error( `Scene has no kids list` ) )
			const name = this.free_name( klass )
			this.insert( this.end_row( items ), this.indent( items.span.row ) + 1, [ '<= ' + this.block( name, klass, props ) ] )
			return name
		}

		declare( name: string, klass: string, props: Readonly< Record< string, string > > ) {
			const root = this.decls().get( '' )
			if( !root ) return $mol_fail( new Error( `Scene has no root class` ) )
			if( this.decls().has( name ) ) return $mol_fail( new Error( `Node ${ name } is already declared` ) )
			this.insert( this.end_row( root ), this.indent( root.span.row ) + 1, [ this.block( name, klass, props ) ] )
			return name
		}

		add_uri( owner: string, prop: string, uri: string, name?: string ) {
			const klass = this.decls().get( owner )
			if( !klass ) return $mol_fail( new Error( `Node ${ owner } is not declared` ) )
			const item = name ? `${ name } \\${ uri }` : `\\${ uri }`
			const line = klass.kids.find( kid => kid.type === prop )
			const list = line?.kids[ 0 ]
			if( !list ) {
				this.insert( this.end_row( klass ), this.indent( klass.span.row ) + 1, [ `${ prop } ${ name ? '*' : '/' }\n\t${ item }` ] )
				return
			}
			const known = list.kids.some( kid => name ? kid.type === name : kid.value === uri )
			if( known ) return
			this.insert( this.end_row( list ), this.indent( list.span.row ) + 1, [ item ] )
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

		flat( tree: $mol_tree2 ): $mol_tree2 {
			if( tree.type !== '/' ) return tree.clone( tree.kids.map( kid => this.flat( kid ) ) )
			const items = [] as $mol_tree2[]
			for( const kid of tree.kids ) {
				if( !kid.type || Number.isNaN( Number( kid.type ) ) ) {
					items.push( this.flat( kid ) )
					continue
				}
				let cur = kid as $mol_tree2 | undefined
				while( cur ) {
					items.push( cur.clone( [] ) )
					cur = cur.kids[ 0 ]
				}
			}
			return tree.clone( items )
		}

		bound( tree: $mol_tree2 ): boolean {
			if( /^(<=|=>)/.test( tree.type ) ) return true
			for( const kid of tree.kids ) if( this.bound( kid ) ) return true
			return false
		}

		owned( tree: $mol_tree2 ): boolean {
			return /^[A-Z]/.test( tree.type ) || this.prefabs().has( tree.type )
		}

		unlock( tree: $mol_tree2 ): $mol_tree2 {
			const klass = tree.kids[ 0 ]
			if( !this.owned( tree ) || !klass?.type.startsWith( '$' ) ) return tree.clone( tree.kids.map( kid => this.unlock( kid ) ) )
			const prefix = tree.type.replace( /^\$/, '' )
			return tree.clone([ klass.clone( klass.kids.map( line => {
				const value = line.kids[ 0 ]
				if( line.kids.length !== 1 || /^[<=>^@*$]/.test( value.type ) || this.bound( value ) ) return this.unlock( line )
				const prop = line.type.replace( /\?$/, '' )
				return line.struct( prop + '?', [ line.struct( '<=>', [ line.struct( `${ prefix }_${ prop }?`, [ value ] ) ] ) ] )
			} ) ) ])
		}

		@ $mol_mem
		js() {
			return this.$.$mol_tree2_text_to_string( this.$.$mol_view_tree2_to_text( this.unlock( this.flat( this.tree() ) ) ) )
		}

		@ $mol_mem
		compile() {
			const context = Object.create( this.$ ) as $
			Object.defineProperty( context, '$', { value: context, writable: true, configurable: true } )
			new Function( '$', this.js() )( context )
			const known = context as unknown as Record< string, unknown >
			for( const [ name, klass ] of this.decls() ) {
				if( typeof known[ klass.type ] === 'function' ) continue
				$mol_fail( new Error( `Unknown class ${ klass.type } of ${ name || 'scene' }` ) )
			}
			const root = this.tree().kids[ 0 ]?.type
			const klass = root ? known[ root ] as $bog_gamestudio_doc_klass : this.$.$bog_gamengine_scene
			return { klass, context }
		}

		@ $mol_mem
		clock( next?: $bog_gamengine_clock ) {
			return next ?? new this.$.$bog_gamengine_clock
		}

		@ $mol_mem
		input( next?: $bog_gamengine_input | null ) {
			return next ?? null
		}

		@ $mol_mem
		overlay( next?: readonly $bog_gamengine_batch[] ) {
			return next ?? []
		}

		@ $mol_mem
		scene() {
			const { klass, context } = this.compile()
			const scene = new klass
			if( !( scene instanceof $bog_gamengine_scene ) ) return $mol_fail( new Error( `Scene class ${ this.tree().kids[ 0 ].type } is not a scene` ) )
			scene.$ = context
			const own = klass.prototype.batches as ()=> readonly $bog_gamengine_batch[]
			scene.batches = ()=> [ ... own.call( scene ), ... this.overlay() ]
			scene.clock = ()=> this.clock()
			scene.input = ()=> this.input()
			return scene
		}

	}

}
