namespace $ {

	export class $bog_gamengine_demo_jumper_hero extends $bog_gamengine_phys_body {

		@ $mol_mem
		input( next?: $bog_gamengine_input | null ) {
			return next ?? null
		}

		@ $mol_mem
		sound( next?: $bog_gamengine_sound | null ) {
			return next ?? null
		}

		@ $mol_mem
		speed( next = 6 ) {
			return next
		}

		@ $mol_mem
		jump_speed( next = 10 ) {
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
		lives_max( next = 3 ) {
			return next
		}

		@ $mol_mem
		size( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 0.8, 0.8 ])
		}

		@ $mol_mem
		start( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 0.5, -0.5, 0 ])
		}

		@ $mol_mem
		lives( next?: number ) {
			return next ?? this.lives_max()
		}

		@ $mol_mem
		coins( next = 0 ) {
			return next
		}

		@ $mol_mem
		won( next = false ) {
			return next
		}

		@ $mol_mem
		face_left( next = false ) {
			return next
		}

		@ $mol_mem
		clip( next = '' ) {
			return next
		}

		over() {
			return this.lives() <= 0
		}

		frozen() {
			return this.won() || this.over()
		}

		step( dt: number ) {

			const input = this.input()
			const vel = this.vel()

			if( !input || this.frozen() ) {
				if( vel[ 0 ] === 0 && vel[ 1 ] === 0 ) return
				this.vel( new Float32Array( 3 ) )
				return
			}

			const ground = this.on_ground()
			const vx = input.axis( 'left', 'right' ) * this.speed()
			let vy = vel[ 1 ] - this.gravity() * dt

			if( ground && input.action( 'jump' ) ) {
				vy = this.jump_speed()
				this.sound()?.play( 'jump' )
			}

			const fall_max = this.fall_max()
			if( vy < - fall_max ) vy = - fall_max

			if( vx !== 0 ) this.face_left( vx < 0 )

			const clip = vx !== 0 && ground ? 'walk' : ''
			if( this.clip() !== clip ) this.clip( clip )

			if( vel[ 0 ] === vx && vel[ 1 ] === vy ) return

			const next = new Float32Array( 3 )
			next[ 0 ] = vx
			next[ 1 ] = vy
			next[ 2 ] = vel[ 2 ]
			this.vel( next )

		}

		die() {
			if( this.frozen() ) return
			this.sound()?.play( 'death' )
			this.lives( this.lives() - 1 )
			this.pos( this.start() )
			this.vel( new Float32Array( 3 ) )
			this.clip( '' )
		}

		revive() {
			this.lives( this.lives_max() )
			this.coins( 0 )
			this.won( false )
			this.pos( this.start() )
			this.vel( new Float32Array( 3 ) )
			this.clip( '' )
			this.face_left( false )
		}

		take( item: $bog_gamengine_demo_jumper_item ) {
			const role = item.role()
			if( role === 'coin' ) {
				if( item.taken() ) return
				item.taken( true )
				this.coins( this.coins() + 1 )
				this.sound()?.play( 'coin' )
				return
			}
			if( role === 'spike' ) return this.die()
			if( role === 'flag' ) this.won( true )
		}

		clash( enemy: $bog_gamengine_demo_jumper_enemy ) {
			if( enemy.dead() ) return
			const vel = this.vel()
			if( vel[ 1 ] < 0 && this.pos()[ 1 ] > enemy.pos()[ 1 ] + 0.2 ) {
				enemy.dead( true )
				const next = new Float32Array( 3 )
				next[ 0 ] = vel[ 0 ]
				next[ 1 ] = this.jump_speed() * 0.6
				this.vel( next )
				return
			}
			this.die()
		}

		hit( other: $bog_gamengine_phys_body | null ) {
			if( !other || this.frozen() ) return
			if( other instanceof $bog_gamengine_demo_jumper_item ) return this.take( other )
			if( other instanceof $bog_gamengine_demo_jumper_enemy ) this.clash( other )
		}

	}

}
