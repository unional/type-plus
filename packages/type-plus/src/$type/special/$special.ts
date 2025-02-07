import type { $BranchOptions } from '../branch/$branch.js'
import type { $InputOptions } from '../branch/$input_options.js'
import type { $ResolveBranch } from '../branch/$resolve_branch.js'
import type { $Else, $SelectionBranch, $Then } from '../branch/$selection.js'
import type { $SelectionOptions } from '../branch/$selection_options.js'
import type { $Any } from './$any.js'
import type { $Never } from './$never.js'
import type { $Unknown } from './$unknown.js'
import type { $Void } from './$void.js'

/**
 * A type to handle special types: `any`, `unknown`, `never`, and `void`.
 *
 * @example
 * ```ts
 * type YourType<T, $Options extends $Special.Options> = Special<T,
 * {
 *   $any: $ResolveBranch<T, $Options, [$Any, ...]>
 *   $unknown: $ResolveBranch<T, $Options, [$Unknown, ...]>
 *   $never: $ResolveBranch<T, $Options, [$Never, ...]>
 *   $void: $ResolveBranch<T, $Options, [$Void, ...]>
 *   $then: $ResolveBranch<T, $Options, [...]>
 *   $else: $ResolveBranch<T, $Options, [...]>
 * }>
 *
 * @since 🏷️ 8.0.0
 */
export type $Special<T, $O extends $Special.Options = {}> = 0 extends 1 & T
	? $ResolveBranch<T, $O, [$Any, $Then]>
	: [T, unknown] extends [unknown, T]
		? $ResolveBranch<T, $O, [$Unknown, $Then]>
		: [T, never] extends [never, T]
			? $ResolveBranch<T, $O, [$Never, $Then]>
			: [T, void] extends [void, T]
				? $ResolveBranch<T, $O, [$Void, $Then]>
				: $ResolveBranch<T, $O, [$Else]>

export namespace $Special {
	export type Options = $SelectionOptions & $InputOptions<$Any | $Unknown | $Never | $Void>
	export type Branch = $SelectionBranch & $BranchOptions<$Any | $Unknown | $Never | $Void>
}
