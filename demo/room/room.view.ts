namespace $.$$ {

	export class $bog_gamengine_demo_room extends $.$bog_gamengine_demo_room {

		@ $mol_mem
		wall_ids() {
			const rows = this.Tile().rows()
			const ids = [] as string[]
			for( let y = 0; y < rows.length; ++y ) {
				for( let x = 0; x < rows[ y ].length; ++x ) {
					if( this.Tile().cell( x, y ) ) ids.push( `${ x }_${ y }` )
				}
			}
			return ids as readonly string[]
		}

		@ $mol_mem_key
		wall_pos( id: string ) {
			const [ x, y ] = id.split( '_' ).map( Number )
			return new Float32Array([ x + 0.5, 0.5, y + 0.5 ])
		}

		@ $mol_mem
		walls() {
			return this.wall_ids().map( id => this.Wall( id ) )
		}

		@ $mol_mem
		floor_pos() {
			return new Float32Array([ this.Tile().width() / 2, 0, this.Tile().height() / 2 ])
		}

		@ $mol_mem
		floor_size() {
			return new Float32Array([ this.Tile().width(), 1, this.Tile().height() ])
		}

		@ $mol_mem
		pillar_data() {
			return $mol_fetch.buffer( 'bog/gamengine/demo/room/model/pillar.glb' )
		}

		@ $mol_mem
		pillar_pos() {
			return new Float32Array([ 6.5, 0.5, 3.5 ])
		}

		@ $mol_mem
		walker_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 6, 0.5, 7.5 ])
		}

		@ $mol_mem
		walker_rot( next?: Float32Array ) {
			return next ?? new Float32Array([ 0, 0, 0 ])
		}

		@ $mol_mem
		nodes() {
			return [ ... this.walls(), this.Floor(), this.Pillar(), this.Walker() ]
		}

		pillar_stat() {
			try {
				return `pillar ${ this.Pillar_shape().size() }`
			} catch( error ) {
				if( $mol_promise_like( error ) ) return ''
				return $mol_fail_hidden( error )
			}
		}

		walker_stat() {
			if( !this.Atlas().ready() ) return ''
			const pos = this.walker_pos()
			const yaw = this.walker_rot()[ 1 ]
			return `walker ${ pos[ 0 ].toFixed( 2 ) } × ${ pos[ 2 ].toFixed( 2 ) } yaw ${ yaw.toFixed( 2 ) }`
		}

	}

}
