import type { $ResolveOptions } from '../$resolve_options.js'
import type { $Branch } from './$branch.js'
import type { $InputOptions } from './$input_options.js'
import type { $Else, $Then } from './$selection.js'

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

	export type $IsExact<$Opt extends $Options,
		$O extends $InputOptions<$Then | $Else> = {}
	> = $ResolveOptions<[$Opt['exact'], $Exact.$Default]> extends true
		? '$then' extends keyof $O ? $O['$then'] : true
		: '$else' extends keyof $O ? $O['$else'] : false
}
