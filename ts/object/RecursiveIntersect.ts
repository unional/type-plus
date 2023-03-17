import type { AnyRecord } from './AnyRecord.js'

/**
 * Intersect type recursively.
 * The recursion terminates at level 7 due to design limit of TypeScript.
 *
 * Normal use case is intersecting betwee two object types.
 * While it works for value types and top level array,
 * top level array does not recursive into the elements.
 * NOTE: in latest TypeScript,
 * `undefined` is not an accepted value.
 * The resulting type would be `never`
 */
export type RecursiveIntersect<T, U> = T &
	(T extends Array<infer Y>
		? Array<Y & U> & U
		: T extends AnyRecord
		? {
				[P in keyof T]: T[P] extends Array<infer R>
					? Array<RecursiveIntersect<R, U>> & U
					: T[P] extends AnyRecord
					? RecursiveIntersect<T[P], U>
					: T[P] & U
		  } & U
		: U)
