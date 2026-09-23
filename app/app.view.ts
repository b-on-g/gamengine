namespace $ {

	export type $bog_gamestudio_app_axis = 'x' | 'y' | 'xy'

	export type $bog_gamestudio_app_mode = 'edit' | 'play' | 'pause'

	export type $bog_gamestudio_app_snap = {
		readonly node: $bog_gamengine_node
		readonly prop: string
		readonly value: unknown
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

	const tint_x = new Float32Array([ 1, 0, 0, 1 ])
	const tint_y = new Float32Array([ 0, 1, 0, 1 ])
	const tint_xy = new Float32Array([ 1, 1, 0, 1 ])
	const rot_y = new Float32Array([ 0, 0, Math.PI / 2 ])

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

		@ $mol_mem
		tab_stored( next = '0' ) {
			return next
		}

		tab( next?: string ) {
			if( next ) this.tab_stored( next )
			return this.tab_stored()
		}

		@ $mol_mem
		asset( next?: string | null ) {
			return next ?? null
		}

		placing() {
			return this.asset() !== null && this.editing()
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
			if( next !== undefined ) this.asset( next ? uri : null )
			return this.asset() === uri
		}

		asset_drop( event?: DragEvent | null ) {
			if( !event ) return null
			event.preventDefault()
			this.Drop().status( 'ready' )
			const uri = event.dataTransfer?.getData( 'text/plain' ) ?? ''
			if( !this.Assets().kind( uri ) || !this.editing() ) return event
			const at = this.Point().world( this.point_world, this.point_x( event ), this.point_y( event ) )
			this.place( uri, at )
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
					doc.add( '$bog_gamengine_mesh', {
						name: `\\${ name }`,
						atlas: '<= Atlas',
						frame: `\\${ frame }`,
						pos,
						shape: `<= ${ mesh }_shape $bog_gamestudio_assets_gltf\n\turi \\${ uri }`,
					} )
					doc.add( '$bog_gamengine_batch', {
						shader: `<= ${ mesh }_shader $bog_gamengine_shader_solid`,
						shape: `<= ${ mesh }_shape`,
						atlas: '<= Atlas',
						nodes: `/ <= ${ mesh }`,
					}, 'batches' )
					return mesh
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
			for( const node of this.Scene().nodes() ) {
				for( const prop of node.props() ) {
					const value = prop.get()
					snap.push({ node, prop: prop.name, value: value instanceof Float32Array ? new Float32Array( value ) : value })
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
				for( const { node, prop, value } of this.snap ) {
					node.props().find( item => item.name === prop )?.set( value instanceof Float32Array ? new Float32Array( value ) : value )
				}
			}
			this.snap = []
			this.snap_scene = null
			this.mode( 'edit' )
			return event ?? null
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
			return this.node() && this.editing() ? [ this.Gizmo_x(), this.Gizmo_y() ] : []
		}

		@ $mol_mem
		gizmo_box_nodes() {
			return this.node() && this.editing() ? [ this.Gizmo_xy() ] : []
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

		pointer_down( event?: PointerEvent ) {
			if( !event ) return null
			const x = this.point_x( event )
			const y = this.point_y( event )
			const point = this.Point()
			const asset = this.asset()
			if( asset && this.editing() ) {
				this.place( asset, point.world( this.point_world, x, y ) )
				this.asset( null )
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
			this.selected( picked ? nodes.indexOf( picked ) : null )
			return event
		}

		pointer_move( event?: PointerEvent ) {
			const axis = this.drag_axis
			if( !event || !axis ) return null
			const node = this.node()
			if( !node ) return null
			const at = this.Point().world( this.point_world, this.point_x( event ), this.point_y( event ) )
			const from = this.drag_from
			const start = this.drag_start
			const next = node.pos() === this.drag_a ? this.drag_b : this.drag_a
			next[ 0 ] = axis === 'y' ? from[ 0 ] : from[ 0 ] + at[ 0 ] - start[ 0 ]
			next[ 1 ] = axis === 'x' ? from[ 1 ] : from[ 1 ] + at[ 1 ] - start[ 1 ]
			next[ 2 ] = from[ 2 ]
			this.drag_moved = true
			node.pos( next )
			return event
		}

		pointer_up( event?: PointerEvent ) {
			if( !event || !this.drag_axis ) return null
			this.drag_axis = null
			const node = this.node()
			if( node && this.drag_moved ) this.write( 'pos', Array.from( node.pos() ) )
			return event
		}

	}

}
