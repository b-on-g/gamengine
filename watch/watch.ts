namespace $ {

	export class $bog_gamengine_watch extends $mol_object2 {

		seen = [] as unknown[]
		at = 0
		same = true

		open() {
			this.at = 0
			this.same = true
			return this
		}

		of< Value >( value: Value ): Value {
			const at = this.at ++
			if( this.seen[ at ] !== value ) {
				this.seen[ at ] = value
				this.same = false
			}
			return value
		}

		fresh() {
			return this.same && this.at === this.seen.length
		}

	}

}
