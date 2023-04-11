/**
 * Check if `Subject` includes `Search`.
 * If either of them is not a string, returns `Else`.
 *
 * ```ts
 * import type { StringIncludes } from 'type-plus'
 *
 * type R = StringIncludes<'abc', 'a'> // true
 *
 * type R = StringIncludes<'abc', 'd'> // false
 * ```
 */
export type StringIncludes<Subject, Search, Then = true, Else = false> = [Subject] extends [string]
	? [Search] extends [string]
		? Subject extends `${infer _}${Search}${infer _}`
			? Then
			: Else
		: Else
	: Else
