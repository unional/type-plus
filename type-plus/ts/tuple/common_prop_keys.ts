import type { NotNeverType } from '../never/never_type.js'
import type { KeyTypes } from '../object/KeyTypes.js'
import type { Tail } from './tail.js'

/**
 * ⚗️ *transform*
 *
 * Gets the common property keys of the elements in tuple `T`.
 *
 * ```ts
 * import { CommonPropKeys } from 'type-plus'
 *
 * type R = CommonPropKeys<[{ a: number }, { b: number }]> // never
 * type R = CommonPropKeys<[{ a: number, c: 1 }, { b: number, c: 2 }]> // 'c'
 * ```
 */
export type CommonPropKeys<
	T extends Record<KeyTypes, unknown>[],
	Cases extends {
		array?: unknown,
		no_common_keys?: unknown
	} = {
		array: T extends Array<infer R extends Record<KeyTypes, unknown>> ? keyof R : never,
		no_common_keys: never
	}
> = number extends T['length']
	? Cases['array']
	: (
		T['length'] extends 0
		? Cases['no_common_keys']
		: (
			T['length'] extends 1
			? keyof T[0]
			: (
				T['length'] extends 2
				? (
					keyof T[0] & keyof T[1] extends infer R
					? NotNeverType<R, R, Cases['no_common_keys']>
					: never
				)
				: (
					keyof T[0] & keyof T[1] & CommonPropKeys<Tail<Tail<T>>> extends infer R
					? NotNeverType<R, R, Cases['no_common_keys']>
					: never
				)
			)
		)
	)

/**
 * Gets the common property keys of the elements in `A`.
 *
 * @deprecated Please use `CommonPropKeys` instead.
 */
export type CommonKeys<A extends Record<KeyTypes, any>[]> = CommonPropKeys<A>
