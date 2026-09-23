namespace $ {

	class $bog_gamengine_brain_fsm_test_owner extends $bog_gamengine_node {

		@ $mol_mem
		tired( next = false ) {
			return next
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'tired', kind: 'flag', get: ()=> this.tired(), set: next => this.tired( Boolean( next ) ) },
			]
		}

	}

	class $bog_gamengine_brain_fsm_test_state extends $bog_gamengine_brain_state {

		enters = 0
		exits = 0

		enter() {
			++ this.enters
		}

		exit() {
			++ this.exits
		}

	}

	class $bog_gamengine_brain_fsm_test_always extends $bog_gamengine_brain_fsm {

		cond( name: string ) {
			return name === 'always'
		}

	}

	function fsm_test_make( fsm = new $bog_gamengine_brain_fsm, when = 'tired' ) {
		const owner = new $bog_gamengine_brain_fsm_test_owner
		const idle = new $bog_gamengine_brain_fsm_test_state
		idle.name( 'idle' )
		idle.next([ { to: 'rest', when } ])
		const rest = new $bog_gamengine_brain_fsm_test_state
		rest.name( 'rest' )
		fsm.kids([ idle, rest ])
		fsm.owner( owner )
		return { owner, idle, rest, fsm }
	}

	$mol_test({

		'state is the first one before the flag and the second is not entered'() {
			const { idle, rest, fsm } = fsm_test_make()
			fsm.step( 0.016 )
			fsm.step( 0.016 )
			$mol_assert_equal( fsm.state(), 'idle' )
			$mol_assert_equal( idle.enters, 1 )
			$mol_assert_equal( rest.enters, 0 )
		},

		'flag of the owner switches state with one exit and one enter'() {
			const { owner, idle, rest, fsm } = fsm_test_make()
			fsm.step( 0.016 )
			owner.tired( true )
			fsm.step( 0.016 )
			fsm.step( 0.016 )
			$mol_assert_equal( fsm.state(), 'rest' )
			$mol_assert_equal( idle.exits, 1 )
			$mol_assert_equal( rest.enters, 1 )
		},

		'condition overridden by descendant switches without owner props'() {
			const { rest, fsm } = fsm_test_make( new $bog_gamengine_brain_fsm_test_always, 'always' )
			fsm.step( 0.016 )
			$mol_assert_equal( fsm.state(), 'rest' )
			$mol_assert_equal( rest.enters, 1 )
		},

		'props end with state text'() {
			const { fsm } = fsm_test_make()
			const prop = fsm.props().at( -1 )!
			$mol_assert_equal( prop.name, 'state' )
			$mol_assert_equal( prop.kind, 'text' )
			$mol_assert_equal( prop.get(), 'idle' )
		},

	})

}
