import type { $Else, $SelectionBranch, $Then } from '../$type/branch/$selection.js'
import type { IsNever } from '../never/is_never.js'
import type { $Never } from '../never/never.js'

/**
 * 🦴 *utilities*
 * 🔢 *customizable*
 *
 * Gets the first entry in the tuple or the type of array `T`.
 *
 * @example
 * ```ts
 * type R = Head<[1, 2, 3]> // 1
 * type R = Head<string[]> // string
 *
 * type R = Head<[]> // never
 * ```
 *
 * @typeParam Options['$never'] Return type when `T` is `never`.
 * Default to `never`.
 *
 * @typeParam Options['caseEmptyTuple'] Return type when `T` is `[]`.
 * Default to `never`.
 */
export type Head<T extends readonly unknown[], Options extends Head.Options = Head.DefaultOptions> = IsNever<
	T,
	$SelectionBranch
> extends infer R
	? R extends $Then
		? Options['$never']
		: R extends $Else
			? T['length'] extends 0
				? Options['caseEmptyTuple']
				: T[0]
			: never
	: never

export namespace Head {
	export interface Options extends $Never.$Options {
		caseEmptyTuple?: unknown
	}

	export interface DefaultOptions extends $Never.$Default {
		caseEmptyTuple: never
	}
}
