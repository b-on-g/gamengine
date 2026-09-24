namespace $ {

	export class $bog_gamengine_demo_boxes_platform extends $bog_gamengine_phys3_body {

		@ $mol_mem
		span( next = 2 ) {
			return next
		}

		@ $mol_mem
		speed( next = 0.6 ) {
			return next
		}

		@ $mol_mem
		center( next?: Float32Array ) {
			return next ?? new Float32Array( 3 )
		}

		way = 1

		step( dt: number ) {
			const i = this.index()
			if( i < 0 ) return
			const world = this.world_last!
			const span = this.span()
			const from = this.center()[ 0 ]
			const at = world.pos[ i * 3 ]
			if( at > from + span ) this.way = -1
			if( at < from - span ) this.way = 1
			world.vel[ i * 3 ] = this.way * this.speed()
		}

	}

}
