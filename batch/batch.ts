namespace $ {

	export type $bog_gamengine_batch_node = $bog_gamengine_node & {
		tint?(): Float32Array
		layer?(): number
		uv?(): Float32Array
		material?(): Float32Array
		normal_layer?(): number
		radius?(): number
		shape?(): $bog_gamengine_shape
		shader?(): $bog_gamengine_shader | null
	}

	export type $bog_gamengine_batch_source_node = $bog_gamengine_batch_node & {
		is_source(): boolean
		source(): $bog_gamengine_batch_source | null
	}

	export type $bog_gamengine_batch_source = {
		trans: Float32Array
		count: number
		aabb?: Float32Array
		tint?: Float32Array
		layer?: Float32Array
		uv?: Float32Array
	}

	export function $bog_gamengine_batch_scale_max( world: Float32Array ) {
		const x = world[ 0 ] * world[ 0 ] + world[ 1 ] * world[ 1 ] + world[ 2 ] * world[ 2 ]
		const y = world[ 4 ] * world[ 4 ] + world[ 5 ] * world[ 5 ] + world[ 6 ] * world[ 6 ]
		const z = world[ 8 ] * world[ 8 ] + world[ 9 ] * world[ 9 ] + world[ 10 ] * world[ 10 ]
		return Math.sqrt( Math.max( x, y, z ) )
	}

	export class $bog_gamengine_batch extends $mol_object2 {

		@ $mol_mem
		shader( next?: $bog_gamengine_shader ) {
			return next ?? new $bog_gamengine_shader_flat
		}

		@ $mol_mem
		shape( next?: $bog_gamengine_shape ) {
			return next ?? new $bog_gamengine_shape_quad
		}

		@ $mol_mem
		atlas( next?: $bog_gamengine_atlas | null ) {
			return next ?? null
		}

		@ $mol_mem
		nodes( next?: readonly $bog_gamengine_batch_node[] ) {
			return next ?? []
		}

		@ $mol_mem
		source( next?: $bog_gamengine_batch_source | null ) {
			return next ?? null
		}

		@ $mol_mem
		skip( next = 0 ) {
			return next
		}

		@ $mol_mem
		instances( next = 0 ) {
			return next
		}

		@ $mol_mem
		cull( next = true ) {
			return next
		}

		@ $mol_mem
		near( next = 0 ) {
			return next
		}

		@ $mol_mem
		far( next = Infinity ) {
			return next
		}

		cap = 0
		count = 0
		version = 0
		trans = new Float32Array( 0 )
		tint = new Float32Array( 0 )
		layer = new Float32Array( 0 )
		uv = new Float32Array( 0 )
		material = new Float32Array( 0 )
		normal_layer = new Float32Array( 0 )

		grow( need: number ) {
			if( need <= this.cap ) return
			let cap = Math.max( this.cap, 16 )
			while( cap < need ) cap *= 2
			this.cap = cap
			this.trans = new Float32Array( cap * 16 )
			this.tint = new Float32Array( cap * 4 )
			this.layer = new Float32Array( cap )
			this.uv = new Float32Array( cap * 4 )
			this.material = new Float32Array( cap * 4 )
			this.normal_layer = new Float32Array( cap )
		}

		fill_plain( count: number ) {
			this.grow( count )
			const trans = this.trans
			const tint = this.tint
			const layer = this.layer
			const uv = this.uv
			const material = this.material
			const normal_layer = this.normal_layer
			for( let i = 0; i < count; ++ i ) {
				const at = i * 16
				for( let k = 0; k < 16; ++ k ) trans[ at + k ] = 0
				trans[ at ] = 1
				trans[ at + 5 ] = 1
				trans[ at + 10 ] = 1
				trans[ at + 15 ] = 1
				for( let k = 0; k < 4; ++ k ) tint[ i * 4 + k ] = 1
				layer[ i ] = 0
				uv[ i * 4 ] = 0
				uv[ i * 4 + 1 ] = 0
				uv[ i * 4 + 2 ] = 1
				uv[ i * 4 + 3 ] = 1
				material[ i * 4 ] = 0
				material[ i * 4 + 1 ] = 0.6
				material[ i * 4 + 2 ] = 0
				material[ i * 4 + 3 ] = 0
				normal_layer[ i ] = -1
			}
			this.count = count
			++ this.version
			return count
		}

		fill( frustum: Float32Array | null = null, eye: Float32Array | null = null ) {
			const source = this.source()
			if( source ) return this.fill_source( source, frustum )
			const instances = this.instances()
			if( instances > 0 ) return this.fill_plain( instances )
			const nodes = this.nodes()
			const cull = frustum && this.cull() ? frustum : null
			const near = this.near()
			const far = this.far()
			const ranged = eye && ( near > 0 || far < Infinity ) ? eye : null
			this.grow( nodes.length )
			const trans = this.trans
			const tint = this.tint
			const layer = this.layer
			const uv = this.uv
			const material = this.material
			const normal_layer = this.normal_layer
			let count = 0
			for( let i = 0; i < nodes.length; ++ i ) {
				const node = nodes[ i ]
				if( !node.shown() ) continue
				const world = node.world()
				if( ranged ) {
					const dx = world[ 12 ] - ranged[ 0 ]
					const dy = world[ 13 ] - ranged[ 1 ]
					const dz = world[ 14 ] - ranged[ 2 ]
					const dist = Math.sqrt( dx * dx + dy * dy + dz * dz )
					if( dist < near || dist >= far ) continue
				}
				if( cull && typeof node.radius === 'function' ) {
					const radius = node.radius() * $bog_gamengine_batch_scale_max( world )
					if( !$bog_gamengine_cam_frustum_sphere( cull, world[ 12 ], world[ 13 ], world[ 14 ], radius ) ) continue
				}
				trans.set( world, count * 16 )
				if( typeof node.tint === 'function' ) {
					tint.set( node.tint(), count * 4 )
				} else {
					tint[ count * 4 ] = 1
					tint[ count * 4 + 1 ] = 1
					tint[ count * 4 + 2 ] = 1
					tint[ count * 4 + 3 ] = 1
				}
				layer[ count ] = typeof node.layer === 'function' ? node.layer() : 0
				if( typeof node.uv === 'function' ) {
					uv.set( node.uv(), count * 4 )
				} else {
					uv[ count * 4 ] = 0
					uv[ count * 4 + 1 ] = 0
					uv[ count * 4 + 2 ] = 1
					uv[ count * 4 + 3 ] = 1
				}
				if( typeof node.material === 'function' ) {
					material.set( node.material(), count * 4 )
				} else {
					material[ count * 4 ] = 0
					material[ count * 4 + 1 ] = 0.6
					material[ count * 4 + 2 ] = 0
					material[ count * 4 + 3 ] = 0
				}
				normal_layer[ count ] = typeof node.normal_layer === 'function' ? node.normal_layer() : -1
				++ count
			}
			this.count = count
			++ this.version
			return count
		}

		fill_source( source: $bog_gamengine_batch_source, frustum: Float32Array | null = null ) {
			const skip = this.skip()
			const total = Math.max( 0, source.count - skip )
			const cap = this.cap
			this.grow( total )
			if( this.cap !== cap ) {
				this.tint.fill( 1 )
				this.layer.fill( 0 )
				this.normal_layer.fill( -1 )
				const uv = this.uv
				const material = this.material
				for( let i = 0; i < this.cap; ++ i ) {
					uv[ i * 4 ] = 0
					uv[ i * 4 + 1 ] = 0
					uv[ i * 4 + 2 ] = 1
					uv[ i * 4 + 3 ] = 1
					material[ i * 4 ] = 0
					material[ i * 4 + 1 ] = 0.6
					material[ i * 4 + 2 ] = 0
					material[ i * 4 + 3 ] = 0
				}
			}
			const aabb = source.aabb
			const cull = frustum && aabb && this.cull() ? frustum : null
			const tint = source.tint ?? null
			const layer = source.layer ?? null
			const uv = source.uv ?? null
			let count = total
			if( cull && aabb ) {
				const trans = this.trans
				const from = source.trans
				count = 0
				for( let i = skip; i < source.count; ++ i ) {
					if( !$bog_gamengine_cam_frustum_aabb( cull, aabb, i * 6 ) ) continue
					const src = i * 16
					const dst = count * 16
					for( let k = 0; k < 16; ++ k ) trans[ dst + k ] = from[ src + k ]
					if( tint ) for( let k = 0; k < 4; ++ k ) this.tint[ count * 4 + k ] = tint[ i * 4 + k ]
					if( layer ) this.layer[ count ] = layer[ i ]
					if( uv ) for( let k = 0; k < 4; ++ k ) this.uv[ count * 4 + k ] = uv[ i * 4 + k ]
					++ count
				}
			} else {
				this.trans.set( source.trans.subarray( skip * 16, ( skip + total ) * 16 ) )
				if( tint ) this.tint.set( tint.subarray( skip * 4, ( skip + total ) * 4 ) )
				if( layer ) this.layer.set( layer.subarray( skip, skip + total ) )
				if( uv ) this.uv.set( uv.subarray( skip * 4, ( skip + total ) * 4 ) )
			}
			this.count = count
			++ this.version
			return count
		}

	}

}
