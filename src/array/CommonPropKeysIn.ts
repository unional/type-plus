import { Tail } from './Tail'

/**
 * Gets the common property keys of an array of records.
 */
export type CommonPropKeysIn<A extends Record<string, unknown>[]> = A['length'] extends 0
  ? never
  : (A['length'] extends 1
    ? keyof A[0]
    : (A['length'] extends 2
      ? keyof A[0] & keyof A[1]
      : keyof A[0] & keyof A[1] & CommonPropKeysIn<Tail<Tail<A>>>))

/**
 * @deprecated renamed to CommonPropKeysIn
 */
export type CommonKeys<A extends Record<string, any>[]> = CommonPropKeysIn<A>
