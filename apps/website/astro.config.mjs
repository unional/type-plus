// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'type-plus',
			logo: {
				light: '/public/type-plus.svg',
				dark: '/public/type-plus.svg',
			},
			description:
				'Provides over 200 utility types and functions for applications, library, and type-level programming.',
			social: {
				github: 'https://github.com/unional/type-plus',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Getting Started', link: '/guides/getting-started/' }
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
});
