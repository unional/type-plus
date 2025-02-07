import type { $Branch } from '../branch/$branch.js'

/**
 * Branch selector for type `never`.
 */
export type $Never = $Branch<'$never'>

declare const $never: '$never'

export namespace $Never {
	export type $Key = '$never'

	/**
	 * Options to specifically handles the `never` type.
	 *
	 * @example
	 * ```ts
	 * type YourType<T, $Options extends $Never.$Options> = ...
	 * ```
	 */
	export type $Options = { [$never]?: unknown }

	/**
	 * Branch option to specifically handles the `never` type.
	 *
	 * Use this to finely customize the behavior of your type.
	 *
	 * @example
	 * ```ts
	 * type YourType<T, $Options $Never.$Options> = ...
	 *
	 * type R = YourType<T, $Never.$Branch> extends $Never ? HandleNever : HandleOthers

	 * ```
	 */
	export type $Branch = { [$never]: $Never }

	/**
	 * Default option for the `$never` branch.
	 *
	 * Unsurprisingly, defaulting `$never` to `never`.
	 */
	export type $Default = { [$never]: never }
}

/**
 * Branch selector for type is not `never`.
 *
 * It is used in [`IsNever`](../../never/is_never.ts).
 */
export type $NotNever = $Branch<'$not_never'>
