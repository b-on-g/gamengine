namespace $ {

	export type $bog_gamengine_batch_node = $bog_gamengine_node & { tint?(): Float32Array }

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
		nodes( next?: readonly $bog_gamengine_batch_node[] ) {
			return next ?? []
		}

		cap = 0
		count = 0
		version = 0
		trans = new Float32Array( 0 )
		tint = new Float32Array( 0 )

		grow( need: number ) {
			if( need <= this.cap ) return
			let cap = Math.max( this.cap, 16 )
			while( cap < need ) cap *= 2
			this.cap = cap
			this.trans = new Float32Array( cap * 16 )
			this.tint = new Float32Array( cap * 4 )
		}

		fill() {
			const nodes = this.nodes()
			const count = nodes.length
			this.grow( count )
			const trans = this.trans
			const tint = this.tint
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
			}
			this.count = count
			++ this.version
			return count
		}

	}

}
