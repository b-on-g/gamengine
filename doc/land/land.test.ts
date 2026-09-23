namespace $ {

	class $bog_gamestudio_doc_land_stub extends $bog_gamestudio_doc_land {

		clock = 1e6
		beats = 0
		seen_at = new Map< string, number >()

		@ $mol_mem
		text( next = '' ) {
			return next
		}

		now() {
			return this.clock
		}

		stamp() {
			return this.clock
		}

		me() {
			return 'me'
		}

		read() {
			return this.text()
		}

		write( text: string ) {
			this.text( text )
		}

		me_mate() {
			return {} as $bog_gamestudio_doc_land_mate
		}

		seen( id: string ) {
			return this.seen_at.get( id ) ?? 0
		}

		beat( mate: $bog_gamestudio_doc_land_mate, name: string, pick: string, spot: number[], now: number ) {
			++ this.beats
			this.seen_at.set( this.me(), now )
		}

	}

	function opened( $: $ ) {
		const land = $bog_gamestudio_doc_land_stub.create( land => land.$ = $ )
		land.text( $bog_gamestudio_sample )
		const doc = $bog_gamestudio_doc.create( doc => {
			doc.$ = $
			doc.land( land )
		} )
		return { land, doc }
	}

	$mol_test({

		'set of a document with a land rewrites the text of the land'( $ ) {
			const { land, doc } = opened( $ )
			doc.set( 'Герой', 'pos', [ 3, 0, 0 ] )
			$mol_assert_not( land.text().includes( 'pos / 3 0 0' ) )
			$mol_after_mock_warp()
			$mol_assert_ok( land.text().includes( 'pos / 3 0 0' ) )
			$mol_assert_equal( doc.source(), land.text() )
			$mol_assert_equal( doc.nodes()[ 0 ].props.pos.toString(), 'pos / 3 0 0\n' )
		},

		'presence is written once per rate interval and not more often'( $ ) {
			const { land } = opened( $ )
			land.push( 'Герой', [ 1, 2 ] )
			land.push( 'Герой', [ 1.5, 2 ] )
			land.push( 'Герой', [ 2, 2 ] )
			$mol_after_mock_warp()
			$mol_assert_equal( land.pushes, 1 )
			$mol_assert_equal( land.beats, 1 )
		},

		'presence is written again once the rate gap passed'( $ ) {
			const { land } = opened( $ )
			land.push( 'Герой', [ 1, 2 ] )
			land.clock += 1000 / land.rate()
			land.push( 'Герой', [ 2, 2 ] )
			$mol_after_mock_warp()
			$mol_assert_equal( land.beats, 2 )
		},

		'mate that stopped writing is gone after the timeout'( $ ) {
			const { land } = opened( $ )
			land.seen_at.set( 'other', land.clock )
			$mol_assert_ok( land.present( 'other' ) )
			land.clock += land.timeout() * 1000
			$mol_assert_not( land.present( 'other' ) )
		},

	})

}
