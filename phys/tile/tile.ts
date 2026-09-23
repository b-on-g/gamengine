namespace $ {

	export class $bog_gamengine_phys_tile extends $mol_object2 {

		@ $mol_mem
		map( next?: string ) {
			return next ?? ''
		}

		@ $mol_mem
		solid( next?: string ) {
			return next ?? '#'
		}

		@ $mol_mem
		rows() {
			return this.map().split( '\n' ).map( row => [ ...row ] as readonly string[] ) as readonly ( readonly string[] )[]
		}

		@ $mol_mem
		width() {
			const rows = this.rows()
			let width = 0
			for( let i = 0; i < rows.length; ++i ) width = Math.max( width, rows[ i ].length )
			return width
		}

		@ $mol_mem
		height() {
			return this.rows().length
		}

		cell( x: number, y: number ) {
			const rows = this.rows()
			if( y < 0 || y >= rows.length ) return true
			const row = rows[ y ]
			if( x < 0 || x >= row.length ) return true
			return this.solid().includes( row[ x ] )
		}

		char( x: number, y: number ) {
			const rows = this.rows()
			if( y < 0 || y >= rows.length ) return ''
			const row = rows[ y ]
			if( x < 0 || x >= row.length ) return ''
			return row[ x ]
		}

		@ $mol_mem_key
		spots( char: string ) {
			const rows = this.rows()
			const spots = [] as ( readonly [ number, number ] )[]
			for( let y = 0; y < rows.length; ++y ) {
				const row = rows[ y ]
				for( let x = 0; x < row.length; ++x ) {
					if( row[ x ] === char ) spots.push( [ x, y ] as const )
				}
			}
			return spots as readonly ( readonly [ number, number ] )[]
		}

		@ $mol_mem
		chars() {
			const rows = this.rows()
			const chars = new Set< string >()
			for( let y = 0; y < rows.length; ++y ) {
				const row = rows[ y ]
				for( let x = 0; x < row.length; ++x ) chars.add( row[ x ] )
			}
			return chars as ReadonlySet< string >
		}

		cell_pos( x: number, y: number, out: Float32Array ) {
			out[ 0 ] = x + 0.5
			out[ 1 ] = - y - 0.5
			out[ 2 ] = 0
			return out
		}

		cell_at( wx: number, wy: number, out: Int32Array ) {
			out[ 0 ] = Math.floor( wx )
			out[ 1 ] = Math.floor( - wy )
			return out
		}

		at = new Int32Array( 2 )

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
