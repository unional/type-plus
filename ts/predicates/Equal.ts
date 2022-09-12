/**
 * `<T>() => T extends A ? 1 : 2` idea originate from `typepark`
 * But it does not work with union types.
 *
 * `<T>() => T extends A` is a trick to create an inferred type `T`.
 * This is needed for `boolean`, `string`, and `number`,
 * as they supports literal types.
 */

/**
 * Checks if two types are equal.
 */
export type Equal<A, B, Then = true, Else = false> =
  [A, B] extends [boolean | string | number, boolean | string | number]
  ? (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? Then : Else
  : ([A] extends [never]
    ? ([B] extends [never] ? Then : Else)
    : (A extends B ? B extends A ? Then : Else : Else))
export type IsEqual<A, B> = Equal<A, B>

export type NotEqual<A, B, Then = true, Else = false> =
  [A, B] extends [boolean | string | number, boolean | string | number]
  ? (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? Else : Then
  : ([A] extends [never]
    ? ([B] extends [never] ? Then : Else)
    : (A extends B ? B extends A ? Else : Then : Then))
export type IsNotEqual<A, B> = NotEqual<A, B>
