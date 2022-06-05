import { Tail } from './Tail.js'

/**
 * Gets the common property keys of the elements in `A`.
 */
export type CommonPropKeys<A extends Record<string, unknown>[]> = A['length'] extends 0
  ? never
  : (A['length'] extends 1
    ? keyof A[0]
    : (A['length'] extends 2
      ? keyof A[0] & keyof A[1]
      : keyof A[0] & keyof A[1] & CommonPropKeys<Tail<Tail<A>>>))

/**
 * Gets the common property keys of the elements in `A`.
 * This will be deprecated in 4.0. Please use CommonPropKeys instead.
 */
export type CommonKeys<A extends Record<string, any>[]> = CommonPropKeys<A>
