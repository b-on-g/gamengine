namespace $ {

	export class $bog_gamengine_net_room_data extends $giper_baza_dict.with({
		Title: $giper_baza_atom_text,
		Players: $giper_baza_dict_to( $bog_gamengine_net_player ),
	}) {}

	export type $bog_gamengine_net_room_event = {
		readonly from: string
		readonly payload: string
	}

	export function $bog_gamengine_net_room_same( a: ArrayLike< number >, b: ArrayLike< number > ) {
		if( a.length !== b.length ) return false
		for( let i = 0; i < a.length; ++ i ) if( a[ i ] !== b[ i ] ) return false
		return true
	}

	export class $bog_gamengine_net_room extends $mol_object2 {

		@ $mol_mem
		link( next = '' ) {
			return next
		}

		@ $mol_mem
		rate( next = 20 ) {
			return next
		}

		@ $mol_mem
		timeout( next = 5 ) {
			return next
		}

		@ $mol_mem
		master( next?: string ) {
			return next ?? this.$.$mol_state_arg.value( 'master' ) ?? ''
		}

		master_url() {
			const master = this.master()
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

		preset(): $giper_baza_rank_preset {
			return [[ null, $giper_baza_rank_post( 'just' ) ]]
		}

		@ $mol_mem
		land_link() {
			this.pin()
			const link = this.link()
			if( link ) return link
			const made = this.$.$giper_baza_glob.land_grab( this.preset() ).link().str
			this.link( made )
			return made
		}

		land() {
			return this.$.$giper_baza_glob.Land( new this.$.$giper_baza_link( this.land_link() ) )
		}

		data() {
			return this.land().Data( $bog_gamengine_net_room_data )
		}

		title( next?: string ) {
			return this.data().Title( next )?.val( next ) ?? ''
		}

		@ $mol_mem
		me() {
			const key = 'bog_gamengine_net_me:' + this.land_link()
			const kept = this.$.$mol_state_local.value< string >( key )
			if( kept ) return kept
			const id = $mol_guid()
			this.$.$mol_state_local.value( key, id )
			return id
		}

		@ $mol_mem
		ready() {
			const player = this.data().Players( 'auto' )?.key( this.me(), 'auto' ) ?? null
			return player !== null
		}

		player( id: string ) {
			return this.data().Players()?.key( id ) ?? null
		}

		me_player() {
			if( !this.ready() ) return null
			return this.player( this.me() )
		}

		now() {
			return Date.now()
		}

		seen( id: string ) {
			return this.player( id )?.last_change()?.valueOf() ?? 0
		}

		present( id: string ) {
			const now = this.$.$mol_state_time.now( 1000 )
			return now - this.seen( id ) < this.timeout() * 1000
		}

		@ $mol_mem
		others() {
			const players = this.data().Players()
			if( !players ) return [] as readonly string[]
			const me = this.me()
			const ids = [] as string[]
			for( const key of players.keys() ) {
				const id = String( key )
				if( id === me ) continue
				if( this.present( id ) ) ids.push( id )
			}
			return ids as readonly string[]
		}

		@ $mol_mem_key
		player_pos( id: string ) {
			const list = this.player( id )?.Pos()?.val() as readonly number[] | null
			return new Float32Array( list ?? [ 0, 0, 0 ] )
		}

		@ $mol_mem_key
		player_rot( id: string ) {
			const list = this.player( id )?.Rot()?.val() as readonly number[] | null
			return new Float32Array( list ?? [ 0, 0, 0 ] )
		}

		player_state( id: string ) {
			return this.player( id )?.State()?.val() ?? ''
		}

		sent_pos = new Float32Array( 3 )
		sent_rot = new Float32Array( 3 )
		sent_state = ''
		sent_at = 0
		pushes = 0

		push( node: $bog_gamengine_node, state = '' ) {
			const player = this.me_player()
			if( !player ) return
			const pos = node.pos()
			const rot = node.rot()
			const moved = !$bog_gamengine_net_room_same( pos, this.sent_pos )
				|| !$bog_gamengine_net_room_same( rot, this.sent_rot )
				|| state !== this.sent_state
			const now = this.now()
			const gap = now - this.sent_at
			if( moved ? gap < 1000 / this.rate() : gap < this.timeout() * 500 ) return
			this.sent_at = now
			this.sent_pos.set( pos )
			this.sent_rot.set( rot )
			this.sent_state = state
			++ this.pushes
			const snap_pos = Array.from( pos )
			const snap_rot = Array.from( rot )
			new this.$.$mol_after_tick( ()=> $mol_wire_async( this ).send( player, snap_pos, snap_rot, state, moved ? 0 : now ) )
		}

		send( player: $bog_gamengine_net_player, pos: number[], rot: number[], state: string, beat: number ) {
			if( beat ) {
				player.Seen( 'auto' )!.val( beat )
				return
			}
			player.Pos( 'auto' )!.val( pos )
			player.Rot( 'auto' )!.val( rot )
			player.State( 'auto' )!.val( state )
		}

		emit( type: string, payload = '' ) {
			const player = this.me_player()
			if( !player ) return
			new this.$.$mol_after_tick( ()=> $mol_wire_async( this ).send_event( player, type + ':' + payload ) )
		}

		send_event( player: $bog_gamengine_net_player, line: string ) {
			player.Events( 'auto' )!.splice([ line ])
		}

		cursors = new Map< string, number >()

		@ $mol_mem_key
		on( type: string ) {
			const fresh = [] as $bog_gamengine_net_room_event[]
			const prefix = type + ':'
			for( const id of this.others() ) {
				const lines = this.player( id )?.Events()?.items() ?? []
				const key = type + '\n' + id
				const cursor = this.cursors.get( key ) ?? lines.length
				for( let i = cursor; i < lines.length; ++ i ) {
					if( !lines[ i ].startsWith( prefix ) ) continue
					fresh.push({ from: id, payload: lines[ i ].slice( prefix.length ) })
				}
				this.cursors.set( key, lines.length )
			}
			return fresh as readonly $bog_gamengine_net_room_event[]
		}

	}

}
