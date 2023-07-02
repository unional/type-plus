import type { Filter as FilterTuple } from '../tuple/tuple_plus.filter.js'
import type { Filter as FilterArray } from './array_plus.filter.js'

/**
 * filter the array or tuple `A`, keeping entries satisfying `Criteria`.
 */
export type Filter<A extends unknown[], Criteria> = number extends A['length']
	? FilterArray<A, Criteria>
	: FilterTuple<A, Criteria>


/**
 * keeps entries satisfying `Criteria` in array or tuple `A`.
 */
export type KeepMatch<A extends unknown[], Criteria> = Filter<A, Criteria>
