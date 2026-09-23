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

		'add gives a node in nodes and lines in the source'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			const before = doc.source()
			const name = doc.add( '$bog_gamengine_sprite', { name: '\\Ключ', atlas: '<= Atlas', frame: '\\coin', pos: '/ 1 2 0' } )
			$mol_assert_equal( name, 'Sprite_1' )
			$mol_assert_equal( doc.nodes().map( node => node.title ), [ 'Герой', 'Монета', 'Стена', 'Ключ' ] )
			const lines = '\t\t<= Sprite_1 $bog_gamengine_sprite\n\t\t\tname \\Ключ\n\t\t\tatlas <= Atlas\n\t\t\tframe \\coin\n\t\t\tpos / 1 2 0\n'
			$mol_assert_ok( doc.source().includes( lines + '\tbatches /\n' ) )
			$mol_assert_equal( doc.source().replace( lines, '' ), before )
			$mol_assert_equal( doc.scene().nodes()[ 3 ].pos()[ 1 ], 2 )
		},

		'second add of the same class gives _2'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			doc.add( '$bog_gamengine_sprite', { atlas: '<= Atlas', frame: '\\coin' } )
			$mol_assert_equal( doc.add( '$bog_gamengine_sprite', { atlas: '<= Atlas', frame: '\\wall' } ), 'Sprite_2' )
			$mol_assert_equal( doc.nodes().map( node => node.title ), [ 'Герой', 'Монета', 'Стена', 'Sprite_1', 'Sprite_2' ] )
		},

		'add with a nested subview and add into batches'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			const mesh = doc.add( '$bog_gamengine_mesh', { shape: '<= Mesh_1_shape $bog_gamengine_shape_box\n\ttile 2' } )
			doc.add( '$bog_gamengine_batch', { shape: '<= Mesh_1_shape', nodes: '/ <= ' + mesh }, 'batches' )
			$mol_assert_ok( doc.source().includes( '\t\t\tshape <= Mesh_1_shape $bog_gamengine_shape_box\n\t\t\t\ttile 2\n\tbatches /\n' ) )
			$mol_assert_ok( doc.source().includes( '\t\t<= Batch_1 $bog_gamengine_batch\n\t\t\tshape <= Mesh_1_shape\n\t\t\tnodes / <= Mesh_1\n\tAtlas ' ) )
			$mol_assert_equal( doc.scene().batches().length, 3 )
		},

		'add_uri appends to the list without duplicates'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			doc.add_uri( 'Atlas', 'uris', 'bog/gamengine/demo/atlas/hero_1.png' )
			$mol_assert_ok( doc.source().includes( 'floor.png\n\t\t\t\\bog/gamengine/demo/atlas/hero_1.png\n\t\tsize 64\n' ) )
			const once = doc.source()
			doc.add_uri( 'Atlas', 'uris', 'bog/gamengine/demo/atlas/hero_1.png' )
			doc.add_uri( 'Atlas', 'uris', 'bog/gamengine/demo/atlas/coin.png' )
			$mol_assert_equal( doc.source(), once )
		},

		'add_uri with a name writes a dict entry and creates the missing dict'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			doc.declare( 'Sound', '$bog_gamengine_sound', {} )
			$mol_assert_ok( doc.source().endsWith( '\t\tsize 64\n\tSound $bog_gamengine_sound\n' ) )
			doc.add_uri( 'Sound', 'uris', 'bog/gamengine/demo/sound/coin.wav', 'coin' )
			doc.add_uri( 'Sound', 'uris', 'bog/gamengine/demo/sound/coin.wav', 'coin' )
			$mol_assert_ok( doc.source().endsWith( '\tSound $bog_gamengine_sound\n\t\turis *\n\t\t\tcoin \\bog/gamengine/demo/sound/coin.wav\n' ) )
			$mol_assert_equal( doc.scene().nodes().length, 3 )
		},

		'map of the sample is read row by row'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			$mol_assert_equal( doc.map().map( row => row.join( '' ) ), [ '######', '#....#', '#..#.#', '#....#', '######' ] )
		},

		'paint changes exactly one char of exactly one source line'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			const before = doc.source().split( '\n' )
			doc.paint( 2, 1, '#' )
			const after = doc.source().split( '\n' )
			$mol_assert_equal( after.length, before.length )
			const changed = before.map( ( line, index )=> index ).filter( index => before[ index ] !== after[ index ] )
			$mol_assert_equal( changed.length, 1 )
			$mol_assert_equal( before[ changed[ 0 ] ], '\t\t\\#....#' )
			$mol_assert_equal( after[ changed[ 0 ] ], '\t\t\\#.#..#' )
			$mol_assert_equal( doc.scene().nodes()[ 0 ].pos()[ 0 ], -2 )
		},

		'paint of the same char keeps the source'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			doc.paint( 0, 0, '#' )
			$mol_assert_equal( doc.source(), $bog_gamestudio_sample )
			doc.paint( 9, 9, '#' )
			$mol_assert_equal( doc.source(), $bog_gamestudio_sample )
		},

		'rect paints a rectangle'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			doc.rect( 3, 3, 1, 1, '#' )
			$mol_assert_equal( doc.map().map( row => row.join( '' ) ), [ '######', '####.#', '####.#', '####.#', '######' ] )
		},

		'fill stops at the walls'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			doc.fill( 1, 1, 'o' )
			$mol_assert_equal( doc.map().map( row => row.join( '' ) ), [ '######', '#oooo#', '#oo#o#', '#oooo#', '######' ] )
			const walled = doc.source()
			doc.fill( 0, 0, '#' )
			$mol_assert_equal( doc.source(), walled )
		},

		'map of emoji is painted by char index'( $ ) {
			const doc = open( $, $bog_gamestudio_sample.replace( '\t\t\\#..#.#', '\t\t\\#🌵🌵#🌵#' ) )
			$mol_assert_equal( doc.map()[ 2 ].join( '' ), '#🌵🌵#🌵#' )
			doc.paint( 2, 2, '.' )
			$mol_assert_equal( doc.map()[ 2 ].join( '' ), '#🌵.#🌵#' )
			$mol_assert_equal( doc.map()[ 1 ].join( '' ), '#....#' )
		},

		'syntax error fails with the parser message'( $ ) {
			const doc = open( $, $bog_gamestudio_sample.replace( '\tatlas <= Atlas', '\t\t\tatlas <= Atlas' ) )
			const error = $mol_assert_fail( ()=> doc.scene(), Error )
			$mol_assert_ok( error.message.startsWith( 'Too many tabs\nscene.view.tree#2:1/3' ) )
		},

		'unknown class fails with its name'( $ ) {
			const doc = open( $, $bog_gamestudio_sample.replace( '$bog_gamengine_sprite', '$' + 'bog_ghost' ) )
			$mol_assert_fail( ()=> doc.scene().nodes(), 'Unknown class $' + 'bog_ghost of Coin' )
		},

	})

}
