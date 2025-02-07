import type { $BranchOptions } from '../branch/$branch.js'
import type { $InputOptions } from '../branch/$input_options.js'
import type { $ResolveBranch } from '../branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../branch/$selection.js'
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
 *   $any: $ResolveBranch<$Options, [$Any, ...], T>
 *   $unknown: $ResolveBranch<$Options, [$Unknown, ...], T>
 *   $never: $ResolveBranch<$Options, [$Never, ...], T>
 *   $void: $ResolveBranch<$Options, [$Void, ...], T>
 *   $then: $ResolveBranch<$Options, [...], T>
 *   $else: $ResolveBranch<$Options, [...], T>
 * }>
 *
 * @since 🏷️ 8.0.0
 */
export type $Special<T, $O extends $Special.Options = {}> = 0 extends 1 & T
	? $ResolveBranch<$O, [$Any, $Then], T>
	: [T, unknown] extends [unknown, T]
		? $ResolveBranch<$O, [$Unknown, $Then], T>
		: [T, never] extends [never, T]
			? $ResolveBranch<$O, [$Never, $Then], T>
			: [T, void] extends [void, T]
				? $ResolveBranch<$O, [$Void, $Then], T>
				: $ResolveBranch<$O, [$Else], T>

export namespace $Special {
	export type Options = $Selection.Options & $InputOptions<$Any | $Unknown | $Never | $Void>
	export type Branch = $Selection.Branch & $BranchOptions<$Any | $Unknown | $Never | $Void>
}
