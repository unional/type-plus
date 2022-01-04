/**
 * Checks if two types are equal.
 * Borrow from `typepark`.
 * The simple `A extends B ? B extends A ? true : false : false`
 * does not work with boolean type.
 */
export type Equal<A, B, Then = true, Else = false> =
  (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
  ? Then : Else
export type IsEqual<A, B> = Equal<A, B>

export type NotEqual<A, B, Then = true, Else = false> =
  (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? Else : Then
export type IsNotEqual<A, B> = NotEqual<A, B>
