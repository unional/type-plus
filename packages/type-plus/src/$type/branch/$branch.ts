import type { $Type } from '../$type.js'

/**
 * 🧰 *type util*
 *
 * Create a branch type.
 *
 * @typeparam P the property name for the branch.
 *
 * @example
 * ```ts
 * type $Then = $Branch<'$then'>
 * type $Any = $Branch<'$any'>
 */
export type $Branch<P extends `$${string}`> = $Type<'branch', P>

/**
 * 🧰 *type util*
 *
 * Define the branch options of the specified branches.
 *
 * ```ts
 * type $YourOptions = $BranchOptions<$Then | $Else> // { $then: $Then, $else: $Else }
 * ```
 */
export type $BranchOptions<$B extends $Branch<any>> = {
	[k in $B[$Type._$value]]: $B extends { _$value: k } ? $B : never
}
