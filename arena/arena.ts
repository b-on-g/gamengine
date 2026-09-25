namespace $ {

	export class $bog_gamengine_demo_shooter_arena extends $bog_gamengine_map {

		@ $mol_mem
		plane( next?: $bog_gamengine_map_plane ) {
			return next ?? 'xz'
		}

		@ $mol_mem
		wall_sign( next = '#' ) {
			return next
		}

		@ $mol_mem
		target_sign( next = 'E' ) {
			return next
		}

		@ $mol_mem
		start_sign( next = 'P' ) {
			return next
		}

		wall( x: number, y: number ) {
			return this.char( x, y ) === this.wall_sign()
		}

		@ $mol_mem
		wall_ids() {
			return this.ids( this.wall_sign() )
		}

		@ $mol_mem
		target_ids() {
			return this.ids( this.target_sign() )
		}

		pos_of( id: string, lift: number ) {
			return this.spot_pos( id, lift, new Float32Array( 3 ) )
		}

		@ $mol_mem
		start() {
			const spots = this.spots( this.start_sign() )
			return spots.length ? spots[ 0 ] : [ 1, 1 ] as const
		}

		start_pos( lift: number ) {
			const start = this.start()
			return this.pos( start[ 0 ], start[ 1 ], lift, new Float32Array( 3 ) )
		}

	}

}
