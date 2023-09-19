import type { IsAnyOrNever } from '../mix_types/is_any_or_never.js'

/**
 * Check if `T` is a `Function`.
 *
 * ```ts
 * type R = FunctionType<Function> // Function
 * type R = FunctionType<() => void> // () => void
 * type R = FunctionType<(() => void) | { a: 1 }> // (() => void) | { a: 1 }
 *
 * type R = FunctionType<{ a: 1 }> // never
 * type R = FunctionType<never> // never
 * type R = FunctionType<unknown> // never
 * ```
 */
export type FunctionType<T, Then = T, Else = never> = IsAnyOrNever<
	T,
	Else,
	[T] extends [Function] ? Then : Else
>

/**
 * Is `T` a `Function`.
 *
 * ```ts
 * type R = IsFunction<Function> // Function
 * type R = IsFunction<() => void> // () => void
 * type R = IsFunction<(() => void) | { a: 1 }> // (() => void) | { a: 1 }
 *
 * type R = IsFunction<{ a: 1 }> // never
 * type R = IsFunction<never> // never
 * type R = IsFunction<unknown> // never
 * ```
 */
export type IsFunction<T, Then = true, Else = false> = FunctionType<T, Then, Else>

/**
 * Check if `T` is not a `Function`.
 *
 * ```ts
 * type R = NotFunctionType<Function> // never
 * type R = NotFunctionType<() => void> // never
 * type R = NotFunctionType<(() => void) | { a: 1 }> // never
 *
 * type R = NotFunctionType<{ a: 1 }> // { a: 1 }
 * type R = NotFunctionType<never> // never
 * type R = NotFunctionType<unknown> // unknown
 * ```
 */
export type NotFunctionType<T, Then = T, Else = never> = FunctionType<T, Else, Then>

/**
 * Is `T` not a `Function`.
 *
 * ```ts
 * type R = IsNotFunction<Function> // false
 * type R = IsNotFunction<() => void> // false
 * type R = IsNotFunction<(() => void) | { a: 1 }> // false
 *
 * type R = IsNotFunction<{ a: 1 }> // true
 * type R = IsNotFunction<never> // true
 * ```
 */
export type IsNotFunction<T, Then = true, Else = false> = FunctionType<T, Else, Then>
