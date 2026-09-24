namespace $ {

	export class $bog_crumb_rule extends $bog_gamengine_node {

		@ $mol_mem
		hero( next?: $bog_gamengine_node | null ) {
			return next ?? null
		}

		@ $mol_mem
		crumbs( next?: readonly $bog_gamengine_node[] ) {
			return next ?? []
		}

		@ $mol_mem
		reach( next = 0.6 ) {
			return next
		}

		@ $mol_mem
		limit( next = 40 ) {
			return next
		}

		@ $mol_mem
		taken( next = 0 ) {
			return next
		}

		@ $mol_mem
		spent( next = 0 ) {
			return next
		}

		left() {
			return this.crumbs().length - this.taken()
		}

		rest() {
			return Math.max( 0, this.limit() - this.spent() )
		}

		won() {
			return this.crumbs().length > 0 && this.left() === 0
		}

		lost() {
			return !this.won() && this.rest() === 0
		}

		over() {
			return this.won() || this.lost()
		}

		restart() {
			const crumbs = this.crumbs()
			for( let i = 0; i < crumbs.length; ++i ) crumbs[ i ].hidden = false
			this.taken( 0 )
			this.spent( 0 )
		}

		step( dt: number ) {

			if( dt === 0 ) return
			const hero = this.hero()
			const crumbs = this.crumbs()
			const reach = this.reach()
			const taken = this.taken()
			const spent = this.spent()
			if( !hero || taken === crumbs.length ) return
			if( spent >= this.limit() ) return

			this.spent( spent + dt )

			const at = hero.pos()
			let count = taken
			for( let i = 0; i < crumbs.length; ++i ) {
				const crumb = crumbs[ i ]
				if( crumb.hidden ) continue
				const pos = crumb.pos()
				const dx = pos[ 0 ] - at[ 0 ]
				const dy = pos[ 1 ] - at[ 1 ]
				if( dx * dx + dy * dy > reach * reach ) continue
				crumb.hidden = true
				++ count
			}
			if( count !== taken ) this.taken( count )

		}

	}

}
