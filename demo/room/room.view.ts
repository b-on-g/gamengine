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
		shine( next = false ) {
			return next
		}

		@ $mol_mem
		glow( next = false ) {
			return next
		}

		@ $mol_mem
		profile( next = false ) {
			return next
		}

		@ $mol_mem
		passes() {
			const tail = [ this.Tone(), this.Vignette() ]
			return this.glow() ? [ this.Bloom(), ... tail ] : tail
		}

		@ $mol_mem
		foot_rows() {
			return [
				this.Stat(),
				this.Walker_stat(),
				this.Pillar_stat(),
				this.Arm_stat(),
				this.Light_stat(),
				... this.profile() ? [ this.Report() ] : [],
			]
		}

		report_tick() {
			return this.report().tick.toFixed( 2 ) + ' мс'
		}

		report_fill() {
			return this.report().fill.toFixed( 2 ) + ' мс'
		}

		report_shadow() {
			return this.report().shadow.toFixed( 2 ) + ' мс'
		}

		report_main() {
			return this.report().main.toFixed( 2 ) + ' мс'
		}

		report_post() {
			return this.report().post.toFixed( 2 ) + ' мс'
		}

		report_batches() {
			return String( Math.round( this.report().batches ) )
		}

		report_instances() {
			return String( Math.round( this.report().instances ) )
		}

		report_draws() {
			return String( Math.round( this.report().draws ) )
		}

		report_triangles() {
			return String( Math.round( this.report().triangles ) )
		}

		report_bytes() {
			return Math.round( this.report().bytes / 1024 ) + ' КБ'
		}

		@ $mol_mem
		wall_material() {
			return this.shine() ? new Float32Array([ 0.8, 0.2, 0, 0 ]) : new Float32Array([ 0, 0.6, 0, 0 ])
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
		arm_data() {
			return $mol_fetch.buffer( 'bog/gamengine/skin/model/arm.glb' )
		}

		@ $mol_mem
		arm_pos() {
			return new Float32Array([ 4, 0, 3.5 ])
		}

		@ $mol_mem
		arm_nodes() {
			return this.arm_shown() ? [ this.Arm() ] : []
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
		sun_rot() {
			return new Float32Array([ -0.6, 1.1, 0 ])
		}

		@ $mol_mem
		light_warm_pos() {
			return new Float32Array([ 4.5, 1.7, 4.5 ])
		}

		@ $mol_mem
		light_warm_color() {
			return new Float32Array([ 1, 0.6, 0.3 ])
		}

		@ $mol_mem
		light_cold_pos() {
			return new Float32Array([ 6.5, 1.7, 3.5 ])
		}

		@ $mol_mem
		light_cold_color() {
			return new Float32Array([ 0.3, 0.6, 1 ])
		}

		@ $mol_mem
		torch_rot() {
			return new Float32Array([ -0.35, 0, 0 ])
		}

		@ $mol_mem
		lights() {
			return [ this.Sun(), this.Light_warm(), this.Light_cold(), this.Light_torch() ]
		}

		@ $mol_mem
		nodes() {
			return [ ... this.walls(), this.Floor(), this.Pillar(), this.Walker(), ... this.lights(), ... this.arm_nodes() ]
		}

		pillar_stat() {
			try {
				return `pillar ${ this.Pillar_shape().size() }`
			} catch( error ) {
				if( $mol_promise_like( error ) ) return ''
				return $mol_fail_hidden( error )
			}
		}

		arm_stat() {
			if( !this.arm_shown() ) return ''
			try {
				return `arm ${ this.Arm_shape().size() }`
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

		light_stat() {
			return `lights ${ this.Scene().lights().length }`
		}

	}

}
