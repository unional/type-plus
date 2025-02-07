import type { $ResolveOptions } from '../$resolve_options.js'
import type { $InputOptions } from '../branch/$input_options.js'
import type { $Else, $Then } from '../branch/$selection.js'

export namespace $Exact {
	/**
	 * Options for controlling if the type perform exact comparison.
	 */
	export type Options = {
		exact?: boolean | undefined
	}

	/**
	 * Default options for `exact` behavior.
	 *
	 * By default it is `false`.
	 */
	export type Default = {
		exact: false
	}

	/**
	 * Parse the options for `exact`.
	 */
	export type Parse<$Options extends Options, $O extends $InputOptions<$Then | $Else> = {}> = $ResolveOptions<
		[$Options['exact'], Default]
	> extends true
		? '$then' extends keyof $O
			? $O['$then']
			: true
		: '$else' extends keyof $O
			? $O['$else']
			: false
}
