namespace $ {
	$mol_test({

		'command line asks for a real gpu and never disables it'() {
			const argv = $bog_gamengine_bench_argv( '/tmp/profile', 800, 600 )
			$mol_assert_ok( argv.indexOf( '--ignore-gpu-blocklist' ) >= 0 )
			$mol_assert_equal( argv.indexOf( '--disable-gpu' ), -1 )
			$mol_assert_ok( argv.indexOf( '--user-data-dir=/tmp/profile' ) >= 0 )
			$mol_assert_ok( argv.indexOf( '--window-size=800,600' ) >= 0 )
			$mol_assert_equal( argv[ argv.length - 1 ], 'about:blank' )
		},

		'extra flags land before the blank page'() {
			const argv = $bog_gamengine_bench_argv( '/tmp/profile', 1400, 900, [ '--lang=ru' ] )
			$mol_assert_equal( argv[ argv.length - 2 ], '--lang=ru' )
		},

		'median takes the middle of the sorted values'() {
			$mol_assert_equal( $bog_gamengine_bench_median([ 5, 1, 3 ]), 3 )
			$mol_assert_equal( $bog_gamengine_bench_median([ 4, 1 ]), 4 )
			$mol_assert_equal( $bog_gamengine_bench_median([ 2 ]), 2 )
			$mol_assert_ok( Number.isNaN( $bog_gamengine_bench_median([]) ) )
		},

		'counters come back as a name to value map'() {
			const got = $bog_gamengine_bench_counters([
				{ name: 'TaskDuration', value: 1.5 },
				{ name: 'LayoutCount', value: 12 },
				{ value: 7 },
			])
			$mol_assert_equal( got.TaskDuration, 1.5 )
			$mol_assert_equal( got.LayoutCount, 12 )
			$mol_assert_equal( Object.keys( got ).length, 2 )
		},

		'frame numbers are milliseconds per frame'() {
			const before = { TaskDuration: 1, LayoutDuration: 0.5, RecalcStyleDuration: 0, ScriptDuration: 0.2, LayoutCount: 100 }
			const after = { TaskDuration: 2, LayoutDuration: 0.6, RecalcStyleDuration: 0, ScriptDuration: 0.4, LayoutCount: 400 }
			const frame = $bog_gamengine_bench_frame( before, after, 300 )
			$mol_assert_ok( Math.abs( frame.task - 1000 / 300 ) < 1e-9 )
			$mol_assert_ok( Math.abs( frame.layout - 100 / 300 ) < 1e-9 )
			$mol_assert_equal( frame.style, 0 )
			$mol_assert_equal( frame.layouts, 1 )
		},

		'frame of zero rounds stays zero instead of infinity'() {
			const frame = $bog_gamengine_bench_frame( { TaskDuration: 1 }, { TaskDuration: 5 }, 0 )
			$mol_assert_equal( frame.task, 0 )
			$mol_assert_equal( frame.layouts, 0 )
		},

		'report keeps the order of pages and takes a median of laps'() {
			const lap = ( name: string, tick: number, task: number )=> ( {
				name, tick, task, layout: 0, style: 0, views: 10,
			} )
			const rows = $bog_gamengine_bench_report([
				lap( 'dom', 5.2, 5.8 ),
				lap( 'world', 5.3, 5.7 ),
				lap( 'dom', 5.9, 6.4 ),
				lap( 'world', 5.1, 5.5 ),
				lap( 'dom', 5.3, 5.9 ),
				lap( 'world', 5.2, 5.6 ),
			])
			$mol_assert_equal( rows.length, 2 )
			$mol_assert_equal( rows[ 0 ].name, 'dom' )
			$mol_assert_equal( rows[ 1 ].name, 'world' )
			$mol_assert_equal( rows[ 0 ].laps, 3 )
			$mol_assert_equal( rows[ 0 ].tick, 5.3 )
			$mol_assert_equal( rows[ 1 ].tick, 5.2 )
		},

		'table prints a row for every page'() {
			const table = $bog_gamengine_bench_table([
				{ name: 'dom', laps: 3, tick: 5.25, task: 5.8, layout: 0.1, style: 0, views: 125 },
			])
			const lines = table.split( '\n' )
			$mol_assert_equal( lines.length, 2 )
			$mol_assert_ok( lines[ 1 ].startsWith( 'dom\t3\t5.25\t5.80\t0.10\t125' ) )
		},

		'mounted build wins over the root for its own two files'() {
			const shelf = new $bog_gamengine_bench_shelf( '/repo', { world: '/builds/world' } )
			$mol_assert_equal( shelf.file_of( '/world/index.html' ), '/builds/world/index.html' )
			$mol_assert_equal( shelf.file_of( '/world/web.js' ), '/builds/world/web.js' )
			$mol_assert_equal( shelf.file_of( '/world/bog/legion/app/atlas/mine.png' ), '/repo/bog/legion/app/atlas/mine.png' )
			$mol_assert_equal( shelf.file_of( '/bog/legion/app/-/index.html' ), '/repo/bog/legion/app/-/index.html' )
			shelf.close()
		},

		'walking out of the root is refused'() {
			const shelf = new $bog_gamengine_bench_shelf( '/repo' )
			$mol_assert_equal( shelf.file_of( '/../etc/passwd' ), '/repo/etc/passwd' )
			shelf.close()
		},

		'software renderers are called out, a real one is not'() {
			$mol_assert_equal( $bog_gamengine_bench_soft( 'ANGLE (Google, Vulkan, SwiftShader Device)' ), true )
			$mol_assert_equal( $bog_gamengine_bench_soft( 'llvmpipe (LLVM 15)' ), true )
			$mol_assert_equal( $bog_gamengine_bench_soft( 'нет webgl2' ), true )
			$mol_assert_equal( $bog_gamengine_bench_soft( 'ANGLE (Apple, ANGLE Metal Renderer: Apple M4 Pro)' ), false )
		},

		'tick script asks for the rounds it was given'() {
			const code = $bog_gamengine_bench_tick_script.replace( 'ROUNDS', '42' )
			$mol_assert_ok( code.includes( 'i < 42' ) )
			$mol_assert_ok( code.includes( 'mol_view' ) )
		},

		'warm script waits for the page and then burns frames'() {
			const code = $bog_gamengine_bench_warm_script( 'window.ok', 7, 'document.title = 1' )
			$mol_assert_ok( code.includes( 'window.ok' ) )
			$mol_assert_ok( code.includes( 'i < 7' ) )
			$mol_assert_ok( code.includes( 'document.title = 1' ) )
		},

	})
}
