namespace $ {

	function marked() {
		return new class extends $bog_gamengine_combat {
			deaths = 0
			die() {
				++ this.deaths
			}
		}
	}

	$mol_test({

		'hurt cuts health by the damage left after armor'() {
			const unit = new $bog_gamengine_combat
			unit.health_max( 40 )
			unit.armor( 3 )
			unit.hurt( 10 )
			$mol_assert_equal( unit.health(), 33 )
			$mol_assert_equal( unit.dead(), false )
		},

		'hurt down to zero kills and calls die once'() {
			const unit = marked()
			unit.health_max( 10 )
			unit.hurt( 4 )
			$mol_assert_equal( unit.deaths, 0 )
			unit.hurt( 90 )
			$mol_assert_equal( unit.health(), 0 )
			$mol_assert_equal( unit.dead(), true )
			$mol_assert_equal( unit.deaths, 1 )
			unit.hurt( 5 )
			$mol_assert_equal( unit.deaths, 1 )
		},

		'heal never goes above the maximum'() {
			const unit = new $bog_gamengine_combat
			unit.health_max( 10 )
			unit.hurt( 6 )
			unit.heal( 100 )
			$mol_assert_equal( unit.health(), 10 )
		},

		'timer holds the next shot until one rate has passed'() {
			const unit = new $bog_gamengine_combat
			unit.rate( 2 )
			$mol_assert_equal( unit.ready( 0 ), true )
			unit.fire( 0 )
			$mol_assert_equal( unit.ready( 0.4 ), false )
			$mol_assert_equal( unit.ready( 0.5 ), true )
		},

	})

}
