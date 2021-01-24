import { Equal } from '../assertion'
import { If } from '../conditional'
import { Tail } from './Tail'

export type Some<
  A extends any[],
  Criteria,
  Mode extends 'strict' | 'loose' = 'loose',
  Then = true,
  Else = false
  > =
  Mode extends 'strict' ? SomeStrict<A, Criteria, Then, Else> :
  A['length'] extends 0 ? Else :
  A[0] extends Criteria ? Then : Some<Tail<A>, Criteria, 'loose', Then, Else>

type SomeStrict<A extends any[], Criteria, Then, Else> =
  A['length'] extends 0 ? Else :
  If<Equal<A[0], Criteria>, Then, SomeStrict<Tail<A>, Criteria, Then, Else>>
