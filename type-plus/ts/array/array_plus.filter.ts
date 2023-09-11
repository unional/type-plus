import type { IsEqual } from '../equal/equal.js'

/**
 * Filters an array or tuple based on criteria
 */
export type Filter<A extends readonly unknown[], Criteria = true> = Filter._<A, Criteria, []>

export namespace Filter {
	export type _<A extends readonly unknown[], Criteria, Result extends unknown[]> = A['length'] extends 0
		? Result
		: (A extends [infer H, ...infer Rest]
			? IsEqual<H, Criteria, _<Rest, Criteria, [...Result, H]>, _<Rest, Criteria, Result>>
			: never)
}
