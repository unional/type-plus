import { Equal, IsAny } from '../predicates/index.js'
import { CreateTuple } from './create_tuple.js'
import { UnionOfValues } from './union_of_values.js'

export type PadLeft<A extends any[], Total extends number, PadWith = any> = number extends A['length']
	? IsAny<UnionOfValues<A>> extends true
		? A
		: Equal<UnionOfValues<A>, PadWith> extends true
		? A
		: PadLeft<[...CreateTuple<Total, PadWith>, ...A], Total, PadWith>
	: CreateTuple<Total, any> extends [...infer U, ...A]
	? number extends U['length']
		? A
		: [...CreateTuple<U['length'], PadWith>, ...A]
	: A
