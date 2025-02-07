import type { $ResolveBranch } from '../$type/branch/$resolve_branch.js'
import type { $Else, $Selection, $Then } from '../$type/branch/$selection.js'

/**
 * 🎭 **predicate**
 *
 * Logical AND operation.
 *
 * @since 🏷️ 8.0.0
 */
export type And<A extends boolean, B extends boolean, $O extends $Selection.$BaseOptions = {}> = A extends true
	? B extends true
		? $ResolveBranch<A, $O, [$Then]>
		: $ResolveBranch<A, $O, [$Else]>
	: $ResolveBranch<A, $O, [$Else]>

/**
 * 🎭 **predicate**
 *
 * Logical OR operation.
 *
 * @since 🏷️ 8.0.0
 */
export type Or<A extends boolean, B extends boolean, $O extends $Selection.$BaseOptions = {}> = A extends true
	? $ResolveBranch<A, $O, [$Then]>
	: B extends true
		? $ResolveBranch<A, $O, [$Then]>
		: $ResolveBranch<A, $O, [$Else]>

/**
 * 🎭 **predicate**
 *
 * Logical NOT operation.
 *
 * @since 🏷️ 8.0.0
 */
export type Not<X extends boolean, $O extends $Selection.$BaseOptions = {}> = X extends true
	? $ResolveBranch<X, $O, [$Else]>
	: $ResolveBranch<X, $O, [$Then]>

/**
 * 🎭 **predicate**
 *
 * Logical XOR operation.
 *
 * @since 🏷️ 8.0.0
 */
export type Xor<A extends boolean, B extends boolean, $O extends $Selection.$BaseOptions = {}> = A extends true
	? Not<B>
	: B extends true
		? $ResolveBranch<A, $O, [$Then]>
		: $ResolveBranch<A, $O, [$Else]>
