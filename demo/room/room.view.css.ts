namespace $.$$ {

	$mol_style_define( $bog_gamengine_demo_room, {

		flex: {
			grow: 1,
		},
		'>': {
			$mol_scroll: {
				'>': {
					$mol_view: {
						alignSelf: 'stretch',
						flex: {
							grow: 1,
						},
					},
				},
			},
		},

		Foot: {
			flex: {
				wrap: 'wrap',
			},
		},

		Report: {
			flex: {
				wrap: 'wrap',
				grow: 1,
			},
			minWidth: 0,
		},

	} )

}
