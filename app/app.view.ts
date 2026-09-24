namespace $.$$ {

	function screen_tint( ... screen: readonly number[] ) {
		const out = new Float32Array( screen.length )
		for( let i = 0; i < screen.length; ++ i ) out[ i ] = i % 4 === 3 ? screen[ i ] : Math.pow( screen[ i ], 2.2 )
		return out
	}

	const spark_tint = screen_tint( 1, 0.9, 0.6, 1, 1, 0.4, 0.1, 0 )

	const wall_half = new Float32Array([ 0.5, 1, 0.5 ])
	const wall_lift = 1
	const target_lift = 0.9
	const floor_normal = new Float32Array([ 0, 1, 0 ])
	const floor_at = new Float32Array( 3 )

	export class $bog_shooter_app extends $.$bog_shooter_app {

		key_map() {
			return this.Key().keys()
		}

		@ $mol_mem
		Phys() {
			this.round()
			const arena = this.Arena()
			const atlas = this.Atlas()
			const phys = new this.$.$bog_shooter_phys
			phys.place( $bog_gamengine_phys3.shape_plane, floor_normal, 0, floor_at, atlas.layer( 'floor' ) )
			const wall = atlas.layer( 'wall' )
			const ids = arena.wall_ids()
			for( let i = 0; i < ids.length; ++ i ) {
				phys.place( $bog_gamengine_phys3.shape_box, wall_half, 0, arena.pos_of( ids[ i ], wall_lift ), wall )
			}
			return phys
		}

		target_layer() {
			return this.Atlas().layer( 'target' )
		}

		@ $mol_mem
		target_keys() {
			const round = this.round()
			return this.Arena().target_ids().map( id => `${ round }_${ id }` ) as readonly string[]
		}

		@ $mol_mem_key
		target_start( key: string ) {
			return this.Arena().pos_of( key.slice( key.indexOf( '_' ) + 1 ), target_lift )
		}

		@ $mol_mem
		targets() {
			return this.target_keys().map( key => this.Target( key ) ) as readonly $bog_shooter_target[]
		}

		@ $mol_mem
		targets_left() {
			const targets = this.targets()
			let left = 0
			for( let i = 0; i < targets.length; ++ i ) if( targets[ i ].alive() ) ++ left
			return left
		}

		@ $mol_mem
		player_pos( next?: Float32Array ) {
			return next ?? this.Arena().start_pos( this.player_height() / 2 )
		}

		eye_lift() {
			return this.Player().eye_lift()
		}

		@ $mol_mem
		spark_life() {
			return new Float32Array([ 0.12, 0.3 ])
		}

		@ $mol_mem
		spark_speed() {
			return new Float32Array([ 2, 6 ])
		}

		@ $mol_mem
		spark_size() {
			return new Float32Array([ 0.12, 0.01 ])
		}

		spark_color() {
			return spark_tint
		}

		@ $mol_mem
		sun_rot() {
			return new Float32Array([ -1.1, 0.6, 0 ])
		}

		@ $mol_mem
		floor_pos() {
			return this.Arena().center( 0, new Float32Array( 3 ) )
		}

		@ $mol_mem
		floor_size() {
			const arena = this.Arena()
			return new Float32Array([ arena.width(), 1, arena.height() ])
		}

		@ $mol_mem
		floor_tile() {
			const arena = this.Arena()
			return new Float32Array([ arena.width(), arena.height() ])
		}

		@ $mol_mem
		nodes() {
			return [ this.Floor(), this.Player(), this.Spark(), this.Sun(), this.Lamp(), ... this.targets() ]
		}

		@ $mol_mem
		batches() {
			return [ this.Solids(), ... this.Scene().auto_batches(), this.Traces() ] as readonly $bog_gamengine_batch[]
		}

		trace_buf = new Float32Array( 0 )
		trace_at = 0

		trace_points() {
			this.Scene().step()
			const targets = this.targets()
			const need = ( targets.length + 1 ) * 6
			if( this.trace_buf.length !== need ) this.trace_buf = new Float32Array( need )
			const out = this.trace_buf
			let at = this.Player().trace_write( out, 0 )
			for( let i = 0; i < targets.length; ++ i ) at = targets[ i ].trace_write( out, at )
			this.trace_at = at
			return out
		}

		trace_count() {
			this.trace_points()
			return this.trace_at / 6
		}

		@ $mol_mem
		aspect() {
			const aspect = this.Draw().width() / this.Draw().height()
			return Number.isFinite( aspect ) && aspect > 0 ? aspect : 1
		}

		draw_node() {
			return this.Draw().dom_node()
		}

		shoot( next?: PointerEvent | null ) {
			if( !next ) return null
			this.Screen().lock( true )
			this.Player().fire()
			return next
		}

		@ $mol_mem
		won() {
			return this.targets_left() === 0
		}

		@ $mol_mem
		lost() {
			return this.player_health() <= 0
		}

		@ $mol_mem
		over() {
			const over = this.won() || this.lost()
			const clock = this.Clock()
			const screen = this.Screen()
			new this.$.$mol_after_tick( ()=> {
				clock.paused( over )
				if( over ) screen.lock( false )
			} )
			return over
		}

		@ $mol_mem
		game() {
			return [
				this.Draw(),
				this.Cross(),
				... this.over() ? [ this.End() ] : [],
			]
		}

		end_title() {
			return this.won() ? 'Победил' : 'Проиграл'
		}

		end_hint() {
			return this.won()
				? `Все мишени сняты за ${ this.Clock().time().toFixed( 1 ) } с`
				: 'Здоровье кончилось'
		}

		restart( next?: any ) {
			if( next === undefined ) return null
			this.round( this.round() + 1 )
			const player = this.Player()
			player.revive()
			player.pos( this.Arena().start_pos( this.player_height() / 2 ) )
			this.Clock().time( 0 )
			return null
		}

		health_stat() {
			return String( this.player_health() )
		}

		targets_stat() {
			return `${ this.targets_left() } / ${ this.targets().length }`
		}

		player_stat() {
			if( !this.Atlas().ready() ) return ''
			const pos = this.player_pos()
			return `player ${ pos[ 0 ].toFixed( 2 ) } × ${ pos[ 2 ].toFixed( 2 ) } | health ${ this.player_health() } | targets ${ this.targets_left() } | shots ${ this.Player().shots() }`
		}

		@ $mol_mem
		phys_stat() {
			this.Scene().step()
			const phys = this.Phys()
			return `bodies ${ phys.count } | contacts ${ phys.narrow.contact_count } | phys ${ phys.step_ms().toFixed( 2 ) } мс`
		}

	}

}
