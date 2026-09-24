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
			if( next !== undefined && this.handle_last ) this.world_last!.mass_of( this.handle_last, next )
			return next ?? 1
		}

		@ $mol_mem
		ghost( next?: boolean ) {
			if( next !== undefined && this.handle_last ) this.world_last!.ghost_of( this.handle_last, next )
			return next ?? false
		}

		@ $mol_mem
		kinematic( next?: boolean ) {
			if( next !== undefined && this.handle_last ) this.world_last!.kinematic_of( this.handle_last, next )
			return next ?? false
		}

		handle_last = 0
		world_last = null as $bog_gamengine_phys3 | null
		mass_now = NaN
		ghost_now = null as boolean | null
		kinematic_now = null as boolean | null
		pos_out = new Float32Array( 3 )
		rot_out = new Float32Array( 3 )
		rot_tmp = new Float32Array( 4 )

		mass_set( next: number ) {
			this.mass_now = next
			if( this.handle_last ) this.world_last!.mass_of( this.handle_last, next )
		}

		ghost_set( next: boolean ) {
			this.ghost_now = next
			if( this.handle_last ) this.world_last!.ghost_of( this.handle_last, next )
		}

		kinematic_set( next: boolean ) {
			this.kinematic_now = next
			if( this.handle_last ) this.world_last!.kinematic_of( this.handle_last, next )
		}

		handle() {
			if( this.handle_last ) return this.handle_last
			const world = this.phys3()
			this.world_last = world
			const mass = Number.isNaN( this.mass_now ) ? this.mass() : this.mass_now
			this.handle_last = world.add( this.shape(), this.size(), mass, this.pos_out )
			world.ghost_of( this.handle_last, this.ghost_now ?? this.ghost() )
			world.kinematic_of( this.handle_last, this.kinematic_now ?? this.kinematic() )
			return this.handle_last
		}

		index() {
			const handle = this.handle()
			return this.world_last!.index_of( handle )
		}

		alive() {
			return this.index() >= 0
		}

		pos( next?: ArrayLike< number > ) {
			const i = this.index()
			if( i < 0 ) {
				if( next ) this.pos_out.set( next )
				return this.pos_out
			}
			const world = this.world_last!
			if( next ) world.move( this.handle_last, next )
			this.pos_out.set( world.pos.subarray( i * 3, i * 3 + 3 ) )
			return this.pos_out
		}

		rot( next?: ArrayLike< number > ) {
			const i = this.index()
			if( i < 0 ) return this.rot_out
			const world = this.world_last!
			if( next ) {
				$bog_gamengine_vec_quat_from_euler( this.rot_tmp, next[ 0 ], next[ 1 ], next[ 2 ] )
				world.move( this.handle_last, world.pos_view[ i ], this.rot_tmp )
			}
			$bog_gamengine_vec_quat_to_euler( this.rot_out, world.rot.subarray( i * 4, i * 4 + 4 ) )
			return this.rot_out
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'mass', kind: 'number', get: ()=> this.mass(), set: next => this.mass_set( next as number ) },
				{ name: 'ghost', kind: 'flag', get: ()=> this.ghost(), set: next => this.ghost_set( next as boolean ) },
				{ name: 'kinematic', kind: 'flag', get: ()=> this.kinematic(), set: next => this.kinematic_set( next as boolean ) },
			]
		}

		destructor() {
			if( this.handle_last ) this.world_last?.remove( this.handle_last )
			this.handle_last = 0
			this.world_last = null
			super.destructor()
		}

	}

}
