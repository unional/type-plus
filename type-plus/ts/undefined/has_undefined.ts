import type { $SelectionOptions, $SelectionPredicate } from '../type_plus/branch/selection.js'
import type { IsUndefined } from './is_undefined.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 *
 * Validate if `T` is `undefined` or union with `undefined`.
 *
 * @example
 * ```ts
 * type R = HasUndefined<undefined> // $Then
 * type R = HasUndefined<undefined | 1> // $Then
 *
 * type R = HasUndefined<number> // $Else
 *
 * type R = HasUndefined<undefined, $SelectionPredicate> // true
 * type R = HasUndefined<string, $SelectionPredicate> // false
 * ```
 */
export type HasUndefined<
	T,
	$O extends $SelectionOptions = $SelectionPredicate
> = IsUndefined<T> extends false ? $O['$else'] : $O['$then']
