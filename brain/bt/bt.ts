namespace $ {

	export type $bog_gamengine_brain_bt_status = 'ok' | 'fail' | 'run'

	export class $bog_gamengine_brain_bt_node extends $bog_gamengine_node {

		status_now: $bog_gamengine_brain_bt_status = 'fail'

		tick( dt: number, brain: $bog_gamengine_brain_bt ): $bog_gamengine_brain_bt_status {
			return this.status_now
		}

		kid( at: number ) {
			const kid = this.kids()[ at ]
			return kid instanceof $bog_gamengine_brain_bt_node ? kid : null
		}

	}

	export class $bog_gamengine_brain_bt extends $bog_gamengine_brain_bt_node {

		@ $mol_mem
		owner( next?: $bog_gamengine_node | null ) {
			return next ?? this.parent()
		}

		@ $mol_mem
		status( next?: $bog_gamengine_brain_bt_status ) {
			return next ?? this.status_now
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'status', kind: 'text', get: ()=> this.status(), set: next => {} },
			]
		}

		cond( name: string ) {
			const owner = this.owner()
			if( !owner ) return false
			const props = owner.props()
			for( let i = 0; i < props.length; ++i ) {
				const prop = props[ i ]
				if( prop.name !== name ) continue
				if( prop.kind === 'flag' ) return Boolean( prop.get() )
				if( prop.kind === 'number' ) return ( prop.get() as number ) > 0
				return false
			}
			return false
		}

		tick( dt: number, brain: $bog_gamengine_brain_bt ) {
			const kid = this.kid( 0 )
			this.status_now = kid ? kid.tick( dt, brain ) : 'fail'
			return this.status_now
		}

		step( dt: number ) {
			const prev = this.status_now
			const status = this.tick( dt, this )
			if( status !== prev ) this.status( status )
		}

	}

	export class $bog_gamengine_brain_bt_seq extends $bog_gamengine_brain_bt_node {

		at = 0

		tick( dt: number, brain: $bog_gamengine_brain_bt ) {
			const kids = this.kids()
			while( this.at < kids.length ) {
				const kid = this.kid( this.at )
				const status = kid ? kid.tick( dt, brain ) : 'fail'
				if( status === 'run' ) return this.status_now = 'run'
				if( status === 'fail' ) {
					this.at = 0
					return this.status_now = 'fail'
				}
				++ this.at
			}
			this.at = 0
			return this.status_now = 'ok'
		}

	}

	export class $bog_gamengine_brain_bt_sel extends $bog_gamengine_brain_bt_node {

		at = 0

		tick( dt: number, brain: $bog_gamengine_brain_bt ) {
			const kids = this.kids()
			while( this.at < kids.length ) {
				const kid = this.kid( this.at )
				const status = kid ? kid.tick( dt, brain ) : 'fail'
				if( status === 'run' ) return this.status_now = 'run'
				if( status === 'ok' ) {
					this.at = 0
					return this.status_now = 'ok'
				}
				++ this.at
			}
			this.at = 0
			return this.status_now = 'fail'
		}

	}

	export class $bog_gamengine_brain_bt_par extends $bog_gamengine_brain_bt_node {

		tick( dt: number, brain: $bog_gamengine_brain_bt ) {
			const kids = this.kids()
			let result: $bog_gamengine_brain_bt_status = 'ok'
			for( let i = 0; i < kids.length; ++i ) {
				const kid = this.kid( i )
				const status = kid ? kid.tick( dt, brain ) : 'fail'
				if( status === 'fail' ) result = 'fail'
				if( status === 'run' && result === 'ok' ) result = 'run'
			}
			return this.status_now = result
		}

	}

	export class $bog_gamengine_brain_bt_inv extends $bog_gamengine_brain_bt_node {

		tick( dt: number, brain: $bog_gamengine_brain_bt ) {
			const kid = this.kid( 0 )
			const status = kid ? kid.tick( dt, brain ) : 'fail'
			return this.status_now = status === 'ok' ? 'fail' : status === 'fail' ? 'ok' : 'run'
		}

	}

	export class $bog_gamengine_brain_bt_wait extends $bog_gamengine_brain_bt_node {

		elapsed = 0

		@ $mol_mem
		seconds( next = 1 ) {
			return next
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'seconds', kind: 'number', get: ()=> this.seconds(), set: next => this.seconds( Number( next ) ) },
			]
		}

		tick( dt: number, brain: $bog_gamengine_brain_bt ) {
			if( this.status_now !== 'run' ) this.elapsed = 0
			this.elapsed += dt
			return this.status_now = this.elapsed >= this.seconds() ? 'ok' : 'run'
		}

	}

	export class $bog_gamengine_brain_bt_cond extends $bog_gamengine_brain_bt_node {

		@ $mol_mem
		when( next = '' ) {
			return next
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'when', kind: 'text', get: ()=> this.when(), set: next => this.when( String( next ) ) },
			]
		}

		tick( dt: number, brain: $bog_gamengine_brain_bt ) {
			return this.status_now = brain.cond( this.when() ) ? 'ok' : 'fail'
		}

	}

	export class $bog_gamengine_brain_bt_act extends $bog_gamengine_brain_bt_node {

		tick( dt: number, brain: $bog_gamengine_brain_bt ): $bog_gamengine_brain_bt_status {
			return this.status_now = 'ok'
		}

	}

}
