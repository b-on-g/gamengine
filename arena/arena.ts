namespace $ {

	export class $bog_shooter_arena extends $mol_object2 {

		@ $mol_mem
		map( next = '' ) {
			return next
		}

		@ $mol_mem
		wall_sign( next = '#' ) {
			return next
		}

		@ $mol_mem
		target_sign( next = 'E' ) {
			return next
		}

		@ $mol_mem
		start_sign( next = 'P' ) {
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
			for( let i = 0; i < rows.length; ++ i ) width = Math.max( width, rows[ i ].length )
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

		wall( x: number, y: number ) {
			return this.sign( x, y ) === this.wall_sign()
		}

		@ $mol_mem_key
		spots( sign: string ) {
			const spots = [] as ( readonly [ number, number ] )[]
			const height = this.height()
			const width = this.width()
			for( let y = 0; y < height; ++ y ) {
				for( let x = 0; x < width; ++ x ) if( this.sign( x, y ) === sign ) spots.push( [ x, y ] as const )
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

		pos( x: number, y: number, lift: number ) {
			return new Float32Array([ x + 0.5, lift, y + 0.5 ])
		}

		pos_of( id: string, lift: number ) {
			const [ x, y ] = this.xy( id )
			return this.pos( x, y, lift )
		}

		@ $mol_mem
		wall_ids() {
			return this.ids( this.wall_sign() )
		}

		@ $mol_mem
		target_ids() {
			return this.ids( this.target_sign() )
		}

		@ $mol_mem
		start() {
			const spots = this.spots( this.start_sign() )
			return spots.length ? spots[ 0 ] : [ 1, 1 ] as const
		}

		start_pos( lift: number ) {
			const [ x, y ] = this.start()
			return this.pos( x, y, lift )
		}

		@ $mol_mem
		center() {
			return new Float32Array([ this.width() / 2, 0, this.height() / 2 ])
		}

	}

}
