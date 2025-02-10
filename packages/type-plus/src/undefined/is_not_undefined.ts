import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Selection, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'
import type { $MergeOptions } from '../$type/utils/$merge_options.js'
import type { NotAssignable } from '../predicates/not_assignable.js'

/**
 * 🎭 **predicate**
 *
 * Validate if `T` is not `undefined`.
 *
 * @example
 * ```ts
 * type R = IsNotUndefined<undefined> // false
 *
 * type R = IsNotUndefined<never> // true
 * type R = IsNotUndefined<unknown> // true
 * type R = IsNotUndefined<string | boolean> // true
 * type R = IsNotUndefined<string | undefined> // boolean
 * ```
 *
 * 🌪️ **filter**
 *
 * Filter to ensure `T` is not `undefined`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotUndefined<undefined, { selection: 'filter' }> // never
 *
 * type R = IsNotUndefined<never, { selection: 'filter' }> // never
 * type R = IsNotUndefined<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotUndefined<string | boolean, { selection: 'filter' }> // string | boolean
 * ```
 *
 * 🔀 **distributive**
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotUndefined<undefined | 1> // boolean
 * type R = IsNotUndefined<undefined | 1, { distributive: false }> // true
 * ```
 *
 * 🔱 **branching**
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotUndefined<string, $Selection.Branch> // $Then
 * type R = IsNotUndefined<undefined, $Selection.Branch> // $Else
 *
 * type R = IsNotUndefined<any, IsNotUndefined.Branch> // $Any
 * type R = IsNotUndefined<unknown, IsNotUndefined.Branch> // $Unknown
 * type R = IsNotUndefined<never, IsNotUndefined.Branch> // $Never
 * type R = IsNotUndefined<void, IsNotUndefined.Branch> // $Void
 * ```
 *
 * @since 🏷️ 8.0.0
 */
export type IsNotUndefined<T, $O extends IsNotUndefined.Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$any: $ResolveBranch<$O, [$Any, $Then], T>
			$unknown: $ResolveBranch<$O, [$Unknown, $Then], T>
			$never: $ResolveBranch<$O, [$Never, $Then], T>
			$void: $ResolveBranch<$O, [$Void, $Then], T>
			$then: $ResolveBranch<$O, [$Then], T>
			$else: IsNotUndefined.$<T, $O>
		}
	>
>

export namespace IsNotUndefined {
	export type Options = $Selection.Options &
		$Distributive.Options &
		$Exact.Options &
		$InputOptions<$Any | $Unknown | $Never | $Void>
	export type Branch<$O extends Options = {}> = $Selection.Branch<$O> &
	$Any.$Branch &
	$Unknown.$Branch &
	$Never.$Branch &
	$Void.$Branch

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is `undefined`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $Options> = NotAssignable.$<T, undefined, $O>
	export type $Options = NotAssignable.$UtilOptions
	export type $Branch<$O extends $Options = {}> = $Selection.Branch<$O>
}
