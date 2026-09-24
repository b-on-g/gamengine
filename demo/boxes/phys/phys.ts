namespace $ {

	export class $bog_gamengine_demo_boxes_phys extends $bog_gamengine_phys3 {

		low() {
			let low = Infinity
			const pos = this.pos, inv_mass = this.inv_mass
			for( let i = 0; i < this.count; ++ i ) {
				if( !( inv_mass[ i ] > 0 ) ) continue
				if( pos[ i * 3 + 1 ] < low ) low = pos[ i * 3 + 1 ]
			}
			return low
		}

	}

}
