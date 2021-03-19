import { NotExtendable } from './Extends'

/**
 * Can `A` assign to `B`
 */
export type CanAssign<A, B, Then = true, Else = false> =
  boolean extends A ?
  boolean extends B ? Then : Else :
  A extends B ? Then : Else


export type IsAssign<A, B, Then = true, Else = false> = CanAssign<A, B, Then, Else>

export function canAssign<T>(canAssign: false): <S>(subject: NotExtendable<S, T>) => true
export function canAssign<T>(): <S extends T>(subject: S) => CanAssign<S, T>
export function canAssign<T>(): <S extends T>(subject: S) => any {
  return () => true
}
