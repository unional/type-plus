import type { $Any } from './branch/$any.js'
import type { $InputOptions } from './branch/$input_options.js'
import type { $Never } from './branch/$never.js'
import type { $SelectionBranch } from './branch/$selection.js'
import type { $SelectionOptions } from './branch/$selection_options.js'
import type { $Unknown } from './branch/$unknown.js'
import type { $Distributive } from './utils/$distributive.js'

export namespace $Equality {
	export type $Options = $SelectionOptions & $Distributive.Options & $InputOptions<$Any | $Unknown | $Never>
	export type $Branch<$O extends $SelectionOptions = {}> = $SelectionBranch<$O>
}
