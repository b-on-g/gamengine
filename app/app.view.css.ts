namespace $.$$ {

	$mol_style_define( $bog_jumper_app, {

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
