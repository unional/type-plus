import type { $Branch } from './$branch.js'

/**
 * 🧰 *type util*
 *
 * Branch to handle exact comparison.
 */
export type $Exact = $Branch<'$exact'>

export namespace $Exact {
	/**
	 * 🧰 *type util*
	 *
	 * `$Exact.$Options` enables customizing the behavior of the `$exact` branch.
	 *
	 * The `$exact` branch is used to handle when it is an exact comparison.
	 */
	export type $Options = {
		exact?: unknown
	}

	/**
	 * 🧰 *type util*
	 *
	 * `$Exact.$Branch` is the branch option for the `$exact` branch.
	 *
	 * It sets the value to `$Exact`,
	 * so that the branch can be uniquely identified and handled.
	 *
	 * Use this to allow the consumer to customize the behavior of your type.
	 *
	 * @example
	 * ```ts
	 * type YourType<T, $O extends $ExactOptions> = ExactType<T> extends infer R
	 *   ? R extends $Exact
	 *     ? $ResolveOptions<[$O['$exact'], never]>
	 *     : HandleOtherBranches<R> // R is narrowed
	 *   : never
	 *
	 * type R = YourType<T, $Exact.$Branch> extends $Exact ? HandleExact : HandleOthers
	 * ```
	 */
	export type $Branch = {
		exact: $Exact
	}

	export type $Default = {
		exact: false
	}
}
