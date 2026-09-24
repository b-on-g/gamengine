namespace $ {

	function screen_stub() {

		const calls = [] as string[]
		const handlers = {} as Record< string, ( event: any )=> void >

		const target = {
			requestPointerLock() {
				calls.push( 'lock' )
				return Promise.resolve()
			},
		} as unknown as Element

		const doc = {
			fullscreenElement: null as null | object,
			pointerLockElement: null as null | object,
			documentElement: {
				requestFullscreen() {
					calls.push( 'request' )
					return Promise.resolve()
				},
			},
			exitFullscreen() {
				calls.push( 'exit' )
				return Promise.resolve()
			},
			exitPointerLock() {},
			addEventListener( name: string, handler: ( event: any )=> void ) {
				handlers[ name ] = handler
			},
			removeEventListener() {},
		}

		const screen = new $bog_gamengine_screen
		screen.$ = $$.$mol_ambient({ $mol_dom_context: { document: doc } as unknown as typeof globalThis })
		screen.target( target )

		return { screen, doc, calls, handlers, target }
	}

	function settle() {
		return new Promise( done => setTimeout( done ) )
	}

	$mol_test({

		async 'fullscreen on requests document element after tick'() {
			const { screen, calls } = screen_stub()
			screen.fullscreen( true )
			$mol_assert_equal( calls, [] )
			await settle()
			$mol_assert_equal( calls, [ 'request' ] )
		},

		async 'fullscreen off exits after tick'() {
			const { screen, doc, calls } = screen_stub()
			doc.fullscreenElement = doc.documentElement
			screen.fullscreen( false )
			await settle()
			$mol_assert_equal( calls, [ 'exit' ] )
		},

		async 'lock on requests pointer lock of the target after tick'() {
			const { screen, calls } = screen_stub()
			screen.lock( true )
			$mol_assert_equal( calls, [] )
			await settle()
			$mol_assert_equal( calls, [ 'lock' ] )
		},

		'fullscreenchange syncs the flag'() {
			const { screen, doc, handlers } = screen_stub()
			$mol_assert_equal( screen.fullscreen(), false )
			doc.fullscreenElement = doc.documentElement
			handlers.fullscreenchange( {} )
			$mol_assert_equal( screen.fullscreen(), true )
		},

		'mousemove while locked accumulates movement'() {
			const { screen, doc, handlers, target } = screen_stub()
			screen.lock( true )
			doc.pointerLockElement = target
			handlers.mousemove({ movementX: 3, movementY: -2 })
			handlers.mousemove({ movementX: 4, movementY: 1 })
			$mol_assert_equal( screen.dx, 7 )
			$mol_assert_equal( screen.dy, -1 )
		},

		'mousemove without lock is ignored'() {
			const { screen, handlers } = screen_stub()
			screen.lock( true )
			handlers.mousemove({ movementX: 3, movementY: 2 })
			$mol_assert_equal( screen.dx, 0 )
			$mol_assert_equal( screen.dy, 0 )
		},

		'take returns movement and zeroes it'() {
			const { screen, doc, handlers, target } = screen_stub()
			screen.lock( true )
			doc.pointerLockElement = target
			handlers.mousemove({ movementX: 5, movementY: -3 })
			const out = new Float32Array( 2 )
			$mol_assert_equal( screen.take( out ), out )
			$mol_assert_equal( Array.from( out ), [ 5, -3 ] )
			$mol_assert_equal( Array.from( screen.take( out ) ), [ 0, 0 ] )
		},

	})

}
