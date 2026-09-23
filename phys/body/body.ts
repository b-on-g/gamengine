namespace $ {

	export class $bog_gamengine_phys_body extends $bog_gamengine_node {

		static readonly side_down = 1
		static readonly side_up = 2
		static readonly side_left = 4
		static readonly side_right = 8

		touched = 0

		on_ground() {
			return ( this.touched & $bog_gamengine_phys_body.side_down ) !== 0
		}

		on_ceil() {
			return ( this.touched & $bog_gamengine_phys_body.side_up ) !== 0
		}

		on_wall() {
			const body = $bog_gamengine_phys_body
			return ( this.touched & ( body.side_left | body.side_right ) ) !== 0
		}

		@ $mol_mem
		vel( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 0, 0, 0 ])
		}

		@ $mol_mem
		size( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 1, 1 ])
		}

		@ $mol_mem
		kind( next?: 'aabb' | 'circle' ) {
			return next ?? 'aabb'
		}

		@ $mol_mem
		still( next?: boolean ) {
			return next ?? false
		}

		@ $mol_mem
		ghost( next?: boolean ) {
			return next ?? false
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'vel', kind: 'vec3', get: ()=> this.vel(), set: next => this.vel( next as ArrayLike< number > ) },
				{ name: 'size', kind: 'vec2', get: ()=> this.size(), set: next => this.size( next as ArrayLike< number > ) },
				{ name: 'kind', kind: 'text', get: ()=> this.kind(), set: next => this.kind( next as 'aabb' | 'circle' ) },
				{ name: 'still', kind: 'flag', get: ()=> this.still(), set: next => this.still( next as boolean ) },
				{ name: 'ghost', kind: 'flag', get: ()=> this.ghost(), set: next => this.ghost( next as boolean ) },
			]
		}

		hit( other: $bog_gamengine_phys_body | null, normal?: ArrayLike< number > ) {}

	}

}
