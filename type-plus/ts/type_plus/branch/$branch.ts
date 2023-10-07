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
export type $Branch<P extends `$${string}`> = $Type<'branch', P, P>
