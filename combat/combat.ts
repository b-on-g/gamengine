namespace $ {

	export class $bog_gamengine_combat extends $bog_gamengine_node {

		@ $mol_mem
		health_max( next = 100 ) {
			return next
		}

		@ $mol_mem
		armor( next = 0 ) {
			return next
		}

		@ $mol_mem
		rate( next = 1 ) {
			return next
		}

		@ $mol_mem
		health( next?: number ) {
			return next ?? this.health_max()
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'health', kind: 'number', get: ()=> this.health(), set: next => this.health( Number( next ) ) },
				{ name: 'health_max', kind: 'number', get: ()=> this.health_max(), set: next => this.health_max( Number( next ) ) },
				{ name: 'rate', kind: 'number', get: ()=> this.rate(), set: next => this.rate( Number( next ) ) },
			]
		}

		dead_on = false
		fired = - Infinity

		dead() {
			return this.dead_on || this.health() <= 0
		}

		now() {
			return this.clock()?.time() ?? 0
		}

		hurt( amount: number, from?: $bog_gamengine_node | null ) {
			if( this.dead() ) return this.health()
			const taken = Math.max( 0, amount - this.armor() )
			const left = Math.max( 0, this.health() - taken )
			this.health( left )
			if( left > 0 ) return left
			this.dead_on = true
			this.die( from ?? null )
			return left
		}

		heal( amount: number ) {
			if( this.dead() ) return this.health()
			const full = Math.min( this.health_max(), this.health() + Math.max( 0, amount ) )
			this.health( full )
			return full
		}

		die( from?: $bog_gamengine_node | null ) {}

		ready( time = this.now() ) {
			return time - this.fired >= 1 / this.rate()
		}

		fire( time = this.now() ) {
			this.fired = time
			return time
		}

	}

}
