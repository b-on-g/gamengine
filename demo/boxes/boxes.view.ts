namespace $.$$ {

	const box_half = 0.5
	const pile_gap = 0.1
	const pile_step = box_half * 2 * Math.sqrt( 3 ) + pile_gap
	const pile_layers = 3
	const throw_speed = 8
	const throw_ahead = 1.5
	const chain_links = 5
	const chain_half = 0.3
	const chain_link = 1
	const chain_top = 6
	const chain_x = -4
	const chain_push = 2
	const door_x = 4
	const door_lift = 0.05
	const side_ahead = 3

	export function $bog_gamengine_demo_boxes_rand( seed: number ) {
		let state = seed | 0
		return ()=> {
			state = ( state + 0x6D2B79F5 ) | 0
			let t = Math.imul( state ^ ( state >>> 15 ), 1 | state )
			t = ( t + Math.imul( t ^ ( t >>> 7 ), 61 | t ) ) ^ t
			return ( ( t ^ ( t >>> 14 ) ) >>> 0 ) / 4294967296
		}
	}

	export class $bog_gamengine_demo_boxes extends $.$bog_gamengine_demo_boxes {

		@ $mol_mem
		count( next?: number ) {
			if( next !== undefined ) return next
			return Number( this.$.$mol_state_arg.value( 'count' ) ) || super.count()
		}

		reset( next?: Event | null ) {
			if( !next ) return null
			this.seed( this.seed() + 1 )
			this.thrown_count( 0 )
			return next
		}

		pile_side() {
			return Math.ceil( Math.sqrt( this.count() / pile_layers ) )
		}

		@ $mol_mem
		Phys() {
			const count = this.count()
			const rand = $bog_gamengine_demo_boxes_rand( this.seed() )
			const phys = new this.$.$bog_gamengine_demo_boxes_phys
			this.chain_first = -1
			phys.add( $bog_gamengine_phys3.shape_plane, new Float32Array([ 0, 1, 0 ]), 0, new Float32Array( 3 ) )
			const side = this.pile_side()
			const size = new Float32Array([ box_half, box_half, box_half ])
			const pos = new Float32Array( 3 )
			const rot = new Float32Array( 4 )
			for( let i = 0; i < count; ++ i ) {
				const cell = i % ( side * side )
				const layer = Math.floor( i / ( side * side ) )
				pos[ 0 ] = ( cell % side - ( side - 1 ) / 2 ) * pile_step
				pos[ 1 ] = box_half * 2 + layer * pile_step
				pos[ 2 ] = ( Math.floor( cell / side ) - ( side - 1 ) / 2 ) * pile_step
				$bog_gamengine_vec_quat_from_euler( rot, rand() * Math.PI * 2, rand() * Math.PI * 2, rand() * Math.PI * 2 )
				phys.add( $bog_gamengine_phys3.shape_box, size, 1, pos, rot )
			}
			return phys
		}

		@ $mol_mem
		floor_size() {
			return new Float32Array([ 60, 1, 60 ])
		}

		@ $mol_mem
		walker_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 0, 1.5, ( this.pile_side() - 1 ) / 2 * pile_step + 8 ])
		}

		@ $mol_mem
		walker_rot( next?: Float32Array ) {
			return next ?? new Float32Array([ -0.2, 0, 0 ])
		}

		@ $mol_mem
		thrown_count( next = 0 ) {
			return next
		}

		@ $mol_mem
		thrown() {
			const seed = this.seed()
			const list = [] as $bog_gamengine_phys3_body[]
			for( let i = 0; i < this.thrown_count(); ++ i ) list.push( this.Thrown( `${ seed }_${ i }` ) )
			return list as readonly $bog_gamengine_phys3_body[]
		}

		@ $mol_mem
		nodes() {
			return [ this.Floor(), this.Walker(), ... this.thrown() ]
		}

		@ $mol_mem
		batches() {
			const list = [ this.Crates(), ... this.Scene().auto_batches() ]
			if( this.contacts() ) list.push( this.Contact_batch() )
			return list as readonly $bog_gamengine_batch[]
		}

		contact_points() {
			this.Scene().step()
			return this.Debug().points()
		}

		throw_dir = new Float32Array([ 0, 0, -1, 0 ])
		throw_out = new Float32Array( 4 )

		shoot( next?: PointerEvent | null ) {
			if( !next ) return null
			const phys = this.Phys()
			const dir = $bog_gamengine_vec_mat4_apply( this.throw_out, this.Walker().world(), this.throw_dir )
			const from = this.Walker().pos()
			const id = this.thrown_count()
			const body = this.Thrown( `${ this.seed() }_${ id }` )
			body.phys3( phys )
			body.pos( new Float32Array([
				from[ 0 ] + dir[ 0 ] * throw_ahead,
				from[ 1 ] + dir[ 1 ] * throw_ahead,
				from[ 2 ] + dir[ 2 ] * throw_ahead,
			]) )
			const i = body.index()
			phys.vel[ i * 3 ] = dir[ 0 ] * throw_speed
			phys.vel[ i * 3 + 1 ] = dir[ 1 ] * throw_speed
			phys.vel[ i * 3 + 2 ] = dir[ 2 ] * throw_speed
			this.thrown_count( id + 1 )
			return next
		}

		side_z() {
			return ( this.pile_side() - 1 ) / 2 * pile_step + side_ahead
		}

		chain_first = -1

		chain( next?: Event | null ) {
			if( !next ) return null
			const phys = this.Phys()
			const size = new Float32Array([ chain_half, chain_half, chain_half ])
			const pos = new Float32Array([ chain_x, 0, this.side_z() ])
			const top = new Float32Array([ 0, chain_link / 2, 0 ])
			const bottom = new Float32Array([ 0, - chain_link / 2, 0 ])
			const axis = new Float32Array([ 0, 0, 1 ])
			const hook = new Float32Array([ chain_x, chain_top, this.side_z() ])
			let prev = -1
			for( let n = 0; n < chain_links; ++ n ) {
				pos[ 1 ] = chain_top - chain_link / 2 - n * chain_link
				const i = phys.add( $bog_gamengine_phys3.shape_box, size, 1, pos )
				if( n === 0 ) {
					this.chain_first = i
					phys.joint.add( $bog_gamengine_phys3_joint.type_point, i, 0, top, hook )
				} else {
					phys.joint.add( $bog_gamengine_phys3_joint.type_hinge, i, prev, top, bottom, axis )
				}
				prev = i
			}
			phys.vel[ prev * 3 ] = chain_push
			return next
		}

		chain_drop() {
			const phys = this.Phys()
			const first = this.chain_first
			const last = first + chain_links - 1
			if( first < 0 || last >= phys.count ) return 0
			return phys.pos[ first * 3 + 1 ] - phys.pos[ last * 3 + 1 ]
		}

		door( next?: Event | null ) {
			if( !next ) return null
			const phys = this.Phys()
			const z = this.side_z()
			const post_size = new Float32Array([ 0.15, 1.5, 0.15 ])
			const post = phys.add( $bog_gamengine_phys3.shape_box, post_size, 0, new Float32Array([ door_x, 1.5, z ]) )
			const leaf_size = new Float32Array([ 0.5, 1, 0.1 ])
			const leaf = phys.add( $bog_gamengine_phys3.shape_box, leaf_size, 1, new Float32Array([ door_x + 0.8, 1 + door_lift, z ]) )
			phys.joint.add(
				$bog_gamengine_phys3_joint.type_hinge, post, leaf,
				new Float32Array([ 0.3, door_lift - 0.5, 0 ]), new Float32Array([ -0.5, 0, 0 ]),
				new Float32Array([ 0, 1, 0 ]), new Float32Array([ - Math.PI / 2, Math.PI / 2 ]),
			)
			return next
		}

		@ $mol_mem
		aspect() {
			const aspect = this.Draw().width() / this.Draw().height()
			return Number.isFinite( aspect ) && aspect > 0 ? aspect : 1
		}

		@ $mol_mem
		cull_stat() {
			this.Scene().step()
			const crates = this.Crates()
			return `drawn ${ crates.count } / ${ this.Phys().count - crates.skip() }`
		}

		@ $mol_mem
		phys_stat() {
			this.Scene().step()
			const phys = this.Phys()
			return `bodies ${ phys.count } | contacts ${ phys.narrow.contact_count } | joints ${ phys.joint.count } | chain_drop ${ this.chain_drop().toFixed( 2 ) } | phys ${ phys.step_ms().toFixed( 2 ) } ms | low ${ phys.low().toFixed( 2 ) }`
		}

	}

}
