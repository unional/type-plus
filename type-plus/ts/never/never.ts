import type { $Type } from '../type_plus/type.js'

/**
 * 🧰 *type util*
 *
 * A special branch for `never` check to represent the value is not `never`.
 */
export type $NotNever = $Type<'branch', 'not_never'>

/**
 * 🧰 *type util*
 *
 * A special branch for not `never` check to represent the value is `never`.
 */
export type $Never = $Type<'branch', 'never'>

/**
 * 🧰 *type util*
 *
 * Options for specifically handling the type `never`
 *
 * @example
 * ```ts
 * type YourType<
 *   T,
 *   $Options extends YourType.$Options = YourType.$Default
 * > = ...
 *
 * namespace YourType {
 *   export type $Options = $NeverOptions
 *   export type $Default = $NeverDefault
 *   export type $Override = $NeverOverride
 * }
 * ```
 */
export type $NeverOptions = {
	$never?: unknown
}

/**
 * 🧰 *type util*
 *
 * Branch option to handle when the value is `never`
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
 *   export type $Options = $NeverOptions
 *   export type $Default = $NeverDefault
 *   export type $Branch = $NeverBranch
 * }
 *
 * type R = YourType<T, YourType.$Branch> extends $Never ? HandleAny : HandleOthers
 * ```
 */
export type $NeverBranch = {
	$never: $Never
}

/**
 * 🧰 *type util*
 *
 * Default options for `never`.
 *
 * Unsurprisingly, defaulting `$never` to `never`.
 */
export type $NeverDefault = {
	$never: never
}

/**
 * 🧰 *type util*
 *
 * Options for specifically handling the type `never`
 *
 * @example
 * ```ts
 * type YourType<
 *   T,
 *   $Options extends YourType.$Options = YourType.$Default
 * > = ...
 *
 * namespace YourType {
 *   export type $Options = $NeverOptions
 *   export type $Default = $NeverDefault
 *   export type $Override = $NeverOverride
 * }
 * ```
 */
export type $NotNeverOptions = {
	$not_never?: unknown
}

/**
 * 🧰 *type util*
 *
 * Branch option to handle when the value is not `never` (while expecting it is).
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
 *   export type $Options = $NeverOptions
 *   export type $Default = $NeverDefault
 *   export type $Branch = $NeverBranch
 * }
 *
 * type R = YourType<T, YourType.$Branch> extends $Any ? HandleAny : HandleOthers
 * ```
 */
export type $NotNeverBranch = {
	$not_never: $NotNever
}

/**
 * 🧰 *type util*
 *
 * Default options for `never`.
 *
 * Unsurprisingly, defaulting `$never` to `never`.
 */
export type $NotNeverDefault<T> = {
	$not_never: T
}
