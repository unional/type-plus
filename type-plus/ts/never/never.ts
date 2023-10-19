import type { $Branch } from '../type_plus/branch/$branch.js'

/**
 * 🧰 *type util*
 *
 * A special branch type to indicate the type is `never`.
 */
export type $Never = $Branch<'$never'>

export namespace $Never {
	/**
	 * 🧰 *type util*
	 *
	 * `$NeverOptions` enables customizing the behavior of the `$never` branch.
	 *
	 * The `$never` branch is used to handle when the input type is `never`.
	 *
	 * @example
	 * ```ts
	 * type YourType<
	 *   T,
	 *   $Options extends YourType.$Options = YourType.$Default
	 * > = ...
	 *
	 * namespace YourType {
	 *   export type $Options = $Never.$Options
	 *   export type $Branch = $Never.$Branch
	 * }
	 * ```
	 */
	export type $Options = {
		$never?: unknown
	}
	/**
	 * 🧰 *type util*
	 *
	 * `$NeverBranch` is the branch option for the `$never` branch.
	 *
	 * It sets the value to `$Never`,
	 * so that the branch can be uniquely identified and handled.
	 *
	 * Use this to allow the consumer to customize the behavior of your type.
	 *
	 * @example
	 * ```ts
	 * type YourType<T, $O extends $NeverOptions> = NeverType<T> extends infer R
	 *   ? R extends $Never
	 *     ? $ResolveOptions<[$O['$never'], never]>
	 *     : HandleOtherBranches<R> // R is narrowed
	 *   : never
	 *
	 * type R = YourType<T, $Never.$Branch> extends $Never ? HandleNever : HandleOthers
	 * ```
	 */
	export type $Branch = {
		$never: $Never
	}

	/**
	 * 🧰 *type util*
	 *
	 * Default option for the `$never` branch.
	 *
	 * Unsurprisingly, defaulting `$never` to `never`.
	 */
	export type $Default = {
		$never: never
	}
}

/**
 * 🧰 *type util*
 *
 * `$NotNever` is a special branch type to indicate the type is not `never`.
 *
 * It is used in [`NeverType`](./never_type.ts).
 */
export type $NotNever = $Branch<'$not_never'>
