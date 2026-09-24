namespace $ {

	export class $bog_gamengine_cam_deep extends $bog_gamengine_cam {

		@ $mol_mem
		fov( next?: number ) {
			return next ?? Math.PI / 3
		}

		@ $mol_mem
		near( next?: number ) {
			return next ?? 0.1
		}

		@ $mol_mem
		far( next?: number ) {
			return next ?? 100
		}

		@ $mol_mem
		follow( next?: $bog_gamengine_node | null ) {
			return next ?? null
		}

		@ $mol_mem
		lift( next?: number ) {
			return next ?? 0
		}

		step( dt: number ) {
			const node = this.follow()
			if( !node ) return
			const at = node.pos()
			const lift = this.lift()
			const pos = this.pos()
			if( pos[ 0 ] !== at[ 0 ] || pos[ 1 ] !== at[ 1 ] + lift || pos[ 2 ] !== at[ 2 ] ) {
				const next = new Float32Array( 3 )
				next[ 0 ] = at[ 0 ]
				next[ 1 ] = at[ 1 ] + lift
				next[ 2 ] = at[ 2 ]
				this.pos( next )
			}
			const turn = node.rot()
			const rot = this.rot()
			if( rot[ 0 ] === turn[ 0 ] && rot[ 1 ] === turn[ 1 ] && rot[ 2 ] === turn[ 2 ] ) return
			const next = new Float32Array( 3 )
			next[ 0 ] = turn[ 0 ]
			next[ 1 ] = turn[ 1 ]
			next[ 2 ] = turn[ 2 ]
			this.rot( next )
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'lift', kind: 'number', get: ()=> this.lift(), set: next => this.lift( next as number ) },
				{ name: 'fov', kind: 'number', get: ()=> this.fov(), set: next => this.fov( next as number ) },
				{ name: 'near', kind: 'number', get: ()=> this.near(), set: next => this.near( next as number ) },
				{ name: 'far', kind: 'number', get: ()=> this.far(), set: next => this.far( next as number ) },
			]
		}

		@ $mol_mem_key
		proj( aspect: number ) {
			return $mol_3d_mat4.perspective( this.fov(), aspect, this.near(), this.far() )
		}

	}

}
