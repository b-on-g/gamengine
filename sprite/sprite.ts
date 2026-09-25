namespace $ {

	const uv_plain = new Float32Array([ 0, 0, 1, 1 ])
	const uv_flip = new Float32Array([ 1, 0, -1, 1 ])

	export class $bog_gamengine_sprite extends $bog_gamengine_node {

		@ $mol_mem
		atlas( next?: $bog_gamengine_atlas | null ) {
			return next ?? null
		}

		@ $mol_mem
		frame( next = '' ) {
			return next
		}

		@ $mol_mem
		clip( next = '' ) {
			return next
		}

		@ $mol_mem
		fps( next = 8 ) {
			return next
		}

		@ $mol_mem
		clock( next?: $bog_gamengine_clock | null ) {
			return next ?? null
		}

		@ $mol_mem
		clips( next?: Record< string, readonly string[] > ) {
			return next ?? {}
		}

		@ $mol_mem
		flip_x( next = false ) {
			return next
		}

		@ $mol_mem
		size( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 1, 1 ])
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'frame', kind: 'frame', get: ()=> this.frame(), set: next => this.frame( next as string ) },
				{ name: 'flip_x', kind: 'flag', get: ()=> this.flip_x(), set: next => this.flip_x( next as boolean ) },
				{ name: 'size', kind: 'vec2', get: ()=> this.size(), set: next => this.size( next as ArrayLike< number > ) },
				{ name: 'clip', kind: 'text', get: ()=> this.clip(), set: next => this.clip( next as string ) },
				{ name: 'fps', kind: 'number', get: ()=> this.fps(), set: next => this.fps( next as number ) },
				{ name: 'billboard', kind: 'flag', get: ()=> this.billboard(), set: next => this.billboard( next as boolean ) },
			]
		}

		radius() {
			return Math.SQRT1_2
		}

		frame_now() {
			const clip = this.clip()
			if( !clip ) return this.frame()
			const list = this.clips()[ clip ]
			if( !list ) return this.frame()
			const clock = this.clock()
			const time = clock ? clock.time() : 0
			return list[ Math.floor( time * this.fps() ) % list.length ]
		}

		layer() {
			const atlas = this.atlas()
			return atlas ? atlas.layer( this.frame_now() ) : 0
		}

		@ $mol_mem
		uv() {
			return this.flip_x() ? uv_flip : uv_plain
		}

		box_local() {
			const box = this.local_box
			box[ 0 ] = -0.5
			box[ 1 ] = -0.5
			box[ 2 ] = 0
			box[ 3 ] = 0.5
			box[ 4 ] = 0.5
			box[ 5 ] = 0
			return box
		}

		@ $mol_mem
		trans() {
			const size = this.size()
			return $mol_3d_mat4.multiply(
				super.trans(),
				$mol_3d_mat4.scaling([ size[ 0 ], size[ 1 ], 1 ]),
			)
		}

	}

}
