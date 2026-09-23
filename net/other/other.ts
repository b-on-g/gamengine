namespace $ {

	export class $bog_gamengine_net_other extends $bog_gamengine_node {

		@ $mol_mem
		room( next?: $bog_gamengine_net_room | null ) {
			return next ?? null
		}

		@ $mol_mem
		id( next = '' ) {
			return next
		}

		@ $mol_mem
		ahead( next = 0.2 ) {
			return next
		}

		delay() {
			const room = this.room()
			return room ? 1 / room.rate() : 0.05
		}

		present() {
			const room = this.room()
			return room ? room.present( this.id() ) : false
		}

		state() {
			return this.room()?.player_state( this.id() ) ?? ''
		}

		samples = 0
		time_a = 0
		time_b = 0
		pos_a = new Float32Array( 3 )
		pos_b = new Float32Array( 3 )
		rot_a = new Float32Array( 3 )
		rot_b = new Float32Array( 3 )
		tmp_pos = new Float32Array( 3 )
		tmp_rot = new Float32Array( 3 )

		now() {
			return Date.now() / 1000
		}

		step( dt: number ) {
			const room = this.room()
			if( !room ) return
			const id = this.id()
			const pos = room.player_pos( id )
			const rot = room.player_rot( id )
			const now = this.now()
			if(
				this.samples === 0
				|| !$bog_gamengine_net_room_same( pos, this.pos_b )
				|| !$bog_gamengine_net_room_same( rot, this.rot_b )
			) {
				this.pos_a.set( this.pos_b )
				this.rot_a.set( this.rot_b )
				this.time_a = this.time_b
				this.pos_b.set( pos )
				this.rot_b.set( rot )
				this.time_b = now
				++ this.samples
			}
			if( this.samples === 1 ) {
				this.settle( this.pos_b, this.rot_b )
				return
			}
			const delay = this.delay()
			const ahead = this.ahead()
			$bog_gamengine_net_lerp( this.tmp_pos, this.pos_a, this.time_a, this.pos_b, this.time_b, now, delay, ahead )
			$bog_gamengine_net_lerp( this.tmp_rot, this.rot_a, this.time_a, this.rot_b, this.time_b, now, delay, ahead )
			this.settle( this.tmp_pos, this.tmp_rot )
		}

		settle( pos: Float32Array, rot: Float32Array ) {
			if( !$bog_gamengine_net_room_same( pos, this.pos() ) ) this.pos( new Float32Array( pos ) )
			if( !$bog_gamengine_net_room_same( rot, this.rot() ) ) this.rot( new Float32Array( rot ) )
		}

	}

}
