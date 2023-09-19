import type { $Type } from '../type.js'

/**
 * 🧰 *type util*
 *
 * Options for selection (if-then-else) logic.
 *
 * The word "selection" refers to the basic elements in structural programming:
 * sequence, selection, and iteration.
 *
 * @example
 * ```ts
 * type YourType<
 *   T,
 *   $Options extends YourType.$Options = YourType.$Branch
 * > = ...
 *
 * namespace YourType {
 *   export type $Options = $SelectionOptions
 *   export type $Branch = $SelectionBranch
 * }
 * ```
 */
export type $SelectionOptions = {
	$then?: unknown,
	$else?: unknown,
}

export type $Then = $Type<'branch', 'then'>
export type $Else = $Type<'branch', 'else'>

/**
 * 🧰 *type util*
 *
 * Branch option for selection logic.
 * It allows finely customizing the behavior of your type.
 *
 * Using this as the default value of your `$Options` is the recommended best practice.
 *
 * This encourage consumer of your type to use conditional type to avoid performance issues.
 *
 * ```ts
 * type YourType<
 *   T,
 *   $Options extends YourType.$Options = YourType.$Branch
 * > = ...
 *
 * namespace YourType {
 *   export type $Options = $SelectionOptions
 *   export type $Branch = $SelectionBranch
 * }
 *
 * type R = YourType<T> extends infer R
 *   ? R extends $Then ? HandleThen
 *   : R extends $Else ? HandleElse
 *   : never
 * ```
 */
export type $SelectionBranch = {
	$then: $Then,
	$else: $Else,
}

/**
 * 🧰 *type util*
 *
 * Default Options for filter selection logic.
 *
 * `filter` means the logic returns `T` when the condition is met,
 * and returns `never` otherwise.
 *
 * @example
 * ```ts
 * type YourType<
 *   T,
 *   Options extends YourType.$Options = YourType.$Default> = ...
 *
 * namespace YourType {
 *   export type $Options = $SelectionOptions
 *   export type $Default = $SelectionFilter
 * }
 *
 * type R = YourType<ThenType> // ThenType
 * type X = YourType<ElseType> // never
 * ```
 */
export type $SelectionFilter<T> = {
	$then: T,
	$else: never,
}

/**
 * 🧰 *type util*
 *
 * Default Options for predicate selection logic.
 *
 * `predicate` means the logic returns `true` or `false` depending on the condition.
 *
 * @example
 * ```ts
 * type YourType<
 *   T,
 *   Options extends YourType.$Options = YourType.$Default> = ...
 *
 * namespace YourType {
 *   export type $Options = $SelectionOptions
 *   export type $Default = $SelectionPredicate
 * }
 *
 * type R = YourType<ThenType> // true
 * type X = YourType<ElseType> // false
 * ```
 */
export type $SelectionPredicate = {
	$then: true,
	$else: false
}

/**
 * 🧰 *type util*
 *
 * Flip the selection options.
 *
 * @example
 * ```ts
 * type IsBoolean<T, $Options = $SelectionOptions> = ...
 *
 * type IsNotBoolean<T, $Options = $SelectionOptions> = IsBoolean<T, $FlipSelection<$Options>>
 * ```
 */
export type $FlipSelection<$Options extends $SelectionOptions> = {
	$then: $Options['$else'],
	$else: $Options['$then']
} & Omit<$Options, '$then' | '$else'>
