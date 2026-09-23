namespace $ {

	export type $bog_gamengine_phys3_broad_world = {
		count: number
		aabb: Float32Array
		inv_mass: Float32Array
		flags: Uint8Array
		shape: Uint8Array
	}

	export class $bog_gamengine_phys3_broad extends $mol_object2 {

		static shape_plane = 3
		static flag_sleep = 1

		pairs = new Uint32Array( 0 )
		pair_count = 0
		order = new Uint32Array( 0 )
		order_len = 0

		find( world: $bog_gamengine_phys3_broad_world ) {
			this.pair_count = 0
			this.order_sync( world.count )
			this.order_sort( world.aabb )
			this.sweep( world )
			this.planes( world )
			return this.pair_count
		}

		order_sync( count: number ) {
			if( this.order.length < count ) {
				let len = Math.max( this.order.length, 16 )
				while( len < count ) len *= 2
				const next = new Uint32Array( len )
				next.set( this.order.subarray( 0, this.order_len ) )
				this.order = next
			}
			const order = this.order
			let len = this.order_len
			if( count < len ) {
				let w = 0
				for( let r = 0; r < len; ++ r ) {
					if( order[ r ] < count ) order[ w ++ ] = order[ r ]
				}
				len = w
			}
			while( len < count ) {
				order[ len ] = len
				++ len
			}
			this.order_len = len
		}

		order_sort( aabb: Float32Array ) {
			const order = this.order
			const len = this.order_len
			for( let a = 1; a < len; ++ a ) {
				const i = order[ a ]
				const key = aabb[ i * 6 ]
				let b = a - 1
				while( b >= 0 && aabb[ order[ b ] * 6 ] > key ) {
					order[ b + 1 ] = order[ b ]
					-- b
				}
				order[ b + 1 ] = i
			}
		}

		sweep( world: $bog_gamengine_phys3_broad_world ) {
			const order = this.order
			const len = this.order_len
			const aabb = world.aabb, inv_mass = world.inv_mass, flags = world.flags, shape = world.shape
			const plane = $bog_gamengine_phys3_broad.shape_plane
			const sleep = $bog_gamengine_phys3_broad.flag_sleep
			for( let a = 0; a < len; ++ a ) {
				const i = order[ a ]
				if( shape[ i ] === plane ) continue
				const i6 = i * 6
				const max_x = aabb[ i6 + 3 ]
				const min_y = aabb[ i6 + 1 ], max_y = aabb[ i6 + 4 ]
				const min_z = aabb[ i6 + 2 ], max_z = aabb[ i6 + 5 ]
				const active_i = inv_mass[ i ] > 0 && !( flags[ i ] & sleep )
				for( let b = a + 1; b < len; ++ b ) {
					const j = order[ b ]
					const j6 = j * 6
					if( aabb[ j6 ] > max_x ) break
					if( shape[ j ] === plane ) continue
					if( !active_i && !( inv_mass[ j ] > 0 && !( flags[ j ] & sleep ) ) ) continue
					if( aabb[ j6 + 1 ] > max_y || aabb[ j6 + 4 ] < min_y ) continue
					if( aabb[ j6 + 2 ] > max_z || aabb[ j6 + 5 ] < min_z ) continue
					this.push( i, j )
				}
			}
		}

		planes( world: $bog_gamengine_phys3_broad_world ) {
			const count = world.count
			const inv_mass = world.inv_mass, flags = world.flags, shape = world.shape
			const plane = $bog_gamengine_phys3_broad.shape_plane
			const sleep = $bog_gamengine_phys3_broad.flag_sleep
			for( let i = 0; i < count; ++ i ) {
				if( shape[ i ] !== plane || inv_mass[ i ] > 0 ) continue
				for( let j = 0; j < count; ++ j ) {
					if( !( inv_mass[ j ] > 0 ) || flags[ j ] & sleep ) continue
					this.push( i, j )
				}
			}
		}

		push( i: number, j: number ) {
			const at = this.pair_count * 2
			if( at + 2 > this.pairs.length ) {
				const next = new Uint32Array( Math.max( 64, this.pairs.length * 2 ) )
				next.set( this.pairs )
				this.pairs = next
			}
			const pairs = this.pairs
			if( i < j ) {
				pairs[ at ] = i
				pairs[ at + 1 ] = j
			} else {
				pairs[ at ] = j
				pairs[ at + 1 ] = i
			}
			++ this.pair_count
		}

	}

}
