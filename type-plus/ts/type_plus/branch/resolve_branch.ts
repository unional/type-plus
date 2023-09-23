import type { IsNever } from '../../never/is_never.js'
import type { IsUnknown } from '../../unknown/is_unknown.js'
import type { $Error } from '../error.js'
import type { $InferError } from '../infer_error.js'

/**
 * 🧰 *type util*
 *
 * Resolve branches to the first non `unknown` value.
 */
export type $ResolveBranch<Branches extends unknown[]> =
	IsNever<Branches> extends true
	? $Error<'Branches cannot be `never`.', Branches>
	: (Branches extends []
		? $Error<'Branches cannot be `[]`.', Branches>
		: $ResolveBranch._<Branches, never>)

export namespace $ResolveBranch {
	export type _<B extends unknown[], R> = B extends [infer T]
		? IsUnknown<T> extends true ? unknown : T
		: (B extends [infer T, ...infer U]
			? (IsUnknown<T> extends true ? _<U, R> : T)
			: $InferError<'recursive branches', B>)
}
