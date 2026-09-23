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

	}

}
