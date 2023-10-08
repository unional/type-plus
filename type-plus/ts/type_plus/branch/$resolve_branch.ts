import type { $Branch } from './$branch.js'

export type $ResolveBranch<
	$O extends Record<string, unknown>,
	$B extends $Branch<any>
> = $O[$B['value']]
