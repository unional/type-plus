import type { $InputOptions } from '../$type/branch/$input_options.js'
import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Selection } from '../$type/branch/$selection.js'
import type { $Else, $Then } from '../$type/branch/$selection.js'
import type { $Distributive } from '../$type/distributive/$distributive.js'
import type { $Exact } from '../$type/exact/$exact.js'
import type { $Any } from '../$type/special/$any.js'
import type { $Never } from '../$type/special/$never.js'
import type { $Special } from '../$type/special/$special.js'
import type { $Unknown } from '../$type/special/$unknown.js'
import type { $Void } from '../$type/special/$void.js'

/**
 * 🎭 *predicate*
 *
 * Validate if `T` is `U`.
 *
 * @example
 * ```ts
 * type R = $Equal<undefined, undefined> // true
 *
 * type R = $Equal<never, undefined> // false
 * type R = $Equal<unknown, undefined> // false
 * type R = $Equal<string | boolean, undefined> // false
 *
 * type R = $Equal<string | undefined, undefined> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `U`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = $Equal<undefined, undefined, { selection: 'filter' }> // undefined
 *
 * type R = $Equal<never, undefined, { selection: 'filter' }> // never
 * type R = $Equal<unknown, undefined, { selection: 'filter' }> // never
 * type R = $Equal<string | boolean, undefined, { selection: 'filter' }> // never
 *
 * type R = $Equal<string | undefined, undefined> // undefined
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = $Equal<undefined | 1, undefined> // boolean
 * type R = $Equal<undefined | 1, undefined, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = $Equal<undefined, undefined, $SelectionBranch> // $Then
 * type R = $Equal<string, undefined, $SelectionBranch> // $Else
 * ```
 */
export type Equal<T, U, $O extends Equal.$Options = {}> = $Special<
	T,
	{
		$any: $ResolveBranch<T, $O, [$Any, $Else]>
		$never: $ResolveBranch<T, $O, [$Never, $Else]>
		$unknown: $ResolveBranch<T, $O, [$Unknown, $Else]>
		$void: $ResolveBranch<T, $O, [$Void, $Else]>
		$else: $Exact.Parse<
			$O,
			{
				$then: Equal._ExactEqual<T, U, $O>
				$else: _LooseEqual<T, U, $O>
			}
		>
	}
>

type _LooseEqual<T, U, $O extends Equal.$Options> = $Distributive.Parse<$O> extends true
	? _LooseEqualDistributive<T, U, $O>
	: _LooseEqualNonDistributive<T, U, $O>

type _LooseEqualDistributive<T, U, $O extends Equal.$Options> = T extends U
	? $ResolveBranch<T, $O, [$Then]>
	: $ResolveBranch<T, $O, [$Else]>
type _LooseEqualNonDistributive<T, U, $O extends Equal.$Options> = [T] extends [U]
	? $ResolveBranch<T, $O, [$Then]>
	: $ResolveBranch<T, $O, [$Else]>

/**
 * 🎭 *predicate*
 * ㊙️ *internal*
 *
 * Validate if `T` is `U`.
 *
 * @example
 * ```ts
 * type R = $SelectInvert<undefined, undefined> // true
 *
 * type R = $SelectInvert<never, undefined> // false
 * type R = $SelectInvert<unknown, undefined> // false
 * type R = $SelectInvert<string | boolean, undefined> // false
 *
 * type R = $SelectInvert<string | undefined, undefined> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `U`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = $SelectInvert<undefined, undefined, { selection: 'filter' }> // undefined
 *
 * type R = $SelectInvert<never, undefined, { selection: 'filter' }> // never
 * type R = $SelectInvert<unknown, undefined, { selection: 'filter' }> // never
 * type R = $SelectInvert<string | boolean, undefined, { selection: 'filter' }> // never
 *
 * type R = $SelectInvert<string | undefined, undefined> // undefined
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = $SelectInvert<undefined | 1, undefined> // boolean
 * type R = $SelectInvert<undefined | 1, undefined, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = $SelectInvert<undefined, undefined, $SelectionBranch> // $Then
 * type R = $SelectInvert<string, undefined, $SelectionBranch> // $Else
 * ```
 */
export type $SelectInvert<T, U, $O extends $SelectInvert.$Options = {}> = $Special<
	T,
	{
		$any: $ResolveBranch<T, $O, [$Any, $Then]>
		$never: $ResolveBranch<T, $O, [$Never, $Then]>
		$unknown: $ResolveBranch<T, $O, [$Unknown, $Then]>
		$void: $ResolveBranch<T, $O, [$Void, $Then]>
		$else: $Distributive.Parse<$O> extends true ? $SelectInvert._D<T, U, $O> : $SelectInvert._N<T, U, $O>
	}
>

export namespace $SelectInvert {
	export type $Options = $Selection.Options & $Distributive.Options & $InputOptions<$Any | $Unknown | $Never>
	export type $Default = $Selection.Predicate & $Distributive.Default
	export type $Branch = $Selection.Branch & $Distributive.Default
	export type _D<T, U, $O extends $SelectInvert.$Options> = T extends U
		? $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
	export type _N<T, U, $O extends $SelectInvert.$Options> = [T] extends [U]
		? $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
}

/**
 * 🎭 *predicate*
 * ㊙️ *internal*
 *
 * Validate if `T` is `U`.
 *
 * @example
 * ```ts
 * type R = $SelectInvertStrict<undefined, undefined> // true
 *
 * type R = $SelectInvertStrict<never, undefined> // false
 * type R = $SelectInvertStrict<unknown, undefined> // false
 * type R = $SelectInvertStrict<string | boolean, undefined> // false
 *
 * type R = $SelectInvertStrict<string | undefined, undefined> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `U`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = $SelectInvertStrict<undefined, undefined, { selection: 'filter' }> // undefined
 *
 * type R = $SelectInvertStrict<never, undefined, { selection: 'filter' }> // never
 * type R = $SelectInvertStrict<unknown, undefined, { selection: 'filter' }> // never
 * type R = $SelectInvertStrict<string | boolean, undefined, { selection: 'filter' }> // never
 *
 * type R = $SelectInvertStrict<string | undefined, undefined> // undefined
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = $SelectInvertStrict<undefined | 1, undefined> // boolean
 * type R = $SelectInvertStrict<undefined | 1, undefined, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = $SelectInvertStrict<undefined, undefined, $SelectionBranch> // $Then
 * type R = $SelectInvertStrict<string, undefined, $SelectionBranch> // $Else
 * ```
 */
export type $SelectInvertStrict<T, U, $O extends $SelectInvertStrict.$Options = {}> = $Special<
	T,
	{
		$any: $ResolveBranch<T, $O, [$Any, $Then]>
		$unknown: $ResolveBranch<T, $O, [$Unknown, $Then]>
		$never: $ResolveBranch<T, $O, [$Never, $Then]>
		$else: $Distributive.Parse<$O> extends true ? $SelectInvertStrict._D<T, U, $O> : $SelectInvertStrict._N<T, U, $O>
	}
>

export namespace $SelectInvertStrict {
	export type $Options = $Selection.Options & $Distributive.Options & $InputOptions<$Any | $Unknown | $Never>
	export type $Default = $Selection.Predicate & $Distributive.Default
	export type $Branch = $Selection.Branch & $Distributive.Default
	export type _D<T, U, $O extends $SelectInvertStrict.$Options> = T extends U
		? $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
	export type _N<T, U, $O extends $SelectInvertStrict.$Options> = [T, U] extends [U, T]
		? $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Then]>
}

export namespace Equal {
	export type $Options = $Selection.Options &
		$Distributive.Options &
		$InputOptions<$Any | $Unknown | $Never> &
		$Exact.Options
	export type $Default = $Selection.Predicate & $Distributive.Default
	export type $Branch<$O extends $Options = $Distributive.Default> = $Selection.Branch & $O

	export type _ExactEqual<T, U, $O extends $Options> = $Distributive.Parse<$O> extends true
		? _ExactEqualDistributive<T, U, $O>
		: _ExactEqualNonDistributive<T, U, $O>
	export type _ExactEqualDistributive<T, U, $O extends $Options> = T extends U
		? U extends T
			? $ResolveBranch<T, $O, [$Then]>
			: $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Else]>
	export type _ExactEqualNonDistributive<T, U, $O extends $Options> = [T, U] extends [U, T]
		? $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
}
