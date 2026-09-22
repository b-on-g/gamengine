namespace $.$$ {

	export class $bog_gamengine_spike_s3_quad_pane extends $.$bog_gamengine_spike_s3_quad_pane {

		@ $mol_mem
		context() {
			const canvas = this.dom_node() as HTMLCanvasElement
			const native = canvas.getContext( 'webgl2', { preserveDrawingBuffer: true } )!
			return new $mol_3d_context( native )
		}

		@ $mol_mem
		program() {

			const face = {
				input: { vertex: 'vec2' },
				output: { color: 'vec4' },
			} as const

			const vert = `void main() { gl_Position = vec4( vertex, 0.0, 1.0 ); }`
			const frag = `void main() { color = vec4( 1.0, 0.0, 0.0, 1.0 ); }`

			return this.context().program(
				face,
				$mol_3d_glsl_both + $mol_3d_glsl_vert + vert,
				$mol_3d_glsl_both + $mol_3d_glsl_frag + frag,
			)
		}

		@ $mol_mem
		geometry() {
			const program = this.program()
			return program.geometry( 'quad' ).use( ()=> {
				program.param( 'vertex' )!.vector( 2 ).send([
					new Float32Array([ -1, -1, 1, -1, -1, 1, 1, 1 ]),
				])
			} )
		}

		paint() {
			const gl = this.context().native
			gl.clearColor( 0, 0, 0, 1 )
			gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT )
			this.program().use( program => {
				this.geometry().use( ()=> program.strip( 4 ) )
			} )
		}

	}

}
