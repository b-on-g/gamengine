namespace $ {

	export class $bog_gamengine_scene extends $bog_gamengine_node {

		@ $mol_mem
		clock( next?: $bog_gamengine_clock ) {
			return next ?? new $bog_gamengine_clock
		}

		@ $mol_mem
		nodes() {
			const list = [] as $bog_gamengine_node[]
			const walk = ( node: $bog_gamengine_node )=> {
				const kids = node.kids()
				for( let i = 0; i < kids.length; ++i ) {
					list.push( kids[ i ] )
					walk( kids[ i ] )
				}
			}
			walk( this )
			return list as readonly $bog_gamengine_node[]
		}

		@ $mol_mem
		lights() {
			const nodes = this.nodes()
			const lights = [] as $bog_gamengine_light[]
			for( let i = 0; i < nodes.length && lights.length < 8; ++i ) {
				const node = nodes[ i ]
				if( node instanceof $bog_gamengine_light ) lights.push( node )
			}
			return lights as readonly $bog_gamengine_light[]
		}

		@ $mol_mem
		batches( next?: readonly $bog_gamengine_batch[] ) {
			return next ?? []
		}

		@ $mol_mem
		phys( next?: $bog_gamengine_phys | null ) {
			return next ?? null
		}

		@ $mol_mem
		phys3( next?: $bog_gamengine_phys3 | null ) {
			return next ?? null
		}

		@ $mol_mem
		input( next?: $bog_gamengine_input | null ) {
			return next ?? null
		}

		frame_done = -1

		@ $mol_mem
		step() {
			const frame = this.clock().frame()
			const dt = this.clock().dt()
			const input = this.input()
			const nodes = this.nodes()
			const phys = this.phys()
			const phys3 = this.phys3()
			if( frame !== this.frame_done ) {
				this.frame_done = frame
				input?.poll()
				for( let i = 0; i < nodes.length; ++i ) nodes[ i ].step( dt )
				phys?.step( dt )
				phys3?.step( dt )
			}
			const batches = this.batches()
			for( let i = 0; i < batches.length; ++i ) batches[ i ].fill()
			return frame
		}

	}

}
