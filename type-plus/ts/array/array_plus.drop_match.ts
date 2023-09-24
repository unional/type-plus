import type { NonNull } from '../null/non_null.js'

/**
 * ⚗️ *transform*
 */
export type DropMatch<A extends Readonly<Array<unknown>>, Criteria> = A[0] extends Criteria
	? never[]
	: (undefined extends Criteria
		? (null extends Criteria
			? Array<NonNullable<A[0]>>
			: Array<Exclude<A[0], undefined>>)
		: (null extends Criteria
			? Array<NonNull<A[0]>>
			: (Criteria extends A[0]
				? Array<Exclude<A[0], Criteria>>
				: (A[0] extends Criteria
					? A
					: Array<Exclude<A[0], Criteria>>))))
