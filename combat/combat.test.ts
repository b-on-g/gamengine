namespace $ {

	function owned() {
		const owner = new class extends $bog_gamengine_node {
			deaths = 0
			die() {
				++ this.deaths
			}
		}
		const fight = new $bog_gamengine_combat
		fight.owner( owner )
		return { owner, fight }
	}

	$mol_test({

		'hurt cuts health by the damage left after armor'() {
			const fight = new $bog_gamengine_combat
			fight.health_max( 40 )
			fight.armor( 3 )
			fight.hurt( 10 )
			$mol_assert_equal( fight.health(), 33 )
			$mol_assert_equal( fight.dead(), false )
		},

		'hurt down to zero kills and calls die of the owner once'() {
			const { owner, fight } = owned()
			fight.health_max( 10 )
			fight.hurt( 4 )
			$mol_assert_equal( owner.deaths, 0 )
			fight.hurt( 90 )
			$mol_assert_equal( fight.health(), 0 )
			$mol_assert_equal( fight.dead(), true )
			$mol_assert_equal( owner.deaths, 1 )
			fight.hurt( 5 )
			$mol_assert_equal( owner.deaths, 1 )
		},

		'death of an owner without die changes nothing but the health'() {
			const fight = new $bog_gamengine_combat
			fight.owner( new $bog_gamengine_node )
			fight.health_max( 5 )
			fight.hurt( 5 )
			$mol_assert_equal( fight.dead(), true )
		},

		'heal never goes above the maximum and revive brings the full health back'() {
			const fight = new $bog_gamengine_combat
			fight.health_max( 10 )
			fight.hurt( 6 )
			fight.heal( 100 )
			$mol_assert_equal( fight.health(), 10 )
			fight.hurt( 10 )
			fight.revive()
			$mol_assert_equal( fight.dead(), false )
			$mol_assert_equal( fight.health(), 10 )
		},

		'timer holds the next shot until one rate has passed'() {
			const fight = new $bog_gamengine_combat
			fight.rate( 2 )
			$mol_assert_equal( fight.ready( 0 ), true )
			fight.fire( 0 )
			$mol_assert_equal( fight.ready( 0.4 ), false )
			$mol_assert_equal( fight.ready( 0.5 ), true )
		},

		'timer takes the time of the scene clock of the owner'() {
			const scene = new $bog_gamengine_scene
			const clock = new $bog_gamengine_clock
			scene.clock( clock )
			const owner = new $bog_gamengine_node
			scene.kids([ owner ])
			const fight = new $bog_gamengine_combat
			fight.owner( owner )
			fight.rate( 1 )
			clock.time( 10 )
			fight.fire()
			clock.time( 10.5 )
			$mol_assert_equal( fight.ready(), false )
			clock.time( 11 )
			$mol_assert_equal( fight.ready(), true )
		},

	})

}
