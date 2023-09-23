import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'
import type { $Else, $SelectionBranch, $SelectionOptions, $SelectionPredicate, $Then } from '../type_plus/branch/selection.js'
import type { $InferError } from '../type_plus/infer_error.js'
import type { IsUndefined } from '../undefined/is_undefined.js'

/**
 * 🎭 *predicate*
 * 🔢 *customize*
 *
 * Validate if `T` is exactly `void`.
 *
 * ```ts
 * type R = IsVoid<void> // $Then
 *
 * type R = IsVoid<1> // $Else
 *
 * type R = IsVoid<void, $SelectionPredicate> // true
 * type R = IsVoid<1, $SelectionPredicate> // false
 * ```
 */
export type IsVoid<
	T,
	$O extends $SelectionOptions = $SelectionPredicate
> = IsAnyOrNever<T, $SelectionBranch> extends infer R1
	? (R1 extends $Then
		? $O['$else']
		: (R1 extends $Else
			? (IsUndefined<T, $SelectionBranch> extends infer R2
				? (R2 extends $Then
					? $O['$else']
					: (R2 extends $Else
						? [T] extends [void] ? $O['$then'] : $O['$else']
						: $InferError<'IsUndefined result', R2>))
				: never)
			: never))
	: never
