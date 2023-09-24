import type { $Else, $SelectionBranch, $ResolveSelection, $SelectionOptions, $Then, $InvertSelection } from '../type_plus/branch/selection.js'
import type { IsAny } from './is_any.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 *
 * Validate if `T` is not exactly `any`.
 *
 * ```ts
 * type R = IsNotAny<any> // false
 *
 * type R = IsNotAny<never> // true
 * type R = IsNotAny<unknown> // true
 * type R = IsNotAny<string | boolean> // true
 * ```
 *
 * 🔢 *customize*: branching
 *
 * ```ts
 * type R = IsNotAny<any, $SelectionBranch> // $Else
 * type R = IsNotAny<string, $SelectionBranch> // $Then
 * ```
 */
export type IsNotAny<
	T,
	$O extends $SelectionOptions = {}
> = IsAny<T, $SelectionBranch> extends infer R extends $Then | $Else
	? $ResolveSelection<$O, T, $InvertSelection<R>>
	: never
