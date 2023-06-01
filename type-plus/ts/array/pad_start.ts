import type { CanAssign } from '../index.js'
import type { CreateTuple } from '../tuple/create_tuple.js'
import type { PadStart as TuplePadStart } from '../tuple/tuple_plus.pad_start.js'
import type { UnionOfValues } from './union_of_values.js'

/**
 * Pads the start of an array or tuple with `PadWith`.
 *
 * @example
 * ```ts
 * // Padding array
 * PadStart<number[], 1, string> // [string, ...number[]]
 *
 * // Ignore if the type is compatible
 * PadStart<number[], 2, number> // number[]
 * PadStart<number[], 3, 1> // number[]
 *
 * // Padding tuple
 * PadStart<[1, 2, 3], 5, 0> // [0, 0, 1, 2, 3]
 *
 * // Ignore if MaxLength is less than the length of the tuple
 * PadStart<[1, 2, 3], 5, 0> // [0, 0, 1, 2, 3]
 *
 * // Default to unknown
 * PadStart<[1, 2, 3], 5> // [unknown, unknown, 1, 2, 3]
 * ```
 */
export type PadStart<
	A extends unknown[],
	MaxLength extends number,
	PadWith = unknown
> = number extends A['length']
	? MaxLength extends 0
		? A
		: CanAssign<PadWith, UnionOfValues<A>> extends true
		? A
		: PadStart<[...CreateTuple<MaxLength, PadWith>, ...A], MaxLength, PadWith>
	: TuplePadStart<A, MaxLength, PadWith>

/**
 * @deprecated use PadStart instead
 */
export type PadLeft<A extends any[], Total extends number, PadWith = any> = PadStart<A, Total, PadWith>
