namespace $.$$ {

	export class $bog_gamengine_demo_flat extends $.$bog_gamengine_demo_flat {

		@ $mol_mem
		cam_pos() {
			return new Float32Array([ this.Tile().width() / 2, - this.Tile().height() / 2, 0 ])
		}

		@ $mol_mem
		palette() {
			return { '#': 'wall', '.': 'floor' }
		}

		@ $mol_mem
		hero_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 1.5, -1.5, 0 ])
		}

		coin_cells() {
			return [ [ 18, 1 ], [ 8, 5 ], [ 10, 13 ] ] as const
		}

		@ $mol_mem_key
		coin_pos( id: string ) {
			const [ x, y ] = this.coin_cells()[ Number( id ) ]
			return this.Tile().cell_pos( x, y, new Float32Array( 3 ) )
		}

		@ $mol_mem
		coin_ids() {
			return this.coin_cells().map( ( cell, i )=> String( i ) )
		}

		@ $mol_mem
		coins_left() {
			return this.coin_ids().filter( id => !this.coin_taken( id ) )
		}

		@ $mol_mem
		coins() {
			return this.coins_left().map( id => this.Coin( id ) )
		}

		@ $mol_mem
		coin_sprites() {
			return this.coins_left().map( id => this.Coin_sprite( id ) )
		}

		@ $mol_mem
		bodies() {
			return [ this.Hero(), ... this.coins() ]
		}

		@ $mol_mem
		sprites() {
			return [ ... this.coin_sprites(), this.Ghost_sprite(), this.Hero_sprite() ]
		}

		font_sources() {
			return this.Font().sources()
		}

		@ $mol_mem_key
		coin_text_pos( id: string ) {
			const pos = this.coin_pos( id )
			return new Float32Array([ pos[ 0 ], pos[ 1 ] + 0.6, pos[ 2 ] ])
		}

		@ $mol_mem
		coin_text_color() {
			return new Float32Array([ 1, 0.92, 0.35, 1 ])
		}

		@ $mol_mem
		coin_texts() {
			return this.coins_left().map( id => this.Coin_text( id ) )
		}

		@ $mol_mem
		nodes() {
			return [ this.Tilemap(), ... this.bodies(), this.Ghost(), ... this.sprites(), ... this.coin_texts() ]
		}

		nodes_stat() {
			return `nodes ${ this.Scene().nodes().length }`
		}

		@ $mol_mem
		ghost_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 18.5, -13.5, 0 ])
		}

		@ $mol_mem
		ghost_tint() {
			return new Float32Array([ 0.7, 0.4, 1, 1 ])
		}

		ghost_stat() {
			if( !this.Atlas().ready() ) return ''
			const pos = this.ghost_pos()
			return `ghost ${ pos[ 0 ].toFixed( 2 ) } × ${ pos[ 1 ].toFixed( 2 ) } | path ${ this.Ghost().path_count() }`
		}

		pointer_down( event?: PointerEvent ) {
			if( !event ) return null
			const x = event.offsetX
			const y = event.offsetY
			const point = this.Point()
			point.move( x, y )
			const coin = point.pick( this.coins(), x, y )
			if( coin instanceof $bog_gamengine_demo_flat_coin ) coin.taken( true )
			return event
		}

		label_world = new Float32Array( 3 )
		label_screen = new Float32Array( 3 )

		@ $mol_mem
		label_pos() {
			this.Scene().step()
			const pos = this.hero_pos()
			const world = this.label_world
			world[ 0 ] = pos[ 0 ]
			world[ 1 ] = pos[ 1 ] + 0.5
			world[ 2 ] = pos[ 2 ]
			const screen = this.Point().screen( this.label_screen, world )
			const draw = this.Draw().view_rect()
			const node = this.Hero_label().dom_node() as HTMLElement
			const page = node.offsetParent?.getBoundingClientRect()
			const dx = ( draw?.left ?? 0 ) - ( page?.left ?? 0 )
			const dy = ( draw?.top ?? 0 ) - ( page?.top ?? 0 )
			return [ screen[ 0 ] + dx, screen[ 1 ] + dy ] as const
		}

		label_left() {
			return `${ this.label_pos()[ 0 ].toFixed( 1 ) }px`
		}

		label_top() {
			return `${ this.label_pos()[ 1 ].toFixed( 1 ) }px`
		}

		coins_stat() {
			const all = this.coin_ids().length
			return `${ all - this.coins_left().length } / ${ all }`
		}

		hero_stat() {
			if( !this.Atlas().ready() ) return ''
			const pos = this.hero_pos()
			return `hero ${ pos[ 0 ].toFixed( 2 ) } × ${ pos[ 1 ].toFixed( 2 ) } | frame ${ this.Hero_sprite().frame_now() }`
		}

	}

}
