namespace $ {

	export type $bog_gamengine_gl_type =
		| 'mat4' | 'mat3' | 'mat2'
		| 'vec4' | 'vec3' | 'vec2'
		| 'ivec4' | 'ivec3' | 'ivec2'
		| 'uvec4' | 'uvec3' | 'uvec2'
		| 'float' | 'int' | 'uint'
		| 'sampler2D' | 'sampler2DShadow'
		| 'sampler2DArray' | 'sampler2DArrayShadow'
		| 'samplerCube' | 'samplerCubeShadow'
		| 'sampler3D'

	export type $bog_gamengine_gl_type_array = `${ $bog_gamengine_gl_type }[${ number }]`

	export type $bog_gamengine_gl_face = {
		glob?: Record< string, $bog_gamengine_gl_type | $bog_gamengine_gl_type_array >,
		input?: Record< string, $bog_gamengine_gl_type >,
		pipe?: Record< string, $bog_gamengine_gl_type >,
		output?: Record< string, $bog_gamengine_gl_type >,
	}

	const prefix = `#version 300 es
				precision highp float;
				precision highp sampler2D;
				precision highp sampler2DArray;
				precision highp sampler2DShadow;
			`

	export function $bog_gamengine_gl_decl( kind: string, type: string, name: string ) {
		const open = type.indexOf( '[' )
		if( open < 0 ) return `${ kind } ${ type } ${ name };\n`
		return `${ kind } ${ type.slice( 0, open ) } ${ name }${ type.slice( open ) };\n`
	}

	export function $bog_gamengine_gl_slots( type: $bog_gamengine_gl_type ) {
		switch( type ) {
			case 'mat4': return 4
			case 'mat3': return 3
			case 'mat2': return 2
			default: return 1
		}
	}

	export function $bog_gamengine_gl_source( face: $bog_gamengine_gl_face, vert: string, frag: string ) {

		let revert = prefix
		let refrag = prefix

		for( const name in face.glob ?? {} ) {
			const decl = $bog_gamengine_gl_decl( 'uniform', face.glob![ name ], name )
			revert += decl
			refrag += decl
		}

		let location = 0
		for( const name in face.input ?? {} ) {
			const type = face.input![ name ]
			revert += `layout( location = ${ location } ) in ${ type } ${ name };\n`
			location += $bog_gamengine_gl_slots( type )
		}

		for( const name in face.pipe ?? {} ) {
			revert += `out ${ face.pipe![ name ] } ${ name };\n`
			refrag += `in ${ face.pipe![ name ] } ${ name };\n`
		}

		for( const name in face.output ?? {} ) {
			refrag += `out ${ face.output![ name ] } ${ name };\n`
		}

		return { vert: revert + vert, frag: refrag + frag }
	}

	export function $bog_gamengine_gl_shader( gl: WebGL2RenderingContext, type: GLenum, code: string ) {
		const shader = gl.createShader( type )!
		gl.shaderSource( shader, code )
		gl.compileShader( shader )
		if( gl.getShaderParameter( shader, gl.COMPILE_STATUS ) ) return shader
		const log = gl.getShaderInfoLog( shader )
		gl.deleteShader( shader )
		throw new Error( String( log ) )
	}

	export class $bog_gamengine_gl_program< Face extends $bog_gamengine_gl_face > extends Object {

		readonly native: WebGLProgram
		uniforms = new Map< string, WebGLUniformLocation | null >()

		constructor(
			readonly gl: WebGL2RenderingContext,
			face: Face,
			vert: string,
			frag: string,
		) {
			super()
			const source = $bog_gamengine_gl_source( face, vert, frag )
			const program = gl.createProgram()!
			gl.attachShader( program, $bog_gamengine_gl_shader( gl, gl.VERTEX_SHADER, source.vert ) )
			gl.attachShader( program, $bog_gamengine_gl_shader( gl, gl.FRAGMENT_SHADER, source.frag ) )
			gl.linkProgram( program )
			if( !gl.getProgramParameter( program, gl.LINK_STATUS ) ) {
				const log = gl.getProgramInfoLog( program )
				gl.deleteProgram( program )
				throw new Error( String( log ) )
			}
			this.native = program
		}

		uniform( name: keyof Face[ 'glob' ] & string ) {
			let location = this.uniforms.get( name )
			if( location === undefined ) {
				location = this.gl.getUniformLocation( this.native, name )
				this.uniforms.set( name, location )
			}
			return location
		}

		attribute( name: keyof Face[ 'input' ] & string ) {
			const location = this.gl.getAttribLocation( this.native, name )
			return location === -1 ? null : location
		}

	}

	export class $bog_gamengine_gl_buffer extends Object {

		readonly native: WebGLBuffer

		constructor(
			readonly gl: WebGL2RenderingContext,
			location: number,
			size: number,
			divisor: number,
		) {
			super()
			this.native = gl.createBuffer()!
			gl.bindBuffer( gl.ARRAY_BUFFER, this.native )
			if( size === 16 ) {
				for( let row = 0; row < 4; ++ row ) {
					gl.enableVertexAttribArray( location + row )
					gl.vertexAttribPointer( location + row, 4, gl.FLOAT, false, 64, row * 16 )
					gl.vertexAttribDivisor( location + row, divisor )
				}
			} else {
				gl.enableVertexAttribArray( location )
				gl.vertexAttribPointer( location, size, gl.FLOAT, false, 0, 0 )
				gl.vertexAttribDivisor( location, divisor )
			}
		}

		send( data: ArrayBufferView ) {
			const gl = this.gl
			gl.bindBuffer( gl.ARRAY_BUFFER, this.native )
			gl.bufferData( gl.ARRAY_BUFFER, data, gl.STATIC_DRAW )
			return data
		}

		reserve( bytes: number ) {
			const gl = this.gl
			gl.bindBuffer( gl.ARRAY_BUFFER, this.native )
			gl.bufferData( gl.ARRAY_BUFFER, bytes, gl.DYNAMIC_DRAW )
			return bytes
		}

	}

	export function $bog_gamengine_gl_texture_array( gl: WebGL2RenderingContext, images: readonly TexImageSource[], size: number, srgb = false ) {

		const texture = gl.createTexture()!
		gl.bindTexture( gl.TEXTURE_2D_ARRAY, texture )
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true )
		gl.texImage3D( gl.TEXTURE_2D_ARRAY, 0, srgb ? gl.SRGB8_ALPHA8 : gl.RGBA8, size, size, images.length, 0, gl.RGBA, gl.UNSIGNED_BYTE, null )

		for( let i = 0; i < images.length; ++ i ) {
			gl.texSubImage3D( gl.TEXTURE_2D_ARRAY, 0, 0, 0, i, size, size, 1, gl.RGBA, gl.UNSIGNED_BYTE, images[ i ] )
		}

		const anisotropic = gl.getExtension( 'EXT_texture_filter_anisotropic' )
		if( anisotropic ) {
			const max = gl.getParameter( anisotropic.MAX_TEXTURE_MAX_ANISOTROPY_EXT )
			gl.texParameterf( gl.TEXTURE_2D_ARRAY, anisotropic.TEXTURE_MAX_ANISOTROPY_EXT, max )
		}

		gl.texParameteri( gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR )
		gl.texParameteri( gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.LINEAR )
		gl.generateMipmap( gl.TEXTURE_2D_ARRAY )
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false )

		return texture
	}

	export function $bog_gamengine_gl_texture_array_flat( gl: WebGL2RenderingContext ) {
		const texture = gl.createTexture()!
		gl.bindTexture( gl.TEXTURE_2D_ARRAY, texture )
		gl.texImage3D( gl.TEXTURE_2D_ARRAY, 0, gl.RGBA8, 1, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([ 128, 128, 255, 255 ]) )
		gl.texParameteri( gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.NEAREST )
		gl.texParameteri( gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.NEAREST )
		return texture
	}

	export class $bog_gamengine_gl_depth_target extends Object {

		readonly native: WebGLFramebuffer
		readonly texture: WebGLTexture

		constructor(
			readonly gl: WebGL2RenderingContext,
			readonly size: number,
		) {
			super()
			this.texture = gl.createTexture()!
			gl.bindTexture( gl.TEXTURE_2D, this.texture )
			gl.texStorage2D( gl.TEXTURE_2D, 1, gl.DEPTH_COMPONENT24, size, size )
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR )
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR )
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE )
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE )
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_COMPARE_MODE, gl.COMPARE_REF_TO_TEXTURE )
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_COMPARE_FUNC, gl.LEQUAL )
			gl.bindTexture( gl.TEXTURE_2D, null )
			this.native = gl.createFramebuffer()!
			gl.bindFramebuffer( gl.FRAMEBUFFER, this.native )
			gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.texture, 0 )
			gl.drawBuffers([ gl.NONE ])
			gl.readBuffer( gl.NONE )
			const status = gl.checkFramebufferStatus( gl.FRAMEBUFFER )
			gl.bindFramebuffer( gl.FRAMEBUFFER, null )
			if( status === gl.FRAMEBUFFER_COMPLETE ) return
			this.dispose()
			throw new Error( `Depth target is incomplete (${ status })` )
		}

		dispose() {
			this.gl.deleteFramebuffer( this.native )
			this.gl.deleteTexture( this.texture )
			return this
		}

	}

	export class $bog_gamengine_gl_color_target extends Object {

		native = null as WebGLFramebuffer | null
		texture = null as WebGLTexture | null
		depth = null as WebGLRenderbuffer | null
		width = 0
		height = 0
		readonly float: boolean

		constructor(
			readonly gl: WebGL2RenderingContext,
			width: number,
			height: number,
		) {
			super()
			this.float = !!gl.getExtension( 'EXT_color_buffer_float' )
			this.attach( width, height )
		}

		attach( width: number, height: number ) {
			const gl = this.gl
			this.width = Math.max( Math.round( width ), 1 )
			this.height = Math.max( Math.round( height ), 1 )
			this.texture = gl.createTexture()!
			gl.bindTexture( gl.TEXTURE_2D, this.texture )
			gl.texStorage2D( gl.TEXTURE_2D, 1, this.float ? gl.RGBA16F : gl.RGBA8, this.width, this.height )
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR )
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR )
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE )
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE )
			gl.bindTexture( gl.TEXTURE_2D, null )
			this.depth = gl.createRenderbuffer()!
			gl.bindRenderbuffer( gl.RENDERBUFFER, this.depth )
			gl.renderbufferStorage( gl.RENDERBUFFER, gl.DEPTH_COMPONENT24, this.width, this.height )
			gl.bindRenderbuffer( gl.RENDERBUFFER, null )
			this.native = gl.createFramebuffer()!
			gl.bindFramebuffer( gl.FRAMEBUFFER, this.native )
			gl.framebufferTexture2D( gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0 )
			gl.framebufferRenderbuffer( gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depth )
			const status = gl.checkFramebufferStatus( gl.FRAMEBUFFER )
			gl.bindFramebuffer( gl.FRAMEBUFFER, null )
			if( status === gl.FRAMEBUFFER_COMPLETE ) return this
			this.dispose()
			throw new Error( `Color target is incomplete (${ status })` )
		}

		resize( width: number, height: number ) {
			if( this.width === Math.max( Math.round( width ), 1 ) && this.height === Math.max( Math.round( height ), 1 ) ) return this
			this.dispose()
			return this.attach( width, height )
		}

		dispose() {
			const gl = this.gl
			if( this.native ) gl.deleteFramebuffer( this.native )
			if( this.texture ) gl.deleteTexture( this.texture )
			if( this.depth ) gl.deleteRenderbuffer( this.depth )
			this.native = null
			this.texture = null
			this.depth = null
			return this
		}

	}

	export function $bog_gamengine_gl_uniform_matrix( gl: WebGL2RenderingContext, location: WebGLUniformLocation | null, data: Float32Array ) {
		if( !location ) return data
		switch( data.length ) {
			case 16: gl.uniformMatrix4fv( location, false, data ); break
			case 9: gl.uniformMatrix3fv( location, false, data ); break
			case 4: gl.uniformMatrix2fv( location, false, data ); break
			default: throw new Error( `Wrong matrix data length (${ data.length })` )
		}
		return data
	}

	export function $bog_gamengine_gl_uniform_vector( gl: WebGL2RenderingContext, location: WebGLUniformLocation | null, data: Float32Array ) {
		if( !location ) return data
		switch( data.length ) {
			case 4: gl.uniform4fv( location, data ); break
			case 3: gl.uniform3fv( location, data ); break
			case 2: gl.uniform2fv( location, data ); break
			case 1: gl.uniform1fv( location, data ); break
			default: throw new Error( `Wrong vector data length (${ data.length })` )
		}
		return data
	}

	export function $bog_gamengine_gl_uniform_vec4s( gl: WebGL2RenderingContext, location: WebGLUniformLocation | null, data: Float32Array ) {
		if( location ) gl.uniform4fv( location, data )
		return data
	}

	export function $bog_gamengine_gl_uniform_int( gl: WebGL2RenderingContext, location: WebGLUniformLocation | null, value: number ) {
		if( location ) gl.uniform1i( location, value )
		return value
	}

}
