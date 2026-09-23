namespace $ {

	export type $bog_gamengine_brain_fsm_next = {
		readonly to: string
		readonly when: string
	}

	export class $bog_gamengine_brain_state extends $bog_gamengine_node {

		@ $mol_mem
		next( next?: readonly $bog_gamengine_brain_fsm_next[] ): readonly $bog_gamengine_brain_fsm_next[] {
			return next ?? []
		}

		owner() {
			const fsm = this.parent()
			return fsm instanceof $bog_gamengine_brain_fsm ? fsm.owner() : null
		}

		enter() {}

		exit() {}

		tick( dt: number ) {}

	}

	export class $bog_gamengine_brain_fsm extends $bog_gamengine_node {

		state_now = ''

		is_brain() {
			return true
		}

		@ $mol_mem
		owner( next?: $bog_gamengine_node | null ) {
			return next ?? this.parent()
		}

		@ $mol_mem
		state( next?: string ) {
			if( next !== undefined && next !== this.state_now ) this.go( next )
			return next ?? ( this.state_now || this.first()?.name() || '' )
		}

		props(): readonly $bog_gamengine_prop[] {
			return [
				... super.props(),
				{ name: 'state', kind: 'text', get: ()=> this.state(), set: next => this.state( String( next ) ) },
			]
		}

		first() {
			const kids = this.kids()
			for( let i = 0; i < kids.length; ++i ) {
				if( kids[ i ] instanceof $bog_gamengine_brain_state ) return kids[ i ] as $bog_gamengine_brain_state
			}
			return null
		}

		state_of( name: string ) {
			const kids = this.kids()
			for( let i = 0; i < kids.length; ++i ) {
				const kid = kids[ i ]
				if( kid instanceof $bog_gamengine_brain_state && kid.name() === name ) return kid
			}
			return null
		}

		cond( name: string ) {
			const owner = this.owner()
			if( !owner ) return false
			const method = ( owner as unknown as Record< string, unknown > )[ name ]
			if( typeof method === 'function' ) return Boolean( ( method as ()=> unknown ).call( owner ) )
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

		go( name: string ) {
			this.state_of( this.state_now )?.exit()
			this.state_now = name
			this.state_of( name )?.enter()
		}

		step( dt: number ) {
			if( !this.state_now ) {
				const first = this.first()
				if( !first ) return
				this.state( first.name() )
			}
			const cur = this.state_of( this.state_now )
			if( !cur ) return
			cur.tick( dt )
			const next = cur.next()
			for( let i = 0; i < next.length; ++i ) {
				if( !this.cond( next[ i ].when ) ) continue
				this.state( next[ i ].to )
				return
			}
		}

	}

}
