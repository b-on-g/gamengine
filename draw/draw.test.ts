namespace $ {

	class $bog_gamengine_draw_time_mock extends $mol_state_time {

		@ $mol_mem
		static stamp( next = 0 ) {
			return next
		}

		static now( precision: number ) {
			return this.stamp()
		}

	}

	class $bog_gamengine_draw_gl_mock extends Object {

		deleted = [] as string[]

		deleteVertexArray( vao: string ) {
			this.deleted.push( vao )
		}

		deleteBuffer( buffer: string ) {
			this.deleted.push( buffer )
		}

		deleteTexture( texture: string ) {
			this.deleted.push( texture )
		}

	}

	class $bog_gamengine_draw_mock extends $$.$bog_gamengine_draw {

		gl = new $bog_gamengine_draw_gl_mock
		scene_mock = new $bog_gamengine_scene

		context() {
			return this.gl as unknown as WebGL2RenderingContext
		}

		scene() {
			return this.scene_mock
		}

		slot( batch: $bog_gamengine_batch ) {
			const found = this.slots_all.get( batch )
			if( found ) return found
			const slot = new $$.$bog_gamengine_draw_slot
			slot.batch = batch
			slot.vao = `vao ${ batch }` as unknown as WebGLVertexArrayObject
			slot.buffers = [ { native: `buffer ${ batch }` } as unknown as $bog_gamengine_gl_buffer ]
			this.slots_all.set( batch, slot )
			return slot
		}

	}

	$mol_test({

		'slot of a vanished batch frees vao and buffers, the kept one stays'( $ ) {
			const draw = new $bog_gamengine_draw_mock
			draw.$ = $
			const kept = new $bog_gamengine_batch
			kept[ Symbol.toStringTag ] = 'kept'
			const gone = new $bog_gamengine_batch
			gone[ Symbol.toStringTag ] = 'gone'
			draw.scene().batches([ kept, gone ])
			draw.slots()
			draw.scene().batches([ kept ])
			draw.slots()
			$mol_assert_equal( draw.gl.deleted, [ 'buffer gone', 'vao gone' ] )
		},

		'stat without context is a string'( $ ) {
			$.$mol_state_time = $bog_gamengine_draw_time_mock
			const draw = new $bog_gamengine_draw
			draw.$ = $
			$mol_assert_equal( draw.stat(), 'frame 1 | 0.0 ms | tick 0.0 ms' )
		},

	})

}
