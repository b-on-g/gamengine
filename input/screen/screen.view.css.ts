namespace $.$$ {

	$mol_style_define( $bog_gamengine_input_screen, {

		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		padding: $mol_gap.block,
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		pointerEvents: 'none',
		userSelect: 'none',

		Stick: {
			pointerEvents: 'auto',
			touchAction: 'none',
			width: '9rem',
			height: '9rem',
			borderRadius: '50%',
			justifyContent: 'center',
			alignItems: 'center',
			background: {
				color: $mol_theme.card,
			},
		},

		Knob: {
			pointerEvents: 'none',
			width: '3rem',
			height: '3rem',
			borderRadius: '50%',
			background: {
				color: $mol_theme.line,
			},
		},

		Buttons: {
			pointerEvents: 'auto',
			gap: $mol_gap.space,
		},

		Button: {
			touchAction: 'none',
			width: '4rem',
			height: '4rem',
			borderRadius: '50%',
			justifyContent: 'center',
			alignItems: 'center',
			background: {
				color: $mol_theme.card,
			},
		},

	} )

}
