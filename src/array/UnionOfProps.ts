import { KeyTypes } from '../object'
import { Tail } from './Tail'

/**
 * Gets the union of properties of the elements in `A`
 */
export type UnionOfProps<A extends Record<any, any>[], P extends KeyTypes> = A['length'] extends 0
  ? never
  : A['length'] extends 1
  ? A[0][P]
  : A[0][P] | UnionOfProps<Tail<A>, P>

/**
 * Gets the union of properties in the element of `A`
 * This will be deprecated in 4.0. Please use UnionOfProps instead.
 */
export type PropUnion<A extends Record<any, any>[], P extends KeyTypes> = UnionOfProps<A, P>
