namespace $ {

	const map = '####\n#..#\n####'

	const room = '#####\n#...#\n#...#\n#...#\n#####'

	class Probe extends $bog_gamengine_phys_body {
		hits = [] as ( $bog_gamengine_phys_body | null )[]
		normals = [] as number[][]
		hit( other: $bog_gamengine_phys_body | null, normal?: ArrayLike< number > ) {
			this.hits.push( other )
			this.normals.push( normal ? [ normal[ 0 ], normal[ 1 ] ] : [] )
		}
		last_normal() {
			return this.normals[ this.normals.length - 1 ]
		}
	}

	function room_phys( body: $bog_gamengine_phys_body, gy: number ) {
		const tile = new $bog_gamengine_phys_tile
		tile.map( room )
		const phys = new $bog_gamengine_phys
		phys.tile( tile )
		phys.gravity( new Float32Array([ 0, gy ]) )
		phys.bodies([ body ])
		return phys
	}

	function falling( steps: number ) {
		const body = new Probe
		body.pos( new Float32Array([ 2.5, -1.5, 0 ]) )
		const phys = room_phys( body, -10 )
		for( let i = 0; i < steps; ++i ) phys.step( 0.1 )
		return body
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

		'moving body passes through ghost and both get hit'() {
			const ghost = new Probe
			ghost.ghost( true )
			const mover = new Probe
			mover.pos( new Float32Array([ 0.5, 0, 0 ]) )
			mover.vel( new Float32Array([ 1, 0, 0 ]) )
			const phys = new $bog_gamengine_phys
			phys.bodies([ ghost, mover ])
			phys.step( 0.1 )
			$mol_assert_equal( ghost.pos()[ 0 ], 0 )
			$mol_assert_ok( Math.abs( mover.pos()[ 0 ] - 0.6 ) < 1e-6 )
			$mol_assert_equal( ghost.hits, [ mover ] )
			$mol_assert_equal( mover.hits, [ ghost ] )
		},

		'ghost inside tile wall is not pushed out'() {
			const ghost = new Probe
			ghost.ghost( true )
			ghost.pos( new Float32Array([ 0.5, -0.5, 0 ]) )
			const tile = new $bog_gamengine_phys_tile
			tile.map( map )
			const phys = new $bog_gamengine_phys
			phys.tile( tile )
			phys.bodies([ ghost ])
			phys.step( 0.1 )
			$mol_assert_equal( ghost.pos()[ 0 ], 0.5 )
			$mol_assert_equal( ghost.pos()[ 1 ], -0.5 )
			$mol_assert_equal( ghost.hits, [] )
		},

		'gravity drops the body onto the tile floor'() {
			$mol_assert_equal( falling( 8 ).pos()[ 1 ], -3.5 )
		},

		'landed body stands on ground'() {
			const body = falling( 8 )
			$mol_assert_equal( body.on_ground(), true )
			$mol_assert_equal( body.touched & $bog_gamengine_phys_body.side_down, $bog_gamengine_phys_body.side_down )
		},

		'landed body gets hit with the normal up'() {
			$mol_assert_equal( falling( 8 ).last_normal(), [ 0, 1 ] )
		},

		'jump up stops at the ceiling'() {
			const body = new Probe
			body.pos( new Float32Array([ 2.5, -3.5, 0 ]) )
			body.vel( new Float32Array([ 0, 10, 0 ]) )
			const phys = room_phys( body, -10 )
			for( let i = 0; i < 3; ++i ) phys.step( 0.1 )
			$mol_assert_equal( body.pos()[ 1 ], -1.5 )
			$mol_assert_equal( body.on_ceil(), true )
			$mol_assert_equal( body.last_normal(), [ 0, -1 ] )
		},

		'body running into a wall touches it aside'() {
			const body = new Probe
			body.pos( new Float32Array([ 2.5, -2.5, 0 ]) )
			body.vel( new Float32Array([ 10, 0, 0 ]) )
			const phys = room_phys( body, 0 )
			phys.step( 0.1 )
			$mol_assert_equal( body.on_wall(), true )
			$mol_assert_equal( body.on_ground(), false )
			$mol_assert_equal( body.last_normal(), [ -1, 0 ] )
		},

		'gravity does not move a ghost'() {
			const body = new Probe
			body.ghost( true )
			body.pos( new Float32Array([ 2.5, -1.5, 0 ]) )
			const phys = room_phys( body, -10 )
			phys.step( 0.1 )
			$mol_assert_equal( body.pos()[ 1 ], -1.5 )
			$mol_assert_equal( body.vel()[ 1 ], 0 )
		},

		'gravity does not move a still body'() {
			const body = new Probe
			body.still( true )
			body.pos( new Float32Array([ 2.5, -1.5, 0 ]) )
			const phys = room_phys( body, -10 )
			phys.step( 0.1 )
			$mol_assert_equal( body.pos()[ 1 ], -1.5 )
			$mol_assert_equal( body.vel()[ 1 ], 0 )
		},

		'body with read-only pos fails by name'() {
			class Stuck extends $bog_gamengine_phys_body {
				fixed = new Float32Array([ 2.5, -1.5, 0 ])
				pos() {
					return this.fixed
				}
			}
			const body = new Stuck
			body.vel( new Float32Array([ 1, 0, 0 ]) )
			const phys = new $bog_gamengine_phys
			phys.bodies([ body ])
			$mol_assert_fail(
				()=> phys.step( 0.1 ),
				'Stuck: pos is read-only, declare it as `pos? <=>`',
			)
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

		'step_ms is zero before the first step and a time after it'() {
			const phys = new $bog_gamengine_phys
			$mol_assert_equal( phys.step_ms(), 0 )
			phys.step( 1 / 60 )
			$mol_assert_equal( phys.samples, 1 )
			$mol_assert_ok( phys.step_ms() >= 0 )
		},

	})

}
