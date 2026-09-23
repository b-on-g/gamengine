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
		batches( next?: readonly $bog_gamengine_batch[] ) {
			return next ?? []
		}

		@ $mol_mem
		phys( next?: $bog_gamengine_phys | null ) {
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
			if( frame !== this.frame_done ) {
				this.frame_done = frame
				this.input()?.poll()
				const dt = this.clock().dt()
				const nodes = this.nodes()
				for( let i = 0; i < nodes.length; ++i ) nodes[ i ].step( dt )
				this.phys()?.step( dt )
			}
			const batches = this.batches()
			for( let i = 0; i < batches.length; ++i ) batches[ i ].fill()
			return frame
		}

	}

}
