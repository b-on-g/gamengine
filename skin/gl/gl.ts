namespace $ {

	export class $bog_gamengine_skin_gl_data extends Object {

		readonly native: WebGLTexture

		constructor(
			readonly gl: WebGL2RenderingContext,
			readonly width: number,
			readonly height: number,
		) {
			super()
			this.native = gl.createTexture()!
			gl.bindTexture( gl.TEXTURE_2D, this.native )
			gl.texStorage2D( gl.TEXTURE_2D, 1, gl.RGBA32F, width, height )
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST )
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST )
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE )
			gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE )
			gl.bindTexture( gl.TEXTURE_2D, null )
		}

		send( floats: Float32Array ) {
			const gl = this.gl
			gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false )
			gl.bindTexture( gl.TEXTURE_2D, this.native )
			gl.texSubImage2D( gl.TEXTURE_2D, 0, 0, 0, this.width, this.height, gl.RGBA, gl.FLOAT, floats )
			return floats
		}

		dispose() {
			this.gl.deleteTexture( this.native )
			return this
		}

	}

	export function $bog_gamengine_skin_gl_bones( gl: WebGL2RenderingContext ) {
		return new $bog_gamengine_skin_gl_data( gl, 4, $bog_gamengine_skin_max )
	}

}
