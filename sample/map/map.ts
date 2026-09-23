namespace $ {

	export class $bog_gamestudio_sample_map extends $bog_gamengine_scene {

		@ $mol_mem
		map( next = '' ) {
			return next
		}

		@ $mol_mem
		palette( next?: Readonly< Record< string, string > > ) {
			return next ?? {}
		}

		@ $mol_mem
		atlas( next?: $bog_gamengine_atlas | null ) {
			return next ?? null
		}

		@ $mol_mem
		rows() {
			return this.map().split( '\n' ).map( row => [ ...row ] as readonly string[] ) as readonly ( readonly string[] )[]
		}

		cell_id( x: number, y: number ) {
			return `${ x }_${ y }`
		}

		cell_xy( id: string ) {
			return id.split( '_' ).map( Number ) as [ number, number ]
		}

		cell_at( wx: number, wy: number ) {
			return [ Math.floor( wx ), Math.floor( - wy ) ] as [ number, number ]
		}

		@ $mol_mem_key
		cell_char( id: string, next?: string ) {
			if( next !== undefined ) return next
			const [ x, y ] = this.cell_xy( id )
			return this.rows()[ y ]?.[ x ] ?? ' '
		}

		@ $mol_mem_key
		Cell( id: string ) {
			const [ x, y ] = this.cell_xy( id )
			const cell = new this.$.$bog_gamengine_sprite
			cell.parent( this )
			cell.pos( new Float32Array([ x + 0.5, - y - 0.5, 0 ]) )
			cell.atlas = ()=> this.atlas()
			cell.frame = ()=> this.palette()[ this.cell_char( id ) ] ?? ''
			return cell
		}

		@ $mol_mem
		Cells( next?: $bog_gamengine_batch ) {
			return next ?? new this.$.$bog_gamengine_batch
		}

		@ $mol_mem
		cells_batch() {
			const batch = this.Cells()
			batch.shader( this.Shader_sprite() )
			batch.shape( this.Shape_quad() )
			batch.atlas( this.atlas() )
			batch.nodes( this.cells() )
			return batch
		}

		@ $mol_mem
		batches( next?: readonly $bog_gamengine_batch[] ) {
			return next ?? [ this.cells_batch(), ... this.auto_batches() ]
		}

		@ $mol_mem
		cells() {
			const rows = this.rows()
			const palette = this.palette()
			const cells = [] as $bog_gamengine_sprite[]
			for( let y = 0; y < rows.length; ++y ) {
				for( let x = 0; x < rows[ y ].length; ++x ) {
					const id = this.cell_id( x, y )
					if( !palette[ this.cell_char( id ) ] ) continue
					cells.push( this.Cell( id ) )
				}
			}
			return cells as readonly $bog_gamengine_sprite[]
		}

	}

}
