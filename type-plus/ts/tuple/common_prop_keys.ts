import type { NotNeverType } from '../never/never_type.js'
import type { KeyTypes } from '../object/KeyTypes.js'
import type { Tail } from './tail.js'

/**
 * ⚗️ *transform*
 * 🔢 *customization*
 *
 * Gets the common property keys of the elements in tuple `T`.
 *
 * @example
 * ```ts
 * import { CommonPropKeys } from 'type-plus'
 *
 * type R = CommonPropKeys<[{ a: number }, { b: number }]> // never
 * type R = CommonPropKeys<[{ a: number, c: 1 }, { b: number, c: 2 }]> // 'c'
 * ```
 *
 * @typeParam Options['caseArray'] Return type when `T` is `Array`.
 * Defaults to the common keys of the record types in the array.
 *
 * @typeParam Options['caseNoCommonKeys'] Return type when there is no common keys in the records inside the tuple.
 * Defaults to `never`.
 */
export type CommonPropKeys<
	T extends Record<KeyTypes, unknown>[],
	Options extends CommonPropKeys.Options = CommonPropKeys.DefaultOptions<T>
> = number extends T['length']
	? Options['caseArray']
	: (
		T['length'] extends 0
		? Options['caseNoCommonKeys']
		: (
			T['length'] extends 1
			? keyof T[0]
			: (
				T['length'] extends 2
				? (
					keyof T[0] & keyof T[1] extends infer R
					? NotNeverType<R, R, Options['caseNoCommonKeys']>
					: never
				)
				: (
					keyof T[0] & keyof T[1] & CommonPropKeys<Tail<Tail<T>>> extends infer R
					? NotNeverType<R, R, Options['caseNoCommonKeys']>
					: never
				)
			)
		)
	)

export namespace CommonPropKeys {
	export interface Options  {
		caseArray?: unknown,
		caseNoCommonKeys?: unknown
	}
	export interface DefaultOptions<T> {
		caseArray: T extends Array<infer R extends Record<KeyTypes, unknown>> ? keyof R : never,
		caseNoCommonKeys: never
	}
}

/**
 * Gets the common property keys of the elements in `A`.
 *
 * @deprecated Please use `CommonPropKeys` instead.
 */
export type CommonKeys<A extends Record<KeyTypes, any>[]> = CommonPropKeys<A>
