import type { $Type } from './$type.js'

export type $Any = $Type<'branch', 'any'>

/**
 * 🧰 *type util*
 *
 * Options for `caseAny`.
 *
 * This is used for types that want to perform specific handling for the type `any`.
 *
 * ```ts
 * type Foo<T, Options extends Foo.Options = Foo.DefaultOptions> = ...
 *
 * namespace Foo {
 *   export type CastOptions = AnyOptions
 *   export type DefaultOptions = DefaultAnyOptions
 *   export type Options = InputOptions<DefaultOptions>
 * }
 * ```
 */
export interface AnyOptions {
	$any: $Any
}

/**
 * 🧰 *type util*
 *
 * Default `AnyOptions`.
 *
 * Unsurprisingly, defaulting `caseAny` to `any`.
 */
export interface DefaultAnyOptions<T = any> {
	$any: T
}
