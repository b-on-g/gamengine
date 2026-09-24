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

	class $bog_gamengine_brain_fsm_test_time extends $mol_state_time {

		@ $mol_mem
		static stamp( next = 0 ) {
			return next
		}

		static now( precision: number ) {
			return this.stamp()
		}

	}

	class $bog_gamengine_brain_fsm_test_walker extends $bog_gamengine_node {

		seen = ''
		stopped = false

		Brain = new $bog_gamengine_brain_fsm

		stop() {
			return this.stopped
		}

		kids() {
			return [ this.Brain ] as readonly $bog_gamengine_node[]
		}

		step( dt: number ) {
			this.seen = this.Brain.state()
		}

	}

	function fsm_test_walker() {
		const walker = new $bog_gamengine_brain_fsm_test_walker
		const walk = new $bog_gamengine_brain_state
		walk.name( 'walk' )
		walk.next([ { to: 'stop', when: 'stop' } ])
		const stop = new $bog_gamengine_brain_state
		stop.name( 'stop' )
		walker.Brain.kids([ walk, stop ])
		return walker
	}

	$mol_test({

		'owner set on a bare machine does not loop through ownership'() {
			const host = new $bog_gamengine_node
			const brain = new $bog_gamengine_brain_fsm
			brain.owner( host )
			$mol_assert_equal( brain.owner(), host )
			$mol_assert_equal( brain.$, brain.$ )
		},

		'condition comes from a method of the owner'() {
			const walker = fsm_test_walker()
			walker.Brain.owner( walker )
			walker.Brain.step( 0.016 )
			$mol_assert_equal( walker.Brain.state(), 'walk' )
			walker.stopped = true
			walker.Brain.step( 0.016 )
			$mol_assert_equal( walker.Brain.state(), 'stop' )
		},

		'state knows the owner of its machine'() {
			const { owner, idle } = fsm_test_make()
			$mol_assert_equal( idle.owner(), owner )
			$mol_assert_equal( new $bog_gamengine_brain_state().owner(), null )
		},

		'machine switches state before its owner steps in the same frame'( $ ) {
			$.$mol_state_time = $bog_gamengine_brain_fsm_test_time
			const walker = fsm_test_walker()
			const scene = new $bog_gamengine_scene
			scene.$ = $
			scene.kids = ()=> [ walker ]
			$bog_gamengine_brain_fsm_test_time.stamp( 0 )
			scene.step()
			$bog_gamengine_brain_fsm_test_time.stamp( 16 )
			scene.step()
			$mol_assert_equal( walker.seen, 'walk' )
			walker.stopped = true
			$bog_gamengine_brain_fsm_test_time.stamp( 32 )
			scene.step()
			$mol_assert_equal( walker.seen, 'stop' )
		},

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
