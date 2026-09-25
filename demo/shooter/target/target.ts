namespace $ {

	export class $bog_gamengine_demo_shooter_target extends $bog_gamengine_phys3_body {

		@ $mol_mem
		phys3( next?: $bog_gamengine_demo_shooter_phys ) {
			return next ?? new $bog_gamengine_demo_shooter_phys
		}

		@ $mol_mem
		size( next?: Float32Array ) {
			return next ?? new Float32Array([ 0.3, 0.9, 0.3 ])
		}

		@ $mol_mem
		start( next?: Float32Array ) {
			return next ?? new Float32Array( 3 )
		}

		@ $mol_mem
		layer( next = 0 ) {
			return next
		}

		@ $mol_mem
		player( next?: $bog_gamengine_demo_shooter_player | null ) {
			return next ?? null
		}

		@ $mol_mem
		sound( next?: $bog_gamengine_sound | null ) {
			return next ?? null
		}

		@ $mol_mem
		health_max( next = 2 ) {
			return next
		}

		@ $mol_mem
		health( next?: number ) {
			return next ?? this.health_max()
		}

		@ $mol_mem
		speed( next = 0.8 ) {
			return next
		}

		@ $mol_mem
		reach( next = 12 ) {
			return next
		}

		@ $mol_mem
		damage( next = 6 ) {
			return next
		}

		@ $mol_mem
		shot_delay( next = 2.2 ) {
			return next
		}

		@ $mol_mem
		eye_lift( next = 0.6 ) {
			return next
		}

		@ $mol_mem
		fade( next = 2 ) {
			return next
		}

		@ $mol_mem
		trace_time( next = 0.06 ) {
			return next
		}

		way = 1
		gone = 0
		done = false
		wait = 0
		seen = false
		trace_left = 0
		trace = new Float32Array( 6 )
		cast = new $bog_gamengine_phys3_cast
		hit = new Float32Array( 7 )
		dir = new Float32Array( 3 )
		from = new Float32Array( 3 )
		eye_at = new Float32Array( 3 )
		move = new Float32Array( 3 )
		away = new Float32Array([ 0, -1000, 0 ])
		opts = { skip_ghost: true, skip: -1 }

		alive() {
			return this.health() > 0
		}

		index() {
			const known = this.handle_last
			const i = super.index()
			if( known || i < 0 ) return i
			const world = this.phys3()
			world.layer[ i ] = this.layer()
			world.pos.set( this.start(), i * 3 )
			world.bounds_of( i )
			world.trans_write( i )
			return i
		}

		mass( next?: number ) {
			return next ?? 0
		}

		eye() {
			const pos = this.pos()
			const at = this.eye_at
			at[ 0 ] = pos[ 0 ]
			at[ 1 ] = pos[ 1 ] + this.eye_lift()
			at[ 2 ] = pos[ 2 ]
			return at
		}

		hurt( amount: number, dir: Float32Array, push: number ) {
			const left = this.health() - amount
			this.health( left > 0 ? left : 0 )
			if( left > 0 ) return false
			const world = this.phys3()
			const i = this.index()
			world.mass_set( i, 1 )
			world.flags[ i ] &= ~ $bog_gamengine_phys3.flag_sleep
			world.sleep_timer[ i ] = 0
			world.vel[ i * 3 ] = dir[ 0 ] * push
			world.vel[ i * 3 + 1 ] = push / 2
			world.vel[ i * 3 + 2 ] = dir[ 2 ] * push
			this.gone = this.fade()
			this.seen = false
			this.trace_left = 0
			return true
		}

		vanish() {
			const world = this.phys3()
			const i = this.index()
			world.flags[ i ] |= $bog_gamengine_phys3.flag_ghost
			world.mass_set( i, 0 )
			world.vel.fill( 0, i * 3, i * 3 + 3 )
			world.ang.fill( 0, i * 3, i * 3 + 3 )
			this.pos( this.away )
			world.bounds_of( i )
			world.trans_write( i )
			this.done = true
		}

		step( dt: number ) {
			if( this.done ) return
			const world = this.phys3()
			if( !this.alive() ) {
				this.gone -= dt
				if( this.gone <= 0 ) this.vanish()
				return
			}
			if( this.trace_left > 0 ) this.trace_left -= dt
			this.aim( world, dt )
			if( !this.seen ) this.patrol( world, dt )
		}

		patrol( world: $bog_gamengine_demo_shooter_phys, dt: number ) {
			const pos = this.pos()
			const skin = this.size()[ 0 ] + 0.05
			const dir = this.dir
			dir[ 0 ] = this.way
			dir[ 1 ] = 0
			dir[ 2 ] = 0
			const from = this.from
			from[ 0 ] = pos[ 0 ] + this.way * skin
			from[ 1 ] = pos[ 1 ]
			from[ 2 ] = pos[ 2 ]
			this.opts.skip = this.index()
			if( this.cast.ray( world, from, dir, 0.4, this.hit, this.opts ) >= 0 ) {
				this.way = - this.way
				return
			}
			const move = this.move
			move[ 0 ] = pos[ 0 ] + this.way * this.speed() * dt
			move[ 1 ] = pos[ 1 ]
			move[ 2 ] = pos[ 2 ]
			this.pos( move )
			const i = this.index()
			world.bounds_of( i )
			world.trans_write( i )
		}

		aim( world: $bog_gamengine_demo_shooter_phys, dt: number ) {
			if( this.wait > 0 ) this.wait -= dt
			this.seen = false
			const player = this.player()
			if( !player || player.dead() ) return
			const eye = this.eye()
			const goal = player.eye()
			const dx = goal[ 0 ] - eye[ 0 ]
			const dy = goal[ 1 ] - eye[ 1 ]
			const dz = goal[ 2 ] - eye[ 2 ]
			const dist = Math.sqrt( dx * dx + dy * dy + dz * dz )
			if( !( dist > 0 ) || dist > this.reach() ) return
			const dir = this.dir
			dir[ 0 ] = dx / dist
			dir[ 1 ] = dy / dist
			dir[ 2 ] = dz / dist
			const body = world.index_of( player.body() )
			this.opts.skip = this.index()
			const seen = this.cast.ray( world, eye, dir, dist, this.hit, this.opts )
			if( seen < 0 || seen !== body ) return
			this.seen = true
			if( this.wait > 0 ) return
			this.wait = this.shot_delay()
			const trace = this.trace
			trace[ 0 ] = eye[ 0 ]
			trace[ 1 ] = eye[ 1 ]
			trace[ 2 ] = eye[ 2 ]
			trace[ 3 ] = goal[ 0 ]
			trace[ 4 ] = goal[ 1 ]
			trace[ 5 ] = goal[ 2 ]
			this.trace_left = this.trace_time()
			this.sound()?.play( 'shot', eye )
			player.hurt( this.damage() )
		}

		trace_write( out: Float32Array, at: number ) {
			if( this.trace_left <= 0 ) return at
			for( let i = 0; i < 6; ++ i ) out[ at + i ] = this.trace[ i ]
			return at + 6
		}

	}

}
