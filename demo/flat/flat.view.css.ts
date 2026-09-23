namespace $.$$ {

	$mol_style_define( $bog_gamengine_demo_flat, {

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

		Hero_label: {
			position: 'absolute',
			pointerEvents: 'none',
			whiteSpace: 'nowrap',
			transform: 'translate(-50%, -100%)',
		},

	} )

}
