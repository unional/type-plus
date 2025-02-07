import type { $ExactOptions } from './$exact.js'
import type { $SpecialType } from './$special_type.js'
import type { $Any } from './branch/$any.js'
import type { $InputOptions } from './branch/$input_options.js'
import type { $Never } from './branch/$never.js'
import type { $ResolveBranch } from './branch/$resolve_branch.js'
import type { $Else, $SelectionBranch, $SelectionPredicate, $Then } from './branch/$selection.js'
import type { $SelectionOptions } from './branch/$selection_options.js'
import type { $Unknown } from './branch/$unknown.js'
import type { $Distributive } from './distributive/$distributive.js'
import type { $IsDistributive } from './distributive/$is_distributive.js'

/**
 * 🎭 *predicate*
 * ㊙️ *internal*
 *
 * Validate if `T` is `U`.
 *
 * @example
 * ```ts
 * type R = $Select<undefined, undefined> // true
 *
 * type R = $Select<never, undefined> // false
 * type R = $Select<unknown, undefined> // false
 * type R = $Select<string | boolean, undefined> // false
 *
 * type R = $Select<string | undefined, undefined> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `U`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = $Select<undefined, undefined, { selection: 'filter' }> // undefined
 *
 * type R = $Select<never, undefined, { selection: 'filter' }> // never
 * type R = $Select<unknown, undefined, { selection: 'filter' }> // never
 * type R = $Select<string | boolean, undefined, { selection: 'filter' }> // never
 *
 * type R = $Select<string | undefined, undefined> // undefined
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = $Select<undefined | 1, undefined> // boolean
 * type R = $Select<undefined | 1, undefined, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = $Select<undefined, undefined, $SelectionBranch> // $Then
 * type R = $Select<string, undefined, $SelectionBranch> // $Else
 * ```
 */
export type $Select<T, U, $O extends $Select.$Options = {}> = $SpecialType<
	T,
	{
		$any: $ResolveBranch<T, $O, [$Any, $Else]>
		$unknown: $ResolveBranch<T, $O, [$Unknown, $Else]>
		$never: $ResolveBranch<T, $O, [$Never, $Else]>
		$else: $Select._<T, U, $O>
	}
>

export namespace $Select {
	export type $Options = $SelectionOptions &
		$Distributive.Options &
		$InputOptions<$Any | $Unknown | $Never> &
		$ExactOptions
	export type $Default = $SelectionPredicate & $Distributive.Default
	export type $Branch<$O extends $Distributive.Options = $Distributive.Default> = $SelectionBranch & $O
	export type _<T, U, $O extends $Select.$Options> = $IsDistributive<$O> extends true ? _D<T, U, $O> : _N<T, U, $O>

	export type _D<T, U, $O extends $Select.$Options> = T extends U
		? $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
	export type _N<T, U, $O extends $Select.$Options> = [T] extends [U]
		? $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
}
