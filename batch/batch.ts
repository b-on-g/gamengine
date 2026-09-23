namespace $ {

	export type $bog_gamengine_batch_node = $bog_gamengine_node & {
		tint?(): Float32Array
		layer?(): number
		uv?(): Float32Array
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

		cap = 0
		count = 0
		version = 0
		trans = new Float32Array( 0 )
		tint = new Float32Array( 0 )
		layer = new Float32Array( 0 )
		uv = new Float32Array( 0 )

		grow( need: number ) {
			if( need <= this.cap ) return
			let cap = Math.max( this.cap, 16 )
			while( cap < need ) cap *= 2
			this.cap = cap
			this.trans = new Float32Array( cap * 16 )
			this.tint = new Float32Array( cap * 4 )
			this.layer = new Float32Array( cap )
			this.uv = new Float32Array( cap * 4 )
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
			}
			this.count = count
			++ this.version
			return count
		}

		fill_source( source: $bog_gamengine_batch_source ) {
			const count = source.count
			const cap = this.cap
			this.grow( count )
			if( this.cap !== cap ) {
				this.tint.fill( 1 )
				this.layer.fill( 0 )
				const uv = this.uv
				for( let i = 0; i < this.cap; ++ i ) {
					uv[ i * 4 ] = 0
					uv[ i * 4 + 1 ] = 0
					uv[ i * 4 + 2 ] = 1
					uv[ i * 4 + 3 ] = 1
				}
			}
			this.trans.set( source.trans.subarray( 0, count * 16 ) )
			this.count = count
			++ this.version
			return count
		}

	}

}
