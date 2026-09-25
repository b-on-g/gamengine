namespace $ {

	export class $bog_gamengine_demo_shooter_phys extends $bog_gamengine_phys3 {

		layer = new Float32Array( 0 )

		grow( need: number ) {
			super.grow( need )
			if( this.layer.length >= this.cap ) return
			const layer = new Float32Array( this.cap )
			layer.set( this.layer )
			this.layer = layer
		}

		place( shape: number, size: Float32Array, mass: number, pos: Float32Array, layer: number ) {
			const handle = this.add( shape, size, mass, pos )
			this.layer[ this.index_of( handle ) ] = layer
			return handle
		}

		drop( index: number ) {
			const last = super.drop( index )
			if( index !== last ) this.layer[ index ] = this.layer[ last ]
			return last
		}

	}

}
