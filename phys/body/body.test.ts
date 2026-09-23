namespace $ {
	$mol_test({

		'set through props changes still'() {
			const body = new $bog_gamengine_phys_body
			body.props().find( prop => prop.name === 'still' )!.set( true )
			$mol_assert_equal( body.still(), true )
		},

	})
}
