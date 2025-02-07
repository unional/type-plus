import type { $ResolveOptions } from '../$resolve_options.js'
import type { $InputOptions } from '../branch/$input_options.js'
import type { $Else, $Then } from '../branch/$selection.js'

export namespace $Exact {
	/**
	 * `$Exact.$Options` enables customizing the behavior of the `$exact` branch.
	 *
	 * The `$exact` branch is used to handle when it is an exact comparison.
	 */
	export type Options = {
		exact?: boolean | undefined
	}

	export type Default = {
		exact: false
	}

	export type Parse<$Opt extends Options, $O extends $InputOptions<$Then | $Else> = {}> = $ResolveOptions<
		[$Opt['exact'], Default]
	> extends true
		? '$then' extends keyof $O
			? $O['$then']
			: true
		: '$else' extends keyof $O
			? $O['$else']
			: false
}
