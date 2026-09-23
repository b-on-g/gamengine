namespace $ {

	function open( $: $, source: string ) {
		return $bog_gamestudio_doc.create( doc => {
			doc.$ = $
			doc.source( source )
		} )
	}

	$mol_test({

		'sample parses into three titled nodes'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			$mol_assert_equal( doc.nodes().map( node => node.title ), [ 'Герой', 'Монета', 'Стена' ] )
		},

		'set changes exactly one line of the source'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			const before = doc.source().split( '\n' )
			doc.set( 'Герой', 'pos', [ 3, 0, 0 ] )
			const after = doc.source().split( '\n' )
			$mol_assert_equal( after.length, before.length )
			const changed = before.filter( ( line, index )=> line !== after[ index ] )
			$mol_assert_equal( changed, [ '\t\t\tpos / -2 0 0' ] )
			$mol_assert_equal( after[ before.indexOf( changed[ 0 ] ) ], '\t\t\tpos / 3 0 0' )
		},

		'set adds a missing line to the node'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			doc.set( 'Стена', 'flip_x', true )
			$mol_assert_ok( doc.source().includes( '\t\t\tpos / 0 0 0\n\t\t\tflip_x true\n' ) )
		},

		'scene follows the document'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			$mol_assert_equal( doc.scene().nodes()[ 0 ].pos()[ 0 ], -2 )
			doc.set( 'Герой', 'pos', [ 3, 0, 0 ] )
			$mol_assert_equal( doc.scene().nodes()[ 0 ].pos()[ 0 ], 3 )
			$mol_assert_equal( doc.scene().nodes()[ 0 ].title(), 'Герой' )
		},

		'sample compiles into a class named after the root'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			$mol_assert_equal( doc.compile().klass.name, '$bog_gamestudio_sample' )
			$mol_assert_equal( doc.scene().nodes().map( node => node.title() ), [ 'Герой', 'Монета', 'Стена' ] )
		},

		'set gives a new scene with the new value'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			const before = doc.scene()
			doc.set( 'Герой', 'pos', [ 3, 0, 0 ] )
			$mol_assert_not( doc.scene() === before )
			$mol_assert_equal( doc.scene().nodes()[ 0 ].pos()[ 0 ], 3 )
		},

		'literal of a node is writable on the node without touching the source'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			const hero = doc.scene().nodes()[ 0 ] as $bog_gamengine_sprite
			hero.pos([ 5, 0, 0 ])
			$mol_assert_equal( hero.pos()[ 0 ], 5 )
			hero.frame( 'coin' )
			$mol_assert_equal( hero.frame(), 'coin' )
			$mol_assert_equal( doc.source(), $bog_gamestudio_sample )
			doc.set( 'Герой', 'pos', [ 3, 0, 0 ] )
			$mol_assert_equal( doc.scene().nodes()[ 0 ].pos()[ 0 ], 3 )
			$mol_assert_equal( ( doc.scene().nodes()[ 0 ] as $bog_gamengine_sprite ).frame(), 'hero' )
		},

		'clock survives the recompilation'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			const clock = doc.scene().clock()
			doc.set( 'Герой', 'pos', [ 3, 0, 0 ] )
			$mol_assert_ok( doc.scene().clock() === clock )
		},

		'syntax error fails with the parser message'( $ ) {
			const doc = open( $, $bog_gamestudio_sample.replace( '\tkids /', '\t\t\tkids /' ) )
			const error = $mol_assert_fail( ()=> doc.scene(), Error )
			$mol_assert_ok( error.message.startsWith( 'Too many tabs\nscene.view.tree#2:1/3' ) )
		},

		'unknown class fails with its name'( $ ) {
			const doc = open( $, $bog_gamestudio_sample.replace( '$bog_gamengine_sprite', '$' + 'bog_ghost' ) )
			$mol_assert_fail( ()=> doc.scene().nodes(), 'Unknown class $' + 'bog_ghost of Coin' )
		},

	})

}
