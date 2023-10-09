import type { $ResolveSelection } from '../type_plus/branch/$resolve_selection.js'
import type { $SelectionOptions } from '../type_plus/branch/$selection_options.js'
import type { $Else, $InvertSelection, $SelectionBranch, $Then } from '../type_plus/branch/selection.js'
import type { IsAny } from './is_any.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is not `any`.
 *
 * @example
 * ```ts
 * type R = IsNotAny<any> // false
 *
 * type R = IsNotAny<never> // true
 * type R = IsNotAny<unknown> // true
 * type R = IsNotAny<string | boolean> // true
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `any`.
 *
 * @example
 * ```ts
 * type R = IsNotAny<any, { selection: 'filter' }> // never
 *
 * type R = IsNotAny<never, { selection: 'filter' }> // never
 * type R = IsNotAny<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotAny<string | boolean, { selection: 'filter' }> // string | boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
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
