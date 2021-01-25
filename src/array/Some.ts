import { Equal, If } from '../predicates'
import { Tail } from './Tail'
import { UnionOfValues } from './UnionOfValues'

export type Some<
  A extends any[],
  Criteria,
  Mode extends 'strict' | 'loose' = 'loose',
  Then = true,
  Else = false
  > =
  Mode extends 'strict' ? SomeStrict<A, Criteria, Then, Else> :
  number extends A['length'] ? UnionOfValues<A> extends Criteria ? Then : Else :
  A['length'] extends 0 ? Else :
  A[0] extends Criteria ? Then : Some<Tail<A>, Criteria, 'loose', Then, Else>

type SomeStrict<A extends any[], Criteria, Then, Else> =
  number extends A['length'] ? If<Equal<UnionOfValues<A>, Criteria>, Then, Else> :
  A['length'] extends 0 ? Else :
  If<Equal<A[0], Criteria>, Then, SomeStrict<Tail<A>, Criteria, Then, Else>>
