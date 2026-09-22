namespace $ {

	const map = '####\n#..#\n####'

	class Probe extends $bog_gamengine_phys_body {
		hits = [] as ( $bog_gamengine_phys_body | null )[]
		hit( other: $bog_gamengine_phys_body | null ) {
			this.hits.push( other )
		}
	}

	function flying() {
		const body = new Probe
		body.pos( new Float32Array([ 1.5, -1.5, 0 ]) )
		body.vel( new Float32Array([ 10, 0, 0 ]) )
		const tile = new $bog_gamengine_phys_tile
		tile.map( map )
		const phys = new $bog_gamengine_phys
		phys.tile( tile )
		phys.bodies([ body ])
		phys.step( 0.1 )
		return body
	}

	function pair( a_still: boolean ) {
		const a = new Probe
		a.still( a_still )
		const b = new Probe
		b.pos( new Float32Array([ 0.5, 0, 0 ]) )
		const phys = new $bog_gamengine_phys
		phys.bodies([ a, b ])
		phys.step( 0.1 )
		return [ a, b ]
	}

	$mol_test({

		'body flying into tile wall stops at its face'() {
			const body = flying()
			$mol_assert_ok( Math.abs( body.pos()[ 0 ] - 2.5 ) < 1e-6 )
		},

		'body flying into tile wall loses velocity along that axis'() {
			$mol_assert_equal( flying().vel()[ 0 ], 0 )
		},

		'body flying into tile wall gets hit with null'() {
			$mol_assert_equal( flying().hits, [ null ] )
		},

		'two moving bodies push apart equally'() {
			const [ a, b ] = pair( false )
			$mol_assert_equal( a.pos()[ 0 ], -0.25 )
			$mol_assert_equal( b.pos()[ 0 ], 0.75 )
		},

		'two moving bodies hit each other'() {
			const [ a, b ] = pair( false )
			$mol_assert_equal( a.hits, [ b ] )
			$mol_assert_equal( b.hits, [ a ] )
		},

		'moving body is pushed out of still one entirely'() {
			const [ a, b ] = pair( true )
			$mol_assert_equal( a.pos()[ 0 ], 0 )
			$mol_assert_equal( b.pos()[ 0 ], 1 )
		},

		'tile cell beyond map edge is solid'() {
			const tile = new $bog_gamengine_phys_tile
			tile.map( map )
			$mol_assert_equal( tile.cell( -1, 1 ), true )
			$mol_assert_equal( tile.cell( 4, 1 ), true )
			$mol_assert_equal( tile.cell( 1, 3 ), true )
		},

		'tile solid_at reads free world point'() {
			const tile = new $bog_gamengine_phys_tile
			tile.map( map )
			$mol_assert_equal( tile.solid_at( 1.5, -1.5 ), false )
		},

		'tile solid_at reads wall world point'() {
			const tile = new $bog_gamengine_phys_tile
			tile.map( map )
			$mol_assert_equal( tile.solid_at( 0.5, -0.5 ), true )
		},

	})

}
