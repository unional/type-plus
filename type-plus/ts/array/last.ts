import type { NeverType } from '../never/never_type.js'

/**
 * 🦴 *utilities*
 *
 * Gets the last entry in the tuple or the type of array `T`.
 *
 * @example
 * ```ts
 * type R = Last<[1, 2, 3]> // 3
 * type R = Last<string[]> // string
 *
 * type R = Last<[]> // never
 * ```
 *
 * @typeParam Options['caseNever'] Return type when `T` is `never`.
 * Default to `never`.
 *
 * @typeParam Options['caseEmptyTuple'] Return type when `T` is `[]`.
 * Default to `never`.
 */
export type Last<
	T extends unknown[],
	Options extends Last.Options = Last.DefaultOptions
> = NeverType<T,
	Options['caseNever'],
	T['length'] extends 0 ? Options['caseEmptyTuple'] : T extends [...unknown[], infer R] ? R : T[0]
>

export namespace Last {
	export interface Options extends NeverType.Options {
		caseEmptyTuple?: unknown
	}

	export interface DefaultOptions extends NeverType.DefaultOptions {
		caseEmptyTuple: never
	}
}
