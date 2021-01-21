import { KeyTypes } from '../object'
import { Tail } from './Tail'

export type UnionOfProps<A extends Record<any, any>[], P extends KeyTypes> = A['length'] extends 0
  ? never
  : A['length'] extends 1
  ? A[0][P]
  : A[0][P] | UnionOfProps<Tail<A>, P>

/**
 * @deprecated use UnionOfProps
 */
export type PropUnion<A extends Record<any, any>[], P extends KeyTypes> = UnionOfProps<A, P>
