namespace $ {

	export type $bog_shooter_player_target = {
		alive(): boolean
		index(): number
		hurt( amount: number, dir: Float32Array, push: number ): boolean
	}

	export class $bog_shooter_player extends $bog_gamengine_phys3_walker {

		@ $mol_mem
		screen( next?: $bog_gamengine_screen | null ) {
			return next ?? null
		}

		@ $mol_mem
		sound( next?: $bog_gamengine_sound | null ) {
			return next ?? null
		}

		@ $mol_mem
		spark( next?: $bog_gamengine_particle | null ) {
			return next ?? null
		}

		@ $mol_mem
		targets( next?: readonly $bog_shooter_player_target[] ) {
			return next ?? []
		}

		@ $mol_mem
		look_speed( next = 0.0022 ) {
			return next
		}

		@ $mol_mem
		turn_speed( next = 2.2 ) {
			return next
		}

		@ $mol_mem
		pitch_limit( next = 1.2 ) {
			return next
		}

		@ $mol_mem
		shot_delay( next = 0.18 ) {
			return next
		}

		@ $mol_mem
		damage( next = 1 ) {
			return next
		}

		@ $mol_mem
		reach( next = 50 ) {
			return next
		}

		@ $mol_mem
		push( next = 7 ) {
			return next
		}

		@ $mol_mem
		eye_drop( next = 0.15 ) {
			return next
		}

		@ $mol_mem
		trace_time( next = 0.06 ) {
			return next
		}

		@ $mol_mem
		health_max( next = 100 ) {
			return next
		}

		@ $mol_mem
		health( next?: number ) {
			return next ?? this.health_max()
		}

		@ $mol_mem
		pitch( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		shots( next = 0 ) {
			return next
		}

		look = new Float32Array( 2 )
		aim_dir = new Float32Array( 3 )
		eye_at = new Float32Array( 3 )
		shot_hit = new Float32Array( 7 )
		shot_cast = new $bog_gamengine_phys3_cast
		trace = new Float32Array( 6 )
		trace_left = 0
		wait = 0

		dead() {
			return this.health() <= 0
		}

		eye_lift() {
			return this.height() / 2 - this.eye_drop()
		}

		eye() {
			const pos = this.pos()
			const at = this.eye_at
			at[ 0 ] = pos[ 0 ]
			at[ 1 ] = pos[ 1 ] + this.eye_lift()
			at[ 2 ] = pos[ 2 ]
			return at
		}

		aim() {
			const yaw = this.yaw
			const pitch = this.pitch()
			const flat = Math.cos( pitch )
			const dir = this.aim_dir
			dir[ 0 ] = - Math.sin( yaw ) * flat
			dir[ 1 ] = Math.sin( pitch )
			dir[ 2 ] = - Math.cos( yaw ) * flat
			return dir
		}

		revive() {
			this.health( this.health_max() )
			this.pitch( 0 )
			this.yaw = 0
			this.rot( new Float32Array( 3 ) )
			this.vel_y = 0
			this.wait = 0
			this.trace_left = 0
		}

		hurt( amount: number ) {
			const left = this.health() - amount
			this.health( left > 0 ? left : 0 )
		}

		step( dt: number ) {
			if( this.dead() ) return
			this.look_step( dt )
			super.step( dt )
			if( this.wait > 0 ) this.wait -= dt
			if( this.trace_left > 0 ) this.trace_left -= dt
			if( this.input()?.action( 'fire' ) ) this.fire()
		}

		look_step( dt: number ) {
			let yaw = this.yaw
			let pitch = this.pitch()
			const screen = this.screen()
			if( screen ) {
				const look = this.look
				screen.take( look )
				const speed = this.look_speed()
				yaw -= look[ 0 ] * speed
				pitch -= look[ 1 ] * speed
			}
			const spin = this.input()?.axis( 'turn_right', 'turn_left' ) ?? 0
			if( spin !== 0 ) yaw += spin * this.turn_speed() * dt
			const limit = this.pitch_limit()
			if( pitch < - limit ) pitch = - limit
			if( pitch > limit ) pitch = limit
			if( pitch === this.pitch() && yaw === this.yaw ) return
			this.pitch( pitch )
			this.yaw = yaw
			const rot = new Float32Array( 3 )
			rot[ 0 ] = pitch
			rot[ 1 ] = yaw
			this.rot( rot )
		}

		target_of( index: number ) {
			if( index < 0 ) return null
			const targets = this.targets()
			for( let i = 0; i < targets.length; ++ i ) {
				const target = targets[ i ]
				if( target.alive() && target.index() === index ) return target
			}
			return null
		}

		fire() {
			if( this.wait > 0 || this.dead() ) return null
			const world = this.phys3()
			if( !world ) return null
			this.wait = this.shot_delay()
			this.shots( this.shots() + 1 )
			const from = this.eye()
			const dir = this.aim()
			const reach = this.reach()
			this.body()
			const index = this.shot_cast.ray( world, from, dir, reach, this.shot_hit, this.opts )
			const far = index < 0 ? reach : this.shot_hit[ 0 ]
			const trace = this.trace
			trace[ 0 ] = from[ 0 ]
			trace[ 1 ] = from[ 1 ] - 0.08
			trace[ 2 ] = from[ 2 ]
			trace[ 3 ] = from[ 0 ] + dir[ 0 ] * far
			trace[ 4 ] = from[ 1 ] + dir[ 1 ] * far
			trace[ 5 ] = from[ 2 ] + dir[ 2 ] * far
			this.trace_left = this.trace_time()
			this.sound()?.play( 'shot' )
			const spark = this.spark()
			if( spark ) {
				const at = new Float32Array([ trace[ 3 ], trace[ 4 ], trace[ 5 ] ])
				new this.$.$mol_after_tick( ()=> spark.burst( 12, at ) )
			}
			const target = this.target_of( index )
			if( !target ) return null
			target.hurt( this.damage(), dir, this.push() )
			this.sound()?.play( 'hit' )
			return target
		}

		trace_write( out: Float32Array, at: number ) {
			if( this.trace_left <= 0 ) return at
			for( let i = 0; i < 6; ++ i ) out[ at + i ] = this.trace[ i ]
			return at + 6
		}

	}

}
