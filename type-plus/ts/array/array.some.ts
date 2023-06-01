import type { IsEqual } from '../equal/equal.js'
import type { CanAssign } from '../index.js'
import type { Tail } from './tail.js'
import type { UnionOfValues } from './union_of_values.js'

/**
 * Determines whether the array type `A` contains any elements that satisfies the specified `Criteria` type.
 *
 * It operates in `loose` mode by default,
 * which means literal types satisfies their widened counterparts.
 *
 * You can also change it to `strict` mode.
 *
 * @example
 * ```ts
 * Some<string[], string> // true
 * Some<['a', boolean], boolean> // true
 * Some<['a', true], boolean> //true
 *
 * Some<['a', true], boolean, 'strict'> // false
 * ```
 */
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
		? CanAssign<UnionOfValues<A>, Criteria, Then, Else>
		: LooseTuple<A, Criteria, Then, Else>

	export type LooseTuple<A extends unknown[], Criteria, Then, Else> = A['length'] extends 0
		? Else
		: A[0] extends Criteria
		? Then
		: LooseTuple<Tail<A>, Criteria, Then, Else>
}
