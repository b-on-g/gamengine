namespace $ {

	export class $bog_gamengine_tilemap_pool extends $mol_object2 {

		cap = 0
		count = 0
		trans = new Float32Array( 0 )
		tint = new Float32Array( 0 )
		layer = new Float32Array( 0 )
		uv = new Float32Array( 0 )
		aabb = new Float32Array( 0 )

		fit( need: number ) {
			if( need <= this.cap ) return this.cap
			let cap = Math.max( this.cap, 16 )
			while( cap < need ) cap *= 2
			this.cap = cap
			this.trans = new Float32Array( cap * 16 )
			this.tint = new Float32Array( cap * 4 )
			this.layer = new Float32Array( cap )
			this.uv = new Float32Array( cap * 4 )
			this.aabb = new Float32Array( cap * 6 )
			const uv = this.uv
			for( let i = 0; i < cap; ++i ) {
				uv[ i * 4 + 2 ] = 1
				uv[ i * 4 + 3 ] = 1
			}
			return cap
		}

	}

	export class $bog_gamengine_tilemap extends $bog_gamengine_node {

		@ $mol_mem
		pool( next?: $bog_gamengine_tilemap_pool ) {
			return next ?? new $bog_gamengine_tilemap_pool
		}

		@ $mol_mem
		tile( next?: $bog_gamengine_phys_tile | null ) {
			return next ?? null
		}

		@ $mol_mem
		palette( next?: Record< string, string > ) {
			return next ?? {}
		}

		@ $mol_mem
		atlas( next?: $bog_gamengine_atlas | null ) {
			return next ?? null
		}

		@ $mol_mem
		size( next = 1 ) {
			return next
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'size', kind: 'number', get: ()=> this.size(), set: next => this.size( next as number ) },
			]
		}

		done_map = null as string | null
		done_size = NaN
		done_palette = null as Record< string, string > | null
		done_world = new Float32Array( 16 )
		done_tint = new Float32Array( 4 )

		fresh( map: string, world: Float32Array, size: number, palette: Record< string, string >, tint: Float32Array ) {
			let same = map === this.done_map && size === this.done_size && palette === this.done_palette
			const done_world = this.done_world
			for( let i = 0; i < 16; ++i ) {
				if( world[ i ] !== done_world[ i ] ) same = false
				done_world[ i ] = world[ i ]
			}
			const done_tint = this.done_tint
			for( let i = 0; i < 4; ++i ) {
				if( tint[ i ] !== done_tint[ i ] ) same = false
				done_tint[ i ] = tint[ i ]
			}
			this.done_map = map
			this.done_size = size
			this.done_palette = palette
			return same
		}

		cell = new Float32Array( 3 )

		emit() {
			const pool = this.pool()
			const tile = this.tile()
			const world = this.world()
			const size = this.size()
			const palette = this.palette()
			const tint = this.tint()
			const atlas = this.atlas()
			if( !tile ) {
				pool.count = 0
				return 0
			}
			if( this.fresh( tile.map(), world, size, palette, tint ) ) return pool.count

			const rows = tile.rows()
			let need = 0
			for( let y = 0; y < rows.length; ++y ) {
				const row = rows[ y ]
				for( let x = 0; x < row.length; ++x ) {
					if( palette[ row[ x ] ] !== undefined ) ++need
				}
			}
			pool.fit( need )

			const trans = pool.trans
			const tints = pool.tint
			const layer = pool.layer
			const aabb = pool.aabb
			const cell = this.cell
			const radius = size * $bog_gamengine_batch_scale_max( world ) * Math.SQRT1_2

			let count = 0
			for( let y = 0; y < rows.length; ++y ) {
				const row = rows[ y ]
				for( let x = 0; x < row.length; ++x ) {
					const frame = palette[ row[ x ] ]
					if( frame === undefined ) continue
					tile.cell_pos( x, y, cell )
					const at = count * 16
					for( let r = 0; r < 4; ++r ) {
						trans[ at + r ] = world[ r ] * size
						trans[ at + 4 + r ] = world[ 4 + r ] * size
						trans[ at + 8 + r ] = world[ 8 + r ]
						trans[ at + 12 + r ] = world[ 12 + r ] + world[ r ] * cell[ 0 ] + world[ 4 + r ] * cell[ 1 ]
					}
					for( let k = 0; k < 4; ++k ) tints[ count * 4 + k ] = tint[ k ]
					layer[ count ] = atlas ? atlas.layer( frame ) : 0
					const wx = trans[ at + 12 ]
					const wy = trans[ at + 13 ]
					const wz = trans[ at + 14 ]
					aabb[ count * 6 ] = wx - radius
					aabb[ count * 6 + 1 ] = wy - radius
					aabb[ count * 6 + 2 ] = wz - radius
					aabb[ count * 6 + 3 ] = wx + radius
					aabb[ count * 6 + 4 ] = wy + radius
					aabb[ count * 6 + 5 ] = wz + radius
					++count
				}
			}

			pool.count = count
			return count
		}

		box = new Float32Array( 6 )

		aabb() {
			const box = this.box
			const tile = this.tile()
			if( !tile ) {
				box.fill( 0 )
				return box
			}
			const world = this.world()
			const size = this.size()
			const half = size / 2
			const left = 0.5 - half
			const right = tile.width() - 0.5 + half
			const top = - 0.5 + half
			const bottom = - tile.height() + 0.5 - half
			for( let k = 0; k < 3; ++k ) {
				box[ k ] = Infinity
				box[ k + 3 ] = - Infinity
			}
			for( let i = 0; i < 4; ++i ) {
				const x = i & 1 ? right : left
				const y = i & 2 ? top : bottom
				for( let k = 0; k < 3; ++k ) {
					const value = world[ 12 + k ] + world[ k ] * x + world[ 4 + k ] * y
					if( value < box[ k ] ) box[ k ] = value
					if( value > box[ k + 3 ] ) box[ k + 3 ] = value
				}
			}
			return box
		}

		step( dt: number ) {
			this.emit()
		}

	}

}
