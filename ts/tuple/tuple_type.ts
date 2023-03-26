import type { IsNever } from '../never/never_type.js'

/**
 * Check if `T` is a tuple and not an array.
 *
 * ```ts
 * import type { TupleType } from 'type-plus'
 *
 * type R = TupleType<[]>       // []
 * type R = TupleType<[1]>      // [1]
 *
 * type R = TupleType<number[]> // never
 * type R = TupleType<string>   // never
 * type R = TupleType<never>    // never
 * type R = TupleType<unknown>  // never
 * ```
 */
export type TupleType<T, Then = T, Else = never> = IsNever<
	T,
	Else,
	[T] extends [any[]] ? (number extends T['length'] ? Else : Then) : Else
>

/**
 * Check if `T` is not a tuple.
 *
 * ```ts
 * import type { NotTupleType } from 'type-plus'
 *
 * type R = NotTupleType<[]>       // never
 * type R = NotTupleType<[1]>      // never
 *
 * type R = NotTupleType<number[]> // number[]
 * type R = NotTupleType<string>   // string
 * type R = NotTupleType<never>    // never
 * type R = NotTupleType<unknown>  // unknown
 * ```
 */
export type NotTupleType<T, Then = T, Else = never> = TupleType<T, Else, Then>

/**
 * Is `T` a tuple and not an array.
 *
 * ```ts
 * import type { IsTuple } from 'type-plus'
 *
 * type R = IsTuple<[]>       // true
 *
 * type R = IsTuple<number[]> // false
 * type R = IsTuple<string>   // false
 * type R = IsTuple<never>    // false
 * type R = IsTuple<unknown>  // false
 * ```
 */
export type IsTuple<T, Then = true, Else = false> = TupleType<T, Then, Else>

/**
 * Is `T` not a tuple.
 *
 * ```ts
 * import type { IsNotTuple } from 'type-plus'
 *
 * type R = IsNotTuple<[]>       // false
 * type R = IsNotTuple<[1]>      // false
 *
 * type R = IsNotTuple<number[]> // false
 * type R = IsNotTuple<string>   // false
 * type R = IsNotTuple<never>    // false
 * type R = IsNotTuple<unknown>  // false
 * ```
 */
export type IsNotTuple<T, Then = true, Else = false> = TupleType<T, Else, Then>
