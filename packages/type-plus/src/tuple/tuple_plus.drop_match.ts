import type { IsEqual } from '../equal/equal.js'

export type DropMatch<A extends Readonly<Array<unknown>>, Criteria> = A['length'] extends 0
	? // empty tuple
		A
	: A extends readonly [infer Head, ...infer Tail]
		? Tail['length'] extends 0
			? // single element tuple
				undefined extends Criteria
				? DropMatch.ExcludeUnionOfEmptyTuple<Head extends Criteria ? [] : [Head]>
				: DropMatch.ExcludeUnionOfEmptyTuple<Head extends Criteria ? [] : [Head]>
			: // multiple elements
				Exclude<Head, Criteria> extends never
				? DropMatch<Tail, Criteria>
				: [Exclude<Head, Criteria>, ...DropMatch<Tail, Criteria>]
		: never[]

export namespace DropMatch {
	export type ExcludeUnionOfEmptyTuple<A> = IsEqual<A, []> extends true ? A : Exclude<A, []>
}
