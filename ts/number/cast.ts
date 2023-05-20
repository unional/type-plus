/**
 * Cast a string to a number literal type if possible.
 *
 * ```ts
 * StringToNumber<'1'> // 1
 * StringToNumber<'-1'> // -1
 * ```
 */
export type StringToNumber<S extends string, Fail = never> = S extends `-0`
	? 0
	: S extends `${infer W}.0`
	? StringToNumber<W>
	: S extends `${infer W}.${infer F}0`
	? StringToNumber<`${W}.${F}`>
	: S extends `${infer N extends number}`
	? N
	: Fail
