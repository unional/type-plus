import { KeyTypes } from '../object'
import { Tail } from './Tail'

export type IntersectOfProps<
  A extends Record<any, unknown>[],
  P extends KeyTypes
  > = A['length'] extends 0
  ? never
  : (A['length'] extends 1
    ? A[0][P]
    : A[0][P] & IntersectOfProps<Tail<A>, P>)

/**
 * @deprecated use IntersectOfProps
 */
export type MapToProp<A extends Record<any, any>[], P extends KeyTypes> = IntersectOfProps<A, P>
