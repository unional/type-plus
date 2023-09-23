import type { $SelectionOptions, $SelectionPredicate } from '../type_plus/branch/selection.js'
import type { IsUndefined } from './is_undefined.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 *
 * Validate if `T` is `undefined` or an union with `undefined`.
 *
 * @example
 * ```ts
 * type R = HasUndefined<undefined> // true
 * type R = HasUndefined<undefined | 1> // true
 *
 * type R = HasUndefined<number> // false
 *
 * customize: branch logic
 * type R = HasUndefined<undefined, $SelectionBranch> // $Then
 * type R = HasUndefined<string, $SelectionBranch> // $Else
 * ```
 */
export type HasUndefined<
	T,
	$O extends $SelectionOptions = $SelectionPredicate
> = IsUndefined<T> extends false ? $O['$else'] : $O['$then']
