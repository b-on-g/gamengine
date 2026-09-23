namespace $ {

	export class $bog_gamengine_phys3_body extends $bog_gamengine_node {

		@ $mol_mem
		phys3( next?: $bog_gamengine_phys3 ) {
			return next ?? new $bog_gamengine_phys3
		}

		@ $mol_mem
		shape( next?: number ) {
			return next ?? $bog_gamengine_phys3.shape_box
		}

		@ $mol_mem
		size( next?: Float32Array ) {
			return next ?? new Float32Array([ 0.5, 0.5, 0.5 ])
		}

		@ $mol_mem
		mass( next?: number ) {
			if( next !== undefined && this.index_last >= 0 ) this.phys3().mass_set( this.index_last, next )
			return next ?? 1
		}

		index_last = -1
		pos_out = new Float32Array( 3 )
		rot_out = new Float32Array( 3 )
		rot_tmp = new Float32Array( 4 )

		index() {
			if( this.index_last >= 0 ) return this.index_last
			this.index_last = this.phys3().add( this.shape(), this.size(), this.mass(), this.pos_out )
			return this.index_last
		}

		pos( next?: Float32Array ) {
			const i = this.index()
			const world = this.phys3()
			if( next ) world.pos.set( next, i * 3 )
			this.pos_out.set( world.pos.subarray( i * 3, i * 3 + 3 ) )
			return this.pos_out
		}

		rot( next?: Float32Array ) {
			const i = this.index()
			const world = this.phys3()
			if( next ) {
				$bog_gamengine_vec_quat_from_euler( this.rot_tmp, next[ 0 ], next[ 1 ], next[ 2 ] )
				world.rot.set( this.rot_tmp, i * 4 )
			}
			$bog_gamengine_vec_quat_to_euler( this.rot_out, world.rot.subarray( i * 4, i * 4 + 4 ) )
			return this.rot_out
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'mass', kind: 'number', get: ()=> this.mass(), set: next => this.mass( next as number ) },
			]
		}

		destructor() {
			if( this.index_last >= 0 ) this.phys3().remove( this.index_last )
			this.index_last = -1
			super.destructor()
		}

	}

}
