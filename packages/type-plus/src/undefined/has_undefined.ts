import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'
import type { IsUndefined } from './is_undefined.js'

/**
 * 🎭 **predicate**
 *
 * Validate if `T` is `undefined` or an union with `undefined`.
 *
 * @example
 * ```ts
 * type R = HasUndefined<undefined> // true
 * type R = HasUndefined<undefined | 1> // true
 *
 * type R = HasUndefined<number> // false
 * ```
 *
 * 🌪️ **filter**
 *
 * Filter to ensure `T` is `undefined` or an union with `undefined`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = HasUndefined<undefined> // undefined
 * type R = HasUndefined<undefined | 1> // undefined | 1
 *
 * type R = HasUndefined<number> // never
 * ```
 *
 * � **branching**
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = HasUndefined<undefined, $Selection.Branch> // $Then
 * type R = HasUndefined<string, $SelectionBranch> // $Else
 * ```
 *
 * @since 🏷️ 8.0.0
 */
export type HasUndefined<T, $O extends $Selection.Options = {}> = $ResolveBranch<
	$O,
	[IsUndefined<T> extends false ? $Else : $Then],
	T
>
