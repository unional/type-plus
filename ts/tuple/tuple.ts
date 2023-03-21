import { IsNever } from '../PrimitiveTypes.js'

/**
 * Check if `T` is a tuple.
 *
 * ```ts
 * import type { TupleType } from 'type-plus'
 *
 * type R = TupleType<[]>       // true
 * type R = TupleType<[1]>      // true
 *
 * type R = TupleType<number[]> // false
 * type R = TupleType<string>   // false
 * ```
 */
export type TupleType<T, Then = T, Else = never> = IsNever<
	T,
	Else,
	T extends infer A extends Array<any> ? (number extends A['length'] ? Else : Then) : Else
>
