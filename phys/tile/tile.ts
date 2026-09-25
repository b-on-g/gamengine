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
