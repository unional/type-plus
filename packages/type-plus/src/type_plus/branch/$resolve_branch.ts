import type { $Branch } from './$branch.js'
import type { $Override } from './$override.js'
import type { $Else, $Then } from './$selection.js'

/**
 * 🧰 *type util*
 *
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
 * @typeparam $D When specified, resolve the branch in override mode.
 * If no branch in `$B` is resolved to `$Override<X>`, `$D` will be returned.
 */
export type $ResolveBranch<
	T,
	$O extends Record<string, any>,
	$B extends Array<$Branch<any> | unknown>,
	$D = unknown
> = [unknown, $D] extends [$D, unknown]
	? $B extends [infer B]
		? $ResolveBranch._Last<T, $O, B>
		: $B extends [infer B, ...infer Bs extends Array<$Branch<any> | unknown>]
			? $ResolveBranch._<$ResolveBranch<T, $O, Bs>, $O, B>
			: never
	: $ResolveBranch._Override<$D, $O, $B>

export namespace $ResolveBranch {
	export type _Override<$D, $O extends Record<string, any>, $B extends Array<$Branch<any> | unknown>> = $B extends [
		infer B
	]
		? _OLast<$D, $O, B>
		: $B extends [infer B, ...infer Bs extends Array<$Branch<any> | unknown>]
			? _OLast<_Override<$D, $O, Bs>, $O, B>
			: never

	export type _OLast<$D, $O extends Record<string, any>, $B extends $Branch<any> | unknown> = $B extends $Branch<any>
		? $B['value'] extends keyof $O
			? $O[$B['value']] extends infer R extends $Override<any>
				? [R, never] extends [never, R]
					? $D
					: R['value']
				: $D
			: $D
		: $D

	export type _<T, $O extends Record<string, any>, $B> = $B extends $Branch<any>
		? $B['value'] extends keyof $O
			? $Override.$Unwrap<$O[$B['value']]>
			: T
		: T
	export type _Last<T, $O extends Record<string, any>, $B> = $B extends $Then
		? '$then' extends keyof $O
			? $Override.$Unwrap<$O['$then']>
			: $O['selection'] extends 'filter'
				? T
				: true
		: $B extends $Else
			? '$else' extends keyof $O
				? $Override.$Unwrap<$O['$else']>
				: $O['selection'] extends 'filter'
					? never
					: false
			: _<T, $O, $B>
}
