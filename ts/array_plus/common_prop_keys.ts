import type { Tail } from './tail.js'

/**
 * Gets the common property keys of the elements in `A`.
 */
export type CommonPropKeys<A extends Record<string, unknown>[]> = A['length'] extends 0
	? never
	: A['length'] extends 1
	? keyof A[0]
	: A['length'] extends 2
	? keyof A[0] & keyof A[1]
	: keyof A[0] & keyof A[1] & CommonPropKeys<Tail<Tail<A>>>

/**
 * Gets the common property keys of the elements in `A`.
 * @deprecated Please use CommonPropKeys instead.
 */
export type CommonKeys<A extends Record<string, any>[]> = CommonPropKeys<A>
