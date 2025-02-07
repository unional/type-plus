import type { $InputOptions } from '../branch/$input_options.js'
import type { $ResolveBranch } from '../branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../branch/$selection.js'
import type { $Distributive } from '../distributive/$distributive.js'
import type { $Any } from '../special/$any.js'
import type { $Never } from '../special/$never.js'
import type { $Special } from '../special/$special.js'
import type { $Unknown } from '../special/$unknown.js'

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
