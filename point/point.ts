namespace $ {

	export type $bog_gamengine_point_node = $bog_gamengine_node & {
		size?(): Float32Array
	}

	export const $bog_gamengine_point_grab = 0.5

	export class $bog_gamengine_point extends $mol_object2 {

		@ $mol_mem
		cam( next?: $bog_gamengine_cam | null ) {
			return next === undefined ? null : next
		}

		@ $mol_mem
		width( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		height( next?: number ) {
			return next ?? 0
		}

		@ $mol_mem
		scale( next?: number ) {
			return next ?? 1
		}

		screen_pos = new Float32Array( 2 )
		down = false

		move( x: number, y: number ) {
			this.screen_pos[ 0 ] = x
			this.screen_pos[ 1 ] = y
		}

		press( down: boolean ) {
			this.down = down
		}

		@ $mol_mem
		proj_view() {
			const cam = this.cam()
			if( !cam ) return $mol_3d_mat4.identity()
			const aspect = this.width() / this.height()
			const proj = cam.proj( Number.isFinite( aspect ) && aspect > 0 ? aspect : 1 )
			return $mol_3d_mat4.multiply( proj, cam.view() )
		}

		near4 = new Float32Array( 4 )
		far4 = new Float32Array( 4 )
		clip4 = new Float32Array( 4 )
		ray_origin = new Float32Array( 3 )
		ray_dir = new Float32Array( 3 )

		ndc( out: Float32Array, x: number, y: number ) {
			const scale = this.scale()
			out[ 0 ] = x * scale / this.width() * 2 - 1
			out[ 1 ] = 1 - y * scale / this.height() * 2
			return out
		}

		ray( out_origin: Float32Array, out_dir: Float32Array, x: number, y: number ) {

			const inv = this.proj_view().inversed()
			const near = this.near4
			const far = this.far4

			this.ndc( near, x, y )
			far[ 0 ] = near[ 0 ]
			far[ 1 ] = near[ 1 ]
			near[ 2 ] = -1
			far[ 2 ] = 1
			near[ 3 ] = 1
			far[ 3 ] = 1

			$bog_gamengine_vec_mat4_apply( near, inv, near )
			$bog_gamengine_vec_mat4_apply( far, inv, far )

			const nw = near[ 3 ]
			const fw = far[ 3 ]
			for( let i = 0; i < 3; ++ i ) {
				out_origin[ i ] = near[ i ] / nw
				out_dir[ i ] = far[ i ] / fw - out_origin[ i ]
			}

			$bog_gamengine_vec_norm( out_dir, out_dir )
			return out_dir
		}

		world( out: Float32Array, x: number, y: number ) {
			const origin = this.ray_origin
			const dir = this.ray_dir
			this.ray( origin, dir, x, y )
			if( dir[ 2 ] === 0 ) {
				out[ 0 ] = NaN
				out[ 1 ] = NaN
				out[ 2 ] = NaN
				return out
			}
			const t = - origin[ 2 ] / dir[ 2 ]
			out[ 0 ] = origin[ 0 ] + dir[ 0 ] * t
			out[ 1 ] = origin[ 1 ] + dir[ 1 ] * t
			out[ 2 ] = 0
			return out
		}

		screen( out: Float32Array, pos: Float32Array ) {
			const clip = this.clip4
			clip[ 0 ] = pos[ 0 ]
			clip[ 1 ] = pos[ 1 ]
			clip[ 2 ] = pos[ 2 ]
			clip[ 3 ] = 1
			$bog_gamengine_vec_mat4_apply( clip, this.proj_view(), clip )
			const w = clip[ 3 ]
			const scale = this.scale()
			out[ 0 ] = ( clip[ 0 ] / w + 1 ) / 2 * this.width() / scale
			out[ 1 ] = ( 1 - clip[ 1 ] / w ) / 2 * this.height() / scale
			out[ 2 ] = w
			return out
		}

		box_from = new Float32Array( 3 )
		box_to = new Float32Array( 3 )
		box_hits = [] as $bog_gamengine_node[]

		pick_box( nodes: readonly $bog_gamengine_node[], x0: number, y0: number, x1: number, y1: number, out?: number[] ) {

			const from = this.world( this.box_from, Math.min( x0, x1 ), Math.min( y0, y1 ) )
			const to = this.world( this.box_to, Math.max( x0, x1 ), Math.max( y0, y1 ) )

			const lo_x = Math.min( from[ 0 ], to[ 0 ] )
			const hi_x = Math.max( from[ 0 ], to[ 0 ] )
			const lo_y = Math.min( from[ 1 ], to[ 1 ] )
			const hi_y = Math.max( from[ 1 ], to[ 1 ] )

			const hits = this.box_hits
			hits.length = 0
			if( out ) out.length = 0

			for( let n = 0; n < nodes.length; ++ n ) {

				const node = nodes[ n ]
				const box = node.aabb()
				const wide = box[ 0 ] <= box[ 3 ]
				const world = wide ? null : node.world()

				const left = wide ? box[ 0 ] : world![ 12 ]
				const right = wide ? box[ 3 ] : world![ 12 ]
				const bottom = wide ? box[ 1 ] : world![ 13 ]
				const top = wide ? box[ 4 ] : world![ 13 ]

				if( right < lo_x || left > hi_x ) continue
				if( top < lo_y || bottom > hi_y ) continue

				hits.push( nodes[ n ] )
				if( out ) out.push( n )

			}

			return hits as readonly $bog_gamengine_node[]
		}

		pick( nodes: readonly $bog_gamengine_node[], x: number, y: number ) {

			const origin = this.ray_origin
			const dir = this.ray_dir
			this.ray( origin, dir, x, y )

			let best: $bog_gamengine_node | null = null
			let best_t = Infinity

			for( let n = 0; n < nodes.length; ++ n ) {

				const node = nodes[ n ]
				const world = node.world()
				const box = node.aabb()
				const grab = $bog_gamengine_point_grab

				let tmin = - Infinity
				let tmax = Infinity
				let hit = true

				for( let i = 0; i < 3; ++ i ) {
					const wide = box[ i ] <= box[ i + 3 ]
					const mid = wide ? ( box[ i ] + box[ i + 3 ] ) / 2 : world[ 12 + i ]
					const half = Math.max( wide ? ( box[ i + 3 ] - box[ i ] ) / 2 : 0, grab )
					const lo = mid - half
					const hi = mid + half
					const o = origin[ i ]
					const d = dir[ i ]
					if( d === 0 ) {
						if( o < lo || o > hi ) {
							hit = false
							break
						}
						continue
					}
					let t1 = ( lo - o ) / d
					let t2 = ( hi - o ) / d
					if( t1 > t2 ) {
						const swap = t1
						t1 = t2
						t2 = swap
					}
					if( t1 > tmin ) tmin = t1
					if( t2 < tmax ) tmax = t2
					if( tmax < tmin ) {
						hit = false
						break
					}
				}

				if( !hit || tmax < 0 ) continue
				const t = tmin < 0 ? 0 : tmin
				if( t < best_t ) {
					best_t = t
					best = node
				}

			}

			return best
		}

	}

}
