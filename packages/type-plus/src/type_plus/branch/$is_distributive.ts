import type { $ResolveOptions } from '../$resolve_options.js'
import type { $DistributiveDefault, $DistributiveOptions } from './$distributive.js'
import type { $InputOptions } from './$input_options.js'
import type { $Else, $Then } from './$selection.js'

export type $IsDistributive<
	$Options extends $DistributiveOptions,
	$O extends $InputOptions<$Then | $Else> = {},
> = $ResolveOptions<[$Options['distributive'], $DistributiveDefault['distributive']]> extends true
	? '$then' extends keyof $O
		? $O['$then']
		: true
	: '$else' extends keyof $O
		? $O['$else']
		: false
