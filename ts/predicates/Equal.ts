/**
 * `<T>() => T extends A ? 1 : 2` idea originate from `typepark`
 * But it does not work with union types.
 *
 * `<T>() => T extends A` is a trick to create an inferred type `T`.
 * This is needed for `boolean`, `string`, and `number`,
 * as they supports literal types.
 */

import { IsNever } from '../PrimitiveTypes.js'

/**
 * Checks if two types are equal.
 */
export type Equal<A, B, Then = true, Else = false> =
  [A, B] extends [boolean | string | number | undefined | symbol, boolean | string | number | undefined | symbol]
  ? (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? Then : Else
  : (IsNever<A> extends true
    ? (IsNever<B> extends true ? Then : Else)
    : (A extends B ? B extends A ? Then : Else : Else))
export type IsEqual<A, B> = Equal<A, B>

export type NotEqual<A, B, Then = true, Else = false> =
  [A, B] extends [boolean | string | number | undefined | symbol, boolean | string | number | undefined | symbol]
  ? (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? Else : Then
  : (IsNever<A> extends true
    ? (IsNever<B> extends true ? Then : Else)
    : (A extends B ? B extends A ? Else : Then : Then))
export type IsNotEqual<A, B> = NotEqual<A, B>

// export type Equal<A, B, Then = true, Else = false> =
// [A, B] extends [object, object]
// ? (A extends B ? B extends A ? Then : Else : Else)
// : (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? Then : Else
// export type IsEqual<A, B> = Equal<A, B>

// export type NotEqual<A, B, Then = true, Else = false> =
// [A, B] extends [object, object]
// ? (A extends B ? B extends A ? Else : Then : Then)
// : (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? Else : Then
// export type IsNotEqual<A, B> = NotEqual<A, B>
