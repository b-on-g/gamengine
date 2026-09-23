namespace $ {

	export class $bog_jumper_enemy extends $bog_gamengine_phys_body {

		@ $mol_mem
		tile( next?: $bog_gamengine_phys_tile | null ) {
			return next ?? null
		}

		@ $mol_mem
		brain( next?: $bog_gamengine_brain_fsm | null ) {
			return next ?? null
		}

		@ $mol_mem
		speed( next = 2 ) {
			return next
		}

		@ $mol_mem
		gravity( next = 24 ) {
			return next
		}

		@ $mol_mem
		fall_max( next = 20 ) {
			return next
		}

		@ $mol_mem
		size( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 0.8, 0.8 ])
		}

		@ $mol_mem
		dead( next = false ) {
			return next
		}

		@ $mol_mem
		face_left( next = false ) {
			return next
		}

		edge( dir: number ) {
			const tile = this.tile()
			if( !tile ) return false
			const pos = this.pos()
			const x = pos[ 0 ] + dir * ( this.size()[ 0 ] / 2 + 0.1 )
			if( tile.solid_at( x, pos[ 1 ] ) ) return true
			return tile.edge( pos[ 0 ], pos[ 1 ], dir, 0 )
		}

		edge_left() {
			return this.edge( -1 )
		}

		edge_right() {
			return this.edge( 1 )
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'dead', kind: 'flag', get: ()=> this.dead(), set: next => this.dead( next as boolean ) },
			]
		}

		dir() {
			return this.brain()?.state() === 'left' ? -1 : 1
		}

		step( dt: number ) {

			if( this.dead() ) return

			const dir = this.dir()
			const vel = this.vel()
			let vy = vel[ 1 ] - this.gravity() * dt
			const fall_max = this.fall_max()
			if( vy < - fall_max ) vy = - fall_max

			if( this.face_left() !== ( dir < 0 ) ) this.face_left( dir < 0 )

			const vx = dir * this.speed()
			if( vel[ 0 ] === vx && vel[ 1 ] === vy ) return

			const next = new Float32Array( 3 )
			next[ 0 ] = vx
			next[ 1 ] = vy
			next[ 2 ] = vel[ 2 ]
			this.vel( next )

		}

	}

}
