import type { $Branch } from './$branch.js'

/**
 * 🧰 *type util*
 *
 * Define branch input options.
 */
export type $InputOptions<$B extends $Branch<any>> =
	{ [k in $B['value']]?: unknown }
