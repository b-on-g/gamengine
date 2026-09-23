namespace $ {

	export class $bog_gamengine_light extends $bog_gamengine_node {

		@ $mol_mem
		kind( next = 'sun' ) {
			return next
		}

		@ $mol_mem
		color( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 1, 1, 1 ])
		}

		@ $mol_mem
		power( next = 1 ) {
			return next
		}

		@ $mol_mem
		range( next = 10 ) {
			return next
		}

		@ $mol_mem
		angle( next = Math.PI / 6 ) {
			return next
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'kind', kind: 'text', get: ()=> this.kind(), set: next => this.kind( next as string ) },
				{ name: 'color', kind: 'vec3', get: ()=> this.color(), set: next => this.color( next as ArrayLike< number > ) },
				{ name: 'power', kind: 'number', get: ()=> this.power(), set: next => this.power( next as number ) },
				{ name: 'range', kind: 'number', get: ()=> this.range(), set: next => this.range( next as number ) },
				{ name: 'angle', kind: 'number', get: ()=> this.angle(), set: next => this.angle( next as number ) },
			]
		}

		@ $mol_mem
		dir() {
			const dir = new Float32Array( 3 )
			return $bog_gamengine_light_dir( this.world(), dir, 0 )
		}

	}

	export function $bog_gamengine_light_dir( world: Float32Array, out: Float32Array, offset: number ) {
		const x = - world[ 8 ]
		const y = - world[ 9 ]
		const z = - world[ 10 ]
		const len = Math.hypot( x, y, z ) || 1
		out[ offset ] = x / len
		out[ offset + 1 ] = y / len
		out[ offset + 2 ] = z / len
		return out
	}

}
