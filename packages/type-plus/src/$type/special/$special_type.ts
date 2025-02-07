import type { $BranchOptions } from '../branch/$branch.js'
import type { $InputOptions } from '../branch/$input_options.js'
import type { $ResolveBranch } from '../branch/$resolve_branch.js'
import type { $Else, $SelectionBranch, $Then } from '../branch/$selection.js'
import type { $SelectionOptions } from '../branch/$selection_options.js'
import type { $Any } from './$any.js'
import type { $Never } from './$never.js'
import type { $Unknown } from './$unknown.js'

/**
 * A type utility to handle special types: `any`, `unknown`, and `never`.
 */
export type $SpecialType<T, $O extends $SpecialType.$Options> = 0 extends 1 & T
	? $ResolveBranch<T, $O, [$Any, $Then]>
	: [T, unknown] extends [unknown, T]
		? $ResolveBranch<T, $O, [$Unknown, $Then]>
		: [T, never] extends [never, T]
			? $ResolveBranch<T, $O, [$Never, $Then]>
			: $ResolveBranch<T, $O, [$Else]>

export namespace $SpecialType {
	export type $Options = $SelectionOptions & $InputOptions<$Any | $Unknown | $Never>
	export type $Branch = $SelectionBranch & $BranchOptions<$Any | $Unknown | $Never>
}
