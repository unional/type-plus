// import type { IsEqual } from '../equal/equal.js'

// /**
//  * Filters an array or tuple based on criteria
//  */
// export type Filter<A extends readonly unknown[], Criteria = true> = Filter._<A, Criteria, []>

import type { $Never } from '../$type/branch/$never.js'
import type { IsEqual } from '../equal/equal.js'
import type { IsNever } from '../never/is_never.js'
import type { TypePlusOptions } from '../utils/options.js'

/**
 * ⚗️ *transform*
 * 🔢 *customizable*
 *
 * Filter the array `A`, keeping entries satisfying `Criteria`.
 *
 * @example
 * ```ts
 * type R = Filter<Array<string | undefined>, string> // string[]
 * ```
 */
export type Filter<
	A extends readonly unknown[],
	Criteria = true,
	Options extends Filter.Options = Filter.DefaultOptions,
> = TypePlusOptions.Merge<Options, Filter.DefaultOptions> extends infer O extends Filter.Options
	? IsNever<
			A,
			{
				$then: O['$never']
				$else: A[0] extends Criteria ? A : Criteria extends A[0] ? Array<Criteria> : O['$notArray']
			}
		>
	: never

export namespace Filter {
	export interface Options extends TypePlusOptions.NotArray, $Never.$Options {}

	export interface DefaultOptions {
		$never: never
		$notArray: never[]
	}

	export type _<A extends readonly unknown[], Criteria, Result extends unknown[]> = A['length'] extends 0
		? Result
		: A extends [infer H, ...infer Rest]
			? IsEqual<H, Criteria, _<Rest, Criteria, [...Result, H]>, _<Rest, Criteria, Result>>
			: never
}
