namespace $ {

	export class $bog_gamengine_studio_assets_gltf extends $bog_gamengine_shape_gltf {

		@ $mol_mem
		uri( next = '' ) {
			return next
		}

		@ $mol_mem
		data( next?: ArrayBuffer | null ) {
			return next ?? this.$.$mol_fetch.buffer( this.uri() )
		}

	}

}
