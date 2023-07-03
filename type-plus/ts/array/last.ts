/**
 * 🦴 *utilities*
 *
 * Gets the last entry in the tuple or the type of array.
 *
 * @example
 * ```ts
 * type R = Last<[1, 2, 3]> // 3
 * type R = Last<string[]> // string
 *
 * type R = Last<[]> // never
 * ```
 */
export type Last<T extends unknown[], Cases extends {
	empty_tuple?: unknown
} = {
	empty_tuple: never
}> = T['length'] extends 0 ? Cases['empty_tuple'] : T extends [...unknown[], infer R] ? R : T[0]
