namespace $.$$ {

	const mine_home = new Float32Array([ 1, 1, 1, 1 ])
	const mine_lit = new Float32Array([ 1, 1, 0.45, 1 ])

	export class $bog_legion_app extends $.$bog_legion_app {

		key_map() {
			return {
				space: ( state?: boolean )=> {
					if( state ) this.paused( !this.paused() )
					return true
				},
				escape: ( state?: boolean )=> {
					if( state ) this.sel([])
					return true
				},
			}
		}

		paused( next?: boolean ) {
			return this.Clock().paused( next )
		}

		@ $mol_mem
		palette() {
			return { '#': 'wall', '.': 'floor', 'A': 'floor', 'B': 'floor', 'o': 'floor' }
		}

		tilemap_pool() {
			return this.Tilemap().pool()
		}

		flash_pool() {
			return this.Flash().pool()
		}

		@ $mol_mem
		flash_life() {
			return new Float32Array([ 0.25, 0.5 ])
		}

		@ $mol_mem
		flash_speed() {
			return new Float32Array([ 2, 5 ])
		}

		@ $mol_mem
		flash_size() {
			return new Float32Array([ 0.4, 0.05 ])
		}

		@ $mol_mem
		flash_color() {
			return new Float32Array([ 1, 0.92, 0.6, 1, 1, 0.35, 0.15, 0 ])
		}

		@ $mol_mem
		unit_size() {
			return new Float32Array([ 0.85, 0.85 ])
		}

		@ $mol_mem
		res_size() {
			return new Float32Array([ 0.7, 0.7 ])
		}

		@ $mol_mem
		cam_bounds() {
			const tile = this.Tile()
			return new Float32Array([ 0, - tile.height(), tile.width(), 0 ])
		}

		@ $mol_mem
		cam_pos( next?: Float32Array ) {
			if( next ) return next
			const tile = this.Tile()
			return new Float32Array([ tile.width() / 2, - tile.height() / 2, 0 ])
		}

		cell( x: number, y: number ) {
			return this.Tile().cell_pos( x, y, new Float32Array( 3 ) )
		}

		@ $mol_mem
		res_ids() {
			return this.Tile().spots( 'o' ).map( spot => `${ spot[ 0 ] }_${ spot[ 1 ] }` ) as readonly string[]
		}

		@ $mol_mem_key
		res_pos( id: string ) {
			const [ x, y ] = id.split( '_' ).map( Number )
			return this.cell( x, y )
		}

		@ $mol_mem
		resources() {
			return this.res_ids().map( id => this.Res( id ) )
		}

		count_max() {
			return 50
		}

		@ $mol_mem
		unit_ids() {
			const ids = [] as string[]
			for( let i = 0; i < this.count_max(); ++i ) ids.push( String( i ) )
			return ids as readonly string[]
		}

		base( char: string ) {
			const spots = this.Tile().spots( char )
			return spots.length ? spots[ 0 ] : [ 0, 0 ] as const
		}

		start_at( id: string, from: number ) {
			const i = Number( id )
			return this.cell( from + i % 10, 12 + ( ( i / 10 ) | 0 ) )
		}

		@ $mol_mem_key
		mine_start( id: string ) {
			return this.start_at( id, 2 )
		}

		@ $mol_mem_key
		foe_start( id: string ) {
			return this.start_at( id, 28 )
		}

		@ $mol_mem_key
		foe_home( id: string ) {
			return this.foe_start( id )
		}

		@ $mol_mem_key
		mine_pos( id: string, next?: Float32Array ) {
			return next ?? this.mine_start( id )
		}

		@ $mol_mem_key
		foe_pos( id: string, next?: Float32Array ) {
			return next ?? this.foe_start( id )
		}

		mine_kids( id: string ) {
			return [ this.Brain( id ) ]
		}

		foe_kids( id: string ) {
			return [ this.Tree( id ) ]
		}

		brain_kids( id: string ) {
			return [ this.Idle( id ), this.Move( id ), this.Attack( id ), this.Fallen( id ) ]
		}

		@ $mol_mem
		idle_next() {
			return [
				{ to: 'dead', when: 'dead' },
				{ to: 'attack', when: 'in_reach' },
				{ to: 'move', when: 'busy' },
			] as readonly $bog_gamengine_brain_fsm_next[]
		}

		@ $mol_mem
		move_next() {
			return [
				{ to: 'dead', when: 'dead' },
				{ to: 'attack', when: 'in_reach' },
				{ to: 'idle', when: 'resting' },
			] as readonly $bog_gamengine_brain_fsm_next[]
		}

		@ $mol_mem
		attack_next() {
			return [
				{ to: 'dead', when: 'dead' },
				{ to: 'move', when: 'lost_foe' },
			] as readonly $bog_gamengine_brain_fsm_next[]
		}

		tree_kids( id: string ) {
			return [ this.Plan( id ) ]
		}

		plan_kids( id: string ) {
			return [ this.Fight( id ), this.Hunt( id ), this.Roam( id ) ]
		}

		fight_kids( id: string ) {
			return [ this.Near( id ), this.Strike( id ) ]
		}

		hunt_kids( id: string ) {
			return [ this.Seen( id ), this.Rush( id ) ]
		}

		@ $mol_mem
		mine_live_ids() {
			return this.unit_ids().filter( id => !this.mine_dead( id ) )
		}

		@ $mol_mem
		foe_live_ids() {
			return this.unit_ids().filter( id => !this.foe_dead( id ) )
		}

		@ $mol_mem
		mine_alive() {
			return this.mine_live_ids().map( id => this.Mine( id ) )
		}

		@ $mol_mem
		foe_alive() {
			return this.foe_live_ids().map( id => this.Foe( id ) )
		}

		@ $mol_mem
		sel( next?: readonly string[] ): readonly string[] {
			return next ?? []
		}

		@ $mol_mem
		sel_live() {
			const live = this.mine_live_ids()
			return this.sel().filter( id => live.includes( id ) ) as readonly string[]
		}

		mine_tint( id: string ) {
			return this.sel().includes( id ) ? mine_lit : mine_home
		}

		@ $mol_mem
		sprites() {
			return [
				... this.resources(),
				... this.foe_live_ids().map( id => this.Foe_sprite( id ) ),
				... this.mine_live_ids().map( id => this.Mine_sprite( id ) ),
			]
		}

		@ $mol_mem
		nodes() {
			return [
				this.Tilemap(),
				... this.foe_alive(),
				... this.mine_alive(),
				... this.sprites(),
				this.Flash(),
				this.Cam(),
			]
		}

		@ $mol_mem
		batches() {
			return [ this.Tilemap_batch(), ... this.Scene().auto_batches(), this.Flash_batch() ]
		}

		@ $mol_mem
		drag( next?: readonly number[] | null ): readonly number[] | null {
			return next ?? null
		}

		band_box() {
			const drag = this.drag()
			if( !drag ) return [ 0, 0, 0, 0 ] as const
			return [
				Math.min( drag[ 0 ], drag[ 2 ] ),
				Math.min( drag[ 1 ], drag[ 3 ] ),
				Math.abs( drag[ 2 ] - drag[ 0 ] ),
				Math.abs( drag[ 3 ] - drag[ 1 ] ),
			] as const
		}

		band_left() {
			return `${ this.band_box()[ 0 ].toFixed( 0 ) }px`
		}

		band_top() {
			return `${ this.band_box()[ 1 ].toFixed( 0 ) }px`
		}

		band_width() {
			return `${ this.band_box()[ 2 ].toFixed( 0 ) }px`
		}

		band_height() {
			return `${ this.band_box()[ 3 ].toFixed( 0 ) }px`
		}

		pointer_down( event?: PointerEvent ) {
			if( !event ) return null
			if( event.button === 2 ) {
				this.command( event.offsetX, event.offsetY )
				return event
			}
			this.drag([ event.offsetX, event.offsetY, event.offsetX, event.offsetY ])
			return event
		}

		pointer_move( event?: PointerEvent ) {
			if( !event ) return null
			const dpr = this.Draw().dpr()
			this.Cam().aim( event.offsetX * dpr, event.offsetY * dpr )
			const drag = this.drag()
			if( drag ) this.drag([ drag[ 0 ], drag[ 1 ], event.offsetX, event.offsetY ])
			return event
		}

		pointer_up( event?: PointerEvent ) {
			if( !event ) return null
			this.choose()
			return event
		}

		pointer_leave( event?: PointerEvent ) {
			if( !event ) return null
			this.Cam().away()
			this.choose()
			return event
		}

		wheel( event?: WheelEvent ) {
			if( !event ) return null
			event.preventDefault()
			this.Cam().roll( event.deltaY )
			return event
		}

		menu( event?: MouseEvent ) {
			if( !event ) return null
			event.preventDefault()
			return event
		}

		spot( x: number, y: number ) {
			return this.Point().world( new Float32Array( 3 ), x, y )
		}

		box_ids = [] as number[]

		choose() {
			const drag = this.drag()
			if( !drag ) return
			this.drag( null )
			const live = this.mine_live_ids()
			if( Math.abs( drag[ 2 ] - drag[ 0 ] ) < 5 && Math.abs( drag[ 3 ] - drag[ 1 ] ) < 5 ) {
				const hit = this.Point().pick( this.mine_alive(), drag[ 0 ], drag[ 1 ] )
				const found = live.filter( id => this.Mine( id ) === hit )
				this.sel( found )
				return
			}
			const at = this.box_ids
			this.Point().pick_box( this.mine_alive(), drag[ 0 ], drag[ 1 ], drag[ 2 ], drag[ 3 ], at )
			this.sel( at.map( index => live[ index ] ) )
		}

		command( x: number, y: number ) {
			const ids = this.sel_live()
			if( !ids.length ) return
			const at = this.spot( x, y )
			const grid = this.Grid()
			const side = Math.ceil( Math.sqrt( ids.length ) ) || 1
			const gap = 0.95
			for( let i = 0; i < ids.length; ++i ) {
				const col = i % side
				const row = ( i / side ) | 0
				let gx = at[ 0 ] + ( col - ( side - 1 ) / 2 ) * gap
				let gy = at[ 1 ] - ( row - ( side - 1 ) / 2 ) * gap
				if( grid.solid_at( gx, gy ) ) {
					gx = at[ 0 ]
					gy = at[ 1 ]
				}
				this.Mine( ids[ i ] ).order_to( gx, gy )
			}
			this.Sound().play( 'order' )
		}

		map_tick() {
			return this.$.$mol_state_time.now( 500 )
		}

		@ $mol_mem
		dot_ids() {
			this.map_tick()
			const ids = [] as string[]
			for( const id of this.mine_live_ids() ) ids.push( 'm' + id )
			for( const id of this.foe_live_ids() ) ids.push( 'f' + id )
			return ids as readonly string[]
		}

		dot_unit( id: string ) {
			return id[ 0 ] === 'm' ? this.Mine( id.slice( 1 ) ) : this.Foe( id.slice( 1 ) )
		}

		dot_left( id: string ) {
			this.map_tick()
			return `${ ( this.dot_unit( id ).here[ 0 ] / this.Tile().width() * 100 ).toFixed( 1 ) }%`
		}

		dot_top( id: string ) {
			this.map_tick()
			return `${ ( - this.dot_unit( id ).here[ 1 ] / this.Tile().height() * 100 ).toFixed( 1 ) }%`
		}

		dot_back( id: string ) {
			return id[ 0 ] === 'm' ? '#5a9ce8' : '#dc5a50'
		}

		@ $mol_mem
		dots() {
			return this.dot_ids().map( id => this.Dot( id ) )
		}

		@ $mol_mem
		over() {
			const done = !this.mine_live_ids().length || !this.foe_live_ids().length
			const clock = this.Clock()
			if( done ) new this.$.$mol_after_tick( ()=> clock.paused( true ) )
			return done
		}

		@ $mol_mem
		field() {
			return [
				this.Draw(),
				... this.drag() ? [ this.Band() ] : [],
				this.Minimap(),
				... this.over() ? [ this.End() ] : [],
			]
		}

		end_title() {
			return this.foe_live_ids().length ? 'Лагерь пал' : 'Победа'
		}

		end_hint() {
			return this.foe_live_ids().length
				? `Врагов осталось ${ this.foe_live_ids().length }`
				: `Своих осталось ${ this.mine_live_ids().length }`
		}

		restart( next?: any ) {
			if( next === undefined ) return null
			for( const id of this.unit_ids() ) {
				this.Mine( id ).reset( this.mine_start( id ) )
				this.Foe( id ).reset( this.foe_start( id ) )
			}
			this.sel([])
			this.drag( null )
			this.Clock().time( 0 )
			this.Clock().paused( false )
			return null
		}

		mine_count() {
			return String( this.mine_live_ids().length )
		}

		foe_count() {
			return String( this.foe_live_ids().length )
		}

		sel_count() {
			return String( this.sel_live().length )
		}

		legion_stat() {
			if( !this.Atlas().ready() ) return ''
			const ids = this.sel_live()
			let x = 0
			let y = 0
			for( const id of ids ) {
				const at = this.Mine( id ).pos()
				x += at[ 0 ]
				y += at[ 1 ]
			}
			const div = ids.length || 1
			return `mine ${ this.mine_live_ids().length } | foes ${ this.foe_live_ids().length }`
				+ ` | sel ${ ids.length } | at ${ ( x / div ).toFixed( 2 ) } × ${ ( y / div ).toFixed( 2 ) }`
				+ ` | nodes ${ this.Scene().nodes().length } | atlas 1`
		}

	}

}
