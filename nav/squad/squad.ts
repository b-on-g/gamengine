namespace $ {

	export class $bog_gamengine_nav_squad extends $mol_object2 {

		@ $mol_mem
		gap( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		rings( next?: number ) {
			return next ?? 6
		}

		spots = new Float32Array( 0 )
		count = 0
		at = new Float32Array( 2 )

		grow( need: number ) {
			if( need * 2 <= this.spots.length ) return
			this.spots = new Float32Array( need * 2 )
		}

		step_of( nodes: readonly $bog_gamengine_nav_agent[] ) {
			const gap = this.gap()
			if( gap > 0 ) return gap
			let radius = 0
			for( let i = 0; i < nodes.length; ++i ) {
				const own = nodes[ i ].radius()
				if( own > radius ) radius = own
			}
			return radius > 0 ? radius * 2.4 : 1
		}

		free( x: number, y: number, grid: $bog_gamengine_nav_grid | null, step: number ) {
			if( grid && grid.solid_at( x, y ) ) return false
			const spots = this.spots
			const near = step * step * 0.25
			for( let i = 0; i < this.count; ++i ) {
				const dx = spots[ i * 2 ] - x
				const dy = spots[ i * 2 + 1 ] - y
				if( dx * dx + dy * dy < near ) return false
			}
			return true
		}

		seek( x: number, y: number, grid: $bog_gamengine_nav_grid | null, step: number ) {
			const at = this.at
			at[ 0 ] = x
			at[ 1 ] = y
			if( this.free( x, y, grid, step ) ) return at
			const rings = this.rings()
			for( let ring = 1; ring <= rings; ++ring ) {
				const total = ring * 8
				const radius = ring * step
				for( let i = 0; i < total; ++i ) {
					const angle = i / total * Math.PI * 2
					const sx = x + Math.cos( angle ) * radius
					const sy = y + Math.sin( angle ) * radius
					if( !this.free( sx, sy, grid, step ) ) continue
					at[ 0 ] = sx
					at[ 1 ] = sy
					return at
				}
			}
			return at
		}

		order( nodes: readonly $bog_gamengine_nav_agent[], x: number, y: number, grid: $bog_gamengine_nav_grid | null = null ): Float32Array {

			this.grow( nodes.length )
			this.count = 0
			if( !nodes.length ) return this.spots

			const step = this.step_of( nodes )
			const side = Math.ceil( Math.sqrt( nodes.length ) ) || 1
			const spots = this.spots

			for( let i = 0; i < nodes.length; ++i ) {
				const col = i % side
				const row = ( i / side ) | 0
				const at = this.seek(
					x + ( col - ( side - 1 ) / 2 ) * step,
					y - ( row - ( side - 1 ) / 2 ) * step,
					grid,
					step,
				)
				spots[ this.count * 2 ] = at[ 0 ]
				spots[ this.count * 2 + 1 ] = at[ 1 ]
				++ this.count
				nodes[ i ].aim( at[ 0 ], at[ 1 ] )
			}

			return spots

		}

	}

}
