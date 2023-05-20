/**
 * Cast a string to a bigint literal type if possible.
 *
 * ```ts
 * StringToBigint<'1n'> // 1n
 * StringToBigint<'-1n'> // -1n
 * ```
 */
export type StringToBigint<S extends string, Fail = never> = S extends `-0n`
	? 0n
	: S extends `${infer N extends bigint}n`
	? N
	: Fail
