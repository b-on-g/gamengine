namespace $ {

	function $bog_gamengine_demo_crumb2_rule_stage( spots: readonly ( readonly number[] )[] ) {
		const hero = new $bog_gamengine_node
		hero.pos( new Float32Array([ 0, 0, 0 ]) )
		const crumbs = spots.map( spot => {
			const crumb = new $bog_gamengine_node
			crumb.pos( new Float32Array([ spot[ 0 ], spot[ 1 ], 0 ]) )
			return crumb
		} )
		const rule = new $bog_gamengine_demo_crumb2_rule
		rule.hero( hero )
		rule.crumbs( crumbs )
		return { hero, crumbs, rule }
	}

	$mol_test({

		'crumb under the hero is taken and hidden'() {
			const { hero, crumbs, rule } = $bog_gamengine_demo_crumb2_rule_stage([ [ 0.2, 0 ], [ 5, 5 ] ])
			rule.step( 0.1 )
			$mol_assert_equal( rule.taken(), 1 )
			$mol_assert_equal( crumbs[ 0 ].hidden, true )
			$mol_assert_equal( crumbs[ 1 ].hidden, false )
			$mol_assert_equal( rule.left(), 1 )
			$mol_assert_equal( hero.hidden, false )
		},

		'all crumbs taken is a win'() {
			const { hero, rule } = $bog_gamengine_demo_crumb2_rule_stage([ [ 0.2, 0 ], [ 3, 0 ] ])
			rule.step( 0.1 )
			$mol_assert_equal( rule.won(), false )
			hero.pos( new Float32Array([ 3, 0, 0 ]) )
			rule.step( 0.1 )
			$mol_assert_equal( rule.won(), true )
			$mol_assert_equal( rule.over(), true )
			$mol_assert_equal( rule.lost(), false )
		},

		'time over without all crumbs is a loss'() {
			const { rule } = $bog_gamengine_demo_crumb2_rule_stage([ [ 5, 5 ] ])
			rule.limit( 2 )
			rule.step( 1 )
			$mol_assert_equal( rule.lost(), false )
			$mol_assert_equal( rule.rest(), 1 )
			rule.step( 1 )
			$mol_assert_equal( rule.rest(), 0 )
			$mol_assert_equal( rule.lost(), true )
		},

		'restart brings the crumbs back'() {
			const { crumbs, rule } = $bog_gamengine_demo_crumb2_rule_stage([ [ 0.2, 0 ] ])
			rule.step( 0.1 )
			$mol_assert_equal( rule.won(), true )
			rule.restart()
			$mol_assert_equal( rule.taken(), 0 )
			$mol_assert_equal( rule.spent(), 0 )
			$mol_assert_equal( crumbs[ 0 ].hidden, false )
		},

	})

}
