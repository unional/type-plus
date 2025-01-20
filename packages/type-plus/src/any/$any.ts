import type { $Branch } from '../$type/branch/$branch.js'

/**
 * 🧰 *type util*
 *
 * Selector for `$any` branch.
 */
export type $Any = $Branch<'$any'>

export namespace $Any {
	/**
	 * 🧰 *type util*
	 *
	 * Options for specifically handling the type `any`.
	 *
	 * @example
	 * ```ts
	 * type YourType<
	 *   T,
	 *   $Options extends YourType.$Options = YourType.$Default
	 * > = ...
	 *
	 * namespace YourType {
	 *   export type $Options = $AnyOptions
	 * }
	 * ```
	 */
	export type $Options = { $any?: unknown }

	/**
	 * 🧰 *type util*
	 *
	 * Branch option for specifically handling the type `any`.
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
	 *   export type $Options = $Any.$Options
	 *   export type $Branch = $Any.$Branch
	 * }
	 *
	 * type R = YourType<T, YourType.$Branch> extends $Any ? HandleAny : HandleOthers
	 * ```
	 */
	export type $Branch = { $any: $Any }
}
