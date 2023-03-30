import type { IsAnyOrNever } from '../any/any_or_never.js'

/**
 * Check if `T` is exactly `Function`.
 *
 * ```ts
 * import type { StrictFunctionType } from 'type-plus'
 *
 * type R = StrictFunctionType<Function> // Function
 *
 * type R = StrictFunctionType<() => void> // never
 * type R = StrictFunctionType<Function & { a: 1 }> // never
 * ```
 */
export type StrictFunctionType<T, Then = T, Else = never> = IsAnyOrNever<
	T,
	Else,
	[T, Function] extends [Function, T] ? Then : Else
>

/**
 * Check if `T` is not exactly `Function`.
 *
 * ```ts
 * import type { NotStrictFunctionType } from 'type-plus'
 *
 * type R = NotStrictFunctionType<Function> // never
 * type R = NotStrictFunctionType<() => void> // () => void
 *
 * type R = NotStrictFunctionType<Function & { a: 1 }> // Function & { a: 1 }
 * ```
 */
export type NotStrictFunctionType<T, Then = T, Else = never> = StrictFunctionType<T, Else, Then>

/**
 * Is `T` exactly `Function`.
 *
 * ```ts
 * import type { IsStrictFunction } from 'type-plus'
 *
 * type R = IsStrictFunction<Function> // true
 *
 * type R = IsStrictFunction<() => void> // false
 * type R = IsStrictFunction<(() => void) & { a: 1 }> // false
 * ```
 */
export type IsStrictFunction<T, Then = true, Else = false> = StrictFunctionType<T, Then, Else>

/**
 * Is `T` not exactly `Function`.
 *
 * ```ts
 * import type { IsNotStrictFunction } from 'type-plus'
 *
 * type R = IsNotStrictFunction<Function> // false
 *
 * type R = IsNotStrictFunction<() => void> // true
 * type R = IsNotStrictFunction<(() => void) & { a: 1 }> // true
 * ```
 */
export type IsNotStrictFunction<T, Then = true, Else = false> = StrictFunctionType<T, Else, Then>
