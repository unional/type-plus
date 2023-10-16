import type { $Any } from '../any/any.js'
import type { $InputOptions } from '../type_plus/branch/$input_options.js'
import type { $ResolveBranch } from '../type_plus/branch/$resolve_branch.js'
import type { $SelectionOptions } from '../type_plus/branch/$selection_options.js'
import type { $Else, $Then } from '../type_plus/branch/selection.js'
import type { $Unknown } from '../unknown/unknown.js'
import type { $NotNever } from './never.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `never`.
 *
 * @example
 * ```ts
 * type R = IsNever<never> // true
 *
 * type R = IsNever<1> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `never`, otherwise returns `$NotNever`.
 *
 * Filter normally returns `never` in the `$else` clause.
 * But since we are checking for `never` here,
 * we have to return `$NotNever` instead.
 *
 * @example
 * ```ts
 * type R = IsNever<never, { selection: 'filter' }> // never
 *
 * type R = IsNever<1, { selection: 'filter' }> // $NotNever
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNever<never, $SelectionBranch> // $Then
 * type R = IsNever<1, $SelectionBranch> // $Else
 * ```
 */
export type IsNever<
	T,
	$O extends IsNever.$Options = {}
> = [T, never] extends [never, T]
	? $ResolveBranch<T, $O, [$Then]>
	: $ResolveBranch<
		T,
		'$else' extends keyof $O ? $O :
		$O['selection'] extends 'filter' ? $O & { $else: $NotNever } : $O,
		[0 extends 1 & T ? $Any : unknown, [unknown] extends [T] ? $Unknown : unknown, $Else]
	>

export namespace IsNever {
	export type $Options = $SelectionOptions & $InputOptions<$Any | $Unknown>
}