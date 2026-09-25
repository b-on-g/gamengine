namespace $ {

	export class $bog_gamengine_studio_doc_land_mate extends $giper_baza_dict.with({
		Name: $giper_baza_atom_text,
		Pick: $giper_baza_atom_text,
		Spot: $giper_baza_atom_list,
		Seen: $giper_baza_atom_real,
	}) {}

	export class $bog_gamengine_studio_doc_land_data extends $giper_baza_dict.with({
		Source: $giper_baza_atom_text,
		Mates: $giper_baza_dict_to( $bog_gamengine_studio_doc_land_mate ),
	}) {}

	export class $bog_gamengine_studio_doc_land extends $mol_object2 {

		@ $mol_mem
		link( next = '' ) {
			return next
		}

		@ $mol_mem
		name( next = '' ) {
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
			return this.land().Data( $bog_gamengine_studio_doc_land_data )
		}

		read() {
			return this.data().Source()?.val() ?? ''
		}

		write( text: string ) {
			this.data().Source( 'auto' )!.val( text )
		}

		pending = null as string | null

		source( next?: string ) {
			if( next === undefined ) return this.pending ?? this.read()
			this.pending = next
			new this.$.$mol_after_tick( ()=> $mol_wire_async( this ).put( next ) )
			return next
		}

		put( text: string ) {
			this.write( text )
			if( this.pending === text ) this.pending = null
		}

		@ $mol_mem
		me() {
			const key = 'bog_gamengine_studio_doc_land_me:' + this.land_link()
			const kept = this.$.$mol_state_local.value< string >( key )
			if( kept ) return kept
			const id = $mol_guid()
			this.$.$mol_state_local.value( key, id )
			return id
		}

		@ $mol_mem
		ready() {
			const mate = this.data().Mates( 'auto' )?.key( this.me(), 'auto' ) ?? null
			return mate !== null
		}

		mate( id: string ) {
			return this.data().Mates()?.key( id ) ?? null
		}

		me_mate() {
			if( !this.ready() ) return null
			return this.mate( this.me() )
		}

		now() {
			return Date.now()
		}

		stamp() {
			return this.$.$mol_state_time.now( 1000 )
		}

		seen( id: string ) {
			return this.mate( id )?.Seen()?.val() ?? 0
		}

		present( id: string ) {
			return this.stamp() - this.seen( id ) < this.timeout() * 1000
		}

		@ $mol_mem
		mates() {
			const mates = this.data().Mates()
			if( !mates ) return [] as readonly string[]
			const me = this.me()
			const ids = [] as string[]
			for( const key of mates.keys() ) {
				const id = String( key )
				if( id === me ) continue
				if( this.present( id ) ) ids.push( id )
			}
			return ids as readonly string[]
		}

		@ $mol_mem_key
		spot( id: string ) {
			const list = this.mate( id )?.Spot()?.val() as readonly number[] | null
			return new Float32Array( list ?? [ 0, 0 ] )
		}

		pick( id: string ) {
			return this.mate( id )?.Pick()?.val() ?? ''
		}

		mate_name( id: string ) {
			return this.mate( id )?.Name()?.val() ?? ''
		}

		sent_pick = ''
		sent_spot = new Float32Array( 2 )
		sent_at = 0
		sent_beat = 0
		pushes = 0

		push( pick: string, spot: ArrayLike< number > ) {
			const mate = this.me_mate()
			if( !mate ) return
			const beat = this.stamp()
			const now = this.now()
			const moved = pick !== this.sent_pick
				|| spot[ 0 ] !== this.sent_spot[ 0 ]
				|| spot[ 1 ] !== this.sent_spot[ 1 ]
			if( moved ? now - this.sent_at < 1000 / this.rate() : beat - this.sent_beat < this.timeout() * 500 ) return
			this.sent_at = now
			this.sent_beat = beat
			this.sent_pick = pick
			this.sent_spot[ 0 ] = spot[ 0 ]
			this.sent_spot[ 1 ] = spot[ 1 ]
			++ this.pushes
			const name = this.name()
			const snap = [ spot[ 0 ], spot[ 1 ] ]
			new this.$.$mol_after_tick( ()=> $mol_wire_async( this ).beat( mate, name, pick, snap, now ) )
		}

		beat( mate: $bog_gamengine_studio_doc_land_mate, name: string, pick: string, spot: number[], now: number ) {
			if( mate.Name()?.val() !== name ) mate.Name( 'auto' )!.val( name )
			if( mate.Pick()?.val() !== pick ) mate.Pick( 'auto' )!.val( pick )
			mate.Spot( 'auto' )!.val( spot )
			mate.Seen( 'auto' )!.val( now )
		}

	}

}
