namespace $ {

	export class $bog_jumper_level extends $mol_object2 {

		@ $mol_mem
		map( next = '' ) {
			return next
		}

		@ $mol_mem
		solid_signs( next = '#=' ) {
			return next
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

		sign( x: number, y: number ) {
			const rows = this.rows()
			if( y < 0 || y >= rows.length ) return ''
			return rows[ y ][ x ] ?? ''
		}

		solid( x: number, y: number ) {
			const sign = this.sign( x, y )
			return sign !== '' && this.solid_signs().includes( sign )
		}

		frame( x: number, y: number ) {
			const sign = this.sign( x, y )
			if( sign === '#' ) return 'ground'
			if( sign === '=' ) return 'platform'
			return 'sky'
		}

		@ $mol_mem_key
		spots( sign: string ) {
			const spots = [] as ( readonly [ number, number ] )[]
			const height = this.height()
			const width = this.width()
			for( let y = 0; y < height; ++y ) {
				for( let x = 0; x < width; ++x ) if( this.sign( x, y ) === sign ) spots.push( [ x, y ] as const )
			}
			return spots as readonly ( readonly [ number, number ] )[]
		}

		@ $mol_mem_key
		ids( sign: string ) {
			return this.spots( sign ).map( spot => `${ spot[ 0 ] }_${ spot[ 1 ] }` ) as readonly string[]
		}

		xy( id: string ) {
			return id.split( '_' ).map( Number ) as [ number, number ]
		}

		pos( x: number, y: number ) {
			return new Float32Array([ x + 0.5, - y - 0.5, 0 ])
		}

		pos_of( id: string ) {
			const [ x, y ] = this.xy( id )
			return this.pos( x, y )
		}

		@ $mol_mem
		start() {
			const height = this.height()
			const width = this.width()
			for( let x = 0; x < width; ++x ) {
				for( let y = 0; y < height; ++y ) {
					if( this.solid( x, y ) ) break
					if( y + 1 >= height || this.solid( x, y + 1 ) ) return [ x, y ] as const
				}
			}
			return [ 0, 0 ] as const
		}

		@ $mol_mem
		start_pos() {
			const [ x, y ] = this.start()
			return this.pos( x, y )
		}

	}

}
