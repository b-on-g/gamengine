namespace $ {

	class $bog_gamengine_brain_bt_test_owner extends $bog_gamengine_node {

		@ $mol_mem
		alive( next = false ) {
			return next
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'alive', kind: 'flag', get: ()=> this.alive(), set: next => this.alive( Boolean( next ) ) },
			]
		}

	}

	class $bog_gamengine_brain_bt_test_walker extends $bog_gamengine_node {

		close = false

		near() {
			return this.close
		}

	}

	class $bog_gamengine_brain_bt_test_act extends $bog_gamengine_brain_bt_act {

		ticks = 0
		result: $bog_gamengine_brain_bt_status = 'ok'

		tick( dt: number, brain: $bog_gamengine_brain_bt ) {
			++ this.ticks
			return this.status_now = this.result
		}

	}

	function bt_test_act( result: $bog_gamengine_brain_bt_status = 'ok' ) {
		const act = new $bog_gamengine_brain_bt_test_act
		act.result = result
		return act
	}

	function bt_test_root( kid: $bog_gamengine_brain_bt_node ) {
		const root = new $bog_gamengine_brain_bt
		root.kids([ kid ])
		return root
	}

	$mol_test({

		'seq does not tick the action while waiting and ticks it with ok after 0.1 s'() {
			const wait = new $bog_gamengine_brain_bt_wait
			wait.seconds( 0.1 )
			const act = bt_test_act()
			const seq = new $bog_gamengine_brain_bt_seq
			seq.kids([ wait, act ])
			const root = bt_test_root( seq )
			root.step( 0.05 )
			$mol_assert_equal( act.ticks, 0 )
			$mol_assert_equal( root.status(), 'run' )
			root.step( 0.05 )
			$mol_assert_equal( act.ticks, 1 )
			$mol_assert_equal( root.status(), 'ok' )
		},

		'sel picks the second when the first fails'() {
			const first = bt_test_act( 'fail' )
			const second = bt_test_act()
			const sel = new $bog_gamengine_brain_bt_sel
			sel.kids([ first, second ])
			const root = bt_test_root( sel )
			root.step( 0.016 )
			$mol_assert_equal( first.ticks, 1 )
			$mol_assert_equal( second.ticks, 1 )
			$mol_assert_equal( root.status(), 'ok' )
		},

		'inv turns ok into fail'() {
			const inv = new $bog_gamengine_brain_bt_inv
			inv.kids([ bt_test_act() ])
			const root = bt_test_root( inv )
			root.step( 0.016 )
			$mol_assert_equal( root.status(), 'fail' )
		},

		'par waits for all kids'() {
			const slow = bt_test_act( 'run' )
			const par = new $bog_gamengine_brain_bt_par
			par.kids([ slow, bt_test_act() ])
			const root = bt_test_root( par )
			root.step( 0.016 )
			$mol_assert_equal( root.status(), 'run' )
			slow.result = 'ok'
			root.step( 0.016 )
			$mol_assert_equal( root.status(), 'ok' )
		},

		'cond follows a method of the owner'() {
			const owner = new $bog_gamengine_brain_bt_test_walker
			const cond = new $bog_gamengine_brain_bt_cond
			cond.when( 'near' )
			const root = bt_test_root( cond )
			root.owner( owner )
			root.step( 0.016 )
			$mol_assert_equal( root.status(), 'fail' )
			owner.close = true
			root.step( 0.016 )
			$mol_assert_equal( root.status(), 'ok' )
		},

		'cond follows the flag of the owner'() {
			const owner = new $bog_gamengine_brain_bt_test_owner
			const cond = new $bog_gamengine_brain_bt_cond
			cond.when( 'alive' )
			const root = bt_test_root( cond )
			root.owner( owner )
			root.step( 0.016 )
			$mol_assert_equal( root.status(), 'fail' )
			owner.alive( true )
			root.step( 0.016 )
			$mol_assert_equal( root.status(), 'ok' )
		},

	})

}
