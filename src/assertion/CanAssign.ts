import { If, Or } from '../conditional'
import { TypeEquals, TypeNotEquals } from './TypeEquals'

export type CanAssign<A, B> = If<
  TypeEquals<A, boolean>,
  If<
    Or<Or<TypeEquals<B, false>, TypeEquals<B, true>>, TypeNotEquals<B, boolean>>,
    false,
    true
  >,
  A extends B ? true : false
>

