namespace $ {

	export class $bog_gamengine_scene extends $bog_gamengine_node {

		@ $mol_mem
		clock( next?: $bog_gamengine_clock ) {
			return next ?? new $bog_gamengine_clock
		}

		is_scene() {
			return true
		}

		@ $mol_mem
		auto_nodes( next?: readonly $bog_gamengine_node[] ): readonly $bog_gamengine_node[] {
			return next ?? []
		}

		@ $mol_mem
		nodes() {
			const list = [] as $bog_gamengine_node[]
			const brains = ( node: $bog_gamengine_node )=> {
				const kids = node.kids()
				for( let i = 0; i < kids.length; ++i ) {
					const kid = kids[ i ]
					if( !kid.parent() ) kid.parent( node )
					if( !kid.is_brain() ) continue
					list.push( kid )
					rest( kid )
				}
			}
			const rest = ( node: $bog_gamengine_node )=> {
				const kids = node.kids()
				for( let i = 0; i < kids.length; ++i ) {
					const kid = kids[ i ]
					if( !kid.parent() ) kid.parent( node )
					if( kid.is_brain() ) continue
					brains( kid )
					list.push( kid )
					rest( kid )
				}
			}
			brains( this )
			rest( this )
			const auto = this.auto_nodes()
			for( let i = 0; i < auto.length; ++i ) {
				if( !auto[ i ].parent() ) auto[ i ].parent( this )
				brains( auto[ i ] )
				list.push( auto[ i ] )
				rest( auto[ i ] )
			}
			return list as readonly $bog_gamengine_node[]
		}

		@ $mol_mem
		lights() {
			const nodes = this.nodes()
			const lights = [] as $bog_gamengine_light[]
			for( let i = 0; i < nodes.length && lights.length < 8; ++i ) {
				const node = nodes[ i ]
				if( node instanceof $bog_gamengine_light ) lights.push( node )
			}
			return lights as readonly $bog_gamengine_light[]
		}

		@ $mol_mem
		Shader_sprite( next?: $bog_gamengine_shader ) {
			return next ?? new this.$.$bog_gamengine_shader_sprite
		}

		@ $mol_mem
		Shader_solid( next?: $bog_gamengine_shader ) {
			return next ?? new this.$.$bog_gamengine_shader_solid
		}

		@ $mol_mem
		Shader_plain( next?: $bog_gamengine_shader ) {
			return next ?? new this.$.$bog_gamengine_shader_solid_plain
		}

		@ $mol_mem
		Shape_quad( next?: $bog_gamengine_shape ) {
			return next ?? new this.$.$bog_gamengine_shape_quad
		}

		@ $mol_mem_key
		Batch( key: string ) {
			return new this.$.$bog_gamengine_batch
		}

		node_source( node: $bog_gamengine_node ) {
			const probe = node as Partial< $bog_gamengine_batch_source_node >
			if( typeof probe.is_source !== 'function' || !probe.is_source() ) return null
			return probe.source?.() ?? null
		}

		node_drawn( node: $bog_gamengine_node ) {
			const probe = node as Partial< $bog_gamengine_batch_group_node >
			return typeof probe.atlas === 'function'
				&& typeof probe.layer === 'function'
				&& typeof probe.uv === 'function'
		}

		node_shader( node: $bog_gamengine_batch_group_node ) {
			const own = node.shader?.()
			if( own ) return own
			if( typeof node.normal_layer !== 'function' ) return this.Shader_sprite()
			return node.atlas() ? this.Shader_solid() : this.Shader_plain()
		}

		node_shape( node: $bog_gamengine_batch_group_node ) {
			return typeof node.shape === 'function' ? node.shape() : this.Shape_quad()
		}

		@ $mol_mem
		auto_batches() {
			const nodes = this.nodes() as readonly $bog_gamengine_batch_group_node[]
			const drawn = [] as $bog_gamengine_batch_group_node[]
			const sources = new Map< $bog_gamengine_batch_group_node, $bog_gamengine_batch >()
			for( let i = 0; i < nodes.length; ++ i ) {
				const node = nodes[ i ]
				const source = this.node_source( node )
				if( source ) {
					const batch = this.Batch( 'source ' + $bog_gamengine_batch_group_id( node ) )
					batch.shader( this.node_shader( node ) )
					batch.shape( this.node_shape( node ) )
					batch.atlas( node.atlas() )
					batch.source( source )
					sources.set( node, batch )
					continue
				}
				if( this.node_drawn( node ) ) drawn.push( node )
			}
			const parts = $bog_gamengine_batch_group(
				drawn,
				node => this.node_shader( node ),
				node => this.node_shape( node ),
			)
			const grouped = new Map< $bog_gamengine_batch_group_node, $bog_gamengine_batch >()
			for( let i = 0; i < parts.length; ++ i ) {
				const part = parts[ i ]
				const batch = this.Batch( part.key )
				batch.shader( part.shader )
				batch.shape( part.shape )
				batch.atlas( part.atlas )
				batch.nodes( part.nodes )
				grouped.set( part.nodes[ 0 ], batch )
			}
			const batches = [] as $bog_gamengine_batch[]
			for( let i = 0; i < nodes.length; ++ i ) {
				const node = nodes[ i ]
				const batch = sources.get( node ) ?? grouped.get( node )
				if( batch ) batches.push( batch )
			}
			return batches as readonly $bog_gamengine_batch[]
		}

		@ $mol_mem
		batches( next?: readonly $bog_gamengine_batch[] ) {
			return next ?? this.auto_batches()
		}

		@ $mol_mem
		phys( next?: $bog_gamengine_phys | null ) {
			return next ?? null
		}

		@ $mol_mem
		phys3( next?: $bog_gamengine_phys3 | null ) {
			return next ?? null
		}

		@ $mol_mem
		input( next?: $bog_gamengine_input | null ) {
			return next ?? null
		}

		@ $mol_mem
		cam( next?: $bog_gamengine_cam | null ) {
			return next ?? null
		}

		@ $mol_mem
		aspect( next = 1 ) {
			return next
		}

		frame_done = -1
		frustum = new Float32Array( 24 )
		eye = new Float32Array( 3 )
		snap = new Float32Array( 0 )
		snap_count = 0

		snap_frame = -1

		@ $mol_mem
		kin() {
			const nodes = this.nodes()
			const at = new Map< $bog_gamengine_node, number >()
			for( let i = 0; i < nodes.length; ++i ) at.set( nodes[ i ], i )
			const owner = new Int32Array( nodes.length )
			for( let i = 0; i < nodes.length; ++i ) {
				const parent = nodes[ i ].parent()
				const found = parent ? at.get( parent ) : undefined
				owner[ i ] = found === undefined ? -1 : found
			}
			return owner
		}

		shown_fill( nodes: readonly $bog_gamengine_node[], owner: Int32Array ) {
			for( let i = 0; i < nodes.length; ++i ) {
				let shown = true
				for( let at = i, step = 0; at >= 0 && step < 64; at = owner[ at ], ++step ) {
					if( !nodes[ at ].hidden ) continue
					shown = false
					break
				}
				nodes[ i ].shown_now = shown
			}
		}

		@ $mol_mem
		snapshot(): Float32Array {
			const frame = this.step()
			if( frame === this.snap_frame ) return this.snap
			this.snap_frame = frame
			this.snap_fill( this.nodes() )
			return this.snap
		}

		snapshot_count() {
			this.snapshot()
			return this.snap_count
		}

		@ $mol_mem
		snapshot_version() {
			this.step()
			this.snapshot()
			return this.snap_frame
		}

		snap_fill( nodes: readonly $bog_gamengine_node[] ) {
			if( this.snap.length < nodes.length * 3 ) this.snap = new Float32Array( nodes.length * 3 )
			const snap = this.snap
			for( let i = 0; i < nodes.length; ++i ) {
				const node = nodes[ i ]
				const at = i * 3
				if( node.hidden || !node.shown_now ) {
					snap[ at ] = 0
					snap[ at + 1 ] = 0
					snap[ at + 2 ] = 0
					continue
				}
				const world = node.world()
				snap[ at ] = world[ 12 ]
				snap[ at + 1 ] = world[ 13 ]
				snap[ at + 2 ] = world[ 14 ]
			}
			this.snap_count = nodes.length
		}

		@ $mol_mem
		step() {
			const frame = this.clock().frame()
			const dt = this.clock().dt()
			const input = this.input()
			const nodes = this.nodes()
			const owner = this.kin()
			const phys = this.phys()
			const phys3 = this.phys3()
			phys?.pull()
			phys3?.pull()
			const cam = this.cam()
			const aspect = this.aspect()
			if( frame !== this.frame_done ) {
				this.frame_done = frame
				input?.poll()
				this.shown_fill( nodes, owner )
				for( let i = 0; i < nodes.length; ++i ) {
					const node = nodes[ i ]
					if( node.shown_now ) node.step( dt )
				}
				phys?.step( dt )
				phys3?.step( dt )
				if( cam && nodes.indexOf( cam ) < 0 ) {
					if( !cam.parent() ) cam.parent( this )
					cam.step( dt )
				}
			}
			if( cam ) {
				cam.frustum( aspect, this.frustum )
				const world = cam.world()
				this.eye[ 0 ] = world[ 12 ]
				this.eye[ 1 ] = world[ 13 ]
				this.eye[ 2 ] = world[ 14 ]
			}
			const batches = this.batches()
			for( let i = 0; i < batches.length; ++i ) batches[ i ].fill( cam ? this.frustum : null, cam ? this.eye : null )
			return frame
		}

	}

}
