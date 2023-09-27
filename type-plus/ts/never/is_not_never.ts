import type { $SelectionOptions } from '../type_plus/branch/selection.js'
import type { $ResolveOptions } from '../type_plus/resolve_options.js'
import type { $Never } from './never.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` not `never`.
 *
 * @example
 * ```ts
 * type R = IsNotNever<1> // true
 *
 * type R = IsNotNever<never> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is not `never`, otherwise returns `$Never`.
 *
 * Filter normally returns `never` in the `$else` clause.
 * But since we are checking for `never` here,
 * we have to return `$Never` instead.
 *
 * @example
 * ```ts
 * type R = IsNotNever<1, { selection: 'filter' }> // 1
 *
 * type R = IsNotNever<never, { selection: 'filter' }> // $Never
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotNever<never, $SelectionBranch> // $Else
 * type R = IsNotNever<1, $SelectionBranch> // $Then
 * ```
 */
export type IsNotNever<
	T,
	$O extends IsNotNever.$Options = {}
> = [T, never] extends [never, T]
	? $ResolveOptions<[$O['$else'], $O['selection'] extends 'filter' ? $Never : false]>
	: $ResolveOptions<[$O['$then'], $O['selection'] extends 'filter' ? T : true]>


export namespace IsNotNever {
	export type $Options = $SelectionOptions
}
