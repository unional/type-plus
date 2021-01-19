import { KeyTypes } from '../object'
import { Tail } from './Tail'

export type PropUnion<A extends Record<any, any>[], P extends KeyTypes> = A['length'] extends 0
  ? never
  : A['length'] extends 1
  ? A[0][P]
  : A[0][P] | PropUnion<Tail<A>, P>
