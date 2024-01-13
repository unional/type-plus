import type { CanAssign } from '../index.js'
import type { CreateTuple } from '../tuple/create_tuple.js'
import type { UnionOfValues } from './union_of_values.js'

export type PadStart<
	A extends readonly unknown[],
	MaxLength extends number,
	PadWith = unknown
> = MaxLength extends 0
	? A
	: CanAssign<PadWith, UnionOfValues<A>> extends true
	? A
	: PadStart<[...CreateTuple<MaxLength, PadWith>, ...A], MaxLength, PadWith>
