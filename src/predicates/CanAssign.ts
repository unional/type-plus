import { If } from '.'
import { Equal } from './Equal'
import { NotExtendable } from './Extends'

/**
 * Can `A` assign to `B`
 */
export type CanAssign<A, B, Then = true, Else = false> = If<
  // boolean extends true (or false) -> boolean because
  // boolean === true | false.
  // as it is a finite set.
  // so special handling is needed.
  Equal<A, boolean>,
  If<Equal<B, boolean>, Then, Else>,
  A extends B ? Then : Else
>

export type IsAssign<A, B, Then = true, Else = false> = CanAssign<A, B, Then, Else>

export function canAssign<T>(canAssign: false): <S>(subject: NotExtendable<S, T>) => true
export function canAssign<T>(): <S extends T>(subject: S) => true
export function canAssign<T>(): <S extends T>(subject: S) => any {
  return () => true
}
