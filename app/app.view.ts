namespace $.$$ {

	export class $bog_crumb2_app extends $.$bog_crumb2_app {

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

		hero() {
			return this.Scene().Walker_1()
		}

		@ $mol_mem
		crumbs() {
			const level = this.Scene()
			return [ level.Sprite_1(), level.Sprite_2(), level.Sprite_3(), level.Sprite_4(), level.Sprite_5() ]
		}

		@ $mol_mem
		nodes() {
			return [ ... super.nodes(), this.Rule() ]
		}

		@ $mol_mem
		cam_pos() {
			const tile = this.Scene().Tile()
			return new Float32Array([ tile.width() / 2, - tile.height() / 2, 0 ])
		}

		@ $mol_mem
		field() {
			return [
				this.Draw(),
				... this.Rule().over() ? [ this.End() ] : [],
			]
		}

		hero_str() {
			this.Scene().step()
			const pos = this.hero().pos()
			return `hero ${ pos[ 0 ].toFixed( 2 ) } × ${ pos[ 1 ].toFixed( 2 ) }`
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
			this.hero().pos( new Float32Array([ 1, -1.5, 0 ]) )
			this.hero().vel( new Float32Array( 3 ) )
			this.Clock().time( 0 )
			return null
		}

	}

}
