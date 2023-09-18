import type { $Type } from '../type_plus/type.js'

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
 *   export type $Default = $AnyDefault
 *   export type $Override = $AnyOverride
 * }
 * ```
 */
export type $AnyOptions = {
	$any?: unknown
}

export type $Any = $Type<'branch', 'any'>

/**
 * 🧰 *type util*
 *
 * Override option for specifically overriding the type `any`.
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
 *   export type $Override = $AnyOverride
 * }
 *
 * type R = YourType<T, YourType.$Override> extends $Any ? HandleAny : HandleOthers
 * ```
 */
export type $AnyOverride = {
	$any: $Any
}

/**
 * 🧰 *type util*
 *
 * Default options for `any`.
 *
 * Unsurprisingly, defaulting `$any` to `any`.
 */
export type $AnyDefault = {
	$any: any
}
