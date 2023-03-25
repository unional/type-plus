import type { IsAnyOrNever } from '../any/any_or_never.js'

/**
 * Check if the type `T` is exactly `symbol`.
 *
 * ```
 * import type { SymbolType } from 'type-plus'
 *
 * type R = SymbolType<symbol> // symbol
 *
 * type R = SymbolType<never> // never
 * type R = SymbolType<unknown> // never
 * type R = SymbolType<symbol | boolean> // never
 * ```
 */
export type SymbolType<T, Then = T, Else = never> = IsAnyOrNever<
	T,
	Else,
	[T] extends [symbol] ? Then : Else
>

/**
 * Is the type `T` exactly `symbol`.
 *
 * ```
 * import type { IsSymbol } from 'type-plus'
 *
 * type R = IsSymbol<symbol> // true
 *
 * type R = IsSymbol<never> // false
 * type R = IsSymbol<unknown> // false
 * type R = IsSymbol<symbol | boolean> // false
 * ```
 */
export type IsSymbol<T, Then = true, Else = false> = SymbolType<T, Then, Else>

/**
 * Check if the type `T` is not `symbol`.
 *
 * ```
 * import type { NotSymbolType } from 'type-plus'
 *
 * type R = NotSymbolType<symbol> // never
 *
 * type R = NotSymbolType<never> // never
 * type R = NotSymbolType<unknown> // unknown
 * type R = NotSymbolType<symbol | boolean> // symbol | boolean
 * ```
 */
export type NotSymbolType<T, Then = T, Else = never> = SymbolType<T, Else, Then>

/**
 * Is the type `T` not `symbol`.
 *
 * ```
 * import type { IsNotSymbol } from 'type-plus'
 *
 * type R = IsNotSymbol<symbol> // false
 *
 * type R = IsNotSymbol<never> // true
 * type R = IsNotSymbol<unknown> // true
 * type R = IsNotSymbol<symbol | boolean> // true
 * ```
 */
export type IsNotSymbol<T, Then = true, Else = false> = SymbolType<T, Else, Then>
