import type { IsPositive } from '../numeric/is_positive.js'
import type { Subtract } from './subtract.js'

export type GreaterThan<A extends number | bigint, B extends number | bigint, Fail = never> = Subtract<
	A,
	B,
	'fail'
> extends infer R extends number
	? R extends 0
		? false
		: IsPositive<R>
	: Fail
