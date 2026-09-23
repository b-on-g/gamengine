namespace $.$$ {

	$mol_style_define( $bog_gamestudio_app, {

		Tree: {
			flex: { grow: 0, shrink: 0, basis: '16rem' },
			background: { color: $mol_theme.card },
		},

		Row: {
			'@': {
				mol_check_checked: {
					true: {
						color: $mol_theme.current,
						textShadow: '0 0',
					},
				},
			},
		},

		Canvas: {
			flex: { grow: 1, shrink: 1, basis: 0 },
			minWidth: 0,
			'>': {
				$mol_scroll: {
					'>': {
						$mol_view: {
							alignSelf: 'stretch',
						},
					},
				},
			},
		},

		Inspect: {
			flex: { grow: 0, shrink: 0, basis: '20rem' },
			background: { color: $mol_theme.card },
		},

		Source: {
			flex: { grow: 0, shrink: 0, basis: '24rem' },
			background: { color: $mol_theme.card },
		},

		Vec_num: {
			flex: { grow: 1, shrink: 1, basis: 0 },
			minWidth: 0,
		},

	} )

}
