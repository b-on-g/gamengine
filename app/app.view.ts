namespace $.$$ {

	const vec_empty = new Float32Array( 0 )

	export class $bog_gamestudio_app extends $.$bog_gamestudio_app {

		@ $mol_mem
		selected( next?: number | null ) {
			return next ?? null
		}

		@ $mol_mem
		node() {
			const index = this.selected()
			if( index === null ) return null
			return this.Scene().nodes()[ index ] ?? null
		}

		@ $mol_mem
		node_rows() {
			return this.Scene().nodes().map( ( node, index )=> this.Row( index ) )
		}

		row_title( index: number ) {
			const node = this.Scene().nodes()[ index ]
			return `${ node.constructor.name.replace( /^\$bog_gamengine_/, '' ) } ${ index }`
		}

		row_selected( index: number, next?: boolean ) {
			if( next ) this.selected( index )
			return this.selected() === index
		}

		@ $mol_mem
		fields() {
			const node = this.node()
			if( !node ) return []
			const list = [ this.Vec_field( 'pos' ), this.Vec_field( 'rot' ), this.Vec_field( 'scale' ) ]
			if( node instanceof $bog_gamengine_sprite ) {
				list.push( this.Frame_field(), this.Vec_field( 'tint' ), this.Flip_field(), this.Vec_field( 'size' ) )
			}
			if( node instanceof $bog_gamengine_mesh ) {
				list.push( this.Frame_field(), this.Vec_field( 'tint' ), this.Vec_field( 'size' ) )
			}
			return list
		}

		vec( prop: string, next?: Float32Array ) {
			const node = this.node()
			if( !node ) return vec_empty
			switch( prop ) {
				case 'pos': return node.pos( next )
				case 'rot': return node.rot( next )
				case 'scale': return node.scale( next )
			}
			if( node instanceof $bog_gamengine_sprite || node instanceof $bog_gamengine_mesh ) {
				switch( prop ) {
					case 'tint': return node.tint( next )
					case 'size': return node.size( next )
				}
			}
			return vec_empty
		}

		vec_name( prop: string ) {
			return prop
		}

		vec_nums( prop: string ) {
			return Array.from( this.vec( prop ), ( value, index )=> this.Vec_num( `${ prop }_${ index }` ) )
		}

		vec_value( key: string, next?: number ) {
			const [ prop, index ] = key.split( '_' )
			const at = Number( index )
			if( next === undefined ) return this.vec( prop )[ at ]
			const vec = new Float32Array( this.vec( prop ) )
			vec[ at ] = next
			return this.vec( prop, vec )[ at ]
		}

		frame( next?: string ) {
			const node = this.node()
			if( node instanceof $bog_gamengine_sprite || node instanceof $bog_gamengine_mesh ) return node.frame( next )
			return ''
		}

		@ $mol_mem
		frame_options() {
			const node = this.node()
			if( !( node instanceof $bog_gamengine_sprite || node instanceof $bog_gamengine_mesh ) ) return []
			const atlas = node.atlas()
			return atlas ? [ ... atlas.names().keys() ] : []
		}

		flip_x( next?: boolean ) {
			const node = this.node()
			if( node instanceof $bog_gamengine_sprite ) return node.flip_x( next )
			return false
		}

	}

}
