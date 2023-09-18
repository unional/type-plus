import type { IsAny } from '../any/is_any.js'

/**
 * Check if the type `T` is exactly `unknown`.
 *
 * ```ts
 * type R = UnknownType<unknown> // unknown
 *
 * type R = UnknownType<number> // never
 * type R = UnknownType<never> // never
 * ```
 */
export type UnknownType<T, Then = T, Else = never> = IsAny<
	T,
	{
		$then: Else,
		$else: [T, unknown] extends [unknown, T] ? Then : Else
	}
>
