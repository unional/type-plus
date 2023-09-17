import type { $SelectionOptions } from '../type_plus/branch/selection.js'
import type { $Type } from '../type_plus/type.js'

export type $Never = $Type<'branch', 'never'>
export type $NotNever = $Type<'branch', 'not_never'>

/**
 * Check if `T` is `never`.
 * If it is not, returns `Not_Never`.
 *
 * ```ts
 * type R = NeverType<never> // never
 *
 * type R = NeverType<1> // 'not never'
 * ```
 */
export type NeverType<
	T,
	$Options extends $SelectionOptions = { $then: never, $else: $NotNever }
> = [T, never] extends [never, T] ? $Options['$then'] : $Options['$else']

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
export interface $NeverOptions {
	$never?: unknown
}

/**
 * 🧰 *type util*
 *
 * Override option for specifically overriding the branch for `never`.
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
 *   export type $Override = $NeverOverride
 * }
 *
 * type R = YourType<T, YourType.$Override> extends $Any ? HandleAny : HandleOthers
 * ```
 */
export type $NeverOverride = {
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
export interface $NotNeverOptions {
	$not_never?: unknown
}

/**
 * 🧰 *type util*
 *
 * Override option for specifically overriding the branch for `never`.
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
 *   export type $Override = $NeverOverride
 * }
 *
 * type R = YourType<T, YourType.$Override> extends $Any ? HandleAny : HandleOthers
 * ```
 */
export type $NotNeverOverride = {
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
