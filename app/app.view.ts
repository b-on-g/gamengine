namespace $.$$ {

	export class $bog_jumper_app extends $.$bog_jumper_app {

		key_map() {
			return this.Key().keys()
		}

		@ $mol_mem
		cell_ids() {
			const level = this.Level()
			return [ ... level.ids( '#' ), ... level.ids( '=' ) ] as readonly string[]
		}

		cell_frame( id: string ) {
			const [ x, y ] = this.Level().xy( id )
			return this.Level().frame( x, y )
		}

		@ $mol_mem_key
		cell_pos( id: string ) {
			return this.Level().pos_of( id )
		}

		@ $mol_mem
		cells() {
			return this.cell_ids().map( id => this.Cell( id ) )
		}

		@ $mol_mem
		sky_pos() {
			const level = this.Level()
			return new Float32Array([ level.width() / 2, - level.height() / 2, 0 ])
		}

		@ $mol_mem
		sky_size() {
			const level = this.Level()
			return new Float32Array([ level.width(), level.height() ])
		}

		@ $mol_mem
		item_ids() {
			const level = this.Level()
			return [ ... level.ids( 'o' ), ... level.ids( 'x' ), ... level.ids( 'F' ) ] as readonly string[]
		}

		item_role( id: string ) {
			const [ x, y ] = this.Level().xy( id )
			const sign = this.Level().sign( x, y )
			if( sign === 'o' ) return 'coin'
			if( sign === 'x' ) return 'spike'
			return 'flag'
		}

		@ $mol_mem_key
		item_pos( id: string ) {
			return this.Level().pos_of( id )
		}

		@ $mol_mem
		items_left() {
			return this.item_ids().filter( id => !this.item_taken( id ) )
		}

		@ $mol_mem
		items() {
			return this.items_left().map( id => this.Item( id ) )
		}

		@ $mol_mem
		item_sprites() {
			return this.items_left().map( id => this.Item_sprite( id ) )
		}

		@ $mol_mem
		enemy_ids() {
			return this.Level().ids( 'E' )
		}

		@ $mol_mem_key
		enemy_pos( id: string, next?: Float32Array ) {
			return next ?? this.Level().pos_of( id )
		}

		enemy_kids( id: string ) {
			return [ this.Brain( id ) ]
		}

		brain_kids( id: string ) {
			return [ this.Walk_right( id ), this.Walk_left( id ) ]
		}

		walk_right_next() {
			return [ { to: 'left', when: 'edge_right' } ] as readonly $bog_gamengine_brain_fsm_next[]
		}

		walk_left_next() {
			return [ { to: 'right', when: 'edge_left' } ] as readonly $bog_gamengine_brain_fsm_next[]
		}

		@ $mol_mem
		enemies_left() {
			return this.enemy_ids().filter( id => !this.enemy_dead( id ) )
		}

		@ $mol_mem
		enemies() {
			return this.enemies_left().map( id => this.Enemy( id ) )
		}

		@ $mol_mem
		enemy_sprites() {
			return this.enemies_left().map( id => this.Enemy_sprite( id ) )
		}

		hero_start() {
			return this.Level().start_pos()
		}

		@ $mol_mem
		hero_pos( next?: Float32Array ) {
			return next ?? this.Level().start_pos()
		}

		@ $mol_mem
		bodies() {
			return [ this.Hero(), ... this.enemies(), ... this.items() ]
		}

		@ $mol_mem
		sprites() {
			return [
				this.Sky(),
				... this.cells(),
				... this.item_sprites(),
				... this.enemy_sprites(),
				this.Hero_sprite(),
			]
		}

		@ $mol_mem
		nodes() {
			return [ ... this.bodies(), ... this.sprites(), this.Cam() ]
		}

		cam_height() {
			return this.Level().height()
		}

		@ $mol_mem
		cam_bounds() {
			const level = this.Level()
			return new Float32Array([ 0, - level.height(), level.width(), 0 ])
		}

		@ $mol_mem
		over() {
			const frozen = this.Hero().frozen()
			const clock = this.Clock()
			new this.$.$mol_after_tick( ()=> clock.paused( frozen ) )
			return frozen
		}

		@ $mol_mem
		game() {
			return [
				this.Draw(),
				this.Screen(),
				... this.over() ? [ this.End() ] : [],
			]
		}

		end_title() {
			return this.hero_won() ? 'Победа' : 'Игра окончена'
		}

		end_hint() {
			return this.hero_won()
				? `Монет собрано: ${ this.coins_stat() }`
				: 'Жизни кончились'
		}

		restart( next?: any ) {
			if( next === undefined ) return null
			const level = this.Level()
			for( const id of this.item_ids() ) this.Item( id ).taken( false )
			for( const id of this.enemy_ids() ) {
				const enemy = this.Enemy( id )
				enemy.dead( false )
				enemy.pos( level.pos_of( id ) )
				enemy.vel( new Float32Array( 3 ) )
			}
			this.Hero().revive()
			this.Clock().time( 0 )
			return null
		}

		lives_stat() {
			return String( this.hero_lives() )
		}

		coins_stat() {
			const coins = this.Level().ids( 'o' ).length
			return `${ this.hero_coins() } / ${ coins }`
		}

		time_stat() {
			return `Время ${ this.Clock().time().toFixed( 1 ) } с`
		}

		hero_stat() {
			if( !this.Atlas().ready() ) return ''
			const pos = this.hero_pos()
			return `hero ${ pos[ 0 ].toFixed( 2 ) } × ${ pos[ 1 ].toFixed( 2 ) } | lives ${ this.hero_lives() } | coins ${ this.hero_coins() }`
		}

	}

}
