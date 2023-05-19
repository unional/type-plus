/**
 * Cast a string to a bigint literal type if possible.
 *
 * ```ts
 * CastToBigint<'1n'> // 1n
 * CastToBigint<'-1n'> // -1n
 * ```
 */
export type CastToBigint<S extends string, Fail = never> = S extends `-0n`
	? 0n
	: S extends `${infer N extends bigint}n`
	? N
	: Fail
