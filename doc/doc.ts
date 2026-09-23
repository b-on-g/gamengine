namespace $ {

	export type $bog_gamestudio_doc_value = string | number | boolean | readonly number[]

	export type $bog_gamestudio_doc_node = {
		readonly name: string
		readonly title: string
		readonly klass: string
		readonly props: Readonly< Record< string, $mol_tree2 > >
	}

	export type $bog_gamestudio_doc_klass = new()=> $bog_gamengine_scene

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

		unlock( tree: $mol_tree2 ): $mol_tree2 {
			const klass = tree.kids[ 0 ]
			if( !/^[A-Z]/.test( tree.type ) || !klass?.type.startsWith( '$' ) ) return tree.clone( tree.kids.map( kid => this.unlock( kid ) ) )
			return tree.clone([ klass.clone( klass.kids.map( line => {
				const value = line.kids[ 0 ]
				if( line.kids.length !== 1 || /^[<=>^@*$]/.test( value.type ) ) return this.unlock( line )
				const prop = line.type.replace( /\?$/, '' )
				return line.struct( prop + '?', [ line.struct( '<=>', [ line.struct( `${ tree.type }_${ prop }?`, [ value ] ) ] ) ] )
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
			return scene
		}

	}

}
