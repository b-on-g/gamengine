namespace $.$$ {

	const face = {
		glob: {
			proj: 'mat4',
		},
		input: {
			vertex: 'vec2',
			inst_trans: 'mat4',
		},
		pipe: {
			color: 'vec3',
		},
		output: {
			out_color: 'vec4',
		},
	} as const

	const vert = `
		void main() {
			gl_Position = proj * inst_trans * vec4( vertex, 0.0, 1.0 );
			color = vec3( 0.5 + 0.5 * vertex, float( gl_InstanceID % 7 ) / 7.0 );
		}
	`

	const frag = `
		void main() {
			out_color = vec4( color, 1.0 );
		}
	`

	export class $bog_gamengine_spike_s2_pane extends $.$bog_gamengine_spike_s2_pane {

		times = new Float32Array( this.window() )
		gaps = new Float32Array( this.window() )
		tick = 0
		last = 0

		@ $mol_mem
		program() {
			const gl = this.context().native
			const program = this.context().program(
				face,
				$mol_3d_glsl_both + $mol_3d_glsl_vert + vert,
				$mol_3d_glsl_both + $mol_3d_glsl_frag + frag,
			)
			gl.disable( gl.DEPTH_TEST )
			gl.clearColor( 0.1, 0.1, 0.12, 1 )
			return program
		}

		@ $mol_mem
		geometry() {
			const program = this.program()
			const geometry = program.geometry( 'quad' )
			const vertexes = new Float32Array([ -1, -1, 1, -1, -1, 1, 1, 1 ])
			geometry.use( ()=> {
				program.param( 'vertex' )!.vector( 2 ).send([ vertexes ])
			} )
			return geometry
		}

		@ $mol_mem
		side() {
			return Math.ceil( Math.sqrt( this.count() ) )
		}

		@ $mol_mem
		base() {
			const count = this.count()
			const side = this.side()
			const base = new Float32Array( 2 * count )
			for( let i = 0; i < count; ++ i ) {
				base[ 2 * i ] = ( i % side ) - side / 2 + 0.5
				base[ 2 * i + 1 ] = Math.floor( i / side ) - side / 2 + 0.5
			}
			return base
		}

		@ $mol_mem
		trans() {
			const count = this.count()
			const trans = new Float32Array( 16 * count )
			for( let i = 0; i < count; ++ i ) {
				trans[ 16 * i ] = 1
				trans[ 16 * i + 5 ] = 1
				trans[ 16 * i + 10 ] = 1
				trans[ 16 * i + 15 ] = 1
			}
			this.tick = 0
			this.last = 0
			return trans
		}

		@ $mol_mem
		inst_buffer() {
			const trans = this.trans()
			const program = this.program()
			const gl = this.context().native
			let buffer!: $mol_3d_buffer
			this.geometry().use( ()=> {
				buffer = program.param( 'inst_trans' )!.matrices([ 4, 4 ])
				gl.bufferData( gl.ARRAY_BUFFER, trans.byteLength, gl.DYNAMIC_DRAW )
			} )
			return buffer
		}

		@ $mol_mem
		proj() {
			const half = this.side() / 2 + 1
			let aspect = this.width() / this.height()
			if( !Number.isFinite( aspect ) ) aspect = 1
			return $mol_3d_mat4.orthographic( - half * aspect, half * aspect, - half, half, -1, 1 )
		}

		fill() {
			return this.trans()
		}

		paint() {
			const start = performance.now()
			const trans = this.fill()
			const count = this.count()
			const program = this.program()
			const gl = this.context().native
			gl.clear( gl.COLOR_BUFFER_BIT )
			gl.useProgram( program.native )
			program.glob( 'proj' ).matrix( this.proj() )
			gl.bindVertexArray( this.geometry().vertexes )
			gl.bindBuffer( gl.ARRAY_BUFFER, this.inst_buffer().native )
			gl.bufferSubData( gl.ARRAY_BUFFER, 0, trans )
			program.strips( 0, 4, count )
			gl.bindVertexArray( null )
			gl.useProgram( null )
			this.measure( start, performance.now() )
		}

		measure( start: number, end: number ) {
			const i = this.tick % this.window()
			this.times[ i ] = end - start
			this.gaps[ i ] = this.last ? start - this.last : 0
			this.last = start
			this.tick ++
		}

		stat_line() {
			const size = Math.min( this.tick, this.window() )
			if( size < 2 ) return 'no frames yet'
			let js = 0
			let gap = 0
			for( let i = 0; i < size; ++ i ) {
				js += this.times[ i ]
				gap += this.gaps[ i ]
			}
			return `js ${ ( js / size ).toFixed( 2 ) } ms, frame ${ ( gap / ( size - 1 ) ).toFixed( 2 ) } ms, instances ${ this.count() }`
		}

	}

}
