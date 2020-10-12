import { If, Or } from '../conditional'
import { TypeEquals, TypeNotEquals } from './TypeEquals'

/**
 * Can `A` assign to `B`
 */
export type CanAssign<A, B> = If<
  // boolean extends true (or false) -> boolean because
  // boolean === true | false.
  // as it is a finite set.
  // so special handling is needed.
  TypeEquals<A, boolean>,
  If<
    Or<Or<TypeEquals<B, true>, TypeEquals<B, false>>, TypeNotEquals<B, boolean>>,
    false,
    true
  >,
  A extends B ? true : false
>

