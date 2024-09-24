import type { $ResolveOptions } from '../$resolve_options.js'
import type { $InputOptions } from './$input_options.js'
import type { $Else, $Then } from './$selection.js'

/**
 * 🧰 *type util*
 *
 * `$Exact.$Options` enables customizing the behavior of the `$exact` branch.
 *
 * The `$exact` branch is used to handle when it is an exact comparison.
 */
export type $ExactOptions = {
	exact?: boolean | undefined
}

export type $ExactDefault = {
	exact: false
}

export type $IsExact<$Opt extends $ExactOptions, $O extends $InputOptions<$Then | $Else> = {}> = $ResolveOptions<
	[$Opt['exact'], $ExactDefault]
> extends true
	? '$then' extends keyof $O
		? $O['$then']
		: true
	: '$else' extends keyof $O
		? $O['$else']
		: false
