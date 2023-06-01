/**
 * Pads the start of a tuple with `PadWith`.
 *
 * If the `MaxLength` is less than the length of the tuple,
 * the `Tuple` will be returned unchanged.
 *
 * @example
 * ```ts
 * PadStart<[1, 2, 3], 5, 0> // [0, 0, 1, 2, 3]
 *
 * // Ignore if MaxLength is less than the length of the tuple
 * PadStart<[1, 2, 3], 5, 0> // [0, 0, 1, 2, 3]
 *
 * // Default to unknown
 * PadStart<[1, 2, 3], 5> // [unknown, unknown, 1, 2, 3]
 * ```
 */
export type PadStart<Tuple extends unknown[], MaxLength extends number, PadWith = unknown> = PadStartDevice<
	Tuple,
	MaxLength,
	PadWith,
	[]
>

type PadStartDevice<
	Source extends unknown[],
	MaxLength extends number,
	PadWith,
	Result extends unknown[]
> = Result['length'] extends MaxLength
	? Source extends []
		? Result
		: Source extends [...infer Head, infer Tail]
		? [Tail, ...Result] extends infer R extends unknown[]
			? PadStartDevice<Head, R['length'], PadWith, R>
			: never
		: never
	: Source extends []
	? PadStartDevice<Source, MaxLength, PadWith, [PadWith, ...Result]>
	: Source extends [...infer Head, infer Tail]
	? PadStartDevice<Head, MaxLength, PadWith, [Tail, ...Result]>
	: Source
