namespace $ {

	export class $bog_gamengine_cam_edge extends $bog_gamengine_node {

		@ $mol_mem
		cam( next?: $bog_gamengine_cam_flat | null ) {
			return next ?? null
		}

		@ $mol_mem
		width( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		height( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		edge( next?: number ) {
			return next ?? 48
		}

		@ $mol_mem
		speed( next?: number ) {
			return next ?? 14
		}

		at_x = -1
		at_y = -1

		aim( x: number, y: number ) {
			this.at_x = x
			this.at_y = y
		}

		away() {
			this.at_x = -1
			this.at_y = -1
		}

		push( value: number, size: number ) {
			const edge = this.edge()
			if( value < 0 || value > size || size <= edge * 2 ) return 0
			if( value < edge ) return ( value - edge ) / edge
			if( value > size - edge ) return ( value - size + edge ) / edge
			return 0
		}

		step( dt: number ) {

			const cam = this.cam()
			if( !cam ) return

			const width = this.width()
			const height = this.height()
			if( !width || !height ) return

			const dx = this.push( this.at_x, width )
			const dy = this.push( this.at_y, height )
			if( dx === 0 && dy === 0 ) return

			const rate = this.speed() * dt / cam.zoom()
			cam.pan( dx * rate, - dy * rate )

		}

	}

}
