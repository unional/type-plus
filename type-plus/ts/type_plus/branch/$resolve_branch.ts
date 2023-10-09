import type { $Branch } from './$branch.js'

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
 * @typeparam D The default value if the `$O` does not specify any branches in `$B`.
 */
export type $ResolveBranch<
	$O extends Record<string, any>,
	$B extends Array<$Branch<any> | unknown>,
	D
> =
	$B extends [infer B]
	? $ResolveBranch._<$O, B, D>
	: (
		$B extends [infer B, ...infer Bs extends Array<$Branch<any> | unknown>]
		? $ResolveBranch._<$O, B, $ResolveBranch<$O, Bs, D>>
		: never
	)

export namespace $ResolveBranch {
	export type _<$O extends Record<string, any>, $B, D> =
		$B extends $Branch<any> ?
		($B['value'] extends keyof $O ? $O[$B['value']] : D)
		: D
}
