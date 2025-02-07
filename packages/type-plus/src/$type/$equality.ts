import type { $InputOptions } from './branch/$input_options.js'
import type { $SelectionBranch } from './branch/$selection.js'
import type { $SelectionOptions } from './branch/$selection_options.js'
import type { $Distributive } from './distributive/$distributive.js'
import type { $Any } from './special/$any.js'
import type { $Never } from './special/$never.js'
import type { $Unknown } from './special/$unknown.js'
import type { $Void } from './special/$void.js'

export namespace $Equality {
	export type $Options = $SelectionOptions & $Distributive.Options & $InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $SelectionOptions = {}> = $SelectionBranch<$O>
}
