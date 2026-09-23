namespace $ {

	export class $bog_gamengine_phys3_debug extends $bog_gamengine_node {

		static normal_len = 0.2

		@ $mol_mem
		phys3( next?: $bog_gamengine_phys3 | null ) {
			return next ?? null
		}

		buf = new Float32Array( 0 )

		points() {
			const phys = this.phys3()
			const count = phys ? phys.narrow.contact_count : 0
			const need = count * 6
			if( need > this.buf.length ) this.buf = new Float32Array( need )
			const buf = this.buf
			if( !phys ) return buf
			const point = phys.narrow.contact_point
			const normal = phys.narrow.contact_normal
			const len = $bog_gamengine_phys3_debug.normal_len
			for( let i = 0; i < count; ++ i ) {
				const p = i * 3, o = i * 6
				buf[ o ] = point[ p ]
				buf[ o + 1 ] = point[ p + 1 ]
				buf[ o + 2 ] = point[ p + 2 ]
				buf[ o + 3 ] = point[ p ] + normal[ p ] * len
				buf[ o + 4 ] = point[ p + 1 ] + normal[ p + 1 ] * len
				buf[ o + 5 ] = point[ p + 2 ] + normal[ p + 2 ] * len
			}
			buf.fill( 0, need )
			return buf
		}

	}

}
