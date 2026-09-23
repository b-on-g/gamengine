namespace $ {

	export class $bog_gamengine_spike_net_self extends $bog_gamengine_demo_flat_hero {

		@ $mol_mem
		pawn( next?: $bog_gamengine_spike_net_hero | null ) {
			return next ?? null
		}

		@ $mol_mem
		gap( next = 50 ) {
			return next
		}

		pushed = new Float32Array( 2 )
		pushed_at = 0
		pushes = 0

		step( dt: number ) {
			super.step( dt )
			const pawn = this.pawn()
			if( !pawn ) return
			const pos = this.pos()
			if( pos[ 0 ] === this.pushed[ 0 ] && pos[ 1 ] === this.pushed[ 1 ] ) return
			const now = Date.now()
			if( now - this.pushed_at < this.gap() ) return
			this.pushed_at = now
			this.pushed[ 0 ] = pos[ 0 ]
			this.pushed[ 1 ] = pos[ 1 ]
			const x = pos[ 0 ]
			const y = pos[ 1 ]
			new this.$.$mol_after_tick( ()=> $mol_wire_async( this ).push( pawn, x, y ) )
		}

		push( pawn: $bog_gamengine_spike_net_hero, x: number, y: number ) {
			pawn.X( 'auto' )!.val( x )
			pawn.Y( 'auto' )!.val( y )
			++ this.pushes
		}

	}

}
