namespace $ {

	export type $bog_gamestudio_app_axis = 'x' | 'y' | 'xy'

	export type $bog_gamestudio_app_mode = 'edit' | 'play' | 'pause'

	export type $bog_gamestudio_app_snap = {
		readonly path: string
		readonly prop: string
		readonly value: unknown
	}

	export const $bog_gamestudio_app_zoom_rate = 0.0015

	export const $bog_gamestudio_app_zoom_step = 400

	export const $bog_gamestudio_app_fit_gap = 1.1

	export const $bog_gamestudio_app_grid_step = 0.5

	export const $bog_gamestudio_app_grid_precision = 1e3

	export function $bog_gamestudio_app_grid_value( value: number, step: number ) {
		if( step > 0 ) return Math.round( value / step ) * step
		return Math.round( value * $bog_gamestudio_app_grid_precision ) / $bog_gamestudio_app_grid_precision
	}

	export function $bog_gamestudio_app_zoom_factor( delta: number, mode = 0 ) {
		const pixels = mode === 1 ? delta * 16 : mode === 2 ? delta * 400 : delta
		const step = Math.max( - $bog_gamestudio_app_zoom_step, Math.min( $bog_gamestudio_app_zoom_step, pixels ) )
		return Math.exp( - step * $bog_gamestudio_app_zoom_rate )
	}

	export function $bog_gamestudio_app_bounds( nodes: readonly $bog_gamengine_node[], out: Float32Array ) {

		out[ 0 ] = Infinity
		out[ 1 ] = Infinity
		out[ 2 ] = - Infinity
		out[ 3 ] = - Infinity
		let found = false

		for( let i = 0; i < nodes.length; ++ i ) {

			const node = nodes[ i ] as $bog_gamengine_point_node & { aabb?(): Float32Array }
			const box = typeof node.aabb === 'function' ? node.aabb() : null
			let left = 0
			let bottom = 0
			let right = 0
			let top = 0

			if( box ) {
				left = box[ 0 ]
				bottom = box[ 1 ]
				right = box[ 3 ]
				top = box[ 4 ]
			} else {
				const world = node.world()
				const size = typeof node.size === 'function' ? node.size() : null
				const half_x = size && size.length > 0 ? size[ 0 ] / 2 : 0.5
				const half_y = size && size.length > 1 ? size[ 1 ] / 2 : 0.5
				left = world[ 12 ] - half_x
				right = world[ 12 ] + half_x
				bottom = world[ 13 ] - half_y
				top = world[ 13 ] + half_y
			}

			if( !Number.isFinite( left ) || !Number.isFinite( bottom ) ) continue
			if( left < out[ 0 ] ) out[ 0 ] = left
			if( bottom < out[ 1 ] ) out[ 1 ] = bottom
			if( right > out[ 2 ] ) out[ 2 ] = right
			if( top > out[ 3 ] ) out[ 3 ] = top
			found = true

		}

		return found ? out : null
	}

	export function $bog_gamestudio_app_wider(
		bounds: Float32Array | null,
		left: number,
		bottom: number,
		right: number,
		top: number,
		out: Float32Array,
	) {
		if( bounds ) {
			out[ 0 ] = Math.min( bounds[ 0 ], left )
			out[ 1 ] = Math.min( bounds[ 1 ], bottom )
			out[ 2 ] = Math.max( bounds[ 2 ], right )
			out[ 3 ] = Math.max( bounds[ 3 ], top )
		} else {
			out[ 0 ] = left
			out[ 1 ] = bottom
			out[ 2 ] = right
			out[ 3 ] = top
		}
		return out
	}

	export const $bog_gamestudio_app_gizmo_box = 0.15

	export const $bog_gamestudio_app_gizmo_near = 0.1

	function $bog_gamestudio_app_gizmo_gap( along: number, aside: number, size: number ) {
		if( along < 0 ) return Math.hypot( along, aside )
		if( along > size ) return Math.hypot( along - size, aside )
		return Math.abs( aside )
	}

	export function $bog_gamestudio_app_gizmo_hit( x: number, y: number, size: number ): $bog_gamestudio_app_axis | null {
		const box = size * $bog_gamestudio_app_gizmo_box
		if( Math.abs( x ) <= box && Math.abs( y ) <= box ) return 'xy'
		const near = size * $bog_gamestudio_app_gizmo_near
		if( $bog_gamestudio_app_gizmo_gap( x, y, size ) <= near ) return 'x'
		if( $bog_gamestudio_app_gizmo_gap( y, x, size ) <= near ) return 'y'
		return null
	}

}

namespace $.$$ {

	const vec_empty = new Float32Array( 0 )
	const vec_zero = new Float32Array( 3 )

	const gizmo_pixels = 96
	const box = $bog_gamestudio_app_gizmo_box

	const arrow_points = new Float32Array([
		0, 0, 0, 1, 0, 0,
		1, 0, 0, 0.8, 0.08, 0,
		1, 0, 0, 0.8, -0.08, 0,
	])

	const box_points = new Float32Array([
		-box, -box, 0, box, -box, 0,
		box, -box, 0, box, box, 0,
		box, box, 0, -box, box, 0,
		-box, box, 0, -box, -box, 0,
	])

	const cursor_points = new Float32Array([
		0, 0, 0, 0.6, -0.6, 0,
		0, 0, 0, 0.15, -0.75, 0,
		0.6, -0.6, 0, 0.15, -0.75, 0,
	])

	const tint_x = new Float32Array([ 1, 0, 0, 1 ])
	const tint_y = new Float32Array([ 0, 1, 0, 1 ])
	const tint_xy = new Float32Array([ 1, 1, 0, 1 ])
	const rot_y = new Float32Array([ 0, 0, Math.PI / 2 ])

	export class $bog_gamestudio_app extends $.$bog_gamestudio_app {

		source_key() {
			return 'bog_gamestudio_source'
		}

		kept_fail = false

		history = [] as string[]
		future = [] as string[]
		history_at = 0
		history_gesture = false
		history_session = false
		history_taken = false
		history_back = false

		history_depth() {
			return 30
		}

		history_gap() {
			return 600
		}

		history_held() {
			return this.history_gesture || this.history_session
		}

		history_hold( on: boolean ) {
			if( on === this.history_session ) return on
			if( on && !this.history_held() ) this.history_taken = false
			this.history_session = on
			return on
		}

		history_push( next: string ) {
			if( this.history_back ) return
			if( this.history_held() && this.history_taken ) return
			const now = Date.now()
			if( !this.history_held() && now - this.history_at < this.history_gap() ) return
			const before = $mol_wire_probe( ()=> this.source_own() )
			if( before === undefined || before === next ) return
			this.history.push( before )
			while( this.history.length > this.history_depth() ) this.history.shift()
			this.future = []
			this.history_at = now
			if( this.history_held() ) this.history_taken = true
		}

		@ $mol_mem
		source_own( next?: string ) {
			if( next !== undefined ) this.history_push( next )
			try {
				const kept = this.$.$mol_state_local.value< string >( this.source_key(), next )
				if( next !== undefined ) this.kept_fail = false
				return kept ?? $bog_gamestudio_sample
			} catch( error ) {
				if( $mol_promise_like( error ) ) return $mol_fail_hidden( error )
				this.kept_fail = true
				return next ?? $bog_gamestudio_sample
			}
		}

		source( next?: string ) {
			return this.Doc().source( next )
		}

		source_uri() {
			return 'data:text/plain;charset=utf-8,' + encodeURIComponent( this.source() )
		}

		@ $mol_mem
		klass( next?: string ) {
			return next ?? this.Doc().tree().kids[ 0 ]?.type ?? ''
		}

		@ $mol_mem
		module() {
			const klass = this.klass()
			if( !/^\$\w+$/.test( klass ) ) return null
			try {
				return this.Doc().module( klass )
			} catch( error ) {
				if( $mol_promise_like( error ) ) return $mol_fail_hidden( error )
				return null
			}
		}

		module_name() {
			return this.klass().replace( /^.*_/, '' )
		}

		module_tree_name() {
			return `${ this.module_name() }.view.tree`
		}

		module_ts_name() {
			return `${ this.module_name() }.view.ts`
		}

		module_tree_uri() {
			const made = this.module()
			return made ? 'data:text/plain;charset=utf-8,' + encodeURIComponent( made.tree ) : ''
		}

		module_ts_uri() {
			const made = this.module()
			return made ? 'data:text/plain;charset=utf-8,' + encodeURIComponent( made.ts ) : ''
		}

		steps_word( count: number ) {
			const tail = count % 100
			if( tail > 10 && tail < 20 ) return 'шагов'
			const last = count % 10
			if( last === 1 ) return 'шаг'
			if( last > 1 && last < 5 ) return 'шага'
			return 'шагов'
		}

		undo_stat() {
			if( this.doc_land() ) return 'Отмена у Базы: документ общий'
			const depth = this.history.length
			if( !depth ) return 'Отмена: отменять нечего'
			return `Отмена: ${ depth } ${ this.steps_word( depth ) }, до перезагрузки`
		}

		can_undo() {
			return this.editing() && !this.doc_land() && this.history.length > 0
		}

		can_redo() {
			return this.editing() && !this.doc_land() && this.future.length > 0
		}

		swap_source( text: string ) {
			this.history_back = true
			try {
				this.source( text )
			} finally {
				this.history_back = false
			}
			this.selected( null )
		}

		undo( event?: Event | null ) {
			if( !this.can_undo() ) return event ?? null
			const now = this.source()
			this.future.push( now )
			this.swap_source( this.history.pop()! )
			return event ?? null
		}

		redo( event?: Event | null ) {
			if( !this.can_redo() ) return event ?? null
			const now = this.source()
			this.history.push( now )
			this.swap_source( this.future.pop()! )
			return event ?? null
		}

		key_undo( event?: Event | null ) {
			if( this.typing( event ) ) return event ?? null
			return this.undo( event )
		}

		key_redo( event?: Event | null ) {
			if( this.typing( event ) ) return event ?? null
			return this.redo( event )
		}

		kept_stat() {
			if( this.doc_land() ) return 'Ленд Базы, правки уходят сразу'
			const size = this.source().length
			if( this.kept_fail ) return `Браузер не сохраняет, вынимайте файлом: ${ size } знаков`
			return `Браузер этой машины, ${ size } знаков`
		}

		@ $mol_mem
		selected( next?: number | null ) {
			return next ?? null
		}

		@ $mol_mem
		mode( next?: $bog_gamestudio_app_mode ) {
			return next ?? 'edit'
		}

		editing() {
			return this.mode() === 'edit'
		}

		playing() {
			return this.mode() !== 'edit'
		}

		clock_paused() {
			return this.mode() !== 'play'
		}

		scene_input() {
			return this.editing() ? null : this.Input()
		}

		@ $mol_mem
		key_map() {
			return this.Key().keys()
		}

		land_arg() {
			return this.$.$mol_state_arg.value( 'land' ) ?? ''
		}

		master_arg() {
			return this.$.$mol_state_arg.value( 'master' ) ?? ''
		}

		master_url() {
			const master = this.master_arg()
			if( !master ) return ''
			return ( /^(https?|wss?):/.test( master ) ? master : 'http://' + master ).replace( /\/?$/, '/' )
		}

		pinned = null as typeof $giper_baza_yard | null

		pin() {
			const url = this.master_url()
			if( !url ) return
			const yard = this.$.$giper_baza_yard
			if( this.pinned === yard ) return
			this.pinned = yard
			yard.masters_default.length = 0
			yard.masters = ()=> [ url ]
			const live = this.$.$giper_baza_glob.yard()
			live.master_cursor( 1 )
			live.master_cursor( 0 )
		}

		@ $mol_mem
		land_link( next?: string ) {
			return next ?? this.land_arg()
		}

		@ $mol_mem
		doc_land() {
			if( !this.land_arg() && !this.master_arg() ) return null
			this.pin()
			return this.Land()
		}

		@ $mol_mem
		mate_name() {
			return this.Land().me().slice( 0, 6 )
		}

		@ $mol_mem
		spot( next?: Float32Array ) {
			return next ?? new Float32Array( 2 )
		}

		pick_title() {
			return this.node()?.title() ?? ''
		}

		auto() {
			const land = this.doc_land()
			if( !land ) return
			land.ready()
			if( !this.land_arg() && !land.source() ) land.source( this.source_own() )
			land.push( this.pick_title(), this.spot() )
		}

		@ $mol_mem
		mates() {
			return this.doc_land()?.mates() ?? []
		}

		@ $mol_mem
		picks() {
			const land = this.doc_land()
			const out = {} as Record< string, string >
			if( land ) for( const id of land.mates() ) out[ land.pick( id ) ] = id
			return out
		}

		row_shared( index: number ) {
			const title = this.Doc().nodes()[ index ]?.title ?? ''
			return Boolean( title && this.picks()[ title ] )
		}

		@ $mol_mem
		Mate_shape() {
			const shape = super.Mate_shape()
			shape.points( cursor_points )
			return shape
		}

		@ $mol_mem
		mate_scale() {
			const size = this.gizmo_size() * 0.5
			return new Float32Array([ size, size, 1 ])
		}

		@ $mol_mem
		mate_text_height() {
			return this.gizmo_size() * 0.3
		}

		@ $mol_mem_key
		mate_pos( id: string ) {
			const spot = this.doc_land()!.spot( id )
			return new Float32Array([ spot[ 0 ], spot[ 1 ], 0 ])
		}

		@ $mol_mem_key
		mate_text_pos( id: string ) {
			const spot = this.doc_land()!.spot( id )
			const size = this.gizmo_size()
			return new Float32Array([ spot[ 0 ] + size * 0.45, spot[ 1 ] - size * 0.95, 0 ])
		}

		@ $mol_mem_key
		mate_tint( id: string ) {
			let hash = 0
			for( let i = 0; i < id.length; ++ i ) hash = ( hash * 31 + id.charCodeAt( i ) ) % 360
			const hue = hash / 60
			const part = ( shift: number )=> {
				const k = ( shift + hue ) % 6
				return 0.4 + 0.6 * Math.max( 0, Math.min( 1, Math.min( k, 4 - k, 1 ) ) )
			}
			return new Float32Array([ part( 5 ), part( 3 ), part( 1 ), 1 ])
		}

		mate_title( id: string ) {
			return this.doc_land()?.mate_name( id ) || id.slice( 0, 6 )
		}

		@ $mol_mem
		font_sources() {
			return this.Font().sources()
		}

		@ $mol_mem_key
		mate_pool( id: string ) {
			return this.Mate_text( id ).pool()
		}

		@ $mol_mem
		mate_nodes() {
			return this.mates().map( id => this.Mate( id ) )
		}

		@ $mol_mem
		mate_batches() {
			const ids = this.mates()
			if( !ids.length ) return []
			return [ this.Mate_lines(), ... ids.map( id => this.Mate_text_batch( id ) ) ]
		}

		@ $mol_mem
		overlay_batches() {
			return [ this.Gizmo_arrows(), this.Gizmo_boxes(), this.Rect_lines(), ... this.mate_batches() ]
		}

		@ $mol_mem
		canvas_foot() {
			return this.doc_land() ? [ this.Status(), this.Live() ] : [ this.Status() ]
		}

		live_stat() {
			const land = this.doc_land()
			if( !land ) return ''
			const ids = land.mates()
			return [
				`me ${ land.me() }`,
				`land ${ land.land_link() }`,
				`mates ${ ids.length }`,
				ids.map( id => `${ id } ${ land.spot( id )[ 0 ].toFixed( 2 ) } × ${ land.spot( id )[ 1 ].toFixed( 2 ) } ${ land.pick( id ) }` ).join( ', ' ) || 'nobody',
				`master ${ this.$.$giper_baza_glob.yard().master_current() ?? 'none' }`,
			].join( ' | ' )
		}

		@ $mol_mem
		tab_stored( next = '0' ) {
			return next
		}

		tab( next?: string ) {
			if( next ) this.tab_stored( next )
			return this.tab_stored()
		}

		tab_hidden_0() {
			return this.tab() !== '0'
		}

		tab_hidden_1() {
			return this.tab() !== '1'
		}

		tab_hidden_2() {
			return this.tab() !== '2'
		}

		tab_hidden_3() {
			return this.tab() !== '3'
		}

		@ $mol_mem
		asset( next?: string | null ) {
			return next ?? null
		}

		placing() {
			return ( this.asset() !== null || this.kit() !== null || this.aiming() !== null ) && this.editing()
		}

		@ $mol_mem
		kit( next?: string | null ) {
			return next ?? null
		}

		@ $mol_mem
		kit_rows() {
			return this.Kit().list().map( item => this.Kit_row( item.id ) )
		}

		kit_title( id: string ) {
			return this.Kit().title( id )
		}

		kit_selected( id: string, next?: boolean ) {
			if( next !== undefined ) {
				this.asset( null )
				this.kit( next ? id : null )
				if( next ) this.brush_drop()
			}
			return this.kit() === id
		}

		kit_place( id: string, at: ArrayLike< number > ) {
			const item = this.Kit().item( id )
			if( !item ) return ''
			const doc = this.Doc()
			return $bog_gamestudio_kit_apply( doc, item, `/ ${ doc.token( at[ 0 ] ) } ${ doc.token( at[ 1 ] ) } 0` )
		}

		@ $mol_mem
		aiming( next?: string | null ) {
			return next ?? null
		}

		armed( name: string, next?: boolean ) {
			if( next !== undefined ) {
				this.asset( null )
				this.kit( null )
				this.aiming( next ? name : null )
			}
			return this.aiming() === name
		}

		refs_names( name: string ) {
			const path = this.doc_path()
			if( !path ) return 'никого'
			const doc = this.Doc()
			const host = doc.node( path ).name
			if( this.prop( name )?.kind === 'node' ) return $bog_gamestudio_kit_bound( doc, host, name ) || 'никого'
			const names = $bog_gamestudio_kit_refs( doc, host, name )
			return names.length ? names.join( ', ' ) : 'никого'
		}

		refs_clear( name: string, next?: any ) {
			if( next === undefined ) return null
			const path = this.doc_path()
			if( path ) $bog_gamestudio_kit_clear( this.Doc(), this.Doc().node( path ).name, name )
			return null
		}

		aim_at( name: string, node: $bog_gamengine_node | null, at: ArrayLike< number > ) {
			const path = this.doc_path()
			if( !path ) return
			const doc = this.Doc()
			const host = doc.node( path ).name
			const kind = this.prop( name )?.kind
			if( kind === 'nodes' || kind === 'node' ) {
				const mate = $bog_gamestudio_kit_path_of( doc, node )
				if( !mate || mate === host ) return
				const mate_name = doc.node( mate ).name
				if( kind === 'node' ) {
					$bog_gamestudio_kit_bind( doc, host, name, mate_name )
					this.aiming( null )
					return
				}
				$bog_gamestudio_kit_join( doc, host, name, mate_name )
				return
			}
			doc.set( host, name, [ at[ 0 ], at[ 1 ], 0 ] )
			this.aiming( null )
		}

		kit_attach( id: string ) {
			const item = this.Kit().item( id )
			const path = this.doc_path()
			if( !item || !path ) return ''
			const doc = this.Doc()
			return $bog_gamestudio_kit_attach( doc, item, doc.node( path ).name )
		}

		@ $mol_mem
		asset_rows() {
			return this.Assets().list().map( item => this.Asset( item.uri ) )
		}

		asset_uri( uri: string ) {
			return uri
		}

		asset_file( uri: string ) {
			return this.Assets().file( uri )
		}

		asset_icon( uri: string ) {
			switch( this.Assets().kind( uri ) ) {
				case 'image': return this.Asset_image( uri )
				case 'model': return this.Asset_model( uri )
				case 'sound': return this.Asset_sound( uri )
			}
			return null
		}

		asset_selected( uri: string, next?: boolean ) {
			if( next !== undefined ) {
				this.asset( next ? uri : null )
				if( next ) {
					this.kit( null )
					this.brush_drop()
				}
			}
			return this.asset() === uri
		}

		asset_drop( event?: DragEvent | null ) {
			if( !event ) return null
			event.preventDefault()
			this.Drop().status( 'ready' )
			const uri = event.dataTransfer?.getData( 'text/plain' ) ?? ''
			if( !this.Assets().kind( uri ) || !this.editing() ) return event
			const at = this.Point().world( this.point_world, this.point_x( event ), this.point_y( event ) )
			this.place( uri, this.grid_at( at ) )
			return event
		}

		atlas_frame() {
			const atlas = this.Doc().decls().get( 'Atlas' )
			const first = atlas?.select( 'uris', '/', null ).kids[ 0 ]?.value
			return first ? this.Assets().name( first ) : ''
		}

		place( uri: string, at: ArrayLike< number > ) {
			const doc = this.Doc()
			const name = this.Assets().name( uri )
			const pos = `/ ${ doc.token( at[ 0 ] ) } ${ doc.token( at[ 1 ] ) } 0`
			switch( this.Assets().kind( uri ) ) {
				case 'image': {
					doc.add_uri( 'Atlas', 'uris', uri )
					return doc.add( '$bog_gamengine_sprite', { name: `\\${ name }`, atlas: '<= Atlas', frame: `\\${ name }`, pos } )
				}
				case 'model': {
					const frame = this.atlas_frame()
					const mesh = doc.free_name( '$bog_gamengine_mesh' )
					return doc.add( '$bog_gamengine_mesh', {
						name: `\\${ name }`,
						atlas: '<= Atlas',
						frame: `\\${ frame }`,
						pos,
						shape: `<= ${ mesh }_shape $bog_gamestudio_assets_gltf\n\turi \\${ uri }`,
					} )
				}
				case 'sound': {
					if( doc.decls().has( 'Sound' ) ) doc.add_uri( 'Sound', 'uris', uri, name )
					else doc.declare( 'Sound', '$bog_gamengine_sound', { uris: `*\n\t${ name } \\${ uri }` } )
					return 'Sound'
				}
			}
			return $mol_fail( new Error( `Unknown asset ${ uri }` ) )
		}

		scene_status() {
			for( const batch of this.Scene().batches() ) {
				batch.atlas()?.images()
				batch.shape().geometry()
			}
			return ''
		}

		snap = [] as readonly $bog_gamestudio_app_snap[]
		snap_scene = null as $bog_gamengine_scene | null

		snapshot() {
			const snap = [] as $bog_gamestudio_app_snap[]
			for( const row of this.Doc().nodes() ) {
				for( const prop of this.props_of( row.path ) ) {
					const value = prop.get()
					snap.push({ path: row.path, prop: prop.name, value: value instanceof Float32Array ? new Float32Array( value ) : value })
				}
			}
			return snap
		}

		play( event?: Event | null ) {
			if( this.editing() ) {
				this.snap_scene = this.Scene()
				this.snap = this.snapshot()
			}
			this.mode( 'play' )
			return event ?? null
		}

		paused( next?: boolean ) {
			if( next !== undefined && this.playing() ) this.mode( next ? 'pause' : 'play' )
			return this.mode() === 'pause'
		}

		stop( event?: Event | null ) {
			if( this.snap_scene === this.Scene() ) {
				for( const { path, prop, value } of this.snap ) {
					this.props_of( path ).find( item => item.name === prop )?.set( value instanceof Float32Array ? new Float32Array( value ) : value )
				}
			}
			this.snap = []
			this.snap_scene = null
			this.mode( 'edit' )
			return event ?? null
		}

		@ $mol_mem
		node() {
			const path = this.doc_path()
			if( !path ) return null
			return this.node_of().get( path ) ?? null
		}

		@ $mol_mem
		node_rows() {
			return this.Doc().nodes().map( ( node, index )=> this.Row( index ) )
		}

		row_title( index: number ) {
			return this.Doc().nodes()[ index ]?.title ?? ''
		}

		row_selected( index: number, next?: boolean ) {
			if( next ) this.selected( index )
			return this.selected() === index
		}

		@ $mol_mem
		props() {
			return this.props_of( this.doc_path() )
		}

		prop( name: string ) {
			return this.props().find( prop => prop.name === name ) ?? null
		}

		@ $mol_mem
		fields() {
			const fields = this.props().map( prop => this.Field( prop.name ) )
			return this.doc_path() ? [ this.Name_field(), ... fields ] : fields
		}

		node_name( next?: string ) {
			const path = this.doc_path()
			if( !path ) return ''
			if( next === undefined ) return this.Doc().node( path ).props.name?.text() ?? ''
			this.Doc().set( path, 'name', next )
			return next
		}

		node_hint() {
			return this.node()?.title() ?? ''
		}

		field_name( name: string ) {
			return name
		}

		@ $mol_mem
		detachable() {
			const path = this.doc_path()
			return Boolean( path && path.includes( '/' ) && this.Doc().shared( path ).length > 1 )
		}

		@ $mol_mem
		form_foot() {
			if( !this.doc_path() ) return []
			return [ ... this.detachable() ? [ this.Detach() ] : [], this.Node_dup(), this.Node_drop() ]
		}

		detach( event?: Event | null ) {
			const path = this.doc_path()
			if( path ) this.Doc().override( path )
			return event ?? null
		}

		node_dup( event?: Event | null ) {
			const path = this.doc_path()
			if( !path ) return event ?? null
			const index = this.selected()
			this.Doc().dup( path )
			if( index !== null ) this.selected( index + 1 )
			return event ?? null
		}

		node_drop( event?: Event | null ) {
			const path = this.doc_path()
			if( !path ) return event ?? null
			this.Doc().drop( path )
			this.selected( null )
			return event ?? null
		}

		typing( event?: Event | null ) {
			const target = event?.target as HTMLElement | null
			if( !target ) return false
			if( target.isContentEditable ) return true
			return target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'
		}

		key_drop( event?: Event | null ) {
			if( !this.editing() ) return event ?? null
			if( this.typing( event ) ) return event ?? null
			return this.node_drop( event )
		}

		field_bids( name: string ) {
			const path = this.doc_path()
			if( !path ) return []
			const kin = this.Doc().shared( path )
			if( kin.length < 2 ) return []
			const words = this.field_bid_words()
			const teen = kin.length % 100
			const last = kin.length % 10
			const word = teen > 10 && teen < 15 ? words[ 2 ]
				: last === 1 ? words[ 0 ]
				: last > 1 && last < 5 ? words[ 1 ]
				: words[ 2 ]
			return [ `${ this.field_bid_lead() } ${ kin.length } ${ word }` ]
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
				case 'list': return [ this.List( name ) ]
				case 'point': return [ ... this.vec_nums( name ), this.Aim_at( name ) ]
				case 'nodes':
				case 'node': return [ this.Refs( name ) ]
			}
			return []
		}

		@ $mol_mem
		doc_path() {
			const index = this.selected()
			if( index === null ) return ''
			return this.Doc().nodes()[ index ]?.path ?? ''
		}

		@ $mol_mem
		node_of() {
			const doc = this.Doc()
			const map = new Map< string, $bog_gamengine_node >()
			const walk = ( name: string, prefix: string, host: $bog_gamengine_node )=> {
				const refs = doc.refs( name )
				const kids = host.kids()
				for( let i = 0; i < refs.length; ++ i ) {
					const kid = kids[ i ]
					if( !kid ) continue
					const path = prefix + refs[ i ].type
					map.set( path, kid )
					walk( refs[ i ].type, path + '/', kid )
				}
			}
			walk( '', '', this.Scene() )
			return map
		}

		@ $mol_mem
		part_of() {
			const doc = this.Doc()
			const map = new Map< string, $bog_gamengine_part >()
			for( const [ path, node ] of this.node_of() ) {
				const refs = doc.parts( path.slice( path.lastIndexOf( '/' ) + 1 ) )
				const parts = node.parts()
				for( let i = 0; i < refs.length; ++ i ) {
					if( parts[ i ] ) map.set( `${ path }/${ refs[ i ].type }`, parts[ i ] )
				}
			}
			return map
		}

		props_of( path: string ): readonly $bog_gamengine_prop[] {
			if( !path ) return []
			const node = this.node_of().get( path )
			if( node ) return node.props()
			const part = this.part_of().get( path )
			return part?.props?.() ?? []
		}

		row_of( node: $bog_gamengine_node ) {
			for( const [ path, item ] of this.node_of() ) {
				if( item !== node ) continue
				const at = this.Doc().nodes().findIndex( row => row.path === path )
				if( at >= 0 ) return at
			}
			return null
		}

		write( prop: string, value: $bog_gamestudio_doc_value ) {
			const path = this.doc_path()
			if( !path ) return
			this.Doc().set( path, prop, value )
		}

		list_fields( name: string ) {
			return Object.keys( this.prop( name )?.fields ?? {} )
		}

		list_values( name: string ) {
			return ( this.prop( name )?.get() as readonly $bog_gamestudio_doc_row[] | undefined ) ?? []
		}

		@ $mol_mem_key
		list_rows( name: string ) {
			return [ ... this.list_values( name ).map( ( row, index )=> this.List_row( `${ name }/${ index }` ) ), this.List_add( name ) ]
		}

		@ $mol_mem_key
		list_row( key: string ) {
			const name = key.slice( 0, key.indexOf( '/' ) )
			return [ ... this.list_fields( name ).map( field => this.List_field( `${ key }/${ field }` ) ), this.List_drop( key ) ]
		}

		list_hint( key: string ) {
			return key.slice( key.lastIndexOf( '/' ) + 1 )
		}

		list_value( key: string, next?: string ) {
			const [ name, index, field ] = key.split( '/' )
			if( next === undefined ) return String( this.list_values( name )[ Number( index ) ]?.[ field ] ?? '' )
			const path = this.doc_path()
			if( path ) this.Doc().list_set( path, name, Number( index ), field, next )
			return next
		}

		list_drop( key: string, event?: Event | null ) {
			const [ name, index ] = key.split( '/' )
			const path = this.doc_path()
			if( path ) this.Doc().list_drop( path, name, Number( index ) )
			return event ?? null
		}

		list_add( name: string, event?: Event | null ) {
			const path = this.doc_path()
			if( !path ) return event ?? null
			const row = {} as Record< string, string >
			for( const field of this.list_fields( name ) ) row[ field ] = ''
			this.Doc().list_add( path, name, row )
			return event ?? null
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

		@ $mol_mem
		Gizmo_arrow() {
			const shape = super.Gizmo_arrow()
			shape.points( arrow_points )
			return shape
		}

		@ $mol_mem
		Gizmo_box() {
			const shape = super.Gizmo_box()
			shape.points( box_points )
			return shape
		}

		gizmo_tint_x() {
			return tint_x
		}

		gizmo_tint_y() {
			return tint_y
		}

		gizmo_tint_xy() {
			return tint_xy
		}

		gizmo_rot_y() {
			return rot_y
		}

		@ $mol_mem
		gizmo_size() {
			const cam = this.Cam()
			const ppu = this.draw_height() / ( cam.height() / cam.zoom() )
			return ppu > 0 ? gizmo_pixels / ppu : 0
		}

		@ $mol_mem
		gizmo_scale() {
			const size = this.gizmo_size()
			return new Float32Array([ size, size, 1 ])
		}

		@ $mol_mem
		gizmo_pos() {
			const world = this.node()?.world()
			return world ? new Float32Array([ world[ 12 ], world[ 13 ], world[ 14 ] ]) : vec_zero
		}

		@ $mol_mem
		gizmo_arrow_nodes() {
			return this.node() && this.editing() && !this.tool() ? [ this.Gizmo_x(), this.Gizmo_y() ] : []
		}

		@ $mol_mem
		gizmo_box_nodes() {
			return this.node() && this.editing() && !this.tool() ? [ this.Gizmo_xy() ] : []
		}

		@ $mol_mem
		tool( next?: string ) {
			return next ?? ''
		}

		tool_pick( next?: string ) {
			if( next !== undefined ) {
				this.tool( next )
				if( next ) this.place_drop()
			}
			return this.tool()
		}

		place_drop() {
			this.asset( null )
			this.kit( null )
		}

		brush_drop() {
			this.tool( '' )
			this.tile_char( '' )
		}

		tool_drop( event?: Event | null ) {
			this.brush_drop()
			this.place_drop()
			this.aiming( null )
			return event ?? null
		}

		@ $mol_mem
		tile_map() {
			for( const node of this.Scene().nodes() ) {
				if( node instanceof $bog_gamengine_tilemap && node.tile() ) return node
			}
			return null
		}

		tile_grid() {
			return this.tile_map()?.tile() ?? null
		}

		@ $mol_mem
		palette() {
			return this.tile_map()?.palette() ?? {}
		}

		@ $mol_mem
		tile_rows() {
			return [ this.Tools(), ... Object.keys( this.palette() ).map( char => this.Tile( char ) ) ]
		}

		tile_title( char: string ) {
			return `${ char } ${ this.palette()[ char ] }`
		}

		tile_uri( char: string ) {
			const frame = this.palette()[ char ]
			return this.Assets().list().find( item => this.Assets().name( item.uri ) === frame )?.uri ?? ''
		}

		tile_icon( char: string ) {
			return this.tile_uri( char ) ? this.Tile_image( char ) : null
		}

		@ $mol_mem
		tile_char( next?: string ) {
			return next ?? ''
		}

		tile_selected( char: string, next?: boolean ) {
			if( next !== undefined ) {
				this.tile_char( next ? char : '' )
				if( next ) this.place_drop()
			}
			return this.tile_char() === char
		}

		@ $mol_mem
		rect_nodes() {
			return this.Rect_shape().points().length ? [ this.Rect_node() ] : []
		}

		rect_preview( from: readonly [ number, number ], to: readonly [ number, number ] ) {
			const x0 = Math.min( from[ 0 ], to[ 0 ] )
			const x1 = Math.max( from[ 0 ], to[ 0 ] ) + 1
			const y0 = - Math.min( from[ 1 ], to[ 1 ] )
			const y1 = - Math.max( from[ 1 ], to[ 1 ] ) - 1
			this.Rect_shape().points( new Float32Array([
				x0, y0, 0, x1, y0, 0,
				x1, y0, 0, x1, y1, 0,
				x1, y1, 0, x0, y1, 0,
				x0, y1, 0, x0, y0, 0,
			]) )
		}

		brush_cells = [] as ( readonly [ number, number ] )[]
		brush_from = null as readonly [ number, number ] | null

		brushing() {
			return Boolean( this.tool() && this.tile_char() && this.tile_grid() && this.editing() )
		}

		brush_at = new Int32Array( 2 )
		brush_base = ''

		brush_cell( event: PointerEvent ) {
			const at = this.Point().world( this.point_world, this.point_x( event ), this.point_y( event ) )
			const cell = this.tile_grid()!.cell_at( at[ 0 ], at[ 1 ], this.brush_at )
			return [ cell[ 0 ], cell[ 1 ] ] as readonly [ number, number ]
		}

		painted( text: string, cells: readonly ( readonly [ number, number ] )[], char: string ) {
			const rows = text.split( '\n' ).map( row => [ ... row ] )
			for( const [ x, y ] of cells ) {
				const row = rows[ y ]
				if( !row || x < 0 || x >= row.length ) continue
				row[ x ] = char
			}
			return rows.map( row => row.join( '' ) ).join( '\n' )
		}

		brush_show( cells: readonly ( readonly [ number, number ] )[] ) {
			const grid = this.tile_grid()!
			grid.map( this.painted( this.brush_base, cells, this.tile_char() ) )
		}

		brush_down( cell: readonly [ number, number ] ) {
			const char = this.tile_char()
			if( this.tool() === 'fill' ) return this.Doc().fill( cell[ 0 ], cell[ 1 ], char )
			this.brush_from = cell
			this.brush_cells = [ cell ]
			this.brush_base = this.tile_grid()!.map()
			if( this.tool() === 'rect' ) return this.rect_preview( cell, cell )
			this.brush_show( this.brush_cells )
		}

		brush_move( cell: readonly [ number, number ] ) {
			const from = this.brush_from
			if( !from ) return
			if( this.tool() === 'rect' ) return this.rect_preview( from, cell )
			if( this.brush_cells.some( known => known[ 0 ] === cell[ 0 ] && known[ 1 ] === cell[ 1 ] ) ) return
			this.brush_cells.push( cell )
			this.brush_show( this.brush_cells )
		}

		brush_up( cell: readonly [ number, number ] ) {
			const from = this.brush_from
			if( !from ) return
			const cells = this.brush_cells
			this.brush_from = null
			this.brush_cells = []
			if( this.tool() === 'rect' ) {
				this.Rect_shape().points( new Float32Array( 0 ) )
				return this.Doc().rect( from[ 0 ], from[ 1 ], cell[ 0 ], cell[ 1 ], this.tile_char() )
			}
			this.Doc().paint_all( cells, this.tile_char() )
		}

		drag_axis = null as $bog_gamestudio_app_axis | null
		drag_moved = false
		drag_start = new Float32Array( 3 )
		drag_from = new Float32Array( 3 )
		drag_a = new Float32Array( 3 )
		drag_b = new Float32Array( 3 )
		point_world = new Float32Array( 3 )

		point_x( event: MouseEvent ) {
			return event.offsetX * this.$.$mol_dom_context.devicePixelRatio
		}

		point_y( event: MouseEvent ) {
			return event.offsetY * this.$.$mol_dom_context.devicePixelRatio
		}

		pan_grab = null as Float32Array | null
		pan_world = new Float32Array( 2 )
		fit_box = new Float32Array( 4 )

		@ $mol_mem
		grid( next?: boolean ) {
			return next ?? true
		}

		grid_step() {
			return $bog_gamestudio_app_grid_step
		}

		grid_value( value: number ) {
			return $bog_gamestudio_app_grid_value( value, this.grid() ? this.grid_step() : 0 )
		}

		grid_at( at: ArrayLike< number > ) {
			return [ this.grid_value( at[ 0 ] ), this.grid_value( at[ 1 ] ), this.grid_value( at[ 2 ] ?? 0 ) ]
		}

		wheel( event?: WheelEvent ) {
			if( !event ) return null
			event.preventDefault()
			const at = this.Point().world( this.point_world, this.point_x( event ), this.point_y( event ) )
			this.Cam().zoom_at( $bog_gamestudio_app_zoom_factor( event.deltaY, event.deltaMode ), at[ 0 ], at[ 1 ] )
			return event
		}

		pan_down( event: PointerEvent ) {
			const at = this.Point().world( this.point_world, this.point_x( event ), this.point_y( event ) )
			this.pan_world[ 0 ] = at[ 0 ]
			this.pan_world[ 1 ] = at[ 1 ]
			this.pan_grab = this.pan_world
			if( event.isTrusted ) ( this.Draw().dom_node() as HTMLElement ).setPointerCapture( event.pointerId )
		}

		pan_move( event: PointerEvent ) {
			const grab = this.pan_grab
			if( !grab ) return
			const at = this.Point().world( this.point_world, this.point_x( event ), this.point_y( event ) )
			this.Cam().pan( grab[ 0 ] - at[ 0 ], grab[ 1 ] - at[ 1 ] )
		}

		fit( event?: Event ) {
			const bounds = $bog_gamestudio_app_bounds( this.Scene().nodes(), this.fit_box )
			const rows = this.tile_grid()?.rows() ?? null
			let wide = 0
			if( rows ) for( let i = 0; i < rows.length; ++ i ) wide = Math.max( wide, rows[ i ].length )
			const shown = wide ? $bog_gamestudio_app_wider( bounds, 0, - rows!.length, wide, 0, this.fit_box ) : bounds
			if( !shown ) return event ?? null
			const cam = this.Cam()
			const aspect = this.draw_width() / this.draw_height() || cam.aspect()
			const width = Math.max( ( shown[ 2 ] - shown[ 0 ] ) * $bog_gamestudio_app_fit_gap, 1 )
			const height = Math.max( ( shown[ 3 ] - shown[ 1 ] ) * $bog_gamestudio_app_fit_gap, 1 )
			const zoom = Math.min( cam.height() / height, cam.height() * aspect / width )
			cam.zoom( Math.min( cam.zoom_max(), Math.max( cam.zoom_min(), zoom ) ) )
			cam.place( ( shown[ 0 ] + shown[ 2 ] ) / 2, ( shown[ 1 ] + shown[ 3 ] ) / 2 )
			return event ?? null
		}

		pointer_down( event?: PointerEvent ) {
			if( !event ) return null
			if( !this.history_held() ) this.history_taken = false
			this.history_gesture = true
			const x = this.point_x( event )
			const y = this.point_y( event )
			const point = this.Point()
			const asset = this.asset()
			if( event.button === 1 ) {
				this.pan_down( event )
				return event
			}
			if( asset && this.editing() ) {
				this.place( asset, this.grid_at( point.world( this.point_world, x, y ) ) )
				return event
			}
			const aiming = this.aiming()
			if( aiming && this.editing() ) {
				const nodes = this.Scene().nodes()
				this.aim_at( aiming, point.pick( nodes, x, y ), point.world( this.point_world, x, y ) )
				return event
			}
			const kit = this.kit()
			if( kit && this.editing() ) {
				const item = this.Kit().item( kit )
				if( item?.part ) {
					const nodes = this.Scene().nodes()
					const host = point.pick( nodes, x, y )
					if( host ) {
						this.selected( this.row_of( host ) )
						this.kit_attach( kit )
					}
					return event
				}
				this.kit_place( kit, this.grid_at( point.world( this.point_world, x, y ) ) )
				return event
			}
			if( this.brushing() ) {
				this.brush_down( this.brush_cell( event ) )
				if( event.isTrusted && this.brush_from ) ( this.Draw().dom_node() as HTMLElement ).setPointerCapture( event.pointerId )
				return event
			}
			const node = this.node()
			if( node && this.editing() ) {
				const at = point.world( this.point_world, x, y )
				const origin = this.gizmo_pos()
				const axis = $bog_gamestudio_app_gizmo_hit( at[ 0 ] - origin[ 0 ], at[ 1 ] - origin[ 1 ], this.gizmo_size() )
				if( axis ) {
					this.drag_axis = axis
					this.drag_moved = false
					this.drag_start.set( at )
					this.drag_from.set( node.pos() )
					if( event.isTrusted ) ( this.Draw().dom_node() as HTMLElement ).setPointerCapture( event.pointerId )
					return event
				}
			}
			const nodes = this.Scene().nodes()
			const picked = point.pick( nodes, x, y )
			this.selected( picked ? this.row_of( picked ) : null )
			if( !picked ) this.pan_down( event )
			return event
		}

		pointer_move( event?: PointerEvent ) {
			if( !event ) return null
			if( this.pan_grab ) {
				this.pan_move( event )
				return event
			}
			if( this.doc_land() ) {
				const at = this.Point().world( this.point_world, this.point_x( event ), this.point_y( event ) )
				this.spot( new Float32Array([ at[ 0 ], at[ 1 ] ]) )
			}
			if( this.brush_from ) {
				this.brush_move( this.brush_cell( event ) )
				return event
			}
			const axis = this.drag_axis
			if( !axis ) return null
			const node = this.node()
			if( !node ) return null
			const at = this.Point().world( this.point_world, this.point_x( event ), this.point_y( event ) )
			const from = this.drag_from
			const start = this.drag_start
			const next = node.pos() === this.drag_a ? this.drag_b : this.drag_a
			next[ 0 ] = axis === 'y' ? from[ 0 ] : this.grid_value( from[ 0 ] + at[ 0 ] - start[ 0 ] )
			next[ 1 ] = axis === 'x' ? from[ 1 ] : this.grid_value( from[ 1 ] + at[ 1 ] - start[ 1 ] )
			next[ 2 ] = from[ 2 ]
			this.drag_moved = true
			node.pos( next )
			return event
		}

		pointer_up( event?: PointerEvent ) {
			this.history_gesture = false
			if( this.pan_grab ) {
				this.pan_grab = null
				return event ?? null
			}
			if( event && this.brush_from ) {
				this.brush_up( this.brush_cell( event ) )
				return event
			}
			if( !event || !this.drag_axis ) return null
			this.drag_axis = null
			const node = this.node()
			if( node && this.drag_moved ) this.write( 'pos', this.grid_at( node.pos() ) )
			return event
		}

	}

}
