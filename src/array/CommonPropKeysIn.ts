import { Tail } from './Tail'

/**
 * Gets the common keys of an array of records.
 */
export type CommonKeys<A extends Record<string, any>[]> = A['length'] extends 0
  ? never
  : (A['length'] extends 1
    ? keyof A[0]
    : keyof A[0] & CommonKeys<Tail<A>>)
