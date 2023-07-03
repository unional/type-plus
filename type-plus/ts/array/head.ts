/**
 * 🦴 *utilities*
 *
 * Gets the first entry in the tuple or the type of array.
 *
 * @example
 * ```ts
 * type R = Head<[1, 2, 3]> // 1
 * type R = Head<string[]> // string
 *
 * type R = Head<[]> // never
 * ```
 */
export type Head<T extends unknown[], Cases extends {
	empty_tuple?: unknown
} = {
	empty_tuple: never
}> = T['length'] extends 0 ? Cases['empty_tuple'] : T[0]
