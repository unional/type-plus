declare const uniSym: unique symbol

/**
 * A failed type with message.
 *
 * This is analogous to the `Error` class in JavaScript.
 *
 * It can be used in type-level programming to failed an error message.
 *
 * If you want to add additional type information,
 * use `FailedT` or create your own failed type instead.
 *
 * ```ts
 * import { Failed } from 'type-plus'
 *
 * type T = Failed<'error message'>
 * ```
 */
export interface Failed<Msg extends string> {
	[uniSym]: Msg
}

/**
 * A failed type with message and one additional type.
 *
 * Use this to add a generic type to the failed type.
 *
 * e.g. `FailedT<'missing', number | string>`
 *
 * It's recommended to create custom failed types instead of using this to provide better message.
 */
export interface FailedT<Msg extends string, T> {
	[uniSym]: Msg
}
