namespace $ {

	export class $bog_gamengine_demo_flat_hero extends $bog_gamengine_phys_body {

		@ $mol_mem
		key( next?: $bog_gamengine_key | null ) {
			return next ?? null
		}

		@ $mol_mem
		speed( next = 4 ) {
			return next
		}

		@ $mol_mem
		size( next?: Float32Array ) {
			return next ?? new Float32Array([ 0.8, 0.8 ])
		}

		@ $mol_mem
		face_left( next = false ) {
			return next
		}

		step( dt: number ) {
			const key = this.key()
			if( !key ) return
			const speed = this.speed()
			const vx = key.axis( 'left', 'right' ) * speed
			const vy = key.axis( 'down', 'up' ) * speed
			if( vx !== 0 ) this.face_left( vx < 0 )
			const vel = this.vel()
			if( vel[ 0 ] === vx && vel[ 1 ] === vy ) return
			const next = new Float32Array( 3 )
			next[ 0 ] = vx
			next[ 1 ] = vy
			next[ 2 ] = vel[ 2 ]
			this.vel( next )
		}

	}

}
