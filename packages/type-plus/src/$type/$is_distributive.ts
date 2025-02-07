import type { $ResolveOptions } from './$resolve_options.js'
import type { $InputOptions } from './branch/$input_options.js'
import type { $Else, $Then } from './branch/$selection.js'
import type { $Distributive } from './utils/$distributive.js'

export type $IsDistributive<
	$Options extends $Distributive.Options,
	$O extends $InputOptions<$Then | $Else> = {},
> = $ResolveOptions<[$Options['distributive'], $Distributive.Default['distributive']]> extends true
	? '$then' extends keyof $O
		? $O['$then']
		: true
	: '$else' extends keyof $O
		? $O['$else']
		: false
