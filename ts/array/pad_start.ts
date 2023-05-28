import type { IsAny } from '../any/any_type.js'
import type { IsEqual } from '../equal/equal.js'
import type { CreateTuple } from '../tuple/create_tuple.js'
import type { UnionOfValues } from './union_of_values.js'

export type PadStart<A extends any[], Total extends number, PadWith = any> = number extends A['length']
	? IsAny<UnionOfValues<A>> extends true
		? A
		: IsEqual<UnionOfValues<A>, PadWith> extends true
		? A
		: PadStart<[...CreateTuple<Total, PadWith>, ...A], Total, PadWith>
	: CreateTuple<Total, any> extends [...infer U, ...A]
	? number extends U['length']
		? A
		: [...CreateTuple<U['length'], PadWith>, ...A]
	: A

/**
 * @deprecated use PadStart instead
 */
export type PadLeft<A extends any[], Total extends number, PadWith = any> = PadStart<A, Total, PadWith>
