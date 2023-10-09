import type { $Branch } from '../type_plus/branch/$branch.js'

/**
 * 🧰 *type util*
 *
 * A special branch for `unknown` check to represent the value is `unknown`.
 */
export type $Unknown = $Branch<'$unknown'>

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
 *   export type $Options = $UnknownOptions
 *   export type $Default = $UnknownDefault
 *   export type $Override = $UnknownOverride
 * }
 * ```
 */
export type $UnknownOptions = {
	$unknown?: unknown
}

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
 *   export type $Options = $AnyOptions
 *   export type $Default = $AnyDefault
 *   export type $Branch = $AnyBranch
 * }
 *
 * type R = YourType<T, YourType.$Branch> extends $Any ? HandleAny : HandleOthers
 * ```
 */
export type $UnknownBranch = {
	$unknown: $Unknown
}

/**
 * 🧰 *type util*
 *
 * Default options for `unknown`.
 *
 * Unsurprisingly, defaulting `$unknown` to `unknown`.
 */
export type $UnknownDefault = {
	$unknown: unknown
}
