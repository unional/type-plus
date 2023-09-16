import type { IsNever } from '../never/is_never.js'
import type { NeverType } from '../never/never_type.js'

/**
 * 🌪️ *filter*
 *
 * Filter `T` to ensure it is a tuple, excluding array.
 *
 * @typeParam Cases['$never'] Return type when `T` is `never`. Default to `Else`.
 *
 * @example
 * ```ts
 * type R = TupleType<[]>       // []
 * type R = TupleType<[1]>      // [1]
 *
 * type R = TupleType<number[]> // never
 * type R = TupleType<string>   // never
 * type R = TupleType<never>    // never
 * type R = TupleType<unknown>  // never
 * ```
 */
export type TupleType<
	T,
	Then = T,
	Else = never,
	Options extends TupleType.Options = TupleType.DefaultOptions<Else>
> = IsNever<
	T,
	Options['$never'],
	[T] extends [readonly any[]] ? (number extends T['length'] ? Else : Then) : Else
>

export namespace TupleType {
	export interface Options extends NeverType.Options {
	}

	export interface DefaultOptions<Else> {
		$never: Else
	}
}


/**
 * 🎭 *validate*
 *
 * Validate that `T` is a tuple, excluding array.
 *
 * ```ts
 * type R = IsTuple<[]>       // true
 *
 * type R = IsTuple<number[]> // false
 * type R = IsTuple<string>   // false
 * type R = IsTuple<never>    // false
 * type R = IsTuple<unknown>  // false
 * ```
 */
export type IsTuple<
	T,
	Then = true,
	Else = false,
	Options extends TupleType.Options = TupleType.DefaultOptions<Else>
> = TupleType<T, Then, Else, Options>


/**
 * 🌪️ *filter*
 *
 * Filter `T` to ensure it is not an tuple, excluding array.
 *
 * ```ts
 * type R = NotTupleType<[]>       // never
 * type R = NotTupleType<[1]>      // never
 *
 * type R = NotTupleType<number[]> // number[]
 * type R = NotTupleType<string>   // string
 * type R = NotTupleType<never>    // never
 * type R = NotTupleType<unknown>  // unknown
 * ```
 */
export type NotTupleType<
	T,
	Then = T,
	Else = never,
	Options extends TupleType.Options = TupleType.DefaultOptions<Then>
> = TupleType<T, Else, Then, Options>

/**
 * 🎭 *validate*
 *
 * Validate that `T` is not a tuple, excluding array.
 *
 * ```ts
 * type R = IsNotTuple<[]>       // false
 * type R = IsNotTuple<[1]>      // false
 *
 * type R = IsNotTuple<number[]> // true
 * type R = IsNotTuple<string>   // true
 * type R = IsNotTuple<never>    // true
 * type R = IsNotTuple<unknown>  // true
 * ```
 */
export type IsNotTuple<
	T,
	Then = true,
	Else = false,
	Options extends TupleType.Options = TupleType.DefaultOptions<Then>
> = TupleType<T, Else, Then, Options>
