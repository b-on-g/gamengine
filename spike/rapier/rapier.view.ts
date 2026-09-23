namespace $.$$ {

	const lattice_side = 12
	const lattice_gap = 1.2

	function jitter( id: number, salt: number ) {
		const x = Math.sin( id * 12.9898 + salt * 78.233 ) * 43758.5453
		return ( x - Math.floor( x ) - 0.5 ) * 0.2
	}

	export class $bog_gamengine_spike_rapier extends $.$bog_gamengine_spike_rapier {

		@ $mol_mem
		count() {
			return Number( this.$.$mol_state_arg.value( 'count' ) ) || super.count()
		}

		@ $mol_mem
		crate_ids() {
			const ids = [] as number[]
			for( let i = 0; i < this.count(); ++ i ) ids.push( i )
			return ids as readonly number[]
		}

		@ $mol_mem
		crates() {
			return this.crate_ids().map( id => this.Crate( id ) )
		}

		@ $mol_mem_key
		crate_start( id: number ) {
			const column = id % ( lattice_side * lattice_side )
			const layer = Math.floor( id / ( lattice_side * lattice_side ) )
			return new Float32Array([
				( column % lattice_side - ( lattice_side - 1 ) / 2 ) * lattice_gap + jitter( id, 1 ),
				5 + layer * lattice_gap,
				( Math.floor( column / lattice_side ) - ( lattice_side - 1 ) / 2 ) * lattice_gap + jitter( id, 2 ),
			])
		}

		@ $mol_mem
		crate_starts() {
			return this.crate_ids().map( id => this.crate_start( id ) )
		}

		@ $mol_mem_key
		crate_pos( id: number, next?: Float32Array ) {
			return next ?? this.crate_start( id )
		}

		@ $mol_mem_key
		crate_rot( id: number, next?: Float32Array ) {
			return next ?? new Float32Array([ 0, 0, 0 ])
		}

		@ $mol_mem
		floor_size() {
			return new Float32Array([ 40, 1, 40 ])
		}

		@ $mol_mem
		walker_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 0, 4, 24 ])
		}

		@ $mol_mem
		walker_rot( next?: Float32Array ) {
			return next ?? new Float32Array([ -0.2, 0, 0 ])
		}

		@ $mol_mem
		nodes() {
			return [ this.World(), ... this.crates(), this.Floor(), this.Walker() ]
		}

		@ $mol_mem
		world_stat() {
			this.Clock().frame()
			try {
				return this.World().stat()
			} catch( error ) {
				if( $mol_promise_like( error ) ) return 'rapier init'
				return $mol_fail_hidden( error )
			}
		}

	}

}
