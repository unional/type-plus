import type { IsNever } from '../never/is_never.js'
import type { $NeverOptions } from '../never/never.js'

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
	Options extends TupleType.$Options = TupleType.DefaultOptions<Else>
> = IsNever<T> extends infer R
	? R extends true ? Options['$never']
	: R extends false ? [T] extends [readonly any[]] ? (number extends T['length'] ? Else : Then) : Else
	: never : never

export namespace TupleType {
	export interface $Options extends $NeverOptions {
	}

	export interface DefaultOptions<Else> {
		$never: Else
	}
}

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
	Options extends TupleType.$Options = TupleType.DefaultOptions<Then>
> = TupleType<T, Else, Then, Options>
