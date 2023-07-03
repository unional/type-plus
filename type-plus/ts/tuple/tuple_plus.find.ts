
/**
 * 🦴 *utilities*
 *
 * Gets the first type in the array or tuple that matches the `Criteria`.
 *
 * If the `Criteria` is not met, it will return `never'.
 *
 * For `Array<T>`, it will return `T | undefined` if `T` satisfies `Criteria`.
 *
 * @example
 * ```ts
 * ArrayPlus.Find<Array<1 | 2 | 'x'>, number> // 1 | 2 | undefined
 *
 * ArrayPlus.Find<[true, 1, 'x', 3], string> // 'x'
 * ```
 */
export type Find<A extends unknown[], Criteria, Cases extends {
	array?: unknown,
	empty_tuple?: unknown
} = {
	array: 'does not support array. Please use `FindFirst` or `ArrayPlus.Find` instead.',
	empty_tuple: never
}> =
	number extends A['length']
	? Cases['array']
	: (A['length'] extends 0
		? Cases['empty_tuple']
		: (A extends [infer Head, ...infer Tail]
			? (Head extends Criteria
				? Head
				: Find<Tail, Criteria, Cases>)
			: never))
