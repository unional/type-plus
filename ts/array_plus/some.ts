import type { Equal } from '../predicates/index.js'
import type { Tail } from './tail.js'
import type { UnionOfValues } from './union_of_values.js'

export type Some<
	A extends any[],
	Criteria,
	Mode extends 'strict' | 'loose' = 'loose',
	Then = true,
	Else = false
> = Mode extends 'strict'
	? Some.Strict<A, Criteria, Then, Else>
	: number extends A['length']
	? UnionOfValues<A> extends Criteria
		? Then
		: Else
	: A['length'] extends 0
	? Else
	: A[0] extends Criteria
	? Then
	: Some<Tail<A>, Criteria, 'loose', Then, Else>

export namespace Some {
	export type Strict<A extends any[], Criteria, Then, Else> = number extends A['length']
		? Equal<UnionOfValues<A>, Criteria> extends true
			? Then
			: Else
		: A['length'] extends 0
		? Else
		: Equal<A[0], Criteria> extends true
		? Then
		: Strict<Tail<A>, Criteria, Then, Else>
}
