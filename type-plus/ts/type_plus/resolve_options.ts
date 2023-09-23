import type { $Error } from './error.js'
import type { $InferError } from './infer_error.js'

/**
 * 🧰 *type util*
 *
 * Resolve options to the first non `unknown` value.
 */
export type $ResolveOptions<Values extends unknown[]> =
	0 extends 1 & Values
	? $Error<'Values cannot be `any`.', Values>
	: ([Values, never] extends [never, Values]
		? $Error<'Values cannot be `never`.', Values>
		: (Values extends []
			? $Error<'Values cannot be `[]`.', Values>
			: $ResolveOptions._<Values, never>))

export namespace $ResolveOptions {
	export type _<V extends unknown[], R> = V extends [infer T]
		? (0 extends 1 & T
			? T
			: ([T, unknown] extends [unknown, T] ? unknown : T))
		: (V extends [infer T, ...infer U]
			? ([T, unknown] extends [unknown, T] ? _<U, R> : T)
			: $InferError<'recursive value', V>)
}
