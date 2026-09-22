namespace $.$$ {

	type $bog_gamengine_draw_face = {
		glob: { proj: 'mat4', view: 'mat4' }
		input: { vertex: 'vec3', inst_trans: 'mat4', inst_tint: 'vec4' }
	}

	type $bog_gamengine_draw_slot = {
		batch: $bog_gamengine_batch
		program: $mol_3d_program< $bog_gamengine_draw_face >
		proj: $mol_3d_glob
		view: $mol_3d_glob
		geometry: $mol_3d_geometry
		trans: $mol_3d_buffer
		tint: $mol_3d_buffer
		size: number
		cap: number
	}

	const stat_window = 30

	export class $bog_gamengine_draw extends $.$bog_gamengine_draw {

		slots_all = new WeakMap< $bog_gamengine_batch, $bog_gamengine_draw_slot >()
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
			const program = batch.shader().program( context ) as $mol_3d_program< $bog_gamengine_draw_face >
			const shape = batch.shape()
			const cap = Math.max( batch.cap, 16 )

			const slot: $bog_gamengine_draw_slot = {
				batch,
				program,
				proj: program.glob( 'proj' ),
				view: program.glob( 'view' ),
				geometry: new $mol_3d_geometry( gl ),
				trans: null!,
				tint: null!,
				size: shape.size(),
				cap,
			}

			slot.geometry.use( ()=> {
				program.param( 'vertex' )!.vector( 3 ).send([ shape.geometry() ])
				slot.trans = program.param( 'inst_trans' )!.matrices([ 4, 4 ])
				gl.bufferData( gl.ARRAY_BUFFER, cap * 64, gl.DYNAMIC_DRAW )
				slot.tint = program.param( 'inst_tint' )!.vectors( 4 )
				gl.bufferData( gl.ARRAY_BUFFER, cap * 16, gl.DYNAMIC_DRAW )
			} )

			this.slots_all.set( batch, slot )
			return slot
		}

		paint() {
			this.scene().step()
			const gl = this.context().native
			const slots = this.slots()
			const proj = this.proj()
			const view = this.cam().view()
			gl.disable( gl.DEPTH_TEST )
			gl.disable( gl.CULL_FACE )
			gl.enable( gl.BLEND )
			gl.blendFunc( gl.ONE, gl.ONE_MINUS_SRC_ALPHA )
			gl.clearColor( 0.08, 0.08, 0.1, 1 )
			gl.clear( gl.COLOR_BUFFER_BIT )
			for( let i = 0; i < slots.length; ++ i ) this.paint_slot( gl, slots[ i ], proj, view )
			gl.bindVertexArray( null )
			gl.useProgram( null )
			this.measure()
		}

		paint_slot( gl: WebGL2RenderingContext, slot: $bog_gamengine_draw_slot, proj: Float32Array, view: Float32Array ) {
			const batch = slot.batch
			const count = batch.count
			if( !count ) return
			const grown = batch.cap > slot.cap
			gl.useProgram( slot.program.native )
			slot.proj.matrix( proj )
			slot.view.matrix( view )
			gl.bindVertexArray( slot.geometry.vertexes )
			gl.bindBuffer( gl.ARRAY_BUFFER, slot.trans.native )
			if( grown ) gl.bufferData( gl.ARRAY_BUFFER, batch.cap * 64, gl.DYNAMIC_DRAW )
			gl.bufferSubData( gl.ARRAY_BUFFER, 0, batch.trans, 0, count * 16 )
			gl.bindBuffer( gl.ARRAY_BUFFER, slot.tint.native )
			if( grown ) gl.bufferData( gl.ARRAY_BUFFER, batch.cap * 16, gl.DYNAMIC_DRAW )
			gl.bufferSubData( gl.ARRAY_BUFFER, 0, batch.tint, 0, count * 4 )
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
