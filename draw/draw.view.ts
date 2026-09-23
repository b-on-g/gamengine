namespace $.$$ {

	type $bog_gamengine_draw_face = {
		glob: { proj: 'mat4', view: 'mat4', atlas: 'sampler2DArray', light_dir: 'vec3', ambient: 'float', wireframe: 'float' }
		input: { vertex: 'vec3', uv: 'vec2', normal: 'vec3', inst_trans: 'mat4', inst_tint: 'vec4', inst_layer: 'float', inst_uv: 'vec4' }
	}

	type $bog_gamengine_draw_slot = {
		batch: $bog_gamengine_batch
		program: $bog_gamengine_gl_program< $bog_gamengine_draw_face >
		proj: WebGLUniformLocation | null
		view: WebGLUniformLocation | null
		light_dir: WebGLUniformLocation | null
		ambient: WebGLUniformLocation | null
		wireframe: WebGLUniformLocation | null
		depth: boolean
		vao: WebGLVertexArrayObject
		trans: $bog_gamengine_gl_buffer
		tint: $bog_gamengine_gl_buffer
		layer: $bog_gamengine_gl_buffer | null
		uv: $bog_gamengine_gl_buffer | null
		atlas: $bog_gamengine_atlas | null
		sampler: WebGLUniformLocation | null
		tex: $bog_gamengine_draw_tex | null
		prim: GLenum
		wire: GLenum | null
		size: number
		cap: number
	}

	type $bog_gamengine_draw_tex = {
		native: WebGLTexture | null
	}

	const stat_window = 30

	export class $bog_gamengine_draw extends $.$bog_gamengine_draw {

		slots_all = new WeakMap< $bog_gamengine_batch, $bog_gamengine_draw_slot >()
		textures_all = new WeakMap< $bog_gamengine_atlas, $bog_gamengine_draw_tex >()
		ambient_vec = new Float32Array( 1 )
		wire_off = new Float32Array( 1 )
		wire_on = new Float32Array([ 1 ])
		gaps = new Float32Array( stat_window )
		ticks = new Float32Array( stat_window )
		samples = 0
		paint_at = 0

		@ $mol_mem
		context() {
			const canvas = this.dom_node() as HTMLCanvasElement
			return canvas.getContext( 'webgl2', { preserveDrawingBuffer: true } )!
		}

		@ $mol_mem
		width() {
			return Math.ceil( ( this.view_rect()?.width ?? 0 ) * this.$.$mol_dom_context.devicePixelRatio )
		}

		@ $mol_mem
		height() {
			return Math.ceil( ( this.view_rect()?.height ?? 0 ) * this.$.$mol_dom_context.devicePixelRatio )
		}

		@ $mol_mem
		viewport() {
			const viewport = [ 0, 0, this.width(), this.height() ] as const
			this.context().viewport( ... viewport )
			return viewport
		}

		@ $mol_mem
		scissor() {
			const scissor = this.viewport()
			const gl = this.context()
			gl.enable( gl.SCISSOR_TEST )
			gl.scissor( ... scissor )
			return scissor
		}

		render() {
			super.render()
			this.viewport()
			this.scissor()
			this.paint()
		}

		@ $mol_mem
		light_dir( next?: Float32Array ) {
			return next ?? new Float32Array([ 0.4, 1, 0.6 ])
		}

		@ $mol_mem
		proj() {
			const aspect = this.width() / this.height()
			return this.cam().proj( Number.isFinite( aspect ) && aspect > 0 ? aspect : 1 )
		}

		@ $mol_mem
		slots() {
			const batches = this.scene().batches()
			const slots = [] as $bog_gamengine_draw_slot[]
			for( let i = 0; i < batches.length; ++ i ) {
				const slot = this.slot( batches[ i ] )
				if( slot ) slots.push( slot )
			}
			return slots as readonly $bog_gamengine_draw_slot[]
		}

		slot( batch: $bog_gamengine_batch ) {

			const found = this.slots_all.get( batch )
			if( found ) return found

			const gl = this.context()
			const shader = batch.shader()
			const program = shader.program( gl ) as $bog_gamengine_gl_program< $bog_gamengine_draw_face >
			const globs = shader.face().glob ?? {}
			const shape = batch.shape()
			if( !this.shape_ready( shape ) ) return null
			const atlas = batch.atlas()
			const cap = Math.max( batch.cap, 16 )
			const mode = shape.mode()
			const depth = shader.depth()
			const wireframe = 'wireframe' in globs ? program.uniform( 'wireframe' ) : null

			const slot: $bog_gamengine_draw_slot = {
				batch,
				program,
				proj: program.uniform( 'proj' ),
				view: program.uniform( 'view' ),
				light_dir: 'light_dir' in globs ? program.uniform( 'light_dir' ) : null,
				ambient: 'ambient' in globs ? program.uniform( 'ambient' ) : null,
				wireframe,
				depth,
				vao: gl.createVertexArray()!,
				trans: null!,
				tint: null!,
				layer: null,
				uv: null,
				atlas,
				sampler: atlas ? program.uniform( 'atlas' ) : null,
				tex: atlas ? this.tex( atlas ) : null,
				prim: mode === 'lines' ? gl.LINES : mode === 'triangles' ? gl.TRIANGLES : gl.TRIANGLE_STRIP,
				wire: depth && wireframe && mode !== 'lines' ? ( mode === 'triangles' ? gl.LINES : gl.LINE_STRIP ) : null,
				size: shape.size(),
				cap,
			}

			gl.bindVertexArray( slot.vao )
			new $bog_gamengine_gl_buffer( gl, program.attribute( 'vertex' )!, 3, 0 ).send( shape.geometry() )
			const uv = program.attribute( 'uv' )
			if( uv !== null ) new $bog_gamengine_gl_buffer( gl, uv, 2, 0 ).send( shape.skin() )
			const normal = program.attribute( 'normal' )
			if( normal !== null ) new $bog_gamengine_gl_buffer( gl, normal, 3, 0 ).send( shape.normals() )
			slot.trans = new $bog_gamengine_gl_buffer( gl, program.attribute( 'inst_trans' )!, 16, 1 )
			slot.trans.reserve( cap * 64 )
			slot.tint = new $bog_gamengine_gl_buffer( gl, program.attribute( 'inst_tint' )!, 4, 1 )
			slot.tint.reserve( cap * 16 )
			const layer = program.attribute( 'inst_layer' )
			if( layer !== null ) {
				slot.layer = new $bog_gamengine_gl_buffer( gl, layer, 1, 1 )
				slot.layer.reserve( cap * 4 )
			}
			const inst_uv = program.attribute( 'inst_uv' )
			if( inst_uv !== null ) {
				slot.uv = new $bog_gamengine_gl_buffer( gl, inst_uv, 4, 1 )
				slot.uv.reserve( cap * 16 )
			}
			gl.bindVertexArray( null )

			this.slots_all.set( batch, slot )
			return slot
		}

		shape_ready( shape: $bog_gamengine_shape ) {
			try {
				shape.geometry()
				return true
			} catch( error ) {
				if( $mol_promise_like( error ) ) return false
				return $mol_fail_hidden( error )
			}
		}

		tex( atlas: $bog_gamengine_atlas ) {
			const found = this.textures_all.get( atlas )
			if( found ) return found
			const tex: $bog_gamengine_draw_tex = { native: null }
			this.textures_all.set( atlas, tex )
			return tex
		}

		@ $mol_mem
		textures() {
			const gl = this.context()
			const slots = this.slots()
			let sent = 0
			for( let i = 0; i < slots.length; ++ i ) {
				const slot = slots[ i ]
				if( !slot.atlas || slot.tex!.native ) continue
				if( !slot.atlas.ready() ) continue
				slot.tex!.native = $bog_gamengine_gl_texture_array( gl, slot.atlas.images(), slot.atlas.size() )
				++ sent
			}
			return sent
		}

		paint() {
			this.scene().step()
			const gl = this.context()
			const slots = this.slots()
			this.textures()
			const proj = this.proj()
			const view = this.cam().view()
			const light_dir = this.light_dir()
			const wireframe = this.wireframe()
			this.ambient_vec[ 0 ] = this.ambient()
			gl.enable( gl.BLEND )
			gl.blendFunc( gl.ONE, gl.ONE_MINUS_SRC_ALPHA )
			gl.clearColor( 0.08, 0.08, 0.1, 1 )
			gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT )
			for( let i = 0; i < slots.length; ++ i ) this.paint_slot( gl, slots[ i ], proj, view, light_dir, wireframe )
			gl.bindVertexArray( null )
			gl.useProgram( null )
			this.measure()
		}

		paint_slot( gl: WebGL2RenderingContext, slot: $bog_gamengine_draw_slot, proj: Float32Array, view: Float32Array, light_dir: Float32Array, wireframe: boolean ) {
			const batch = slot.batch
			const count = batch.count
			if( !count ) return
			if( slot.tex && !slot.tex.native ) return
			const grown = batch.cap > slot.cap
			if( slot.depth ) {
				gl.enable( gl.DEPTH_TEST )
				gl.enable( gl.CULL_FACE )
				gl.cullFace( gl.BACK )
			} else {
				gl.disable( gl.DEPTH_TEST )
				gl.disable( gl.CULL_FACE )
			}
			gl.useProgram( slot.program.native )
			$bog_gamengine_gl_uniform_matrix( gl, slot.proj, proj )
			$bog_gamengine_gl_uniform_matrix( gl, slot.view, view )
			$bog_gamengine_gl_uniform_vector( gl, slot.light_dir, light_dir )
			$bog_gamengine_gl_uniform_vector( gl, slot.ambient, this.ambient_vec )
			$bog_gamengine_gl_uniform_vector( gl, slot.wireframe, this.wire_off )
			if( slot.tex ) {
				gl.activeTexture( gl.TEXTURE0 )
				gl.bindTexture( gl.TEXTURE_2D_ARRAY, slot.tex.native )
				$bog_gamengine_gl_uniform_int( gl, slot.sampler, 0 )
			}
			gl.bindVertexArray( slot.vao )
			gl.bindBuffer( gl.ARRAY_BUFFER, slot.trans.native )
			if( grown ) gl.bufferData( gl.ARRAY_BUFFER, batch.cap * 64, gl.DYNAMIC_DRAW )
			gl.bufferSubData( gl.ARRAY_BUFFER, 0, batch.trans, 0, count * 16 )
			gl.bindBuffer( gl.ARRAY_BUFFER, slot.tint.native )
			if( grown ) gl.bufferData( gl.ARRAY_BUFFER, batch.cap * 16, gl.DYNAMIC_DRAW )
			gl.bufferSubData( gl.ARRAY_BUFFER, 0, batch.tint, 0, count * 4 )
			if( slot.layer ) {
				gl.bindBuffer( gl.ARRAY_BUFFER, slot.layer.native )
				if( grown ) gl.bufferData( gl.ARRAY_BUFFER, batch.cap * 4, gl.DYNAMIC_DRAW )
				gl.bufferSubData( gl.ARRAY_BUFFER, 0, batch.layer, 0, count )
			}
			if( slot.uv ) {
				gl.bindBuffer( gl.ARRAY_BUFFER, slot.uv.native )
				if( grown ) gl.bufferData( gl.ARRAY_BUFFER, batch.cap * 16, gl.DYNAMIC_DRAW )
				gl.bufferSubData( gl.ARRAY_BUFFER, 0, batch.uv, 0, count * 4 )
			}
			if( grown ) slot.cap = batch.cap
			gl.drawArraysInstanced( slot.prim, 0, slot.size, count )
			if( !wireframe || slot.wire === null ) return
			$bog_gamengine_gl_uniform_vector( gl, slot.wireframe, this.wire_on )
			gl.drawArraysInstanced( slot.wire, 0, slot.size, count )
		}

		measure() {
			const now = performance.now()
			const i = this.samples % stat_window
			this.ticks[ i ] = now - this.scene().clock().tick_at
			this.gaps[ i ] = this.paint_at ? now - this.paint_at : 0
			this.paint_at = now
			++ this.samples
		}

		@ $mol_mem
		stat() {
			const frame = this.scene().clock().frame()
			const size = Math.min( this.samples, stat_window )
			let gap = 0
			let tick = 0
			for( let i = 0; i < size; ++ i ) {
				gap += this.gaps[ i ]
				tick += this.ticks[ i ]
			}
			const div = size || 1
			return `frame ${ frame } | ${ ( gap / div ).toFixed( 1 ) } ms | tick ${ ( tick / div ).toFixed( 1 ) } ms`
		}

	}

}
