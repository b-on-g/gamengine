namespace $.$$ {

	export class $bog_gamengine_net_stand extends $.$bog_gamengine_net_stand {

		auto() {
			this.Room().ready()
		}

		@ $mol_mem
		key_map() {
			return this.Key().keys()
		}

		@ $mol_mem
		room_link( next?: string ) {
			return next ?? this.$.$mol_state_arg.value( 'land' ) ?? ''
		}

		@ $mol_mem
		hero_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 0, 0, 0 ])
		}

		@ $mol_mem
		cam_pos() {
			return new Float32Array([ 0, 0, 0 ])
		}

		@ $mol_mem
		other_tint() {
			return new Float32Array([ 1, 0.5, 0.5, 1 ])
		}

		other_id( id: string ) {
			return id
		}

		@ $mol_mem
		others() {
			return this.Room().others().map( id => this.Other( id ) )
		}

		@ $mol_mem
		other_sprites() {
			return this.Room().others().map( id => this.Other_sprite( id ) )
		}

		@ $mol_mem
		sprites() {
			return [ this.Hero_sprite(), ... this.other_sprites() ]
		}

		@ $mol_mem
		nodes() {
			return [ this.Hero(), this.Self(), ... this.others(), ... this.sprites() ]
		}

		xy( pos: ArrayLike< number > ) {
			return `${ pos[ 0 ].toFixed( 2 ) } × ${ pos[ 1 ].toFixed( 2 ) }`
		}

		net_stat() {
			const room = this.Room()
			const ids = room.others()
			return [
				`me ${ room.me() } ${ this.xy( this.hero_pos() ) }`,
				`others ${ ids.length }`,
				ids.map( id => `${ id } ${ this.xy( this.Other( id ).pos() ) }` ).join( ', ' ) || 'nobody',
				`pushes ${ room.pushes }`,
				`land ${ room.land_link() }`,
				`master ${ this.$.$giper_baza_glob.yard().master_current() ?? 'none' }`,
			].join( ' | ' )
		}

	}

}
