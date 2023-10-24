import type { $Any } from '../any/any.js'
import type { $Never } from '../never/never.js'
import type { $Unknown } from '../unknown/unknown.js'
import type { $DistributiveOptions } from './branch/$distributive.js'
import type { $Exact } from './branch/$exact.js'
import type { $InputOptions } from './branch/$input_options.js'
import type { $SelectionBranch } from './branch/$selection.js'
import type { $SelectionOptions } from './branch/$selection_options.js'

export namespace $Equality {
	export type $Options = $SelectionOptions &
		$DistributiveOptions &
		$Exact.$Options &
		$InputOptions<$Any | $Unknown | $Never>
	export type $Branch<
		$O extends $BranchOptions = {}
	> = $SelectionBranch & $O

	export type $BranchOptions = $DistributiveOptions & $Exact.$Options
}
