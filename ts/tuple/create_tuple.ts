import type { DigitArray } from '../math/index.js'
import type { IsInteger } from '../numeric/integer.js'
import type { IsPositive } from '../numeric/positive.js'

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
		? DigitArray.ToTuple<[], DigitArray.FromNumber<L>, T>
		: Fail
	: Fail
