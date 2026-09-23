namespace $ {

	export type $bog_gamengine_pad_state = {
		readonly buttons: readonly { readonly pressed: boolean }[]
		readonly axes: readonly number[]
	}

	const button_index: Record< string, number > = {
		a: 0, b: 1, x: 2, y: 3,
		lb: 4, rb: 5, lt: 6, rt: 7,
		back: 8, start: 9, ls: 10, rs: 11,
		up: 12, down: 13, left: 14, right: 15,
	}

	const axis_index: Record< string, readonly [ number, number ] > = {
		'lx-': [ 0, -1 ], 'lx+': [ 0, 1 ],
		'ly-': [ 1, -1 ], 'ly+': [ 1, 1 ],
		'rx-': [ 2, -1 ], 'rx+': [ 2, 1 ],
		'ry-': [ 3, -1 ], 'ry+': [ 3, 1 ],
	}

	export class $bog_gamengine_pad extends $mol_object2 {

		@ $mol_mem
		bind( next: Record< string, readonly string[] > = {} ) {
			return next
		}

		@ $mol_mem
		dead( next = 0.2 ) {
			return next
		}

		buttons = new Uint8Array( 16 )
		axes = new Float32Array( 4 )

		pads(): readonly ( $bog_gamengine_pad_state | null )[] {
			return globalThis.navigator?.getGamepads?.() ?? []
		}

		poll() {
			const pads = this.pads()
			let pad = null as $bog_gamengine_pad_state | null
			for( let i = 0; i < pads.length; ++ i ) {
				if( pads[ i ] ) {
					pad = pads[ i ]
					break
				}
			}
			const buttons = this.buttons
			const axes = this.axes
			if( !pad ) {
				buttons.fill( 0 )
				axes.fill( 0 )
				return
			}
			for( let i = 0; i < buttons.length; ++ i ) buttons[ i ] = pad.buttons[ i ]?.pressed ? 1 : 0
			for( let i = 0; i < axes.length; ++ i ) axes[ i ] = pad.axes[ i ] ?? 0
		}

		value( name: string ) {
			const button = button_index[ name ]
			if( button !== undefined ) return this.buttons[ button ]
			const axis = axis_index[ name ]
			if( !axis ) return 0
			const raw = this.axes[ axis[ 0 ] ] * axis[ 1 ]
			return raw > this.dead() ? raw : 0
		}

		strength( name: string ) {
			const names = this.bind()[ name ]
			if( !names ) return 0
			let max = 0
			for( let i = 0; i < names.length; ++ i ) {
				const value = this.value( names[ i ] )
				if( value > max ) max = value
			}
			return max
		}

		action( name: string ) {
			return this.strength( name ) > 0
		}

		axis( neg: string, pos: string ) {
			return this.strength( pos ) - this.strength( neg )
		}

	}

}
