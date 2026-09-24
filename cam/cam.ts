namespace $ {

	export class $bog_legion_cam extends $bog_gamengine_cam_flat {

		@ $mol_mem
		width( next = 0 ) {
			return next
		}

		@ $mol_mem
		height_px( next = 0 ) {
			return next
		}

		@ $mol_mem
		edge( next = 48 ) {
			return next
		}

		@ $mol_mem
		pan( next = 14 ) {
			return next
		}

		@ $mol_mem
		zoom_min( next = 0.6 ) {
			return next
		}

		@ $mol_mem
		zoom_max( next = 3 ) {
			return next
		}

		mx = -1
		my = -1

		aim( x: number, y: number ) {
			this.mx = x
			this.my = y
		}

		away() {
			this.mx = -1
			this.my = -1
		}

		roll( delta: number ) {
			const zoom = this.zoom() * ( delta < 0 ? 1.15 : 1 / 1.15 )
			this.zoom( Math.min( this.zoom_max(), Math.max( this.zoom_min(), zoom ) ) )
		}

		push( value: number, size: number ) {
			const edge = this.edge()
			if( value < 0 || value > size || size <= edge * 2 ) return 0
			if( value < edge ) return ( value - edge ) / edge
			if( value > size - edge ) return ( value - size + edge ) / edge
			return 0
		}

		step( dt: number ) {

			const width = this.width()
			const height = this.height_px()
			if( !width || !height ) return

			const dx = this.push( this.mx, width )
			const dy = this.push( this.my, height )
			if( dx === 0 && dy === 0 ) return

			const pan = this.pan() * dt / this.zoom()
			const pos = this.pos()
			let x = pos[ 0 ] + dx * pan
			let y = pos[ 1 ] - dy * pan

			const view = this.height() / this.zoom()
			const bounds = this.bounds()
			if( bounds ) {
				x = $bog_gamengine_cam_flat_clamp( x, bounds[ 0 ], bounds[ 2 ], view * this.aspect() )
				y = $bog_gamengine_cam_flat_clamp( y, bounds[ 1 ], bounds[ 3 ], view )
			}
			if( x === pos[ 0 ] && y === pos[ 1 ] ) return

			const next = new Float32Array( 3 )
			next[ 0 ] = x
			next[ 1 ] = y
			next[ 2 ] = pos[ 2 ]
			this.pos( next )

		}

	}

}
