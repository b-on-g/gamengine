namespace $.$$ {

	export class $bog_gamengine_spike_s1_pane extends $.$bog_gamengine_spike_s1_pane {

		quad() {
			return new Float32Array([ -0.4, -0.4, 0.4, -0.4, -0.4, 0.4, 0.4, 0.4 ])
		}

		hues() {
			return new Float32Array([ 0.2, 0.6, 1, 0.2, 1, 0.6, 1, 1, 0.2, 0.6, 0.2, 1 ])
		}

		@ $mol_mem
		left() {
			return this.bad()
				? $bog_gamengine_spike_s1_bad_a.program( this.context() )
				: $bog_gamengine_spike_s1_good.left( this.context() )
		}

		@ $mol_mem
		right() {
			return this.bad()
				? $bog_gamengine_spike_s1_bad_b.program( this.context() )
				: $bog_gamengine_spike_s1_good.right( this.context() )
		}

		@ $mol_mem
		left_geometry() {
			const program = this.left()
			return program.geometry( 'quad' ).use( ()=> {
				program.param( 'vertex' )!.vector( 2 ).send([ this.quad() ])
			} )
		}

		@ $mol_mem
		right_geometry() {
			const program = this.right()
			return program.geometry( 'quad' ).use( ()=> {
				program.param( 'vertex' )!.vector( 2 ).send([ this.quad() ])
				program.param( 'hue' )!.vector( 3 ).send([ this.hues() ])
			} )
		}

		paint() {

			const gl = this.context().native
			gl.clearColor( 0.1, 0.1, 0.12, 1 )
			gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT )

			this.left().use( program => {
				program.glob( 'shift' ).vector_float([ -0.5, 0 ])
				program.glob( 'tint' ).vector_float([ 1, 0.4, 0.2, 1 ])
				this.left_geometry().use( ()=> program.strip( 4 ) )
			} )

			this.right().use( program => {
				program.glob( 'shift' ).vector_float([ 0.5, 0 ])
				program.glob( 'scale' ).vector_float([ 1 ])
				this.right_geometry().use( ()=> program.strip( 4 ) )
			} )

		}

	}

}
