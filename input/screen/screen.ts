namespace $ {

	export interface $bog_gamengine_input_screen {
		action( name: string ): boolean
		axis( neg: string, pos: string ): number
		move( dx: number, dy: number ): void
		press( name: string ): void
		release( name: string ): void
	}

}
