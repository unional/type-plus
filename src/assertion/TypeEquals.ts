/**
 * Checks if two types are equal.
 * Borrow from `typepark`.
 * The simple `A extends B ? B extends A ? true : false : false`
 * does not work with boolean type.
 */
export type TypeEquals<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false

export type TypeNotEquals<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? false : true

export type CanAssign<A, B> = A extends B ? true : false
