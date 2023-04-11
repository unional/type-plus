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
export type StringIncludes<
	Subject extends string,
	Search extends string,
	Then = true,
	Else = false
> = Subject extends `${infer _}${Search}${infer _}` ? Then : Else

/**
 * Split a string into substrings using the specified separator,
 * and return them as an array.
 *
 * ```ts
 * import type { StringSplit } from 'type-plus'
 *
 * type R = StringSplit<'abc', ''> // ['a', 'b', 'c']
 * type R = StringSplit<'abc', 'a'> // ['', 'bc']
 * type R = StringSplit<'abc', 'b'> // ['a', 'c']
 * type R = StringSplit<'abc', 'c'> // ['ab', '']
 * ```
 */
export type StringSplit<
	Subject extends string,
	Seperator extends string
> = Subject extends `${infer A}${Seperator}${infer B}`
	? [A, ...StringSplit<B, Seperator>]
	: Seperator extends ''
	? []
	: [Subject]
