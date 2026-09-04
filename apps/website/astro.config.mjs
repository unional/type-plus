// @ts-check
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
	site: 'https://cyberuni.github.io',
	base: '/type-plus',
	integrations: [
		starlight({
			title: 'type-plus',
			logo: {
				light: './src/assets/type-plus.svg',
				dark: './src/assets/type-plus.svg',
			},
			description:
				'Provides over 200 utility types and functions for applications, library, and type-level programming.',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/cyberuni/type-plus',
				},
			],
			editLink: {
				baseUrl: 'https://github.com/cyberuni/type-plus/edit/main/apps/website/',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						{ label: 'Getting Started', link: '/guides/getting-started/' },
						{
							label: 'TypeScript Version Compatibility',
							link: '/guides/typescript-version-compatibility/',
						},
					],
				},
				{
					label: 'API',
					items: [{ autogenerate: { directory: 'api' } }],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
			],
		}),
	],
})
