namespace $ {

	export const $bog_gamengine_spike_net_land = 'UHhZpFrc_naf5XUWK'

	export const $bog_gamengine_spike_net_alive = 15

}

namespace $.$$ {

	export class $bog_gamengine_spike_net extends $.$bog_gamengine_spike_net {

		auto() {
			this.pin()
			this.my_hero_ready()
		}

		pinned = ''

		master_url() {
			const arg = this.$.$mol_state_arg.value( 'master' )
			if( !arg ) return ''
			return ( /^(https?|wss?):/.test( arg ) ? arg : 'http://' + arg ).replace( /\/?$/, '/' )
		}

		pin() {
			const url = this.master_url()
			if( !url || this.pinned === url ) return
			this.pinned = url
			const yard = this.$.$giper_baza_yard
			yard.masters_default.length = 0
			yard.masters = ()=> [ url ]
			const live = this.$.$giper_baza_glob.yard()
			live.master_cursor( 1 )
			live.master_cursor( 0 )
		}

		@ $mol_mem
		land_link() {
			this.pin()
			if( $bog_gamengine_spike_net_land ) return $bog_gamengine_spike_net_land
			return this.$.$giper_baza_glob.land_grab([[ null, $giper_baza_rank_post( 'just' ) ]]).link().str
		}

		land() {
			return this.$.$giper_baza_glob.Land( new $giper_baza_link( this.land_link() ) )
		}

		world() {
			return this.land().Data( $bog_gamengine_spike_net_world )
		}

		@ $mol_mem
		my_id() {
			return $mol_guid()
		}

		@ $mol_mem
		my_hero_ready() {
			const hero = this.world().Heroes( 'auto' )?.key( this.my_id(), 'auto' ) ?? null
			if( !hero ) return false
			if( hero.X()?.val() == null ) {
				const pos = this.hero_pos()
				hero.X( 'auto' )!.val( pos[ 0 ] )
				hero.Y( 'auto' )!.val( pos[ 1 ] )
			}
			return true
		}

		my_hero() {
			if( !this.my_hero_ready() ) return null
			return this.world().Heroes()?.key( this.my_id() ) ?? null
		}

		other( id: string ) {
			return this.world().Heroes()?.key( id ) ?? null
		}

		@ $mol_mem
		other_ids() {
			const heroes = this.world().Heroes()
			if( !heroes ) return [] as readonly string[]
			const now = Date.now()
			const fresh = [] as [ string, number ][]
			for( const key of heroes.keys() ) {
				const id = String( key )
				if( id === this.my_id() ) continue
				const changed = this.other( id )?.last_change()?.valueOf() ?? 0
				if( now - changed < $bog_gamengine_spike_net_alive * 1000 ) fresh.push([ id, changed ])
			}
			return fresh.sort( ( a, b )=> b[ 1 ] - a[ 1 ] ).map( ([ id ])=> id )
		}

		@ $mol_mem_key
		other_pos( id: string ) {
			const hero = this.other( id )
			return new Float32Array([ hero?.X()?.val() ?? 0, hero?.Y()?.val() ?? 0, 0 ])
		}

		@ $mol_mem
		other_tint() {
			return new Float32Array([ 1, 0.5, 0.5, 1 ])
		}

		@ $mol_mem
		others() {
			return this.other_ids().map( id => this.Other( id ) )
		}

		@ $mol_mem
		cam_pos() {
			return new Float32Array([ 0, 0, 0 ])
		}

		@ $mol_mem
		hero_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 0, 0, 0 ])
		}

		@ $mol_mem
		sprites() {
			return [ this.Hero_sprite(), ... this.others() ]
		}

		@ $mol_mem
		nodes() {
			return [ this.Hero(), ... this.sprites() ]
		}

		net_stat() {
			const pos = this.hero_pos()
			const ids = this.other_ids()
			const xy = ( pos: Float32Array )=> `${ pos[ 0 ].toFixed( 2 ) } × ${ pos[ 1 ].toFixed( 2 ) }`
			const seen = ids.length ? this.other( ids[ 0 ] )?.last_change()?.toString( 'hh:mm:ss' ) ?? '' : ''
			return [
				`me ${ this.my_id() } ${ xy( pos ) }`,
				`others ${ ids.length }`,
				ids.map( id => `${ id } ${ xy( this.other_pos( id ) ) }` ).join( ', ' ) || 'nobody',
				`seen ${ seen || 'never' }`,
				`pushes ${ this.Hero().pushes }`,
				`land ${ this.land_link() }`,
				`master ${ this.$.$giper_baza_glob.yard().master_current() ?? 'none' }`,
			].join( ' | ' )
		}

	}

}
