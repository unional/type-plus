import type { $Branch } from './$branch.js'

/**
 * 🧰 *type util*
 *
 * Branch to handle exact comparison.
 */
export type $Exact = $Branch<'$exact'>

export namespace $Exact {
	/**
	 * 🧰 *type util*
	 *
	 * `$Exact.$Options` enables customizing the behavior of the `$exact` branch.
	 *
	 * The `$exact` branch is used to handle when it is an exact comparison.
	 */
	export type $Options = {
		exact?: boolean | undefined
	}

	export type $Default = {
		exact: false
	}
}
