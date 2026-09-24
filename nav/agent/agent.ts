namespace $ {

	export class $bog_gamengine_nav_agent extends $bog_gamengine_node {

		@ $mol_mem
		grid( next?: $bog_gamengine_nav_grid | null ) {
			return next ?? null
		}

		@ $mol_mem
		mesh( next?: $bog_gamengine_nav_mesh | null ) {
			return next ?? null
		}

		@ $mol_mem
		speed( next = 3 ) {
			return next
		}

		@ $mol_mem
		radius( next = 0.4 ) {
			return next
		}

		@ $mol_mem
		replan( next = 0.5 ) {
			return next
		}

		@ $mol_mem
		others( next?: readonly $bog_gamengine_nav_agent[] ) {
			return next ?? []
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'speed', kind: 'number', get: ()=> this.speed(), set: next => this.speed( next as number ) },
				{ name: 'radius', kind: 'number', get: ()=> this.radius(), set: next => this.radius( next as number ) },
				{ name: 'replan', kind: 'number', get: ()=> this.replan(), set: next => this.replan( next as number ) },
				{
					name: 'others',
					kind: 'nodes',
					get: ()=> this.others(),
					set: next => this.others( next as readonly $bog_gamengine_nav_agent[] ),
				},
				{
					name: 'target',
					kind: 'point',
					get: ()=> this.goal,
					set: next => {
						const at = next as ArrayLike< number >
						this.aim( at[ 0 ] ?? 0, at[ 1 ] ?? 0, at[ 2 ] ?? 0 )
					},
				},
				{
					name: 'aimed',
					kind: 'flag',
					get: ()=> this.goal_on,
					set: next => {
						if( next ) this.aim( this.goal[ 0 ], this.goal[ 1 ], this.goal[ 2 ] )
						else this.stop()
					},
				},
			]
		}

		goal = new Float32Array( 3 )
		goal_on = false

		target( next?: Float32Array | null ): Float32Array | null {
			if( next !== undefined ) {
				if( next ) this.aim( next[ 0 ], next[ 1 ], next.length > 2 ? next[ 2 ] : 0 )
				else this.stop()
			}
			return this.goal_on ? this.goal : null
		}

		aim( x: number, y: number, z = 0 ) {
			this.goal[ 0 ] = x
			this.goal[ 1 ] = y
			this.goal[ 2 ] = z
			this.goal_on = true
			this.since = Infinity
			return this.goal
		}

		stop() {
			this.goal_on = false
			this.count = 0
			this.index = 0
		}

		route = new Float32Array( 0 )
		stride = 2
		count = 0
		index = 0
		since = Infinity
		vel = new Float32Array( 3 )

		path_count() {
			return this.count
		}

		plan( pos: Float32Array, target: Float32Array ) {
			const grid = this.grid()
			const mesh = this.mesh()
			if( grid ) {
				const need = grid.width() * grid.height() * 2 + 4
				if( this.route.length < need ) this.route = new Float32Array( need )
				this.stride = 2
				this.count = grid.smooth( this.route, grid.path( pos, target, this.route ), this.route )
			} else if( mesh ) {
				mesh.build()
				const need = ( mesh.portal_count + 2 ) * 3
				if( this.route.length < need ) this.route = new Float32Array( need )
				this.stride = 3
				this.count = mesh.path( pos, target, this.route )
			} else {
				this.count = 0
			}
			this.index = this.count > 1 ? 1 : 0
			this.since = 0
		}

		step( dt: number ) {

			const target = this.target()
			if( !target ) return
			const pos = this.pos()
			const radius = this.radius()
			const speed = this.speed()

			this.since += dt
			if( this.since >= this.replan() ) this.plan( pos, target )

			const route = this.route
			const stride = this.stride
			const vel = this.vel
			vel[ 0 ] = 0
			vel[ 1 ] = 0
			vel[ 2 ] = 0

			while( this.index < this.count ) {
				const base = this.index * stride
				const dx = route[ base ] - pos[ 0 ]
				const dy = route[ base + 1 ] - pos[ 1 ]
				const dz = stride === 3 ? route[ base + 2 ] - pos[ 2 ] : 0
				const dist = Math.sqrt( dx * dx + dy * dy + dz * dz )
				if( dist < radius ) {
					++ this.index
					continue
				}
				vel[ 0 ] = dx / dist * speed
				vel[ 1 ] = dy / dist * speed
				vel[ 2 ] = dz / dist * speed
				break
			}

			const others = this.others()
			for( let i = 0; i < others.length; ++i ) {
				const other = others[ i ]
				if( other === this ) continue
				const op = other.pos()
				const dx = pos[ 0 ] - op[ 0 ]
				const dy = pos[ 1 ] - op[ 1 ]
				const dz = pos[ 2 ] - op[ 2 ]
				const reach = radius + other.radius()
				const dist = Math.sqrt( dx * dx + dy * dy + dz * dz )
				if( dist >= reach || dist === 0 ) continue
				const k = ( reach - dist ) / reach * speed / dist
				vel[ 0 ] += dx * k
				vel[ 1 ] += dy * k
				vel[ 2 ] += dz * k
			}

			const len = Math.sqrt( vel[ 0 ] * vel[ 0 ] + vel[ 1 ] * vel[ 1 ] + vel[ 2 ] * vel[ 2 ] )
			if( len === 0 ) return
			const k = len > speed ? speed / len : 1

			const next = new Float32Array( 3 )
			next[ 0 ] = pos[ 0 ] + vel[ 0 ] * k * dt
			next[ 1 ] = pos[ 1 ] + vel[ 1 ] * k * dt
			next[ 2 ] = pos[ 2 ] + vel[ 2 ] * k * dt
			this.pos( next )

		}

	}

}
