namespace $ {

	export class $bog_gamengine_phys extends $mol_object2 {

		@ $mol_mem
		bodies( next?: readonly $bog_gamengine_phys_body[] ) {
			return next ?? []
		}

		@ $mol_mem
		tile( next?: $bog_gamengine_phys_tile | null ) {
			return next ?? null
		}

		eps = 1e-4

		step( dt: number ) {
			const bodies = this.bodies()
			const tile = this.tile()
			for( let i = 0; i < bodies.length; ++i ) {
				if( bodies[ i ].still() ) continue
				this.move( bodies[ i ], bodies[ i ].ghost() ? null : tile, dt )
			}
			for( let i = 0; i < bodies.length; ++i ) {
				for( let j = i + 1; j < bodies.length; ++j ) this.touch( bodies[ i ], bodies[ j ] )
			}
		}

		move( body: $bog_gamengine_phys_body, tile: $bog_gamengine_phys_tile | null, dt: number ) {

			const pos = body.pos()
			const vel = body.vel()
			const size = body.size()
			const hw = size[ 0 ] / 2
			const hh = body.kind() === 'circle' ? hw : size[ 1 ] / 2
			const eps = this.eps

			let x = pos[ 0 ] + vel[ 0 ] * dt
			let y = pos[ 1 ]
			let vx = vel[ 0 ]
			let vy = vel[ 1 ]
			let hit = false

			if( tile ) {

				const ry0 = Math.floor( - ( y + hh ) + eps )
				const ry1 = Math.floor( - ( y - hh ) - eps )

				if( vx >= 0 ) {
					const cx = Math.floor( x + hw )
					if( this.col_solid( tile, cx, ry0, ry1 ) ) {
						const nx = cx - hw
						if( nx !== x || vx !== 0 ) {
							x = nx
							vx = 0
							hit = true
						}
					}
				}

				if( vx <= 0 ) {
					const cx = Math.floor( x - hw )
					if( this.col_solid( tile, cx, ry0, ry1 ) ) {
						const nx = cx + 1 + hw
						if( nx !== x || vx !== 0 ) {
							x = nx
							vx = 0
							hit = true
						}
					}
				}

			}

			y = pos[ 1 ] + vy * dt

			if( tile ) {

				const cx0 = Math.floor( x - hw + eps )
				const cx1 = Math.floor( x + hw - eps )

				if( vy >= 0 ) {
					const cy = Math.floor( - ( y + hh ) )
					if( this.row_solid( tile, cy, cx0, cx1 ) ) {
						const ny = - cy - 1 - hh
						if( ny !== y || vy !== 0 ) {
							y = ny
							vy = 0
							hit = true
						}
					}
				}

				if( vy <= 0 ) {
					const cy = Math.floor( - ( y - hh ) )
					if( this.row_solid( tile, cy, cx0, cx1 ) ) {
						const ny = - cy + hh
						if( ny !== y || vy !== 0 ) {
							y = ny
							vy = 0
							hit = true
						}
					}
				}

			}

			const next = new Float32Array( 3 )
			next[ 0 ] = x
			next[ 1 ] = y
			next[ 2 ] = pos[ 2 ]
			body.pos( next )

			if( !hit ) return

			const next_vel = new Float32Array( 3 )
			next_vel[ 0 ] = vx
			next_vel[ 1 ] = vy
			next_vel[ 2 ] = vel[ 2 ]
			body.vel( next_vel )
			body.hit( null )

		}

		col_solid( tile: $bog_gamengine_phys_tile, cx: number, cy0: number, cy1: number ) {
			for( let cy = cy0; cy <= cy1; ++cy ) if( tile.cell( cx, cy ) ) return true
			return false
		}

		row_solid( tile: $bog_gamengine_phys_tile, cy: number, cx0: number, cx1: number ) {
			for( let cx = cx0; cx <= cx1; ++cx ) if( tile.cell( cx, cy ) ) return true
			return false
		}

		touch( a: $bog_gamengine_phys_body, b: $bog_gamengine_phys_body ) {

			const a_still = a.still()
			const b_still = b.still()
			if( a_still && b_still ) return

			const ap = a.pos()
			const bp = b.pos()
			const as = a.size()
			const bs = b.size()
			const dx = bp[ 0 ] - ap[ 0 ]
			const dy = bp[ 1 ] - ap[ 1 ]

			let px = 0
			let py = 0

			if( a.kind() === 'circle' && b.kind() === 'circle' ) {

				const r = ( as[ 0 ] + bs[ 0 ] ) / 2
				const d = Math.sqrt( dx * dx + dy * dy )
				if( d >= r ) return
				if( d === 0 ) {
					px = r
				} else {
					px = ( r - d ) * dx / d
					py = ( r - d ) * dy / d
				}

			} else {

				const ahw = as[ 0 ] / 2
				const ahh = a.kind() === 'circle' ? ahw : as[ 1 ] / 2
				const bhw = bs[ 0 ] / 2
				const bhh = b.kind() === 'circle' ? bhw : bs[ 1 ] / 2
				const ox = ahw + bhw - Math.abs( dx )
				const oy = ahh + bhh - Math.abs( dy )
				if( ox <= 0 || oy <= 0 ) return
				if( ox <= oy ) px = dx < 0 ? - ox : ox
				else py = dy < 0 ? - oy : oy

			}

			if( !a.ghost() && !b.ghost() ) this.push( a, b, px, py )

			a.hit( b )
			b.hit( a )

		}

		push( a: $bog_gamengine_phys_body, b: $bog_gamengine_phys_body, px: number, py: number ) {
			if( a.still() ) {
				this.shift( b, px, py, true )
			} else if( b.still() ) {
				this.shift( a, - px, - py, true )
			} else {
				this.shift( a, - px / 2, - py / 2, false )
				this.shift( b, px / 2, py / 2, false )
			}
		}

		shift( body: $bog_gamengine_phys_body, sx: number, sy: number, stop: boolean ) {

			const pos = body.pos()
			const next = new Float32Array( 3 )
			next[ 0 ] = pos[ 0 ] + sx
			next[ 1 ] = pos[ 1 ] + sy
			next[ 2 ] = pos[ 2 ]
			body.pos( next )

			if( !stop ) return

			const vel = body.vel()
			const len = Math.sqrt( sx * sx + sy * sy )
			if( len === 0 ) return
			const nx = sx / len
			const ny = sy / len
			const into = vel[ 0 ] * nx + vel[ 1 ] * ny
			if( into >= 0 ) return

			const next_vel = new Float32Array( 3 )
			next_vel[ 0 ] = vel[ 0 ] - into * nx
			next_vel[ 1 ] = vel[ 1 ] - into * ny
			next_vel[ 2 ] = vel[ 2 ]
			body.vel( next_vel )

		}

	}

}
