import type { IsNever } from '../never/is_never.js'
import type { $Never } from '../never/never.js'
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
 * @typeParam Options['$never'] Return type when `T` is `never`.
 * Default to `never`.
 */
export type CommonPropKeys<
	T extends Record<KeyTypes, unknown>[],
	Options extends CommonPropKeys.Options = CommonPropKeys.DefaultOptions
> = IsNever<
	T,
	{
		$then: Options['$never'],
		$else: (T['length'] extends 0
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
	}
>

export namespace CommonPropKeys {
	export interface Options extends $Never.$Options {
	}

	export interface DefaultOptions extends $Never.$Default {
	}
}
