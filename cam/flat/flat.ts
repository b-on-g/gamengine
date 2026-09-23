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
			x = pos[ 0 ] + ( x - pos[ 0 ] ) * rate
			y = pos[ 1 ] + ( y - pos[ 1 ] ) * rate
			if( x === pos[ 0 ] && y === pos[ 1 ] ) return

			const next = new Float32Array( 3 )
			next[ 0 ] = x
			next[ 1 ] = y
			next[ 2 ] = pos[ 2 ]
			this.pos( next )

		}

		@ $mol_mem_key
		proj( aspect: number ) {
			const h = this.height() / this.zoom()
			return $mol_3d_mat4.orthographic( - h * aspect / 2, h * aspect / 2, - h / 2, h / 2, -100, 100 )
		}

	}

}
