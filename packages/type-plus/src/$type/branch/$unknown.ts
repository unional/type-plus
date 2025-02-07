import type { $Branch } from './$branch.js'

/**
 * Branch selector for type `unknown`.
 */
export type $Unknown = $Branch<'$unknown'>

export namespace $Unknown {
	/**
	 * Options to specifically handles the `unknown` type.
	 *
	 * @example
	 * ```ts
	 * type YourType<T, $Options extends $Unknown.$Options> = ...
	 * ```
	 */
	export type $Options = { $unknown?: unknown }

	/**
	 * Branch option to specifically handles the `unknown` type.
	 *
	 * Use this to finely customize the behavior of your type.
	 *
	 * @example
	 * ```ts
	 * type YourType<T, $Options $Unknown.$Options> = ...
	 *
	 * type R = YourType<T, $Unknown.$Branch> extends $Unknown ? HandleUnknown : HandleOthers
	 * ```
	 */
	export type $Branch = { $unknown: $Unknown }
}
