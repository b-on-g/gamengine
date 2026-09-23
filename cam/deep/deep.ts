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

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'fov', kind: 'number', get: ()=> this.fov(), set: next => this.fov( next as number ) },
				{ name: 'near', kind: 'number', get: ()=> this.near(), set: next => this.near( next as number ) },
				{ name: 'far', kind: 'number', get: ()=> this.far(), set: next => this.far( next as number ) },
			]
		}

		proj( aspect: number ) {
			return $mol_3d_mat4.perspective( this.fov(), aspect, this.near(), this.far() )
		}

	}

}
