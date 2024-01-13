/**
 * Validate if specified type is a scalar literal.
 *
 * 🎭 *predicate*
 *
 * @example
 * ```ts
 * type R = IsLiteral<string> // false
 * type R = IsLiteral<number> // false
 * type R = IsLiteral<boolean> // false
 * type R = IsLiteral<bigint> // false
 * type R = IsLiteral<symbol> // false
 *
 * type R = IsLiteral<'a'> // true
 * type R = IsLiteral<1> // true
 * type R = IsLiteral<true> // true
 * type R = IsLiteral<1n> // true
 * type R = IsLiteral<typeof someSymbol> // true
 * ```
 */
export type IsLiteral<
	T extends number | boolean | bigint | string | symbol,
	Then = true,
	Else = false
> = number extends T
	? Else
	: string extends T
	? Else
	: boolean extends T
	? Else
	: symbol extends T
	? Else
	: bigint extends T
	? Else
	: Then
