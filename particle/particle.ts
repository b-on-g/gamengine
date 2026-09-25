namespace $ {

	export class $bog_gamengine_particle_pool extends $mol_object2 {

		@ $mol_mem
		cap( next = 1000 ) {
			return next
		}

		count = 0
		pos = new Float32Array( 0 )
		vel = new Float32Array( 0 )
		age = new Float32Array( 0 )
		life = new Float32Array( 0 )
		size = new Float32Array( 0 )
		seed = new Float32Array( 0 )
		trans = new Float32Array( 0 )
		tint = new Float32Array( 0 )
		layer = new Float32Array( 0 )
		uv = new Float32Array( 0 )
		aabb = new Float32Array( 0 )

		fit() {
			const cap = this.cap()
			if( this.age.length === cap ) return cap
			this.pos = new Float32Array( cap * 3 )
			this.vel = new Float32Array( cap * 3 )
			this.age = new Float32Array( cap )
			this.life = new Float32Array( cap )
			this.size = new Float32Array( cap )
			this.seed = new Float32Array( cap )
			this.trans = new Float32Array( cap * 16 )
			this.tint = new Float32Array( cap * 4 )
			this.layer = new Float32Array( cap )
			this.uv = new Float32Array( cap * 4 )
			this.aabb = new Float32Array( cap * 6 )
			const uv = this.uv
			for( let i = 0; i < cap; ++ i ) {
				uv[ i * 4 + 2 ] = 1
				uv[ i * 4 + 3 ] = 1
			}
			this.count = 0
			return cap
		}

		kill( index: number ) {
			const last = -- this.count
			if( index === last ) return
			this.pos.copyWithin( index * 3, last * 3, last * 3 + 3 )
			this.vel.copyWithin( index * 3, last * 3, last * 3 + 3 )
			this.age[ index ] = this.age[ last ]
			this.life[ index ] = this.life[ last ]
			this.size[ index ] = this.size[ last ]
			this.seed[ index ] = this.seed[ last ]
		}

	}

	export class $bog_gamengine_particle extends $bog_gamengine_node {

		@ $mol_mem
		pool( next?: $bog_gamengine_particle_pool ) {
			return next ?? new $bog_gamengine_particle_pool
		}

		@ $mol_mem
		atlas( next?: $bog_gamengine_atlas | null ) {
			return next ?? null
		}

		is_source() {
			return true
		}

		source() {
			return this.pool() as $bog_gamengine_batch_source
		}

		@ $mol_mem
		rate( next = 0 ) {
			return next
		}

		@ $mol_mem
		life( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 1, 1 ])
		}

		@ $mol_mem
		speed( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 1, 1 ])
		}

		@ $mol_mem
		spread( next = 0 ) {
			return next
		}

		@ $mol_mem
		dir( next?: ArrayLike< number > | null ) {
			return next ? $bog_gamengine_node_vec( next ) : null
		}

		@ $mol_mem
		gravity( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 0, 0, 0 ])
		}

		@ $mol_mem
		size( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 1, 1 ])
		}

		@ $mol_mem
		color( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 1, 1, 1, 1, 1, 1, 1, 1 ])
		}

		@ $mol_mem
		frame( next = '' ) {
			return next
		}

		@ $mol_mem
		frames( next?: readonly string[] ) {
			return next ?? []
		}

		@ $mol_mem
		world_space( next = true ) {
			return next
		}

		@ $mol_mem
		seed( next = 1 ) {
			return next
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'rate', kind: 'number', get: ()=> this.rate(), set: next => this.rate( next as number ) },
				{ name: 'life', kind: 'vec2', get: ()=> this.life(), set: next => this.life( next as ArrayLike< number > ) },
				{ name: 'speed', kind: 'vec2', get: ()=> this.speed(), set: next => this.speed( next as ArrayLike< number > ) },
				{ name: 'spread', kind: 'number', get: ()=> this.spread(), set: next => this.spread( next as number ) },
				{ name: 'gravity', kind: 'vec3', get: ()=> this.gravity(), set: next => this.gravity( next as ArrayLike< number > ) },
				{ name: 'size', kind: 'vec2', get: ()=> this.size(), set: next => this.size( next as ArrayLike< number > ) },
				{ name: 'frame', kind: 'frame', get: ()=> this.frame(), set: next => this.frame( next as string ) },
				{ name: 'billboard', kind: 'flag', get: ()=> this.billboard(), set: next => this.billboard( next as boolean ) },
				{ name: 'world_space', kind: 'flag', get: ()=> this.world_space(), set: next => this.world_space( next as boolean ) },
			]
		}

		@ $mol_mem
		layers() {
			const atlas = this.atlas()
			const frames = this.frames()
			const frame = this.frame()
			const list = new Float32Array( Math.max( 1, frames.length ) )
			if( !atlas ) return list
			if( frames.length ) {
				for( let i = 0; i < frames.length; ++ i ) list[ i ] = atlas.layer( frames[ i ] )
			} else if( frame ) {
				list[ 0 ] = atlas.layer( frame )
			}
			return list
		}

		rand_state = 0
		rand_seed = NaN
		accum = 0
		origin = new Float32Array( 3 )
		axis = new Float32Array( 3 )
		side = new Float32Array( 3 )
		up = new Float32Array( 3 )
		basis = new Float32Array( 9 )
		local = new Float32Array( 16 )

		rand() {
			const seed = this.seed()
			if( seed !== this.rand_seed ) {
				this.rand_seed = seed
				this.rand_state = seed | 0
			}
			let t = this.rand_state = ( this.rand_state + 0x6D2B79F5 ) | 0
			t = Math.imul( t ^ ( t >>> 15 ), t | 1 )
			t ^= t + Math.imul( t ^ ( t >>> 7 ), t | 61 )
			return ( ( t ^ ( t >>> 14 ) ) >>> 0 ) / 4294967296
		}

		frame_of( world: Float32Array ) {
			const axis = this.axis
			const dir = this.dir()
			if( this.world_space() ) {
				if( dir ) {
					axis[ 0 ] = world[ 0 ] * dir[ 0 ] + world[ 4 ] * dir[ 1 ] + world[ 8 ] * dir[ 2 ]
					axis[ 1 ] = world[ 1 ] * dir[ 0 ] + world[ 5 ] * dir[ 1 ] + world[ 9 ] * dir[ 2 ]
					axis[ 2 ] = world[ 2 ] * dir[ 0 ] + world[ 6 ] * dir[ 1 ] + world[ 10 ] * dir[ 2 ]
				} else {
					axis[ 0 ] = - world[ 8 ]
					axis[ 1 ] = - world[ 9 ]
					axis[ 2 ] = - world[ 10 ]
				}
			} else if( dir ) {
				axis[ 0 ] = dir[ 0 ]
				axis[ 1 ] = dir[ 1 ]
				axis[ 2 ] = dir[ 2 ]
			} else {
				axis[ 0 ] = 0
				axis[ 1 ] = 0
				axis[ 2 ] = -1
			}
			$bog_gamengine_vec_norm( axis, axis )
			const side = this.side
			const up = this.up
			const ax = Math.abs( axis[ 0 ] )
			up[ 0 ] = ax < 0.9 ? 1 : 0
			up[ 1 ] = ax < 0.9 ? 0 : 1
			up[ 2 ] = 0
			$bog_gamengine_vec_cross( side, up, axis )
			$bog_gamengine_vec_norm( side, side )
			$bog_gamengine_vec_cross( up, axis, side )
		}

		spawn( n: number, at: Float32Array | null = null ) {
			const pool = this.pool()
			const cap = pool.fit()
			const world = this.world()
			const origin = this.origin
			if( at ) {
				origin[ 0 ] = at[ 0 ]
				origin[ 1 ] = at[ 1 ]
				origin[ 2 ] = at[ 2 ]
			} else if( this.world_space() ) {
				origin[ 0 ] = world[ 12 ]
				origin[ 1 ] = world[ 13 ]
				origin[ 2 ] = world[ 14 ]
			} else {
				origin[ 0 ] = 0
				origin[ 1 ] = 0
				origin[ 2 ] = 0
			}
			this.frame_of( world )
			const axis = this.axis
			const side = this.side
			const up = this.up
			const life = this.life()
			const speed = this.speed()
			const size = this.size()
			const cos_min = Math.cos( Math.min( Math.PI, this.spread() ) )
			const pos = pool.pos
			const vel = pool.vel
			const seed = pool.seed
			let count = pool.count
			for( let k = 0; k < n && count < cap; ++ k ) {
				const i = count ++
				const phi = this.rand() * Math.PI * 2
				const cos = cos_min + ( 1 - cos_min ) * this.rand()
				const sin = Math.sqrt( Math.max( 0, 1 - cos * cos ) )
				const v = speed[ 0 ] + ( speed[ 1 ] - speed[ 0 ] ) * this.rand()
				const sx = Math.cos( phi ) * sin
				const sy = Math.sin( phi ) * sin
				pos[ i * 3 ] = origin[ 0 ]
				pos[ i * 3 + 1 ] = origin[ 1 ]
				pos[ i * 3 + 2 ] = origin[ 2 ]
				vel[ i * 3 ] = ( axis[ 0 ] * cos + side[ 0 ] * sx + up[ 0 ] * sy ) * v
				vel[ i * 3 + 1 ] = ( axis[ 1 ] * cos + side[ 1 ] * sx + up[ 1 ] * sy ) * v
				vel[ i * 3 + 2 ] = ( axis[ 2 ] * cos + side[ 2 ] * sx + up[ 2 ] * sy ) * v
				pool.age[ i ] = 0
				pool.life[ i ] = life[ 0 ] + ( life[ 1 ] - life[ 0 ] ) * this.rand()
				pool.size[ i ] = size[ 0 ]
				seed[ i ] = this.rand()
			}
			pool.count = count
			return count
		}

		burst( n: number, at: Float32Array | null = null ) {
			this.spawn( n, at )
			this.emit()
			return this.pool().count
		}

		integrate( dt: number ) {
			const pool = this.pool()
			const gravity = this.gravity()
			const gx = gravity[ 0 ] * dt
			const gy = gravity[ 1 ] * dt
			const gz = gravity[ 2 ] * dt
			const pos = pool.pos
			const vel = pool.vel
			const age = pool.age
			const life = pool.life
			for( let i = 0; i < pool.count; ++ i ) {
				age[ i ] += dt
				if( age[ i ] >= life[ i ] ) {
					pool.kill( i )
					-- i
					continue
				}
				vel[ i * 3 ] += gx
				vel[ i * 3 + 1 ] += gy
				vel[ i * 3 + 2 ] += gz
				pos[ i * 3 ] += vel[ i * 3 ] * dt
				pos[ i * 3 + 1 ] += vel[ i * 3 + 1 ] * dt
				pos[ i * 3 + 2 ] += vel[ i * 3 + 2 ] * dt
			}
		}

		emit() {
			const pool = this.pool()
			const world_space = this.world_space()
			const world = this.world()
			const size = this.size()
			const color = this.color()
			const layers = this.layers()
			const basis = this.basis
			const cam = this.billboard() ? this.scene()?.cam() ?? null : null
			if( cam ) {
				$bog_gamengine_vec_mat4_basis( basis, cam.world(), 3 )
			} else {
				basis.fill( 0 )
				basis[ 0 ] = 1
				basis[ 4 ] = 1
				basis[ 8 ] = 1
			}
			const local = this.local
			const scale_world = world_space ? 1 : $bog_gamengine_batch_scale_max( world )
			const trans = pool.trans
			const tint = pool.tint
			const layer = pool.layer
			const aabb = pool.aabb
			const pos = pool.pos
			const age = pool.age
			const life = pool.life
			const sizes = pool.size
			const last = layers.length - 1
			for( let i = 0; i < pool.count; ++ i ) {
				const t = life[ i ] > 0 ? Math.min( 1, age[ i ] / life[ i ] ) : 1
				const s = size[ 0 ] + ( size[ 1 ] - size[ 0 ] ) * t
				sizes[ i ] = s
				for( let k = 0; k < 4; ++ k ) tint[ i * 4 + k ] = color[ k ] + ( color[ 4 + k ] - color[ k ] ) * t
				layer[ i ] = layers[ Math.min( last, Math.floor( t * layers.length ) ) ]
				const out = world_space ? trans : local
				const at = world_space ? i * 16 : 0
				for( let c = 0; c < 3; ++ c ) {
					out[ at + c * 4 ] = basis[ c * 3 ] * s
					out[ at + c * 4 + 1 ] = basis[ c * 3 + 1 ] * s
					out[ at + c * 4 + 2 ] = basis[ c * 3 + 2 ] * s
					out[ at + c * 4 + 3 ] = 0
				}
				out[ at + 12 ] = pos[ i * 3 ]
				out[ at + 13 ] = pos[ i * 3 + 1 ]
				out[ at + 14 ] = pos[ i * 3 + 2 ]
				out[ at + 15 ] = 1
				if( !world_space ) $bog_gamengine_particle_mat_mul( trans, i * 16, world, local )
				const r = s * scale_world * Math.SQRT1_2
				const x = trans[ i * 16 + 12 ]
				const y = trans[ i * 16 + 13 ]
				const z = trans[ i * 16 + 14 ]
				aabb[ i * 6 ] = x - r
				aabb[ i * 6 + 1 ] = y - r
				aabb[ i * 6 + 2 ] = z - r
				aabb[ i * 6 + 3 ] = x + r
				aabb[ i * 6 + 4 ] = y + r
				aabb[ i * 6 + 5 ] = z + r
			}
		}

		step( dt: number ) {
			const pool = this.pool()
			pool.fit()
			this.accum += this.rate() * dt
			const born = Math.floor( this.accum )
			if( born > 0 ) {
				this.accum -= born
				this.spawn( born )
			}
			this.integrate( dt )
			this.emit()
		}

	}

	export function $bog_gamengine_particle_mat_mul( out: Float32Array, at: number, a: Float32Array, b: Float32Array ) {
		for( let c = 0; c < 4; ++ c ) {
			const b0 = b[ c * 4 ]
			const b1 = b[ c * 4 + 1 ]
			const b2 = b[ c * 4 + 2 ]
			const b3 = b[ c * 4 + 3 ]
			for( let r = 0; r < 4; ++ r ) {
				out[ at + c * 4 + r ] = a[ r ] * b0 + a[ 4 + r ] * b1 + a[ 8 + r ] * b2 + a[ 12 + r ] * b3
			}
		}
		return out
	}

}
