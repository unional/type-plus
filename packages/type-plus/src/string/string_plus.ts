import type { StringIncludes, StringSplit } from './string.js'

export namespace StringPlus {
	/**
	 * Check if `Subject` includes `Search`.
	 * If either of them is not a string, returns `Else`.
	 *
	 * ```ts
	 * type R = StringPlus.Includes<'abc', 'a'> // true
	 *
	 * type R = StringPlus.Includes<'abc', 'd'> // false
	 * ```
	 */
	export type Includes<Subject extends string, Search extends string, Then = true, Else = false> = StringIncludes<
		Subject,
		Search,
		Then,
		Else
	>

	/**
	 * Split a string into substrings using the specified separator,
	 * and return them as an array.
	 *
	 * ```ts
	 * type R = StringPlus.Split<'abc', ''> // ['a', 'b', 'c']
	 * type R = StringPlus.Split<'abc', 'a'> // ['', 'bc']
	 * type R = StringPlus.Split<'abc', 'b'> // ['a', 'c']
	 * type R = StringPlus.Split<'abc', 'c'> // ['ab', '']
	 * ```
	 */
	export type Split<Subject extends string, Seperator extends string> = StringSplit<Subject, Seperator>
}
