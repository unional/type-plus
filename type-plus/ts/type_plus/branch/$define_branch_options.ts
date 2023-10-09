import type { $Branch } from './$branch.js'

/**
 * 🧰 *type util*
 *
 * Defined branch options.
 */
export type $DefineBranchOptions<$B extends $Branch<any>> =
	{ [k in $B['value']]: $B extends { value: k } ? $B : never }
