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

		createTexture() {
			return 'bones'
		}

		bindTexture() {}

		texStorage2D() {}

		texParameteri() {}

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
		passes_mock = null as readonly $bog_gamengine_shader_post[] | null

		context() {
			return this.gl as unknown as WebGL2RenderingContext
		}

		scene() {
			return this.scene_mock
		}

		passes() {
			return this.passes_mock ?? super.passes()
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

		'slot with bones frees its bone texture as well'( $ ) {
			const draw = new $bog_gamengine_draw_mock
			draw.$ = $
			const gone = new $bog_gamengine_batch
			gone[ Symbol.toStringTag ] = 'gone'
			draw.scene().batches([ gone ])
			draw.slots()[ 0 ]!.bones_tex = $bog_gamengine_skin_gl_bones( draw.context() )
			draw.scene().batches([])
			draw.slots()
			$mol_assert_equal( draw.gl.deleted, [ 'buffer gone', 'vao gone', 'bones' ] )
		},

		'clear colour is the dark default until it is set'( $ ) {
			const draw = new $$.$bog_gamengine_draw
			draw.$ = $
			$mol_assert_equal( draw.clear(), new Float32Array([ 0.08, 0.08, 0.1, 1 ]) )
			draw.clear([ 0.5, 0.7, 1, 1 ])
			$mol_assert_equal( draw.clear(), new Float32Array([ 0.5, 0.7, 1, 1 ]) )
		},

		'report of a ready slot with bones counts its instance'( $ ) {
			$.$mol_state_time = $bog_gamengine_draw_time_mock
			const draw = new $bog_gamengine_draw_mock
			draw.$ = $
			const slot = new $$.$bog_gamengine_draw_slot
			slot.batch = new $bog_gamengine_batch
			slot.batch.count = 1
			slot.batch.cap = 1
			slot.ready = true
			slot.tris = 12
			slot.bytes = 512
			slot.bones_tex = $bog_gamengine_skin_gl_bones( draw.context() )
			draw.count_fill([ slot ])
			draw.measure( 0, 1, 1, 2, 3, 4, 5 )
			$mol_assert_equal( draw.report().instances, 1 )
			$mol_assert_equal( draw.report().triangles, 12 )
			$mol_assert_equal( draw.report().bytes, 512 )
		},

		'light matrix puts a point on the sphere border into ±1'( $ ) {
			const mat = $$.$bog_gamengine_draw_shadow_mat(
				new Float32Array([ 0, -1, 0 ]), 0,
				new Float32Array([ 1, 2, 3 ]), 10,
				new Float32Array( 16 ),
			)
			const round = ( value: number )=> Math.round( value * 1e6 ) / 1e6 + 0
			const at = ( x: number, y: number, z: number )=> [
				round( mat[ 0 ] * x + mat[ 4 ] * y + mat[ 8 ] * z + mat[ 12 ] ),
				round( mat[ 1 ] * x + mat[ 5 ] * y + mat[ 9 ] * z + mat[ 13 ] ),
				round( mat[ 2 ] * x + mat[ 6 ] * y + mat[ 10 ] * z + mat[ 14 ] ),
			]
			$mol_assert_equal( at( 1, 2, 3 ), [ 0, 0, 0 ] )
			$mol_assert_equal( at( 11, 2, 3 ), [ 1, 0, 0 ] )
			$mol_assert_equal( at( 1, 2, 13 ), [ 0, 1, 0 ] )
			$mol_assert_equal( at( 1, -8, 3 ), [ 0, 0, 1 ] )
			$mol_assert_equal( at( 1, 12, 3 ), [ 0, 0, -1 ] )
		},

		'stat without context is a string'( $ ) {
			$.$mol_state_time = $bog_gamengine_draw_time_mock
			const draw = new $bog_gamengine_draw
			draw.$ = $
			$mol_assert_equal( draw.stat(), 'frame 1 | 0.0 ms | tick 0.0 ms' )
		},

		'report without context is all zeros'( $ ) {
			$.$mol_state_time = $bog_gamengine_draw_time_mock
			const draw = new $bog_gamengine_draw
			draw.$ = $
			$mol_assert_equal( draw.report(), {
				tick: 0, fill: 0, shadow: 0, main: 0, post: 0,
				batches: 0, instances: 0, draws: 0, triangles: 0, bytes: 0,
			} )
		},

		'counters sum instances and triangles of ready slots only'( $ ) {
			const draw = new $bog_gamengine_draw_mock
			draw.$ = $
			const slot = ( count: number, ready: boolean )=> {
				const made = new $$.$bog_gamengine_draw_slot
				made.batch = new $bog_gamengine_batch
				made.batch.count = count
				made.batch.cap = count
				made.ready = ready
				made.tris = 2
				made.stride = 100
				made.bytes = 100 * count
				return made
			}
			draw.count_fill([ slot( 3, true ), slot( 5, true ), slot( 7, false ) ])
			$mol_assert_equal( draw.count_batches, 2 )
			$mol_assert_equal( draw.count_instances, 8 )
			$mol_assert_equal( draw.count_triangles, 16 )
			$mol_assert_equal( draw.count_bytes, 800 )
		},

		'chain of one pass draws straight to the screen'( $ ) {
			const draw = new $bog_gamengine_draw_mock
			draw.$ = $
			const plan = draw.post_plan()
			$mol_assert_equal( plan.length, 1 )
			$mol_assert_equal( plan[ 0 ].from, 'scene' )
			$mol_assert_equal( plan[ 0 ].out, null )
		},

		'bloom before tone ping-pongs half size targets and ends on the screen'( $ ) {
			const draw = new $bog_gamengine_draw_mock
			draw.$ = $
			draw.passes_mock = [ new $bog_gamengine_shader_post_bloom, new $bog_gamengine_shader_post_tone ]
			const plan = draw.post_plan()
			$mol_assert_equal( plan.map( step => step.from ), [ 'scene', '2_0', '2_1', 'scene', '1_0' ] )
			$mol_assert_equal( plan.map( step => step.out ), [ '2_0', '2_1', '2_0', '1_0', null ] )
			$mol_assert_equal( plan.map( step => step.extra ), [ null, null, null, '2_0', null ] )
		},

		'chain is empty when post is off'( $ ) {
			const draw = new $bog_gamengine_draw_mock
			draw.$ = $
			draw.post( false )
			$mol_assert_equal( draw.post_plan().length, 0 )
		},

	})

}
