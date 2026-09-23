namespace $ {

	export class $bog_gamengine_input extends $mol_object2 {

		@ $mol_mem
		key( next?: $bog_gamengine_key | null ) {
			return next ?? null
		}

		@ $mol_mem
		pad( next?: $bog_gamengine_pad | null ) {
			return next ?? null
		}

		poll() {
			this.pad()?.poll()
		}

		action( name: string ) {
			return ( this.key()?.action( name ) ?? false ) || ( this.pad()?.action( name ) ?? false )
		}

		axis( neg: string, pos: string ) {
			const key = this.key()?.axis( neg, pos ) ?? 0
			if( key !== 0 ) return key
			return this.pad()?.axis( neg, pos ) ?? 0
		}

	}

}
