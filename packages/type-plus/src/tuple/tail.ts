import type { UnionOfValues } from '../array/union_of_values.js'

/**
 * Gets the types of a tuple except the first entry.
 */
export type Tail<T extends readonly unknown[]> = T['length'] extends 0
	? never
	: T extends readonly [any, ...infer Tail]
		? Tail extends UnionOfValues<T>[]
			? Tail
			: never
		: T
