namespace $.$$ {

	const crumb_spots = [
		[ 10.5, -1.5 ],
		[ 1.5, -7.5 ],
		[ 10.5, -7.5 ],
		[ 5.5, -4.5 ],
		[ 3.5, -4.5 ],
	] as const

	export class $bog_gamengine_demo_crumb extends $.$bog_gamengine_demo_crumb {

		key_map() {
			return {
				... this.Key().keys(),
				space: ( state?: boolean )=> {
					if( state ) this.paused( !this.paused() )
					return true
				},
			}
		}

		@ $mol_mem
		paused( next?: boolean ) {
			return next ?? false
		}

		@ $mol_mem
		palette() {
			return { '#': 'wall', '.': 'floor' }
		}

		@ $mol_mem
		cam_pos() {
			const tile = this.Tile()
			return new Float32Array([ tile.width() / 2, - tile.height() / 2, 0 ])
		}

		@ $mol_mem
		hero_size() {
			return new Float32Array([ 0.8, 0.8 ])
		}

		@ $mol_mem
		crumb_size() {
			return new Float32Array([ 0.6, 0.6 ])
		}

		@ $mol_mem
		hero_pos( next?: Float32Array ) {
			return next ?? new Float32Array([ 1.5, -1.5, 0 ])
		}

		@ $mol_mem
		crumb_ids() {
			return crumb_spots.map( ( spot, index )=> String( index ) ) as readonly string[]
		}

		@ $mol_mem_key
		crumb_pos( id: string ) {
			const spot = crumb_spots[ Number( id ) ]
			return new Float32Array([ spot[ 0 ], spot[ 1 ], 0 ])
		}

		@ $mol_mem
		crumbs() {
			return this.crumb_ids().map( id => this.Crumb( id ) )
		}

		@ $mol_mem
		bodies() {
			return [ this.Hero() ]
		}

		@ $mol_mem
		nodes() {
			return [ this.Tilemap(), this.Hero(), this.Hero_sprite(), ... this.crumbs(), this.Rule() ]
		}

		@ $mol_mem
		field() {
			return [
				this.Draw(),
				... this.Rule().over() ? [ this.End() ] : [],
			]
		}

		left_str() {
			this.Scene().step()
			return String( this.Rule().left() )
		}

		time_str() {
			this.Scene().step()
			return `${ this.Rule().rest().toFixed( 1 ) } с`
		}

		end_title() {
			return this.Rule().won() ? 'Победа' : 'Время вышло'
		}

		end_hint() {
			const rule = this.Rule()
			return rule.won()
				? `Все крошки собраны за ${ rule.spent().toFixed( 1 ) } с`
				: `Не собрано крошек: ${ rule.left() }`
		}

		restart( next?: any ) {
			if( next === undefined ) return null
			this.Rule().restart()
			this.hero_pos( new Float32Array([ 1.5, -1.5, 0 ]) )
			this.Hero().vel( new Float32Array( 3 ) )
			this.Clock().time( 0 )
			return null
		}

	}

}
