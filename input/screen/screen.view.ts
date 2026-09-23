namespace $.$$ {

	export class $bog_gamengine_input_screen extends $.$bog_gamengine_input_screen {

		stick = new Float32Array( 2 )
		held = new Map< string, boolean >()
		stick_pointer = -1

		bind(): Record< string, readonly string[] > {
			return { left: [ 'x-' ], right: [ 'x+' ], up: [ 'y+' ], down: [ 'y-' ] }
		}

		@ $mol_mem
		coarse() {
			return this.$.$mol_media.match( '(pointer: coarse)' )
		}

		visible() {
			return this.shown() || this.coarse()
		}

		sub() {
			return this.visible() ? super.sub() : []
		}

		buttons() {
			return this.actions().map( name => this.Button( name ) )
		}

		button_title( name: string ) {
			return this.titles()[ name ] ?? name
		}

		value( name: string ) {
			const stick = this.stick
			if( name === 'x-' ) return stick[ 0 ] < 0 ? - stick[ 0 ] : 0
			if( name === 'x+' ) return stick[ 0 ] > 0 ? stick[ 0 ] : 0
			if( name === 'y-' ) return stick[ 1 ] < 0 ? - stick[ 1 ] : 0
			if( name === 'y+' ) return stick[ 1 ] > 0 ? stick[ 1 ] : 0
			return this.held.get( name ) ? 1 : 0
		}

		strength( name: string ) {
			let max = this.held.get( name ) ? 1 : 0
			const names = this.bind()[ name ]
			if( !names ) return max
			for( let i = 0; i < names.length; ++ i ) {
				const value = this.value( names[ i ] )
				if( value > max ) max = value
			}
			return max
		}

		action( name: string ) {
			return this.strength( name ) > 0
		}

		axis( neg: string, pos: string ) {
			return this.strength( pos ) - this.strength( neg )
		}

		move( dx: number, dy: number ) {
			const radius = this.radius()
			let x = dx / radius
			let y = - dy / radius
			const len = Math.hypot( x, y )
			if( len > 1 ) {
				x /= len
				y /= len
			}
			this.knob_shift( `translate(${ ( x * radius ).toFixed( 1 ) }px, ${ ( - y * radius ).toFixed( 1 ) }px)` )
			if( len < this.dead() ) {
				x = 0
				y = 0
			}
			this.stick[ 0 ] = x
			this.stick[ 1 ] = y
		}

		press( name: string ) {
			this.held.set( name, true )
		}

		release( name: string ) {
			this.held.set( name, false )
		}

		stick_track( event: PointerEvent ) {
			const box = ( event.currentTarget as Element ).getBoundingClientRect()
			this.move( event.clientX - box.left - box.width / 2, event.clientY - box.top - box.height / 2 )
		}

		stick_down( event?: PointerEvent | null ) {
			if( !event ) return null
			this.stick_pointer = event.pointerId
			this.stick_track( event )
			return event
		}

		stick_move( event?: PointerEvent | null ) {
			if( !event || event.pointerId !== this.stick_pointer ) return null
			this.stick_track( event )
			return event
		}

		stick_up( event?: PointerEvent | null ) {
			if( !event || event.pointerId !== this.stick_pointer ) return null
			this.stick_pointer = -1
			this.move( 0, 0 )
			return event
		}

		stick_cancel( event?: PointerEvent | null ) {
			return this.stick_up( event )
		}

		stick_leave( event?: PointerEvent | null ) {
			return this.stick_up( event )
		}

		button_down( name: string, event?: PointerEvent | null ) {
			if( !event ) return null
			this.press( name )
			return event
		}

		button_up( name: string, event?: PointerEvent | null ) {
			if( !event ) return null
			this.release( name )
			return event
		}

		button_cancel( name: string, event?: PointerEvent | null ) {
			return this.button_up( name, event )
		}

		button_leave( name: string, event?: PointerEvent | null ) {
			return this.button_up( name, event )
		}

	}

}
