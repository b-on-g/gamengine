namespace $ {

	const sqrt2 = Math.SQRT2

	export class $bog_gamengine_nav_grid extends $mol_object2 {

		@ $mol_mem
		tile( next?: $bog_gamengine_phys_tile | null ) {
			return next ?? null
		}

		@ $mol_mem
		pad( next = 0.3 ) {
			return next
		}

		@ $mol_mem
		width() {
			return this.tile()?.width() ?? 0
		}

		@ $mol_mem
		height() {
			return this.tile()?.height() ?? 0
		}

		@ $mol_mem
		solid() {
			const tile = this.tile()
			const width = this.width()
			const height = this.height()
			const solid = new Uint8Array( width * height )
			if( !tile ) return solid
			return tile.cells( solid, width, height )
		}

		cell( x: number, y: number ) {
			const width = this.width()
			if( x < 0 || y < 0 || x >= width || y >= this.height() ) return true
			return this.solid()[ y * width + x ] === 1
		}

		cell_out = new Int32Array( 2 )
		spot = new Float32Array( 2 )

		solid_at( wx: number, wv: number ) {
			const tile = this.tile()
			if( !tile ) return true
			const at = tile.cell_at( wx, wv, this.cell_out )
			return this.cell( at[ 0 ], at[ 1 ] )
		}

		block( x: number, y: number, solid: boolean ) {
			const width = this.width()
			if( x < 0 || y < 0 || x >= width || y >= this.height() ) return
			this.solid()[ y * width + x ] = solid ? 1 : 0
		}

		size = 0
		gen = 0
		seen = new Int32Array( 0 )
		state = new Uint8Array( 0 )
		cost = new Float32Array( 0 )
		rank = new Float32Array( 0 )
		from = new Int32Array( 0 )
		heap = new Int32Array( 0 )
		at = new Int32Array( 0 )
		trace = new Int32Array( 0 )
		heap_size = 0

		grow() {
			const size = this.width() * this.height()
			if( size <= this.size ) return
			this.size = size
			this.seen = new Int32Array( size )
			this.state = new Uint8Array( size )
			this.cost = new Float32Array( size )
			this.rank = new Float32Array( size )
			this.from = new Int32Array( size )
			this.heap = new Int32Array( size )
			this.at = new Int32Array( size )
			this.trace = new Int32Array( size )
		}

		heur( x0: number, y0: number, x1: number, y1: number ) {
			const dx = Math.abs( x1 - x0 )
			const dy = Math.abs( y1 - y0 )
			return dx + dy + ( sqrt2 - 2 ) * Math.min( dx, dy )
		}

		heap_push( node: number ) {
			const heap = this.heap
			let i = this.heap_size ++
			heap[ i ] = node
			this.at[ node ] = i
			this.heap_up( i )
		}

		heap_up( i: number ) {
			const heap = this.heap
			const rank = this.rank
			const at = this.at
			const node = heap[ i ]
			const r = rank[ node ]
			while( i > 0 ) {
				const p = ( i - 1 ) >> 1
				if( rank[ heap[ p ] ] <= r ) break
				heap[ i ] = heap[ p ]
				at[ heap[ i ] ] = i
				i = p
			}
			heap[ i ] = node
			at[ node ] = i
		}

		heap_pop() {
			const heap = this.heap
			const rank = this.rank
			const at = this.at
			const top = heap[ 0 ]
			const size = -- this.heap_size
			if( size === 0 ) return top
			const node = heap[ size ]
			const r = rank[ node ]
			let i = 0
			for(;;) {
				let c = i * 2 + 1
				if( c >= size ) break
				if( c + 1 < size && rank[ heap[ c + 1 ] ] < rank[ heap[ c ] ] ) ++ c
				if( rank[ heap[ c ] ] >= r ) break
				heap[ i ] = heap[ c ]
				at[ heap[ i ] ] = i
				i = c
			}
			heap[ i ] = node
			at[ node ] = i
			return top
		}

		path( from: Float32Array, to: Float32Array, out: Float32Array ) {

			const width = this.width()
			const height = this.height()
			if( width === 0 || height === 0 ) return 0
			this.grow()

			const solid = this.solid()
			const tile = this.tile()!
			const at = tile.cell_at( from[ 0 ], from[ 1 ], this.cell_out )
			const x0 = at[ 0 ]
			const y0 = at[ 1 ]
			tile.cell_at( to[ 0 ], to[ 1 ], at )
			const x1 = at[ 0 ]
			const y1 = at[ 1 ]
			if( x0 < 0 || y0 < 0 || x0 >= width || y0 >= height ) return 0
			if( x1 < 0 || y1 < 0 || x1 >= width || y1 >= height ) return 0
			if( solid[ y1 * width + x1 ] ) return 0

			const gen = ++ this.gen
			const seen = this.seen
			const state = this.state
			const cost = this.cost
			const rank = this.rank
			const parent = this.from
			const start = y0 * width + x0
			const goal = y1 * width + x1

			this.heap_size = 0
			seen[ start ] = gen
			state[ start ] = 1
			cost[ start ] = 0
			rank[ start ] = this.heur( x0, y0, x1, y1 )
			parent[ start ] = -1
			this.heap_push( start )

			let found = false

			while( this.heap_size > 0 ) {

				const node = this.heap_pop()
				if( node === goal ) {
					found = true
					break
				}
				state[ node ] = 2
				const nx = node % width
				const ny = ( node - nx ) / width
				const g = cost[ node ]

				for( let dy = -1; dy <= 1; ++dy ) {
					const yy = ny + dy
					if( yy < 0 || yy >= height ) continue
					for( let dx = -1; dx <= 1; ++dx ) {
						if( dx === 0 && dy === 0 ) continue
						const xx = nx + dx
						if( xx < 0 || xx >= width ) continue
						const next = yy * width + xx
						if( solid[ next ] ) continue
						let step = 1
						if( dx !== 0 && dy !== 0 ) {
							if( solid[ ny * width + xx ] || solid[ yy * width + nx ] ) continue
							step = sqrt2
						}
						const ng = g + step
						if( seen[ next ] === gen ) {
							if( state[ next ] === 2 || cost[ next ] <= ng ) continue
							cost[ next ] = ng
							rank[ next ] = ng + this.heur( xx, yy, x1, y1 )
							parent[ next ] = node
							this.heap_up( this.at[ next ] )
						} else {
							seen[ next ] = gen
							state[ next ] = 1
							cost[ next ] = ng
							rank[ next ] = ng + this.heur( xx, yy, x1, y1 )
							parent[ next ] = node
							this.heap_push( next )
						}
					}
				}

			}

			if( !found ) return 0

			const trace = this.trace
			let len = 0
			for( let node = goal; node !== -1; node = parent[ node ] ) trace[ len ++ ] = node

			const cap = out.length >> 1
			let count = 0
			for( let i = len - 1; i >= 0 && count < cap; -- i ) {
				const node = trace[ i ]
				const x = node % width
				const y = ( node - x ) / width
				tile.cell_spot( x, y, this.spot )
				out[ count * 2 ] = this.spot[ 0 ]
				out[ count * 2 + 1 ] = this.spot[ 1 ]
				++ count
			}
			out[ 0 ] = from[ 0 ]
			out[ 1 ] = from[ 1 ]
			if( count === len ) {
				out[ count * 2 - 2 ] = to[ 0 ]
				out[ count * 2 - 1 ] = to[ 1 ]
			}

			return count
		}

		visible( x0: number, y0: number, x1: number, y1: number ) {
			const tile = this.tile()
			if( !tile ) return false
			return tile.line_free( x0, y0, x1, y1, this.pad(), 4, this.solid() )
		}

		smooth( path: Float32Array, count: number, out: Float32Array ) {
			if( count === 0 ) return 0
			const cap = out.length >> 1
			let written = 0
			let i = 0
			out[ 0 ] = path[ 0 ]
			out[ 1 ] = path[ 1 ]
			written = 1
			while( i < count - 1 && written < cap ) {
				let j = count - 1
				while( j > i + 1 && !this.visible( path[ i * 2 ], path[ i * 2 + 1 ], path[ j * 2 ], path[ j * 2 + 1 ] ) ) -- j
				out[ written * 2 ] = path[ j * 2 ]
				out[ written * 2 + 1 ] = path[ j * 2 + 1 ]
				++ written
				i = j
			}
			return written
		}

	}

}
