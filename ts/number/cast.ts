/**
 * Cast a string to a number literal type if possible.
 *
 * ```ts
 * CastToNumber<'1'> // 1
 * CastToNumber<'-1'> // -1
 * ```
 */
export type CastToNumber<S extends string, Fail = never> = S extends `-0`
	? 0
	: S extends `${infer W}.0`
	? CastToNumber<W>
	: S extends `${infer W}.${infer F}0`
	? CastToNumber<`${W}.${F}`>
	: S extends `${infer N extends number}`
	? N
	: Fail
