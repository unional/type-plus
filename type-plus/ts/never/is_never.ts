import type { $SelectionOptions } from '../type_plus/branch/selection.js'
import type { $ResolveOptions } from '../type_plus/resolve_options.js'
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
 * Filter to ensure `T` is `never`, otherwise returns `unknown`.
 *
 * @example
 * ```ts
 * type R = IsNever<1, { selection: 'filter-unknown' }> // unknown
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
	? $ResolveOptions<[$O['$then'], $O['selection'] extends 'filter' | 'filter-unknown' ? T : true]>
	: $ResolveOptions<[$O['$else'], $O['selection'] extends 'filter'
		? $NotNever
		: $O['selection'] extends 'filter-unknown' ? unknown : false]>


export namespace IsNever {
	export type $Options = Omit<$SelectionOptions, 'selection'> & {
		/**
		 * On top of `selection` values from `$SelectionOptions`,
		 *
		 * it also support:
		 *
		 * `filter-unknown` which returns `unknown` when `T` is `never`
		 */
		selection?: 'predicate' | 'filter' | 'filter-unknown' | undefined
	}
}
