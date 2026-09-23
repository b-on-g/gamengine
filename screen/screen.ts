namespace $ {

	/** Call fullscreen( true ) and lock( true ) from a click or key handler only, browsers refuse both outside a user gesture */
	export class $bog_gamengine_screen extends $mol_object2 {

		@ $mol_mem
		target( next?: Element | null ) {
			return next ?? null
		}

		dx = 0
		dy = 0
		listeners = null as null | $mol_dom_listener[]

		doc() {
			return this.$.$mol_dom_context.document
		}

		listen() {
			return this.listeners ??= [
				new this.$.$mol_dom_listener( this.doc(), 'fullscreenchange', ()=> {
					this.fullscreen( Boolean( this.doc().fullscreenElement ) )
				} ),
				new this.$.$mol_dom_listener( this.doc(), 'pointerlockchange', ()=> {
					this.lock( this.locked() )
				} ),
				new this.$.$mol_dom_listener( this.doc(), 'mousemove', ( event: MouseEvent )=> {
					if( !this.locked() ) return
					this.dx += event.movementX
					this.dy += event.movementY
				} ),
			]
		}

		@ $mol_mem
		fullscreen( next?: boolean ) {
			this.listen()
			if( next === undefined ) return Boolean( this.doc().fullscreenElement )
			new this.$.$mol_after_tick( ()=> this.fullscreen_apply( next ) )
			return next
		}

		fullscreen_apply( next: boolean ) {
			const doc = this.doc()
			if( next === Boolean( doc.fullscreenElement ) ) return
			if( next ) doc.documentElement.requestFullscreen().catch( ()=> this.fullscreen( false ) )
			else doc.exitFullscreen().catch( ()=> this.fullscreen( true ) )
		}

		locked() {
			const target = this.target()
			return target !== null && this.doc().pointerLockElement === target
		}

		@ $mol_mem
		lock( next?: boolean ) {
			this.listen()
			if( next === undefined ) return this.locked()
			new this.$.$mol_after_tick( ()=> this.lock_apply( next ) )
			return next
		}

		lock_apply( next: boolean ) {
			if( next === this.locked() ) return
			if( next ) this.target()?.requestPointerLock().catch( ()=> this.lock( false ) )
			else this.doc().exitPointerLock()
		}

		take( out: Float32Array ) {
			this.listen()
			out[ 0 ] = this.dx
			out[ 1 ] = this.dy
			this.dx = 0
			this.dy = 0
			return out
		}

		destructor() {
			for( const listener of this.listeners ?? [] ) listener.destructor()
			this.listeners = null
		}

	}

}
