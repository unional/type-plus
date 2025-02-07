import type { $ResolveOptions } from '../$resolve_options.js'
import type { $InputOptions } from '../branch/$input_options.js'
import type { $Else, $Then } from '../branch/$selection.js'

export namespace $Distributive {
	/**
	 * Options for controlling if the type is distributive.
	 */
	export type Options = {
		distributive?: boolean | undefined
	}

	/**
	 * Default options for `distributive` behavior.
	 *
	 * By default it is `true`.
	 */
	export type Default = {
		distributive: true
	}

	/**
	 * Parse the options for `distributive`.
	 */
	export type Parse<$Options extends Options, $O extends $InputOptions<$Then | $Else> = {}> = $ResolveOptions<
		[$Options['distributive'], Default['distributive']]
	> extends true
		? '$then' extends keyof $O
			? $O['$then']
			: true
		: '$else' extends keyof $O
			? $O['$else']
			: false
}
