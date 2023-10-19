import type { IsNever } from '../never/is_never.js'
import type { $Never } from '../never/never.js'
import type { KeyTypes } from '../object/KeyTypes.js'

/**
 * ⚗️ *transform*
 * 🔢 *customization*
 *
 * Gets the common keys of the record types in the array `A`.
 *
 * @example
 * ```ts
 * import { type ArrayPlus } from 'type-plus'
 *
 * type R = ArrayPlus.CommonPropKeys<Array<{ a: 1 }>> // 'a'
 * type R = ArrayPlus.CommonPropKeys<Array<{ a: 1, b: 1 } | { a: 1, c: 1 }>> // 'a'
 * ```
 *
 * @typeParam Options['$never'] Return type when `T` is `never`.
 * Default to `never`.
 */
export type CommonPropKeys<
	A extends readonly Record<KeyTypes, unknown>[],
	Options extends CommonPropKeys.Options = CommonPropKeys.DefaultOptions
> = IsNever<A,
	{
		$then: Options['$never'],
		$else: A extends Readonly<Array<infer R extends Record<KeyTypes, unknown>>> ? keyof R : never
	}
>

export namespace CommonPropKeys {
	export interface Options extends $Never.$Options {
	}

	export interface DefaultOptions extends $Never.$Default {
	}
}
