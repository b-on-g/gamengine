namespace $.$$ {

	type $bog_gamengine_draw_face = {
		glob: { proj: 'mat4', view: 'mat4', atlas: 'sampler2DArray', light_dir: 'vec3', ambient: 'float' }
		input: { vertex: 'vec3', uv: 'vec2', normal: 'vec3', inst_trans: 'mat4', inst_tint: 'vec4', inst_layer: 'float', inst_uv: 'vec4' }
	}

	type $bog_gamengine_draw_slot = {
		batch: $bog_gamengine_batch
		program: $mol_3d_program< $bog_gamengine_draw_face >
		proj: $mol_3d_glob
		view: $mol_3d_glob
		light_dir: $mol_3d_glob | null
		ambient: $mol_3d_glob | null
		depth: boolean
		geometry: $mol_3d_geometry
		trans: $mol_3d_buffer
		tint: $mol_3d_buffer
		layer: $mol_3d_buffer | null
		uv: $mol_3d_buffer | null
		atlas: $bog_gamengine_atlas | null
		sampler: $mol_3d_glob | null
		tex: $bog_gamengine_draw_tex | null
		size: number
		cap: number
	}

	type $bog_gamengine_draw_tex = {
		texture: $mol_3d_texture
		sent: boolean
	}

	const stat_window = 30

	export class $bog_gamengine_draw extends $.$bog_gamengine_draw {

		slots_all = new WeakMap< $bog_gamengine_batch, $bog_gamengine_draw_slot >()
		textures_all = new WeakMap< $bog_gamengine_atlas, $bog_gamengine_draw_tex >()
		unit = new Int32Array([ 0 ])
		ambient_vec = new Float32Array( 1 )
		gaps = new Float32Array( stat_window )
		ticks = new Float32Array( stat_window )
		samples = 0
		paint_at = 0

		@ $mol_mem
		context() {
			const canvas = this.dom_node() as HTMLCanvasElement
			const native = canvas.getContext( 'webgl2', { preserveDrawingBuffer: true } )!
			return new $mol_3d_context( native )
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
			for( let i = 0; i < batches.length; ++ i ) slots.push( this.slot( batches[ i ] ) )
			return slots as readonly $bog_gamengine_draw_slot[]
		}

		slot( batch: $bog_gamengine_batch ) {

			const found = this.slots_all.get( batch )
			if( found ) return found

			const context = this.context()
			const gl = context.native
			const shader = batch.shader()
			const program = shader.program( context ) as $mol_3d_program< $bog_gamengine_draw_face >
			const globs = shader.face().glob ?? {}
			const shape = batch.shape()
			const atlas = batch.atlas()
			const cap = Math.max( batch.cap, 16 )

			const slot: $bog_gamengine_draw_slot = {
				batch,
				program,
				proj: program.glob( 'proj' ),
				view: program.glob( 'view' ),
				light_dir: 'light_dir' in globs ? program.glob( 'light_dir' ) : null,
				ambient: 'ambient' in globs ? program.glob( 'ambient' ) : null,
				depth: shader.depth(),
				geometry: new $mol_3d_geometry( gl ),
				trans: null!,
				tint: null!,
				layer: null,
				uv: null,
				atlas,
				sampler: atlas ? program.glob( 'atlas' ) : null,
				tex: atlas ? this.tex( atlas ) : null,
				size: shape.size(),
				cap,
			}

			slot.geometry.use( ()=> {
				program.param( 'vertex' )!.vector( 3 ).send([ shape.geometry() ])
				program.param( 'uv' )?.vector( 2 ).send([ shape.skin() ])
				program.param( 'normal' )?.vector( 3 ).send([ shape.normals() ])
				slot.trans = program.param( 'inst_trans' )!.matrices([ 4, 4 ])
				gl.bufferData( gl.ARRAY_BUFFER, cap * 64, gl.DYNAMIC_DRAW )
				slot.tint = program.param( 'inst_tint' )!.vectors( 4 )
				gl.bufferData( gl.ARRAY_BUFFER, cap * 16, gl.DYNAMIC_DRAW )
				slot.layer = program.param( 'inst_layer' )?.vectors( 1 ) ?? null
				if( slot.layer ) gl.bufferData( gl.ARRAY_BUFFER, cap * 4, gl.DYNAMIC_DRAW )
				slot.uv = program.param( 'inst_uv' )?.vectors( 4 ) ?? null
				if( slot.uv ) gl.bufferData( gl.ARRAY_BUFFER, cap * 16, gl.DYNAMIC_DRAW )
			} )

			this.slots_all.set( batch, slot )
			return slot
		}

		tex( atlas: $bog_gamengine_atlas ) {
			const found = this.textures_all.get( atlas )
			if( found ) return found
			const tex: $bog_gamengine_draw_tex = {
				texture: new $mol_3d_texture( this.context().native ),
				sent: false,
			}
			this.textures_all.set( atlas, tex )
			return tex
		}

		@ $mol_mem
		textures() {
			const gl = this.context().native
			const slots = this.slots()
			let sent = 0
			for( let i = 0; i < slots.length; ++ i ) {
				const slot = slots[ i ]
				if( !slot.atlas || slot.tex!.sent ) continue
				if( !slot.atlas.ready() ) continue
				gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true )
				slot.tex!.texture.send_multi( slot.atlas.images() )
				slot.tex!.sent = true
				++ sent
			}
			return sent
		}

		paint() {
			this.scene().step()
			const gl = this.context().native
			const slots = this.slots()
			this.textures()
			const proj = this.proj()
			const view = this.cam().view()
			const light_dir = this.light_dir()
			this.ambient_vec[ 0 ] = this.ambient()
			gl.enable( gl.BLEND )
			gl.blendFunc( gl.ONE, gl.ONE_MINUS_SRC_ALPHA )
			gl.clearColor( 0.08, 0.08, 0.1, 1 )
			gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT )
			for( let i = 0; i < slots.length; ++ i ) this.paint_slot( gl, slots[ i ], proj, view, light_dir )
			gl.bindVertexArray( null )
			gl.useProgram( null )
			this.measure()
		}

		paint_slot( gl: WebGL2RenderingContext, slot: $bog_gamengine_draw_slot, proj: Float32Array, view: Float32Array, light_dir: Float32Array ) {
			const batch = slot.batch
			const count = batch.count
			if( !count ) return
			if( slot.tex && !slot.tex.sent ) return
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
			slot.proj.matrix( proj )
			slot.view.matrix( view )
			if( slot.light_dir ) slot.light_dir.vector_float( light_dir )
			if( slot.ambient ) slot.ambient.vector_float( this.ambient_vec )
			if( slot.tex ) {
				gl.activeTexture( gl.TEXTURE0 )
				gl.bindTexture( gl.TEXTURE_2D_ARRAY, slot.tex.texture.native )
				slot.sampler!.vector_int( this.unit )
			}
			gl.bindVertexArray( slot.geometry.vertexes )
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
			slot.program.strips( 0, slot.size, count )
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
