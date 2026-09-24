namespace $ {

	export type $bog_gamengine_prop_kind = 'vec2' | 'vec3' | 'vec4' | 'number' | 'flag' | 'text' | 'frame' | 'euler' | 'list'

	export type $bog_gamengine_prop = {
		name: string
		kind: $bog_gamengine_prop_kind
		fields?: Readonly< Record< string, $bog_gamengine_prop_kind > >
		get: ()=> unknown
		set: ( next: unknown )=> void
	}

	export type $bog_gamengine_part = {
		owner( next?: $bog_gamengine_node | null ): $bog_gamengine_node | null
		props?(): readonly $bog_gamengine_prop[]
	}

	export function $bog_gamengine_node_vec( next: ArrayLike< number > ) {
		return next instanceof Float32Array ? next : new Float32Array( next )
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
				{ name: 'pos', kind: 'vec3', get: ()=> this.pos(), set: next => this.pos( next as ArrayLike< number > ) },
				{ name: 'rot', kind: 'euler', get: ()=> this.rot(), set: next => this.rot( next as ArrayLike< number > ) },
				{ name: 'scale', kind: 'vec3', get: ()=> this.scale(), set: next => this.scale( next as ArrayLike< number > ) },
				{ name: 'tint', kind: 'vec4', get: ()=> this.tint(), set: next => this.tint( next as ArrayLike< number > ) },
				... this.part_props(),
			]
		}

		@ $mol_mem
		parts( next?: readonly $bog_gamengine_part[] ): readonly $bog_gamengine_part[] {
			if( !next ) return []
			for( let i = 0; i < next.length; ++i ) {
				if( !next[ i ].owner() ) next[ i ].owner( this )
			}
			return next
		}

		part_lead( part: $bog_gamengine_part ) {
			const klass = part.constructor as new()=> unknown
			return this.$.$mol_func_name( klass ).replace( /^\$bog_[a-z0-9]+_/, '' )
		}

		part_props(): readonly $bog_gamengine_prop[] {
			const parts = this.parts()
			const out = [] as $bog_gamengine_prop[]
			for( let i = 0; i < parts.length; ++i ) {
				const part = parts[ i ]
				const own = part.props?.() ?? []
				const lead = this.part_lead( part )
				for( let k = 0; k < own.length; ++k ) {
					const prop = own[ k ]
					out.push({ ... prop, name: `${ lead }.${ prop.name }` })
				}
			}
			return out
		}

		@ $mol_mem
		pos( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 0, 0, 0 ])
		}

		@ $mol_mem
		rot( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 0, 0, 0 ])
		}

		@ $mol_mem
		scale( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 1, 1, 1 ])
		}

		@ $mol_mem
		tint( next?: ArrayLike< number > ) {
			return next ? $bog_gamengine_node_vec( next ) : new Float32Array([ 1, 1, 1, 1 ])
		}

		@ $mol_mem
		billboard( next = false ) {
			return next
		}

		@ $mol_mem
		shader( next?: $bog_gamengine_shader | null ) {
			return next ?? null
		}

		@ $mol_mem
		parent( next?: $bog_gamengine_node | null ) {
			return next ?? null
		}

		@ $mol_mem
		kids( next?: readonly $bog_gamengine_node[] ): readonly $bog_gamengine_node[] {
			if( !next ) return []
			for( let i = 0; i < next.length; ++i ) {
				if( !next[ i ].parent() ) next[ i ].parent( this )
			}
			return next
		}

		hidden = false
		shown_now = true

		shown(): boolean {
			for( let node: $bog_gamengine_node | null = this; node; node = node.parent() ) {
				if( node.hidden ) return false
			}
			return true
		}

		root(): $bog_gamengine_node {
			let node: $bog_gamengine_node = this
			for( let parent = node.parent(); parent; parent = node.parent() ) node = parent
			return node
		}

		is_scene() {
			return false
		}

		is_brain() {
			return false
		}

		scene(): $bog_gamengine_scene | null {
			const root = this.root()
			return root.is_scene() ? root as $bog_gamengine_scene : null
		}

		input(): $bog_gamengine_input | null {
			return this.scene()?.input() ?? null
		}

		clock(): $bog_gamengine_clock | null {
			return this.scene()?.clock() ?? null
		}

		cam_yaw() {
			const cam = this.scene()?.cam() ?? null
			if( !cam ) return this.rot()[ 1 ]
			const world = cam.world()
			return Math.atan2( world[ 8 ], world[ 10 ] )
		}

		@ $mol_mem
		trans() {
			const rot = this.rot()
			const yaw = this.billboard() ? this.cam_yaw() : rot[ 1 ]
			return $mol_3d_mat4.multiply(
				$mol_3d_mat4.translation( this.pos() ),
				$mol_3d_mat4.rotation( [ 0, 0, 1 ], rot[ 2 ] ),
				$mol_3d_mat4.rotation( [ 0, 1, 0 ], yaw ),
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
