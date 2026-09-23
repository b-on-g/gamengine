namespace $.$$ {

	export class $bog_gamengine_demo_flat extends $.$bog_gamengine_demo_flat {

		@ $mol_mem
		cam_pos() {
			return new Float32Array([ this.Tile().width() / 2, - this.Tile().height() / 2, 0 ])
		}

		@ $mol_mem
		cell_ids() {
			const rows = this.Tile().rows()
			const ids = [] as string[]
			for( let y = 0; y < rows.length; ++y ) {
				for( let x = 0; x < rows[ y ].length; ++x ) ids.push( `${ x }_${ y }` )
			}
			return ids as readonly string[]
		}

		cell_xy( id: string ) {
			return id.split( '_' ).map( Number ) as [ number, number ]
		}

		cell_frame( id: string ) {
			const [ x, y ] = this.cell_xy( id )
			return this.Tile().cell( x, y ) ? 'wall' : 'floor'
		}

		@ $mol_mem_key
		cell_pos( id: string ) {
			const [ x, y ] = this.cell_xy( id )
			return new Float32Array([ x + 0.5, - y - 0.5, 0 ])
		}

		@ $mol_mem
		cells() {
			return this.cell_ids().map( id => this.Cell( id ) )
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
			return new Float32Array([ x + 0.5, - y - 0.5, 0 ])
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
			return [ ... this.cells(), ... this.coin_sprites(), this.Hero_sprite() ]
		}

		@ $mol_mem
		nodes() {
			return [ ... this.bodies(), ... this.sprites() ]
		}

		pointer_down( event?: PointerEvent ) {
			if( !event ) return null
			const dpr = this.$.$mol_dom_context.devicePixelRatio
			const x = event.offsetX * dpr
			const y = event.offsetY * dpr
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
			const dpr = this.$.$mol_dom_context.devicePixelRatio
			return [ screen[ 0 ] / dpr, screen[ 1 ] / dpr ] as const
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
