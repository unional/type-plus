import type { $Branch } from './$branch.js'

export type $DefineInputOptions<$B extends $Branch<any>> =
	{ [k in $B['value']]?: unknown }
