namespace $ {

	export class $bog_gamengine_brain_act_move extends $bog_gamengine_brain_bt_act {

		delta = new Float32Array( 3 )

		@ $mol_mem
		target( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 0, 0, 0 ])
		}

		@ $mol_mem
		speed( next = 1 ) {
			return next
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'target', kind: 'vec3', get: ()=> this.target(), set: next => this.target( next as ArrayLike< number > ) },
				{ name: 'speed', kind: 'number', get: ()=> this.speed(), set: next => this.speed( Number( next ) ) },
			]
		}

		tick( dt: number, brain: $bog_gamengine_brain_bt ) {
			const owner = brain.owner()
			if( !owner ) return this.status_now = 'fail'
			const pos = owner.pos()
			const target = this.target()
			$bog_gamengine_vec_sub( this.delta, target, pos )
			const dist = $bog_gamengine_vec_len( this.delta )
			const step = this.speed() * dt
			if( dist <= step ) {
				owner.pos( new Float32Array( target ) )
				return this.status_now = 'ok'
			}
			$bog_gamengine_vec_scale( this.delta, this.delta, step / dist )
			owner.pos( $bog_gamengine_vec_add( new Float32Array( 3 ), pos, this.delta ) )
			return this.status_now = 'run'
		}

	}

}
