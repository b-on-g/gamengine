namespace $.$$ {

	$mol_style_define( $bog_shooter_app, {

		flex: {
			grow: 1,
		},

		'>': {
			$mol_scroll: {
				'>': {
					$mol_view: {
						alignSelf: 'stretch',
					},
				},
			},
		},

		Draw: {
			flex: {
				grow: 1,
			},
			minHeight: '16rem',
			cursor: 'crosshair',
		},

		Cross: {
			position: 'absolute',
			inset: '0',
			margin: 'auto',
			width: '22px',
			height: '22px',
			pointerEvents: 'none',
		},

		Cross_bar: {
			position: 'absolute',
			top: '10px',
			left: 0,
			width: '22px',
			height: '2px',
			background: {
				color: $mol_style_func.rgba( 255, 255, 255, .75 ),
			},
		},

		Cross_pin: {
			position: 'absolute',
			top: 0,
			left: '10px',
			width: '2px',
			height: '22px',
			background: {
				color: $mol_style_func.rgba( 255, 255, 255, .75 ),
			},
		},

		End: {
			position: 'absolute',
			inset: '0',
			margin: 'auto',
			width: 'max-content',
			height: 'max-content',
			minWidth: '16rem',
			background: {
				color: $mol_theme.card,
			},
			boxShadow: `0 0 0 1px ${ $mol_theme.line }`,
			border: {
				radius: $mol_gap.round,
			},
		},

	} )

}
