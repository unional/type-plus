import type { $Branch } from './$branch.js'

/**
 * 🧰 *type util*
 *
 * Define branch options.
 */
export type $BranchOptions<$B extends $Branch<any>> =
	{ [k in $B['value']]: $B extends { value: k } ? $B : never }
