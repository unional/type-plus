export type UnionOfValues<A extends Array<any>> = A extends Array<infer E> ? E : never

/**
 * @deprecated use UnionOfValues
 */
export type ArrayValue<A extends any[]> = UnionOfValues<A>
