import type { $InputOptions } from './branch/$input_options.js'
import type { $Selection } from './branch/$selection.js'
import type { $Distributive } from './distributive/$distributive.js'
import type { $Any } from './special/$any.js'
import type { $Never } from './special/$never.js'
import type { $Unknown } from './special/$unknown.js'
import type { $Void } from './special/$void.js'

export namespace $Equality {
	export type $Options = $Selection.Options & $Distributive.Options & $InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Selection.Options = {}> = $Selection.Branch<$O>
}
