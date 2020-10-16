import { If } from '../conditional'
import { Equal } from './Equal'
import { NotExtendable } from './Extends'

/**
 * Can `A` assign to `B`
 */
export type CanAssign<A, B> = If<
  // boolean extends true (or false) -> boolean because
  // boolean === true | false.
  // as it is a finite set.
  // so special handling is needed.
  Equal<A, boolean>,
  If<Equal<B, boolean>, true, false>,
  A extends B ? true : false
>

export type IsAssign<A, B> = CanAssign<A, B>

export function canAssign<T>(canAssign: false): <S>(subject: NotExtendable<S, T>) => true
export function canAssign<T>(): <S extends T>(subject: S) => true
export function canAssign<T>(): <S extends T>(subject: S) => any {
  return () => true
}
