import type { $Type } from '../$type.js'
import type { $Branch } from './$branch.js'
import type { $Else, $Then } from './$selection.js'

/**
 * Resolve option value based on list of branches.
 * It returns the first branch value that is specified in the option,
 * otherwise will return the default value.
 *
 * Since this is an type utility,
 * it does not perform extensive validations.
 * Please check the description of each input below for information.
 *
 * @typeparam $O Should be a Record, not any, unknown, or never
 * @typeparam $B Tuple of branches with at least one entry.
 */
export type $ResolveBranch<T, $O extends Record<string, any>, $B extends Array<$Branch<any> | unknown>> = $B extends [
	infer B,
]
	? $ResolveBranch._Last<T, $O, B>
	: $B extends [infer B, ...infer Bs extends Array<$Branch<any> | unknown>]
		? $ResolveBranch._<$ResolveBranch<T, $O, Bs>, $O, B>
		: never

export namespace $ResolveBranch {
	export type _<T, $O extends Record<string, any>, $B> = $B extends $Branch<any>
		? $B[$Type.$ValueKey] extends keyof $O
			? $O[$B[$Type.$ValueKey]]
			: T
		: T
	export type _Last<T, $O extends Record<string, any>, $B> = $B extends $Then
		? '$then' extends keyof $O
			? $O['$then']
			: $O['selection'] extends 'filter'
				? T
				: true
		: $B extends $Else
			? '$else' extends keyof $O
				? $O['$else']
				: $O['selection'] extends 'filter'
					? never
					: false
			: _<T, $O, $B>
}
