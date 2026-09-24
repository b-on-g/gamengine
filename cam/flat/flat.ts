namespace $ {

	export function $bog_gamengine_cam_flat_clamp( value: number, min: number, max: number, size: number ) {
		if( max - min <= size ) return ( min + max ) / 2
		return Math.min( Math.max( value, min + size / 2 ), max - size / 2 )
	}

	export class $bog_gamengine_cam_flat extends $bog_gamengine_cam {

		@ $mol_mem
		zoom( next?: number ) {
			return next ?? 1
		}

		@ $mol_mem
		pixels_per_unit( next?: number ) {
			return next ?? 32
		}

		@ $mol_mem
		height( next?: number ) {
			return next ?? 10
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'zoom', kind: 'number', get: ()=> this.zoom(), set: next => this.zoom( next as number ) },
				{ name: 'height', kind: 'number', get: ()=> this.height(), set: next => this.height( next as number ) },
			]
		}

		@ $mol_mem
		target( next?: $bog_gamengine_node | null ) {
			return next ?? null
		}

		@ $mol_mem
		bounds( next?: Float32Array | null ) {
			return next ?? null
		}

		@ $mol_mem
		follow( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		zoom_min( next?: number ) {
			return next ?? 0.25
		}

		@ $mol_mem
		zoom_max( next?: number ) {
			return next ?? 4
		}

		place( x: number, y: number ) {

			const bounds = this.bounds()
			if( bounds ) {
				const height = this.height() / this.zoom()
				x = $bog_gamengine_cam_flat_clamp( x, bounds[ 0 ], bounds[ 2 ], height * this.aspect() )
				y = $bog_gamengine_cam_flat_clamp( y, bounds[ 1 ], bounds[ 3 ], height )
			}

			const pos = this.pos()
			if( x === pos[ 0 ] && y === pos[ 1 ] ) return pos

			const next = new Float32Array( 3 )
			next[ 0 ] = x
			next[ 1 ] = y
			next[ 2 ] = pos[ 2 ]
			return this.pos( next )

		}

		pan( dx: number, dy: number ) {
			const pos = this.pos()
			return this.place( pos[ 0 ] + dx, pos[ 1 ] + dy )
		}

		zoom_at( factor: number, x: number, y: number ) {
			const zoom = this.zoom()
			const next = Math.min( this.zoom_max(), Math.max( this.zoom_min(), zoom * factor ) )
			if( next === zoom ) return this.pos()
			this.zoom( next )
			const rate = zoom / next
			const pos = this.pos()
			return this.place( x + ( pos[ 0 ] - x ) * rate, y + ( pos[ 1 ] - y ) * rate )
		}

		step( dt: number ) {

			const target = this.target()
			if( !target ) return

			const world = target.world()
			const height = this.height() / this.zoom()
			const bounds = this.bounds()
			let x = world[ 12 ]
			let y = world[ 13 ]

			if( bounds ) {
				x = $bog_gamengine_cam_flat_clamp( x, bounds[ 0 ], bounds[ 2 ], height * this.aspect() )
				y = $bog_gamengine_cam_flat_clamp( y, bounds[ 1 ], bounds[ 3 ], height )
			}

			const pos = this.pos()
			const follow = this.follow()
			const rate = follow > 0 ? 1 - Math.exp( - dt / follow ) : 1
			this.place( pos[ 0 ] + ( x - pos[ 0 ] ) * rate, pos[ 1 ] + ( y - pos[ 1 ] ) * rate )

		}

		@ $mol_mem_key
		proj( aspect: number ) {
			const h = this.height() / this.zoom()
			return $mol_3d_mat4.orthographic( - h * aspect / 2, h * aspect / 2, - h / 2, h / 2, -100, 100 )
		}

	}

}
