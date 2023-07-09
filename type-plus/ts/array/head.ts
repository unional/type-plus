import type { NeverType } from '../never/never_type.js'

/**
 * 🦴 *utilities*
 * 🔢 *customizable*
 *
 * Gets the first entry in the tuple or the type of array `T`.
 *
 * @example
 * ```ts
 * type R = Head<[1, 2, 3]> // 1
 * type R = Head<string[]> // string
 *
 * type R = Head<[]> // never
 * ```
 *
 * @typeParam Options['caseNever'] Return type when `T` is `never`.
 * Default to `never`.
 *
 * @typeParam Options['caseEmptyTuple'] Return type when `T` is `[]`.
 * Default to `never`.
 */
export type Head<
	T extends readonly unknown[],
	Options extends Head.Options = Head.DefaultOptions
> = NeverType<
	T,
	Options['caseNever'],
	T['length'] extends 0 ? Options['caseEmptyTuple'] : T[0]
>

export namespace Head {
	export interface Options extends NeverType.Options {
		caseEmptyTuple?: unknown
	}

	export interface DefaultOptions extends NeverType.DefaultOptions {
		caseEmptyTuple: never
	}
}
