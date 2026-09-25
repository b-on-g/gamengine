namespace $ {

	export type $bog_gamengine_map_plane = 'xy' | 'xz'

	export class $bog_gamengine_map extends $mol_object2 {

		@ $mol_mem
		map( next?: string ) {
			return next ?? ''
		}

		@ $mol_mem
		plane( next = 'xy' ) {
			return next
		}

		@ $mol_mem
		origin( next?: ArrayLike< number > ): Float32Array {
			if( !next ) return new Float32Array( 2 )
			return next instanceof Float32Array ? next : new Float32Array( next )
		}

		@ $mol_mem
		rows() {
			return this.map().split( '\n' ) as readonly string[]
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

		@ $mol_mem_key
		ids( char: string ) {
			const spots = this.spots( char )
			const ids = [] as string[]
			for( let i = 0; i < spots.length; ++i ) ids.push( `${ spots[ i ][ 0 ] }_${ spots[ i ][ 1 ] }` )
			return ids as readonly string[]
		}

		at = new Int32Array( 2 )

		xy( id: string, out: Int32Array ) {
			const split = id.indexOf( '_' )
			out[ 0 ] = Number( id.slice( 0, split ) )
			out[ 1 ] = Number( id.slice( split + 1 ) )
			return out
		}

		place( cx: number, cy: number, lift: number, out: Float32Array ) {
			const plane = this.plane()
			const origin = this.origin()
			if( plane === 'xz' ) {
				out[ 0 ] = origin[ 0 ] + cx
				out[ 1 ] = lift
				out[ 2 ] = origin[ 1 ] + cy
				return out
			}
			if( plane === 'xy' ) {
				out[ 0 ] = origin[ 0 ] + cx
				out[ 1 ] = origin[ 1 ] - cy
				out[ 2 ] = lift
				return out
			}
			return $mol_fail( new Error( `Map plane ${ plane } is unknown, known: xy, xz` ) )
		}

		pos( x: number, y: number, lift: number, out: Float32Array ) {
			return this.place( x + 0.5, y + 0.5, lift, out )
		}

		spot_pos( id: string, lift: number, out: Float32Array ) {
			const at = this.xy( id, this.at )
			return this.pos( at[ 0 ], at[ 1 ], lift, out )
		}

		center( lift: number, out: Float32Array ) {
			return this.place( this.width() / 2, this.height() / 2, lift, out )
		}

	}

}
