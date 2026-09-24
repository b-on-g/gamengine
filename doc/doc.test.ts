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
			doc.set( 'Hero', 'pos', [ 3, 0, 0 ] )
			const after = doc.source().split( '\n' )
			$mol_assert_equal( after.length, before.length )
			const changed = before.filter( ( line, index )=> line !== after[ index ] )
			$mol_assert_equal( changed, [ '\t\t\tpos / -2 0 0' ] )
			$mol_assert_equal( after[ before.indexOf( changed[ 0 ] ) ], '\t\t\tpos / 3 0 0' )
		},

		'set adds a missing line to the node'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			doc.set( 'Wall', 'flip_x', true )
			$mol_assert_ok( doc.source().includes( '\t\t\tpos / 0 0 0\n\t\t\tflip_x true\n' ) )
		},

		'scene follows the document'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			$mol_assert_equal( doc.scene().nodes()[ 0 ].pos()[ 0 ], -2 )
			doc.set( 'Hero', 'pos', [ 3, 0, 0 ] )
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
			doc.set( 'Hero', 'pos', [ 3, 0, 0 ] )
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
			doc.set( 'Hero', 'pos', [ 3, 0, 0 ] )
			$mol_assert_equal( doc.scene().nodes()[ 0 ].pos()[ 0 ], 3 )
			$mol_assert_equal( ( doc.scene().nodes()[ 0 ] as $bog_gamengine_sprite ).frame(), 'hero' )
		},

		'clock survives the recompilation'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			const clock = doc.scene().clock()
			doc.set( 'Hero', 'pos', [ 3, 0, 0 ] )
			$mol_assert_ok( doc.scene().clock() === clock )
		},

		'add gives a node in nodes and lines in the source'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			const before = doc.source()
			const name = doc.add( '$bog_gamengine_sprite', { name: '\\Ключ', atlas: '<= Atlas', frame: '\\coin', pos: '/ 1 2 0' } )
			$mol_assert_equal( name, 'Sprite_1' )
			$mol_assert_equal( doc.nodes().map( node => node.title ), [ 'Герой', 'Монета', 'Стена', 'Ключ' ] )
			const lines = '\t\t<= Sprite_1 $bog_gamengine_sprite\n\t\t\tname \\Ключ\n\t\t\tatlas <= Atlas\n\t\t\tframe \\coin\n\t\t\tpos / 1 2 0\n'
			$mol_assert_ok( doc.source().includes( lines + '\tAtlas $bog_gamengine_atlas\n' ) )
			$mol_assert_equal( doc.source().replace( lines, '' ), before )
			$mol_assert_equal( doc.scene().nodes()[ 3 ].pos()[ 1 ], 2 )
		},

		'second add of the same class gives _2'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			doc.add( '$bog_gamengine_sprite', { atlas: '<= Atlas', frame: '\\coin' } )
			$mol_assert_equal( doc.add( '$bog_gamengine_sprite', { atlas: '<= Atlas', frame: '\\wall' } ), 'Sprite_2' )
			$mol_assert_equal( doc.nodes().map( node => node.title ), [ 'Герой', 'Монета', 'Стена', 'Sprite_1', 'Sprite_2' ] )
		},

		'add with a nested subview makes no batch of its own'( $ ) {
			const doc = open( $, $bog_gamestudio_sample )
			const mesh = doc.add( '$bog_gamengine_mesh', { atlas: '<= Atlas', shape: '<= Mesh_1_shape $bog_gamengine_shape_box\n\ttile 2' } )
			$mol_assert_equal( mesh, 'Mesh_1' )
			$mol_assert_ok( doc.source().includes( '\t\t\tshape <= Mesh_1_shape $bog_gamengine_shape_box\n\t\t\t\ttile 2\n\tAtlas ' ) )
			$mol_assert_not( doc.source().includes( '$bog_gamengine_batch' ) )
			const batches = doc.scene().batches()
			$mol_assert_equal( batches.filter( batch => batch.shape() instanceof $bog_gamengine_shape_box ).length, 1 )
		},

		'list rows are read from the document'( $ ) {
			const doc = open( $, $bog_gamestudio_sample_brain )
			$mol_assert_equal( doc.list_rows( 'Walk', 'next' ), [ { to: 'Ждёт', when: 'near' } ] )
		},

		'edit of a list row changes exactly one line of the source'( $ ) {
			const doc = open( $, $bog_gamestudio_sample_brain )
			const before = doc.source().split( '\n' )
			doc.list_set( 'Walk', 'next', 0, 'when', 'far' )
			const after = doc.source().split( '\n' )
			$mol_assert_equal( after.length, before.length )
			const changed = before.filter( ( line, index )=> line !== after[ index ] )
			$mol_assert_equal( changed, [ '\t\t\t\t\twhen \\near' ] )
			$mol_assert_ok( doc.source().includes( '\t\t\t\t\twhen \\far\n' ) )
		},

		'row added to a list becomes a record of the source'( $ ) {
			const doc = open( $, $bog_gamestudio_sample_brain )
			doc.list_add( 'Walk', 'next', { to: 'Спит', when: 'tired' } )
			$mol_assert_ok( doc.source().includes( '\t\t\tnext /\n\t\t\t\t*\n\t\t\t\t\tto \\Ждёт\n\t\t\t\t\twhen \\near\n\t\t\t\t*\n\t\t\t\t\tto \\Спит\n\t\t\t\t\twhen \\tired\n\t\t<= Wait ' ) )
			$mol_assert_equal( doc.list_rows( 'Walk', 'next' ).length, 2 )
		},

		'dropped row leaves the rest of the list'( $ ) {
			const doc = open( $, $bog_gamestudio_sample_brain )
			doc.list_add( 'Walk', 'next', { to: 'Спит', when: 'tired' } )
			doc.list_drop( 'Walk', 'next', 0 )
			$mol_assert_equal( doc.list_rows( 'Walk', 'next' ), [ { to: 'Спит', when: 'tired' } ] )
			doc.list_drop( 'Walk', 'next', 0 )
			$mol_assert_equal( doc.list_rows( 'Walk', 'next' ), [] )
			$mol_assert_ok( doc.source().includes( '\t\t\tnext /\n' ) )
		},

		'list of the document reaches the node'( $ ) {
			const doc = open( $, $bog_gamestudio_sample_brain )
			const state = ()=> doc.scene().nodes().find( node => node.title() === 'Ходит' ) as $bog_gamengine_brain_state
			$mol_assert_equal( state().next().length, 1 )
			$mol_assert_equal( state().next()[ 0 ].when, 'near' )
			doc.list_set( 'Walk', 'next', 0, 'when', 'far' )
			$mol_assert_equal( state().next()[ 0 ].when, 'far' )
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

		'prefab declaration leaves the scene as the document root'( $ ) {
			const doc = open( $, $bog_gamestudio_sample_prefab )
			$mol_assert_equal( doc.decls().get( '' )!.type, '$bog_gamengine_scene' )
		},

		'instances and their prefab kids are listed by path'( $ ) {
			const doc = open( $, $bog_gamestudio_sample_prefab )
			$mol_assert_equal( doc.nodes().map( node => node.path ), [ 'Enemy_1', 'Enemy_1/Gun', 'Enemy_2', 'Enemy_2/Gun' ] )
			$mol_assert_equal( doc.nodes().map( node => node.title ), [ 'Страж', 'Ствол', 'Вожак', 'Ствол' ] )
		},

		'path of a kid inside an instance walks into the prefab body'( $ ) {
			const doc = open( $, $bog_gamestudio_sample_prefab )
			$mol_assert_equal( doc.path_at([ 1, 0 ]), 'Enemy_2/Gun' )
			$mol_assert_equal( doc.nodes().length, doc.scene().nodes().length )
		},

		'inherited value of an instance is writable on the node'( $ ) {
			const doc = open( $, $bog_gamestudio_sample_prefab )
			const nodes = doc.scene().nodes()
			$mol_assert_equal( nodes[ 0 ].name(), 'Страж' )
			nodes[ 0 ].name( 'Дозорный' )
			$mol_assert_equal( nodes[ 0 ].name(), 'Дозорный' )
			$mol_assert_equal( nodes[ 2 ].name(), 'Вожак' )
			$mol_assert_equal( doc.source(), $bog_gamestudio_sample_prefab )
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
