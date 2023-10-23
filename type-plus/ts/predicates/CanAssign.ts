import type { Assignable } from './assignable.js'
import type { NotExtendable } from './Extends.js'

/**
 * Can `A` assign to `B`
 *
 * Note that when union is involved, the assignability is measured distributively.
 * Meaning the result can be `Then | Else` (i.e. `boolean` by default),
 * instead of distinctive `Then` (`true`) or `Else` (`false`).
 *
 * This is the correct behavior.
 *
 * @deprecated use `Assignable<A, B>` instead
 *
 * @example
 * ```ts
 * CanAssign<number | string, number> // boolean
 * ```
 *
 * We are checking can `A` assign to `B`.
 * Since `A` is `number | string`,
 * `A` can assign to `B` when `A` is number` (true), and
 * `A` cannot assign to `B` when `A` is string` (false).
 * So the result is `true | false = boolean`.
 *
 * If you want to make sure all branches are assignable,
 * use `StrictCanAssign<A, B>`.
 */
export type CanAssign<A, B, Then = true, Else = false> = boolean extends A
	? boolean extends B
	? Then
	: Else
	: A extends B
	? Then
	: Else

/**
 * Can `A` strictly assign to `B`.
 *
 * All branches in an union `A` are assignable to `B`.
 *
 * @deprecated use `Assignable<A, B` instead
 *
 * @example
 * ```ts
 * StrictCanAssign<number | string, number> // false
 * StrictCanAssign<number | string, number | string> // true
 * ```
 */
export type StrictCanAssign<A, B, Then = true, Else = false> = Assignable<A, B, { distributive: false, $then: Then, $else: Else }>

/**
 * @deprecated use `CanAssign` instead
 */
export type IsAssign<A, B, Then = true, Else = false> = CanAssign<A, B, Then, Else>

export function canAssign<T>(canAssign: false): <S>(subject: NotExtendable<S, T>) => true
export function canAssign<T>(): <S extends T>(subject: S) => CanAssign<S, T>
export function canAssign<T>(): <S extends T>(subject: S) => any {
	return () => true
}
