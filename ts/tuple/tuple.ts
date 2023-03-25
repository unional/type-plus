import type { IsNever } from '../never/never.js'

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

/**
 * Check if `T` is not a tuple.
 *
 * ```ts
 * import type { NotTupleType } from 'type-plus'
 *
 * type R = NotTupleType<number[]> // true
 *
 * type R = NotTupleType<[]>       // false
 * type R = NotTupleType<[1]>      // false
 * ```
 */
export type NotTupleType<T, Then = T, Else = never> = TupleType<T, Else, Then>

/**
 * Is `T` a tuple.
 *
 * ```ts
 * import type { IsTuple } from 'type-plus'
 *
 * type R = IsTuple<[]>       // true
 *
 * type R = IsTuple<number[]> // false
 * type R = IsTuple<string>   // false
 * ```
 */
export type IsTuple<T, Then = true, Else = false> = TupleType<T, Then, Else>

/**
 * Is `T` not a tuple.
 *
 * ```ts
 * import type { IsNotTuple } from 'type-plus'
 *
 * type R = IsNotTuple<number[]> // true
 *
 * type R = IsNotTuple<[]>       // false
 * type R = IsNotTuple<[1]>      // false
 * ```
 */
export type IsNotTuple<T, Then = true, Else = false> = TupleType<T, Else, Then>
