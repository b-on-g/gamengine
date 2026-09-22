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

		solid_at( wx: number, wy: number ) {
			return this.cell( Math.floor( wx ), Math.floor( - wy ) )
		}

	}

}
