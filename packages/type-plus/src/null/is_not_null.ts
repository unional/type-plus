import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Then } from '../$type/branch/$selection.js'
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
 * Validate if `T` is not `null`.
 *
 * ```ts
 * type R = IsNotNull<null> // false
 * type R = IsNotNull<never> // true
 * type R = IsNotNull<unknown> // true
 * type R = IsNotNull<string | boolean> // true
 * type R = IsNotNull<string | null> // boolean
 * ```
 *
 * 🌪️ **filter**
 *
 * Filter to ensure `T` is not `null`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = IsNotNull<null, { selection: 'filter' }> // never
 * type R = IsNotNull<never, { selection: 'filter' }> // never
 * type R = IsNotNull<unknown, { selection: 'filter' }> // unknown
 * type R = IsNotNull<string | boolean, { selection: 'filter' }> // string | boolean
 * type R = IsNotNull<string | null, { selection: 'filter' }> // string
 * ```
 *
 * 🔀 **distributive**
 *
 * Disable distribution of union types.
 *
 * @example
 * ```ts
 * type R = IsNotNull<null | 1> // boolean
 * type R = IsNotNull<null | 1, { distributive: false }> // true
 * ```
 *
 * 🔱 **branching**
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = IsNotNull<string, IsNotNull.Branch> // $Then
 * type R = IsNotNull<null, IsNotNull.Branch> // $Else
 * type R = IsNotNull<any, IsNotNull.Branch> // $Any
 * type R = IsNotNull<unknown, IsNotNull.Branch> // $Unknown
 * type R = IsNotNull<never, IsNotNull.Branch> // $Never
 * type R = IsNotNull<void, IsNotNull.Branch> // $Void
 * ```
 */
export type IsNotNull<T, $O extends IsNotNull.Options = {}> = $Special<
	T,
	$MergeOptions<
		$O,
		{
			$any: $ResolveBranch<$O, [$Any, $Then], T>
			$unknown: $ResolveBranch<$O, [$Unknown, $Then], T>
			$never: $ResolveBranch<$O, [$Never, $Then], T>
			$void: $ResolveBranch<$O, [$Void, $Then], T>
			$then: $ResolveBranch<$O, [$Then], T>
			$else: IsNotNull.$<T, $O>
		}
	>
>

export namespace IsNotNull {
	export type Options = $Options & $InputOptions<$Any | $Unknown | $Never | $Void>
	export type Branch<$O extends Options = {}> = $Branch<$O> &
		$Any.$Branch &
		$Unknown.$Branch &
		$Never.$Branch &
		$Void.$Branch

	/**
	 * 🧰 *type util*
	 *
	 * Validate if `T` is not `null`.
	 *
	 * This is a type util for building custom types.
	 * It does not check against special types.
	 */
	export type $<T, $O extends $Options> = NotAssignable.$<T, null, $O>

	export type $Options = NotAssignable.$UtilOptions
	export type $Branch<$O extends $Options = {}> = NotAssignable.$Branch<$O>
}
