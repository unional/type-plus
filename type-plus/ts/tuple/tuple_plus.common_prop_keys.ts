import type { NeverType } from '../never/never_type.js'
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
 * import { type TuplePlus } from 'type-plus'
 *
 * type R = TuplePlus.CommonPropKeys<[{ a: number }, { b: number }]> // never
 * type R = TuplePlus.CommonPropKeys<[{ a: number, c: 1 }, { b: number, c: 2 }]> // 'c'
 * ```
 *
 * @typeParam Options['caseNever'] Return type when `T` is `never`.
 * Default to `never`.
 */
export type CommonPropKeys<
	T extends Record<KeyTypes, unknown>[],
	Options extends CommonPropKeys.Options = CommonPropKeys.DefaultOptions
> = NeverType<
	T,
	Options['caseNever'],
	(T['length'] extends 0
		? never
		: (
			T['length'] extends 1
			? keyof T[0]
			: (
				T['length'] extends 2
				? keyof T[0] & keyof T[1]
				: keyof T[0] & keyof T[1] & CommonPropKeys<Tail<Tail<T>>>
			)
		))
>

export namespace CommonPropKeys {
	export interface Options extends NeverType.Options {
	}

	export interface DefaultOptions extends NeverType.DefaultOptions {
	}
}
