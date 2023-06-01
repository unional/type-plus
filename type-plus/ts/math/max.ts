import type { IsNever } from '../never/never_type.js'
import type { GreaterThan } from './greater_than.js'

export type Max<A extends number | bigint, B extends number | bigint, Fail = never> = GreaterThan<
	A,
	B
> extends infer Result
	? IsNever<Result> extends true
		? Fail
		: Result extends true
		? A
		: B
	: never
