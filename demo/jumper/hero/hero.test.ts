namespace $ {

	function hero_test( y: number ) {
		const tile = new $bog_gamengine_phys_tile
		tile.map( '....\n####' )
		const key = new $bog_gamengine_key
		key.bind({ jump: [ 'space' ], left: [ 'A' ], right: [ 'D' ] })
		const input = new $bog_gamengine_input
		input.key( key )
		const hero = new $bog_gamengine_demo_jumper_hero
		hero.input( input )
		hero.start( new Float32Array([ 0.5, -0.6, 0 ]) )
		hero.pos( new Float32Array([ 0.5, y, 0 ]) )
		hero.vel( new Float32Array([ 0, -1, 0 ]) )
		const phys = new $bog_gamengine_phys
		phys.tile( tile )
		phys.bodies([ hero ])
		phys.step( 1 / 60 )
		return { hero, key }
	}

	$mol_test({

		'hero standing on the ground jumps up'() {
			const { hero, key } = hero_test( -0.6 )
			$mol_assert_equal( hero.on_ground(), true )
			key.pressed( 'space', true )
			hero.step( 1 / 60 )
			$mol_assert_ok( hero.vel()[ 1 ] > 0 )
		},

		'hero in the air does not jump'() {
			const { hero, key } = hero_test( -0.3 )
			$mol_assert_equal( hero.on_ground(), false )
			key.pressed( 'space', true )
			hero.step( 1 / 60 )
			$mol_assert_ok( hero.vel()[ 1 ] < 0 )
		},

		'hero touching a coin takes it once'() {
			const { hero } = hero_test( -0.6 )
			const coin = new $bog_gamengine_demo_jumper_item
			coin.role( 'coin' )
			hero.hit( coin )
			hero.hit( coin )
			$mol_assert_equal( coin.taken(), true )
			$mol_assert_equal( hero.coins(), 1 )
		},

		'hero touching a spike loses a life and starts over'() {
			const { hero } = hero_test( -0.6 )
			const spike = new $bog_gamengine_demo_jumper_item
			spike.role( 'spike' )
			hero.hit( spike )
			$mol_assert_equal( hero.lives(), 2 )
			$mol_assert_equal( hero.pos()[ 1 ], hero.start()[ 1 ] )
		},

		'hero reaching the flag wins and stands still'() {
			const { hero, key } = hero_test( -0.6 )
			const flag = new $bog_gamengine_demo_jumper_item
			flag.role( 'flag' )
			hero.hit( flag )
			$mol_assert_equal( hero.won(), true )
			key.pressed( 'D', true )
			hero.step( 1 / 60 )
			$mol_assert_equal( hero.vel()[ 0 ], 0 )
		},

		'hero falling on an enemy kills it, touching aside loses a life'() {
			const stomp = hero_test( -0.6 ).hero
			const enemy = new $bog_gamengine_demo_jumper_enemy
			enemy.pos( new Float32Array([ 0.5, -1.4, 0 ]) )
			stomp.vel( new Float32Array([ 0, -5, 0 ]) )
			stomp.hit( enemy )
			$mol_assert_equal( enemy.dead(), true )
			$mol_assert_ok( stomp.vel()[ 1 ] > 0 )
			const side = hero_test( -0.6 ).hero
			const walker = new $bog_gamengine_demo_jumper_enemy
			walker.pos( new Float32Array([ 1.2, -0.6, 0 ]) )
			side.hit( walker )
			$mol_assert_equal( walker.dead(), false )
			$mol_assert_equal( side.lives(), 2 )
		},

	})

}
