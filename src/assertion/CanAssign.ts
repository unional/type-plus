import { If, Or } from '../conditional'
import { Equal, NotEqual } from './Equal'

/**
 * Can `A` assign to `B`
 */
export type CanAssign<A, B> = If<
  // boolean extends true (or false) -> boolean because
  // boolean === true | false.
  // as it is a finite set.
  // so special handling is needed.
  Equal<A, boolean>,
  If<
    Or<Or<Equal<B, true>, Equal<B, false>>, NotEqual<B, boolean>>,
    false,
    true
  >,
  A extends B ? true : false
>

