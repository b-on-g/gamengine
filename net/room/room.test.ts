namespace $ {

	class $bog_gamengine_net_room_stub extends $bog_gamengine_net_room {

		sent = 0
		clock = 1e6

		now() {
			return this.clock
		}

		me_player() {
			return {} as $bog_gamengine_net_player
		}

		send( player: $bog_gamengine_net_player, pos: number[], rot: number[], state: string, beat: number ) {
			++ this.sent
		}

	}

	$mol_test({

		'me is the same for two rooms with one link in one context'( $ ) {
			const first = $bog_gamengine_net_room.create( room => room.$ = $ )
			const second = $bog_gamengine_net_room.create( room => room.$ = $ )
			first.link( 'test-room' )
			second.link( 'test-room' )
			$mol_assert_equal( first.me().length, 8 )
			$mol_assert_equal( first.me(), second.me() )
		},

		'me differs between rooms'( $ ) {
			const first = $bog_gamengine_net_room.create( room => room.$ = $ )
			const second = $bog_gamengine_net_room.create( room => room.$ = $ )
			first.link( 'room-a' )
			second.link( 'room-b' )
			$mol_assert_unique( first.me(), second.me() )
		},

		'push does not write while the body stays still'( $ ) {
			const room = $bog_gamengine_net_room_stub.create( room => room.$ = $ )
			room.link( 'test-room' )
			const body = new $bog_gamengine_node
			room.push( body )
			room.push( body )
			room.push( body )
			$mol_after_mock_warp()
			$mol_assert_equal( room.pushes, 1 )
			$mol_assert_equal( room.sent, 1 )
		},

		'push writes again once the body moved and the rate gap passed'( $ ) {
			const room = $bog_gamengine_net_room_stub.create( room => room.$ = $ )
			room.link( 'test-room' )
			const body = new $bog_gamengine_node
			room.push( body )
			room.clock += 1000 / room.rate()
			body.pos([ 1, 0, 0 ])
			room.push( body )
			$mol_after_mock_warp()
			$mol_assert_equal( room.pushes, 2 )
			$mol_assert_equal( room.sent, 2 )
		},

		'still body beats once the timeout half passed'( $ ) {
			const room = $bog_gamengine_net_room_stub.create( room => room.$ = $ )
			room.link( 'test-room' )
			const body = new $bog_gamengine_node
			room.push( body )
			room.clock += 1000 / room.rate()
			room.push( body )
			$mol_assert_equal( room.pushes, 1 )
			room.clock += room.timeout() * 500
			room.push( body )
			$mol_after_mock_warp()
			$mol_assert_equal( room.pushes, 2 )
			$mol_assert_equal( room.sent, 2 )
		},

	})

}
