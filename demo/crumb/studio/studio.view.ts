namespace $.$$ {

	const kit_own: readonly $bog_gamengine_studio_kit_item[] = [
		{
			id: 'crumb_rule',
			title: 'Правило крошек',
			klass: '$bog_gamengine_demo_crumb_rule',
			props: { name: '\\Правило', reach: '0.6', limit: '40' },
			world: '',
		},
	]

	export class $bog_gamengine_demo_crumb_studio extends $.$bog_gamengine_demo_crumb_studio {

		@ $mol_mem
		Kit() {
			const kit = super.Kit()
			kit.list([ ... $bog_gamengine_studio_kit_items, ... kit_own ])
			return kit
		}

	}

}
