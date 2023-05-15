import type { IsEqual } from '../equal/equal.js'
import { CanAssign } from '../index.js'
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
	export type Strict<A extends unknown[], Criteria, Then, Else> = number extends A['length']
		? IsEqual<UnionOfValues<A>, Criteria> extends true
			? Then
			: Else
		: StrictTuple<A, Criteria, Then, Else>

	export type StrictTuple<A extends unknown[], Criteria, Then, Else> = A['length'] extends 0
		? Else
		: IsEqual<A[0], Criteria> extends true
		? Then
		: StrictTuple<Tail<A>, Criteria, Then, Else>

	export type Loose<A extends unknown[], Criteria, Then, Else> = number extends A['length']
		? CanAssign<UnionOfValues<A>, Criteria> extends infer C
			? boolean extends C
				? Then
				: C extends true
				? Then
				: Else
			: never
		: LooseTuple<A, Criteria, Then, Else>

	export type LooseTuple<A extends unknown[], Criteria, Then, Else> = A['length'] extends 0
		? Else
		: A[0] extends Criteria
		? Then
		: LooseTuple<Tail<A>, Criteria, Then, Else>
}
