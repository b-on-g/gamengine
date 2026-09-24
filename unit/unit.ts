namespace $ {

	export class $bog_legion_unit extends $bog_gamengine_nav_agent {

		@ $mol_mem
		camp( next = 0 ) {
			return next
		}

		@ $mol_mem
		brain( next?: $bog_gamengine_node | null ) {
			return next ?? null
		}

		@ $mol_mem
		foes( next?: readonly $bog_legion_unit[] ): readonly $bog_legion_unit[] {
			return next ?? []
		}

		@ $mol_mem
		sound( next?: $bog_gamengine_sound | null ) {
			return next ?? null
		}

		@ $mol_mem
		flash( next?: $bog_gamengine_particle | null ) {
			return next ?? null
		}

		@ $mol_mem
		home( next?: Float32Array | null ) {
			return next ?? null
		}

		@ $mol_mem
		dead( next = false ) {
			return next
		}

		@ $mol_mem
		health_max( next = 40 ) {
			return next
		}

		@ $mol_mem
		damage( next = 7 ) {
			return next
		}

		@ $mol_mem
		rate( next = 0.7 ) {
			return next
		}

		@ $mol_mem
		reach( next = 1.2 ) {
			return next
		}

		@ $mol_mem
		sight( next = 7 ) {
			return next
		}

		@ $mol_mem
		roam( next = 3 ) {
			return next
		}

		@ $mol_mem
		scan_rate( next = 0.25 ) {
			return next
		}

		radius() {
			return 0.35
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'camp', kind: 'number', get: ()=> this.camp(), set: next => this.camp( Number( next ) ) },
				{ name: 'dead', kind: 'flag', get: ()=> this.dead(), set: next => this.dead( Boolean( next ) ) },
			]
		}

		health = NaN
		order_on = false
		mode_now = ''
		foe_now = null as $bog_legion_unit | null
		foe_dist = Infinity
		cool = 0
		scan_left = 0
		roam_left = 0
		seed = 1
		here = new Float32Array( 2 )

		hp() {
			if( Number.isNaN( this.health ) ) this.health = this.health_max()
			return this.health
		}

		mode() {
			const brain = this.brain()
			if( brain instanceof $bog_gamengine_brain_fsm ) return brain.state_now || 'idle'
			return this.mode_now
		}

		mode_set( mode: string ) {
			this.mode_now = mode
		}

		has_foe() {
			return this.foe_now !== null
		}

		in_reach() {
			return this.foe_dist <= this.reach()
		}

		lost_foe() {
			return !this.in_reach()
		}

		busy() {
			return this.order_on || this.foe_now !== null
		}

		resting() {
			return !this.order_on && this.foe_now === null
		}

		rand() {
			this.seed = ( Math.imul( this.seed, 1103515245 ) + 12345 ) & 0x7fffffff
			return this.seed / 0x7fffffff
		}

		order_to( x: number, y: number ) {
			this.aim( x, y )
			this.order_on = true
		}

		wound( hurt: number ) {
			if( this.dead() ) return
			this.health = this.hp() - hurt
			if( this.health > 0 ) return
			this.die()
		}

		die() {
			if( this.dead() ) return
			this.dead( true )
			this.stop()
			this.order_on = false
			this.flash()?.burst( 12, this.pos() )
		}

		reset( at: Float32Array ) {
			this.dead( false )
			this.health = NaN
			this.stop()
			this.order_on = false
			this.mode_now = ''
			this.foe_now = null
			this.foe_dist = Infinity
			this.cool = 0
			this.since = Infinity
			this.pos( at )
			this.here[ 0 ] = at[ 0 ]
			this.here[ 1 ] = at[ 1 ]
			const brain = this.brain()
			if( brain instanceof $bog_gamengine_brain_fsm ) brain.state_now = ''
		}

		scan( dt: number ) {

			this.scan_left -= dt
			const foe = this.foe_now
			if( this.scan_left > 0 && foe && !foe.dead() ) {
				const pos = this.pos()
				const at = foe.pos()
				const dx = at[ 0 ] - pos[ 0 ]
				const dy = at[ 1 ] - pos[ 1 ]
				this.foe_dist = Math.sqrt( dx * dx + dy * dy )
				return
			}
			this.scan_left = this.scan_rate()

			const foes = this.foes()
			const pos = this.pos()
			const sight = this.sight()
			let best = null as $bog_legion_unit | null
			let best_dist = sight * sight

			for( let i = 0; i < foes.length; ++i ) {
				const other = foes[ i ]
				if( other.dead() ) continue
				const at = other.pos()
				const dx = at[ 0 ] - pos[ 0 ]
				const dy = at[ 1 ] - pos[ 1 ]
				const dist = dx * dx + dy * dy
				if( dist >= best_dist ) continue
				best_dist = dist
				best = other
			}

			this.foe_now = best
			this.foe_dist = best ? Math.sqrt( best_dist ) : Infinity

		}

		chase() {
			const foe = this.foe_now
			if( foe ) {
				const at = foe.pos()
				this.goal[ 0 ] = at[ 0 ]
				this.goal[ 1 ] = at[ 1 ]
				this.goal_on = true
				return
			}
			if( !this.order_on ) {
				this.goal_on = false
				return
			}
			const pos = this.pos()
			const dx = this.goal[ 0 ] - pos[ 0 ]
			const dy = this.goal[ 1 ] - pos[ 1 ]
			if( dx * dx + dy * dy < 0.36 ) {
				this.order_on = false
				this.goal_on = false
				return
			}
			this.goal_on = true
		}

		wander( dt: number ) {
			if( this.order_on || this.foe_now ) return this.chase()
			this.roam_left -= dt
			const pos = this.pos()
			if( this.goal_on && this.roam_left > 0 ) {
				const dx = this.goal[ 0 ] - pos[ 0 ]
				const dy = this.goal[ 1 ] - pos[ 1 ]
				if( dx * dx + dy * dy > 0.36 ) return
			}
			this.roam_left = 4
			const home = this.home() ?? pos
			const angle = this.rand() * Math.PI * 2
			const reach = this.roam() * ( 0.4 + this.rand() * 0.6 )
			const x = home[ 0 ] + Math.cos( angle ) * reach
			const y = home[ 1 ] + Math.sin( angle ) * reach
			const grid = this.grid()
			if( grid && grid.solid_at( x, y ) ) {
				this.goal[ 0 ] = home[ 0 ]
				this.goal[ 1 ] = home[ 1 ]
			} else {
				this.goal[ 0 ] = x
				this.goal[ 1 ] = y
			}
			this.goal_on = true
			this.since = Infinity
		}

		strike( dt: number ) {
			this.goal_on = false
			const foe = this.foe_now
			if( !foe ) return
			this.cool -= dt
			if( this.cool > 0 ) return
			this.cool = this.rate()
			foe.wound( this.damage() )
			this.sound()?.play( 'hit', this.pos() )
		}

		step( dt: number ) {

			if( this.dead() ) return
			if( dt === 0 ) return

			this.scan( dt )

			const mode = this.mode()
			if( mode === 'attack' ) this.strike( dt )
			else if( mode === 'patrol' ) this.wander( dt )
			else if( mode === 'move' ) this.chase()
			else this.goal_on = false

			super.step( dt )

			const pos = this.pos()
			this.here[ 0 ] = pos[ 0 ]
			this.here[ 1 ] = pos[ 1 ]

		}

	}

}
