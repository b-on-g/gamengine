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

	export type $bog_gamengine_gl_face = {
		glob?: Record< string, $bog_gamengine_gl_type >,
		input?: Record< string, $bog_gamengine_gl_type >,
		pipe?: Record< string, $bog_gamengine_gl_type >,
		output?: Record< string, $bog_gamengine_gl_type >,
	}

	const prefix = `#version 300 es
				precision highp float;
				precision highp sampler2D;
				precision highp sampler2DArray;
			`

	export function $bog_gamengine_gl_source( face: $bog_gamengine_gl_face, vert: string, frag: string ) {

		let revert = prefix
		let refrag = prefix

		for( const name in face.glob ?? {} ) {
			revert += `uniform ${ face.glob![ name ] } ${ name };\n`
			refrag += `uniform ${ face.glob![ name ] } ${ name };\n`
		}

		for( const name in face.input ?? {} ) {
			revert += `in ${ face.input![ name ] } ${ name };\n`
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

	export function $bog_gamengine_gl_texture_array( gl: WebGL2RenderingContext, images: readonly TexImageSource[], size: number ) {

		const texture = gl.createTexture()!
		gl.bindTexture( gl.TEXTURE_2D_ARRAY, texture )
		gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true )
		gl.texImage3D( gl.TEXTURE_2D_ARRAY, 0, gl.RGBA, size, size, images.length, 0, gl.RGBA, gl.UNSIGNED_BYTE, null )

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

		return texture
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

	export function $bog_gamengine_gl_uniform_int( gl: WebGL2RenderingContext, location: WebGLUniformLocation | null, value: number ) {
		if( location ) gl.uniform1i( location, value )
		return value
	}

}
