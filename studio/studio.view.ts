namespace $.$$ {

	const kit_own: readonly $bog_gamestudio_kit_item[] = [
		{
			id: 'crumb_rule',
			title: 'Правило крошек',
			klass: '$bog_crumb_rule',
			props: { name: '\\Правило', reach: '0.6', limit: '40' },
			world: '',
		},
	]

	export class $bog_crumb_studio extends $.$bog_crumb_studio {

		@ $mol_mem
		Kit() {
			const kit = super.Kit()
			kit.list([ ... $bog_gamestudio_kit_items, ... kit_own ])
			return kit
		}

	}

}
