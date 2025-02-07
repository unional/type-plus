import type { $InputOptions } from '../branch/$input_options.js'
import type { $Selection } from '../branch/$selection.js'
import type { $Distributive } from '../distributive/$distributive.js'
import type { $Any } from '../special/$any.js'
import type { $Never } from '../special/$never.js'
import type { $Unknown } from '../special/$unknown.js'
import type { $Void } from '../special/$void.js'

import type { $ResolveBranch } from '../branch/$resolve_branch.js'
import type { $Else, $Then } from '../branch/$selection.js'
import type { $Exact } from '../exact/$exact.js'
import type { $Special } from '../special/$special.js'

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

/**
 * 🎭 *predicate*
 * ㊙️ *internal*
 *
 * Validate if `T` is `U`.
 *
 * @example
 * ```ts
 * type R = $SelectStrict<undefined, undefined> // true
 *
 * type R = $SelectStrict<never, undefined> // false
 * type R = $SelectStrict<unknown, undefined> // false
 * type R = $SelectStrict<string | boolean, undefined> // false
 *
 * type R = $SelectStrict<string | undefined, undefined> // boolean
 * ```
 *
 * 🔢 *customize*
 *
 * Filter to ensure `T` is `U`, otherwise returns `never`.
 *
 * @example
 * ```ts
 * type R = $SelectStrict<undefined, undefined, { selection: 'filter' }> // undefined
 *
 * type R = $SelectStrict<never, undefined, { selection: 'filter' }> // never
 * type R = $SelectStrict<unknown, undefined, { selection: 'filter' }> // never
 * type R = $SelectStrict<string | boolean, undefined, { selection: 'filter' }> // never
 *
 * type R = $SelectStrict<string | undefined, undefined> // undefined
 * ```
 *
 * 🔢 *customize*:
 *
 * Disable distribution of union types.
 *
 * ```ts
 * type R = $SelectStrict<undefined | 1, undefined> // boolean
 * type R = $SelectStrict<undefined | 1, undefined, { distributive: false }> // false
 * ```
 *
 * 🔢 *customize*
 *
 * Use unique branch identifiers to allow precise processing of the result.
 *
 * @example
 * ```ts
 * type R = $SelectStrict<undefined, undefined, $SelectionBranch> // $Then
 * type R = $SelectStrict<string, undefined, $SelectionBranch> // $Else
 * ```
 */
export type $SelectStrict<T, U, $O extends $SelectStrict.$Options = {}> = $Special<
	T,
	{
		$any: $ResolveBranch<T, $O, [$Any, $Else]>
		$unknown: $ResolveBranch<T, $O, [$Unknown, $Else]>
		$never: $ResolveBranch<T, $O, [$Never, $Else]>
		$else: $SelectStrict._Else<T, U, $O>
	}
>

export namespace $SelectStrict {
	export type $Options = $Selection.Options & $Distributive.Options & $InputOptions<$Any | $Unknown | $Never>
	export type $Default = $Selection.Predicate & $Distributive.Default
	export type $Branch = $Selection.Branch & $Distributive.Default
	export type _Else<T, U, $O extends $SelectStrict.$Options> = $Distributive.Parse<$O> extends true
		? _D<T, U, $O>
		: _N<T, U, $O>
	export type _D<T, U, $O extends $SelectStrict.$Options> = T extends U
		? U extends T
			? $ResolveBranch<T, $O, [$Then]>
			: $ResolveBranch<T, $O, [$Else]>
		: $ResolveBranch<T, $O, [$Else]>
	export type _N<T, U, $O extends $SelectStrict.$Options> = [T, U] extends [U, T]
		? $ResolveBranch<T, $O, [$Then]>
		: $ResolveBranch<T, $O, [$Else]>
}

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

export namespace $Equal {
	export type $Options = $Selection.Options & $Distributive.Options & $InputOptions<$Any | $Unknown | $Never | $Void>
	export type $Branch<$O extends $Selection.Options = {}> = $Selection.Branch<$O>
}
