import type { IsEqual } from '../equal/equal.js'
import type { Tail } from './tail.js'
import type { UnionOfValues } from './union_of_values.js'

export type Some<
	A extends any[],
	Criteria,
	Mode extends 'strict' | 'loose' = 'loose',
	Then = true,
	Else = false
> = Mode extends 'strict' ? Some.Strict<A, Criteria, Then, Else> : Some.Loose<A, Criteria, Then, Else>

export namespace Some {
	export type Strict<A extends any[], Criteria, Then, Else> = number extends A['length']
		? IsEqual<UnionOfValues<A>, Criteria> extends true
			? Then
			: Else
		: A['length'] extends 0
		? Else
		: IsEqual<A[0], Criteria> extends true
		? Then
		: Strict<Tail<A>, Criteria, Then, Else>
	export type Loose<A extends any[], Criteria, Then, Else> = number extends A['length']
		? UnionOfValues<A> extends Criteria
			? Then
			: Else
		: A['length'] extends 0
		? Else
		: A[0] extends Criteria
		? Then
		: Loose<Tail<A>, Criteria, Then, Else>
}
