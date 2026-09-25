namespace $ {

	export class $bog_gamengine_phys_tile extends $bog_gamengine_map {

		@ $mol_mem
		solid( next?: string ) {
			return next ?? '#'
		}

		cell( x: number, y: number ) {
			const rows = this.rows()
			if( y < 0 || y >= rows.length ) return true
			const row = rows[ y ]
			if( x < 0 || x >= row.length ) return true
			return this.solid().includes( row[ x ] )
		}

		cells( out: Uint8Array, width: number, height: number ) {
			const rows = this.rows()
			const marks = this.solid()
			for( let y = 0; y < height; ++y ) {
				const row = y < rows.length ? rows[ y ] : ''
				const len = row.length
				for( let x = 0; x < width; ++x ) {
					out[ y * width + x ] = x >= len || marks.includes( row[ x ] ) ? 1 : 0
				}
			}
			return out
		}

		line_free( x0: number, y0: number, x1: number, y1: number, pad: number, per: number, solid: Uint8Array ) {
			const plane = this.plane()
			if( plane !== 'xy' && plane !== 'xz' ) {
				return $mol_fail( new Error( `Map plane ${ plane } is unknown, known: xy, xz` ) )
			}
			const down = plane === 'xy'
			const origin = this.origin()
			const ox = origin[ 0 ]
			const ov = origin[ 1 ]
			const width = this.width()
			const height = this.height()
			const dx = x1 - x0
			const dv = y1 - y0
			const steps = Math.ceil( Math.max( Math.abs( dx ), Math.abs( dv ) ) * per )
			for( let i = 0; i <= steps; ++ i ) {
				const t = steps === 0 ? 0 : i / steps
				const x = x0 + dx * t
				const v = y0 + dv * t
				for( let k = 0; k < 4; ++ k ) {
					const sx = Math.floor( ( k & 1 ? x + pad : x - pad ) - ox )
					const sv = k & 2 ? v + pad : v - pad
					const sy = Math.floor( down ? ov - sv : sv - ov )
					if( sx < 0 || sy < 0 || sx >= width || sy >= height ) return false
					if( solid[ sy * width + sx ] ) return false
				}
			}
			return true
		}

		cell_pos( x: number, y: number, out: Float32Array ) {
			return this.pos( x, y, 0, out )
		}

		cell_at( wx: number, wv: number, out: Int32Array ) {
			const plane = this.plane()
			const origin = this.origin()
			out[ 0 ] = Math.floor( wx - origin[ 0 ] )
			if( plane === 'xz' ) {
				out[ 1 ] = Math.floor( wv - origin[ 1 ] )
				return out
			}
			if( plane === 'xy' ) {
				out[ 1 ] = Math.floor( origin[ 1 ] - wv )
				return out
			}
			return $mol_fail( new Error( `Map plane ${ plane } is unknown, known: xy, xz` ) )
		}

		spot = new Float32Array( 3 )

		cell_spot( x: number, y: number, out: Float32Array ) {
			const pos = this.cell_pos( x, y, this.spot )
			out[ 0 ] = pos[ 0 ]
			out[ 1 ] = pos[ this.plane() === 'xz' ? 2 : 1 ]
			return out
		}

		solid_at( wx: number, wy: number ) {
			const at = this.cell_at( wx, wy, this.at )
			return this.cell( at[ 0 ], at[ 1 ] )
		}

		ahead( wx: number, wy: number, dx: number, dy: number, dist: number ) {
			const at = this.cell_at( wx + dx * dist, wy + dy * dist, this.at )
			return this.char( at[ 0 ], at[ 1 ] )
		}

		edge( wx: number, wy: number, dx: number, dy: number ) {
			const at = this.cell_at( wx + dx, wy + dy, this.at )
			if( this.cell( at[ 0 ], at[ 1 ] ) ) return false
			return !this.cell( at[ 0 ], at[ 1 ] + 1 )
		}

	}

}
