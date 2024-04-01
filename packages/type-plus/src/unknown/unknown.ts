import type { $Branch } from '../type_plus/branch/$branch.js'

/**
 * 🧰 *type util*
 *
 * A special branch for `unknown` check to represent the value is `unknown`.
 */
export type $Unknown = $Branch<'$unknown'>

export namespace $Unknown {
	/**
	 * 🧰 *type util*
	 *
	 * Options for specifically handling the type `unknown`.
	 *
	 * @example
	 * ```ts
	 * type YourType<
	 *   T,
	 *   $Options extends YourType.$Options = YourType.$Default
	 * > = ...
	 *
	 * namespace YourType {
	 *   export type $Options = $Unknown.$Options
	 *   export type $Branch = $Unknown.$Branch
	 * }
	 * ```
	 */
	export type $Options = {
		$unknown?: unknown
	}

	/**
	 * 🧰 *type util*
	 *
	 * Branch option for specifically handling the type `unknown`.
	 *
	 * Use this to finely customize the behavior of your type.
	 *
	 * ```ts
	 * type YourType<
	 *   T,
	 *   $Options extends YourType.$Options = YourType.$Default
	 * > = ...
	 *
	 * namespace YourType {
	 *   export type $Options = $Unknown.$Options
	 *   export type $Branch = $Unknown.$Branch
	 * }
	 *
	 * type R = YourType<T, YourType.$Branch> extends $Unknown ? HandleUnknown : HandleOthers
	 * ```
	 */
	export type $Branch = {
		$unknown: $Unknown
	}
}
