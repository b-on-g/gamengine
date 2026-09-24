namespace $.$$ {

	type $bog_gamengine_draw_face = {
		glob: {
			proj: 'mat4', view: 'mat4', atlas: 'sampler2DArray',
			light_count: 'int', light_pos: 'vec4[8]', light_dir: 'vec4[8]', light_color: 'vec4[8]',
			ambient: 'vec3', cam_pos: 'vec3', wireframe: 'float',
			shadow_mat: 'mat4', shadow_map: 'sampler2DShadow', shadow_light: 'int',
			bones: 'sampler2D',
		}
		input: {
			vertex: 'vec3', uv: 'vec2', normal: 'vec3',
			inst_trans: 'mat4', inst_tint: 'vec4', inst_layer: 'float', inst_uv: 'vec4',
			inst_material: 'vec4', inst_normal_layer: 'float',
			joints: 'vec4', weights: 'vec4',
		}
	}

	type $bog_gamengine_draw_post_face = {
		glob: {
			source: 'sampler2D', texel: 'vec2', extra?: 'sampler2D',
		}
	}

	export type $bog_gamengine_draw_step = {
		readonly shader: $bog_gamengine_shader_post
		readonly from: string
		readonly extra: string | null
		readonly out: string | null
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
		bones = null as WebGLUniformLocation | null
		bones_tex = null as $bog_gamengine_skin_gl_data | null
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
		tris = 0
		stride = 0
		bytes_shape = 0
		bytes = 0

		dispose( gl: WebGL2RenderingContext ) {
			for( let i = 0; i < this.buffers.length; ++ i ) gl.deleteBuffer( this.buffers[ i ].native )
			this.buffers = []
			gl.deleteVertexArray( this.vao )
			this.bones_tex?.dispose()
			this.bones_tex = null
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
		steps_ms = new Float32Array( stat_window )
		fills_ms = new Float32Array( stat_window )
		shadows_ms = new Float32Array( stat_window )
		mains_ms = new Float32Array( stat_window )
		posts_ms = new Float32Array( stat_window )
		batches_ring = new Float32Array( stat_window )
		instances_ring = new Float32Array( stat_window )
		draws_ring = new Float32Array( stat_window )
		triangles_ring = new Float32Array( stat_window )
		bytes_ring = new Float32Array( stat_window )
		count_batches = 0
		count_instances = 0
		count_draws = 0
		count_triangles = 0
		count_bytes = 0
		texel_vec = new Float32Array( 2 )
		post_last = new Map< string, $bog_gamengine_gl_color_target >()
		post_vao_last = null as WebGLVertexArrayObject | null
		samples = 0
		paint_at = 0

		@ $mol_mem
		context() {
			const canvas = this.dom_node() as HTMLCanvasElement
			return canvas.getContext( 'webgl2', { preserveDrawingBuffer: true } )!
		}

		dpr() {
			return this.$.$mol_dom_context.devicePixelRatio
		}

		@ $mol_mem
		width() {
			return Math.ceil( ( this.view_rect()?.width ?? 0 ) * this.dpr() )
		}

		@ $mol_mem
		height() {
			return Math.ceil( ( this.view_rect()?.height ?? 0 ) * this.dpr() )
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
		clear( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 0.08, 0.08, 0.1, 1 ])
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

		@ $mol_mem
		post_plan() {
			const plan = [] as $bog_gamengine_draw_step[]
			if( !this.post() ) return plan as readonly $bog_gamengine_draw_step[]
			const passes = this.passes() as readonly $bog_gamengine_shader_post[]
			const turn = new Map< number, number >()
			let input = 'scene'
			let prev = 'scene'
			for( let p = 0; p < passes.length; ++ p ) {
				const steps = passes[ p ].steps()
				for( let s = 0; s < steps.length; ++ s ) {
					const step = steps[ s ]
					const from = step.from === 'in' ? input : prev
					const extra = step.extra === null ? null : step.extra === 'in' ? input : prev
					const last = p === passes.length - 1 && s === steps.length - 1
					let out = null as string | null
					if( !last ) {
						let index = turn.get( step.scale ) ?? 0
						let key = `${ step.scale }_${ index }`
						if( key === from || key === extra ) {
							index = index ? 0 : 1
							key = `${ step.scale }_${ index }`
						}
						turn.set( step.scale, index ? 0 : 1 )
						out = key
					}
					plan.push({ shader: step.shader, from, extra, out })
					prev = out ?? 'screen'
				}
				input = prev
			}
			return plan as readonly $bog_gamengine_draw_step[]
		}

		@ $mol_mem
		post_targets() {
			const plan = this.post_plan()
			const width = this.width()
			const height = this.height()
			const keys = [] as string[]
			if( plan.length ) keys.push( 'scene' )
			for( let i = 0; i < plan.length; ++ i ) {
				const out = plan[ i ].out
				if( out && !keys.includes( out ) ) keys.push( out )
			}
			const gl = keys.length ? this.context() : null
			for( let i = 0; i < keys.length; ++ i ) {
				const key = keys[ i ]
				const at = key.indexOf( '_' )
				const scale = at < 0 ? 1 : Number( key.slice( 0, at ) )
				const wide = Math.max( Math.round( width / scale ), 1 )
				const high = Math.max( Math.round( height / scale ), 1 )
				const found = this.post_last.get( key )
				if( found ) found.resize( wide, high )
				else this.post_last.set( key, new $bog_gamengine_gl_color_target( gl!, wide, high ) )
			}
			for( const key of [ ... this.post_last.keys() ] ) {
				if( keys.includes( key ) ) continue
				this.post_last.get( key )!.dispose()
				this.post_last.delete( key )
			}
			return keys as readonly string[]
		}

		@ $mol_mem
		post_vao() {
			const vao = this.context().createVertexArray()!
			this.post_vao_last = vao
			return vao
		}

		post_drop() {
			for( const target of this.post_last.values() ) target.dispose()
			this.post_last.clear()
			if( this.post_vao_last ) this.context().deleteVertexArray( this.post_vao_last )
			this.post_vao_last = null
			return this
		}

		destructor() {
			this.post_drop()
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
				bones: glob( 'bones' ),
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
			let bytes_skin = 0
			if( slot.bones ) {
				const joints = $bog_gamengine_skin_shape_joints( shape )
				const weights = $bog_gamengine_skin_shape_weights( shape )
				buffer( program.attribute( 'joints' ), 4, 0 )?.send( joints )
				buffer( program.attribute( 'weights' ), 4, 0 )?.send( weights )
				bytes_skin = joints.byteLength + weights.byteLength
				slot.bones_tex = $bog_gamengine_skin_gl_bones( gl )
			}
			gl.bindVertexArray( null )

			slot.tris = mode === 'lines' ? 0 : mode === 'triangles' ? slot.size / 3 : Math.max( slot.size - 2, 0 )
			slot.stride = 80
				+ ( slot.layer ? 4 : 0 )
				+ ( slot.uv ? 16 : 0 )
				+ ( slot.material ? 16 : 0 )
				+ ( slot.normal_layer ? 4 : 0 )
			slot.bytes_shape = shape.geometry().byteLength + bytes_skin
			slot.bytes = slot.stride * cap + slot.bytes_shape

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

		step() {
			try {
				return this.scene().step()
			} catch( error ) {
				if( $mol_promise_like( error ) ) return -1
				return $mol_fail_hidden( error )
			}
		}

		paint() {
			const at_start = performance.now()
			this.scene().aspect( this.width() / this.height() || 1 )
			this.step()
			const at_step = performance.now()
			const gl = this.context()
			const slots = this.slots()
			this.textures()
			const plan = this.post_plan()
			if( plan.length ) this.post_targets()
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
			this.count_draws = 0
			const at_prep = performance.now()
			for( let i = 0; i < slots.length; ++ i ) slots[ i ].ready = this.slot_send( gl, slots[ i ] )
			const at_fill = performance.now()
			this.shadow_pass( gl, slots )
			const at_shadow = performance.now()
			const target = plan.length ? this.post_last.get( 'scene' )! : null
			const wide = target ? target.width : this.width()
			const high = target ? target.height : this.height()
			gl.bindFramebuffer( gl.FRAMEBUFFER, target ? target.native : null )
			gl.viewport( 0, 0, wide, high )
			gl.enable( gl.SCISSOR_TEST )
			gl.scissor( 0, 0, wide, high )
			gl.cullFace( gl.BACK )
			gl.enable( gl.BLEND )
			gl.blendFunc( gl.ONE, gl.ONE_MINUS_SRC_ALPHA )
			const clear = this.clear()
			gl.clearColor( clear[ 0 ], clear[ 1 ], clear[ 2 ], clear[ 3 ] )
			gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT )
			for( let i = 0; i < slots.length; ++ i ) {
				if( slots[ i ].ready ) this.paint_slot( gl, slots[ i ], proj, view, wireframe )
			}
			const at_main = performance.now()
			this.post_run( gl, plan )
			const at_post = performance.now()
			gl.bindVertexArray( null )
			gl.useProgram( null )
			this.count_fill( slots )
			this.measure( at_start, at_step, at_prep, at_fill, at_shadow, at_main, at_post )
		}

		post_run( gl: WebGL2RenderingContext, plan: readonly $bog_gamengine_draw_step[] ) {
			if( !plan.length ) return 0
			gl.disable( gl.DEPTH_TEST )
			gl.disable( gl.CULL_FACE )
			gl.disable( gl.BLEND )
			gl.disable( gl.SCISSOR_TEST )
			gl.bindVertexArray( this.post_vao() )
			for( let i = 0; i < plan.length; ++ i ) {
				const step = plan[ i ]
				const from = this.post_last.get( step.from )!
				const out = step.out ? this.post_last.get( step.out )! : null
				const program = step.shader.program( gl ) as $bog_gamengine_gl_program< $bog_gamengine_draw_post_face >
				gl.bindFramebuffer( gl.FRAMEBUFFER, out ? out.native : null )
				gl.viewport( 0, 0, out ? out.width : this.width(), out ? out.height : this.height() )
				gl.useProgram( program.native )
				gl.activeTexture( gl.TEXTURE2 )
				gl.bindTexture( gl.TEXTURE_2D, from.texture )
				$bog_gamengine_gl_uniform_int( gl, program.uniform( 'source' ), 2 )
				if( step.extra ) {
					gl.activeTexture( gl.TEXTURE3 )
					gl.bindTexture( gl.TEXTURE_2D, this.post_last.get( step.extra )!.texture )
					$bog_gamengine_gl_uniform_int( gl, program.uniform( 'extra' ), 3 )
				}
				this.texel_vec[ 0 ] = 1 / from.width
				this.texel_vec[ 1 ] = 1 / from.height
				$bog_gamengine_gl_uniform_vector( gl, program.uniform( 'texel' ), this.texel_vec )
				gl.drawArrays( gl.TRIANGLES, 0, 3 )
				++ this.count_draws
			}
			gl.activeTexture( gl.TEXTURE0 )
			return plan.length
		}

		slot_send( gl: WebGL2RenderingContext, slot: $bog_gamengine_draw_slot ) {
			const batch = slot.batch
			const count = batch.count
			if( !count ) return false
			if( slot.tex && !slot.tex.native ) return false
			if( slot.live ) {
				const shape = batch.shape()
				slot.vertex.send( shape.geometry() )
				slot.size = shape.size()
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
			if( grown ) {
				slot.cap = batch.cap
				slot.bytes = slot.stride * slot.cap + slot.bytes_shape
			}
			return true
		}

		count_fill( slots: readonly $bog_gamengine_draw_slot[] ) {
			let batches = 0
			let instances = 0
			let triangles = 0
			let bytes = 0
			for( let i = 0; i < slots.length; ++ i ) {
				const slot = slots[ i ]
				if( !slot.ready ) continue
				const count = slot.batch.count
				++ batches
				instances += count
				triangles += slot.tris * count
				bytes += slot.bytes
			}
			this.count_batches = batches
			this.count_instances = instances
			this.count_triangles = triangles
			this.count_bytes = bytes
			return instances
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
				++ this.count_draws
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
			if( slot.bones_tex ) {
				gl.activeTexture( gl.TEXTURE4 )
				const bones = $bog_gamengine_skin_bones( batch )
				if( bones ) slot.bones_tex.send( bones )
				else gl.bindTexture( gl.TEXTURE_2D, slot.bones_tex.native )
				$bog_gamengine_gl_uniform_int( gl, slot.bones, 4 )
			}
			gl.bindVertexArray( slot.vao )
			gl.drawArraysInstanced( slot.prim, 0, slot.size, count )
			++ this.count_draws
			if( !wireframe || slot.wire === null ) return
			$bog_gamengine_gl_uniform_vector( gl, slot.wireframe, this.wire_on )
			gl.drawArraysInstanced( slot.wire, 0, slot.size, count )
			++ this.count_draws
		}

		measure( at_start: number, at_step: number, at_prep: number, at_fill: number, at_shadow: number, at_main: number, at_post: number ) {
			const i = this.samples % stat_window
			this.ticks[ i ] = at_post - this.scene().clock().tick_at
			this.gaps[ i ] = this.paint_at ? at_post - this.paint_at : 0
			this.steps_ms[ i ] = at_step - at_start
			this.fills_ms[ i ] = at_fill - at_prep
			this.shadows_ms[ i ] = at_shadow - at_fill
			this.mains_ms[ i ] = at_main - at_shadow
			this.posts_ms[ i ] = at_post - at_main
			this.batches_ring[ i ] = this.count_batches
			this.instances_ring[ i ] = this.count_instances
			this.draws_ring[ i ] = this.count_draws
			this.triangles_ring[ i ] = this.count_triangles
			this.bytes_ring[ i ] = this.count_bytes
			this.paint_at = at_post
			++ this.samples
		}

		mean( ring: Float32Array, size: number ) {
			let sum = 0
			for( let i = 0; i < size; ++ i ) sum += ring[ i ]
			return size ? sum / size : 0
		}

		@ $mol_mem
		report() {
			this.scene().clock().frame()
			const size = Math.min( this.samples, stat_window )
			return {
				tick: this.mean( this.steps_ms, size ),
				fill: this.mean( this.fills_ms, size ),
				shadow: this.mean( this.shadows_ms, size ),
				main: this.mean( this.mains_ms, size ),
				post: this.mean( this.posts_ms, size ),
				batches: this.mean( this.batches_ring, size ),
				instances: this.mean( this.instances_ring, size ),
				draws: this.mean( this.draws_ring, size ),
				triangles: this.mean( this.triangles_ring, size ),
				bytes: this.mean( this.bytes_ring, size ),
			}
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
