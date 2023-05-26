/**
 * Pads the start of a tuple with `PadWith`.
 *
 * If the `Total` is less than the length of the tuple,
 * the `Tuple` will be returned unchanged.
 *
 * @example
 * ```ts
 * PadStart<[1, 2, 3], 5, 0> // [0, 0, 1, 2, 3]
 * ```
 */
export type PadStart<Tuple extends unknown[], Total extends number, PadWith = unknown> = PadStartDevice<
	Tuple,
	Total,
	PadWith,
	[]
>

type PadStartDevice<
	Source extends unknown[],
	Total extends number,
	PadWith,
	Result extends unknown[]
> = Result['length'] extends Total
	? Source extends []
		? Result
		: Source extends [...infer Head, infer Tail]
		? [Tail, ...Result] extends infer R extends unknown[]
			? PadStartDevice<Head, R['length'], PadWith, R>
			: never
		: never
	: Source extends []
	? PadStartDevice<Source, Total, PadWith, [PadWith, ...Result]>
	: Source extends [...infer Head, infer Tail]
	? PadStartDevice<Head, Total, PadWith, [Tail, ...Result]>
	: Source
