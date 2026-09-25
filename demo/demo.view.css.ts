namespace $.$$ {

	const spread = {
		'@media': {
			'(min-width: 60rem)': {
				flex: {
					grow: 1,
					shrink: 1,
					basis: 0,
				},
				minWidth: 0,
			},
		},
	} as const

	$mol_style_define( $bog_gamengine_demo, {

		Quad: {
			... spread,
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

		Flat: spread,

		Room: spread,

		Boxes: spread,

		Jumper: spread,

		Shooter: spread,

		Legion: spread,

		Studio: spread,

	} )

}
