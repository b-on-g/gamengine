namespace $.$$ {

	$mol_style_define( $bog_gamengine_demo_legion, {

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

		Field: {
			position: 'relative',
			flex: {
				grow: 1,
			},
			display: 'flex',
			padding: 0,
			minHeight: '20rem',
			overflow: 'hidden',
		},

		Draw: {
			flex: {
				grow: 1,
			},
			touchAction: 'none',
		},

		Band: {
			position: 'absolute',
			pointerEvents: 'none',
			border: {
				width: '1px',
				style: 'solid',
				color: $mol_theme.focus,
			},
			background: {
				color: $mol_theme.hover,
			},
		},

		Minimap: {
			position: 'absolute',
			right: $mol_gap.block,
			bottom: $mol_gap.block,
			width: '10rem',
			height: '7.5rem',
			padding: 0,
			pointerEvents: 'none',
			background: {
				color: $mol_theme.back,
			},
			boxShadow: `0 0 0 1px ${ $mol_theme.line }`,
		},

		Dot: {
			position: 'absolute',
			width: '3px',
			height: '3px',
			padding: 0,
			margin: 0,
			minHeight: '3px',
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
