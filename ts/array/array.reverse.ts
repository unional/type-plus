/*
 * Reverses the order of elements in the array or tuple.
 *
 * @example
 * ```ts
 * Reverse<Array<string | number>> // Array<string | number>
 *
 * Reverse<[1, 2, 3]> // [3, 2, 1]
 * ```
 *
 * @param T The array type to reverse.
 * @returns The reversed array type.
 */
export type Reverse<A extends unknown[]> = A extends [infer First, ...infer Rest]
	? [...Reverse<Rest>, First]
	: A
