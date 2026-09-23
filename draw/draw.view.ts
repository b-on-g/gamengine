namespace $.$$ {

	type $bog_gamengine_draw_face = {
		glob: {
			proj: 'mat4', view: 'mat4', atlas: 'sampler2DArray',
			light_count: 'int', light_pos: 'vec4[8]', light_dir: 'vec4[8]', light_color: 'vec4[8]',
			ambient: 'vec3', cam_pos: 'vec3', wireframe: 'float',
			shadow_mat: 'mat4', shadow_map: 'sampler2DShadow', shadow_light: 'int',
		}
		input: {
			vertex: 'vec3', uv: 'vec2', normal: 'vec3',
			inst_trans: 'mat4', inst_tint: 'vec4', inst_layer: 'float', inst_uv: 'vec4',
			inst_material: 'vec4', inst_normal_layer: 'float',
		}
	}

	export class $bog_gamengine_draw_slot extends Object {
		batch = null! as $bog_gamengine_batch
		program = null! as $bog_gamengine_gl_program< $bog_gamengine_draw_face >
		proj = null as WebGLUniformLocation | null
		view = null as WebGLUniformLocation | null
		light_count = null as WebGLUniformLocation | null
		light_pos = null as WebGLUniformLocation | null
		light_dir = null as WebGLUniformLocation | null
		light_color = null as WebGLUniformLocation | null
		ambient = null as WebGLUniformLocation | null
		cam_pos = null as WebGLUniformLocation | null
		wireframe = null as WebGLUniformLocation | null
		shadow_mat = null as WebGLUniformLocation | null
		shadow_map = null as WebGLUniformLocation | null
		shadow_light = null as WebGLUniformLocation | null
		depth = false
		ready = false
		vao = null! as WebGLVertexArrayObject
		vertex = null! as $bog_gamengine_gl_buffer
		live = false
		trans = null! as $bog_gamengine_gl_buffer
		tint = null! as $bog_gamengine_gl_buffer
		layer = null as $bog_gamengine_gl_buffer | null
		uv = null as $bog_gamengine_gl_buffer | null
		material = null as $bog_gamengine_gl_buffer | null
		normal_layer = null as $bog_gamengine_gl_buffer | null
		buffers = [] as $bog_gamengine_gl_buffer[]
		atlas = null as $bog_gamengine_atlas | null
		sampler = null as WebGLUniformLocation | null
		tex = null as $bog_gamengine_draw_tex | null
		prim = 0 as GLenum
		wire = null as GLenum | null
		size = 0
		cap = 0

		dispose( gl: WebGL2RenderingContext ) {
			for( let i = 0; i < this.buffers.length; ++ i ) gl.deleteBuffer( this.buffers[ i ].native )
			this.buffers = []
			gl.deleteVertexArray( this.vao )
			return this
		}
	}

	export class $bog_gamengine_draw_tex extends Object {
		atlas = null! as $bog_gamengine_atlas
		native = null as WebGLTexture | null

		dispose( gl: WebGL2RenderingContext ) {
			if( this.native ) gl.deleteTexture( this.native )
			this.native = null
			return this
		}
	}

	const stat_window = 30

	const light_max = 8

	export function $bog_gamengine_draw_shadow_mat( dir: Float32Array, at: number, center: Float32Array, range: number, out: Float32Array ) {
		let dx = dir[ at ]
		let dy = dir[ at + 1 ]
		let dz = dir[ at + 2 ]
		const len = Math.hypot( dx, dy, dz ) || 1
		dx /= len
		dy /= len
		dz /= len
		const flat = Math.abs( dy ) > 0.99
		const ax = 0
		const ay = flat ? 0 : 1
		const az = flat ? 1 : 0
		let rx = ay * dz - az * dy
		let ry = az * dx - ax * dz
		let rz = ax * dy - ay * dx
		const rl = Math.hypot( rx, ry, rz ) || 1
		rx /= rl
		ry /= rl
		rz /= rl
		const ux = dy * rz - dz * ry
		const uy = dz * rx - dx * rz
		const uz = dx * ry - dy * rx
		const cx = center[ 0 ]
		const cy = center[ 1 ]
		const cz = center[ 2 ]
		out[ 0 ] = rx / range
		out[ 1 ] = ux / range
		out[ 2 ] = dx / range
		out[ 3 ] = 0
		out[ 4 ] = ry / range
		out[ 5 ] = uy / range
		out[ 6 ] = dy / range
		out[ 7 ] = 0
		out[ 8 ] = rz / range
		out[ 9 ] = uz / range
		out[ 10 ] = dz / range
		out[ 11 ] = 0
		out[ 12 ] = - ( rx * cx + ry * cy + rz * cz ) / range
		out[ 13 ] = - ( ux * cx + uy * cy + uz * cz ) / range
		out[ 14 ] = - ( dx * cx + dy * cy + dz * cz ) / range
		out[ 15 ] = 1
		return out
	}

	export class $bog_gamengine_draw extends $.$bog_gamengine_draw {

		slots_all = new WeakMap< $bog_gamengine_batch, $bog_gamengine_draw_slot >()
		slots_last = [] as readonly $bog_gamengine_draw_slot[]
		textures_all = new WeakMap< $bog_gamengine_atlas, $bog_gamengine_draw_tex >()
		textures_last = [] as readonly $bog_gamengine_draw_tex[]
		ambient_vec = new Float32Array( 3 )
		cam_pos_vec = new Float32Array( 3 )
		lights_pos = new Float32Array( light_max * 4 )
		lights_dir = new Float32Array( light_max * 4 )
		lights_color = new Float32Array( light_max * 4 )
		lights_count = 0
		wire_off = new Float32Array( 1 )
		wire_on = new Float32Array([ 1 ])
		shadow_mat_buf = new Float32Array( 16 )
		shadow_last = null as $bog_gamengine_gl_depth_target | null
		sun_at = -1
		shadow_at = -1
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
			const last = this.slots_last
			for( let i = 0; i < last.length; ++ i ) {
				if( slots.includes( last[ i ] ) ) continue
				this.slot_drop( last[ i ] )
			}
			this.slots_last = slots
			return slots as readonly $bog_gamengine_draw_slot[]
		}

		slot_drop( slot: $bog_gamengine_draw_slot ) {
			this.slots_all.delete( slot.batch )
			return slot.dispose( this.context() )
		}

		tex_drop( tex: $bog_gamengine_draw_tex ) {
			this.textures_all.delete( tex.atlas )
			return tex.dispose( this.context() )
		}

		@ $mol_mem
		shadow_shader() {
			return new $bog_gamengine_shader_depth
		}

		@ $mol_mem
		shadow_target() {
			const gl = this.context()
			const size = this.shadow_size()
			this.shadow_last?.dispose()
			this.shadow_last = null
			const target = new $bog_gamengine_gl_depth_target( gl, size )
			this.shadow_last = target
			return target
		}

		destructor() {
			this.shadow_last?.dispose()
			this.shadow_last = null
			const slots = this.slots_last
			for( let i = 0; i < slots.length; ++ i ) this.slot_drop( slots[ i ] )
			this.slots_last = []
			const textures = this.textures_last
			for( let i = 0; i < textures.length; ++ i ) this.tex_drop( textures[ i ] )
			this.textures_last = []
			super.destructor()
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
			const glob = ( name: keyof $bog_gamengine_draw_face[ 'glob' ] )=> name in globs ? program.uniform( name ) : null

			const slot = Object.assign( new $bog_gamengine_draw_slot, {
				batch,
				program,
				proj: program.uniform( 'proj' ),
				view: program.uniform( 'view' ),
				light_count: glob( 'light_count' ),
				light_pos: glob( 'light_pos' ),
				light_dir: glob( 'light_dir' ),
				light_color: glob( 'light_color' ),
				ambient: glob( 'ambient' ),
				cam_pos: glob( 'cam_pos' ),
				wireframe,
				shadow_mat: glob( 'shadow_mat' ),
				shadow_map: glob( 'shadow_map' ),
				shadow_light: glob( 'shadow_light' ),
				depth,
				vao: gl.createVertexArray()!,
				live: mode === 'lines',
				atlas,
				sampler: atlas ? program.uniform( 'atlas' ) : null,
				tex: atlas ? this.tex( atlas ) : null,
				prim: mode === 'lines' ? gl.LINES : mode === 'triangles' ? gl.TRIANGLES : gl.TRIANGLE_STRIP,
				wire: depth && wireframe && mode !== 'lines' ? ( mode === 'triangles' ? gl.LINES : gl.LINE_STRIP ) : null,
				size: shape.size(),
				cap,
			} )

			const buffer = ( location: number | null, size: number, divisor: number )=> {
				if( location === null ) return null
				const buffer = new $bog_gamengine_gl_buffer( gl, location, size, divisor )
				slot.buffers.push( buffer )
				return buffer
			}

			gl.bindVertexArray( slot.vao )
			slot.vertex = buffer( program.attribute( 'vertex' ), 3, 0 )!
			slot.vertex.send( shape.geometry() )
			buffer( program.attribute( 'uv' ), 2, 0 )?.send( shape.skin() )
			buffer( program.attribute( 'normal' ), 3, 0 )?.send( shape.normals() )
			slot.trans = buffer( program.attribute( 'inst_trans' ), 16, 1 )!
			slot.trans.reserve( cap * 64 )
			slot.tint = buffer( program.attribute( 'inst_tint' ), 4, 1 )!
			slot.tint.reserve( cap * 16 )
			slot.layer = buffer( program.attribute( 'inst_layer' ), 1, 1 )
			slot.layer?.reserve( cap * 4 )
			slot.uv = buffer( program.attribute( 'inst_uv' ), 4, 1 )
			slot.uv?.reserve( cap * 16 )
			slot.material = buffer( program.attribute( 'inst_material' ), 4, 1 )
			slot.material?.reserve( cap * 16 )
			slot.normal_layer = buffer( program.attribute( 'inst_normal_layer' ), 1, 1 )
			slot.normal_layer?.reserve( cap * 4 )
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
			const tex = new $bog_gamengine_draw_tex
			tex.atlas = atlas
			this.textures_all.set( atlas, tex )
			return tex
		}

		@ $mol_mem
		textures() {
			const gl = this.context()
			const slots = this.slots()
			const textures = [] as $bog_gamengine_draw_tex[]
			for( let i = 0; i < slots.length; ++ i ) {
				const slot = slots[ i ]
				const tex = slot.tex
				if( !tex || textures.includes( tex ) ) continue
				textures.push( tex )
				if( tex.native || !slot.atlas!.ready() ) continue
				tex.native = $bog_gamengine_gl_texture_array( gl, slot.atlas!.images(), slot.atlas!.size() )
			}
			const last = this.textures_last
			for( let i = 0; i < last.length; ++ i ) {
				if( textures.includes( last[ i ] ) ) continue
				this.tex_drop( last[ i ] )
			}
			this.textures_last = textures
			return textures as readonly $bog_gamengine_draw_tex[]
		}

		lights_fill() {
			const lights = this.scene().lights()
			const pos = this.lights_pos
			const dir = this.lights_dir
			const color = this.lights_color
			if( !lights.length ) {
				const sun = this.light_dir()
				const len = Math.hypot( sun[ 0 ], sun[ 1 ], sun[ 2 ] ) || 1
				pos[ 0 ] = 0
				pos[ 1 ] = 0
				pos[ 2 ] = 0
				pos[ 3 ] = 0
				dir[ 0 ] = - sun[ 0 ] / len
				dir[ 1 ] = - sun[ 1 ] / len
				dir[ 2 ] = - sun[ 2 ] / len
				dir[ 3 ] = -1
				color[ 0 ] = 1
				color[ 1 ] = 1
				color[ 2 ] = 1
				color[ 3 ] = 0
				this.lights_count = 1
				this.sun_at = 0
				return 1
			}
			const count = Math.min( lights.length, light_max )
			this.sun_at = -1
			for( let i = 0; i < count; ++ i ) {
				const light = lights[ i ]
				const kind = light.kind()
				const world = light.world()
				const tone = light.color()
				const power = light.power()
				const at = i * 4
				pos[ at ] = world[ 12 ]
				pos[ at + 1 ] = world[ 13 ]
				pos[ at + 2 ] = world[ 14 ]
				pos[ at + 3 ] = kind === 'sun' ? 0 : 1
				if( kind === 'sun' && this.sun_at < 0 ) this.sun_at = i
				$bog_gamengine_light_dir( world, dir, at )
				dir[ at + 3 ] = kind === 'spot' ? Math.cos( light.angle() ) : -1
				color[ at ] = tone[ 0 ] * power
				color[ at + 1 ] = tone[ 1 ] * power
				color[ at + 2 ] = tone[ 2 ] * power
				color[ at + 3 ] = light.range()
			}
			this.lights_count = count
			return count
		}

		paint() {
			this.scene().aspect( this.width() / this.height() || 1 )
			this.scene().step()
			const gl = this.context()
			const slots = this.slots()
			this.textures()
			const proj = this.proj()
			const view = this.cam().view()
			const wireframe = this.wireframe()
			const ambient = this.ambient()
			this.ambient_vec[ 0 ] = ambient
			this.ambient_vec[ 1 ] = ambient
			this.ambient_vec[ 2 ] = ambient
			const cam_world = this.cam().world()
			this.cam_pos_vec[ 0 ] = cam_world[ 12 ]
			this.cam_pos_vec[ 1 ] = cam_world[ 13 ]
			this.cam_pos_vec[ 2 ] = cam_world[ 14 ]
			this.lights_fill()
			for( let i = 0; i < slots.length; ++ i ) slots[ i ].ready = this.slot_send( gl, slots[ i ] )
			this.shadow_pass( gl, slots )
			gl.bindFramebuffer( gl.FRAMEBUFFER, null )
			gl.viewport( 0, 0, this.width(), this.height() )
			gl.enable( gl.SCISSOR_TEST )
			gl.scissor( 0, 0, this.width(), this.height() )
			gl.cullFace( gl.BACK )
			gl.enable( gl.BLEND )
			gl.blendFunc( gl.ONE, gl.ONE_MINUS_SRC_ALPHA )
			gl.clearColor( 0.08, 0.08, 0.1, 1 )
			gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT )
			for( let i = 0; i < slots.length; ++ i ) {
				if( slots[ i ].ready ) this.paint_slot( gl, slots[ i ], proj, view, wireframe )
			}
			gl.bindVertexArray( null )
			gl.useProgram( null )
			this.measure()
		}

		slot_send( gl: WebGL2RenderingContext, slot: $bog_gamengine_draw_slot ) {
			const batch = slot.batch
			const count = batch.count
			if( !count ) return false
			if( slot.tex && !slot.tex.native ) return false
			if( slot.live ) {
				const geometry = batch.shape().geometry()
				slot.vertex.send( geometry )
				slot.size = geometry.length / 3
			}
			if( !slot.size ) return false
			const grown = batch.cap > slot.cap
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
			if( slot.material ) {
				gl.bindBuffer( gl.ARRAY_BUFFER, slot.material.native )
				if( grown ) gl.bufferData( gl.ARRAY_BUFFER, batch.cap * 16, gl.DYNAMIC_DRAW )
				gl.bufferSubData( gl.ARRAY_BUFFER, 0, batch.material, 0, count * 4 )
			}
			if( slot.normal_layer ) {
				gl.bindBuffer( gl.ARRAY_BUFFER, slot.normal_layer.native )
				if( grown ) gl.bufferData( gl.ARRAY_BUFFER, batch.cap * 4, gl.DYNAMIC_DRAW )
				gl.bufferSubData( gl.ARRAY_BUFFER, 0, batch.normal_layer, 0, count )
			}
			if( grown ) slot.cap = batch.cap
			return true
		}

		shadow_pass( gl: WebGL2RenderingContext, slots: readonly $bog_gamengine_draw_slot[] ) {
			this.shadow_at = this.shadows() ? this.sun_at : -1
			const target = this.shadow_target()
			if( this.shadow_at < 0 ) return target
			$bog_gamengine_draw_shadow_mat( this.lights_dir, this.shadow_at * 4, this.cam_pos_vec, this.shadow_range(), this.shadow_mat_buf )
			const program = this.shadow_shader().program( gl )
			gl.activeTexture( gl.TEXTURE1 )
			gl.bindTexture( gl.TEXTURE_2D, null )
			gl.activeTexture( gl.TEXTURE0 )
			gl.bindFramebuffer( gl.FRAMEBUFFER, target.native )
			gl.viewport( 0, 0, target.size, target.size )
			gl.disable( gl.SCISSOR_TEST )
			gl.disable( gl.BLEND )
			gl.enable( gl.DEPTH_TEST )
			gl.depthMask( true )
			gl.enable( gl.CULL_FACE )
			gl.cullFace( gl.FRONT )
			gl.clear( gl.DEPTH_BUFFER_BIT )
			gl.useProgram( program.native )
			$bog_gamengine_gl_uniform_matrix( gl, program.uniform( 'shadow_mat' ), this.shadow_mat_buf )
			for( let i = 0; i < slots.length; ++ i ) {
				const slot = slots[ i ]
				if( !slot.ready || !slot.depth ) continue
				gl.bindVertexArray( slot.vao )
				gl.drawArraysInstanced( slot.prim, 0, slot.size, slot.batch.count )
			}
			return target
		}

		paint_slot( gl: WebGL2RenderingContext, slot: $bog_gamengine_draw_slot, proj: Float32Array, view: Float32Array, wireframe: boolean ) {
			const batch = slot.batch
			const count = batch.count
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
			$bog_gamengine_gl_uniform_int( gl, slot.light_count, this.lights_count )
			$bog_gamengine_gl_uniform_vec4s( gl, slot.light_pos, this.lights_pos )
			$bog_gamengine_gl_uniform_vec4s( gl, slot.light_dir, this.lights_dir )
			$bog_gamengine_gl_uniform_vec4s( gl, slot.light_color, this.lights_color )
			$bog_gamengine_gl_uniform_vector( gl, slot.ambient, this.ambient_vec )
			$bog_gamengine_gl_uniform_vector( gl, slot.cam_pos, this.cam_pos_vec )
			$bog_gamengine_gl_uniform_vector( gl, slot.wireframe, this.wire_off )
			$bog_gamengine_gl_uniform_matrix( gl, slot.shadow_mat, this.shadow_mat_buf )
			$bog_gamengine_gl_uniform_int( gl, slot.shadow_light, this.shadow_at )
			if( slot.shadow_map ) {
				gl.activeTexture( gl.TEXTURE1 )
				gl.bindTexture( gl.TEXTURE_2D, this.shadow_target().texture )
				$bog_gamengine_gl_uniform_int( gl, slot.shadow_map, 1 )
			}
			if( slot.tex ) {
				gl.activeTexture( gl.TEXTURE0 )
				gl.bindTexture( gl.TEXTURE_2D_ARRAY, slot.tex.native )
				$bog_gamengine_gl_uniform_int( gl, slot.sampler, 0 )
			}
			gl.bindVertexArray( slot.vao )
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
