import type { $Branch } from './$branch.js'

/**
 * Branch selector for type `any`.
 */
export type $Any = $Branch<'$any'>

export namespace $Any {
	/**
	 * Options to specifically handles the `any` type.
	 *
	 * @example
	 * ```ts
	 * type YourType<T, $Options extends $Any.$Options> = ...
	 * ```
	 */
	export type $Options = { $any?: unknown }

	/**
	 * Branch option to specifically handles the `any` type.
	 *
	 * Use this to finely customize the behavior of your type.
	 *
	 * ```ts
	 * type YourType<T, $Options extends $Any.Options> = ...
	 *
	 * type R = YourType<T, $Any.$Branch> extends $Any ? HandleAny : HandleOthers
	 * ```
	 */
	export type $Branch = { $any: $Any }
}
