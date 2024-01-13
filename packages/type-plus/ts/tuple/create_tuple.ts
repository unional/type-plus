import type { DigitArray } from '../math/numeric_struct.js'
import type { IsInteger } from '../numeric/is_integer.js'
import type { IsPositive } from '../numeric/is_positive.js'

/**
 * Creates `Tuple<T>` with `L` number of elements.
 * @note Other cool implementations by @lazytype, @jcalz:
 * @see https://github.com/microsoft/TypeScript/issues/26223#issuecomment-674514787
 * @see https://github.com/microsoft/TypeScript/issues/47874#issuecomment-1039157322
 */
export type CreateTuple<L extends number, T = unknown, Fail = never> = number extends L
	? T[]
	: IsPositive<L> extends true
	? IsInteger<L> extends true
		? ToTuple<[], DigitArray.FromString<`${L}`>, T>
		: Fail
	: Fail
export type ToTuple<R extends any[], S extends number[], X = any> = S['length'] extends 0
	? R
	: S['length'] extends 1
	? [...R, ...DigitToTuple<X>[S[0]]]
	: S extends [any, ...infer T]
	? T extends any[]
		? ToTuple<Multi10<[...R, ...DigitToTuple<X>[S[0]]]>, T>
		: never
	: never

type DigitToTuple<T = 1> = {
	[k in number]: any[]
} & {
	0: [],
	1: [T],
	2: [T, T],
	3: [T, T, T],
	4: [T, T, T, T],
	5: [T, T, T, T, T],
	6: [T, T, T, T, T, T],
	7: [T, T, T, T, T, T, T],
	8: [T, T, T, T, T, T, T, T],
	9: [T, T, T, T, T, T, T, T, T]
}
type Multi10<C extends any[]> = [...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C, ...C]
