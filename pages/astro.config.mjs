import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'
import tailwind from '@astrojs/tailwind'
import solidJs from '@astrojs/solid-js'

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		solidJs(),
		starlight({
			title: 'type-plus',
			social: {
				github: 'https://github.com/unional/type-plus',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', link: '/guides/example/' },
					],
				},
				{
					label: 'API',
					autogenerate: { directory: 'api' },
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
})
