namespace $ {

	export type $bog_gamengine_batch_node = $bog_gamengine_node & {
		tint?(): Float32Array
		layer?(): number
		uv?(): Float32Array
		material?(): Float32Array
		normal_layer?(): number
	}

	export type $bog_gamengine_batch_source = {
		trans: Float32Array
		count: number
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

		fill() {
			const source = this.source()
			if( source ) return this.fill_source( source )
			const nodes = this.nodes()
			const count = nodes.length
			this.grow( count )
			const trans = this.trans
			const tint = this.tint
			const layer = this.layer
			const uv = this.uv
			const material = this.material
			const normal_layer = this.normal_layer
			for( let i = 0; i < count; ++ i ) {
				const node = nodes[ i ]
				trans.set( node.world(), i * 16 )
				if( typeof node.tint === 'function' ) {
					tint.set( node.tint(), i * 4 )
				} else {
					tint[ i * 4 ] = 1
					tint[ i * 4 + 1 ] = 1
					tint[ i * 4 + 2 ] = 1
					tint[ i * 4 + 3 ] = 1
				}
				layer[ i ] = typeof node.layer === 'function' ? node.layer() : 0
				if( typeof node.uv === 'function' ) {
					uv.set( node.uv(), i * 4 )
				} else {
					uv[ i * 4 ] = 0
					uv[ i * 4 + 1 ] = 0
					uv[ i * 4 + 2 ] = 1
					uv[ i * 4 + 3 ] = 1
				}
				if( typeof node.material === 'function' ) {
					material.set( node.material(), i * 4 )
				} else {
					material[ i * 4 ] = 0
					material[ i * 4 + 1 ] = 0.6
					material[ i * 4 + 2 ] = 0
					material[ i * 4 + 3 ] = 0
				}
				normal_layer[ i ] = typeof node.normal_layer === 'function' ? node.normal_layer() : -1
			}
			this.count = count
			++ this.version
			return count
		}

		fill_source( source: $bog_gamengine_batch_source ) {
			const skip = this.skip()
			const count = Math.max( 0, source.count - skip )
			const cap = this.cap
			this.grow( count )
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
			this.trans.set( source.trans.subarray( skip * 16, ( skip + count ) * 16 ) )
			this.count = count
			++ this.version
			return count
		}

	}

}
