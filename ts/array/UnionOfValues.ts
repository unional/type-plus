/**
 * Gets the union of value types in `A`
 */
export type UnionOfValues<A extends Array<any>> = A extends Array<infer E> ? E : never

// alternative implementation
// export type UnionOfValues<A extends readonly any[]> = (A)[number]
// from: https://twitter.com/anveio/status/1615140804816928769?s=20&t=wrudiqV94A11CSl19N6Viw

/**
 * Gets the union of value types in `A`
 * @deprecated Please use `UnionOfValues` instead.
 */
export type ArrayValue<A extends any[]> = UnionOfValues<A>
