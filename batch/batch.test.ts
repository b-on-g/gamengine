namespace $ {

	class $bog_gamengine_batch_test_tinted extends $bog_gamengine_node {
		tint() {
			return new Float32Array([ 1, 0, 0, 0.5 ])
		}
	}

	function $bog_gamengine_batch_test_node( x: number, y: number, z: number ) {
		const node = new $bog_gamengine_node
		node.pos( new Float32Array([ x, y, z ]) )
		return node
	}

	$mol_test({

		'two nodes give count 2 and translations at offsets 12 and 28'() {
			const batch = new $bog_gamengine_batch
			batch.nodes([
				$bog_gamengine_batch_test_node( 1, 2, 3 ),
				$bog_gamengine_batch_test_node( 4, 5, 6 ),
			])
			$mol_assert_equal( batch.fill(), 2 )
			$mol_assert_equal( batch.count, 2 )
			$mol_assert_equal( [ ...batch.trans.subarray( 12, 15 ) ], [ 1, 2, 3 ] )
			$mol_assert_equal( [ ...batch.trans.subarray( 28, 31 ) ], [ 4, 5, 6 ] )
		},

		'third node keeps buffers when cap suffices'() {
			const batch = new $bog_gamengine_batch
			batch.nodes([
				$bog_gamengine_batch_test_node( 1, 2, 3 ),
				$bog_gamengine_batch_test_node( 4, 5, 6 ),
			])
			batch.fill()
			$mol_assert_ok( batch.cap >= 3 )
			const trans = batch.trans
			const tint = batch.tint
			batch.nodes([
				$bog_gamengine_batch_test_node( 1, 2, 3 ),
				$bog_gamengine_batch_test_node( 4, 5, 6 ),
				$bog_gamengine_batch_test_node( 7, 8, 9 ),
			])
			$mol_assert_equal( batch.fill(), 3 )
			$mol_assert_equal( batch.trans, trans )
			$mol_assert_equal( batch.tint, tint )
			$mol_assert_equal( [ ...batch.trans.subarray( 44, 47 ) ], [ 7, 8, 9 ] )
		},

		'grow doubles cap until it covers need'() {
			const batch = new $bog_gamengine_batch
			batch.grow( 1 )
			$mol_assert_equal( batch.cap, 16 )
			batch.grow( 40 )
			$mol_assert_equal( batch.cap, 64 )
			$mol_assert_equal( batch.trans.length, 64 * 16 )
			$mol_assert_equal( batch.tint.length, 64 * 4 )
		},

		'tint defaults to opaque white'() {
			const batch = new $bog_gamengine_batch
			batch.nodes([ $bog_gamengine_batch_test_node( 0, 0, 0 ) ])
			batch.fill()
			$mol_assert_equal( [ ...batch.tint.subarray( 0, 4 ) ], [ 1, 1, 1, 1 ] )
		},

		'node with tint writes its color'() {
			const batch = new $bog_gamengine_batch
			batch.nodes([
				$bog_gamengine_batch_test_node( 0, 0, 0 ),
				new $bog_gamengine_batch_test_tinted,
			])
			batch.fill()
			$mol_assert_equal( [ ...batch.tint.subarray( 4, 8 ) ], [ 1, 0, 0, 0.5 ] )
		},

		'version grows on every fill'() {
			const batch = new $bog_gamengine_batch
			const before = batch.version
			batch.fill()
			batch.fill()
			$mol_assert_equal( batch.version, before + 2 )
		},

	})

}
