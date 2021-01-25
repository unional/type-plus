/**
 * Gets the union of value types in `A`
 */
export type UnionOfValues<A extends Array<any>> = A extends Array<infer E> ? E : never

/**
 * Gets the union of value types in `A`
 * This will be deprecated in 4.0. Please use UnionOfValues instead.
 */
export type ArrayValue<A extends any[]> = UnionOfValues<A>
