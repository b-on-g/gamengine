namespace $ {

	export class $bog_gamengine_net_lobby_data extends $giper_baza_dict.with({
		Rooms: $giper_baza_list_link.to( ()=> $bog_gamengine_net_room_data ),
	}) {}

	export type $bog_gamengine_net_lobby_room = {
		readonly link: string
		readonly title: string
	}

	export class $bog_gamengine_net_lobby extends $mol_object2 {

		@ $mol_mem
		link( next = '' ) {
			return next
		}

		preset(): $giper_baza_rank_preset {
			return [[ null, $giper_baza_rank_post( 'just' ) ]]
		}

		@ $mol_mem
		land_link() {
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
			return this.land().Data( $bog_gamengine_net_lobby_data )
		}

		@ $mol_mem
		rooms() {
			const rooms = this.data().Rooms()?.remote_list() ?? []
			return rooms.map( room => ({
				link: room.land().link().str,
				title: room.Title()?.val() ?? '',
			}) ) as readonly $bog_gamengine_net_lobby_room[]
		}

		create( title: string ) {
			return $mol_wire_async( this ).make( title )
		}

		make( title: string ) {
			const land = this.$.$giper_baza_glob.land_grab( this.preset() )
			const room = land.Data( $bog_gamengine_net_room_data )
			room.Title( 'auto' )!.val( title )
			this.data().Rooms( 'auto' )!.remote_add( room )
			return land.link().str
		}

	}

}
