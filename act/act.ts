namespace $ {

	export class $bog_legion_act extends $bog_gamengine_brain_bt_act {

		mode() {
			return ''
		}

		tick( dt: number, brain: $bog_gamengine_brain_bt ) {
			const owner = brain.owner()
			if( !( owner instanceof $bog_legion_unit ) ) return this.status_now = 'fail'
			owner.mode_set( this.mode() )
			return this.status_now = 'ok'
		}

	}

}
