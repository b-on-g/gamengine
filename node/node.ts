namespace $ {

	export type $bog_gamengine_prop = {
		name: string
		kind: 'vec2' | 'vec3' | 'vec4' | 'number' | 'flag' | 'text' | 'frame' | 'euler'
		get: ()=> unknown
		set: ( next: unknown )=> void
	}

	export class $bog_gamengine_node extends $mol_object2 {

		@ $mol_mem
		name( next = '' ) {
			return next
		}

		title() {
			const name = this.name()
			if( name ) return name
			const cls = this.constructor as typeof $bog_gamengine_node
			return cls.$.$mol_func_name( cls ).replace( /^\$bog_gamengine_/, '' )
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				{ name: 'pos', kind: 'vec3', get: ()=> this.pos(), set: next => this.pos( next as Float32Array ) },
				{ name: 'rot', kind: 'euler', get: ()=> this.rot(), set: next => this.rot( next as Float32Array ) },
				{ name: 'scale', kind: 'vec3', get: ()=> this.scale(), set: next => this.scale( next as Float32Array ) },
			]
		}

		@ $mol_mem
		pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 0, 0, 0 ])
		}

		@ $mol_mem
		rot( next?: Float32Array ) {
			return next ?? new Float32Array([ 0, 0, 0 ])
		}

		@ $mol_mem
		scale( next?: Float32Array ) {
			return next ?? new Float32Array([ 1, 1, 1 ])
		}

		@ $mol_mem
		parent( next?: $bog_gamengine_node | null ) {
			return next ?? null
		}

		kids(): readonly $bog_gamengine_node[] {
			return []
		}

		@ $mol_mem
		trans() {
			const rot = this.rot()
			return $mol_3d_mat4.multiply(
				$mol_3d_mat4.translation( this.pos() ),
				$mol_3d_mat4.rotation( [ 0, 0, 1 ], rot[ 2 ] ),
				$mol_3d_mat4.rotation( [ 0, 1, 0 ], rot[ 1 ] ),
				$mol_3d_mat4.rotation( [ 1, 0, 0 ], rot[ 0 ] ),
				$mol_3d_mat4.scaling( this.scale() ),
			)
		}

		@ $mol_mem
		world(): $mol_3d_mat4 {
			const parent = this.parent()
			return parent ? $mol_3d_mat4.multiply( parent.world(), this.trans() ) : this.trans()
		}

		step( dt: number ) {}

	}

}
