namespace $ {

	class $bog_gamengine_batch_test_tinted extends $bog_gamengine_node {
		tint() {
			return new Float32Array([ 1, 0, 0, 0.5 ])
		}
	}

	class $bog_gamengine_batch_test_layered extends $bog_gamengine_node {
		layer() {
			return 3
		}
		uv() {
			return new Float32Array([ 1, 0, -1, 1 ])
		}
	}

	function $bog_gamengine_batch_test_node( x: number, y: number, z: number ) {
		const node = new $bog_gamengine_node
		node.pos( new Float32Array([ x, y, z ]) )
		return node
	}

	function $bog_gamengine_batch_test_mesh( x: number, y: number, z: number ) {
		const mesh = new $bog_gamengine_mesh
		mesh.pos( new Float32Array([ x, y, z ]) )
		return mesh
	}

	class $bog_gamengine_batch_test_cam extends $bog_gamengine_cam {
		proj( aspect: number ) {
			return $mol_3d_mat4.perspective( Math.PI / 3, aspect, 0.1, 100 )
		}
	}

	function $bog_gamengine_batch_test_frustum() {
		return new $bog_gamengine_batch_test_cam().frustum( 1, new Float32Array( 24 ) )
	}

	$mol_test({

		'mesh behind frustum is not counted, mesh in front is'() {
			const batch = new $bog_gamengine_batch
			batch.nodes([
				$bog_gamengine_batch_test_mesh( 0, 0, 5 ),
				$bog_gamengine_batch_test_mesh( 0, 0, -5 ),
			])
			$mol_assert_equal( batch.fill( $bog_gamengine_batch_test_frustum() ), 1 )
			$mol_assert_equal( batch.count, 1 )
			$mol_assert_equal( [ ...batch.trans.subarray( 12, 15 ) ], [ 0, 0, -5 ] )
		},

		'scaled mesh near frustum edge is kept by its grown radius'() {
			const mesh = $bog_gamengine_batch_test_mesh( 4, 0, -5 )
			mesh.scale( new Float32Array([ 4, 4, 4 ]) )
			const batch = new $bog_gamengine_batch
			batch.nodes([ mesh ])
			$mol_assert_equal( batch.fill( $bog_gamengine_batch_test_frustum() ), 1 )
			mesh.scale( new Float32Array([ 1, 1, 1 ]) )
			$mol_assert_equal( batch.fill( $bog_gamengine_batch_test_frustum() ), 0 )
		},

		'cull off keeps mesh behind frustum'() {
			const batch = new $bog_gamengine_batch
			batch.cull( false )
			batch.nodes([ $bog_gamengine_batch_test_mesh( 0, 0, 5 ) ])
			$mol_assert_equal( batch.fill( $bog_gamengine_batch_test_frustum() ), 1 )
		},

		'without frustum nothing is culled'() {
			const batch = new $bog_gamengine_batch
			batch.nodes([ $bog_gamengine_batch_test_mesh( 0, 0, 5 ) ])
			$mol_assert_equal( batch.fill(), 1 )
		},

		'source with aabb is compacted to instances inside frustum'() {
			const trans = new Float32Array( 48 )
			trans.set([ 1, 0, 5 ], 12 )
			trans.set([ 2, 0, -5 ], 28 )
			trans.set([ 3, 0, -8 ], 44 )
			const aabb = new Float32Array([
				0, -1, 4, 2, 1, 6,
				1, -1, -6, 3, 1, -4,
				2, -1, -9, 4, 1, -7,
			])
			const batch = new $bog_gamengine_batch
			batch.source({ trans, count: 3, aabb })
			$mol_assert_equal( batch.fill( $bog_gamengine_batch_test_frustum() ), 2 )
			$mol_assert_equal( batch.count, 2 )
			$mol_assert_equal( [ ...batch.trans.subarray( 12, 15 ) ], [ 2, 0, -5 ] )
			$mol_assert_equal( [ ...batch.trans.subarray( 28, 31 ) ], [ 3, 0, -8 ] )
		},

		'source skip is applied before aabb culling'() {
			const trans = new Float32Array( 32 )
			trans.set([ 1, 0, -5 ], 12 )
			trans.set([ 2, 0, -5 ], 28 )
			const aabb = new Float32Array([ 0, -1, -6, 2, 1, -4, 1, -1, -6, 3, 1, -4 ])
			const batch = new $bog_gamengine_batch
			batch.source({ trans, count: 2, aabb })
			batch.skip( 1 )
			$mol_assert_equal( batch.fill( $bog_gamengine_batch_test_frustum() ), 1 )
			$mol_assert_equal( [ ...batch.trans.subarray( 12, 15 ) ], [ 2, 0, -5 ] )
		},

		'near and far keep only nodes within distance to eye'() {
			const batch = new $bog_gamengine_batch
			batch.near( 2 )
			batch.far( 10 )
			batch.nodes([
				$bog_gamengine_batch_test_node( 0, 0, -1 ),
				$bog_gamengine_batch_test_node( 0, 0, -5 ),
				$bog_gamengine_batch_test_node( 0, 0, -20 ),
			])
			$mol_assert_equal( batch.fill( null, new Float32Array( 3 ) ), 1 )
			$mol_assert_equal( [ ...batch.trans.subarray( 12, 15 ) ], [ 0, 0, -5 ] )
		},

		'far is exclusive so two batches split nodes without overlap'() {
			const nodes = [
				$bog_gamengine_batch_test_node( 0, 0, -3 ),
				$bog_gamengine_batch_test_node( 0, 0, -6 ),
				$bog_gamengine_batch_test_node( 0, 0, -9 ),
			]
			const close = new $bog_gamengine_batch
			close.far( 6 )
			close.nodes( nodes )
			const distant = new $bog_gamengine_batch
			distant.near( 6 )
			distant.nodes( nodes )
			const eye = new Float32Array( 3 )
			$mol_assert_equal( close.fill( null, eye ), 1 )
			$mol_assert_equal( distant.fill( null, eye ), 2 )
		},

		'without eye near and far are ignored'() {
			const batch = new $bog_gamengine_batch
			batch.near( 2 )
			batch.nodes([ $bog_gamengine_batch_test_node( 0, 0, -1 ) ])
			$mol_assert_equal( batch.fill(), 1 )
		},

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

		'node with layer and uv writes them, plain node gets 0 and whole uv'() {
			const batch = new $bog_gamengine_batch
			batch.nodes([
				$bog_gamengine_batch_test_node( 0, 0, 0 ),
				new $bog_gamengine_batch_test_layered,
			])
			batch.fill()
			$mol_assert_equal( [ ...batch.layer.subarray( 0, 2 ) ], [ 0, 3 ] )
			$mol_assert_equal( [ ...batch.uv.subarray( 0, 8 ) ], [ 0, 0, 1, 1, 1, 0, -1, 1 ] )
		},

		'material buffer is filled from mesh material, plain node gets default'() {
			const mesh = new $bog_gamengine_mesh
			mesh.material( new Float32Array([ 0.75, 0.25, 0.5, 0 ]) )
			const batch = new $bog_gamengine_batch
			batch.nodes([ $bog_gamengine_batch_test_node( 0, 0, 0 ), mesh ])
			batch.fill()
			$mol_assert_equal( batch.material.subarray( 0, 8 ), new Float32Array([ 0, 0.6, 0, 0, 0.75, 0.25, 0.5, 0 ]) )
		},

		'normal layer is -1 without normal frame'() {
			const batch = new $bog_gamengine_batch
			batch.nodes([ $bog_gamengine_batch_test_node( 0, 0, 0 ), new $bog_gamengine_mesh ])
			batch.fill()
			$mol_assert_equal( [ ...batch.normal_layer.subarray( 0, 2 ) ], [ -1, -1 ] )
		},

		'source fill gives default material'() {
			const batch = new $bog_gamengine_batch
			batch.source({ trans: new Float32Array( 16 ), count: 1 })
			batch.fill()
			$mol_assert_equal( batch.material.subarray( 0, 4 ), new Float32Array([ 0, 0.6, 0, 0 ]) )
			$mol_assert_equal( batch.normal_layer[ 0 ], -1 )
		},

		'version grows on every fill'() {
			const batch = new $bog_gamengine_batch
			const before = batch.version
			batch.fill()
			batch.fill()
			$mol_assert_equal( batch.version, before + 2 )
		},

		'source with two matrices gives count 2 and same translations'() {
			const trans = new Float32Array( 32 )
			trans.set([ 1, 2, 3 ], 12 )
			trans.set([ 4, 5, 6 ], 28 )
			const batch = new $bog_gamengine_batch
			batch.source({ trans, count: 2 })
			$mol_assert_equal( batch.fill(), 2 )
			$mol_assert_equal( batch.count, 2 )
			$mol_assert_equal( [ ...batch.trans.subarray( 12, 15 ) ], [ 1, 2, 3 ] )
			$mol_assert_equal( [ ...batch.trans.subarray( 28, 31 ) ], [ 4, 5, 6 ] )
			$mol_assert_equal( [ ...batch.tint.subarray( 4, 8 ) ], [ 1, 1, 1, 1 ] )
			$mol_assert_equal( [ ...batch.uv.subarray( 4, 8 ) ], [ 0, 0, 1, 1 ] )
		},

		'source tint, layer and uv are copied per instance'() {
			const trans = new Float32Array( 32 )
			const tint = new Float32Array([ 1, 1, 1, 1, 1, 0, 0, 0.5 ])
			const layer = new Float32Array([ 2, 3 ])
			const uv = new Float32Array([ 0, 0, 1, 1, 1, 0, -1, 1 ])
			const batch = new $bog_gamengine_batch
			batch.source({ trans, count: 2, tint, layer, uv })
			$mol_assert_equal( batch.fill(), 2 )
			$mol_assert_equal( [ ...batch.tint.subarray( 4, 8 ) ], [ 1, 0, 0, 0.5 ] )
			$mol_assert_equal( [ ...batch.layer.subarray( 0, 2 ) ], [ 2, 3 ] )
			$mol_assert_equal( [ ...batch.uv.subarray( 4, 8 ) ], [ 1, 0, -1, 1 ] )
		},

		'source tint and layer are compacted with trans under frustum'() {
			const trans = new Float32Array( 32 )
			trans.set([ 1, 0, 5 ], 12 )
			trans.set([ 2, 0, -5 ], 28 )
			const aabb = new Float32Array([ 0, -1, 4, 2, 1, 6, 1, -1, -6, 3, 1, -4 ])
			const tint = new Float32Array([ 1, 1, 1, 1, 0, 1, 0, 1 ])
			const layer = new Float32Array([ 1, 2 ])
			const batch = new $bog_gamengine_batch
			batch.source({ trans, count: 2, aabb, tint, layer })
			$mol_assert_equal( batch.fill( $bog_gamengine_batch_test_frustum() ), 1 )
			$mol_assert_equal( [ ...batch.tint.subarray( 0, 4 ) ], [ 0, 1, 0, 1 ] )
			$mol_assert_equal( batch.layer[ 0 ], 2 )
		},

		'source with skip 1 drops the first matrix'() {
			const trans = new Float32Array( 32 )
			trans.set([ 1, 2, 3 ], 12 )
			trans.set([ 4, 5, 6 ], 28 )
			const batch = new $bog_gamengine_batch
			batch.source({ trans, count: 2 })
			batch.skip( 1 )
			$mol_assert_equal( batch.fill(), 1 )
			$mol_assert_equal( batch.count, 1 )
			$mol_assert_equal( [ ...batch.trans.subarray( 12, 15 ) ], [ 4, 5, 6 ] )
		},

	})

}
