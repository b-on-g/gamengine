namespace $ {

	export class $bog_gamengine_demo_jumper_level extends $mol_object2 {

		@ $mol_mem
		tile( next?: $bog_gamengine_phys_tile | null ) {
			return next ?? null
		}

		width() {
			return this.tile()?.width() ?? 0
		}

		height() {
			return this.tile()?.height() ?? 0
		}

		sign( x: number, y: number ) {
			return this.tile()?.char( x, y ) ?? ''
		}

		solid( x: number, y: number ) {
			const tile = this.tile()
			if( !tile ) return false
			const sign = tile.char( x, y )
			return sign !== '' && tile.solid().includes( sign )
		}

		frame( x: number, y: number ) {
			const sign = this.sign( x, y )
			if( sign === '#' ) return 'ground'
			if( sign === '=' ) return 'platform'
			return 'sky'
		}

		@ $mol_mem_key
		ids( sign: string ) {
			const spots = this.tile()?.spots( sign ) ?? []
			return spots.map( spot => `${ spot[ 0 ] }_${ spot[ 1 ] }` ) as readonly string[]
		}

		xy( id: string ) {
			return id.split( '_' ).map( Number ) as [ number, number ]
		}

		pos( x: number, y: number ) {
			const pos = new Float32Array( 3 )
			return this.tile()?.cell_pos( x, y, pos ) ?? pos
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
