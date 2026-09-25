namespace $ {

	export type $bog_gamengine_prop_kind = 'vec2' | 'vec3' | 'vec4' | 'number' | 'flag' | 'text' | 'frame' | 'euler' | 'list' | 'nodes' | 'node' | 'point'

	export type $bog_gamengine_prop = {
		name: string
		kind: $bog_gamengine_prop_kind
		fields?: Readonly< Record< string, $bog_gamengine_prop_kind > >
		klass?: string
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

	export const $bog_gamengine_node_reach_states: readonly {
		readonly size?: readonly number[]
		readonly scale?: readonly number[]
		readonly rot?: readonly number[]
	}[] = [
		{},
		{ scale: [ 3, 3, 3 ] },
		{ scale: [ 0.2, 5, 1 ] },
		{ rot: [ 0, 0, Math.PI / 6 ] },
		{ rot: [ Math.PI / 6, Math.PI * 2 / 9, 0 ] },
		{ size: [ 4, 0.5, 1 ] },
		{ size: [ 4, 0.5, 1 ], rot: [ 0, 0, Math.PI / 6 ], scale: [ 2, 2, 2 ] },
	]

	export function $bog_gamengine_node_reach( node: $bog_gamengine_node ) {

		const local = node.box_local()
		if( !local ) return 0

		const world = node.world()
		let far = 0

		for( let corner = 0; corner < 8; ++ corner ) {
			const x = local[ corner & 1 ? 3 : 0 ]
			const y = local[ corner & 2 ? 4 : 1 ]
			const z = local[ corner & 4 ? 5 : 2 ]
			let sum = 0
			for( let k = 0; k < 3; ++ k ) {
				const axis = world[ k ] * x + world[ 4 + k ] * y + world[ 8 + k ] * z
				sum += axis * axis
			}
			if( sum > far ) far = sum
		}

		return Math.sqrt( far )
	}

	export class $bog_gamengine_node extends $mol_object2 {

		@ $mol_mem
		name( next = '' ) {
			return next
		}

		@ $mol_mem
		role( next = '' ) {
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
				{ name: 'role', kind: 'text', get: ()=> this.role(), set: next => this.role( String( next ?? '' ) ) },
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

		local_box = new Float32Array( 6 )
		world_box = new Float32Array( 6 )

		box_local(): Float32Array | null {

			const self = this as $bog_gamengine_node & { size?(): ArrayLike< number >, radius?(): number }
			const box = this.local_box

			if( typeof self.size === 'function' ) {
				const size = self.size()
				for( let i = 0; i < 3; ++ i ) {
					const half = i < size.length ? size[ i ] / 2 : 0
					box[ i ] = - half
					box[ i + 3 ] = half
				}
				return box
			}

			if( typeof self.radius === 'function' ) {
				const radius = self.radius()
				if( !Number.isFinite( radius ) ) return null
				for( let i = 0; i < 3; ++ i ) {
					box[ i ] = - radius
					box[ i + 3 ] = radius
				}
				return box
			}

			return null
		}

		aabb() {

			const box = this.world_box
			for( let k = 0; k < 3; ++ k ) {
				box[ k ] = Infinity
				box[ k + 3 ] = - Infinity
			}

			const local = this.box_local()
			if( !local ) return box

			const world = this.world()

			for( let corner = 0; corner < 8; ++ corner ) {
				const x = local[ corner & 1 ? 3 : 0 ]
				const y = local[ corner & 2 ? 4 : 1 ]
				const z = local[ corner & 4 ? 5 : 2 ]
				for( let k = 0; k < 3; ++ k ) {
					const value = world[ 12 + k ] + world[ k ] * x + world[ 4 + k ] * y + world[ 8 + k ] * z
					if( value < box[ k ] ) box[ k ] = value
					if( value > box[ k + 3 ] ) box[ k + 3 ] = value
				}
			}

			return box
		}

		aabb_empty() {
			const box = this.aabb()
			return !( box[ 0 ] <= box[ 3 ] )
		}

		step( dt: number ) {}

	}

}
