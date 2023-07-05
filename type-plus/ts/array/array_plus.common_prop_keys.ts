import type { NeverType } from '../never/never_type.js'
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
 * @typeParam Options['caseNever'] Return type when `T` is `never`.
 * Default to `never`.
 */
export type CommonPropKeys<
	A extends Record<KeyTypes, unknown>[],
	Options extends CommonPropKeys.Options = CommonPropKeys.DefaultOptions
> = NeverType<A,
	Options['caseNever'],
	A extends Array<infer R extends Record<KeyTypes, unknown>> ? keyof R : never
>

export namespace CommonPropKeys {
	export interface Options extends NeverType.Options {
	}

	export interface DefaultOptions extends NeverType.DefaultOptions {
	}
}
