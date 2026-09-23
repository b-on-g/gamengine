namespace $ {

	export class $bog_gamengine_net_self extends $bog_gamengine_node {

		@ $mol_mem
		room( next?: $bog_gamengine_net_room | null ) {
			return next ?? null
		}

		@ $mol_mem
		body( next?: $bog_gamengine_node | null ) {
			return next ?? null
		}

		@ $mol_mem
		state( next = '' ) {
			return next
		}

		step( dt: number ) {
			const room = this.room()
			const body = this.body()
			if( !room || !body ) return
			room.push( body, this.state() )
		}

	}

}
