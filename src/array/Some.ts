import { Tail } from './Tail'

export type Some<A extends any[], Criteria, Mode extends 'strict' | 'loose' = 'loose'> =
  Mode extends 'strict' ? SomeStrict<A, Criteria> :
  A['length'] extends 0 ? false :
  A[0] extends Criteria ? true : Some<Tail<A>, Criteria>

type SomeStrict<A extends any[], Criteria> =
  (A['length'] extends 0 ? false :
    (A[0] extends Criteria ?
      // Special treatment needed for `boolean`
      boolean extends A[0] ? true : SomeStrict<Tail<A>, Criteria> :
      SomeStrict<Tail<A>, Criteria>
    )
  )
