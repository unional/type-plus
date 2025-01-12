import type { IsNever } from '../never/is_never.js'
import type { $Never } from '../never/never.js'

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
 * @typeParam Options['$never'] Return type when `T` is `never`.
 * Default to `never`.
 *
 * @typeParam Options['caseEmptyTuple'] Return type when `T` is `[]`.
 * Default to `never`.
 */
export type Last<T extends readonly unknown[], Options extends Last.Options = Last.DefaultOptions> = IsNever<
	T,
	{
		$then: Options['$never']
		$else: T['length'] extends 0 ? Options['caseEmptyTuple'] : T extends readonly [...unknown[], infer R] ? R : T[0]
	}
>

export namespace Last {
	export interface Options extends $Never.$Options {
		caseEmptyTuple?: unknown
	}

	export interface DefaultOptions extends $Never.$Default {
		caseEmptyTuple: never
	}
}
