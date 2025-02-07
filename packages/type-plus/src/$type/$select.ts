import type { $InputOptions } from './branch/$input_options.js'
import type { $ResolveBranch } from './branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from './branch/$selection.js'
import type { $Distributive } from './distributive/$distributive.js'
import type { $Exact } from './exact/$exact.js'
import type { $Any } from './special/$any.js'
import type { $Never } from './special/$never.js'
import type { $Special } from './special/$special.js'
import type { $Unknown } from './special/$unknown.js'
import type { $Void } from './special/$void.js'

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
export type $Select<T, U, $O extends $Select.$Options = {}> = $Special<
	T,
	{
		$any: $ResolveBranch<T, $O, [$Any, $Else]>
		$never: $ResolveBranch<T, $O, [$Never, $Else]>
		$unknown: $ResolveBranch<T, $O, [$Unknown, $Else]>
		$void: $ResolveBranch<T, $O, [$Void, $Else]>
		$else: _<T, U, $O>
	}
>

type _<T, U, $O extends $Select.$Options> = $Distributive.Parse<$O> extends true ? _D<T, U, $O> : _N<T, U, $O>

type _D<T, U, $O extends $Select.$Options> = T extends U
	? $ResolveBranch<T, $O, [$Then]>
	: $ResolveBranch<T, $O, [$Else]>
type _N<T, U, $O extends $Select.$Options> = [T] extends [U]
	? $ResolveBranch<T, $O, [$Then]>
	: $ResolveBranch<T, $O, [$Else]>

export namespace $Select {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$InputOptions<$Any | $Unknown | $Never> &
		$Exact.Options
	export type $Default = $Selection.Predicate & $Distributive.Default
	export type $Branch<$O extends $Distributive.Options = $Distributive.Default> = $Selection.Branch & $O
}
